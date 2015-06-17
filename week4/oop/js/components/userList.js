// компонент списка
(function () {
  var dispatcher = new Dispatcher();

  function animate(element) {
    $(element).velocity({ translateX: "-100px" }, {duration: 0});
    $(element).velocity({opacity: "1", translateX: "0"}, {duration: 800, easing: [60, 10]});
  }

  function generateTemplate(data) {
    // в реальности здесь бы вызвался шаблонизатор
    var fragment = document.createDocumentFragment();
    var header = document.createElement('h4');
    var phone = document.createElement('p');
    var deleteLink = document.createElement('a');
    deleteLink.className = 'secondary-content';
    deleteLink.innerHTML = '<i class="remove mdi-action-highlight-remove"></i>';
    header.textContent = data.name;
    phone.textContent = data.phone;
    fragment.appendChild(deleteLink);
    fragment.appendChild(header);
    fragment.appendChild(phone);
    return fragment;
  }

  function UserList(element, storage) {
    var me = this;
    this._element = element;
    var dispatcher = new Dispatcher();

    //подписываемся на события DOM
    element.addEventListener('click', function (e) {
      var container = e.target;
      while (container.tagName !== 'LI') {
        container = container.parentNode;
      }
      if (e.target.classList.contains('remove')) {
        dispatcher.fire('user:remove', container.getAttribute('data-id'));
        e.stopPropagation();
        return;
      }

      dispatcher.fire('user:select', storage.getById(container.getAttribute('data-id')));
    });

    dispatcher.on('user:added', this.addItem.bind(this));
    dispatcher.on('user:removed', this.removeItem.bind(this));
    dispatcher.on('user:updated', this.updateItem.bind(this));
    dispatcher.on('user:select', function (user) {
      var currentActive = element.querySelector('.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      var container = me._element.querySelector('[data-id="' + user.id + '"]');
      container.classList.add('active');
    })
  }

  UserList.prototype.addItem = function addItem(item) {
    var container = document.createElement('li');
    container.setAttribute('data-id', item.id);
    container.className = 'waves-effect waves-orange';
    container.appendChild(generateTemplate(item));
    container.style.opacity = 0;
    if (item instanceof Student && item.strikes === 1) {
      container.classList.add('lime');
    }
    if (item instanceof Student && item.strikes > 1) {
      container.classList.add('blue-grey');
    }
    this._element.appendChild(container);
    animate(container);
  };

  UserList.prototype.updateItem = function updateItem(item) {
    var container = this._element.querySelector('[data-id="' + item.id + '"]');
    container.innerHTML = '';
    container.appendChild(generateTemplate(item));
    container.classList.remove('lime');
    container.classList.remove('blue-grey');
    if (item instanceof Student && item.strikes === 1) {
      container.classList.add('lime');
    }
    if (item instanceof Student && item.strikes > 1) {
      container.classList.add('blue-grey');
    }

    animate(container);
  };


  UserList.prototype.removeItem = function removeItem(item) {
    var container = this._element.querySelector('[data-id="' + item.id + '"]');
    if (!container) {
      return;
    }
    $(container).velocity({opacity: "0", translateX: "-100px"}, {
      duration: 800,
      easing: [60, 10],
      complete: function () { container.parentNode.removeChild(container); }
    });
  };

  window.UserList = UserList;
})();