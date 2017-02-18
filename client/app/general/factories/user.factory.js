function User() {
	var model = {

	}
	return {
		get : function(key) {
			return model[key];
		},
		set : function (key,value) {
			model[key] = value;
		}
	}
}