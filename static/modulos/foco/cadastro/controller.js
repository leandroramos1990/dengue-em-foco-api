angular.module('dengue').controller('CadastrarFocoController', function($scope, $location, $routeParams, focos){
  $scope.foco = {};
  //Controller utiliza o serviço nessa aqui ------------------------------------------------------------------^^^^^-------
  $scope.carregar = function(){
    focos.carregar();
    function initialize() {

  };
}

});
