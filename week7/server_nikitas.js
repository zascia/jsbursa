/**
 * Created by ashu on 15-Jul-15.
 */
//????? ?????.??? ?? ???? ???.??? ??,??? ? ????? ????????.
var http = require('http');
var _ = require('lodash');
var server = http.createServer();
var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

server.on('request', function (req, res){
  var data = '';
  req.on('data',  function(chunk){
    data += chunk.toString('UTF-8');
  });
  var path = req.method + ' ' + req.url;

  var headers = {
    'Content-type' : 'application/json'
  };
  if(path === 'GET / refreshAdmins'){
    res.end();
    return;
  }


  if(!req.headers['content-type'] || req.headers['content-type'].indexOf('application/json') === -1){
    res.writeHead(401);
    res.end();
    return;
  }

  var id = path.split('/')[3];
  var item;
  if(id){
    item = _.find(users, {id: id});
    if(!item){
      res.writeHead(404, headers);
      res.end();
      return;
    }
  }

  if(path.indexOf('DELETE /api/users') === 0 && item){
    users.splice(users.indexOf(item), 1);
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if(path === 'GET /api/users'){
    res.writeHead(200, {'Content-type' : 'application/json'});
    res.end(JSON.stringify(users));
    return;
  }

  if(path.indexOf('PUT /api.users') === 0 && item){
    _.assign(item, JSON.parse(data));
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if(path === 'POST /api/users' && item){
    var newUser = JSON.parse(data);
    if(!newUser.role){
      newUser.role = 'Student';
    }
    newUser.id = users.length + 1;
    users.push(newUser);
    res.writeHead(204, headers);
    res.end(JSON.stringify(newUser));
    return;
  }
});

if(module.parent){
  module.exports = server;
} else {
  server.listen(20007);
}
