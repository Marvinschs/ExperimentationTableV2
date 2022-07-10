import Settings from "./../settings";

class utils {
    inExperiment = false;
    inSuperpairs = false;
    inChronomatron = false;
    inUltrasequencer = false;
    currInv = null;
    constructor() {
        register("guiClosed", () => {
            this.#resetExperiment();
        })
        register("tick", () => {
            this.currInv = this.#inventory();
            if(this.currInv == undefined) return;
            if(this.currInv == "null") return;
            if(this.currInv.includes("Ultrasequencer (")) {
                if(!Settings.UltrasequenzerEnable) return;
                this.inExperiment = true;
                this.inUltrasequencer = true;
                return;
            };
            if(this.currInv.includes("Chronomatron (")){
                if(!Settings.chronomatronEnable) return;
                this.inExperiment = true;
                this.inChronomatron = true;
                return;
            };
            if(this.currInv.includes("Superpairs (")){
                if(!Settings.SuperpairsEnable) return;
                this.inExperiment = true;
                this.inSuperpairs = true;
                return;
            };
            if(this.currInv.includes("Experiment Over")){
                this.#resetExperiment();
                return;
            };
        });
    };

    #inventory = () => {
        return Player.getPlayer()?.field_71070_bA?.func_85151_d()?.func_70005_c_(); // openContainer.getLowerChestInventory().getName()
    };

    customDrawString = (text,x,y) => {
        if(text == null) text = "null";
        Renderer.drawString(text,x,y)
    };

    #resetExperiment = () => {
        this.inExperiment = false;
        this.inChronomatron = false;
        this.inUltrasequencer = false;
        this.inSuperpairs = false;
        this.currInv = null;
    }
};

export default new utils;