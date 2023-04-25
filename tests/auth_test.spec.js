require('dotenv').config({ path: '.env.test' });

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return a message', (done) => {
    request(app)
      .get('/protected')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('hi');
        done();
      });
  });
});
