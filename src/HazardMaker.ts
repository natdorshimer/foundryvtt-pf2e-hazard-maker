import {actorFields, DefaultCreatureStatistics, Levels, Statistics, Options, RoadMaps} from "./Keys";
import {statisticValues} from "./Values";
import {BaseActor} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs";


export class HazardMaker extends FormApplication {
    data = DefaultCreatureStatistics
    actor: BaseActor
    level = "-1"
    complexity = Options.simple

    constructor(object: BaseActor, options: Record<string, unknown> = {}) {
        super(object, options);
        this.actor = object;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/pf2e-hazard-maker/dist/forms/hazardMakerForm.html`,
            id: "hazardMakerForm",
            title: "Hazard Maker Form",
            height: 833,
            width: 400
        });
    }

    applyName(formData) {
        let name = formData[Statistics.name] ? formData[Statistics.name] : this.actor.name
        return {"name": name}
    }

    applyLevel() {
        return {"system.details.level.value": parseInt(this.level)}
    }

    applyHitPoints(formData) {
        const option = formData[Statistics.hp]
        const hitPoints = parseInt(statisticValues[Statistics.hp][this.level][option])
        const brokenThreshold = Math.floor(hitPoints / 2)
        return {
            "system.attributes.hp.max": hitPoints,
            "system.attributes.hp.value": hitPoints,
            "system.attributes.hp.brokenThreshold": brokenThreshold
        }
    }

    applyComplexity(formData) {
        this.complexity = formData[Statistics.complexity] ?? Options.simple
        const isComplex = this.complexity === Options.complex
        return {"system.details.isComplex": isComplex}
    }

    applyStealth(formData) {
        const option = formData[Statistics.stealth]
        if (!option) {
            return {}
        }
        const dc = parseInt(statisticValues[Statistics.stealth][this.level][option])
        const modifier = dc - 10
        return {
            "system.attributes.stealth.value": modifier,
            "system.attributes.stealth.dc": dc
        }
    }

    applyDisable(formData) {
        const option = formData[Statistics.disable]
        if (!option) {
            return {}
        }
        const dc = parseInt(statisticValues[Statistics.disable][this.level][option])
        const disableText = game["i18n"].format?.("PF2EHAZARDMAKER.DisableText", {dc}) ?? `Disable DC ${dc}`
        return {"system.details.disable": disableText}
    }

    applySaveDC(formData) {
        const option = formData[Statistics.saveDC]
        if (!option) {
            return {}
        }
        const dc = parseInt(statisticValues[Statistics.saveDC][this.level][option])
        return {
            "system.attributes.classDC.value": dc,
            "system.attributes.classDC.dc": dc,
            "system.attributes.classDC.mod": dc - 10
        }
    }

    async applyHazardAttack(formData) {
        const attackOption = formData[Statistics.attackBonus]
        const damageOption = formData[Statistics.damage]
        if (!attackOption || attackOption === Options.none || !damageOption || damageOption === Options.none) {
            return
        }
        const attackBonus = parseInt(statisticValues[Statistics.attackBonus][this.level][attackOption])
        const damage = statisticValues[Statistics.damage][this.level][damageOption]
        if (Number.isNaN(attackBonus) || !damage) {
            return
        }

        const existing = (this.actor.items ?? []).filter((item: any) =>
            item.getFlag("pf2e-hazard-maker", "generatedAttack"))
        for (const item of existing) {
            await item.delete()
        }

        const strike = {
            name: game["i18n"].localize?.("PF2EHAZARDMAKER.attackName") ?? "Hazard Attack",
            type: "melee",
            flags: {"pf2e-hazard-maker": {generatedAttack: true}},
            system: {
                damageRolls: {
                    hazardDamageID: {
                        damage,
                        damageType: "bludgeoning",
                        category: null
                    },
                },
                bonus: {
                    value: attackBonus,
                },
            },
        };
        await Item.create(strike, {parent: this.actor})
    }

    protected async _updateObject(event: Event, formData?: Record<string, any>) {
        if(!formData) {
            return
        }
        const updateData = {}
        this.level = formData[Statistics.level]

        for (const key of Object.keys(formData)) {
            if(actorFields[key]) {
                const actorField = actorFields[key]
                const option = formData[key]
                const rawValue = statisticValues[key][this.level][option]
                updateData[actorField] = parseInt(rawValue)
            }
        }

        Object.assign(updateData, this.applyName(formData))
        Object.assign(updateData, this.applyLevel())
        Object.assign(updateData, this.applyComplexity(formData))
        Object.assign(updateData, this.applyStealth(formData))
        Object.assign(updateData, this.applyDisable(formData))
        Object.assign(updateData, this.applyHitPoints(formData))
        Object.assign(updateData, this.applySaveDC(formData))

        await this.actor.update(updateData);
        await this.applyHazardAttack(formData)
    }

    // @ts-ignore
    getData() {
        Handlebars.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
        return {
            "CreatureStatistics": JSON.parse(JSON.stringify(this.data)),
            "Levels": Levels,
            "RoadMaps": RoadMaps,
            "name": this.actor.name,
            "complexity": this.complexity
        }
    }

}