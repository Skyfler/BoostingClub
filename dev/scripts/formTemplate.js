"use strict";

var Helper = require('./helper');
var CustomSelect = require('./customSelect');
var CustomInputRange = require('./customInputRange');

function FormTemplate(options) {
    Helper.call(this, options);

    this._elem = options.elem;

    this._initCustomElements();
}

FormTemplate.prototype = Object.create(Helper.prototype);
FormTemplate.prototype.constructor = FormTemplate;

FormTemplate.prototype.remove = function() {
    if (this._customSelectArr && this._customSelectArr.length > 0) {
        for (var i = 0; i < this._customSelectArr.length; i++) {
            this._customSelectArr[i].remove();
        }
    }

    if (this._customInputRangeArr && this._customInputRangeArr.length > 0) {
        for (var i = 0; i < this._customInputRangeArr.length; i++) {
            this._customInputRangeArr[i].remove();
        }
    }

    Helper.prototype.remove.apply(this, arguments);
};

FormTemplate.prototype._initCustomElements = function() {
    var customSelectElemArr = this._elem.querySelectorAll('.customselect');

    if (customSelectElemArr.length > 0) {
        this._customSelectArr = [];

        for (var i = 0; i < customSelectElemArr.length; i++) {
            this._customSelectArr[i] = new CustomSelect({
                elem: customSelectElemArr[i]
            });
        }
    }

    var customInputRangeElemArr = this._elem.querySelectorAll('.custom_input_range');

    if (customInputRangeElemArr.length > 0) {
        this._customInputRangeArr = [];

        for (var i = 0; i < customInputRangeElemArr.length; i++) {
            this._customInputRangeArr[i] = new CustomInputRange({
                elem: customInputRangeElemArr[i],
                max: customInputRangeElemArr[i].getAttribute('data-max-value'),
                min: customInputRangeElemArr[i].getAttribute('data-min-value'),
                initialValue: customInputRangeElemArr[i].getAttribute('data-default-value')
            });
        }
    }
};

module.exports = FormTemplate;