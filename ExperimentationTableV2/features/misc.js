import utils from "../utils/utils";
import Settings from "../settings";

const Blocks = Java.type("net.minecraft.init.Blocks");
const Item1 = Java.type("net.minecraft.item.Item");

register("itemTooltip", (_, item, event) => {
    if(!utils.inExperiment) return;
    if(!Settings.hideGlassPaneTooltip) return;
    if(item.getItem() == Item1.func_150898_a(Blocks.field_150397_co)) return cancel(event);// Item.getItemFromBlock(Blocks.stained_glass_pane)
})

register("renderSlotHighlight", (x,y,slot,gui,event) => {
    if(!utils.inExperiment) return;
    if(!Settings.hideGlassPaneSlotRender) return;
    let slotItem = slot?.func_75211_c()?.func_77973_b(); // getStack().getItem()
    if(slotItem == Item1.func_150898_a(Blocks.field_150397_co)) return cancel(event); // Item.getItemFromBlock(Blocks.stained_glass_pane)
});