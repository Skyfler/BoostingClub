<?php

function getTotalPrice() {
	global $valArr;

    if (
		!$_POST['currentLeague'] ||
		!$valArr['LEAGUES'][$_POST['currentLeague']] ||
		!$_POST['currentDivision'] ||
		!$valArr['DIVISIONS'][$_POST['currentDivision']] ||
		!$_POST['desiredLeague'] ||
		!$valArr['LEAGUES'][$_POST['desiredLeague']] ||
		!$_POST['desiredDivision'] ||
		!$valArr['DIVISIONS'][$_POST['desiredDivision']] ||
		!$_POST['currentLP'] ||
		!$valArr['LP'][$_POST['currentLP']]
	) {
        return 0;
    }

	$currentDivision = $_POST['currentDivision'];

	if (
        $_POST['currentLeague'] === $valArr['LEAGUES']['unr']['name'] ||
        $_POST['currentLeague'] === $valArr['LEAGUES']['ms']['name'] ||
        $_POST['currentLeague'] === $valArr['LEAGUES']['chg']['name']
    ) {
        $currentDivision = $valArr['DIVISIONS']['d1']['name'];
    }

	$desiredDivision = $_POST['desiredDivision'];

	if (
        $_POST['desiredLeague'] === $valArr['LEAGUES']['unr']['name'] ||
        $_POST['desiredLeague'] === $valArr['LEAGUES']['ms']['name'] ||
        $_POST['desiredLeague'] === $valArr['LEAGUES']['chg']['name']
    ) {
        $desiredDivision = $valArr['DIVISIONS']['d1']['name'];
    }

    return totalPriceDivisionBoost(
		$_POST['currentLeague'],
		$currentDivision,
		$_POST['desiredLeague'],
		$desiredDivision,
		$_POST['currentLP']
	);
}

function totalPriceDivisionBoost($currentLeagueName, $currentDivisionName, $desiredLeagueName, $desiredDivisionName, $currentLp) {
	global $valArr;

    if ($valArr['LEAGUES'][$currentLeagueName]['weight'] + $valArr['DIVISIONS'][$currentDivisionName]['weight'] >= $valArr['LEAGUES'][$desiredLeagueName]['weight'] + $valArr['DIVISIONS'][$desiredDivisionName]['weight']) {
        return 0;

    } else {

        if ($currentDivisionName === $valArr['DIVISIONS']['d1']['name']) {
			$nextCurrentLeagueName = $valArr['LEAGUES_LIST'][array_search($currentLeagueName, $valArr['LEAGUES_LIST']) + 1];
            $nextCurrentDivisionName = $valArr['DIVISIONS']['d5']['name'];
        } else {
            $nextCurrentLeagueName = $currentLeagueName;
            $nextCurrentDivisionName = $valArr['DIVISIONS_LIST'][array_search($currentDivisionName, $valArr['DIVISIONS_LIST']) + 1];
        }

        if (
            $nextCurrentLeagueName === $valArr['LEAGUES']['unr']['name'] ||
            $nextCurrentLeagueName === $valArr['LEAGUES']['ms']['name'] ||
            $nextCurrentLeagueName === $valArr['LEAGUES']['chg']['name']
        ) {
            $nextCurrentDivisionName = $valArr['DIVISIONS']['d1']['name'];
        }

        return $valArr['DIVISION_PRICES'][$currentLeagueName][$currentDivisionName] * $valArr['LP'][$currentLp]['multiplier'] +
		totalPriceDivisionBoost($nextCurrentLeagueName, $nextCurrentDivisionName, $desiredLeagueName, $desiredDivisionName, $valArr['LP']['lp0']['name']);
    }
}

function createDescription() {
	global $valArr;

    if (
		!$_POST['currentLeague'] ||
		!$valArr['LEAGUES'][$_POST['currentLeague']] ||
		!$_POST['currentDivision'] ||
		!$valArr['DIVISIONS'][$_POST['currentDivision']] ||
		!$_POST['desiredLeague'] ||
		!$valArr['LEAGUES'][$_POST['desiredLeague']] ||
		!$_POST['desiredDivision'] ||
		!$valArr['DIVISIONS'][$_POST['desiredDivision']]
	) {
		return '';
	};

	$string = 'Division Boost: {{currentLeagueName}} ({{currentDivisionName}}) -> {{desiredLeagueName}} ({{desiredDivisionName}}).';

	$patterns = array();
	$patterns[0] = '/{{currentLeagueName}}/';
	$patterns[1] = '/{{currentDivisionName}}/';
	$patterns[2] = '/{{desiredLeagueName}}/';
	$patterns[3] = '/{{desiredDivisionName}}/';
	$replacements = array();
	$replacements[0] = $valArr['LEAGUES'][$_POST['currentLeague']]['title'];
	$replacements[1] = $valArr['DIVISIONS'][$_POST['currentDivision']]['title'];
	$replacements[2] = $valArr['LEAGUES'][$_POST['desiredLeague']]['title'];
	$replacements[3] = $valArr['DIVISIONS'][$_POST['desiredDivision']]['title'];

	return preg_replace($patterns, $replacements, $string);
}