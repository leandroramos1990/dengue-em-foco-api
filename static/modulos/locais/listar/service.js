
angular.module('dengue.locais').factory('locais', function(){
  var local = [];
  var closeLocations =[];
  function locations(res, req){
    getLocations(res, req);
    var x  = res;
    return local;
  }

  function getLocations(err, data){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://dengue-em-foco.herokuapp.com/api/locations/listar";
    xmlhttp.onreadystatechange = function(e) {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var values = JSON.parse(xmlhttp.responseText);
            var locationsJSON = values.locations;
            local = locationsJSON
        }
    };

    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);

  };
  function locationMarker(loc , map){
      var map = map;
          var latLng = new google.maps.LatLng(loc[0],loc[1]);

          var marker = new google.maps.Marker({
                position: latLng,
                icon: 'http://192.168.0.110:8080/' + 'citymarker.ico',
                map: map
          });

          map.setCenter(latLng);
    }
    function nearestMarkers(loc){
      var xmlhttp = new XMLHttpRequest();
      var url = "https://dengue-em-foco.herokuapp.com/api/markers/localizarProximo/"+loc[0]+"/"+loc[1];
      xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var values = JSON.parse(xmlhttp.responseText);
              if (values.length> 0 ) {
                setMarkers(values,loc);
              }else {
                alert('NADA ENCONTRADO NA REGIÃO. RAIO -> 10KM ');
              }
          }
      };
      xmlhttp.open("GET", url, false);
      xmlhttp.send();
    }
    var getMap = function()  {
      var center = new google.maps.LatLng(37.4419, -122.1419);
      var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      return map;
    }
    var setMarkers = function(markersJSON, loc){

      var center = new google.maps.LatLng(37.4419, -122.1419);
      var map = getMap();

      var markers = [];

      for (var i = 0; i < markersJSON.length; i++) {
          //var dataPhoto = data.photos[i];
          var foco = markersJSON[i];
          var latLng = new google.maps.LatLng(foco.loc[0], foco.loc[1]);
          var title = "teste"

          var marker = new google.maps.Marker({
              position: latLng,
              title:foco._id,
              map:map,
              name:i
          });

          //var photoUrl = dataPhoto.photo_file_url;
          var content = "<h3>" + foco.title +  '<h6>' + "" + foco.description + '<br><IMG BORDER="0" ALIGN="Center" WEIGHT="150" HEIGHT="150" SRC='+foco.photoUrl+'>'
          markers.push(marker);

          google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
              return function() {
                  infowindow.setContent(content);
                  infowindow.open(map,marker);
              };
          })(marker,content,infowindow));

          map.setZoom(12);


        }
        var markerCluster = new MarkerClusterer(map, markers);
        locationMarker(loc, map);
    }
    var infowindow = new google.maps.InfoWindow({
    });

  return {
    locations:locations,
    locationMarker:locationMarker,
    nearestMarkers:nearestMarkers
  }


});
