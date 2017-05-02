var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskResult = require('../models/task-result.model');
var TaskEntry = require('../models/task-entry.model');

var StudentSchema = new Schema({
	_courseEntry : {
		type : Schema.Types.ObjectId, ref: 'CourseEntry', required: true,
	},
	_user : {
		type : Schema.Types.ObjectId, ref: 'User', required: true,	
	},
  marks : {
    type : Number
  },
  completedTasks : {
    type : Number
  },
  passedTasks : {
    type : Number
  },
  createdDate : {
    type : Date
  }
});

StudentSchema.post('task', function(doc, next) {
  TaskResult.remove({ _student: doc._id }, function () {
    TaskEntry.remove({ _student: doc._id }, next)
  });
});

module.exports = mongoose.model('Student', StudentSchema);
