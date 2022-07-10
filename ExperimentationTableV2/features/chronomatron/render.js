import Settings from "../../settings";
import utils from "../../utils/utils";

const Blocks = Java.type("net.minecraft.init.Blocks");
const Item1 = Java.type("net.minecraft.item.Item");
const Items = Java.type("net.minecraft.init.Items");

let order = new ArrayList();
let clicks = 0;
let hasAdded = false;
let lastAdded = 0;


register("guiOpened", () => {
    if(Settings.ChronomatronType != 0) return;
    hasAdded = false;
    order.clear();
    lastAdded = 0;
})

register("guiDrawBackground", () => {
    if(Settings.ChronomatronType != 0) return;
    if(!utils.inChronomatron) return;
    let invSlots = Player.getContainer().getItems();
    if (invSlots[49]?.getItem() == Item1.func_150898_a(Blocks.field_150426_aN) && invSlots[lastAdded]?.isEnchanted() == false) { //getItemfromBlock(Blocks.glowstone);
        hasAdded = false;
    }
    if (!hasAdded && invSlots[49]?.getItem() == Items.field_151113_aN) { //Items.clock;
        let item = invSlots.find(item => item?.isEnchanted() == true);
        if(!item) return;
        let slot = invSlots.findIndex(item2 => item == item2);
        let name = item.getName();
        order.add(name);
        lastAdded = slot;
        hasAdded = true;
        clicks = 0;
    }
})

register("renderSlot", (slot,gui,event) => {
    if(Settings.ChronomatronType != 0) return;
    if(!utils.inChronomatron) return;
    let index = slot.getIndex();
    if(getSlotsRender(index)) return;
        GlStateManager.func_179094_E(); // push
        Renderer.translate(0, 0, 500);
        let color = Renderer.color(Settings.chronomatron1stColor.getRed(), Settings.chronomatron1stColor.getGreen(), Settings.chronomatron1stColor.getBlue(), Settings.chronomatron1stColor.getAlpha());
        Renderer.drawRect(color, slot.getDisplayX(), slot.getDisplayY(), 16,16);
        GlStateManager.func_179121_F(); // pop
})

register("guiMouseClick", (_,__,___,gui) => {
    if(Settings.ChronomatronType != 0) return;
    if(!utils.inChronomatron) return;
    if(ChatLib.removeFormatting(Player.getContainer()?.getStackInSlot(49)?.getName()).includes("Remember")) return;
    let slot = gui.getSlotUnderMouse();
    if(!slot) return;
    if(getSlotsClick(parseInt(slot.slotIndex))) return;
    clicks += 1;
})

const getSlotsRender = (index) => {
    if(order.isEmpty()) return true;
    if(clicks == order.size()) return true;
    let correctName = order.get(clicks);
    let name = Player.getContainer()?.getStackInSlot(index)?.getName();
    if(correctName == name) return false;
    return true;
}

const getSlotsClick = (slot) => {
    if(order.isEmpty()) return true;
    if(clicks == order.size()) return true;
    let correctName = order.get(clicks);
    let name = Player.getContainer()?.getStackInSlot(slot)?.getName();
    if(correctName == name) return false;
    return true;
}