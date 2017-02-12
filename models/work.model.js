var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = new Schema({
	_task : {
		type : Schema.Types.ObjectId, ref: 'Task', required: true
	},
	body : {
		type : String
	},
});

module.exports = mongoose.model('Work', WorkSchema);