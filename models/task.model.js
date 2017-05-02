var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Test = require('../models/test.model').test;
var Work = require('../models/work.model');
var TaskEntry = require('../models/task-entry.model');

var TaskSchema = new Schema({
	_course : {
		type : Schema.Types.ObjectId, ref: 'Course', required: true
	},
  name : {
    type : String
  },
	description : {
		type : String
	},
  createdDate : {
    type: Date
  }
});

TaskSchema.post('remove', function(doc, next) {
  console.log('Task pre remove')
  Test.remove({ _task: doc._id }, function () {
    Work.remove({ _task: doc._id }, function () {
      TaskEntry.remove({ _task: doc._id }, next);
    });
  });
});

module.exports = mongoose.model('Task', TaskSchema);