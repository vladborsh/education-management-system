function CoursesFactory() {

	var model = {}

	return {
		get : function(key) {
			return model[key];
		},
		getCourses : function() {
			return model['courses'];
		},
		getCourseEntries : function() {
			return model['courseEntries'];
		},
		set : function(key, value) {
			model[key] = value;
		},
	}
	
}