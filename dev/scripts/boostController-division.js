"use strict";

var FormTemplate = require('./formTemplate');
var TierImageController = require('./boostController-tierImage');
var OptionsVisibilityController = require('./boostController-optionsVisibility');
var bcHelper = require('./boostController-helper');

function DivisionBoostController(options) {
    FormTemplate.call(this, options);

    this._currentTierWeight = 0;
    this._desiredTierWeight = 0;

    this._getCustomInputs();
    this._createOptionsVisibilityControllers();
    this._createImageControllers();

    this._setTier(
        'current',
        bcHelper.LEAGUES.br.name,
        bcHelper.DIVISIONS.d5.name
    );

    this._onCustomSelect = this._onCustomSelect.bind(this);

    this._addListener(this._elem, 'customselect', this._onCustomSelect);

    this._currentLeagueSelect.setOption({value: bcHelper.LEAGUES.br.name});
    this._currentDivisionSelect.setOption({value: bcHelper.DIVISIONS.d5.name});
    this._currentLPSelect.setOption({value: bcHelper.LP.lp0.name});
}

DivisionBoostController.prototype = Object.create(FormTemplate.prototype);
DivisionBoostController.prototype.constructor = DivisionBoostController;

DivisionBoostController.prototype.remove = function() {
    this._destroyImageControllers();
    this._destroyOptionsControllers();

    FormTemplate.prototype.remove.apply(this, arguments);
};

DivisionBoostController.prototype._destroyImageControllers = function() {
    if (this._currentTierImageController) {
        this._currentTierImageController.remove();
    }

    if (this._desiredTierImageController) {
        this._desiredTierImageController.remove();
    }
};

DivisionBoostController.prototype._destroyOptionsControllers = function() {
    if (this._currentLeagueOptionsController) {
        this._currentLeagueOptionsController.remove();
    }

    if (this._currentDivisionOptionsController) {
        this._currentDivisionOptionsController.remove();
    }

    if (this._desiredLeagueOptionsController) {
        this._desiredLeagueOptionsController.remove();
    }

    if (this._desiredDivisionOptionsController) {
        this._desiredDivisionOptionsController.remove();
    }
};

DivisionBoostController.prototype._getCustomInputs = function() {
    var customInput;

    for (var i = 0; i < this._customSelectArr.length; i++) {
        customInput = this._customSelectArr[i].getElem();

        if (customInput.matches('#division-current-league-select')) {
            // console.log('_currentLeagueSelect found!');
            this._currentLeagueSelect = this._customSelectArr[i];

        } else if (customInput.matches('#division-current-division-select')) {
            // console.log('_currentDivisionSelect found!');
            this._currentDivisionSelect = this._customSelectArr[i];

        } else if (customInput.matches('#division-current-lp-select')) {
            // console.log('_desiredDivisionSelect found!');
            this._currentLPSelect = this._customSelectArr[i];

        } else if (customInput.matches('#division-desired-league-select')) {
            // console.log('_desiredLeagueSelect found!');
            this._desiredLeagueSelect = this._customSelectArr[i];

        } else if (customInput.matches('#division-desired-division-select')) {
            // console.log('_desiredDivisionSelect found!');
            this._desiredDivisionSelect = this._customSelectArr[i];

        }
    }
};

