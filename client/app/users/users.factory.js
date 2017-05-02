function UsersFactory() {
  var model = {}

  return {
    get : function(key) {
      return model[key];
    },
    getModel : function () {
      return model;
    },
    set : function(key, value) {
      model[key] = value;
    },
  }
}