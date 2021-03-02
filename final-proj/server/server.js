const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const compression = require('compression');
const db = require('./db');
const randomColor = require('randomcolor');
const app = express();
const cryptoRandomString = require('crypto-random-string');
const { uploader } = require('./upload');
const s3 = require('./s3');
//
app.use(compression());
// Logging middleware
app.use(morgan('dev'));
// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
// Session cookies
let secrets;
if (process.env.cookie_secret) {
    secrets = process.env.cookie_secret;
} else {
    secrets = require('./secrets.json').sessionSecret;
}
// body-parser
app.use(express.urlencoded({ extended: false }));
// json handling
app.use(express.json());
// cookie handlers
app.use(
    cookieSession({
        name: 'session',
        keys: [secrets],
        // Cookie Options 24hrs
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.get('/api/markers/', async (req, res) => {
    try {
        const data = await db.getMarkers();
        res.status(200).json({ response: data.rows });
    } catch (error) {
        console.log('error getting markers', error);
        res.status(201).json({ error: error });
    }
});

app.post('/api/add/board', async (req, res) => {
    const { name, lat, lng } = req.body;
    try {
        const data = await db.createNewBoard(name, lat, lng);
        res.status(200).json({ response: data.rows });
    } catch (error) {
        console.log(error, 'error adding new board');
        res.status(201).json({ error: error });
    }
});

app.get('/api/board/:board_id', async (req, res) => {
    try {
        const threads = await db.getThreads(req.params.board_id);
        const boardInfo = await db.getBoardInfo(req.params.board_id);
        res.status(200).json({
            response: threads.rows,
            boardInfo: boardInfo.rows,
        });
    } catch (error) {
        console.log('error getting threads', error);
        res.status(404);
    }
});

// app.post(
//     '/api/add/thread',
//     uploader.single('file'),
//     s3.upload,
//     yo,
//     async (req, res) => {
//         const { s3Url } = require('./secrets.json');
//         const { filename } = req.file;
//         console.log(filename);
//         const url = `${s3Url}${filename}`;
//         const { fpbp, room_id, topic } = req.body;
//         let author_id;
//         let commentColor;
//         if (!req.session.userID) {
//             req.session.userID = cryptoRandomString({
//                 length: 11,
//                 type: 'distinguishable',
//             });
//             author_id = req.session.userID;
//             const userColor = randomColor();
//             await db.colorToUser(author_id, userColor);
//             commentColor = userColor;
//         } else {
//             author_id = req.session.userID;
//             commentColor = await db.getUserColor(author_id);
//             commentColor = commentColor.rows[0].color;
//         }
//         try {
//             const thread = await db.createThread(
//                 // threadPic,
//                 commentColor,
//                 topic,
//                 fpbp,
//                 room_id,
//                 author_id
//             );
//             res.status(200).json({ thread: thread.rows });
//         } catch (error) {
//             console.log(error, 'error posting new thread');
//             res.status(201).json({ error });
//         }
//     }
// );
app.post('/api/add/thread', async (req, res) => {
    const { fpbp, room_id, topic, threadPic } = req.body;
    let author_id;
    let commentColor;
    if (!req.session.userID) {
        req.session.userID = cryptoRandomString({
            length: 11,
            type: 'distinguishable',
        });
        author_id = req.session.userID;
        const userColor = randomColor();
        await db.colorToUser(author_id, userColor);
        commentColor = userColor;
    } else {
        author_id = req.session.userID;
        commentColor = await db.getUserColor(author_id);
        // console.log(commentColor.rows[0].color);
        commentColor = commentColor.rows[0].color;
    }
    try {
        const thread = await db.createThread(
            threadPic,
            commentColor,
            topic,
            fpbp,
            room_id,
            author_id
        );

        res.status(200).json({ thread: thread.rows });
    } catch (error) {
        console.log(error, 'error posting new thread');
        res.status(201).json({ error });
    }
});

app.get('/api/comments/:id', async (req, res) => {
    try {
        const comment = await db.getComment(req.params.id);
        res.status(200).json({ comments: comment.rows });
    } catch (error) {
        console.log(error, 'error getting comments');
        res.status(201).json({ error });
    }
});

app.post('/api/comments/add/', async (req, res) => {
    const { comment, thread_id, image } = req.body;
    let author_id;
    let commentColor;
    if (!req.session.userID) {
        req.session.userID = cryptoRandomString({
            length: 11,
            type: 'distinguishable',
        });
        author_id = req.session.userID;
        const userColor = randomColor();
        await db.colorToUser(author_id, userColor);
        commentColor = userColor;
    } else {
        author_id = req.session.userID;
        commentColor = await db.getUserColor(author_id);
        // console.log(commentColor.rows[0].color);
        commentColor = commentColor.rows[0].color;
    }
    try {
        const createComment = await db.addComment(
            author_id,
            comment,
            thread_id,
            commentColor
        );
        res.status(200).json({
            createComment: createComment.rows,
        });
    } catch (error) {
        console.log(error, 'error inside comment');
        res.status(201).json({ error: error });
    }
});

app.get('/api/delete/:id', async (req, res) => {
    console.log(req.params.id);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
