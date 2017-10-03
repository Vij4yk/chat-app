const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/massage');

const publicPath = path.join( __dirname, '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just connected'));

    socket.on('createMessage', (message, callback) => {
       console.log('massage created', message);

       io.emit('newMessage', generateMessage(message.from, message.text));

       callback('This is from server');
   });

})

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//     res.render('index');
// })


server.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});

