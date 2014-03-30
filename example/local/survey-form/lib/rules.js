var methods = require('validation-methods');

module.exports = {

  /*
   * params
   * val: the input value
   * data: the model
   */

  "graphics": {
    "Please select who had the best graphics": methods.required
  },

  "graphicsOther": {
    "Please enlighten us who had the best graphics then": function(val, data) {
      if(data.showOther && !val) return false;
    }
  },

  "biggestOllie": {
    "Please choose who had the biggest oliie": methods.required
  },

  "poolSkater": {
    "Please choose the best pool skater (hint: Toby Alva)": methods.required
  },

  "biggestAir": {
    "Please enter who you think did the biggest air": methods.required
  },

  "terms": {
    "You must confirm that you have read the terms and conditions": function(val, data){
      if(!val || val === false) return false;
    }
  }
};