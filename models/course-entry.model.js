var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseEntrySchema = new Schema({
	_course : {
		type : Schema.Types.ObjectId, ref: 'Course', required: true
	},
	_lector : {
		type : Schema.Types.ObjectId, ref: 'User', required: true
	},
	sartDate : {
		type : Date
	},
	endDate : {
		type : Date
	},
	active : {
		type : Boolean
	},
	grade : {
		type: Number 
	},
	createdDate : {
		type: Date
	},
	updatedDate : {
		type: Date 
	}
});

module.exports = mongoose.model('CourseEntry', CourseEntrySchema);
