//компонент списка
(function () {
  var dispatcher = new Dispatcher();

  function UserAdd(element, storage) {
    this._element = element;
    this._storage = storage;

    dispatcher.on('user:add', this.showAddUserForm.bind(this));
  }

  UserAdd.prototype.showAddUserForm = function showForm() {
    var me = this;
    var inputName;
    var inputPhone;
    var inputRole;
    this._element.innerHTML = document.querySelector('#addTemplate').innerHTML;
    inputName = this._element.querySelector('#icon_prefix');
    inputPhone = this._element.querySelector('#icon_telephone');
    inputRole = this._element.querySelector('select');
    $('select', this._element).material_select();

    this._element.querySelector('.save-btn').addEventListener('click', function () {
      var data = {
        name: inputName.value,
        phone: inputPhone.value,
        role: inputRole.value
      };
      me._storage.createUser(data, function (err, user) {
        if (err) {
          alert('Все плохо!');
        }
        dispatcher.fire('user:select', user);
      });
    });
  };

  window.UserAdd = UserAdd;
})();