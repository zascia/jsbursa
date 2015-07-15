/**
 * Created by nikita on 14.07.2015.
 */
/**
 * Created by nikita on 08.07.2015.
 */
var http = require('http');
var _ = require('lodash');

//� users ���� �������� � Administrator �� Admin.
//������: ������������ ��������� ��������� ������� ��� ��������� ������ �������������
var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Admin' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

var server = http.createServer(function(request, response){
  var data = '';

  //������� ��������� content-type.�� ����� ������ �������� ��� �����,������� �������
  // ����������
  var headers = {
    'Content-type': 'application/pdf'
  };

  var path = request.method + ' ' + request.url;

  var id = path.split('/')[3];
  var item;

  //������� ��� ������ �� ��,���� �������� � ���� �� ��������� � ���������
  //��� �� ����� ������ ������������ ���.
  //������ ������������ ��������� ��������� PUT-�������,
  // ������������ ��������� ��������� ������� �� ��������
  if(id){
    item = _.find(users, {id: id});
    if(!item){
      response.writeHead(403, headers);
      response.end();
      return;
    }
  }

  request.on('data', function(chunk){
    data += chunk.toString('UTF-8');
  });
  request.on('end', function(){
    if(path === 'POST /api/users'){
      var newUser = JSON.parse(data);

      //������������ �������� �� ���������� ����.
      //������ ������������ ��������� ������� ��� ����
      //if(!newUser.role){
      //  newUser.role = 'Student';
      //}

      //������������ �������� �� �������� ����
      //������ ������������ ��������� ������������ ����
      //if(!(newUser.role === 'Administrator' || newUser.role === 'Support' || newUser.role === 'Student')){
      //  response.writeHead(401, headers);
      //  response.end();
      //  return;
      //}

      //������� ������������ ��������� id.���� ������� ������� � id = 2, � �����
      //������� ����,������ id = 3 � ����� � ��������� ����� ������ ��� �������
      //� ����������� id.��� ����� ��������� ��� ��������� �������� GET �������
      //�� /api/users
      //������ ������������ ��������� ������� �� �������� ��������������
      //������������ ��������� ������� �� �������� ���������
      newUser.id = users.length + 1;

      //������������ ������ ������ ������� � ���������.����������� ��� ��,��� � ������ ����
      //������ ������������ ��������� ������� �� �������� ��������������
      //������������ ��������� ������� �� �������� ���������
      //users.push(newUser);

      //������� ������������ ������ � 204 �� 200.
      //������ ������������ ��������� ������� �� �������� ��������������
      //������������ ��������� ������� �� �������� ���������
      response.writeHead(200, headers);

      //������� ������������ ������.������ ������������ ������ � ����� id
      //������ ������������ ��������� ������� �� �������� ��������������
      //������������ ��������� ������� �� �������� ���������
      response.end();
      return;
    }

    if(request.method == 'PUT'){
      var update = JSON.parse(data);
      //������������ �������� �� ���������� ����.
      //������ ������������ ��������� ������� ��� ����
      //if(!update.role){
      //  update.role = 'Student';
      //}

      users.forEach(function(user,index){
        if(+user.id === +update.id){
          //������������ ������ ������ � ���������.����������� GET �������� �� /api/users
          //������ ������������ ��������� PUT-�������
          //������������ ��������� PUT-������� (��������������)
          //users.splice(index, 1, update);

          //������� ������ ������
          //������ ������������ ��������� PUT-�������
          //������������ ��������� PUT-������� (��������������)
          response.writeHead(201, headers);
          response.end();
          return;
        }
      });
    }

    if(path.indexOf('DELETE /api/users') === 0 && item){
      //����������� �������� �� ��������� ����������� GET �������� �� /api/users
      //������ ������������ ��������� ������� �� ��������
      //users.splice(users.indexOf(item), 1);
      response.writeHead(204, headers);
      response.end();
      return;
    }

  });
  //���������� ����� �� /refreshAdmins.
  //������ ������������ ��� ������ �� GET �� /refreshAdmins
  //if(path === 'GET /refreshAdmins'){
  //  response.end();
  //  return;
  //}

  //����� ������������ ��� ������ �� /refreshAdmins.
  //������ ������������ ��� ������ �� GET �� /refreshAdmins
  if(path === 'GET /refreshAdmins'){
    response.writeHead(205, headers);
    response.end();
    return;
  }
  //����������� �������� �� content-type
  //������ ������������ ������� �� ������ ��� Content-Type
  //������������ ������� �� ������ � ������������ Content-Type
  //if(!request.headers['content-type'] || request.headers['content-type'].indexOf('application/json') === -1){
  //  response.writeHead(401);
  //  response.end();
  //  return;
  //}

  //������� ������ ������ �� ������ � content-type
  //������ ������������ ������� �� ������ ��� Content-Type
  //������������ ������� �� ������ � ������������ Content-Type
  if(!request.headers['content-type'] || request.headers['content-type'].indexOf('application/json') === -1){
    response.writeHead(403);
    response.end();
    return;
  }

  //����������� ����� �� GET ��� ��������� ������ ������
  //������ ������������ ��������� ��������� ������� ��� ��������� ������ �������������
  //if(path === 'GET /api/users'){
  //  response.writeHead(200, headers);
  //  response.write(JSON.stringify(users));
  //  response.end();
  //  return;
  //}

  //������� ��� ������ �� GET ��� ��������� ������
  //������ ������������ ��������� ��������� ������� ��� ��������� ������ �������������
  if(path === 'GET /api/users'){
    response.writeHead(203, headers);
    response.write(JSON.stringify(users));
    response.end();
    return;
  }

  //������ �������� ������� � ����� �� GET ��� ��������� ������
  //������ ������������ ��������� ��������� ������� ��� ��������� ������ �������������
  if(path === 'GET /api/users'){
    response.writeHead(200, headers);
    response.end();
    return;
  }

});

if(module.parent){
  module.exports = server;
} else {
  server.listen(20007);
}