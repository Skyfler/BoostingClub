<?php

function getTotalPrice() {
    global $valArr;

    if (
        !$_POST['currentLeague'] ||
        !$valArr['LEAGUES'][$_POST['currentLeague']] ||
        !$_POST['currentDivision'] ||
        !$valArr['DIVISIONS'][$_POST['currentDivision']] ||
        !$_POST['gamesOrWins'] ||
        !$valArr['GAMES_OR_WINS'][$_POST['gamesOrWins']] ||
        !$_POST['desiredNumber'] ||
        (int) $_POST['desiredNumber'] <= 0
    ) {
        return 0;
    }


    return totalPriceDuoQBoost(
        $_POST['currentLeague'],
        $_POST['gamesOrWins'],
        (int) $_POST['desiredNumber']
    );
}

function totalPriceDuoQBoost($currentLeagueName, $gamesOrWins, $desiredNumber) {
    global $valArr;

    $one = $desiredNumber % 10;
    $ten = ($desiredNumber - $one) / 10;

    return $valArr['DUOQ_PRICE'][$currentLeagueName][$gamesOrWins][10] * $ten + $valArr['DUOQ_PRICE'][$currentLeagueName][$gamesOrWins][1] * $one;
}

function createDescription() {
    global $valArr;

    if (
        !$_POST['currentLeague'] ||
        !$valArr['LEAGUES'][$_POST['currentLeague']] ||
        !$_POST['currentDivision'] ||
        !$valArr['DIVISIONS'][$_POST['currentDivision']] ||
        !$_POST['gamesOrWins'] ||
        !$valArr['GAMES_OR_WINS'][$_POST['gamesOrWins']] ||
        !$_POST['desiredNumber'] ||
        (int) $_POST['desiredNumber'] <= 0
    ) {
        return '';
    }

    $currentDivision = $_POST['currentDivision'];

    if (
        $_POST['currentLeague'] === $valArr['LEAGUES']['unr']['name'] ||
        $_POST['currentLeague'] === $valArr['LEAGUES']['ms']['name'] ||
        $_POST['currentLeague'] === $valArr['LEAGUES']['chg']['name']
    ) {
        $currentDivision = $valArr['DIVISIONS']['d1']['name'];
    }

    $string = 'Duoq Boost: {{currentLeagueName}} ({{currentDivisionName}}) - {{number}} {{suffix}}.';

    $patterns = array();
    $patterns[0] = '/{{currentLeagueName}}/';
    $patterns[1] = '/{{currentDivisionName}}/';
    $patterns[2] = '/{{number}}/';
    $patterns[3] = '/{{suffix}}/';
    $replacements = array();
    $replacements[0] = $valArr['LEAGUES'][$_POST['currentLeague']]['title'];
    $replacements[1] = $valArr['DIVISIONS'][$currentDivision]['title'];
    $replacements[2] = (int) $_POST['desiredNumber'];
    $replacements[3] = $valArr['GAMES_OR_WINS'][$_POST['gamesOrWins']]['title'];

    return preg_replace($patterns, $replacements, $string);
}