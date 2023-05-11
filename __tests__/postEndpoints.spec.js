require('dotenv').config();
const app = require("../app");
const request = require("supertest");

describe('post endpoints', () => {
    let api;

    beforeAll(async () => {
        api = app.listen(5000, () => {
            console.log("Test server running on port 5000")
        })
        const response = await request(app)
            .post('/users/login')
            .send({ username: 'First User', password: 'pass1' });
        token = response.body.token;
    })

    afterAll((done) => {
        console.log("Gracefully stopping test server")
        api.close(done);
    })

    it("resonds to GET / with status 200", (done) => {
        request(api)
            .get("/")
            .expect(200, done);
    })

    it("responds to GET /posts with status 200", (done) => {
        request(api)
            .get("/posts")
            .expect(200, done);
    })

    it("responds to GET /posts/1 with status 200", (done) => {
        request(api)
            .get("/posts/1")
            .expect(200, done);
    })

    it("responds to an unknown post id with a 404", (done) => {
        request(api)
            .get("/posts/43")
            .expect(404)
            .expect({ error: "Cannot find post." }, done);
    })

    xit("reponds to DELETE /posts/:id with status 204", (done) => {
        request(api)
            .delete("/posts/1")
            .expect(204, done);
    })

    xit("responds to POST /posts with status 201", (done) => {
        const testPost = {
            title: "Recycling Tips",
            category: "Environment",
            content: "Learn more about Recycling!"
        }

        request(api)
            .post("/posts")
            .set('Authorization', `${token}`)
            .send(testPost)
            .set("Accept", "application/json")
            .expect(201)
            .expect(testPost, done)
    })

    it("responds to GET /posts/search/:category with status 200", (done) => {
        request(api)
            .get("/posts/search/Environment")
            .expect(200, done);
    })

    it("responds to unknown category search with 404", (done) => {
        request(api)
            .get("/posts/search/test")
            .expect(404, done);
    })
})
