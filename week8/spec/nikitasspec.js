var node = require('../js/index');

var request = require('supertest');

var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

describe('Неправильный код ответа на GET на /refreshAdmins', function(){
  it('Проверка на статус 200 и наличие Content-Type', function(done){
    request(node)
      .get('/refreshAdmins')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        expect(res.status).toEqual(200);
        done(err);
      });
  });
});
describe('Неправильное начальное состояние сервера при получении списка пользователей', function(){
  it('Проверка на правильность ответа при GET на /api/users с правильным Content-Type', function(done){
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        expect(res.body).toEqual(users);
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done(err);
      });
  });
});
describe('Неправильная реакция на запрос без Content-Type', function() {
  it('Проверка без контент тайпа', function (done) {
    request(node)
      .get('/api/users')
      .end(function (err, res) {
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .post('/api/users')
      .end(function (err, res) {
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .del('/api/users')
      .end(function (err, res) {
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .put('/api/users')
      .end(function (err, res) {
        expect(res.status).toEqual(401);
        done();
      });
  });
});
describe('Неправильная реакция на запрос с неправильным Content-Type', function(){
  it('Неправильная реакция на запрос с неправильным Content-Type', function(done){
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/pdf')
      .end(function(err, res){
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/pdf')
      .end(function(err, res){
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/pdf')
      .end(function(err, res){
        expect(res.status).toEqual(401);
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/pdf')
      .end(function(err, res){
        expect(res.status).toEqual(401);
        done();
      });
  });
});
describe('Некоррестная обработка PUT запроса', function(){
  it('Проверка при правильном id и role', function(done){
    var newUser = {
      id: '2',
      name: 'Ivanov Ivan',
      phone: '+380670000002',
      role: 'Support',
      location: 'Kharkov'
    };
    request(node)
      .put('/api/users/2')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end(function(err, res){
        //console.log(newUser);
        expect(res.status).toEqual(204);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        //console.log(res.body);
        expect(res.body[1]).toEqual(newUser);
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done(err);
      });
    users[1] = newUser;
  });
});
describe('Некорректная обработка PUT запроса (администратора)', function(){
  it('Некоректная обработка PUT запроса (администратора)', function(done){
    var newAdmin = users[0];
    newAdmin.name = 'Ivan Pupkin';
    request(node)
      .put('/api/users/1')
      .set('Content-Type', 'application/json')
      .send(newAdmin)
      .end(function(err, res){
        //console.log(newAdmin);
        expect(res.status).toEqual(204);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        //console.log(res.body);
        expect(res.body[0]).toEqual(newAdmin);
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done(err);
      });
    users[0] = newAdmin;
  });
});
describe('Некорректная обработка неверного PUT запроса', function(){
  it('Некорректная обработка неверного PUT запроса', function(done){
    var newUser = users[0];
    newUser.name = 'Ivan Pupkin';
    request(node)
      .put('/api/users/4')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end(function(err, res){
        expect(res.status).toEqual(404);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        expect(res.body).toEqual(users);
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
  });
});
describe('Некорректная обработка запроса на удаление', function(){
  it('Некорректная обработка запроса на удаление', function(done){
    request(node)
      .del('/api/users/3')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        //console.log(res.body);
        expect(res.status).toEqual(204);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
    users.splice(2,1);
    request(node)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        //console.log(res.body);
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.body).toEqual(users);
        done();
      });
  });
});
describe('Некорректная обработка неверного запроса на удаление', function(){
  it('Некорректная обработка неверного запроса на удаление', function(){
    request(node)
      .del('/api/users/8')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        expect(res.status).toEqual(404);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
      });
  });
});
describe('Некорректная обработка некорректной роли', function(){
  it('Некорректная обработка некорректной роли', function(done){
    var newEntry = {
      name:'Anton Ivanov',
      phone:'+380946849102',
      role:'HZ'
    };
    request(node)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(newEntry)
      .end(function(err, res){
        expect(res.status).toEqual(401);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        done();
      });
  });
});
describe('Некорректная обработка запроса без роли', function(){
  it('Некорректная обработка запроса без роли', function(done){
    var newEntry = {
      name:'Anton Ivanov',
      phone:'+380946849102'
    };
    request(node)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(newEntry)
      .end(function(err, res){
        expect(res.status).toEqual(204);
        expect(res.headers['content-type']).toBeDefined();
        expect(res.headers['content-type']).toEqual('application/json');
        //expect(res.body.id).toBeDefined();
        //expect(res.body.role).toBeDefined();
        //expect(res.body.role).toEqual('Student');
        done();
      });
  });
});