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

socket.on('newLocationMessage', function(message){
    var li = $("<li></li>");
    var a = $('<a target="_blank">My Current Location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    
    li.append(a);
    $('#messages').append(li);
})

jQuery('#massage-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $("input[name='message']").val()
    }, function(){

    });
});

var locationButton = $('#send-location');  

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser!!!');
    }

    navigator.geolocation.getCurrentPosition( function(postiton){
        socket.emit('createLocationMessage', {
            latitude: postiton.coords.latitude,
            longitude: postiton.coords.longitude
        });
    }, function(){
        alert('Unable to fetch login.')
    });
});