var Lecture = require('../../models/lecture.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	Lecture.find(function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find lectures ' + err});
		} else {
			res.json(items);
		}
	})
}

function get(req, res) {
	Lecture.findById(req.params.id, function (err, item) {
		if (err) {
			res.json({success: false, message: 'Cannot find lecture ' + err});
		} else {
			res.json(item);
		}
	})
}

function create(req, res) {
	var lecture = new Lecture();
	lecture._course = req.body._course;
	lecture.description = req.body.description;
	lecture.body = req.body.body;
	lecture.links = req.body.links;
	lecture.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create lecture' + err});
		} else {
			res.json({success: true, message: 'Lecture created'})	
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


