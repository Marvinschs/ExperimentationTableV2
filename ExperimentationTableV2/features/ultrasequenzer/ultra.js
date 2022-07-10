import Settings from "./../../settings";
import utils from "./../../utils/utils";

const Blocks = Java.type("net.minecraft.init.Blocks");
const Item1 = Java.type("net.minecraft.item.Item");
const Items = Java.type("net.minecraft.init.Items");

let order = new ArrayList();
let hasAdded = false;


register("guiOpened", () => {
    if(!Settings.UltrasequenzerEnable) return;
    hasAdded = false;
    order.clear();
})

register("guiDrawBackground", () => {
    if(!Settings.UltrasequenzerEnable) return;
    if(!utils.inUltrasequencer) return;
    let invSlots = Player.getContainer()?.getItems();
    if(invSlots[49]?.getItem() == Items.field_151113_aN) { //Items.clock;
        hasAdded = false;
    }
    if(!hasAdded && invSlots[49]?.getItem() == Item1.func_150898_a(Blocks.field_150426_aN)) { //getItemfromBlock(Blocks.glowstone);
        if(invSlots[44].getItem() == null) return;
        order.clear();
        let inv = Player.getContainer();
        invSlots.forEach(item => {
            if(item == null) return;
            let index = inv.indexOf(item);
            if(index <= 8 || index >= 45) return;
            if(item?.getItem() == Items.field_151100_aR) { // Items.dye;
                order.add([item.getStackSize(), index]);
                hasAdded = true;
            }
        })
    }
})

register("renderSlot", (slot,gui,event) => {
    if(!Settings.UltrasequenzerEnable) return;
    if(!utils.inUltrasequencer) return;
    let invSlots = Player.getContainer()?.getItems();
    let index = slot.getIndex();
    if(invSlots[49]?.getItem() == Items.field_151113_aN && index > 8 && index < 45 && Settings.UltrasequenzerPanes) { // Items.clock
        event.setCanceled(slot?.getItem()?.getItem() == Item1.func_150898_a(Blocks.field_150397_co)) // Item.getItemFromBlock(Blocks.stained_glass_pane)
    }
    if(!(invSlots[49]?.getItem() == Items.field_151113_aN)) return; // Items.clock
    if(order.isEmpty()) return;
    order.toArray().forEach(e => {
        let i = e[1];
        if(index != i) return;
        GlStateManager.func_179094_E(); // push
        Renderer.translate(0, 0, 500);
        Renderer.drawString(e[0], ((slot.getDisplayX() + 8) - (Renderer.getStringWidth(`${e[0]}`) / 2)),slot.getDisplayY() + 4);
        GlStateManager.func_179121_F(); // pop
    })
})


//TODO: Make good Settings.