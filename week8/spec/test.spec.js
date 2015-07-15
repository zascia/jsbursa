/**
 * Created by ashu on 15-Jul-15.
 */
var app = require('../index');
/*;
var port = 20007;
var base_url = 'http://localhost' + ':' + port + '/' + 'api/users';
app.listen(port);*/

describe("Node server simple test", function(){
  it("The simplest test works", function(){
    var t = app.getName('Mike');
    expect(t).toEqual('Hello Mike');
  });
});
describe("Node server async test", function(){
  it("The async test works", function(done){
    app.asyncTest(function(x){
      expect(x).toEqual('Kotik');
      done();
    });
  });
});

/*var app = require('../index.js');
var request = require('supertest');

var users = [{id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator'},
  {id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1},
  {id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev'}];


describe('GET USERS', function() {
  it('initial state', function(done) {
    request(app)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toEqual(users);
        done(err);
      });
  });
});*/
