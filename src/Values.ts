import {Options, Statistics} from "./Keys";

type Numeric = number | string;

const detectionDisableData = [
    {level: "-1", extreme: 18, high: 15, low: 12},
    {level: "0", extreme: 19, high: 16, low: 13},
    {level: "1", extreme: 20, high: 17, low: 14},
    {level: "2", extreme: 21, high: 18, low: 15},
    {level: "3", extreme: 23, high: 20, low: 17},
    {level: "4", extreme: 25, high: 22, low: 18},
    {level: "5", extreme: 26, high: 23, low: 20},
    {level: "6", extreme: 28, high: 25, low: 21},
    {level: "7", extreme: 30, high: 27, low: 23},
    {level: "8", extreme: 31, high: 28, low: 24},
    {level: "9", extreme: 33, high: 30, low: 26},
    {level: "10", extreme: 35, high: 32, low: 27},
    {level: "11", extreme: 36, high: 33, low: 29},
    {level: "12", extreme: 38, high: 35, low: 30},
    {level: "13", extreme: 40, high: 37, low: 32},
    {level: "14", extreme: 41, high: 38, low: 33},
    {level: "15", extreme: 43, high: 40, low: 35},
    {level: "16", extreme: 45, high: 42, low: 36},
    {level: "17", extreme: 46, high: 43, low: 38},
    {level: "18", extreme: 48, high: 45, low: 39},
    {level: "19", extreme: 50, high: 47, low: 41},
    {level: "20", extreme: 51, high: 48, low: 42},
    {level: "21", extreme: 53, high: 50, low: 44},
    {level: "22", extreme: 55, high: 52, low: 45},
    {level: "23", extreme: 56, high: 53, low: 46},
    {level: "24", extreme: 58, high: 55, low: 48},
];

const acData = [
    {level: "-1", extreme: 18, high: 15, low: 12},
    {level: "0", extreme: 19, high: 16, low: 13},
    {level: "1", extreme: 19, high: 16, low: 13},
    {level: "2", extreme: 21, high: 18, low: 15},
    {level: "3", extreme: 22, high: 19, low: 16},
    {level: "4", extreme: 24, high: 21, low: 18},
    {level: "5", extreme: 25, high: 22, low: 19},
    {level: "6", extreme: 27, high: 24, low: 21},
    {level: "7", extreme: 28, high: 25, low: 22},
    {level: "8", extreme: 30, high: 27, low: 24},
    {level: "9", extreme: 31, high: 28, low: 25},
    {level: "10", extreme: 33, high: 30, low: 27},
    {level: "11", extreme: 34, high: 31, low: 28},
    {level: "12", extreme: 36, high: 33, low: 30},
    {level: "13", extreme: 37, high: 34, low: 31},
    {level: "14", extreme: 39, high: 36, low: 33},
    {level: "15", extreme: 40, high: 37, low: 34},
    {level: "16", extreme: 42, high: 39, low: 36},
    {level: "17", extreme: 43, high: 40, low: 37},
    {level: "18", extreme: 45, high: 42, low: 39},
    {level: "19", extreme: 46, high: 43, low: 40},
    {level: "20", extreme: 48, high: 45, low: 42},
    {level: "21", extreme: 49, high: 46, low: 43},
    {level: "22", extreme: 51, high: 48, low: 45},
    {level: "23", extreme: 52, high: 49, low: 46},
    {level: "24", extreme: 54, high: 51, low: 48},
];

