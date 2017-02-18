function DateService() {
	this.getOptions = function () {
		return {
  	  dateDisabled: false,
  	  maxDate: new Date(2020, 5, 22),
  	  minDate: new Date(),
  	  startingDay: 1
  	};
	}
}