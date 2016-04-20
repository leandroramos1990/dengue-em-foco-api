var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
		loc : {
			type: [Number],
			index: '2dsphere'
		},
    title :{
        type: String,
        required: true
    }
});


var Location = mongoose.model('locations', locationSchema);

module.exports = Location;
