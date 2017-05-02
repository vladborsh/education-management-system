var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskResult = require('../models/task-result.model');

var TaskEntrySchema = new Schema({
	_courseEntry : {
		type : Schema.Types.ObjectId, ref: 'CourseEntry', required: true
	},
	_task : {
		type : Schema.Types.ObjectId, ref: 'Task', required: true
	},
	_student : {
		type : Schema.Types.ObjectId, ref: 'Student', required: true
	},
  createdDate : {
    type: Date
  }
});

TaskEntrySchema.post('remove', function(doc, next) {
  TaskResult.remove({ _taskEntry: doc._id }, next);
});

module.exports = mongoose.model('TaskEntry', TaskEntrySchema);