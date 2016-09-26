"use strict";

(function ready() {

    var Polyfills = require('./polyfills');
    var Menu = require('./dropdown-menu.js');
    var DropdownGroup = require('./dropdown-dropdownGroup');
    var Tabs = require('./tabs');
    var ContactFormController = require('./contactFormController');
    var DivisionBoostController = require('./boostController-division');
    var WinsBoostController = require('./boostController-wins');
    var DuoBoostController = require('./boostController-duo');

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

    var tabsContainerElem = document.querySelector('.tabs_container');
    if (tabsContainerElem) {
        var tabs = new Tabs({
            elem: tabsContainerElem,
            transitionDuration: 0.15
        });
    }

    var contactFormElem = document.querySelector('#contact_form');
    if (contactFormElem) {
        // console.log('========= CONTACT FORM =========');
        var contactForm = new ContactFormController({
            elem: contactFormElem
        });
    }

    var divisionBoostElem = document.querySelector('#division');
    if (divisionBoostElem) {
        // console.log('========= DIVISION BOOST =========');
        window.divisionBoost = new DivisionBoostController({
            elem: divisionBoostElem
        });
    }

    var winsBoostElem = document.querySelector('#wins');
    if (divisionBoostElem) {
        // console.log('========= WINS BOOST =========');
        window.winsBoost = new WinsBoostController({
            elem: winsBoostElem
        });
    }

    var duoBoostElem = document.querySelector('#duo');
    if (duoBoostElem) {
        // console.log('========= DUO BOOST =========');
        window.duoBoost = new DuoBoostController({
            elem: duoBoostElem
        });
    }

})();