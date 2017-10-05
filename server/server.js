const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/massage');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join( __dirname, '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Rooms name required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
       console.log('massage created', message);

       io.emit('newMessage', generateMessage(message.from, message.text));

       callback('');
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