const saveData = [
    {level: "-1", extreme: 9, high: 8, low: 2},
    {level: "0", extreme: 10, high: 9, low: 3},
    {level: "1", extreme: 11, high: 10, low: 4},
    {level: "2", extreme: 12, high: 11, low: 5},
    {level: "3", extreme: 14, high: 12, low: 6},
    {level: "4", extreme: 15, high: 14, low: 8},
    {level: "5", extreme: 17, high: 15, low: 9},
    {level: "6", extreme: 18, high: 17, low: 11},
    {level: "7", extreme: 20, high: 18, low: 12},
    {level: "8", extreme: 21, high: 19, low: 13},
    {level: "9", extreme: 23, high: 21, low: 15},
    {level: "10", extreme: 24, high: 22, low: 16},
    {level: "11", extreme: 26, high: 24, low: 18},
    {level: "12", extreme: 27, high: 25, low: 19},
    {level: "13", extreme: 29, high: 26, low: 20},
    {level: "14", extreme: 30, high: 28, low: 22},
    {level: "15", extreme: 32, high: 29, low: 23},
    {level: "16", extreme: 33, high: 30, low: 25},
    {level: "17", extreme: 35, high: 32, low: 26},
    {level: "18", extreme: 36, high: 33, low: 27},
    {level: "19", extreme: 38, high: 35, low: 29},
    {level: "20", extreme: 39, high: 36, low: 30},
    {level: "21", extreme: 41, high: 38, low: 32},
    {level: "22", extreme: 43, high: 39, low: 33},
    {level: "23", extreme: 44, high: 40, low: 34},
    {level: "24", extreme: 46, high: 42, low: 36},
];

const hardnessData = [
    {level: "-1", low: 2, moderate: 3, high: 4},
    {level: "0", low: 3, moderate: 4, high: 5},
    {level: "1", low: 5, moderate: 6, high: 7},
    {level: "2", low: 7, moderate: 8, high: 9},
    {level: "3", low: 10, moderate: 11, high: 12},
    {level: "4", low: 11, moderate: 12, high: 13},
    {level: "5", low: 12, moderate: 13, high: 14},
    {level: "6", low: 13, moderate: 14, high: 15},
    {level: "7", low: 14, moderate: 15, high: 16},
    {level: "8", low: 15, moderate: 16, high: 17},
    {level: "9", low: 16, moderate: 17, high: 18},
    {level: "10", low: 17, moderate: 18, high: 19},
    {level: "11", low: 19, moderate: 20, high: 21},
    {level: "12", low: 20, moderate: 21, high: 22},
    {level: "13", low: 21, moderate: 22, high: 23},
    {level: "14", low: 22, moderate: 23, high: 24},
    {level: "15", low: 23, moderate: 24, high: 25},
    {level: "16", low: 25, moderate: 26, high: 27},
    {level: "17", low: 27, moderate: 28, high: 29},
    {level: "18", low: 29, moderate: 30, high: 31},
    {level: "19", low: 31, moderate: 32, high: 33},
    {level: "20", low: 33, moderate: 34, high: 35},
    {level: "21", low: 36, moderate: 37, high: 38},
    {level: "22", low: 39, moderate: 40, high: 41},
    {level: "23", low: 44, moderate: 45, high: 46},
    {level: "24", low: 46, moderate: 48, high: 50},
];

const hpData = [
    {level: "-1", low: 11, moderate: 12, high: 13},
    {level: "0", low: 15, moderate: 16, high: 17},
    {level: "1", low: 23, moderate: 24, high: 25},
    {level: "2", low: 30, moderate: 32, high: 34},
    {level: "3", low: 42, moderate: 44, high: 46},
    {level: "4", low: 46, moderate: 48, high: 50},
    {level: "5", low: 50, moderate: 52, high: 54},
    {level: "6", low: 54, moderate: 56, high: 58},
    {level: "7", low: 58, moderate: 60, high: 62},
    {level: "8", low: 62, moderate: 64, high: 66},
    {level: "9", low: 66, moderate: 68, high: 70},
    {level: "10", low: 70, moderate: 72, high: 74},
    {level: "11", low: 78, moderate: 80, high: 82},
    {level: "12", low: 82, moderate: 84, high: 86},
    {level: "13", low: 86, moderate: 88, high: 90},
    {level: "14", low: 90, moderate: 92, high: 94},
    {level: "15", low: 94, moderate: 96, high: 98},
    {level: "16", low: 101, moderate: 104, high: 107},
    {level: "17", low: 109, moderate: 112, high: 115},
    {level: "18", low: 117, moderate: 120, high: 123},
    {level: "19", low: 125, moderate: 128, high: 131},
    {level: "20", low: 133, moderate: 136, high: 139},
    {level: "21", low: 144, moderate: 148, high: 152},
    {level: "22", low: 156, moderate: 160, high: 164},
    {level: "23", low: 168, moderate: 172, high: 176},
    {level: "24", low: 180, moderate: 184, high: 188},
];

