SearchController.$inject = [
  'SearchFactory',
  '$state'
];
function SearchController (
  SearchFactory,
  $state) 
{
  var vm = this;
  vm.model = SearchFactory.getModel();

  vm.viewItem = function(item) {
    if (item.type == 'Курс') {
      $state.go('content.course_item', {id:item._id});
    }
    if (item.type == 'Потік') {
      $state.go('content.course_e_item', {id:item._id});
    }
    if (item.type == 'Завдання') {
      $state.go('content.task_item', {id:item._id});
    }
    if (item.type == 'Лекція') {
      $state.go('content.lecture_item', {id:item._id});
    }
    if (item.type == 'Студент') {
      $state.go('content.student_item', {id:item._id});
    }
  }
}