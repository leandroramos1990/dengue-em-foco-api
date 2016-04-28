var Location = require('./model');

var listar = function(req, res){
	Location.find({}, function (err, locations){

        var todosFocos = {_id:0, title: "Todas Regiões", loc:[0, 0]}
			/*locations.sort(function(a,b){
						return a.title > b.title;
				});*/
        locations.unshift(todosFocos);
		    res.status(200).json({locations: locations});

	}).sort({title:1});
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


	Location.find(query, function (err, locations){
		if(!err){
			res.status(200).json(locations);
		} else {
			console.log(err);
		}
	});
}

exports.localizarProximo = localizarProximo;
exports.listar = listar;
