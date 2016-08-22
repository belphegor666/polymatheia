var request = require('request'),
    expect  = require("chai").expect,
    app1 = { 'name': 'app1' },
    app2 = { 'name': 'app2' };

describe('REST API Tests', function() {
  describe('CREATE App entries', function() {
      it('Create App app1', function(done) {
          request(
            {
              method: 'PUT',
              url: 'http://localhost:8080/app/',
              headers: { 'Content-Type': 'application/json' },
              json: true,
              body: app1
            },
            function( err, res, body) {
              expect(res.statusCode).to.equal(200);
              //expect(body.name).to.equal("ffffff");
              //console.log(body);
              done();
            }
          );
      });
      it('Create App app2', function(done) {
          request(
            {
              method: 'PUT',
              url: 'http://localhost:8080/app/',
              json: true,
              body: app2
            },
            function( err, res, body) {
              expect(res.statusCode).to.equal(200);
              //expect(body.name).to.equal("ffffff");
              //console.log(body);
              done();
            }
          );
      });
  });
  describe('READ App entries', function() {
      it('SEARCH App app1', function(done) {
          request(
            {
              method: 'GET',
              url: 'http://localhost:8080/app/app1',
              json: true
            },
            function( err, res, body) {
              expect(res.statusCode).to.equal(200);
              //expect(body.name).to.equal("ffffff");
              //console.log(body);
              done();
            }
          );
      });
      it('SEARCH App foo', function(done) {
          request(
            {
              method: 'GET',
              url: 'http://localhost:8080/app/foo',
              json: true
            },
            function( err, res, body) {
              expect(res.statusCode).to.equal(404);
              //expect(body.name).to.equal("ffffff");
              //console.log(body);
              done();
            }
          );
      });
  });  
});