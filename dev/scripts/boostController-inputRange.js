"use strict";

var Helper = require('./helper');
var bcHelper = require('./boostController-helper');

function InputRangeDisplay(options) {
    Helper.call(this, options);

    this._displayElem = options.displayElem;
    this._prefix = options.prefix || '';
    this._suffix = options.suffix || '';
}

InputRangeDisplay.prototype = Object.create(Helper.prototype);
InputRangeDisplay.prototype.constructor = InputRangeDisplay;

InputRangeDisplay.prototype.showValue = function(value) {
    this._displayElem.innerHTML = this._prefix + ' ' + value + ' ' + this._suffix;
};

InputRangeDisplay.prototype.setPrefix = function(prefix) {
    this._prefix = prefix;
    this.showValue();
};

InputRangeDisplay.prototype.setSuffix = function(suffix) {
    this._suffix = suffix;
    this.showValue();
};

module.exports = InputRangeDisplay;