DivisionBoostController.prototype._setTier = function(prefix, leagueName, divisionName) {
    if (!prefix || (prefix !== 'current' && prefix !== 'desired')) return;

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

DivisionBoostController.prototype._setTierAndCheck = function(prefix, leagueName, divisionName) {
    if (!prefix || (prefix !== 'current' && prefix !== 'desired')) return;

    if (this._setTier(prefix, leagueName, divisionName)) {
        this._checkOptions();
    } else {
        return;
    }

    if (this._currentTierWeight >= this._desiredTierWeight) {
        // console.log('this._currentTierWeight >= this._desiredTierWeight');
        var currentTierWeightObj = bcHelper.parseTierWeight(this._currentTierWeight);
        // console.log(currentTierWeightObj);

        var newDesiredDivision = bcHelper.findDivisionByWeight(currentTierWeightObj.divisionWeight + 1),
            newDesiredDivisionName,
            newDesiredLeagueName;

        if (newDesiredDivision) {
            newDesiredDivisionName = newDesiredDivision.name;
            newDesiredLeagueName = this._currentLeague;

        } else {
            var newDesiredLeague = bcHelper.findLeagueByWeight(currentTierWeightObj.leagueWeight + 10);

            if (newDesiredLeague) {
                newDesiredDivisionName = bcHelper.DIVISIONS.d5.name;
                newDesiredLeagueName = newDesiredLeague.name;

            } else {
                console.log('ERROR! Could not set desired tier!');
                return;
            }
        }
        // console.log(newDesiredLeagueName);
        // console.log(newDesiredDivisionName);

        this._setTier('desired', newDesiredLeagueName, newDesiredDivisionName);

        this._desiredLeagueSelect.setOption({value: newDesiredLeagueName});
        this._desiredDivisionSelect.setOption({value: newDesiredDivisionName});

        // this._setDesiredTier(newDesiredLeagueName, newDesiredDivisionName);
    }
};

DivisionBoostController.prototype._checkOptions = function() {
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

    if (this._currentLeague === this._desiredLeague) {
        // console.log('this._currentLeague === this._desiredLeague');
        this._desiredDivisionOptionsController.showOptions(
            bcHelper.DIVISIONS_LIST[bcHelper.DIVISIONS_LIST.indexOf(this._currentDivision) + 1],
            bcHelper.DIVISIONS.d1.name
        );
    } else {
        // console.log('this._currentLeague !== this._desiredLeague');
        this._desiredDivisionOptionsController.showOptions(
            bcHelper.DIVISIONS.d5.name,
            bcHelper.DIVISIONS.d1.name
        );
    }

    if (this._currentDivision === bcHelper.DIVISIONS.d1.name) {
        this._desiredLeagueOptionsController.showOptions(
            bcHelper.LEAGUES_LIST[bcHelper.LEAGUES_LIST.indexOf(this._currentLeague) + 1],
            bcHelper.LEAGUES.ms.name
        );
    } else {
        this._desiredLeagueOptionsController.showOptions(
            bcHelper.LEAGUES_LIST[bcHelper.LEAGUES_LIST.indexOf(this._currentLeague)],
            bcHelper.LEAGUES.ms.name
        );
    }

    if (
        this._desiredLeague === bcHelper.LEAGUES.unr.name ||
        this._desiredLeague === bcHelper.LEAGUES.ms.name ||
        this._desiredLeague === bcHelper.LEAGUES.chg.name
    ) {
        // console.log('this._desiredLeague has 1 division');
        this._desiredDivisionOptionsController.showOptions(
            bcHelper.DIVISIONS.d1.name,
            bcHelper.DIVISIONS.d1.name,
            true
        );
    }
};

DivisionBoostController.prototype._onCustomSelect = function(e) {
    var target = e.target;
    var value = e.detail.value;

    if (target === this._currentLeagueSelect.getElem()) {
        this._setTierAndCheck('current', value, this._currentDivision);

    } else if (target === this._currentDivisionSelect.getElem()) {
        this._setTierAndCheck('current', this._currentLeague, value);

    } else if (target === this._desiredLeagueSelect.getElem()) {
        this._setTierAndCheck('desired', value, this._desiredDivision);

    } else if (target === this._desiredDivisionSelect.getElem()) {
        this._setTierAndCheck('desired', this._desiredLeague, value);

    } else if (target === this._currentLPSelect.getElem()) {
        this._setCurrentLP(value);
    }
};

DivisionBoostController.prototype._setCurrentLP = function(lpValue) {
    if (bcHelper.LP.hasOwnProperty(lpValue)) {
        this._lp = bcHelper.LP[lpValue].name;
    }
};

DivisionBoostController.prototype._createImageControllers = function() {
    var currentTierImage = this._elem.querySelector('#division-current-tier');
    this._currentTierImageController = new TierImageController({
        imageElem: currentTierImage
    });

    var desiredTierImage = this._elem.querySelector('#division-desired-tier');
    this._desiredTierImageController = new TierImageController({
        imageElem: desiredTierImage
    });

};

DivisionBoostController.prototype._createOptionsVisibilityControllers = function() {
    this._currentLeagueOptionsController = new OptionsVisibilityController({
        selectElem: this._currentLeagueSelect.getElem(),
        optionsGroup: 'LEAGUES'
    });

    this._currentDivisionOptionsController = new OptionsVisibilityController({
        selectElem: this._currentDivisionSelect.getElem(),
        optionsGroup: 'DIVISIONS'
    });

    this._desiredLeagueOptionsController = new OptionsVisibilityController({
        selectElem: this._desiredLeagueSelect.getElem(),
        optionsGroup: 'LEAGUES'
    });

    this._desiredDivisionOptionsController = new OptionsVisibilityController({
        selectElem: this._desiredDivisionSelect.getElem(),
        optionsGroup: 'DIVISIONS'
    });
};

module.exports = DivisionBoostController;