const attackBonusData = [
    {level: "-1", simple: 10, complex: 8},
    {level: "0", simple: 11, complex: 8},
    {level: "1", simple: 13, complex: 9},
    {level: "2", simple: 14, complex: 11},
    {level: "3", simple: 16, complex: 12},
    {level: "4", simple: 17, complex: 14},
    {level: "5", simple: 19, complex: 15},
    {level: "6", simple: 20, complex: 17},
    {level: "7", simple: 22, complex: 18},
    {level: "8", simple: 23, complex: 20},
    {level: "9", simple: 25, complex: 21},
    {level: "10", simple: 26, complex: 23},
    {level: "11", simple: 28, complex: 24},
    {level: "12", simple: 29, complex: 26},
    {level: "13", simple: 31, complex: 27},
    {level: "14", simple: 32, complex: 29},
    {level: "15", simple: 34, complex: 30},
    {level: "16", simple: 35, complex: 32},
    {level: "17", simple: 37, complex: 33},
    {level: "18", simple: 38, complex: 35},
    {level: "19", simple: 40, complex: 36},
    {level: "20", simple: 41, complex: 38},
    {level: "21", simple: 43, complex: 39},
    {level: "22", simple: 44, complex: 41},
    {level: "23", simple: 46, complex: 42},
    {level: "24", simple: 47, complex: 44},
];

const damageData = [
    {level: "-1", simple: "2d4+1", complex: "1d4+1"},
    {level: "0", simple: "2d6+3", complex: "1d6+2"},
    {level: "1", simple: "2d6+5", complex: "1d6+3"},
    {level: "2", simple: "2d10+7", complex: "1d10+4"},
    {level: "3", simple: "2d10+13", complex: "1d10+6"},
    {level: "4", simple: "4d8+10", complex: "2d8+5"},
    {level: "5", simple: "4d8+14", complex: "2d8+7"},
    {level: "6", simple: "4d8+18", complex: "2d8+9"},
    {level: "7", simple: "4d10+18", complex: "2d10+9"},
    {level: "8", simple: "4d10+22", complex: "2d10+11"},
    {level: "9", simple: "4d10+26", complex: "2d10+13"},
    {level: "10", simple: "4d12+26", complex: "2d12+13"},
    {level: "11", simple: "4d12+30", complex: "2d12+15"},
    {level: "12", simple: "6d10+27", complex: "3d10+14"},
    {level: "13", simple: "6d10+31", complex: "3d10+16"},
    {level: "14", simple: "6d10+35", complex: "3d10+18"},
    {level: "15", simple: "6d12+33", complex: "3d12+17"},
    {level: "16", simple: "6d12+35", complex: "3d12+18"},
    {level: "17", simple: "6d12+37", complex: "3d12+19"},
    {level: "18", simple: "6d12+41", complex: "3d12+20"},
    {level: "19", simple: "8d10+40", complex: "4d10+20"},
    {level: "20", simple: "8d10+44", complex: "4d10+22"},
    {level: "21", simple: "8d10+48", complex: "4d10+24"},
    {level: "22", simple: "8d10+52", complex: "4d10+26"},
    {level: "23", simple: "8d12+48", complex: "4d12+24"},
    {level: "24", simple: "8d12+52", complex: "4d12+26"},
];

