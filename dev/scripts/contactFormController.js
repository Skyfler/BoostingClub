"use strict";

var FormTemplate = require('./formTemplate');

function ContactFormController(options) {
    FormTemplate.call(this, options);

}

ContactFormController.prototype = Object.create(FormTemplate.prototype);
ContactFormController.prototype.constructor = FormTemplate;

module.exports = ContactFormController;