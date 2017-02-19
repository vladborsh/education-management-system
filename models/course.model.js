var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
	_author : {
		type: Schema.Types.ObjectId, ref: 'User', required: true
	},
	name : { 
		type: String, required: true 
	},
	description : { 
		type: String, required: true 
	},
	active : { 
		type: Boolean
	},
	grade : {
		type: Number, default: 0  
	},
	createdDate : {
		type: Date
	},
	updatedDate : {
		type: Date 
	},
	views : {
		type: Number, default: 0 
	},
	deactivateReson : {
		type: String
	}
});

module.exports = mongoose.model('Course', CourseSchema);
