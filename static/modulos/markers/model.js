var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
    /*
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    */
		loc : {
			type: [Number],
			index: '2dsphere'
		},
    photoUrl : {
        type : String,
        required: false
    },
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: false
    }

});


var Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;
