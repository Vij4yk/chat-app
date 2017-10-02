var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMassage', {
        to: 'everyone',
        text: 'Good Evening everyone'
    });
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});           

socket.on('newMassage', function(newMassage){
    console.log('new  massage', newMassage);
})