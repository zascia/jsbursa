/**
 * Created by zascia on 17.06.2015.
 */
(function() {
  var dispatcher = new Dispatcher();
  function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.phone = data.phone;
    this.role = data.role;
  }
  function Administrator() {

  }
  Administrator.prototype = Object.create(User.prototype);

  function Support() {

  }
  Support.prototype = Object.create(User.prototype);

  function Student() {

  }
  Student.prototype = Object.create(User.prototype);
  
  User.load = function(cb) {
    var listObj;
    var listUser;
    var err;
    var xhr;
    err = list = '';
    xhr = new XMLHttpRequest();
    xhr.open('GET', window.crudURL);
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          listObj = JSON.parse(xhr.responseText);
          listUser = listObj.map(function(item) {
            if (item.role === 'Administrator') return new Administrator(item);
            if (item.role === 'Support') return new Support(item);
            if (item.role === 'Student') return new Student(item);
          });
          console.log('list of users ', listUser, ' type of list', typeof listUser);
          cb(err, listUser);
        } else {
          err = xhr;
          cb(err, listUser);
        }
      }
    });
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

  };
  window.User = User;
  window.Administrator = Administrator;
  window.Support = Support;
  window.Student = Student;
})();
