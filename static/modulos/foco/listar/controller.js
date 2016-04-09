angular.module('dengue.focos').controller('ListarFocoController', function($scope, $location, $routeParams, focos){
  $scope.foco = {};
  //Controller utiliza o serviço nessa aqui ------------------------------------------------------------------^^^^^-------


  $scope.initialize = function() {
       var center = new google.maps.LatLng(37.4419, -122.1419);
       var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 3,
             center: center,
             mapTypeId: google.maps.MapTypeId.ROADMAP
       });
  };

  $scope.carregar = function(){
    focos.carregar();
  };

});
