/* eslint-disable */
(function(){
  'use strict';
  angular.module('app4', [])
    .controller('MainCtrl', function($scope) {
      $scope.run = function(event) {
        event.preventDefault();
        alert('I am run ');
      };
      $scope.items = [
        {
          title: 'Title 1',
          chapters: ['Chapt 1', 'Chapt 2', 'Chapt 3']
        },
        {
          title: 'Title 2',
          chapters: ['Chapt 11', 'Chapt 12', 'Chapt 13']
        },
        {
          title: 'Title 3',
          chapters: ['Chapt 31', 'Chapt 32', 'Chapt 33']
        }
      ]
    })
    // simple analog of ng-click function with isolated scope
    .directive('mySimpleClick', function() {
      return {
        scope: {
          clickHandler: '&myClick'
        },
        link: function(scope, element) {
          element.on('click', function(evt){
            scope.clickHandler({
              $event: evt
            });
          });
        }
      }
    })
    // simple analog of ng-click function with non-isolated scope
    .directive('myClick', function($timeout) {
      return {
        link: function(scope, element, attrs) {
          var handler = attrs.myClick;
          $timeout(function() {
            attrs.$set('myClick', null);
          }, 1000);
          element.on('click', function(evt){
            scope.$eval(attrs.myClick, {
              $event: evt
            });
          });
          scope.$on('$destroy', function() {
            console.log('I am desttroyed');
          });
        }

      }
    })
    /*.directive('demo', function() {
      return {
        scope: {
          param1: '@',
          param2: '=',
          param3: '&'
        },
        template: [
          '<button ng-click="onClick($event)">',
          'Click Me',
          '</button>'
        ].join(''),
        link: function(scope, element, $attrs) {
          console.log('scope.param1', scope.param1);
          console.log('scope.param2', scope.param2);
          console.log('scope.param3', scope.param3);
          scope.onClick = function() {
            scope.param2 = 'vasya';
            scope.param3({
              'VAR1': 1
            });
          }
        }
      };
    })*/;
})();