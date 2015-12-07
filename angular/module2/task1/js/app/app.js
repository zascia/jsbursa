/* eslint-disable */
(function(){
  'use strict';

  angular.module('app', [])
    .controller('MainCtrl', function($scope) {
      // dummy data
      $scope.users = [];
      $scope.userTodos = [];

    })
    .directive('userList', function(userService) {
      return {
        restrict: 'E',
        replace: true,

        template: ['<ul>',
                    '<li ng-repeat="user in users">',
                      '<label><input type="checkbox" value="{{user.id}}" />{{user.name}}</label>',
                    '</li>',
                  '</ul>'].join(''),
        link: function($scope, $element, $attrs) {
          userService.getUsers().then(function(result) {
            $scope.users = result.data;

            $element.on('click', function(evt) {
              console.log('clicked target', evt.target);
              if ('INPUT' == evt.target.nodeName && evt.target.checked) {
                var userId = evt.target.value;
                userService.getTodos(userId).then(function(result) {
                  $scope.userTodos.push(result.data);
                });
              }
            });
          });

        }
      }
    })
    .directive('userTodos', function() {
      return {
        restrict: 'E',
        replace: true,
       
        template: [
          '<ul>',
          '<li ng-repeat="userTodo in userTodos">',
            '<ul>',
              '<li ng-repeat="todo in userTodo" class="completed-{{todo.completed}}">',
              '<span>{{todo.userId}}</span><span>{{todo.title}}</span><span>{{todo.id}}</span>',
              '</li>',
            '</ul>',
          '</li>',
          '</ul>'
        ].join(''),
        link: function($scope, $element, $attrs) {

        }
      }
    })
    .service('userService', function($http) {

      this.getUsers = function() {

        return $http({
          "method": "get",
          "url": 'http://jsonplaceholder.typicode.com/users'
        });

      }

      this.getTodos = function(userId) {
        var urlTodo = 'http://jsonplaceholder.typicode.com/users/' + userId + '/todos';
        return $http({
          "method": "get",
          "url": urlTodo
        });
      }

    });




})();