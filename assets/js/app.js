angular.module('StarOtima', ['ngRoute']);

angular.module('StarOtima').config(function($routeProvider) {
  $routeProvider
  	.when('/', {
  	  templateUrl: "templates/inicio.html",
  	  controller: "InicioController"
  	})
  	.when('/star', {
  	  templateUrl: "templates/star.html",
  	  controller: "GravarController"
  	})
  	.when('/minhaestrela', {
  	  templateUrl: "templates/minhaestrela.html",
  	  controller: "MinhaestrelaController"
  	})
});

angular.module('StarOtima')
.controller('InicioController', function() {

})
.controller('GravarController', function($scope) {
  var i = 3;
  var timer;
  $scope.btnText = 'Start';
  $scope.andamento = 'getready';
  $scope.showBtnResult = false;
  var changeBtnText = function() {
    if (i >= 0) {
      console.log(i);
      $scope.btnText = i;
      i--;
    } else {
      clearInterval(timer);
    }
  }
  $scope.letsgo = function() {
    if ($scope.andamento === 'getready') {
      $scope.andamento = 'started'
      // timer = setInterval(changeBtnText, 1000);
      $scope.btnText = 'Stop';
      brilha();
    } else if ($scope.andamento === 'started') {
      $scope.showBtnResult = true;
    }
  }
})

angular.module('StarOtima')
.controller('MinhaestrelaController', function() {

});
