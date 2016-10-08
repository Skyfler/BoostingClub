"use strict";

var FormTemplate = require('./formTemplate');
var TierImageController = require('./boostController-tierImage');
var OptionsVisibilityController = require('./boostController-optionsVisibility');
var ValueDisplay = require('./boostController-valueDisplay');
var _bcHelper = require('./boostController-helper');
var _ajax = require('./ajax');

function DivisionBoostController(options) {
    FormTemplate.call(this, options);

    this._currentTierWeight = 0;
    this._desiredTierWeight = 0;

    this._getCustomInputs();
    this._createOptionsVisibilityControllers();
    this._createImageControllers();
    this._createValueDisplays();

    this._setTier(
        'current',
        _bcHelper.LEAGUES.br.name,
        _bcHelper.DIVISIONS.d5.name
    );

    this._onCustomSelect = this._onCustomSelect.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onClick = this._onClick.bind(this);

    this._addListener(this._elem, 'customselect', this._onCustomSelect);
    this._addListener(this._elem, 'submit', this._onSubmit);
    this._addListener(this._elem, 'click', this._onClick);

    this._currentLeagueSelect.setOption({value: _bcHelper.LEAGUES.br.name});
    this._currentDivisionSelect.setOption({value: _bcHelper.DIVISIONS.d5.name});
    this._currentLPSelect.setOption({value: _bcHelper.LP.lp0.name});
}

DivisionBoostController.prototype = Object.create(FormTemplate.prototype);
DivisionBoostController.prototype.constructor = DivisionBoostController;

