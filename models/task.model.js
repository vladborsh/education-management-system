var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Task', TaskSchema);