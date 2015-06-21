/**
 * Created by zascia on 17.06.2015.
 */
(function() {
  var dispatcher = new Dispatcher();

  function doRequest(method, url, data, headers, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (headers) {
      headers.forEach(function head(item) {
        xhr.setRequestHeader(item.name, item.value);
      });
    }
    xhr.send(data);
    xhr.addEventListener('readystatechange', function readyList() {
      if (xhr.readyState === xhr.DONE) {
        if (callback) callback(xhr);
      }
    });
  }

  function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.role = data.role;
  }

  User.load = function(cb) {
    var headers;
    function getUsersList(xhr) {
      var err;
      var listObj;
      var listUser;
      err = listUser = '';
      if (xhr.status === 200) {
        listObj = JSON.parse(xhr.responseText);
        listUser = listObj.map(function(item) {
          if (item.role === 'Administrator' || item.role === 'Admin') {
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
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    doRequest('GET', window.crudURL, null, headers, getUsersList);
  }
  User.prototype.create = function(cb) {
    var headers;
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    doRequest('POST', window.crudURL, null, headers, cb);
  }
  User.prototype.save = function(cb) {
    var headers;
    var err;
    var self;
    err = '';
    self = this;

    function responseSaveUser(xhr) {
      if (xhr.status >= 200 && xhr.status <= 204) {
        cb(err);
      } else {
        err = xhr;
        cb(err);
      }
    }
    function saveUser(xhr) {
      var content;
      content = JSON.stringify(self);
      if (!xhr) {
        doRequest('PUT', window.crudURL + '/' + self.id, content, headers, responseSaveUser);
        return;
      }
      if (xhr.status >= 200 && xhr.status <= 204) {
        self.id = JSON.parse(xhr.responseText).id;
        doRequest('PUT', window.crudURL + '/' + self.id, content, headers, responseSaveUser);
      } else {
        err = xhr;
        cb(err);
      }
    }
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    // check if it is create new user or update existing
    if (!self.id) {
      User.prototype.create.apply(self, [saveUser]);
    } else {
      saveUser();
    }
  }
  User.prototype.remove = function(cb) {
    var headers;
    var id;
    id = this.id;
    function removeUser(xhr) {
      var err;
      err = '';
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 204) {
          cb(err);
        } else {
          err = xhr;
          cb(err);
        }
      }
    }
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    doRequest('DELETE', window.crudURL + '/' + id, null, headers, removeUser);
  }

  function Administrator(data) {
    User.apply(this, arguments);
  }
  function Support(data) {
    User.apply(this, arguments);
    this.location = data.location;
  }
  function Student(data) {
    User.apply(this, arguments);
    this.strikes = data.strikes || 0;
  }

  Administrator.prototype = Object.create(User.prototype);
  Administrator.prototype.constructor = Administrator;
  Support.prototype = Object.create(User.prototype);
  Support.prototype.constructor = Support;
  Student.prototype = Object.create(User.prototype);
  Student.prototype.constructor = Student;

  Administrator.prototype.save = function(cb) {
    function refreshAdmins() {
      var parser = document.createElement('a');
      parser.href = window.crudURL;
      doRequest('GET', parser.protocol + '//' + parser.host + '/refreshAdmins');
    }
    User.prototype.save.apply(this, [cb]);
    refreshAdmins();
  }
  Student.prototype.getStrikesCount = function() {
    return this.strikes;
  }

  window.User = User;
  window.Admin = Administrator;
  window.Support = Support;
  window.Student = Student;
})();
