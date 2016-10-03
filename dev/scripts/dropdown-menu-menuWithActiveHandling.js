"use strict";

var Menu = require('./dropdown-menu.js');
var activePageAttrObj = {
    '': 'home',
    'index.html': 'home',
    'boosting.html': 'boosting',
    'team.html': 'team',
    'faq.html': 'faq',
    '404.html': '404'
};

function MenuWithActiveHandling(options) {
    Menu.call(this, options);

    this._onPageChangedViaAJAX = this._onPageChangedViaAJAX.bind(this);

    this._addListener(document, 'pageChangedViaAJAX', this._onPageChangedViaAJAX);
}

MenuWithActiveHandling.prototype = Object.create(Menu.prototype);
MenuWithActiveHandling.prototype.constructor = Menu;

MenuWithActiveHandling.prototype._onPageChangedViaAJAX = function(e) {
    var url = e.detail.url;
    var urlArr = url.split('/');
    var pageNameWithHash = urlArr[urlArr.length - 1];
    var pageNameAndHashArr = pageNameWithHash.split('#');
    var pageName = pageNameAndHashArr[0];
    // console.log(url);
    // console.log(pageNameWithHash);
    // console.log(pageName);
    var activePageAttr = this._findActivePageAttr(pageName);
    if (!activePageAttr) return;

    this._elem.dataset.activeItem = activePageAttr;
};

MenuWithActiveHandling.prototype._findActivePageAttr = function(pageName) {
    return activePageAttrObj[pageName] ? activePageAttrObj[pageName] : activePageAttrObj['404.html'];
};

module.exports = MenuWithActiveHandling;