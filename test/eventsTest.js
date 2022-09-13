const request = require('supertest')
const app = require('../app')
const {assert} = require('chai')

describe('POST /events', function () {
    it('Must respond with the id', function (done) {
        request(app)
            .post('/events')
            .send({
                name: "Test",
                image: "http://localhost:4000/images",
                date: "2022-01-01",
                description: "...",
                category: "Musica",
                place: "Siempreviva 123",
                capacity: 1000,
                estimated: 500,
                price: 123.99
            })
            .then(response => {
                id = response.body.id
                assert.isString(response.body.id)
                done()
            })
    })

    it('Must respond with 201 status code', function (done) {
        request(app)
            .post('/events')
            .send({
                name: "Test",
                image: "http://localhost:4000/images",
                date: "2022-01-01",
                description: "...",
                category: "Musica",
                place: "Siempreviva 123",
                capacity: 1000,
                estimated: 500,
                price: 123.99
            })
            .expect(201, done)
    })

    it('Must respond with 400 status code', function (done) {
        request(app)
            .post('/events')
            .send({})
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            })
    })
})

describe('GET /events', function () {

})