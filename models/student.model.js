var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	_courseEntry : {
		type : Schema.Types.ObjectId, ref: 'CourseEntry', required: true,
	},
	_user : {
		type : Schema.Types.ObjectId, ref: 'User', required: true,	
	},
  createdDate : {
    type : Date
  }
});

module.exports = mongoose.model('Student', StudentSchema);
