var Work = require('../../models/work.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	Work.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find works ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Work.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find work ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var work = new Work(req.body);
	work.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create work ' + err});
		} else {
			res.json({success: true, message: 'Work created'})	
		}
	})
}

function update(req, res) {
	Work.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update work ' + err});
		} else {
			res.json({success: true, message: 'Work updated'});
		}
	})
}

function remove (req, res) {
	Work.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove work ' + err});
		} else {
			res.json({success: true, items: 'Work removed'});
		}
	})
}

