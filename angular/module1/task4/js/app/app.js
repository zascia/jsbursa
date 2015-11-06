/**
 * Created by ashu on 06-Nov-15.
 */
angular.module('app', ['components'])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text: 'learn angular', done: true},
      {text: 'find a job', done: false}
    ];

    todoList.addTodo = function() {
      todoList.todos.push({text: todoList.todoText, done: false});
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          todoList.todos.push(todo);
        };
      });
    };

  });