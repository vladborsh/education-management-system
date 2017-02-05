var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkResultSchema = new Schema({
	_taskResult : {
		type : Schema.Types.ObjectId, ref: 'TaskResult', required: true
	},
	body : {
		type : String
	},
});

module.exports = mongoose.model('WorkResult', WorkResultSchema);