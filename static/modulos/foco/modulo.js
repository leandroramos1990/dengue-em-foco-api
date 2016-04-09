angular.module('dengue.focos', []);

//Redirecionamento das rotas
angular.module('dengue.focos').config(function($routeProvider){
  $routeProvider
    .when('/static/', {
      controller: 'ListarFocoController',
      templateUrl: 'static/index.html'
    });

});
