var TestResult = require('../../models/test-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
	TestResult.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find test results ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	TestResult.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find test result ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var test = new TestResult(req.body);
	test.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create test result ' + err});
		} else {
			res.json({success: true, message: 'Test result created'})	
		}
	})
}

function update(req, res) {
	TestResult.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update test result ' + err});
		} else {
			res.json({success: true, message: 'Test result updated'});
		}
	})
}

function remove (req, res) {
	TestResult.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove test result ' + err});
		} else {
			res.json({success: true, items: 'Test result removed'});
		}
	})
}

