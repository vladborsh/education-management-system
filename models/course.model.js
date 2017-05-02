var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseEntry = require('../models/course-entry.model');
var Task = require('../models/task.model');
var Lecture = require('../models/lecture.model');

var CourseSchema = new Schema({
	_author : {
		type: Schema.Types.ObjectId, ref: 'User', required: true
	},
	name : { 
		type: String, required: true 
	},
	description : { 
		type: String, required: true 
	},
	active : { 
		type: Boolean
	},
	grade : {
		type: Number, default: 0  
	},
	createdDate : {
		type: Date
	},
	updatedDate : {
		type: Date 
	},
	views : {
		type: Number, default: 0 
	},
	deactivateReson : {
		type: String
	}
});

CourseSchema.post('remove', function (doc, next) {
	CourseEntry.remove({_course : doc.id}, function(err, items) {
		Lecture.remove({_course : doc.id}, function(err, items) {
			Task.remove({_course : doc.id}, function(err, items) {
				next()
			})
		})
	})
	
})


module.exports = mongoose.model('Course', CourseSchema);
