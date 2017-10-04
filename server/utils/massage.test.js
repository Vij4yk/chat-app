var expect = require('expect');
var jest = require('jest');

var {generateMessage, generateLocationMessage} = require('./massage');

describe('generateMessage', () => {
    it('should generate correct message object', ()=>{
       var from = 'Jen';
       var text = 'Some message';
       var message = generateMessage(from, text);

       expect(message.createdAt).toBeGreaterThan(1);
       expect(message).toMatchObject({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 15;
        var longitude = 19;
        var url ='https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeGreaterThan(1);
        expect(message).toMatchObject({from, url});
    });
});