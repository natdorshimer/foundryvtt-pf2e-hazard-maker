import {HazardMaker} from "./HazardMaker"
Hooks.on('init', async function () {
    await game["settings"].register("foundryvtt-pf2e-hazard-maker", "roadmaps", {
        scope: 'world',
        config: false,
        type: Object,
        default: {}
    });

    await game["settings"].register("pf2e-hazard-maker", "abbreviateName", {
        name:    "Abbreviate Hazard Maker",
        hint:    "Turn this on if you prefer to see “HM” instead of the full title “Hazard Maker” in the hazard sheet.",
        scope:   "world",
        config:  true,
        type:    Boolean,
        default: false
    });
})

function getHazardManualLabel () {
    return game["settings"].get(
        "pf2e-hazard-maker",
        "abbreviateName"
    ) ? "HM" : "Hazard Maker";
}

Hooks.on("renderActorSheet", async function (sheet, html) {
    let actor = sheet.object
    if (actor?.type !== "npc") {
        return;
    }
    if(!actor.canUserModify(game["user"], "update")) {
        return;
    }
    let element = html.find(".window-header .window-title");
    let label = getHazardManualLabel()
    let button = $(`<a class="popout" style><i style="padding: 0 4px;" class="fas fa-book"></i>${label}</a>`);
    button.on("click", () => {
        new HazardMaker(actor).render(true)
    })
    element.after(button);
})

Hooks.on("renderActorDirectory", function() {
    let footer = $("#actors .directory-footer.action-buttons");
    if (footer.find("button:contains('Hazard Maker')").length === 0) {
        let hazardButton = $(`<button><i class="fas fa-book"></i>Hazard Maker</button>`);
        footer.append(hazardButton);

        hazardButton.on("click", function() {
            let hazardData = {
                name: "Hazard",
                type: "hazard",
            };
            Actor.create(hazardData).then(actor => {
                if (actor) {
                    new HazardMaker(actor).render(true);
                }
            });
        });
    }
});