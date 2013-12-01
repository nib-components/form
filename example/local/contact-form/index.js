"use strict";

var Form = require('form');
var rules = require('./lib/rules');

var ContactForm = Form.create({
  rules: rules,
  initialize: function() {
    Form.prototype.initialize.apply(this, arguments);
  },

  render: function() {
    Form.prototype.render.call(this);

    // on model change, do something
    this.model.on('change:gender', this.updateGender.bind(this));
  },

  // show/hide elements based on model data
  updateGender: function(){
    if(this.model.get('gender') === "other"){
      this.model.set('showOtherField', true);
    } else {
      this.model.set('showOtherField', false);
    }
  },

  submit: function(event){
    Form.prototype.submit.call(this, event);
  },
});

module.exports = ContactForm;