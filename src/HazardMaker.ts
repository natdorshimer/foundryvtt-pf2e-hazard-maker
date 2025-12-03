import {actorFields, DefaultCreatureStatistics, Levels, Statistics, Options} from "./Keys";
import {statisticValues} from "./Values";
import {BaseActor} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs";


function createAttackSaveDescription(dc: number) {
    const check = (saveType) => `@Check[type:${saveType}|dc:${dc}]`
    return `
        <p>
            ${check('fortitude')}
            </br>
            ${check('reflex')}
            </br>
            ${check('will')}
        </p>
    `
}

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
            height: 675,
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
        const option = formData?.[Statistics.hp] ?? Options.moderate
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
        const option = formData?.[Statistics.stealth] ?? Options.moderate
        const dc = parseInt(statisticValues[Statistics.stealth][this.level][option])
        const modifier = dc - 10
        return {
            "system.attributes.stealth.value": modifier,
            "system.attributes.stealth.dc": dc
        }
    }

    applyDisable(formData) {
        const option = formData?.[Statistics.disable] ?? Options.moderate
        const dc = parseInt(statisticValues[Statistics.disable][this.level][option])
        const disableText = game["i18n"].format?.("PF2EHAZARDMAKER.DisableText", {dc}) ?? `Disable DC ${dc}`
        return {"system.details.disable": disableText}
    }

    private getSaveDC(formData) {
        const option = formData?.[Statistics.saveDC] ?? Options.moderate
        const dcMap = statisticValues[Statistics.saveDC][this.level] || {}
        const selectedDc = dcMap[option] ?? dcMap[Options.moderate] ?? dcMap[Options.high]
        if (!selectedDc) {
            return undefined
        }
        return parseInt(selectedDc)
    }

    applySaveDC(formData) {
        const option = formData?.[Statistics.saveDC] ?? Options.moderate
        const dcMap = statisticValues[Statistics.saveDC][this.level] || {}
        const selectedDc = dcMap[option] ?? dcMap[Options.moderate] ?? dcMap[Options.high]
        if (!selectedDc) {
            return {}
        }
        const dc = parseInt(selectedDc)
        return {
            "system.details.description": createAttackSaveDescription(dc),
        }
    }

    async applyHazardAttack(formData?: Record<string, any>) {
        const simpleOrComplex = this.complexity === Options.complex ? Options.complex : Options.simple
        const attackMap = statisticValues[Statistics.attackBonus][this.level]
        const damageMap = statisticValues[Statistics.damage][this.level]
        if (!attackMap || !damageMap) {
            return
        }
        const attackBonus = parseInt(attackMap[simpleOrComplex])
        const damage = damageMap[simpleOrComplex]
        if (Number.isNaN(attackBonus) || !damage) {
            return
        }

        const existing = (this.actor.items ?? []).filter((item: any) =>
            item.getFlag("pf2e-hazard-maker", "generatedAttack"))
        for (const item of existing) {
            await item.delete()
        }

        const saveDC = this.getSaveDC(formData);
        const description = saveDC ? createAttackSaveDescription(saveDC) : undefined;

        const strike = {
            name: game["i18n"].localize?.("PF2EHAZARDMAKER.attackName") ?? "Hazard Attack",
            type: "melee",
            flags: {"pf2e-hazard-maker": {generatedAttack: true}},
            description,
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
            "name": this.actor.name,
            "complexity": this.complexity
        }
    }

}