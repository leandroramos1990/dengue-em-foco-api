var Marker = require('./model');

var listar = function(req, res){
	Marker.find({}, function (err, markers){
		res.status(200).json({markers: markers});
	});
}

var count = function(req, res){
	 	Marker.count({}, function (err, count) {
       res.status(200).json(count);
		});
}

var inserir = function(req, res){

	var data = req.req.body;
	var photoUrl = data.filename;
	var location = JSON.parse(data.loc);
	var title = data.title;
	var description = data.description;
  var date = Date.now();

	var marker = new Marker({
                title: title,
                description: description ,
                loc : [location[0], location[1]],
                photoUrl :photoUrl,
                date : date
              });

	marker.save();

	req.res.status(200);

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
exports.count = count;
