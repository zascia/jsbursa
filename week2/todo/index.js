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
  var list = document.querySelector('.todolist');
  var listItems = state.todos;
  var i;
  list.innerHTML = '';
  for ( i = 0; i < listItems.length; i++ ) {
    var el = document.createElement('li');
    el.innerHTML = listItems[i];
    list.appendChild(el);
  }
}

function addToDo() {
  var todoInput = document.querySelector('.todoinput');
  var todoValue = todoInput.value;
  if (todoValue === '') {
    document.querySelector('.errormessage').innerHTML = options.errorEmptyText;
    return false;
  }
  state.todos.push(todoValue);
  update();
  todoInput.value = '';
  localStorage.setItem('tasks', JSON.stringify(state));
}
function clearErrorMsg() {
  if ( document.querySelector('.errormessage').innerHTML !== '' )  document.querySelector('.errormessage').innerHTML = '';
}
function init() {
  update();
  options.errorEmptyText = 'Data is empty';
  var btn = document.querySelector('.addToDo');
  var todoInput = document.querySelector('.todoinput');
  btn.addEventListener('click', addToDo);
  todoInput.addEventListener('focus', clearErrorMsg);
}

window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  init();
});
