

angular.module('app', [])
  .controller('MainController', function($scope) {
    // I don't know if I need it here at all;
  })
  .directive('smartButton', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        text: '@',
        loading: '='
      },
      require: 'smartButton',
      controller: function() {
        // array for handlers storage, THIS allows to use array in LINK for fifferent directives that required this one
        this._handlers = [];
        // onSpinnerChange is a function that accepts callback fn
        this.onSpinnerChange = function(fn) {
          // store function that would be invoked later
          this._handlers.push(fn);
        }
      },
      link: function($scope, $element, $attrs, smartButtonCtrl) {
        $scope.showSpinner = false;
        $scope.$watch('loading', function(newValue) {
          if (newValue) {
            $timeout(function() {
              $scope.showSpinner = true;
              smartButtonCtrl._handlers.forEach(function(fn) {
                fn($scope.showSpinner);
              });
            }, 1000);
          } else {
            $scope.showSpinner = false;
            smartButtonCtrl._handlers.forEach(function(fn) {
              fn($scope.showSpinner);
            });
          }
        });
      },
      template: '<button><span ng-if="showSpinner">SPINNER</span> {{text}}</button>',
      replace: true
    };
  })
  .directive('makeTransparent', function() {
    return {
      require: 'smartButton',
      link: function($scope, $element, $attrs, smartButtonCtrl) {
        smartButtonCtrl.onSpinnerChange(function(value){
          if (value) {
            $element.css('opacity', '0.5');
          } else {
            $element.css('opacity', '1');
          }
        });
      }
    };
  });


