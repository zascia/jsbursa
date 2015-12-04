/* eslint-disable */
(function(){
  'use strict';

  angular.module('app', [])
    .controller('MainCtrl', function($scope) {
      // dummy data
      $scope.users = [
        {id: 1, name: 'Haha', points: 768},
        {id: 2, name: 'Hihi', points: 423},
        {id: 3, name: 'Hehe', points: 911}
      ];
      /*socket.addEventListener('message', function(e) {
        console.log('message', e.data);
      });

      socket.addEventListener('open', function(e) {
        console.log('start', e.data);
      });

      socket.addEventListener('error', function(e) {
        console.log('error', e.data);
      });

      socket.addEventListener('close', function(e) {
        console.log('close', e.data);
      });*/
    })
    .directive('userTable', function(userService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          users: '='
        },
        template: ['<table>',
                    '<tr><th>Id</th><th>User</th><th>Scores</th></tr>',
                    '<tr ng-repeat="user in users | orderBy: \'-points\'">',
                      '<td>{{user.id}}</td>',
                      '<td>{{user.name}}</td>',
                      '<td>{{user.points}}</td>',
                    '</tr>',
                  '</table>'].join(''),
        link: function($scope, $element, $attrs) {
          userService.getUsers().then(function(result) {
            $scope.users = result.data.records;
          });
        }
      }
    })
    .service('userService', function($http) {

      this.getUsers = function() {

        return $http({
          "method": "get",
          "url": 'http://rating.smartjs.academy/rating'
        });

        /** to do later --> implement without $http
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open('get', 'http://rating.smartjs.academy/rating');
        xhr.addEventListener('readystatechange', function() {
          if ( xhr.readyState === 4 ) {
            console.log('data received', xhr);
          }
        });*/
      }

    })
    /*.factory('socket', function($rootScope) {
      var socket = new WebSocket('ws://rating.smartjs.academy/rating');
      return socket;
      /!*return {
        on: function(eventName, callback) {
          socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
              callback.apply(socket, args);
            });
          });
        }
      }*!/

    })*/;




})();