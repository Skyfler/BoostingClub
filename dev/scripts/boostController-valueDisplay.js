"use strict";

var Helper = require('./helper');

function ValueDisplay(options) {
    Helper.call(this, options);

    this._displayElem = options.displayElem;
    this._prefix = options.prefix || '';
    this._suffix = options.suffix || '';
}

ValueDisplay.prototype = Object.create(Helper.prototype);
ValueDisplay.prototype.constructor = ValueDisplay;

ValueDisplay.prototype.showValue = function(value) {
    this._displayElem.innerHTML = this._prefix + value + this._suffix;
};

ValueDisplay.prototype.setPrefix = function(prefix) {
    this._prefix = prefix;
    this.showValue();
};

ValueDisplay.prototype.setSuffix = function(suffix) {
    this._suffix = suffix;
    this.showValue();
};

module.exports = ValueDisplay;