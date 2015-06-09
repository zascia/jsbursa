// Ваш код будет здесь
var options = {};
var state = {
  todos: []
};
var data = localStorage.getItem('tasks');
if (data) {
  state.todos = JSON.parse(data);
}
function clearErrorMsg() {
  'use strict';
  if ( options.errorMsgDiv && options.errorMsgDiv.innerHTML !== '' ) options.errorMsgDiv.innerHTML = '';
}
function update() {
  'use strict';
  var list = options.list;
  var listItems = state.todos;
  var el;
  var i;
  listItems.sort();
  list.innerHTML = '';
  for ( i = 0; i < listItems.length; i++ ) {
    el = document.createElement('li');
    el.innerHTML = listItems[i];
    list.appendChild(el);
  }
}
function addToDo() {
  'use strict';
  var todoValue = options.todoInput.value;
  var dataToPut = '';
  if (todoValue === '') {
    options.errorMsgDiv.innerHTML = options.errorEmptyText;
    return false;
  }
  clearErrorMsg();
  state.todos.push(todoValue);
  state.todos.sort();
  update();
  options.todoInput.value = '';
  dataToPut = JSON.stringify(state.todos);
  localStorage.setItem('tasks', dataToPut);
}
function init() {
  'use strict';
  var btn;
  options.errorEmptyText = 'Data is empty';
  options.errorMsgDiv = document.querySelector('.error-message');
  options.todoInput = document.querySelector('input');
  options.list = document.querySelector('ul');
  update();
  btn = document.querySelector('button');
  btn.addEventListener('click', addToDo);
  options.todoInput.addEventListener('focus', clearErrorMsg);
  options.todoInput.addEventListener('keyup', function addSmthFunc(e) {
    if (e.keyCode === 13) addToDo();
  });
}

window.addEventListener('DOMContentLoaded', function initSmth() {
  'use strict';
  init();
});
