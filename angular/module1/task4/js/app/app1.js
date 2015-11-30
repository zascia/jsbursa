/**
 * Created by ashu on 30-Nov-15.
 */
// this is my version

angular.module('app', [])
  .controller('MainController', function($scope) {
    // I don't know if I need it here at all;
  })
  .directive('smartButton', function() {
    return {
      restrict: 'E',
      require: '?makeTransparent',
      scope: {
        text: '@',
        loading: '@'
      },
      link: function(scope, element, attributes, transparentCtrl) {
        if (!scope.text) scope.text = 'Some deafault Val';
        if (scope.loading) {
          setTimeout(function() {
            scope.$apply(function() {
              scope.text = 'loading img';
              transparentCtrl.makeTransparent(element);
            });
          }, 1000);
        }
      },

      template: '<button> {{text}}</button>',
      replace: true
    }
  })
  .directive('makeTransparent', function() {
    return {
      restrict: 'A',
      controller: function($scope) {
        this.makeTransparent = function(el) {
          el.css('opacity', '0.5');
        };
        return this;
      }
    };
  });

