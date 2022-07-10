import Settings from "../../settings";
import utils from "../../utils/utils";
import {
    metaPitches
} from "../../utils/notesConstants";
import {
    metaNotes
} from "../../utils/notes";

let sequence = new ArrayList();
let render = false;
let clicks = 0;

register("tick", () => {
    if(Settings.ChronomatronType != 1) return;
    if(!utils.inExperiment) return;
    if(!utils.inChronomatron) return;
    if(ChatLib.removeFormatting(Player.getContainer()?.getStackInSlot(49)?.getName()).includes("Timer")) {
        render = true;
    } else {
        render = false;
    }
})

register("guiClosed", () => {
    if(Settings.ChronomatronType != 1) return;
    reset();
})

register("soundPlay", () => {
    if(Settings.ChronomatronType != 1) return;
    if(!utils.inExperiment) return;
    if(!utils.inChronomatron) return;
    reset();
}).setCriteria("random.levelup")


register("soundPlay", (_,__,___,pitch) => {
    if(Settings.ChronomatronType != 1) return;
    if(!utils.inExperiment) return;
    if(!utils.inChronomatron) return;
    const round = parseInt(ChatLib.removeFormatting(Player.getContainer()?.getStackInSlot(4)?.getName())?.split("Round: ")[1]);
    let note = metaNotes.get(metaPitches.findIndex(iN => {if(iN == pitch) return true}));
    if(sequence.size() >= round) return;
    sequence.add(note);
}).setCriteria("note.pling")

register("renderSlot", (slot) => {
    if(Settings.ChronomatronType != 1) return;
    if(!render) return;
    let index = slot.getIndex();
    if(getSlotsRender(index)) return;
    GlStateManager.func_179094_E(); // push
    Renderer.translate(0, 0, 500);
    let color = Renderer.color(Settings.chronomatron1stColor.getRed(), Settings.chronomatron1stColor.getGreen(), Settings.chronomatron1stColor.getBlue(), Settings.chronomatron1stColor.getAlpha());
    Renderer.drawRect(color, slot.getDisplayX(), slot.getDisplayY(), 16,16);
    GlStateManager.func_179121_F(); // pop
})

register("guiMouseClick", (_,__,button,gui) => {
    if(Settings.ChronomatronType != 1) return;
    if(!utils.inExperiment) return;
    if(!utils.inChronomatron) return;
    if(ChatLib.removeFormatting(Player.getContainer()?.getStackInSlot(49)?.getName()).includes("Remember")) return;
    let slot = gui.getSlotUnderMouse();
    if(!slot) return;
    let slotIndex = parseInt(slot.slotIndex);
    let slots = getSlots();
    if(!slots.includes(slotIndex)) return;
    clicks += 1;
})

const getSlotsRender = (index) => {
    if(sequence.isEmpty()) return true;
    if(clicks == sequence.size()) return true;
    let slots = getSlots();
    if(slots.includes(index)) return false;
    return true;
}

const getSlots = () => {
    let obj = sequence?.get(clicks);
    return obj.slots;
}

function reset() {
    sequence.clear();
    clicks = 0;
    render = false;
}