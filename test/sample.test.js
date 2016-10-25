import app from '../server';
import request from 'supertest';

app.address = () => ({
    address: 'http://localhost',
    port
});

describe('GET /', function () {
    it('should contain text welcome message', function (done) {
        request(app)
            .get('/')
            .expect('{"message":"Welcome!","doc":"http://localhost/doc","resultCode":"Ok"}', done)
    })
});
