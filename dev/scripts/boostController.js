"use strict";

var Helper = require('./helper');
var DivisionBoostController = require('./boostController-division');
var WinsBoostController = require('./boostController-wins');
var DuoBoostController = require('./boostController-duo');
var _bcHelper = require('./boostController-helper');

function BoostController(options) {
    Helper.call(this, options);

    this._elem = options.elem;

    this._loadImages(this._getImgSrcArrFromBCHelper());

    var divisionBoostElem = this._elem.querySelector('#division');
    if (divisionBoostElem) {
        // console.log('========= DIVISION BOOST =========');
        this._divisionBoost = new DivisionBoostController({
            elem: divisionBoostElem
        });
    }

    var winsBoostElem = this._elem.querySelector('#wins');
    if (divisionBoostElem) {
        // console.log('========= WINS BOOST =========');
        this._winsBoost = new WinsBoostController({
            elem: winsBoostElem
        });
    }

    var duoBoostElem = this._elem.querySelector('#duo');
    if (duoBoostElem) {
        // console.log('========= DUO BOOST =========');
        this._duoBoost = new DuoBoostController({
            elem: duoBoostElem
        });
    }
}

BoostController.prototype = Object.create(Helper.prototype);
BoostController.prototype.constructor = BoostController;

BoostController.prototype.remove = function() {
    if (this._divisionBoost) {
        this._divisionBoost.remove();
    }

    if (this._winsBoost) {
        this._winsBoost.remove();
    }

    if (this._duoBoost) {
        this._duoBoost.remove();
    }

    Helper.prototype.remove.apply(this, arguments);
};

BoostController.prototype._getImgSrcArrFromBCHelper = function() {
    return Object.keys(_bcHelper.IMAGES_SRC).reduce(
        function (transArr, key1) {
            return transArr.concat(Object.keys(_bcHelper.IMAGES_SRC[key1]).map(
                function (key2) {
                    return _bcHelper.IMAGES_SRC[key1][key2]
                }
            ))
        }, []
    );
};

module.exports = BoostController;