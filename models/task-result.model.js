var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskResultSchema = new Schema({
	_taskEntry : {
		type : Schema.Types.ObjectId, ref: 'TaskEntry', required: true
	},
	_student : {
		type : Schema.Types.ObjectId, ref: 'Student', required: true
	},
	comment : {
		type : String
	},
	createdDate : {
		type : Date
	},
	mark : {
		type : Number
	}
});

module.exports = mongoose.model('TaskResult', TaskResultSchema);