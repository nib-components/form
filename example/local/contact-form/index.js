"use strict";

var Form = require('form');
var rules = require('./lib/rules');

var ContactForm = Form.create({
  rules: rules,
  initialize: function() {
    var self = this;
    Form.prototype.initialize.apply(this, arguments);
  },

  render: function() {
    Form.prototype.render.call(this);

    // on model change, do something
    this.model.on('change:gender', this.updateGender.bind(this));
  },

  // show/hide elements based on model data
  updateGender: function(){
    // get model data
    if(this.model.get('gender') === "other"){
      // set model data
      this.model.set('showOtherField', true);
    } else {
      this.model.set('showOtherField', false);
    }
  },

  submit: function(event){
    var errors = this.validate();
    if(errors.length) {
      event.returnValue = false;
      if(event.preventDefault) event.preventDefault();
    }
  },
});

module.exports = ContactForm;



      // // require the component
      // var ContactForm = require('contact-form');

      // // get the form element
      // var contactFormEl = document.querySelector('.js-contact-form');

      // // Create a new subclass passing in the element
      // var contactForm = new ContactForm({
      //   el: contactFormEl
      // });

      // // call render
      // contactForm.render();
