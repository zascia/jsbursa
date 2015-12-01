/* eslint-disable */
(function(){
  'use strict';
  angular.module('app', [])
    .controller('MainCtrl', function($scope) {

    })
    .directive('magicRadio', function(magicButtonService) {
      return {
        restrict: 'E',
        require: 'magicRadio',
        template: '<div><label><input type="radio">{{title}}</label></div>',
        replace: true,
        scope: {
          title: '@',
          groupName: '@group'
        },
        controller: function($scope, $element) {
          this.check = function() {
            var inputEl = $element.find('input');
            if ( inputEl.prop('checked') === false) {
              inputEl.prop('checked', true);
            }
          }
        },
        link: function($scope, $element, $attrs, $magicRadioCtrl) {
          var inputEl = $element.find('input');
          magicButtonService.addRadio($scope.groupName, $magicRadioCtrl);
          inputEl.on('click', function(evt) {
            magicButtonService.clickRadioGroup($scope.groupName, $magicRadioCtrl);
          });
        }
      };
    })
    .service('magicButtonService', function() {
      this._radioBtns = [];

      this.addRadio = function(groupName, ctrl) {
        if ( !this._radioBtns[groupName] ) this._radioBtns[groupName] = [];
        this._radioBtns[groupName].push(ctrl);
      };

      this.clickRadioGroup = function(groupName, elem) {
        var elemSet = this._radioBtns[groupName];
        elemSet.forEach(function(item) {
          if (item !== elem) item.check();
        });

      };

    });
})();