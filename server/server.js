const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

const http = require('http');
const socketio = require('socket.io');
const express=require('express');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
