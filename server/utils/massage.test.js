var expect = require('expect');
var jest = require('jest');

var {generateMessage} = require('./massage');

describe('generateMessage', () => {
    it('should generate correct message object', ()=>{
       var from = 'Jen';
       var text = 'Some message';
       var message = generateMessage(from, text);

       expect(message.createdAt).toBeGreaterThan(1);
       expect(message).toMatchObject({from, text});
    })
});