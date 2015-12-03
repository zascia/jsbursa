/* eslint-disable */
(function(){
  'use strict';
  angular.module('app', [])
    .controller('MainCtrl', function($scope, socket) {
      socket.addEventListener('message', function(e) {
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
      });
    })
    .directive('gamerList', function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        template: '',
        link: function($scope, $element, $attrs) {

        }
      }
    })
    .factory('socket', function($rootScope) {
      var socket = new WebSocket('ws://rating.smartjs.academy/rating');
      return socket;
      /*return {
        on: function(eventName, callback) {
          socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
              callback.apply(socket, args);
            });
          });
        }
      }*/

    });
})();