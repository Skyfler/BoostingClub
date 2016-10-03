"use strict";

var Helper = require('./helper');

function ShowMessage(options) {
    Helper.call(this, options);

    this._elem = options.elem;
    this._messageElem = options.messageElem;
    this._transitionDuration = options.transitionDuration || 0.5;

    this._heightContainer = this._messageElem.querySelector('.height_container');
    this._heightContainer.style.height = '0px';
    this._heightSample = this._heightContainer.querySelector('.height_sample_elem');
    this._hidden = true;

    this._onClick = this._onClick.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onResize = this._onResize.bind(this);

    this._addListener(this._elem, 'click', this._onClick);
    this._addListener(window, 'resize', this._onResize);
}

ShowMessage.prototype = Object.create(Helper.prototype);
ShowMessage.prototype.constructor = ShowMessage;

ShowMessage.prototype._onClick = function(e) {
    var target = e.target;

    if (this._elem.contains(target)) {
        this._showMessage();
    }
};

ShowMessage.prototype._onDocumentClick = function(e) {
    var target = e.target;

    if (!this._elem.contains(target) && !this._messageElem.contains(target)) {
        this._hideMessage();
    }
};

ShowMessage.prototype._onResize = function() {
    this._hideMessage();
};

ShowMessage.prototype._showMessage = function() {
    if (!this._hidden) return;

    if (this._timer) {
        clearTimeout(this._timer);
    }

    this._hidden = false;

    this._addListener(document, 'click', this._onDocumentClick);
    this._messageElem.classList.add('block_visible');

    this._heightContainer.style.height = this._heightSample.offsetHeight + 'px';

    this._timer = setTimeout(function() {
        if (!this._elem) return;
        this._messageElem.classList.add('text_visible');
    }.bind(this), this._transitionDuration * 1000);
};

ShowMessage.prototype._hideMessage = function() {
    if (this._hidden) return;

    if (this._timer) {
        clearTimeout(this._timer);
    }

    this._hidden = true;

    this._removeListener(document, 'click', this._onDocumentClick);
    this._messageElem.classList.remove('text_visible');

    this._heightContainer.style.height = '0px';

    this._timer = setTimeout(function() {
        if (!this._elem) return;
        this._messageElem.classList.remove('block_visible');
    }.bind(this), this._transitionDuration * 1000);
};

module.exports = ShowMessage;