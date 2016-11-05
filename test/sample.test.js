import app from '../server/server';
import request from 'supertest';

app.address = () => ({
    address: 'http://localhost',
    port: 3333
});

describe('GET /', function () {
    it('should contain text welcome message', function (done) {
        request(app)
            .get('/')
            .expect('{"message":"Welcome!","doc":"http://localhost/doc","resultCode":"Ok"}', done)
    })
});
