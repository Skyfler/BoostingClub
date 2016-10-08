<?php

$valArr = array(
    'LEAGUES' => array(
        'unr' =>  array(
            'title' => 'Unranked',
            'name' => 'unr',
            'weight' => 10
        ),
        'br' =>  array(
            'title' => 'Bronze',
            'name' => 'br',
            'weight' => 20
        ),
        'sv' =>  array(
            'title' => 'Silver',
            'name' => 'sv',
            'weight' => 30
        ),
        'gl' =>  array(
            'title' => 'Gold',
            'name' => 'gl',
            'weight' => 40
        ),
        'pl' =>  array(
            'title' => 'Platinum',
            'name' => 'pl',
            'weight' => 50
        ),
        'dd' =>  array(
            'title' => 'Diamond',
            'name' => 'dd',
            'weight' => 60
        ),
        'ms' =>  array(
            'title' => 'Master',
            'name' => 'ms',
            'weight' => 70
        ),
        'chg' =>  array(
            'title' => 'Challenger',
            'name' => 'chg',
            'weight' => 80
        )
    ),

    'DIVISIONS' => array(
        'd1' =>  array(
            'title' => 'Division I',
            'name' => 'd1',
            'weight' => 5
        ),
        'd2' =>  array(
            'title' => 'Division II',
            'name' => 'd2',
            'weight' => 4
        ),
        'd3' =>  array(
            'title' => 'Division III',
            'name' => 'd3',
            'weight' => 3
        ),
        'd4' =>  array(
            'title' => 'Division IV',
            'name' => 'd4',
            'weight' => 2
        ),
        'd5' =>  array(
            'title' => 'Division V',
            'name' => 'd5',
            'weight' => 1
        )
    ),

    'LP' => array(
        'lp0' =>  array(
            'name' => 'lp0',
            'multiplier' => 1
        ),
        'lp20' =>  array(
            'name' => 'lp20',
            'multiplier' => 0.8
        ),
        'lp40' =>  array(
            'name' => 'lp40',
            'multiplier' => 0.6
        ),
        'lp60' =>  array(
            'name' => 'lp60',
            'multiplier' => 0.4
        ),
        'lp80' =>  array(
            'name' => 'lp80',
            'multiplier' => 0.2
        )
    ),

    'SERVERS' => array(
        'eu' =>  array(
            'title' => 'Europe West',
            'name' => 'eu'
        ),
        'ene' =>  array(
            'title' => 'Europe Nordic & East',
            'name' => 'ene'
        ),
        'na' =>  array(
            'title' => 'North America',
            'name' => 'na'
        )
    ),

    'GAMES_OR_WINS' => array(
        'gms' =>  array(
            'title' => 'Games',
            'name' => 'gms'
        ),
        'wns' =>  array(
            'title' => 'Wins',
            'name' => 'wns'
        )
    ),

    'LEAGUES_LIST' => array('unr', 'br', 'sv', 'gl', 'pl', 'dd', 'ms', 'chg'),

    'DIVISIONS_LIST' => array('d5', 'd4', 'd3', 'd2', 'd1'),

    'DIVISION_PRICES' => array(
        'unr' =>  array(
            'd1' => 0
        ),
        'br' =>  array(
            'd5' => 5,
            'd4' => 6,
            'd3' => 7,
            'd2' => 8,
            'd1' => 10,
        ),
        'sv' =>  array(
            'd5' => 9,
            'd4' => 10,
            'd3' => 11,
            'd2' => 12,
            'd1' => 13,
        ),
        'gl' =>  array(
            'd5' => 14,
            'd4' => 15,
            'd3' => 16,
            'd2' => 17,
            'd1' => 20,
        ),
        'pl' =>  array(
            'd5' => 20,
            'd4' => 25,
            'd3' => 30,
            'd2' => 35,
            'd1' => 43,
        ),
        'dd' =>  array(
            'd5' => 50,
            'd4' => 60,
            'd3' => 70,
            'd2' => 100,
            'd1' => 200,
        ),
        'ms' =>  array(
            'd1' => 0
        ),
        'chg' =>  array(
            'd1' => 0
        )
    ),

    'SOLOQ_PRICE' => array(
        'unr' =>  array(
            'gms' => array(
                '1' => 2,
                '10' => 15
            ),
            'wns' => array(
                '1' => 3.5,
                '10' => 30
            )
        ),
        'br' =>  array(
            'gms' => array(
                '1' => 2,
                '10' => 15
            ),
            'wns' => array(
                '1' => 3.5,
                '10' => 30
            )
        ),
        'sv' =>  array(
            'gms' => array(
                '1' => 3,
                '10' => 25
            ),
            'wns' => array(
                '1' => 5,
                '10' => 40
            )
        ),
        'gl' =>  array(
            'gms' => array(
                '1' => 4,
                '10' => 24
            ),
            'wns' => array(
                '1' => 6,
                '10' => 45
            )
        ),
        'pl' =>  array(
            'gms' => array(
                '1' => 5,
                '10' => 35
            ),
            'wns' => array(
                '1' => 8,
                '10' => 70
            )
        ),
        'dd' =>  array(
            'gms' => array(
                '1' => 8,
                '10' => 70
            ),
            'wns' => array(
                '1' => 12,
                '10' => 100
            )
        ),
        'ms' =>  array(
            'gms' => array(
                '1' => 0,
                '10' => 0
            ),
            'wns' => array(
                '1' => 0,
                '10' => 0
            )
        ),
        'chg' =>  array(
            'gms' => array(
                '1' => 0,
                '10' => 0
            ),
            'wns' => array(
                '1' => 0,
                '10' => 0
            )
        )
    ),

    'DUOQ_PRICE' => array(
        'unr' =>  array(
            'gms' => array(
                '1' => 2,
                '10' => 15
            ),
            'wns' => array(
                '1' => 3.5,
                '10' => 30
            )
        ),
        'br' =>  array(
            'gms' => array(
                '1' => 2,
                '10' => 15
            ),
            'wns' => array(
                '1' => 3.5,
                '10' => 30
            )
        ),
        'sv' =>  array(
            'gms' => array(
                '1' => 3,
                '10' => 25
            ),
            'wns' => array(
                '1' => 5,
                '10' => 40
            )
        ),
        'gl' =>  array(
            'gms' => array(
                '1' => 4,
                '10' => 30
            ),
            'wns' => array(
                '1' => 7,
                '10' => 50
            )
        ),
        'pl' =>  array(
            'gms' => array(
                '1' => 5,
                '10' => 40
            ),
            'wns' => array(
                '1' => 9,
                '10' => 75
            )
        ),
        'dd' =>  array(
            'gms' => array(
                '1' => 10,
                '10' => 80
            ),
            'wns' => array(
                '1' => 15,
                '10' => 120
            )
        ),
        'ms' =>  array(
            'gms' => array(
                '1' => 0,
                '10' => 0
            ),
            'wns' => array(
                '1' => 0,
                '10' => 0
            )
        ),
        'chg' =>  array(
            'gms' => array(
                '1' => 0,
                '10' => 0
            ),
            'wns' => array(
                '1' => 0,
                '10' => 0
            )
        )
    )
);