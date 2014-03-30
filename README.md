form
====

A reactive form view with validation.

This component creates a reactive form view based on [component/reactive v 0.14.1](https://github.com/component/reactive/tree/0.14.1).

This version **does not** rely on legacy dependencies such as [jQuery](https://github.com/nib-components/jquery), [Backbone](https://github.com/nib-components/backbone) and [Underscore](https://github.com/nib-components/underscore), like the previous version.

This component harnesses [custom binding](https://github.com/nib-components/reactive/blob/master/index.js) for the attribute **data-model="{attr}"**.

The value of this custom attribute and the value of the input  are stored on a model. As soon as a change is made to these inputs, the model is immediately updated. Model values can also be defined when the form is rendered.

This component then marries up this model to a set of custom validation rules of the same name. If a value on the model doesnt pass the validation rule, as tooltip with a message is displayed against that invalid input.


#Installation

```
  component install nib-components/form
```

#API

You will need to create a local component for each form.

```zsh
site
 - index.js
 - component.json
 - components
 - local
    # our local contact form component
 	- contact-form  # our local contact form component
 	   - component.json
       - index.js
       lib
         - rules.js
 ```

A form component requires (but not limited to) a minimum of 4 methods.

#### initialize()
This method is called when your form is initiated.
This method defines the model and rules for the view.
Anything in here will be processed before the form is actually 'reactive'.

#### render()
This method binds the view to the model so the form is 'reactive'.
If you wish to set things on the model to display specific results on your form, nows the time to do it.

#### submit()
When the submit button is clicked, the reactive binding 'on-click' calls this submit() method. By default we check for validation errors and display tooltips

#### rules()
We require our object of validation rules to validate against our model. (see below)


```js
// contact-form/index.js

var Form = require('form');
var rules = require('./lib/rules');

var contactForm = Form.create({

  // set the 'rules' on rules()
  rules: rules,

  initialize: function() {
    // call the initialise() method of the parent Form (optional)
    Form.prototype.initialize.apply(this, arguments);
  },

  render: function() {
    // call the render() method of the parent Form (optional)
    Form.prototype.render.call(this);
  },

  submit: function(event){
    // call the submit() method of the parent Form (optional)
    Form.prototype.submit.call(this, event);
  }
});

module.exports = contactForm;
```

Add a validation rule to check that 'name' is entered, and that it is a max length of 25 characters long.
This 'name' should reference and element with a **data-model** attribute of the same name


```js
// contact-form/lib/rules.js

var methods = require('validation-methods');
module.exports = {
  "name": {
    "Please enter your name": methods.required,
    "Your name must be a maximum of 25 characters long": function(val, data){
      // params: 'val' is the input value. data is our form model
      var fn = methods.maxlength(25);
      return fn(val); // returns true or false. If false, displays tooltip
    }
  }
};

```

Require the local form component, initialize and render it.

```js
// index.js

// require your form component
var ContactForm = require('contact-form');

// find the view associated to your form.
var contactFormEl = document.querySelector('.js-form');

// Initialize the form ( it calls initialize() ) and pass it the element
var contactForm = new ContactForm({
  el: ContactFormEl
});

// call the forms render method
contactForm.render();
```

... and add some markup.

```html
<!-- template.html -->

<form class="js-form">
  <label>
    Name:
    <input type="text" name="name" value="" data-model="name"/>
  </label>
</form>
```

#Model

On initialize() of our form, we're given a model. This model is what we use to validate our form data.

This model is not just restricted to form data though. We can store anything on it and use it to enact with a [reactive](https://github.com/component/reactive/tree/0.14.1) view.

####Get and Set model methods

We can get and set data on the model using get/set methods.

To get a value of a property, we can use:

```js
this.model.get('name');
```

to set a property we use:

```js
this.model.set('name', 'Bruno');
```
or, we can set multiple property/values.

```js
this.model.get({
  'name': 'Bruno',
  'age': 34,
  'bald': true
});
```

This make it super easy to prefill elements as soon as a form is rendered.

```js
render: function() {
  Form.prototype.render.call(this);

  this.model.set('isCool', 'no');
},
```

```html
<div>Hey, like...am I cool?</div>
<label>
  <input type="radio" name="isCool" value="no">No <!-- this will be selected -->
</label>
<label>
  <input type="radio" name="isCool" value="yes">Yes
</label>
```

#Validating inputs

To validate a single input element add the attribute **data-model="{attr}"** to the element. The value of the name and data-model attributes must be the same.

You must also ensure there is a corresponding validation rule for this attribute value.

```html
<label>
  Name:
  <input type="text" name="name" value="" data-model="name"/>
</label>
```

Sometimes however, you need to display 1 error message for a group of inputs, say radio buttons or checkboxs.

To do this, you wrap the elements in a container consisting of the **data-validate-group="{attr}"** attribute.

```html
<div data-validate-group="biggestOllie">

  <div>Who had the biggest ollie?</div>
  <label>
    <input class="ollie" name="ollieGelfand" type="checkbox" value="gelfand"/>Alan Gelfand
  </label>

  <label>
    <input class="ollie" name="ollieCaballero" type="checkbox" value="caballero"/>Steve Caballero
  </label>

  <label>
    <input class="ollie" name="ollieGuerrero" type="checkbox" value="guerrero"/>Tommy Guerrero
  </label>

</div>
```

We can then listen for changes of these child inputs and record the chosen value on the model under the correct property.

```js
// my-form/index.js

render: function() {
  Form.prototype.render.call(this);

  var self = this;

  var checkboxs = document.querySelectorAll('.ollie');

  Array.prototype.forEach.call(checkboxs, function(cbx){
    cbx.addEventListener('click', function(e){
      // set the chose value onto the model
      self.model.set('biggestOllie', e.target.value);
  });
});
```
Because the 'biggestOllie' property on the model is now populated, it's truthy, meaning the validation message will disappear.

#Customise tooltips

We are also able to control where a message is positioned, how its content is aligned and how wide it is.

####data-message-position

We can specify where a message is to be positioned (default: east).

```html
<label>
  Name:
  <input type="text" name="name" value="" data-model="name" data-message-position="south"/>
</label>
```
In this example the message is positioned south of the element.

####data-message-align

We can specify if we want the text of the message left, center or right aligned (default: left).

```html
<label>
  Name:
  <input type="text" name="name" value="" data-model="name" data-message-position="south" data-message-align="center"/>
</label>
```
In this example the message content is center aligned.

####data-message-width

We can specify how wide our message is (default: 200px).

```html
<label>
  Name:
  <input type="text" name="name" value="" data-model="name" data-message-position="south" data-message-align="center" data-message-width="100"/>
</label>
```
In this example the message message is 100px wide.

#Custom methods

We can write custom methods and have them triggered on a change of specific model attributes.

This example sets up listeners on specific model attributes. As soon a that input changes, it'll fire teh custom method.

```js
// contact-form/index.js

initialize: function() {
  Form.prototype.initialize.apply(this, arguments);
  this.model.on('change:DateOfBirthDay', this.updateDateOfBirth.bind(this));
  this.model.on('change:DateOfBirthMonth', this.updateDateOfBirth.bind(this));
  this.model.on('change:DateOfBirthYear', this.updateDateOfBirth.bind(this));
},

render: function(){
  Form.prototype.render.call(this);
},

updateDateOfBirth: function(){
  var day = this.model.get('DateOfBirthDay');
  var month = this.model.get('DateOfBirthMonth');
  var year = this.model.get('DateOfBirthYear');
  var date = [day, month, year].join('/');

  this.model.set("DateOfBirth", date);

  if(!day || !month || !year) {
    this.model.set('DateOfBirth', null);
    return;
  }
}

```

```js
// contact-form/lib/rules.js

"DateOfBirth":{
  "Please enter Date of Birth": methods.required,
  "You must be 18 years or over": customMethods.olderThan(18),
  "Please select a valid Date of Birth": function(val, data){
    if (val && moment(val, "DD/MM/YYYY").isValid() === false){
      return false;
    }
  }
```


#Example

[View code of a working example](https://github.com/nib-components/form/tree/0.0.2/example/local/contact-form)