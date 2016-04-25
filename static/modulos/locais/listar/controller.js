angular.module('dengue.locais').controller('ListarLocaisController', function($scope, locais){
  $scope.localidades = [];
  locais.locations()
  .then(function(response){
    $scope.localidades = response.data;
    $scope.data = {
     availableOptions: $scope.localidades.locations,
     selectedOption:$scope.localidades.locations[0],
     selectCity: null
     };
  })
  .catch(function(error){
    console.log(error);
  })
  $scope.selectCity = function(){
       locais.nearestMarkers($scope.data.selectedOption.loc)
       .then(function(response){
         if(response.data.length >0 ){
            locais.setMarkers(response.data, $scope.data.selectedOption.loc)
         }else{
            alert('Nenhum foco identificado para a região de '+ $scope.data.selectedOption.title +'. RAIO de 10 KM');
         }
       })
       .catch(function(error){
         console.log(error);
       })
  };
});
