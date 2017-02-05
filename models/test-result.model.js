var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestResultSchema = new Schema({
	_taskResult : {
		type: Schema.Types.ObjectId, ref: 'TaskResult', required: true
	},
	answers : {
		type: [Number], required: true
	},
});

module.exports = mongoose.model('TestResult', TestResultSchema);