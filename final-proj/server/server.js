const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
// Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// Logging middleware
app.use(morgan('dev'));

app.get('/api/hello', (req, res) => {
    console.log(req);
    console.log('banana craco');
    res.send({ express: 'Hello From Express' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
