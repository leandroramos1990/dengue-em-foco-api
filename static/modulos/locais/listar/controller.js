angular.module('dengue.locais').controller('ListarLocaisController', function($scope, $location, $routeParams, locais){
  //Controller utiliza o serviço nessa aqui ------------------------------------------------------------------^^^^^-------
  $scope.localidades = locais.locations();
  $scope.markers = {};

  $scope.data = {
   availableOptions: $scope.localidades,
   selectedOption:$scope.localidades[0],//[{id: 1 , title:"SELECIONE"}],
   selectCity: null
   };
   $scope.selectCity = function()
   {
     console.log($scope.data.selectedOption.title +" location: " + $scope.data.selectedOption.loc);
     //locais.locationMarker($scope.data.selectedOption.loc);
     locais.nearestMarkers($scope.data.selectedOption.loc);

   };
});
