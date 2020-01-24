const expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:5000/api/v1');

const filename = '../data/users.json';
const USERS = require(filename);
const UserId = 'NEW_USER';
const name = 'New User';
const score = 12;

describe('User API', function () {

    it("tests the post new User endpoint and returns new User", (done) => {

        api.post('/user')
            .send({
                name
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end( (err, res) => {
                expect(err).to.be.null;             
                expect(res.body).to.have.all.keys('id', 'name', 'score');
                done();
            });
    });
    
    it("tests the Update User Score of an USER and returns as success message", (done) => {

        api.put(`/user/${UserId}`)
            .send({
                score
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end( (err, res) => {
                expect(err).to.be.null;             
                expect(res.body).to.have.all.keys('id', 'name', 'score');
                expect(res.body.id).to.equal('NEW_USER'); 
                expect(res.body.score).to.equal(score); 
                expect(res.body.name).to.equal('New User'); 
                done();
            });
    });
    
    it("tests the get all Users", (done) => {

        api.get('/user')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( (err, res) => {
                expect(err).to.be.null;        
                expect(res.body.users).to.be.an('array')     
                done();
            });
	});
});