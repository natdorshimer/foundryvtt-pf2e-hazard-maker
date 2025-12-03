export const Levels: string[] = Array.from({ length: 26 }, (_, i) => String(i - 1)); // Levels -1 to 24

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
    extreme = 'PF2EHAZARDMAKER.extreme',
    high = 'PF2EHAZARDMAKER.high',
    moderate = 'PF2EHAZARDMAKER.moderate',
    low = 'PF2EHAZARDMAKER.low',
    none = 'PF2EHAZARDMAKER.none',
    simple = 'PF2EHAZARDMAKER.simple',
    complex = 'PF2EHAZARDMAKER.complex',
}

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
        availableOptions: [Options.low, Options.moderate, Options.high, Options.extreme],
        defaultValue: Options.moderate,
        statisticEntries: [
            { name: Statistics.stealth },
            { name: Statistics.disable },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.durability',
        availableOptions: [Options.low, Options.moderate, Options.high],
        defaultValue: Options.moderate,
        statisticEntries: [
            { name: Statistics.hp },
            { name: Statistics.hardness },
        ],
    },
    {
        name: 'PF2EHAZARDMAKER.armorAndSaves',
        availableOptions: [Options.low, Options.moderate, Options.high, Options.extreme],
        defaultValue: Options.moderate,
        statisticEntries: [
            { name: Statistics.ac },
            { name: Statistics.fort },
            { name: Statistics.ref },
            { name: Statistics.wil },
        ],
    },
    {
        name: `PF2EHAZARDMAKER.saveDC`,
        availableOptions: [Options.low, Options.moderate, Options.high, Options.extreme],
        defaultValue: Options.moderate,
        statisticEntries: [
            { name: Statistics.saveDC }
        ]
    }
];