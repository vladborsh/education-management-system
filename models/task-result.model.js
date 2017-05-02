var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TestResult = require('../models/test-result.model');
var WorkResult = require('../models/work-result.model');

var TaskResultSchema = new Schema({
	_taskEntry : {
		type : Schema.Types.ObjectId, ref: 'TaskEntry', required: true
	},
	_student : {
		type : Schema.Types.ObjectId, ref: 'Student', required: true
	},
	createdDate : {
		type : Date
	},
	completed : {
		type : Boolean
	},
	mark : {
		type : Number
	}
});

TaskResultSchema.post('remove', function(doc, next) {
  TestResult.remove({ _taskResult: doc._id }, function (err, items) {
    WorkResult.remove({ _taskResult: doc._id }, next);
  });
});

module.exports = mongoose.model('TaskResult', TaskResultSchema);