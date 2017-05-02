var Lecture = require('../../models/lecture.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	var selector = {}
	if (req.query.name) {
		selector.name = {$regex : new RegExp(".*" + req.query.name + ".*", "i") }
	}
	Lecture.find(selector)
	.select('_course name description body links createdDate')
	.populate('_course')
	.exec(function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find lectures ' + err});
		} else {
			res.json(items);
		}
	})
}

function get(req, res) {
	Lecture.findById(req.params.id)
	.select('_course name description body links createdDate')
	.populate('_course')
	.exec( function (err, item) {
		if (err) {
			res.json({success: false, message: 'Cannot find lecture ' + err});
		} else {
			res.json(item);
		}
	})
}

function create(req, res) {
	var lecture = new Lecture(req.body);
	lecture.createdDate = Date.now();
	lecture.save(function (err, lecture) {
		if (err) {
			res.json({success: false, message: 'Cannot create lecture' + err});
		} else {
			res.json({success: true, message: 'Lecture created', id: lecture._id})	
		}
	})
}

function update(req, res) {
	Lecture.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update lecture' + err});
		} else {
			res.json({success: true, message: 'Lecture updated'});
		}
	})
}

function remove (req, res) {
	Lecture.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove lecture ' + err});
		} else {
			res.json({success: true, items: 'Lecture removed'});
		}
	})
}


