require(__dirname + '/../server');

let request = require('supertest');

request = request('http://localhost:3333');

describe('GET /', function () {
    it('should contain text "Hello, Express!"', function (done) {
        request
            .get('/')
            .expect('{"message":"Welcome!","doc":"http://localhost/doc","resultCode":"Ok"}', done)
    })
});