const saveDcData = [
    {level: "-1", extreme: 19, high: 16},
    {level: "0", extreme: 19, high: 16},
    {level: "1", extreme: 20, high: 17},
    {level: "2", extreme: 22, high: 18},
    {level: "3", extreme: 23, high: 20},
    {level: "4", extreme: 25, high: 21},
    {level: "5", extreme: 26, high: 22},
    {level: "6", extreme: 27, high: 24},
    {level: "7", extreme: 29, high: 25},
    {level: "8", extreme: 30, high: 26},
    {level: "9", extreme: 32, high: 28},
    {level: "10", extreme: 33, high: 29},
    {level: "11", extreme: 34, high: 30},
    {level: "12", extreme: 36, high: 32},
    {level: "13", extreme: 37, high: 33},
    {level: "14", extreme: 39, high: 34},
    {level: "15", extreme: 40, high: 36},
    {level: "16", extreme: 41, high: 37},
    {level: "17", extreme: 43, high: 38},
    {level: "18", extreme: 44, high: 40},
    {level: "19", extreme: 46, high: 41},
    {level: "20", extreme: 47, high: 42},
    {level: "21", extreme: 48, high: 44},
    {level: "22", extreme: 50, high: 45},
    {level: "23", extreme: 51, high: 46},
    {level: "24", extreme: 52, high: 48},
];

function buildThreeTierRecord(
    data: {level: string; extreme?: Numeric; high?: Numeric; low?: Numeric; moderate?: Numeric}[],
    map: (entry: typeof data[number]) => Record<string, string>,
) {
    return data.reduce<Record<string, Record<string, string>>>((acc, entry) => {
        acc[entry.level] = map(entry);
        return acc;
    }, {});
}

const detectionDisable = buildThreeTierRecord(detectionDisableData, (entry) => ({
    [Options.extreme]: entry.extreme!.toString(),
    [Options.high]: entry.high!.toString(),
    [Options.low]: entry.low!.toString(),
}));

const armorClass = buildThreeTierRecord(acData, (entry) => ({
    [Options.extreme]: entry.extreme!.toString(),
    [Options.high]: entry.high!.toString(),
    [Options.low]: entry.low!.toString(),
}));

const saves = buildThreeTierRecord(saveData, (entry) => ({
    [Options.extreme]: entry.extreme!.toString(),
    [Options.high]: entry.high!.toString(),
    [Options.low]: entry.low!.toString(),
}));

const hardness = buildThreeTierRecord(hardnessData, (entry) => ({
    [Options.high]: entry.high!.toString(),
    [Options.moderate]: entry.moderate!.toString(),
    [Options.low]: entry.low!.toString(),
}));

const hitPoints = buildThreeTierRecord(hpData, (entry) => ({
    [Options.high]: entry.high!.toString(),
    [Options.moderate]: entry.moderate!.toString(),
    [Options.low]: entry.low!.toString(),
}));

const attackBonus = attackBonusData.reduce<Record<string, Record<string, string>>>((acc, entry) => {
    acc[entry.level] = {
        [Options.simple]: entry.simple.toString(),
        [Options.complex]: entry.complex.toString(),
    };
    return acc;
}, {});

const damage = damageData.reduce<Record<string, Record<string, string>>>((acc, entry) => {
    acc[entry.level] = {
        [Options.simple]: entry.simple,
        [Options.complex]: entry.complex,
        [Options.none]: "",
    };
    return acc;
}, {});

const saveDC = saveDcData.reduce<Record<string, Record<string, string>>>((acc, entry) => {
    acc[entry.level] = {
        [Options.extreme]: entry.extreme.toString(),
        [Options.high]: entry.high.toString(),
    };
    return acc;
}, {});

export const statisticValues = {
    [Statistics.stealth]: detectionDisable,
    [Statistics.disable]: detectionDisable,
    [Statistics.hp]: hitPoints,
    [Statistics.hardness]: hardness,
    [Statistics.ac]: armorClass,
    [Statistics.fort]: saves,
    [Statistics.ref]: saves,
    [Statistics.wil]: saves,
    [Statistics.attackBonus]: attackBonus,
    [Statistics.damage]: damage,
    [Statistics.saveDC]: saveDC,
};