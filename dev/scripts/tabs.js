"use strict";

var Helper = require('./helper');

function Tabs(options) {
    Helper.call(this, options);

    this._elem = options.elem;
    this._transitionDuration = options.transitionDuration;

    this._onClick = this._onClick.bind(this);

    this._init(options.initialTabNum ? options.initialTabNum - 1 : 0);

    this._addListener(this._elem, 'click', this._onClick);
}

Tabs.prototype = Object.create(Helper.prototype);
Tabs.prototype.constructor = Tabs;

Tabs.prototype._onClick = function(e) {
    var target = e.target;
    if (!target) return;
    var tab = target.closest('.tab');

    if (tab) {
        e.preventDefault();
        this._activateTab(tab, this._showActiveBlockWithTransition.bind(this));
    }
};

Tabs.prototype._init = function(initialTabNum) {
    this._tabsArr = this._elem.querySelectorAll('.tab');
    this._tabBlockArr = this._elem.querySelectorAll('.tab_block');
    var activeTab = this._tabsArr[initialTabNum] ? this._tabsArr[initialTabNum] : this._tabsArr[0];
    // var activeTab = this._findActiveTab() || this._tabsArr[0];
    // console.log(activeTab);

    this._removeActiveClassesFromAll();

    if (activeTab) {
        this._activateTab(activeTab, this._showActiveBlockWithoutTransition.bind(this));
    }
};

/*Tabs.prototype._findActiveTab = function() {
    for (var i = 0; i < this._tabsArr.length; i++) {
        if (this._tabsArr[i].classList.contains('active-tab')) {
            return this._tabsArr[i];
        }
    }

    return false;
};*/

Tabs.prototype._removeActiveClassesFromAll = function() {
    this._removeActiveClassFromTabs();
    this._removeActiveClassFromTabBlocks();
};

Tabs.prototype._removeActiveClassFromTabs = function() {
    for (var i = 0; i < this._tabsArr.length; i++) {
        if (this._tabsArr[i].classList.contains('active-tab')) {
            this._tabsArr[i].classList.remove('active-tab');
        }
    }
};

Tabs.prototype._removeActiveClassFromTabBlocks = function() {
    for (var i = 0; i < this._tabBlockArr.length; i++) {
        if (this._tabBlockArr[i].classList.contains('active-tab-block')) {
            this._tabBlockArr[i].classList.remove('active-tab-block');
        }
        if (this._tabBlockArr[i].classList.contains('fade')) {
            this._tabBlockArr[i].classList.remove('fade');
        }
    }
};

Tabs.prototype._activateTab = function(tabElem, showBlockFunction) {
    // console.log('_activateTab');
    // console.log(!tabElem || this._activeTab === tabElem);
    if (!tabElem || this._activeTab === tabElem) return;
    var tabLink = tabElem.querySelector("[href]");
    // console.log(tabLink);
    if (!tabLink) return;
    var tabBlockId = tabLink.getAttribute('href');
    // console.log(tabBlockId);
    if (!tabBlockId) return;
    var tabBlock = this._elem.querySelector(tabBlockId);
    // console.log(tabBlock);
    if (!tabBlock) return;

    if (this._activeTab) {
        this._activeTab.classList.remove('active-tab');
    }

    tabElem.classList.add('active-tab');
    this._activeTab = tabElem;

    showBlockFunction(tabBlock);
};

Tabs.prototype._showActiveBlockWithTransition = function(tabBlock) {
    if (this._tabChangeTimer) {
        clearTimeout(this._tabChangeTimer);
    }
    if (this._activeTabBlock) {
        this._activeTabBlock.classList.remove('fade');
    }

    this._tabChangeTimer = setTimeout(function(){
        this._removeActiveClassFromTabBlocks();
        tabBlock.classList.add('active-tab-block');
        this._activeTabBlock = tabBlock;
        this._tabChangeTimer = setTimeout(function(){
            tabBlock.classList.add('fade');
        }.bind(this), 100);
    }.bind(this), this._transitionDuration * 1000);
};

Tabs.prototype._showActiveBlockWithoutTransition = function(tabBlock) {
    if (this._tabChangeTimer) {
        clearTimeout(this._tabChangeTimer);
    }

    this._removeActiveClassFromTabBlocks();
    tabBlock.classList.add('active-tab-block');
    tabBlock.classList.add('fade');
    this._activeTabBlock = tabBlock;
};

module.exports = Tabs;

