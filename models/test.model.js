var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
	question : { 
		type: String
	},
	value : { 
		type : Number 
	},
	answers : { 
		type : [String] 
	},
	correctAnswer : {
		type : Number
	}
})

var TestSchema = new Schema({
	_task : {
		type : Schema.Types.ObjectId, ref: 'Task', required: true
	},
	questions : {
		type : [Question]
	},
});

module.exports = mongoose.model('Test', TestSchema);