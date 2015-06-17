(function() {
  var dispatcher = new Dispatcher();

  function UserStorage() {
    this.listeners = {};
    this.items = [];
  }

  UserStorage.prototype.getById = function getById(id) {
    var i;
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        return this.items[i];
      }
    }
  };

  UserStorage.prototype.removeById = function removeById(id) {
    var me = this;
    var user = this.getById(+id);
    user.remove(function (err) {
      if (err) {
        alert('Ошибка удаления пользователя');
      }
      me.items.splice(me.items.indexOf(user), 1);
      dispatcher.fire('user:removed', user);
    });
  };

  UserStorage.prototype.updateUser = function updateUser(data) {
    var me = this;
    var user = this.getById(data.id);

    Object.keys(data).forEach(function (key) {
      user[key] = data[key];
    });

    user.save(function (err) {
      if (err) {
        alert('Ошибка обновления пользователя');
      }
      dispatcher.fire('user:updated', user);
    });
  };

  UserStorage.prototype.createUser = function createUser(data, cb) {
    var me = this;
    var user = new window[data.role](data);
    user.save(function (err) {
      if (err) {
        alert('Ошибка обновления пользователя');
        cb(new Error());
      }
      if (!user.id) {
        alert('После сохранения не появился id! это ошибка!')
        cb(new Error());
      }
      me.items.push(user);
      dispatcher.fire('user:added', user);
      cb(null, user);
    });
  };


  UserStorage.prototype.load = function () {
    var me = this;
    User.load(function (err, list) {
      if (err) {
        alert('Ошибка загрузки списка пользователей');
        return;
      }
      list.forEach(function (record) {
        if (!(record instanceof User)) {
          throw new Error('User storage can store only Users');
        }
        me.items.push(record);
        dispatcher.fire('user:added', record);
      });
    });
  };

  window.UserStorage = UserStorage;
})();





