var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LectureSchema = new Schema({
	_course : {
		type : Schema.Types.ObjectId, ref: 'Course', required: true
	},
	description : {
		type : String
	},
	body : {
		type : String, required: true
	},
	links : {
		type : [ String ]
	}
});

module.exports = mongoose.model('Lecture', LectureSchema);