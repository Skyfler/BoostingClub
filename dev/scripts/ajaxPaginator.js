"use strict";

var Helper = require('./helper');
var InnerPage = require('./ajaxPaginator-innerPage');
var OptionsCreator = require('./ajaxPaginator-innerPageOptions');
var _ajax = require('./ajax');
var _smoothScroll = require('./smoothScroll');

function AjaxPaginator(options) {
    Helper.call(this, options);

    this._optionsCreator = new OptionsCreator(options);

    this._innerPageClass = options.innerPageClass;
    this._scrollDuration = options.scrollDuration || 0;

    this._innerPage = new InnerPage(
        document.querySelector('.' + this._innerPageClass),
        this._optionsCreator.getOptionsObj(location.hash)
    );

    if (!history || !history.pushState) return;

    this._startLabel = options.startLabel;
    this._endLabel = options.endLabel;
    this._transitionDuration = options.transitionDuration;
    this._isTransitionning = false;

    this._init();

    this._addListener(window, 'popstate', this._onPopState.bind(this), false);
    this._addListener(document, 'click', this._onClick.bind(this));
}

AjaxPaginator.prototype = Object.create(Helper.prototype);
AjaxPaginator.prototype.constructor = AjaxPaginator;

AjaxPaginator.prototype.remove = function() {
    if (this._innerPage) {
        this._innerPage.remove();
    }

    if (this._optionsCreator) {
        this._optionsCreator.remove();
    }

    Helper.prototype.remove.apply(this, arguments);
};

AjaxPaginator.prototype._init = function() {
    var innerPageContent = this._findInnerPageContent(document.documentElement.innerHTML);
    if (!innerPageContent) {
        // console.log('Couldn`t add the first history entry.');
        return false;
    }

    // добавляем элемент истории
    // console.log('Adding first history state.');
    history.replaceState({innerPageInnerHTML: innerPageContent, url: '', title: document.title}, '');

    // console.log('DONE!');
    return true;
};

AjaxPaginator.prototype._onPopState = function(e) {
    if (history.state){

        this._innerPage.remove();

        // console.log('Retrieving visited page content.');
        var innerPageElem = document.querySelector('.' + this._innerPageClass);
        document.title = e.state.title;
        innerPageElem.innerHTML = e.state.innerPageInnerHTML;

        this._innerPage = new InnerPage(
            innerPageElem,
            this._optionsCreator.getOptionsObj(location.hash)
        );

        this._sendCustomEvent(document, 'pageChangedViaAJAX', {
            bubbles: true,
            detail: {
                url: location.pathname,
                hash: location.hash
            }
        });
    }
};

AjaxPaginator.prototype._onClick = function(e) {
    if (e.which !== 1) return;

    var target = e.target;
    if (!target) {
        // console.log('No target!');
        return;
    }

    var link = this._findLink(target);
    if (!link) {
        // console.log('Target isn`t a link!');
        return;
    }

    var fullLink = this._getFullLink(link.getAttribute('href'));
    if (!this._testSameOrigin(fullLink)) {
        // console.log('External link.');
        return;
    }

    e.preventDefault();

    if (this._preventTransferCheck(link)) {
        return;
    }

    if (this._testSamePath(fullLink)) {
        // console.log('Link leads to the current page.');
        if (fullLink.hash) {
            var scrollTarget = document.querySelector(fullLink.hash);
            if (scrollTarget) {
                var scrollDuration = this._scrollDuration;

                if (fullLink.hash === '#contact_form' && window.innerWidth < 900) {
                    scrollDuration = 0;
                }

                _smoothScroll.scrollTo(
                    _smoothScroll.getPageScrollElem(),
                    _smoothScroll.getCoords(scrollTarget).top,
                    scrollDuration
                );
            }
            // document.querySelector(fullLink.hash).scrollIntoView(true);
        }
        return;
    }

    if (this._isTransitionning) {
        // console.log('Page is changing right now!');
        return;
    }

    // console.log(link.getAttribute('href'));
    this._sendSignalToMainMenu();
    this._isTransitionning = true;

    _ajax.ajax(
        'GET',
        link.getAttribute('href'),
        this._onReqEnd.bind(this)
    );
};

AjaxPaginator.prototype._getFullLink = function(href) {
    var fullLink = document.createElement("a");
    fullLink.href = href;
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    if (fullLink.host == "") {
        fullLink.href = fullLink.href;
    }
    return fullLink;
};

AjaxPaginator.prototype._testSameOrigin = function(fullLink) {
    return location.hostname === fullLink.hostname;
};

AjaxPaginator.prototype._testSamePath = function(fullLink) {
    return location.pathname === fullLink.pathname;
};

AjaxPaginator.prototype._preventTransferCheck = function(link) {
    return link.hasAttribute('data-preventDefaultUntil') &&
        window.innerWidth < link.getAttribute('data-preventDefaultUntil');
};

