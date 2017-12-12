module.exports = {
    LEAGUES: {
        unr: {
            title: 'Unranked',
            name: 'unr',
            wight: 10
        },
        br: {
            title: 'Bronze',
            name: 'br',
            weight: 20
        },
        sv: {
            title: 'Silver',
            name: 'sv',
            weight: 30
        },
        gl: {
            title: 'Gold',
            name: 'gl',
            weight: 40
        },
        pl: {
            title: 'Platinum',
            name: 'pl',
            weight: 50
        },
        dd: {
            title: 'Diamond',
            name: 'dd',
            weight: 60
        },
        ms: {
            title: 'Master',
            name: 'ms',
            weight: 70
        },
        chg: {
            title: 'Challenger',
            name: 'chg',
            weight: 80
        }
    },

    findLeagueByName: function(name) {
        for (var key in this.LEAGUES) {
            if (this.LEAGUES[key].name === name) {
                return this.LEAGUES[key];
            }
        }

        return false
    },

    findLeagueByWeight: function(weight) {
        for (var key in this.LEAGUES) {
            if (this.LEAGUES[key].weight === weight) {
                return this.LEAGUES[key];
            }
        }

        return false
    },

    DIVISIONS: {
        d1: {
            title: 'Division I',
            name: 'd1',
            weight: 5
        },
        d2: {
            title: 'Division II',
            name: 'd2',
            weight: 4
        },
        d3: {
            title: 'Division III',
            name: 'd3',
            weight: 3
        },
        d4: {
            title: 'Division IV',
            name: 'd4',
            weight: 2
        },
        d5: {
            title: 'Division V',
            name: 'd5',
            weight: 1
        }
    },

    findDivisionByName: function(name) {
        for (var key in this.DIVISIONS) {
            if (this.DIVISIONS[key].name === name) {
                return this.DIVISIONS[key];
            }
        }

        return false
    },

    findDivisionByWeight: function(weight) {
        for (var key in this.DIVISIONS) {
            if (this.DIVISIONS[key].weight === weight) {
                return this.DIVISIONS[key];
            }
        }

        return false
    },

    parseTierWeight: function(weight) {
        var divisionWeight = weight % 10;
        return {
            divisionWeight: divisionWeight,
            leagueWeight: weight - divisionWeight
        }
    },

    LP: {
        lp0: {
            name: 'lp0',
            multiplier: 1
        },
        lp20: {
            name: 'lp20',
            multiplier: 0.8
        },
        lp40: {
            name: 'lp40',
            multiplier: 0.5
        },
        lp60: {
            name: 'lp60',
            multiplier: 0.5
        },
        lp80: {
            name: 'lp80',
            multiplier: 0.5
        }
    },

    SERVERS: {
        eu: {
            title: 'Europe West',
            name: 'eu'
        },
        ene: {
            title: 'Europe Nordic & East',
            name: 'ene'
        },
        na: {
            title: 'North America',
            name: 'na'
        }
    },

    IMAGES_SRC: {
        unr: {
            d1: 'img/tiers/unranked_1.png'
        },
        br: {
            d5: 'img/tiers/bronze_5.png',
            d4: 'img/tiers/bronze_4.png',
            d3: 'img/tiers/bronze_3.png',
            d2: 'img/tiers/bronze_2.png',
            d1: 'img/tiers/bronze_1.png'
        },
        sv: {
            d5: 'img/tiers/silver_5.png',
            d4: 'img/tiers/silver_4.png',
            d3: 'img/tiers/silver_3.png',
            d2: 'img/tiers/silver_2.png',
            d1: 'img/tiers/silver_1.png'
        },
        gl: {
            d5: 'img/tiers/gold_5.png',
            d4: 'img/tiers/gold_4.png',
            d3: 'img/tiers/gold_3.png',
            d2: 'img/tiers/gold_2.png',
            d1: 'img/tiers/gold_1.png'
        },
        pl: {
            d5: 'img/tiers/platinum_5.png',
            d4: 'img/tiers/platinum_4.png',
            d3: 'img/tiers/platinum_3.png',
            d2: 'img/tiers/platinum_2.png',
            d1: 'img/tiers/platinum_1.png'
        },
        dd: {
            d5: 'img/tiers/diamond_5.png',
            d4: 'img/tiers/diamond_4.png',
            d3: 'img/tiers/diamond_3.png',
            d2: 'img/tiers/diamond_2.png',
            d1: 'img/tiers/diamond_1.png'
        },
        ms: {
            d1: 'img/tiers/master_1.png'
        },
        chg: {
            d1: 'img/tiers/challenger.png'
        }
    },

    GAMES_OR_WINS: {
        gms: {
            title: 'Games',
            name: 'gms'
        },
        wns: {
            title: 'Wins',
            name: 'wns'
        }
    },

    LEAGUES_LIST: ['unr', 'br', 'sv', 'gl', 'pl', 'dd', 'ms', 'chg'],

    DIVISIONS_LIST: ['d5', 'd4', 'd3', 'd2', 'd1'],

    OPTION_TEMPLATE: '<li class="option" data-value="{{value}}">{{title}}</li>',

    createOption: function(value, title) {
        return this.OPTION_TEMPLATE.replace(
            '{{value}}',
            value
        ).replace(
            '{{title}}',
            title
        );
    },

    DIVISION_PRICES: {
        unr: {
            d1: 0
        },
        br: {
            d5: 5,
            d4: 6,
            d3: 7,
            d2: 8,
            d1: 10
        },
        sv: {
            d5: 9,
            d4: 10,
            d3: 11,
            d2: 12,
            d1: 13
        },
        gl: {
            d5: 14,
            d4: 15,
            d3: 16,
            d2: 17,
            d1: 20
        },
        pl: {
            d5: 20,
            d4: 25,
            d3: 30,
            d2: 35,
            d1: 43
        },
        dd: {
            d5: 50,
            d4: 60,
            d3: 70,
            d2: 100,
            d1: 200
        },
        ms: {
            d1: 0
        },
        chg: {
            d1: 0
        }
    },

    SOLOQ_PRICE: {
        unr: {
            gms: {
                1: 2,
                10: 15
            },
            wns: {
                1: 3.5,
                10: 30
            }
        },
        br: {
            gms: {
                1: 2,
                10: 15
            },
            wns: {
                1: 3.5,
                10: 30
            }
        },
        sv: {
            gms: {
                1: 3,
                10: 25
            },
            wns: {
                1: 5,
                10: 40
            }
        },
        gl: {
            gms: {
                1: 4,
                10: 24
            },
            wns: {
                1: 6,
                10: 45
            }
        },
        pl: {
            gms: {
                1: 5,
                10: 35
            },
            wns: {
                1: 8,
                10: 70
            }
        },
        dd: {
            gms: {
                1: 8,
                10: 70
            },
            wns: {
                1: 12,
                10: 100
            }
        },
        ms: {
            gms: {
                1: 0,
                10: 0
            },
            wns: {
                1: 0,
                10: 0
            }
        },
        chg: {
            gms: {
                1: 0,
                10: 0
            },
            wns: {
                1: 0,
                10: 0
            }
        }
    },

    DUOQ_PRICE: {
        unr: {
            gms: {
                1: 2,
                10: 15
            },
            wns: {
                1: 3.5,
                10: 30
            }
        },
        br: {
            gms: {
                1: 2,
                10: 15
            },
            wns: {
                1: 3.5,
                10: 30
            }
        },
        sv: {
            gms: {
                1: 3,
                10: 25
            },
            wns: {
                1: 5,
                10: 40
            }
        },
        gl: {
            gms: {
                1: 4,
                10: 30
            },
            wns: {
                1: 7,
                10: 50
            }
        },
        pl: {
            gms: {
                1: 5,
                10: 40
            },
            wns: {
                1: 9,
                10: 75
            }
        },
        dd: {
            gms: {
                1: 10,
                10: 80
            },
            wns: {
                1: 15,
                10: 120
            }
        },
        ms: {
            gms: {
                1: 0,
                10: 0
            },
            wns: {
                1: 0,
                10: 0
            }
        },
        chg: {
            gms: {
                1: 0,
                10: 0
            },
            wns: {
                1: 0,
                10: 0
            }
        }
    }
};