"use strict";

(function ready() {

    var Polyfills = require('./polyfills');
    var Menu = require('./dropdown-menu.js');
    var Tabs = require('./tabs');
    var CustomSelect = require('./customSelect');

    Polyfills.runAll();

    var mainMenu = new Menu({
        elem: document.querySelector('#main_menu'),
        transitionDuration: 0.5,
        openBtnSelector: '[data-component="dropdown_toggle"]',
        dropdownContainerSelector: '.dropdown_container',
        dropdownBarSelector: '.dropdown_bar',
        closeOnResize: true,
        listenToCloseSignal: true,
        cancelDropdownOnGreaterThan: 799
    });

    var customSelectElemArr = document.querySelectorAll('.customselect');
    var customSelectArr = [];
    if (customSelectElemArr.length > 0) {

        for (var i = 0; i < customSelectElemArr.length; i++) {
            /*console.log('Custom select ' + i +':');
             console.log(customSelectElemArr[i]);*/
            customSelectArr[i] = new CustomSelect({
                elem: customSelectElemArr[i]
            });
        }
    }

    var tabsContainerElem = document.querySelector('.tabs_container');
    if (tabsContainerElem) {
        window.tabs = new Tabs({
            elem: tabsContainerElem,
            transitionDuration: 0.15
        });
    }

})();