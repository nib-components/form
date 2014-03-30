"use strict";

var Form = require('form');
var rules = require('./lib/rules');

var SurveyForm = Form.create({

  // Set the rules
  rules: rules,

  initialize: function() {
    // Call the original Form initialize method and pass through any arguments
    Form.prototype.initialize.apply(this, arguments);
  },

  render: function() {
    // Call the original Form render method
    Form.prototype.render.call(this);

    var self = this;

    /*
     * A group validator doesnt know if it's child inputs have been selected
     * So we can add a listener, and set the chosen value on the model
     * Note: We can only 'set things on the model' after 'Form.prototype.render.call(this);' has been called
     */

    var checkboxs = document.querySelectorAll('.ollie');
    var radios = document.querySelectorAll('.graphics');

    Array.prototype.forEach.call(checkboxs, function(cbx){
      cbx.addEventListener('click', function(e){
        self.model.set('biggestOllie', e.target.value);
      });
    });

    Array.prototype.forEach.call(radios, function(rdo){
      rdo.addEventListener('click', function(e){
        self.model.set('graphics', e.target.value);
      });
    });

    // Listen for specific changes on the model ...
    this.model.on('change:graphics', function(){
      if(self.model.get('graphics') === "other"){
        self.model.set('showOther', true);
      } else {
        self.model.set('showOther', false);
      }
    });

    // ... or listen for if anything changes on the model
    this.model.on('change', function(){
      self.removeMessages();
    });
  },

  submit: function(event){
    // Call the original Form submit method
    Form.prototype.submit.call(this, event);
  }
});

module.exports = SurveyForm;