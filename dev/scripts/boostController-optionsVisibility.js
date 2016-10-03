"use strict";

var Helper = require('./helper');
var _bcHelper = require('./boostController-helper');

function OptionsVisibilityController(options) {
    Helper.call(this, options);

    this._selectElem = options.selectElem;
    this._optionList = this._selectElem.querySelector('.option_list');

    this._optionsGroup = options.optionsGroup;
}

OptionsVisibilityController.prototype = Object.create(Helper.prototype);
OptionsVisibilityController.prototype.constructor = OptionsVisibilityController;

OptionsVisibilityController.prototype._hideSelect = function() {
    this._selectElem.style.display = 'none';
};

OptionsVisibilityController.prototype._showSelect = function() {
    this._selectElem.style.display = '';
};

OptionsVisibilityController.prototype.showOptions = function(startVal, endVal, hideSelect) {
    // console.log(this._selectElem);
    // console.log(startVal);
    // console.log(this._optionsGroup + '_LIST');
    // console.log(_bcHelper[this._optionsGroup + '_LIST']);
    var start = _bcHelper[this._optionsGroup + '_LIST'].indexOf(startVal);
    // console.log(start);
    if (start === -1) return;

    var end = _bcHelper[this._optionsGroup + '_LIST'].indexOf(endVal) + 1;
    if (!end) {
        end = false;
    }
    // console.log(end);

    var valsToInsertArr = _bcHelper[this._optionsGroup + '_LIST'].slice(start, end).reverse();
    // console.log(valsToInsertArr);
    var optionsHTMLString = '';

    for (var i = 0; i < valsToInsertArr.length; i++) {
        optionsHTMLString += _bcHelper.createOption(
            _bcHelper[this._optionsGroup][valsToInsertArr[i]].name,
            _bcHelper[this._optionsGroup][valsToInsertArr[i]].title
        );
    }

    this._optionList.innerHTML = optionsHTMLString;

    hideSelect ? this._hideSelect() : this._showSelect();
};

module.exports = OptionsVisibilityController;