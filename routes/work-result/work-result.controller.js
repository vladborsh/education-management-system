var WorkResult = require('../../models/work-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	WorkResult.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find works ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	WorkResult.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find work ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	WorkResult.insertMany(req.body, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create work ' + err});
		} else {
			res.json({success: true, message: 'Work result created'})	
		}
	})
}

function update(req, res) {
	WorkResult.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update work ' + err});
		} else {
			res.json({success: true, message: 'Work result updated'});
		}
	})
}

function remove (req, res) {
	WorkResult.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove work ' + err});
		} else {
			res.json({success: true, items: 'Work result removed'});
		}
	})
}

