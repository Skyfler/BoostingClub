"use strict";

(function ready() {

    var _polyfills = require('./polyfills');
    var Menu = require('./dropdown-menu-menuWithActiveHandling.js');
    var AjaxPaginator = require('./ajaxPaginator');
    var ScrollUp = require('./scrollUp');
    // var DropdownGroup = require('./dropdown-dropdownGroup');
    // var Tabs = require('./tabs');
    var ContactFormController = require('./contactFormController');
    // var BoostController = require('./boostController');
    // var ShowMessage = require('./showMessage');

    _polyfills.init();

    var mainMenu = new Menu({
        elem: document.querySelector('#main_menu'),
        transitionDuration: 0.5,
        openBtnSelector: '[data-component="dropdown_toggle"]',
        dropdownContainerSelector: '.dropdown_container',
        dropdownBarSelector: '.dropdown_bar',
        closeOnResize: true,
        listenToCloseSignal: true,
        cancelDropdownOnGreaterThan: 899    //px
    });

    var scrollBtnElem = document.querySelector('.scroll_up_btn');
    if (scrollBtnElem) {
        var scrollBtn = new ScrollUp({
            elem: scrollBtnElem,
            showOnScrollMoreThen: 200,      //px
            scrollDuration: 600            //ms
        });
    }

    var contactFormElem = document.querySelector('#contact_form');
    if (contactFormElem) {
        // console.log('========= CONTACT FORM =========');
        var contactForm = new ContactFormController({
            elem: contactFormElem
        });
    }

    var ajaxPaginator = new AjaxPaginator({
        startLabel: '<!--[if !IE]>main_beginnig<![endif]-->',
        endLabel: '<!--[if !IE]>main_end<![endif]-->',
        transitionDuration: 0.2,        //s
        innerPageClass: 'main',
        scrollDuration: 600            //ms
    });

})();