// попап "Вы действительно хотите...
(function () {

  function UserRemovePopup (storage) {
    this._storage = storage;
    var dispatcher = new Dispatcher();
    dispatcher.on('user:remove', function (id){
      if(confirm('Вы действительно ходите удалить этого пользователя?')) {
        storage.removeById(id);
      }
    });
  }
  window.UserRemovePopup = UserRemovePopup;
})();