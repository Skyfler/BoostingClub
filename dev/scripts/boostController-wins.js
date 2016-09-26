"use strict";

var FormTemplate = require('./formTemplate');
var TierImageController = require('./boostController-tierImage');
var OptionsVisibilityController = require('./boostController-optionsVisibility');
var InputRangeDisplay = require('./boostController-inputRange');
var bcHelper = require('./boostController-helper');

function WinsBoostController(options) {
    FormTemplate.call(this, options);

    this._currentTierWeight = 0;

    this._getCustomInputs();
    this._createOptionsVisibilityControllers();
    this._createImageControllers();
    this._createInputRangeDisplay();

    this._setTier(
        'current',
        bcHelper.LEAGUES.br.name,
        bcHelper.DIVISIONS.d5.name
    );

    this._onCustomSelect = this._onCustomSelect.bind(this);
    this._onCustomInputRange = this._onCustomInputRange.bind(this);

    this._addListener(this._elem, 'customselect', this._onCustomSelect);
    this._addListener(this._elem, 'custominputrangeslide', this._onCustomInputRange);
    this._addListener(this._elem, 'custominputrangechange', this._onCustomInputRange);

    this._currentLeagueSelect.setOption({value: bcHelper.LEAGUES.br.name});
    this._currentDivisionSelect.setOption({value: bcHelper.DIVISIONS.d5.name});
    this._winsInputRange.setValue(10);
}

WinsBoostController.prototype = Object.create(FormTemplate.prototype);
WinsBoostController.prototype.constructor = WinsBoostController;

WinsBoostController.prototype.remove = function() {
    this._destroyImageControllers();
    this._destroyOptionsControllers();
    this._destroyInputRangeDisplay();

    FormTemplate.prototype.remove.apply(this, arguments);
};

WinsBoostController.prototype._destroyImageControllers = function() {
    if (this._currentTierImageController) {
        this._currentTierImageController.remove();
    }
};

WinsBoostController.prototype._destroyInputRangeDisplay = function() {
    if (this._winsDisplay) {
        this._winsDisplay.remove();
    }
};

WinsBoostController.prototype._destroyOptionsControllers = function() {
    if (this._currentLeagueOptionsController) {
        this._currentLeagueOptionsController.remove();
    }

    if (this._currentDivisionOptionsController) {
        this._currentDivisionOptionsController.remove();
    }
};

WinsBoostController.prototype._getCustomInputs = function() {
    var customInput;

    for (var i = 0; i < this._customSelectArr.length; i++) {
        customInput = this._customSelectArr[i].getElem();

        if (customInput.matches('#wins-current-league-select')) {
            // console.log('_currentLeagueSelect found!');
            this._currentLeagueSelect = this._customSelectArr[i];

        } else if (customInput.matches('#wins-current-division-select')) {
            // console.log('_currentDivisionSelect found!');
            this._currentDivisionSelect = this._customSelectArr[i];

        }
    }

    for (i = 0; i < this._customInputRangeArr.length; i++) {
        customInput = this._customInputRangeArr[i].getElem();

        if (customInput.matches('#wins-number-range')) {
            // console.log('_currentLeagueSelect found!');
            this._winsInputRange = this._customInputRangeArr[i];

        }
    }
};

WinsBoostController.prototype._setTier = function(prefix, leagueName, divisionName) {
    if (!prefix || prefix !== 'current') return;

    var leagueObj = bcHelper.findLeagueByName(leagueName),
        divisionObj = bcHelper.findDivisionByName(divisionName);
    // console.log(currentLeagueObj);

    if (!leagueObj || !divisionObj) return;

    this['_' + prefix + 'League'] = leagueObj.name;

    if (
        leagueObj === bcHelper.LEAGUES.unr ||
        leagueObj === bcHelper.LEAGUES.ms ||
        leagueObj === bcHelper.LEAGUES.chg
    ) {
        if (divisionObj !== bcHelper.DIVISIONS.d1) {
            this['_' + prefix + 'DivisionSelect'].setOption({value: bcHelper.DIVISIONS.d1.name});

            return false;
        }
    }
    // console.log(currentDivisionObj);

    // console.log('Setting ' + prefix + ' Tier');
    // console.log('League  = ' + leagueObj.name);
    // console.log('Division  = ' + divisionObj.name);


    this['_' + prefix + 'Division'] = divisionObj.name;

    this['_' + prefix + 'TierWeight'] = leagueObj.weight + divisionObj.weight;

    this['_' + prefix + 'TierImageController'].setImage(this['_' + prefix + 'League'], this['_' + prefix + 'Division']);

    return true;
};

WinsBoostController.prototype._setTierAndCheck = function(prefix, leagueName, divisionName) {
    if (!prefix || prefix !== 'current') return;

    if (this._setTier(prefix, leagueName, divisionName)) {
        this._checkOptions();
    }
};

WinsBoostController.prototype._checkOptions = function() {
    // console.log('_checkOptions');

    if (
        this._currentLeague === bcHelper.LEAGUES.unr.name ||
        this._currentLeague === bcHelper.LEAGUES.ms.name ||
        this._currentLeague === bcHelper.LEAGUES.chg.name
    ) {
        // console.log('this._currentLeague has 1 division');
        this._currentDivisionOptionsController.showOptions(
            bcHelper.DIVISIONS.d1.name,
            bcHelper.DIVISIONS.d1.name,
            true
        );
    } else {
        // console.log('this._currentLeague has 5 divisions');
        this._currentDivisionOptionsController.showOptions(
            bcHelper.DIVISIONS.d5.name,
            bcHelper.DIVISIONS.d1.name
        );
    }
};

WinsBoostController.prototype._onCustomSelect = function(e) {
    var target = e.target;
    var value = e.detail.value;

    if (target === this._currentLeagueSelect.getElem()) {
        this._setTierAndCheck('current', value, this._currentDivision);

    } else if (target === this._currentDivisionSelect.getElem()) {
        this._setTierAndCheck('current', this._currentLeague, value);

    }
};

WinsBoostController.prototype._onCustomInputRange = function(e) {
    var target = e.target;
    var value = e.detail.value;

    if (target === this._winsInputRange.getElem()) {
        this._setWins(value);

    }
};

WinsBoostController.prototype._setWins = function(value) {
    this._desiredWins = value;
    this._winsDisplay.showValue(this._desiredWins);
};

WinsBoostController.prototype._createImageControllers = function() {
    var currentTierImage = this._elem.querySelector('#wins-current-tier');
    this._currentTierImageController = new TierImageController({
        imageElem: currentTierImage
    });
};

WinsBoostController.prototype._createInputRangeDisplay = function() {
    var winsDisplay = this._elem.querySelector('#wins-display');
    this._winsDisplay = new InputRangeDisplay({
        displayElem: winsDisplay
    });
};


WinsBoostController.prototype._createOptionsVisibilityControllers = function() {
    this._currentLeagueOptionsController = new OptionsVisibilityController({
        selectElem: this._currentLeagueSelect.getElem(),
        optionsGroup: 'LEAGUES'
    });

    this._currentDivisionOptionsController = new OptionsVisibilityController({
        selectElem: this._currentDivisionSelect.getElem(),
        optionsGroup: 'DIVISIONS'
    });
};

module.exports = WinsBoostController;