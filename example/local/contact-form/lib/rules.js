var methods = require('validation-methods');
var customMethods = require('custom-validation');

module.exports = {
  "firstName": {
    "Please enter your first name": methods.required,
    "Only letters, spaces, apostrophes and hyphens are allowed in the Given Name field": customMethods.alphabetic,
    "first name must be less than 24 characters": methods.maxlength(24)
  },
  "lastName": {
    "Please enter your last name": methods.required,
    "Only letters, spaces, apostrophes and hyphens are allowed in the Given Name field": customMethods.alphabetic,
    "Last name must be more than 5 characters": methods.minlength(5)
  },
  "email": {
    "Please enter your email address": methods.required,
    "Please enter a valid email address": methods.email
  },
  "phone": {
    "Please enter your phone number": methods.required,
    "Please enter numbers only": methods.numbersOnly,
    "Phone number must be exactly 10 characters long": methods.length(10)
  },
  "ageGroup": {
    "Please select your age group": methods.required
  },
  "gender":{
    "Please select your gender": function(val, data) {
      if(!val) {
        return false;
      }
      return val;
    },
    "Please enter your gender": function(val, data) {
      if(data.gender === "other" && !data.otherGender){
        return false;
      }
      return true;
    }
  },
  "T&C": {
    "You must confirm that you have read the terms and conditions": function(val, data) {
      if(!val) {
        return false;
      }
      return val;
    }
  }
};