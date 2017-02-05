var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseEntrySchema = new Schema({
	_course : {
		type : Schema.Types.ObjectId, ref: 'Course', required: true
	},
	sartDate : {
		type : Date
	},
	endDate : {
		type : Date
	}
});

module.exports = mongoose.model('CourseEntry', CourseEntrySchema);
