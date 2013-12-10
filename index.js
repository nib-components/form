"use strict";

var emitter = require('emitter');
var View = require('view');
var Observable = require('observable');
var reactive = require('reactive');
var Messages = require('form-messages');
var tips = require('form-messages-tip');
var validate = require('object-validator');

var Form = View.create({
  initialize: function(options) {
    this.rules = options.rules || this.rules;
    this.model = options.model || new Observable();
    this.validateField = this.validateField.bind(this);
    this.messages = new Messages(this.el);
    tips(this.messages);
  },
  render: function(){
    this.bindings = reactive(this.el, this.model, this);
  },
  removeMessages: function(){
    this.messages.removeAll();
  },
  destroy: function(){
    View.prototype.destroy.apply(this, arguments);
    this.messages.removeAll();
    this.messages.off();
    this.model.off('change', this.validateField);
    this.emit('destroy');
  },
  submit: function(event) {
    var errors = this.validate();
    if(errors.length) {
      event.preventDefault();
    }
  },
  validateField: function(attr, value){
    var data = {};
    var rules = {};
    var errors;

    if(!this.rules[attr]) {
      return;
    }

    data[attr] = value;
    rules[attr] = this.rules[attr];
    errors = validate(rules, data);

    if(errors.length === 0) {
      this.messages.remove(attr);
    }
    else {
      this.messages.show(attr, errors.messages[attr]);
    }
  },
  validate: function(){
    var data = this.model.attributes;
    var rules = this.rules;
    var errors = validate(rules, data);

    if(errors.length) {
      this.messages.showAll(errors.messages);
      this.errors = errors;
      this.model.on('change', this.validateField);
      this.emit('error', errors);
    }
    else {
      this.messages.removeAll();
      this.model.off('change', this.validateField);
      this.emit('valid', this.model.attributes);
      this.errors = null;
    }
    return errors;
  }
});
emitter(Form.prototype);
module.exports = Form;