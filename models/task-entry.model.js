var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskEntrySchema = new Schema({
	_courseEntry : {
		type : Schema.Types.ObjectId, ref: 'CourseEntry', required: true
	},
	_task : {
		type : Schema.Types.ObjectId, ref: 'Task', required: true
	},
	forStudents : {
		type : [Schema.Types.ObjectId], ref: 'Student', required: true
	}
});

module.exports = mongoose.model('TaskEntry', TaskEntrySchema);