var Test = require('../../models/test.model').test;
var Question = require('../../models/test.model').question;

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
	var test = new Test();
	test._task = req.body._task;
	test.questions = req.body.questions;
	test.save(function (err, testItem) {
		if (err) {
			res.json({success: false, message: 'Cannot create test ' + err});
		} else {
			res.json({success: true, message: 'Test created', test: testItem})	
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

