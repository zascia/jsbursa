/**
 * Created by ashu on 15-Jul-15.
 */
var app = require('../index');
var request = require('supertest');
var http = require('http');
var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

describe('Wrong response code GET ?? /refreshAdmins', function() {
  it('Should response with 200 for refresh admins', function(done) {
    request(app)
      .get('/refreshAdmins')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});

describe('GET USERS', function() {
  it('Check starting server state', function (done) {
    request(app)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(users);
        done();
      });
  });
  it('Check existing user returns 404', function(done) {
    request(app)
      .get('/api/users/100')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});

/*

   как проверить реакцию на запрос без Content-Type?
   кидайте запрос без него и смотрите чтобы отдал 401
 

 it('Check body users', function (done) {
 request(app)
 .get('/api/users')
 .set('Content-Type', 'application/json')
 .end(function (err, res) {
 var resBody = res.body;
 resBody.forEach(function(item, i, resBody) {
 existIdArr.push(item.id);
 });
 maxId = parseInt(_.last(existIdArr)) + 1;
 console.log(existIdArr);
 console.log(maxId);
 done();
 });
 });

 it('check not existing id response', function(done) {
 request(app)
 .get('/api/users/' + maxId)
 .set('Content-Type', 'application/json')
 .end(function (err, res) {
 console.log('Unexisting Id PUT request: ', res.statusCode);
 expect(res.statusCode).toEqual(404);
 done();
 });
 });

 describe('C', function() {
 it('no Content-Type', function(done) {
 request(app)
 .get('/api/users')
 .set('Content-Type', '/')
 .end(function(err, res){
 console.log(res.status);
 expect(res.status).toBe(401);
 done();
 });
 });
 });

 */

/*describe("Node server simple test", function(){
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
*/
