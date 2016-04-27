var Marker = require('./model');

var listar = function(req, res){
	Marker.find({}, function (err, markers){
		res.status(200).json({markers: markers});
	});
}

var inserir = function(res){
	var path = "http://127.0.0.1:8080/js/public/"
	var data = res.req;
	var photoUrl = path + data.file.filename;
	var location = JSON.parse(data.headers.loc);
	var title = data.headers.title;
	var description = data.headers.description;

	var marker = new Marker({ title: title, description: description , loc : [location[0], location[1]], photoUrl :photoUrl });

	marker.save();
	var resposta = "OK";
}

var localizarProximo = function(req, res) {
	var lat = req.params.lat;
	var lng = req.params.lng;
    var query = {};

    if(lat != 0 && lng != 0) {
      query = {
      loc:{
            $near: {
              $geometry:{
                type:"Point",
                coordinates:[lat, lng] //Longitude, Latitude
              },
              $maxDistance: 10000, //Metros (10 km)
              $minDistance: 0  //Metros
            }
          }
        };
    }

    console.log(query);

	Marker.find(query, function (err, locations){
		if(!err){
			res.status(200).json({nearestlocations:locations});
		} else {
			console.log(err);
		}
	});
}

exports.listar = listar;
exports.inserir = inserir;
exports.localizarProximo = localizarProximo;
