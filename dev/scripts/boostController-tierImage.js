"use strict";

var Helper = require('./helper');
var bcHelper = require('./boostController-helper');

function TierImageController(options) {
    Helper.call(this, options);

    this._imageElem = options.imageElem;
}

TierImageController.prototype = Object.create(Helper.prototype);
TierImageController.prototype.constructor = TierImageController;

TierImageController.prototype.setImage = function(league, division) {
    if (!this._imageElem || !bcHelper.IMAGES_SRC[league] || !bcHelper.IMAGES_SRC[league][division]) return;

    this._imageElem.src = bcHelper.IMAGES_SRC[league][division];
};

module.exports = TierImageController;