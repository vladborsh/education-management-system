var Test = require('../../models/test.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	Test.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find tests ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Test.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find test ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var test = new Test(req.body);
	Test.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create test ' + err});
		} else {
			res.json({success: true, message: 'Test created'})	
		}
	})
}

function update(req, res) {
	Test.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update test ' + err});
		} else {
			res.json({success: true, message: 'Test updated'});
		}
	})
}

function remove (req, res) {
	Test.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove test ' + err});
		} else {
			res.json({success: true, items: 'Test removed'});
		}
	})
}

