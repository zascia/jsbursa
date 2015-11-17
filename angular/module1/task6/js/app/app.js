/* eslint-disable */
(function(){
  'use strict';
  angular.module('app4', [])
    .controller('MainCtrl', function($scope) {
      $scope.hideSidebar = function(event) {
        event.preventDefault();
        console.log('event', event);
        console.log('this', this);
      };
      $scope.clickedEl = '';
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
    // simple analog of ng-click function with non-isolated scope
    .directive('actionOnClickOutside', function() {
      return {
        link: function(scope, element, attrs) {
          var handler = attrs.actionOnClickOutside;
          console.log('handler', handler);
          var body = angular.element(document).find('body');
          body.on('click', function(evt){
            /*scope.$apply(
            console.log('body', body));*/
            console.log('body', body);
            scope.$eval(handler, {
              $event: evt
            });
          });
        }

      }
    });
})();