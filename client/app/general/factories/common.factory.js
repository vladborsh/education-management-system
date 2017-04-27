function CommonFactory () {

  var model = {};

  var util = {};

  return {
    get : function (key) {
      return model[key];
    },
    getModel : function () {
      return model;
    },
    getU : function (key) {
      return util[key];
    },
    getUtil : function () {
      return util
    }
  }
}