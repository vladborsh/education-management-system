function HomeFactory() {

  var model = {
    tasks : []
  }

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