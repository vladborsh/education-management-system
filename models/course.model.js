var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
	_lector : {
		type: Schema.Types.ObjectId, ref: 'User', required: true
	},
	name : { 
		type: String, required: true 
	},
	description : { 
		type: String, required: true 
	},
});

module.exports = mongoose.model('Course', CourseSchema);
