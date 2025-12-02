export const Levels: string[] = [
    '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
];

export enum Statistics {
    name = 'PF2EHAZARDMAKER.name',
    level = 'PF2EHAZARDMAKER.level',
    complexity = 'PF2EHAZARDMAKER.complexity',
    stealth = 'PF2EHAZARDMAKER.stealth',
    disable = 'PF2EHAZARDMAKER.disable',
    hp = 'PF2EHAZARDMAKER.hp',
    hardness = 'PF2EHAZARDMAKER.hardness',
    ac = 'PF2EHAZARDMAKER.ac',
    fort = 'PF2EHAZARDMAKER.fort',
    ref = 'PF2EHAZARDMAKER.ref',
    wil = 'PF2EHAZARDMAKER.wil',
    attackBonus = 'PF2EHAZARDMAKER.attackBonus',
    damage = 'PF2EHAZARDMAKER.damage',
    saveDC = 'PF2EHAZARDMAKER.saveDC',
}

export const actorFields = {
    [Statistics.hp]: 'system.attributes.hp.max',
    [Statistics.ac]: 'system.attributes.ac.value',
    [Statistics.fort]: 'system.saves.fortitude.value',
    [Statistics.ref]: 'system.saves.reflex.value',
    [Statistics.wil]: 'system.saves.will.value',
    [Statistics.hardness]: 'system.attributes.hardness',
};

export enum Options {
    extreme = 'PF2EMONSTERMAKER.extreme',
    high = 'PF2EMONSTERMAKER.high',
    moderate = 'PF2EMONSTERMAKER.moderate',
    low = 'PF2EMONSTERMAKER.low',
    terrible = 'PF2EMONSTERMAKER.terrible',
    abysmal = 'PF2EMONSTERMAKER.abysmal',
    none = 'PF2EMONSTERMAKER.none',
    simple = 'PF2EHAZARDMAKER.simple',
    complex = 'PF2EHAZARDMAKER.complex',
}

export const RoadMaps = {
    "PF2EHAZARDMAKER.simpleTrap": {
        [Statistics.stealth]: Options.high,
        [Statistics.disable]: Options.high,
        [Statistics.hp]: Options.moderate,
        [Statistics.hardness]: Options.high,
        [Statistics.ac]: Options.high,
        [Statistics.fort]: Options.high,
        [Statistics.ref]: Options.high,
        [Statistics.wil]: Options.low,
        [Statistics.attackBonus]: Options.simple,
        [Statistics.damage]: Options.simple,
        [Statistics.saveDC]: Options.high,
    },
    "PF2EHAZARDMAKER.complexTrap": {
        [Statistics.stealth]: Options.extreme,
        [Statistics.disable]: Options.high,
        [Statistics.hp]: Options.high,
        [Statistics.hardness]: Options.high,
        [Statistics.ac]: Options.extreme,
        [Statistics.fort]: Options.high,
        [Statistics.ref]: Options.high,
        [Statistics.wil]: Options.high,
        [Statistics.attackBonus]: Options.complex,
        [Statistics.damage]: Options.complex,
        [Statistics.saveDC]: Options.extreme,
    },
    "PF2EHAZARDMAKER.environmental": {
        [Statistics.stealth]: Options.low,
        [Statistics.disable]: Options.low,
        [Statistics.hp]: Options.high,
        [Statistics.hardness]: Options.moderate,
        [Statistics.ac]: Options.low,
        [Statistics.fort]: Options.high,
        [Statistics.ref]: Options.low,
        [Statistics.wil]: Options.low,
        [Statistics.attackBonus]: Options.complex,
        [Statistics.damage]: Options.complex,
        [Statistics.saveDC]: Options.high,
    },
    "PF2EHAZARDMAKER.haunt": {
        [Statistics.stealth]: Options.high,
        [Statistics.disable]: Options.high,
        [Statistics.hp]: Options.low,
        [Statistics.hardness]: Options.low,
        [Statistics.ac]: Options.low,
        [Statistics.fort]: Options.low,
        [Statistics.ref]: Options.low,
        [Statistics.wil]: Options.extreme,
        [Statistics.attackBonus]: Options.simple,
        [Statistics.damage]: Options.complex,
        [Statistics.saveDC]: Options.extreme,
    },
};

export class CreatureStatistic {
    name: string;
    availableOptions?: Options[];
}

export class CreatureStatisticCategory {
    name: string;
    availableOptions: Options[];
    defaultValue: Options;
    statisticEntries: CreatureStatistic[];
}

export const DefaultCreatureStatistics: CreatureStatisticCategory[] = [
    {
        name: 'PF2EHAZARDMAKER.detection',
        availableOptions: [Options.low, Options.high, Options.extreme],
        defaultValue: Options.high,
        statisticEntries: [
            {
                name: Statistics.stealth,
            },
            {
                name: Statistics.disable,
            },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.durability',
        availableOptions: [Options.low, Options.moderate, Options.high],
        defaultValue: Options.moderate,
        statisticEntries: [
            {
                name: Statistics.hp,
            },
            {
                name: Statistics.hardness,
            },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.armorAndSaves',
        availableOptions: [Options.low, Options.high, Options.extreme],
        defaultValue: Options.high,
        statisticEntries: [
            {
                name: Statistics.ac,
            },
            {
                name: Statistics.fort,
            },
            {
                name: Statistics.ref,
            },
            {
                name: Statistics.wil,
            },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.offense',
        availableOptions: [Options.none, Options.simple, Options.complex],
        defaultValue: Options.simple,
        statisticEntries: [
            {
                name: Statistics.attackBonus,
            },
            {
                name: Statistics.damage,
            },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.saveDC',
        availableOptions: [Options.high, Options.extreme],
        defaultValue: Options.high,
        statisticEntries: [
            {
                name: Statistics.saveDC,
            },
        ],
    },
];