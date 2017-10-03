const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join( __dirname, '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('createMessage', (message) => {
       console.log('massage created', message);

       io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
       });
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

