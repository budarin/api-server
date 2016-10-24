var
    request = require('supertest'),
    app = require(__dirname + '/../server');

app.address = function () {
    return 'http://localhost:3000';
};

describe('GET /', function () {
    it('should contain text "Hello, Express!"', function (done) {
        request(app)
            .get('/')
            .expect(/Hello, Express!/, done)
    })
});
