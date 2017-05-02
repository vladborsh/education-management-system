function SearchFactory() {
  
  var model = {
    searchResults : []
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