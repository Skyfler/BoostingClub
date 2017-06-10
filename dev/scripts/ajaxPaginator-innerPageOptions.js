"use strict";

var Helper = require('./helper');
var ModalWindow = require('./modalWindow');
var hashOptionsObj = {
    '#first-tab': {
        initialTab: 1,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
        }
    },
    '#second-tab': {
        initialTab: 2,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
        }
    },
    '#third-tab': {
        initialTab: 3,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
        }
    },
    '#payment-success': {
        callback: function() {
            // alert('Payment succesful!');
            // Helper.prototype._showErrorNotification();
            new ModalWindow({
                modalClass: 'notification',
                modalInnerHTML: '<p>Thank you for using our service!</p>' +
                '<p>We will connect with you shortly.</p>'
            });
        }
    },
    '#payment-error': {
        callback: function() {
            // alert('Payment failed!');
            // Helper.prototype._showErrorNotification();
            new ModalWindow({
                modalClass: 'notification',
                modalInnerHTML: '<p>Oops, something went wrong!</p>' +
                '<p>Try again!</p>'
            });
        }
    },
    '#payment-cancel': {
        callback: function() {
            // alert('Payment was canceled!');
            // Helper.prototype._showErrorNotification();
            new ModalWindow({
                modalClass: 'notification',
                modalInnerHTML: "<p>You've canceled the payment!</p>" +
                '<p>We will be glad to help you!</p>'
            });
        }
    }
};

function InnerPageOptions(options) {
    Helper.call(this, options);

    // this._mapInstance = options.mapInstance;
}

InnerPageOptions.prototype = Object.create(Helper.prototype);
InnerPageOptions.prototype.constructor = InnerPageOptions;

InnerPageOptions.prototype.getOptionsObj = function(hash) {
    var optionsObj = hashOptionsObj[hash] || {};
    // console.log(hash);
    // optionsObj.mapInstance = this._mapInstance;
    // console.log(optionsObj);

    return optionsObj
};

module.exports = InnerPageOptions;