DivisionBoostController.prototype.remove = function() {
    this._destroyImageControllers();
    this._destroyOptionsControllers();
    this._destroyValueDisplays();

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

DivisionBoostController.prototype._destroyValueDisplays = function() {
    if (this._descriptionDisplay) {
        this._descriptionDisplay.remove();
    }

    if (this._priceDisplay) {
        this._priceDisplay.remove();
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

DivisionBoostController.prototype._onClick = function(e) {
    var target = e.target;

    if (target.matches('.img_submit')) {
        this._onSubmit();
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

    var leagueObj = _bcHelper.findLeagueByName(leagueName),
        divisionObj = _bcHelper.findDivisionByName(divisionName);
    // console.log(currentLeagueObj);

    if (!leagueObj || !divisionObj) return;

    this['_' + prefix + 'League'] = leagueObj.name;

    if (
        leagueObj === _bcHelper.LEAGUES.unr ||
        leagueObj === _bcHelper.LEAGUES.ms ||
        leagueObj === _bcHelper.LEAGUES.chg
    ) {
        if (divisionObj !== _bcHelper.DIVISIONS.d1) {
            this['_' + prefix + 'DivisionSelect'].setOption({value: _bcHelper.DIVISIONS.d1.name});

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
        var currentTierWeightObj = _bcHelper.parseTierWeight(this._currentTierWeight);
        // console.log(currentTierWeightObj);

        var newDesiredDivision = _bcHelper.findDivisionByWeight(currentTierWeightObj.divisionWeight + 1),
            newDesiredDivisionName,
            newDesiredLeagueName;

        if (newDesiredDivision) {
            newDesiredDivisionName = newDesiredDivision.name;
            newDesiredLeagueName = this._currentLeague;

        } else {
            var newDesiredLeague = _bcHelper.findLeagueByWeight(currentTierWeightObj.leagueWeight + 10);

            if (newDesiredLeague) {
                newDesiredDivisionName = _bcHelper.DIVISIONS.d5.name;
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
        this._currentLeague === _bcHelper.LEAGUES.unr.name ||
        this._currentLeague === _bcHelper.LEAGUES.ms.name ||
        this._currentLeague === _bcHelper.LEAGUES.chg.name
    ) {
        // console.log('this._currentLeague has 1 division');
        this._currentDivisionOptionsController.showOptions(
            _bcHelper.DIVISIONS.d1.name,
            _bcHelper.DIVISIONS.d1.name,
            true
        );
    } else {
        // console.log('this._currentLeague has 5 divisions');
        this._currentDivisionOptionsController.showOptions(
            _bcHelper.DIVISIONS.d5.name,
            _bcHelper.DIVISIONS.d1.name
        );
    }

    if (this._currentLeague === this._desiredLeague) {
        // console.log('this._currentLeague === this._desiredLeague');
        this._desiredDivisionOptionsController.showOptions(
            _bcHelper.DIVISIONS_LIST[_bcHelper.DIVISIONS_LIST.indexOf(this._currentDivision) + 1],
            _bcHelper.DIVISIONS.d1.name
        );
    } else {
        // console.log('this._currentLeague !== this._desiredLeague');
        this._desiredDivisionOptionsController.showOptions(
            _bcHelper.DIVISIONS.d5.name,
            _bcHelper.DIVISIONS.d1.name
        );
    }

    if (this._currentDivision === _bcHelper.DIVISIONS.d1.name) {
        this._desiredLeagueOptionsController.showOptions(
            _bcHelper.LEAGUES_LIST[_bcHelper.LEAGUES_LIST.indexOf(this._currentLeague) + 1],
            _bcHelper.LEAGUES.ms.name
        );
    } else {
        this._desiredLeagueOptionsController.showOptions(
            _bcHelper.LEAGUES_LIST[_bcHelper.LEAGUES_LIST.indexOf(this._currentLeague)],
            _bcHelper.LEAGUES.ms.name
        );
    }

    if (
        this._desiredLeague === _bcHelper.LEAGUES.unr.name ||
        this._desiredLeague === _bcHelper.LEAGUES.ms.name ||
        this._desiredLeague === _bcHelper.LEAGUES.chg.name
    ) {
        // console.log('this._desiredLeague has 1 division');
        this._desiredDivisionOptionsController.showOptions(
            _bcHelper.DIVISIONS.d1.name,
            _bcHelper.DIVISIONS.d1.name,
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

    this._displayCalculatedValues();
};

DivisionBoostController.prototype._setCurrentLP = function(lpValue) {
    if (_bcHelper.LP.hasOwnProperty(lpValue)) {
        this._lp = _bcHelper.LP[lpValue].name;
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

DivisionBoostController.prototype._createValueDisplays = function() {
    var descriptionDisplay = this._elem.querySelector('.display_description');
    this._descriptionDisplay = new ValueDisplay({
        displayElem: descriptionDisplay,
        prefix: 'Division Boost: '
    });

    var priceDisplay = this._elem.querySelector('.display_price');
    this._priceDisplay = new ValueDisplay({
        displayElem: priceDisplay,
        prefix: 'Total Cost: <strong>',
        suffix: '&euro;</strong>'
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

DivisionBoostController.prototype._displayCalculatedValues = function() {
    this._descriptionDisplay.showValue(this._createDescription());
    this._priceDisplay.showValue(Math.floor(this._getTotalPrice()));
};

DivisionBoostController.prototype._getTotalPrice = function() {
    if (!this._currentLeague || !this._currentDivision || !this._desiredLeague || !this._desiredDivision || !this._lp) {
        return 0;
    }

    return this._totalPriceDivisionBoost(this._currentLeague, this._currentDivision, this._desiredLeague, this._desiredDivision, this._lp);
};

DivisionBoostController.prototype._totalPriceDivisionBoost = function (currentLeagueName, currentDivisionName, desiredLeagueName, desiredDivisionName, currentLp) {
    // console.log(currentLeagueName + ' ' + currentDivisionName + ' ' + desiredLeagueName + ' ' + desiredDivisionName + ' ' + currentLp);
    if (_bcHelper.LEAGUES[currentLeagueName].weight + _bcHelper.DIVISIONS[currentDivisionName].weight >= _bcHelper.LEAGUES[desiredLeagueName].weight + _bcHelper.DIVISIONS[desiredDivisionName].weight) {
        return 0;

    } else {
        var nextCurrentLeagueName,
            nextCurrentDivisionName;

        if (currentDivisionName === _bcHelper.DIVISIONS.d1.name) {
            nextCurrentLeagueName = _bcHelper.LEAGUES_LIST[_bcHelper.LEAGUES_LIST.indexOf(currentLeagueName) + 1];
            nextCurrentDivisionName = _bcHelper.DIVISIONS.d5.name;
        } else {
            nextCurrentLeagueName = currentLeagueName;
            nextCurrentDivisionName = _bcHelper.DIVISIONS_LIST[_bcHelper.DIVISIONS_LIST.indexOf(currentDivisionName) + 1];
        }

        if (
            nextCurrentLeagueName === _bcHelper.LEAGUES.unr.name ||
            nextCurrentLeagueName === _bcHelper.LEAGUES.ms.name ||
            nextCurrentLeagueName === _bcHelper.LEAGUES.chg.name
        ) {
            nextCurrentDivisionName = _bcHelper.DIVISIONS.d1.name;
        }

        return _bcHelper.DIVISION_PRICES[currentLeagueName][currentDivisionName] * _bcHelper.LP[currentLp].multiplier +
            this._totalPriceDivisionBoost(nextCurrentLeagueName, nextCurrentDivisionName, desiredLeagueName, desiredDivisionName, _bcHelper.LP.lp0.name);

    }
};

DivisionBoostController.prototype._createDescription = function() {
    if (!this._currentLeague || !this._currentDivision || !this._desiredLeague || !this._desiredDivision) return '';

    return '{{currentLeagueName}} ({{currentDivisionName}}) -> {{desiredLeagueName}} ({{desiredDivisionName}})'.replace(
        '{{currentLeagueName}}',
        _bcHelper.LEAGUES[this._currentLeague].title
    ).replace(
        '{{currentDivisionName}}',
        _bcHelper.DIVISIONS[this._currentDivision].title
    ).replace(
        '{{desiredLeagueName}}',
        _bcHelper.LEAGUES[this._desiredLeague].title
    ).replace(
        '{{desiredDivisionName}}',
        _bcHelper.DIVISIONS[this._desiredDivision].title
    );
};

DivisionBoostController.prototype._onSubmit = function(e) {
    if (e) {
        e.preventDefault();
    }

    if (this._waitingForResponse) {
        // console.log('Already sent form!');
        return;
    }

    var reqBody = this._getReqBody();

    if (!reqBody) return;

    this._waitingForResponse = true;
    this._elem.classList.add('waiting_for_response');

    var formData = this._createFormData(reqBody);

    _ajax.ajax("POST", "php/paypal_createPayment.php", this._onReqEnd.bind(this), formData);
};

DivisionBoostController.prototype._getReqBody = function() {
    var valuesObj = this._getUserInputValues();

    if (!valuesObj || valuesObj.__validationFailed) return false;

    return {
        serviceType: 'divisionBoost',
        currentLeague: this._currentLeague,
        currentDivision: this._currentDivision,
        desiredLeague: this._desiredLeague,
        desiredDivision: this._desiredDivision,
        currentLP: this._lp,
        name: valuesObj.Name,
        email: valuesObj.Email
    };
};

DivisionBoostController.prototype._onReqEnd = function(xhr) {
    if (!this._elem) return;

    this._waitingForResponse = false;
    this._elem.classList.remove('waiting_for_response');

    var res;

    try {
        res = JSON.parse(xhr.responseText);
    } catch(e) {
        res = false;
    }

    if (xhr.status === 200 && res.success) {
        // this._elem.innerHTML = this._succsessNotificationHTML;
        // console.log(res);
        // console.log(res.approval_link);

        window.location = res.approval_link;
    } else {
        this._showErrorNotification();
        // console.log(res);
    }
};

module.exports = DivisionBoostController;