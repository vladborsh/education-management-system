var Course = require('../../models/course.model');
var CourseEntry = require('../../models/course-entry.model');
var TaskEntry = require('../../models/task-entry.model');
var Student = require('../../models/student.model');
var TaskResult = require('../../models/task-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTasks = getTasks;
module.exports.getStudents = getStudents;

function getAll(req, res) {
  var selector= {}
  if (req.query.lector) {
    selector._lector = req.query.lector;
  }
  if (req.query.name) {
    selector.name = {$regex : new RegExp(".*" + req.query.name + ".*", "i") }
  }
  CourseEntry.find(selector)
  .populate('_lector _course')
  .exec(function (err, courses) {
    if (err) {
      res.json({success: false, message: 'Неможливо знайти курси: ' + err});
    } else {
      res.json(courses);
    }
  })
}

function get(req, res) {
  CourseEntry.findById(req.params.id)
  .populate('_lector _course')
  .exec( function (err, course) {
    if (err) {
      res.json({success: false, message: 'Неможливо знайти курс: ' + err});
    } else {
      res.json({success: true, item: course });
    }
  })
}

function create(req, res) {
  var course = new CourseEntry(req.body);
  course.createdDate = Date.now();
  Course.findById(course._course)
  .exec( function (err, mainCourse) {
    if (err) {
      res.json({success: false, message: 'Неможливо знайти курс: ' + err});
    } else {
      var dt = new Date(course.startDate);
      course.name = mainCourse.name + '-' + dt.getMonth() + '-' + dt.getFullYear() 
      course.save(function (err, course) {
        if (err) {
          res.json({success: false, message: 'Неможливо створити курс: ' + err});
        } else {
          res.json({success: true, message: 'Курс успішно створений', id: course._id})  
        }
      })
    }
  })
}

function update(req, res) {
  req.body.updatedDate = Date.now();
  CourseEntry.findByIdAndUpdate(req.params.id, req.body, function(err, course) {
    if (err) {
      res.json({success: false, message: 'Неможливо оновити курс: ' + err});
    } else {
      res.json({success: true, message: 'Курс успішно оновлений', id: course._id});
    }
  })
}

function remove (req, res) {
  CourseEntry.findById(req.params.id, function (err, item) {
    if (err) {
      res.json({success: false, message: 'Неможливо видалити курс: ' + err});
    } else {
      item.remove()
      res.json({success: true, items: 'Курс успішно видалений'});
    }
  })
}

function getTasks (req, res) {
  TaskEntry
  .find({ _courseEntry : req.params.id})
  .populate({
    path: '_student ', 
    populate: { path: '_user' }
  })
  .populate({
    path: '_task '
  })
  .populate({
    path: '_courseEntry '
  })
  .exec(function(err, items) {
    if (err) {
      res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
    } else {
      if (err) {
        res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
      } else {
        res.json({success: true, items: items});
      }
    }
  })
}

function getStudents (req, res) {
  Student
  .find({ _courseEntry : req.params.id})
  .populate({
    path: '_user '
  })
  .exec(function(err, students) {
    if (err) {
      res.json({success: false, message: 'Неможливо вилучити студентів для данного курсу: ' + err});
    } else {
      var students_list = []
      var students_map = {};
      for (var i = 0; i < students.length; i++) {
        students_list.push(students[i]._id);
        students_map[students[i]._id] = students[i];
        students_map[students[i]._id]['marks'] = 0;
        students_map[students[i]._id]['completedTasks'] = 0;
        students_map[students[i]._id]['passedTasks'] = 0;
      }
      TaskResult
      .find({_student : {$in : students_list}})
      .select('mark _student completed')
      .exec(function(err, taskResults) {
        if (err) {
          res.json({success: false, message: 'Cannot select results ' + err});
        } else {
          for (var i = 0; i < taskResults.length; i++) {
            if (taskResults[i].completed) {
              students_map[taskResults[i]._student]['completedTasks'] += 1;
            }
            if (taskResults[i].mark) {
              students_map[taskResults[i]._student]['marks'] += taskResults[i].mark;
              students_map[taskResults[i]._student]['passedTasks'] += 1;
            }
            
          }
          res.json({success: true, items: students});
        }
      });
    }
  })
}