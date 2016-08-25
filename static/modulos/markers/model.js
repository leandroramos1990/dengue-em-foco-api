var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
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
    },
    date : {
      type: Date
    }
});

var Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;
