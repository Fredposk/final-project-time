const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const compression = require('compression');
const db = require('./db');

const app = express();
// Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const { v3: uuidv3 } = require('uuid');
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
const cookieSessionMiddleware = cookieSession({
    name: 'session',
    keys: [secrets],
    // Cookie Options 24hrs
    maxAge: 24 * 60 * 60 * 1000,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.post('/api/locationclicked', (req, res) => {
    const { lat, lng, time } = req.body;
    console.log(lat, lng, time);
    const login = uuidv3('Frederico', uuidv3.URL);
    console.log(login);
    res.send({ express: 'Hello From Express' });
});

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

// This will fetch the threads inside a board
app.get('/api/board/:board_id', async (req, res) => {
    console.log(req.params.board_id);

    res.status(200).json({ response: 'hello' });
});
// Below will be the thread creation

const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
