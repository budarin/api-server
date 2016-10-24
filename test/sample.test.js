let app = require(__dirname + '/../server');
let request = require('supertest');

app.address = () => ({ address: 'http://localhost', port: 3333 });

describe('GET /', function () {
    it('should contain text "Hello, Express!"', function (done) {
        request(app)
            .get('/')
            .expect('{"message":"Welcome!","doc":"http://localhost/doc","resultCode":"Ok"}', done)
    })
});
