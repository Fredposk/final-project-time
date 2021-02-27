const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const compression = require('compression');
const db = require('./db');
const randomColor = require('randomcolor');
const app = express();
const cryptoRandomString = require('crypto-random-string');
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
// app.use(cookieSessionMiddleware);
// io.use(function (socket, next) {
//     cookieSessionMiddleware(socket.request, socket.request.res, next);
// });

// app.post('/api/locationclicked', (req, res) => {
//     const { lat, lng, time } = req.body;
//     console.log(lat, lng, time);
//     const login = uuidv3('Frederico', uuidv3.URL);
//     console.log(login);
//     res.send({ express: 'Hello From Express' });
// });
// const path = require('path');
// app.use(express.static(path.join(__dirname, '..', 'public')));

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
// Below will be the thread creation
app.post('/api/add/thread', async (req, res) => {
    const { fpbp, room_id, topic, threadPic } = req.body;

    var color = randomColor();
    try {
        const thread = await db.createThread(
            threadPic,
            color,
            topic,
            fpbp,
            room_id
        );
        console.log(thread.rows);
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
    const { comment, threadid, image } = req.body;
    try {
        !req.session.UserID
            ? (req.session.userID = cryptoRandomString({
                  length: 11,
                  type: 'distinguishable',
              }))
            : req.session.userID;
        const createComment = await db.addComment(
            req.session.userID,
            comment,
            threadid
        );
        console.log(createComment.rows);
    } catch (error) {
        console.log(error, 'error inside comment');
        res.status(201).json({ error: error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
