// app.directive('draggableList', function(){});
angular.module('jsbursa', []);

angular.module('jsbursa').controller('myController', function($scope, userService) {
  userService.getUsers().success(function(data) {
    $scope.users = data;
  });

  $scope.users = [
    {name: 'Vasya', phone: '123'},
    {name: 'Petya', phone: '321'}
  ];

  $scope.modify = function() {
    $scope.users[1].name = 'MODIFIED';
  }

  $scope.remove = function(item) {
    var index = $scope.users.indexOf(item);
    $scope.users.splice(index, 1);
  }

  $scope.add = function() {
    $scope.users.push(angular.copy($scope.newUser));
    $scope.newUser.name = '';
    $scope.newUser.phone = '';
  }
});

angular.module('jsbursa').service('userService', function($http) {
  this.getUsers = function() {
    return $http.get('http://jb5.smartjs.academy/api/users');
  }
});

angular.module('jsbursa').directive('userInfo', function() {
  return {
    scope: {
      user: '='
    },
    template: '<h3>{{user.name}}</h3><h4>{{user.phone}} {{alive}}</h4>',
    link: function($scope, $element) {
      $scope.$watch('user', function(newValue, oldValue){

      }, true);
      $scope.alive = 0;
      setInterval(function() {
        $scope.alive += 1;
        $scope.$applyAsync();
      }, 1000)
    }
  };
});