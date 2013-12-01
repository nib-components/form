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

    initialize: function() {
      // inherit initialise methods (optional)
      Form.prototype.initialize.apply(this, arguments);
    },

    render: function() {
      // inherit render methods (optional)
      Form.prototype.render.call(this);
    },

    submit: function(event){
      // inherit submit methods (optional)
      Form.prototype.submit.call(this, event);
    },
  });

  module.exports = myForm;
```
