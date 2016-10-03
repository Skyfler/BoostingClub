"use strict";

var Helper = require('./helper');
var hashOptionsObj = {
    '#first-tab' : {
        initialTab: 1,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
        }
    },
    '#second-tab' : {
        initialTab: 2,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
        }
    },
    '#third-tab' : {
        initialTab: 3,
        callback: function() {
            document.querySelector('.league_boosting').scrollIntoView(true);
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
    // optionsObj.mapInstance = this._mapInstance;
    // console.log(optionsObj);

    return optionsObj
};

module.exports = InnerPageOptions;