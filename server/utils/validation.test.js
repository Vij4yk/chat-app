const expect = require('expect');
const {isRealString} = require('./validation');
const jest = require('jest');

describe('validation test js', () => {
    it('should reject non-string values', () => {
        var res = isRealString(152);

        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('       ');

        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString(' ANDREW ');

        expect(res).toBe(true);
    });
    
});