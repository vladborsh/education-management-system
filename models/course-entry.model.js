var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseEntrySchema = new Schema({
	_course : {
		type : Schema.Types.ObjectId, ref: 'Course', required: true
	},
	_lector : {
		type : Schema.Types.ObjectId, ref: 'User', required: true
	},
	name : {
		type: String, required: true
	},
	startDate : {
		type : Date, required: true
	},
	endDate : {
		type : Date, required: true
	},
	active : {
		type : Boolean, default: true
	},
	grade : {
		type: Number, default: 0
	},
	views : {
		type: Number, default: 0
	},
	createdDate : {
		type: Date
	},
	updatedDate : {
		type: Date 
	},
	deactivateReson : {
		type: String
	}
});

module.exports = mongoose.model('CourseEntry', CourseEntrySchema);
