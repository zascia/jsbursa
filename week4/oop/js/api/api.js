/**
 * Created by zascia on 17.06.2015.
 */
(function() {
  var dispatcher = new Dispatcher();
  function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.role = data.role;
  }
  function Administrator(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.role = data.role;
  }
  function Support(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.phone = data.phone;
    this.role = data.role;
  }
  function Student(data) {
    this.id = data.id;
    this.name = data.name;
    this.strikes = data.strikes;
    this.phone = data.phone;
    this.role = data.role;
  }

  Administrator.prototype = Object.create(User.prototype);
  Support.prototype = Object.create(User.prototype);
  Student.prototype = Object.create(User.prototype);

  User.load = function(cb) {
    var listObj;
    var listUser;
    var err;
    var xhr;
    err = listUser = '';
    xhr = new XMLHttpRequest();
    xhr.open('GET', window.crudURL);
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          listObj = JSON.parse(xhr.responseText);
          listUser = listObj.map(function(item) {
            if (item.role === 'Administrator') {
              return new Administrator(item);
            } else if (item.role === 'Support') {
              return new Support(item);
            } else {
              return new Student(item);
            }
          });
          cb(err, listUser);
        } else {
          err = xhr;
          cb(err, listUser);
        }
      }
    });
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }
  User.save = function(cb) {
    // ???????? ?????? ???????????? ???? ??????????? ??????? POST ?? window.crudURL, ? ????? ???????? id ?????
    // ????????? ????????
    var xhr;
    var content;
    var err;
    var userId;
    err = '';
    xhr = new XMLHttpRequest();
    xhr.open('POST', window.crudURL);
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          content = JSON.parse(xhr.responseText);
          userId = content.id;
          console.log('userId = ' + userId);
          cb(err);
        } else {
          err = xhr;
          cb(err);
        }
      }
    });
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }
  window.User = User;
  window.Administrator = Administrator;
  window.Support = Support;
  window.Student = Student;
})();
