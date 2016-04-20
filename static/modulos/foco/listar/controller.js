angular.module('dengue.focos').controller('ListarFocoController', function($scope, $location, $routeParams, focos){
  $scope.foco = {};

  $scope.carregar = function(){
    focos.carregar();
  };

});
