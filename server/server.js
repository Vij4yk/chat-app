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
        console.log('User Disconnected');
   });

   socket.on('createMassage', (newMassage) => {
       console.log('massage created', newMassage);
   })

   socket.emit('newMassage', {
        createdAt: 12-30,
        from: "racker",
        text: "Hey. Everyone"
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

