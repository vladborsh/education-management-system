LecturesController.$inject = [
  'LecturesFactory',
  'LecturesService',
  'Modal',
  '$state'
];
function LecturesController(
  LecturesFactory,
  LecturesService,
  Modal,
  $state) {
	var vm = this;

  vm.model = LecturesFactory.getModel();

  vm.util = {}

  vm.init = function() {
    LecturesService.getLectures()
    .then(
      function (data) {
        vm.model.lectures = data.data;
      }
    )
  };
  vm.init();

  vm.viewLecture = function (item) {
    $state.go('content.lecture_item', {id : item._id});
  }

  vm.createLecture = function () {
    var modal = Modal.get(
      'app/lectures/create-lecture-modal.html',
      'NewLectureController', 
      {},
      'lg'
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      LecturesService.getLectures()
      .then(
        function (data) {
          vm.model.lectures = data.data;
        }
      )
    }
  }

  vm.deleteLecture = function(id) {
    LecturesService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.model.lectures, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

}