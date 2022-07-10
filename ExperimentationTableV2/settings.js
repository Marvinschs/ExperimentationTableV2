import { @Vigilant, @SliderProperty, @SwitchProperty, @NumberProperty, @TextProperty, @ButtonProperty, @ColorProperty, @CheckboxProperty, @SelectorProperty , Color } from "Vigilance";

@Vigilant("ExperimentationTableV2", "ExperimentationTableV2", {
    getCategoryComparator: () => (a, b) => {
    const categories = ["Chronomatron", "Ultrasequenzer", "Superpairs", "Misc"];

    return categories.indexOf(a.name) - categories.indexOf(b.name);
},})
class Settings {
    @SwitchProperty({
        name: "Toggle Chronomatron Solver",
        description: "Toggle Solver for the Chronomatron experiment",
        category: "Chronomatron",
    })
    chronomatronEnable = true;
    
    @SelectorProperty({
        name: "Detection type",
        description: "Currently the module supports two different ways to identify the right order of colors.\nPick the one you like but note that the Sound one is risky since it is Possible to break uppon lag",
        category: "Chronomatron",
        options: [
            "Gui Render",
            "Sound Play"
        ]
    })
    ChronomatronType = 0;

    @ColorProperty({
        name: "Note Color",
        description: "Current Note to Click",
        category: "Chronomatron",
    })
    chronomatron1stColor = Color.RED;

    @SwitchProperty({
        name: "Toggle Ultrasequenzer Solver",
        description: "Toggle Solver for the Ultrasequenzer experiment",
        category: "Ultrasequenzer",
    })
    UltrasequenzerEnable = true;

    @SwitchProperty({
        name: "Hide Panes",
        description: "Hides the glass panes while the numbers are beeing Rendered",
        category: "Ultrasequenzer"
    })
    UltrasequenzerPanes = true;

    @SwitchProperty({
        name: "Toggle Superpairs Solver",
        description: "Toggle Solver for Superpairs",
        category: "Superpairs",
    })
    SuperpairsEnable = true;

    @CheckboxProperty({
        name: "Update Checker",
        description: "Checks for updates on the gitHub since ct Website is sometimes slow with verifying",
        category: "Misc"
    })
    updateChecker = true;

    @CheckboxProperty({
        name: "Hide 'Glass Pane' tooltip",
        description: "Hides the tooltip of the glass panes when hovering while inside ANY experiment",
        category: "Misc",
    })
    hideGlassPaneTooltip = true;

    @CheckboxProperty({
        name: "Hide 'Glass Pane' Slot Highlight",
        description: "Hides the slot highlighting when you hover over a glass pane while inside ANY experiment",
        category: "Misc",
    })
    hideGlassPaneSlotRender = true;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Superpairs", "This Solver will show the Items you turn even if Skyblock puts back glass blocks and they keep their name and Lore (kindof like SBE's although no code was taken from SBE)")
    }
}

export default new Settings();