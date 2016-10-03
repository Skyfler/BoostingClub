"use strict";

var Helper = require('./helper');
var _smoothScroll = require('./smoothScroll');

function ScrollUp(options) {
    Helper.call(this, options);

    this._elem = options.elem;
    this._showOnScrollMoreThen = options.showOnScrollMoreThen || 200;
    this._scrollDuration = options.scrollDuration || 0;

    this._onScroll = this._onScroll.bind(this);
    this._onClick = this._onClick.bind(this);

    this._hideScrlUpBtn();
    this._onScroll();
    this._addListener(window, 'scroll', this._onScroll);
    this._addListener(this._elem, 'click', this._onClick);
}

ScrollUp.prototype = Object.create(Helper.prototype);
ScrollUp.prototype.constructor = ScrollUp;

ScrollUp.prototype._onScroll = function(e) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop >= this._showOnScrollMoreThen && this._hidden) {
        this._showScrlUpBtn();

    } else if (scrollTop < this._showOnScrollMoreThen && !this._hidden) {
        this._hideScrlUpBtn();
    }
};

ScrollUp.prototype._onClick = function(e) {
    var target = e.target;

    if (target && this._elem.contains(target)) {
        e.preventDefault();
        // window.scrollTo(0, 0);
        _smoothScroll.scrollTo(
            _smoothScroll.getPageScrollElem(),
            0,
            this._scrollDuration
        );
    }
};

ScrollUp.prototype._showScrlUpBtn = function() {
    this._hidden = false;
    this._elem.style.display = '';
};

ScrollUp.prototype._hideScrlUpBtn = function() {
    this._hidden = true;
    this._elem.style.display = 'none';
};

module.exports = ScrollUp;