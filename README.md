form
====

A basic reactive form view

#Installation

```
  component install nib-components/form
```

#API

```
  var Form = require('form');

  var myForm = Form.create({

    // inherit initialise methods (optional)
    initialize: function() {
      Form.prototype.initialize.apply(this, arguments);
    },

    // inherit render methods (optional)
    render: function() {
      Form.prototype.render.call(this);
    },

    // inherit submit methods (optional)
    submit: function(event){
      Form.prototype.submit.call(this, event);
    },
  });

  module.exports = myForm;
```
