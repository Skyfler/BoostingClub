"use strict";

var FormTemplate = require('./formTemplate');
var TierImageController = require('./boostController-tierImage');
var OptionsVisibilityController = require('./boostController-optionsVisibility');
var InputRangeDisplay = require('./boostController-inputRange');
var bcHelper = require('./boostController-helper');

function DuoBoostController(options) {
    FormTemplate.call(this, options);

    this._currentTierWeight = 0;
    this._desiredNumber = 0;

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

    this._serverSelect.setOption({value: bcHelper.SERVERS.eu.name});
    this._numberInputRange.setValue(5);
    this._suffixSelect.setOption({value: bcHelper.GAMES_OR_WINS.gms.name});
    this._currentLeagueSelect.setOption({value: bcHelper.LEAGUES.br.name});
    this._currentDivisionSelect.setOption({value: bcHelper.DIVISIONS.d5.name});
}

DuoBoostController.prototype = Object.create(FormTemplate.prototype);
DuoBoostController.prototype.constructor = DuoBoostController;

DuoBoostController.prototype.remove = function() {
    this._destroyImageControllers();
    this._destroyOptionsControllers();
    this._destroyInputRangeDisplay();

    FormTemplate.prototype.remove.apply(this, arguments);
};

DuoBoostController.prototype._destroyImageControllers = function() {
    if (this._currentTierImageController) {
        this._currentTierImageController.remove();
    }
};

DuoBoostController.prototype._destroyInputRangeDisplay = function() {
    if (this._duoDisplay) {
        this._duoDisplay.remove();
    }
};

DuoBoostController.prototype._destroyOptionsControllers = function() {
    if (this._currentLeagueOptionsController) {
        this._currentLeagueOptionsController.remove();
    }

    if (this._currentDivisionOptionsController) {
        this._currentDivisionOptionsController.remove();
    }
};

DuoBoostController.prototype._getCustomInputs = function() {
    var customInput;

    for (var i = 0; i < this._customSelectArr.length; i++) {
        customInput = this._customSelectArr[i].getElem();

        if (customInput.matches('#duo-server-select')) {
            // console.log('_currentLeagueSelect found!');
            this._serverSelect = this._customSelectArr[i];

        } else if (customInput.matches('#duo-games-wins-select')) {
            // console.log('_currentDivisionSelect found!');
            this._suffixSelect = this._customSelectArr[i];

        } else if (customInput.matches('#duo-current-league-select')) {
            // console.log('_currentLeagueSelect found!');
            this._currentLeagueSelect = this._customSelectArr[i];

        } else if (customInput.matches('#duo-current-division-select')) {
            // console.log('_currentDivisionSelect found!');
            this._currentDivisionSelect = this._customSelectArr[i];

        }
    }

    for (i = 0; i < this._customInputRangeArr.length; i++) {
        customInput = this._customInputRangeArr[i].getElem();

        if (customInput.matches('#duo-number-range')) {
            // console.log('_currentLeagueSelect found!');
            this._numberInputRange = this._customInputRangeArr[i];

        }
    }
};

DuoBoostController.prototype._setTier = function(prefix, leagueName, divisionName) {
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

DuoBoostController.prototype._setTierAndCheck = function(prefix, leagueName, divisionName) {
    if (!prefix || prefix !== 'current') return;

    if (this._setTier(prefix, leagueName, divisionName)) {
        this._checkOptions();
    }
};

DuoBoostController.prototype._checkOptions = function() {
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

DuoBoostController.prototype._onCustomSelect = function(e) {
    var target = e.target;
    var value = e.detail.value;

    if (target === this._currentLeagueSelect.getElem()) {
        this._setTierAndCheck('current', value, this._currentDivision);

    } else if (target === this._currentDivisionSelect.getElem()) {
        this._setTierAndCheck('current', this._currentLeague, value);

    } else if (target === this._serverSelect.getElem()) {
        this._setServer(value);

    } else if (target === this._suffixSelect.getElem()) {
        this._setSuffix(value);

    }
};

DuoBoostController.prototype._onCustomInputRange = function(e) {
    var target = e.target;
    var value = e.detail.value;

    if (target === this._numberInputRange.getElem()) {
        this._setWins(value);

    }
};

DuoBoostController.prototype._setServer = function(server) {
    if (bcHelper.SERVERS.hasOwnProperty(server)) {
        this._server = server;
    }
};

DuoBoostController.prototype._setSuffix = function(suffix) {
    if (bcHelper.GAMES_OR_WINS.hasOwnProperty(suffix)) {
        this._suffix = bcHelper.GAMES_OR_WINS[suffix].title;
        this._duoDisplay.setSuffix(this._suffix);
        this._duoDisplay.showValue(this._desiredNumber);
    }
};

DuoBoostController.prototype._setWins = function(value) {
    this._desiredNumber = value;
    this._duoDisplay.showValue(this._desiredNumber);
};

DuoBoostController.prototype._createImageControllers = function() {
    var currentTierImage = this._elem.querySelector('#duo-current-tier');
    this._currentTierImageController = new TierImageController({
        imageElem: currentTierImage
    });
};

DuoBoostController.prototype._createInputRangeDisplay = function() {
    var winsDisplay = this._elem.querySelector('#duo-display');
    this._duoDisplay = new InputRangeDisplay({
        displayElem: winsDisplay
    });
};


DuoBoostController.prototype._createOptionsVisibilityControllers = function() {
    this._currentLeagueOptionsController = new OptionsVisibilityController({
        selectElem: this._currentLeagueSelect.getElem(),
        optionsGroup: 'LEAGUES'
    });

    this._currentDivisionOptionsController = new OptionsVisibilityController({
        selectElem: this._currentDivisionSelect.getElem(),
        optionsGroup: 'DIVISIONS'
    });
};

module.exports = DuoBoostController;