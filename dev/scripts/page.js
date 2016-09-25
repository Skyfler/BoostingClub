"use strict";

(function ready() {

    var Polyfills = require('./polyfills');
    var Menu = require('./dropdown-menu.js');
    var DropdownGroup = require('./dropdown-dropdownGroup');
    var Tabs = require('./tabs');
    var CustomSelect = require('./customSelect');
    var CustomInputRange = require('./customInputRange');

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

    var dropdownGroupElem = document.querySelector('.dropdown_group');
    if (dropdownGroupElem) {
        var dropdownGroup = new DropdownGroup({
            elem: dropdownGroupElem,
            dropdownSelector: '.droppownGroupItem',
            dropdownOptions: {
                transitionDuration: 0.5,
                openBtnSelector: '[data-component="dropdown_toggle"]',
                dropdownContainerSelector: '.dropdown_container',
                dropdownBarSelector: '.dropdown_bar',
                closeOnResize: true
            }
        });
    }

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

    var customInputRangeElemArr = document.querySelectorAll('.custom_input_range');
    var customInputRangeArr = [];
    if (customInputRangeElemArr.length > 0) {

        for (var i = 0; i < customInputRangeElemArr.length; i++) {
            /*console.log('Custom select ' + i +':');
             console.log(customSelectElemArr[i]);*/
            customInputRangeArr[i] = new CustomInputRange({
                elem: customInputRangeElemArr[i],
                max: 20,
                min: 1,
                initialValue: 10
            });
        }
    }

    var tabsContainerElem = document.querySelector('.tabs_container');
    if (tabsContainerElem) {
        var tabs = new Tabs({
            elem: tabsContainerElem,
            transitionDuration: 0.15
        });
    }

})();