const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/server.js'); // c'est l'app "express"
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API message", () => {
    mocha.it("message", (done) => {
        const request = chai.request(app.default).keepOpen();
        const message = {
          user_id: "1",
          author_name: "Mocha Tester",
          content: "Je suis un message test de la part de mocha !",
          likers: []
        };

        request
            .post('/messages')
            .send(message)

            .then((res) => {
                res.should.have.status(200);
                console.log(`Retrieving message ${res.body._id}`)
                return Promise.all([
                    request
                        .get(`/messages/${res.body._id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, message)
                        }),

                    request
                        .get(`/message/jedoutequecetidexiste`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

