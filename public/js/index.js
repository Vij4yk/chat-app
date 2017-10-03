var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});           

socket.on('newMessage', function(message){
    console.log('new  massage', message);

    var li = $("<li></li>");

    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});


jQuery('#massage-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $("input[name='message']").val()
    }, function(){

    });
});