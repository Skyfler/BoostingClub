"use strict";

var DropdownGroup = require('./dropdown-dropdownGroup');
var Tabs = require('./tabs');
var BoostController = require('./boostController');
var ShowMessage = require('./showMessage');

function InnerPage(innerPageElem, options) {
    this._innerPageElem = innerPageElem;

    /*this._gMap = options.mapInstance;
    var mapElem = innerPageElem.querySelector('#map');
    if (mapElem) {
        this._gMap.insertMap(mapElem);
    }*/

    var dropdownGroupElems = this._innerPageElem.querySelectorAll('.dropdown_group');
	this._dropdownGroups = [];
    if (dropdownGroupElems.length) {
		for (var i = 0; i < dropdownGroupElems.length; i++) {
			this._dropdownGroups.push( new DropdownGroup({
				elem: dropdownGroupElems[i],
				dropdownSelector: '.droppownGroupItem',
				dropdownOptions: {
					transitionDuration: 0.5,
					openBtnSelector: '[data-component="dropdown_toggle"]',
					dropdownContainerSelector: '.dropdown_container',
					dropdownBarSelector: '.dropdown_bar',
					closeOnResize: true
				}
			}) );
		}
        
    }

    var tabsContainerElem = this._innerPageElem.querySelector('.tabs_container');
    if (tabsContainerElem) {
        this._tabs = new Tabs({
            elem: tabsContainerElem,
            transitionDuration: 0.15,
            initialTabNum: options.initialTab
        });
    }

    var meetTheTeamBlockContainer = this._innerPageElem.querySelector('.meet_the_team_block_container');
    if (meetTheTeamBlockContainer) {
        var containerElemsArr = meetTheTeamBlockContainer.querySelectorAll('.block');
        this._showMesageArr = [];
        for (var i = 0; i < containerElemsArr.length; i++) {
            this._showMesageArr[i] = new ShowMessage({
                elem: containerElemsArr[i].querySelector('.block_content'),
                messageElem: containerElemsArr[i].querySelector('.about'),
                transitionDuration: 0.5   //s
            });
        }
    }

    var leagueBoostElem = this._innerPageElem.querySelector('#league_boost');
    if (leagueBoostElem) {
        this._boostController = new BoostController({
            elem: leagueBoostElem
        });
    }

    var error404Elem = this._innerPageElem.querySelector('#error404');
    if (error404Elem) {
        setTimeout(function(){
            error404Elem.scrollIntoView(true);
        }, 500);
    }

    if (options.callback) {
        options.callback();
    }
}

InnerPage.prototype.remove = function() {
    for (var key in this) {
        if (this.hasOwnProperty(key) && key !== '_innerPageElem') {

            if (Array.isArray(this[key])) {
                for (var i = this[key].length - 1; i >= 0 ; i--) {
                    this[key][i].remove();

                    this[key].pop();
                }
            } else {
                this[key].remove(this._innerPageElem);
            }

            delete this[key];
        }
    }

    delete this._innerPageElem;
};

module.exports = InnerPage;