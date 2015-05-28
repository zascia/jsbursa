//Ваш код будет здесь
var options = {};
var state = {
  todos: []
};
var data = localStorage.getItem('tasks');
if (data) {
  state = JSON.parse(localStorage.getItem('tasks'));
}

function update() {
  var list = options.list;
  var listItems = state.todos;
  var el
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
  var todoValue = options.todoInput.value;
  if (todoValue === '') {
    options.errorMsgDiv.innerHTML = options.errorEmptyText;
    return false;
  }
  state.todos.push(todoValue);
  update();
  options.todoInput.value = '';
  localStorage.setItem('tasks', JSON.stringify(state));
}
function clearErrorMsg() {
  if ( options.errorMsgDiv.innerHTML !== '' ) options.errorMsgDiv.innerHTML = '';
}
function init() {
  var btn;
  options.errorEmptyText = 'Data is empty';
  options.errorMsgDiv = document.querySelector('.error-message');
  options.todoInput = document.querySelector('.todoinput');
  options.list = document.querySelector('.todolist');
  update();
  btn = document.querySelector('.addToDo');
  btn.addEventListener('click', addToDo);
  options.todoInput.addEventListener('focus', clearErrorMsg);
  options.todoInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) addToDo();
  });
}

window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  init();
});