AjaxPaginator.prototype._sendSignalToMainMenu = function() {
    this._sendCustomEvent(document, 'signaltoclosedropdown', {
        bubbles: true,
        detail: {
            targetDropdownSelector: '*'
        }
    });
};

AjaxPaginator.prototype._findLink = function(element) {
    if (element.hasAttribute('href')) {
        return element;
    } else if (element.parentElement) {
        return this._findLink(element.parentElement);
    }

    return null;
};

AjaxPaginator.prototype._onReqEnd = function(xhr) {
    if (xhr.status === 200) {
        // console.log('Inserting new page content.');
        if (this._replaceInnerPageContent(xhr.responseText, xhr._url, true)) {
            return;

        } else {
            // alert('Problems with inserting new page!');
            // self._showErrorNotification();
        }
    }

    this._onError();
};

AjaxPaginator.prototype._onError = function() {
    this._showErrorNotification();
    this._isTransitionning = false;
};

AjaxPaginator.prototype._replaceInnerPageContent = function(htmlPage, url, updateHistory) {
    var innerPageElem = document.querySelector('.' + this._innerPageClass);
    var newInnerPageContent = this._findInnerPageContent(htmlPage);
    if (!newInnerPageContent || !innerPageElem) return false;

    var hash = this._getFullLink(url).hash;

    var newInnerPageElem = this._insertNewInnerPage(newInnerPageContent, innerPageElem);

    this._fadeInnerPage(innerPageElem, newInnerPageElem, hash);

    if (updateHistory) {
        // добавляем элемент истории
        // console.log('Adding new history state.');
        var title = this._findTitle(htmlPage) || document.title;
        document.title = title;
        history.pushState({
                innerPageInnerHTML: newInnerPageContent,
                url: url,
                title: title
            }, '', url);
    }

    this._sendCustomEvent(document, 'pageChangedViaAJAX', {
        bubbles: true,
        detail: {
            url: url,
            hash: hash
        }
    });

    // console.log('DONE!');
    return true;
};

AjaxPaginator.prototype._findInnerPageContent = function(htmlPage) {
    var start = htmlPage.indexOf(this._startLabel);
    if (start === -1) {
        // console.log('Start not found!');
        return false;
    }
    var end = htmlPage.indexOf(this._endLabel, start);
    if (end === -1) {
        // console.log('End not found!');
        return false;
    } else {
        end += this._endLabel.length;
    }

    return htmlPage.substring(start, end);
};

AjaxPaginator.prototype._findTitle = function(htmlPage) {
    var startLabel = '<title>';
    var endLabel = '</title>';
    var start = htmlPage.indexOf(startLabel);
    if (start === -1) {
        // console.log('Start not found!');
        return false;
    }
    start += startLabel.length;

    var end = htmlPage.indexOf(endLabel, start);
    if (end === -1) {
        // console.log('End not found!');
        return false;
    }

    return htmlPage.substring(start, end);
};

AjaxPaginator.prototype._insertNewInnerPage = function(newInnerPageContent, innerPageElem) {
    var newInnerPageElem = document.createElement('div');
    newInnerPageElem.classList.add('new-main');
    newInnerPageElem.style.cssText = 'position: absolute; width: 100%; top: 0; left: 0; z-index: -1';
    newInnerPageElem.innerHTML = newInnerPageContent;

    innerPageElem.parentNode.insertBefore(newInnerPageElem, innerPageElem.nextSibling);

    return newInnerPageElem;
};

AjaxPaginator.prototype._fadeInnerPage = function(innerPageElem, newInnerPageElem, hash) {
    innerPageElem.style.transitionProperty = "opacity";
    innerPageElem.style.transitionTimingFunction = "linear";
    innerPageElem.style.transitionDelay = 0 + 's';
    innerPageElem.style.transitionDuration = this._transitionDuration + 's';

    var newInnerPage = new InnerPage(
        newInnerPageElem,
        this._optionsCreator.getOptionsObj(hash)
    );

    this._addListener(innerPageElem, 'transitionend', onTransitionEnd);

    var self = this;

    function onTransitionEnd(e) {
        var target = e.target;
        var prop = e.propertyName;

        if (target !== innerPageElem || prop !== 'opacity') return;

        self._removeListener(innerPageElem, 'transitionend', onTransitionEnd);

        newInnerPageElem.style.cssText = '';
        newInnerPageElem.classList.remove('new-main');
        newInnerPageElem.classList.add(self._innerPageClass);

        self._innerPage.remove();

        innerPageElem.parentNode.removeChild(innerPageElem);
        innerPageElem.innerHTML = '';

        self._innerPage = newInnerPage;
        self._isTransitionning = false;
    }

    innerPageElem.style.opacity = 0;
};

module.exports = AjaxPaginator;