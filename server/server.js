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

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        createdAt: new Date().getTime(),
        text: 'New user joined'
    });

    socket.emit('newMessage', {
        from: 'Admin',
        createdAt: new Date().getTime(),
        text: 'Welcome to the app'
    });

    socket.on('createMessage', (newMessage) => {
        console.log(newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            createdAt: new Date().getTime(),
            text: newMessage.text
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
