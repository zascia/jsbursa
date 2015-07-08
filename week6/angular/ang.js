/**
 * Created by zascia on 07.07.2015.
 */
(function() {
  var app = angular.module('jsbursa', []);

  app.controller('myController', function($scope) {
    $scope.items = [
      {name:"Nikita", phone:"123123"},
      {name:"Maxim", phone:"222222"},
      {name:"Anatoliy", phone:"333333"},
    ];
    $scope.items2 = [];
  });

  app.directive('draggableList', draggableList);

  function draggableList() {
    var storage = {
      users: []
    }

    function link($scope, $element, $attrs) {
      if ($attrs.id) {
        var userList = localStorage.getItem($attrs.id);
        if (userList) {
          storage.users = JSON.parse(userList);

          $scope.items = storage.users;
        }
      }

      $($element).sortable({
        connectWith: 'ul[data-role="draggable-list"]',
        remove: function (event, ui) {
          var a = $(ui.item).index();
          $(ui.item).data('item', $scope.items[a]);
          $scope.$applyAsync();
        },
        update: function (event, ui) {
          var tempInfo = [];
          $(event.target).find('li').each(function() {
            tempInfo.push({'name':$(this).find('h3').text(),'phone':$(this).find('h4').text()});

          });
          if ($attrs.id) {

            localStorage.setItem($attrs.id, JSON.stringify(tempInfo));


          }
          $scope.items = [];
          $scope.$apply(function() {
            $scope.items = tempInfo;
          });

        },
        receive: function (event, ui) {
          var a = $(ui.item).index();
          var getDat = $(ui.item).data('item')
          $scope.items.splice(a, 0, getDat);
          var tempItems = angular.copy($scope.items);
          $scope.items = [];
          $scope.$applyAsync();
          setTimeout(function () {
            $scope.items = tempItems;
            $scope.$applyAsync();
          }, 0);
        }
      });

    }
    return {
      template: ' <ul data-role="draggable-list"><li  ng-repeat="item in items"><h3>{{item.name}}</h3><h4>{{item.phone}}</h4></li></ul>',
      restrict: 'E',
      link: link,
      scope: {
        items: '=',
        id: '@'
      },
      replace: true
    };
  }
})();
