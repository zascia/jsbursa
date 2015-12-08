/* eslint-disable */
(function(){
  'use strict';

  angular.module('app', [])
    .controller('MainCtrl', function($scope) {

    })
    .directive('userList', function(userService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {

        },
          template: ['<div class="wrapper-inner">',
                      '<article class="content-holder">',
                        '<h1>User List</h1>',
                          '<ul>',
                            '<li ng-repeat="user in users">',
                              '<label><input type="checkbox" value="{{user.id}}" />{{user.name}}</label>',
                            '</li>',
                          '</ul>',
                      '</article>',
                      '<aside class="content-holder">',
                        '<user-todos></user-todos>',
                      '</aside>',
                      '</div>'
                  ].join(''),
        link: function($scope, $element, $attrs) {
          userService.getUsers().then(function(result) {
            var me = $scope;
            $scope.users = result.data;
            $scope.userTodos = [];

            $element.on('click', function(evt) {
              console.log('clicked target', evt.target);
              if ('INPUT' == evt.target.nodeName && evt.target.checked) {
                var userId = evt.target.value;
                userService.getTodos(userId).then(function(result) {
                  console.log('result', result);
                  console.log('scope', $scope);
                  $scope.userTodos.push(result.data);
                });
              }
            });
          }).catch(function(err) {
            console.log('error', err);
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

      };

      this.getTodos = function(userId) {
        var urlTodo = 'http://jsonplaceholder.typicode.com/users/' + userId + '/todos';
        return $http({
          "method": "get",
          "url": urlTodo
        });
      };

    });




})();