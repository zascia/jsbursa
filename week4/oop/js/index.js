var userStorage = new UserStorage();

window.addEventListener('load', function () {
  new UserList(document.querySelector('#user-list'), userStorage);
  new UserRemovePopup(userStorage);
  new UserEdit(document.querySelector('.main-content'), userStorage);
  new UserAdd(document.querySelector('.main-content'), userStorage);
  var dispatcher = new Dispatcher();
  document.querySelector('.add-user').addEventListener('click', function () {
    dispatcher.fire('user:add');
  });
  userStorage.load();

});