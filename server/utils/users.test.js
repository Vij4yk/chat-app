const expect = require('expect');
const {Users} = require('./users');
const jest = require('jest');

describe('Users ', () => {
    var users;
    beforeEach( () => {
        users = new Users();
        users.users = [{
            id: '1',
            name:'Andrew',
            room:'The Office Fans'
        },{
            id: '2',
            name:'Rack',
            room:'Fans'
        },{
            id: '3',
            name:'Bob',
            room:'The Office Fans'
        }]
    });

    it('should add new users', () => {
        var users = new Users();
        var user = {
            id: '123',
            name:'Andrew',
            room:'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    it('should find user', () => {
        var userId = '2';
        var findUser = users.getUser(userId);
        expect(findUser.id).toBe(userId);
    });
    it('should not find user', () => {
        var userId = '99';
        var findUser = users.getUser(userId);
        expect(findUser).toBeFalsy();
    });
    it('should return names for the office fans', () => {
        var userList = users.getUserList('The Office Fans');

        expect(userList).toEqual(['Andrew', 'Bob']);
    });

});