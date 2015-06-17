//компонент списка
(function () {
  var dispatcher = new Dispatcher();

  function UserEdit(element, storage) {
    this._element = element;
    this._storage = storage;

    dispatcher.on('user:select', this.showAddUserForm.bind(this));
  }

  UserEdit.prototype.showAddUserForm = function showForm(user) {
    var me = this;
    var inputName;
    var inputPhone;
    var strikesZone;
    var cityZone;
    this._element.innerHTML = document.querySelector('#editTemplate').innerHTML;
    inputName = this._element.querySelector('#icon_prefix');
    inputPhone = this._element.querySelector('#icon_telephone');
    strikesZone = this._element.querySelector('.strikes-field');
    cityZone = this._element.querySelector('.city-field');
    inputName.value = user.name;
    inputPhone.value = user.phone;

    if (user instanceof Student) {
      strikesZone.querySelector('input').value = user.getStrikesCount();
    } else {
      strikesZone.style.display = 'none';
    }

    if (user instanceof Support) {
      cityZone.querySelector('select').value = user.location;
      $('select', this._element).material_select();
    } else {
      cityZone.style.display = 'none';
    }

    this._element.querySelector('.save-btn').addEventListener('click', function () {
      var data = {
        id: user.id,
        name: inputName.value,
        phone: inputPhone.value,
        strikes: strikesZone.querySelector('input').value,
        location: cityZone.querySelector('select').value
      };
      me._storage.updateUser(data);
    });
  };

  window.UserEdit = UserEdit;
})();