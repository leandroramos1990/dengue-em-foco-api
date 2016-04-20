
angular.module('dengue.focos').factory('focos', function(){
  var carregar = function(){
    var map = getMap();
    getMarkers(map);
    setCurrentPosition(map);
    //setMarkers(map);
  };

  var getMap = function()  {
    var center = new google.maps.LatLng(37.4419, -122.1419);
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    return map;
  }

  var setMarkers = function(map, markersJSON){
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

        map.panTo(marker.position);
        map.setZoom(12);


      }
      var markerCluster = new MarkerClusterer(map, markers);
  }
  var infowindow = new google.maps.InfoWindow({
  });
  return {
    carregar:carregar
  }

  function getMarkers(map){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://dengue-em-foco.herokuapp.com/api/markers/listar";

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var values = JSON.parse(xmlhttp.responseText);
            var markersJSON = values.markers;
            setMarkers(map, markersJSON);
        }
    }
    
    console.log(markersJSON);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  function setCurrentPosition(map){
      //console.log(_dirname);
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var latLng = new google.maps.LatLng(pos.lat, pos.lng);

          var marker = new google.maps.Marker({
                position: latLng,
                icon: 'http://127.0.0.1:8080/' + '/img/ic_user_mdpi.png',
                title:'Você está aqui!    ',
                map: map
          });
          marker.addListener('click', function() {
              infowindow.setContent(marker.title);
              infowindow.open(map, marker);
          });

          map.setCenter(pos);
        }, function() {});
      }
  }

});
