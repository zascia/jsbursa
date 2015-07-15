/**
 * Created by nikita on 14.07.2015.
 */
/**
 * Created by nikita on 08.07.2015.
 */
var http = require('http');
var _ = require('lodash');

//В users роль изменена с Administrator на Admin.
//Ошибка: Неправильное начальное состояние сервера при получении списка пользователей
var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Admin' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

var server = http.createServer(function(request, response){
  var data = '';

  //Изменен заголовок content-type.От этого должны валиться все тесты,которые требуют
  // правильный
  var headers = {
    'Content-type': 'application/pdf'
  };

  var path = request.method + ' ' + request.url;

  var id = path.split('/')[3];
  var item;

  //Изменен код ответа на то,если айдишник в урле не находится в хранилище
  //Так же можно просто закомментить это.
  //Ошибки Некорректная обработка неверного PUT-запроса,
  // Некорректная обработка неверного запроса на удаление
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

      //Закомменчена проверка на отсутствие роли.
      //Ошибка Некорректная обработка запроса без роли
      //if(!newUser.role){
      //  newUser.role = 'Student';
      //}

      //Закомменчена проверка на валидную роль
      //Ошибка Некорректная обработка некорректной роли
      //if(!(newUser.role === 'Administrator' || newUser.role === 'Support' || newUser.role === 'Student')){
      //  response.writeHead(401, headers);
      //  response.end();
      //  return;
      //}

      //Сделана неправильная генерация id.Если удалить элемент с id = 2, а потом
      //сделать пост,выдаст id = 3 и тогда в хранилище будут лежать два объекта
      //с одинаковыми id.Это можно проверить при повторной отправке GET запроса
      //на /api/users
      //Ошибка Некорректная обработка запроса на создание администратора
      //Некорректная обработка запроса на создание помощника
      newUser.id = users.length + 1;

      //Закомменчена запись нового объекта в хранилище.Проверяется тем же,что и ошибка выше
      //Ошибка Некорректная обработка запроса на создание администратора
      //Некорректная обработка запроса на создание помощника
      //users.push(newUser);

      //Изменен возвращаемый статус с 204 на 200.
      //Ошибка Некорректная обработка запроса на создание администратора
      //Некорректная обработка запроса на создание помощника
      response.writeHead(200, headers);

      //Изменен возвращаемый объект.Должен возвращаться объект с полем id
      //Ошибка Некорректная обработка запроса на создание администратора
      //Некорректная обработка запроса на создание помощника
      response.end();
      return;
    }

    if(request.method == 'PUT'){
      var update = JSON.parse(data);
      //Закомменчена проверка на отсутствие роли.
      //Ошибка Некорректная обработка запроса без роли
      //if(!update.role){
      //  update.role = 'Student';
      //}

      users.forEach(function(user,index){
        if(+user.id === +update.id){
          //Закомменчена замена данных в хранилище.Проверяется GET запросом на /api/users
          //Ошибка Некорректная обработка PUT-запроса
          //Некорректная обработка PUT-запроса (администратора)
          //users.splice(index, 1, update);

          //Изменен статус ответа
          //Ошибка Некорректная обработка PUT-запроса
          //Некорректная обработка PUT-запроса (администратора)
          response.writeHead(201, headers);
          response.end();
          return;
        }
      });
    }

    if(path.indexOf('DELETE /api/users') === 0 && item){
      //Закоменчено удаление из хранилища Проверяется GET запросом на /api/users
      //Ошибка Некорректная обработка запроса на удаление
      //users.splice(users.indexOf(item), 1);
      response.writeHead(204, headers);
      response.end();
      return;
    }

  });
  //Закоменчен ответ на /refreshAdmins.
  //Ошибка Неправильный код ответа на GET на /refreshAdmins
  //if(path === 'GET /refreshAdmins'){
  //  response.end();
  //  return;
  //}

  //Выдан неправильный код ответа на /refreshAdmins.
  //Ошибка Неправильный код ответа на GET на /refreshAdmins
  if(path === 'GET /refreshAdmins'){
    response.writeHead(205, headers);
    response.end();
    return;
  }
  //Закоменчена проверка на content-type
  //Ошибка Неправильная реакция на запрос без Content-Type
  //Неправильная реакция на запрос с неправильным Content-Type
  //if(!request.headers['content-type'] || request.headers['content-type'].indexOf('application/json') === -1){
  //  response.writeHead(401);
  //  response.end();
  //  return;
  //}

  //Изменен статус ответа на ошибки с content-type
  //Ошибка Неправильная реакция на запрос без Content-Type
  //Неправильная реакция на запрос с неправильным Content-Type
  if(!request.headers['content-type'] || request.headers['content-type'].indexOf('application/json') === -1){
    response.writeHead(403);
    response.end();
    return;
  }

  //Закомменчен ответ на GET для получения списка юзеров
  //Ошибка Неправильное начальное состояние сервера при получении списка пользователей
  //if(path === 'GET /api/users'){
  //  response.writeHead(200, headers);
  //  response.write(JSON.stringify(users));
  //  response.end();
  //  return;
  //}

  //Изменен код ответа на GET для получения списка
  //Ошибка Неправильное начальное состояние сервера при получении списка пользователей
  if(path === 'GET /api/users'){
    response.writeHead(203, headers);
    response.write(JSON.stringify(users));
    response.end();
    return;
  }

  //Убрана отправка объекта в ответ на GET для получения списка
  //Ошибка Неправильное начальное состояние сервера при получении списка пользователей
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