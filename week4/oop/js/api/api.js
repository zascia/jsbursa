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
        callback(xhr);
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
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    doRequest('GET', window.crudURL, null, headers, getUsersList);
  }
  User.prototype.save = function(cb) {
    var headers;
    var err;
    err = '';
    function saveUser(xhr) {
      if (xhr.status >= 200 && xhr.status <= 204) {
        cb(err);
      } else {
        err = xhr;
        cb(err);
      }
    }
    function createUser(xhr) {
      var content;
      if (xhr.status >= 200 && xhr.status <= 204) {
        this.id = JSON.parse(xhr.responseText);
        doRequest('PUT', window.crudURL, xhr.responseText, headers, saveUser);
      } else {
        err = xhr;
        cb(err);
      }
    }
    headers = [{'name': 'Content-Type', 'value': 'application/json'}];
    doRequest('POST', window.crudURL, null, headers, createUser);
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
    this.strikes = data.strikes;
  }

  Administrator.prototype = Object.create(User.prototype);
  Administrator.prototype.constructor = Administrator;
  Support.prototype = Object.create(User.prototype);
  Support.prototype.constructor = Support;
  Student.prototype = Object.create(User.prototype);
  Student.prototype.constructor = Student;

  window.User = User;
  window.Administrator = Administrator;
  window.Support = Support;
  window.Student = Student;
})();
