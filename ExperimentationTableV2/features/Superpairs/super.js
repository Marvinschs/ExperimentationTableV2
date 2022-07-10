import Settings from "../../settings";
import utils from "../../utils/utils";

const ItemStack = Java.type("net.minecraft.item.ItemStack");
const Blocks = Java.type("net.minecraft.init.Blocks");
const Item1 = Java.type("net.minecraft.item.Item");
const Items = Java.type("net.minecraft.init.Items");

const itemsToIgnore = [
    Items.field_151113_aN, //Items.clock
    Items.field_151045_i, //Items.diamond
    Items.field_151008_G, //Items.feather
    Item1.func_150898_a(Blocks.field_150342_X), //Item.getItemFromBlock(Blocks.bookshelf)
    Item1.func_150898_a(Blocks.field_150397_co), //Item.getItemFromBlock(Blocks.stained_glass_pane)
    Item1.func_150898_a(Blocks.field_150399_cn) //Item.getItemFromBlock(Blocks.stained_glass)
]

let superInv = new ArrayList();
let slotsToIgnore = new ArrayList();

class slotItem{
    constructor(slot,item,name,lore,damage){
        this.slot = slot;
        this.item = item;
        this.name = name;
        this.lore = lore;
        this.damage = damage;
    }
}

register("guiOpened", () => {
    if(!Settings.SuperpairsEnable) return;
    superInv.clear();
    slotsToIgnore.clear();
})

register("guiDrawBackground", () => {
    if(!Settings.SuperpairsEnable) return;
    if(!utils.inSuperpairs) return;
    let container = Player?.getContainer();
    let invSlots = Player.getContainer()?.getItems();
    invSlots?.forEach(item => {
        const Item = item?.getItem();
        if(item == null) return;
        let slot = container.indexOf(item);
        if(slot >= 54 || slotsToIgnore.contains(slot)) return;
        if(itemsToIgnore.includes(Item)) return;
        if(superInv.isEmpty()) {
            superInv.add(new slotItem(slot, item, item.getName(), item.getLore(), item.getDamage()));
            slotsToIgnore.add(slot);
            return;
        }
        if(superInv.contains(new slotItem(slot, item, item.getName(), item.getLore(), item.getDamage()))) return;
        superInv.add(new slotItem(slot, item, item.getName(), item.getLore(), item.getDamage()));
        slotsToIgnore.add(slot);
    })
})


register("renderItemIntoGui", () => {
    if(!Settings.SuperpairsEnable) return;
    if(!utils.inSuperpairs) return;
    if(superInv.isEmpty()) return;
    superInv?.toArray().forEach(item => {
        if(item == null) return;
        Player.getPlayer().field_71070_bA?.func_75141_a(item.slot, new ItemStack(item.item.getItem())); //Player.getPlayer().openContainer.putStackInSlot(slot, ItemStack);
        let Item = Player.getContainer().getStackInSlot(item.slot);
        Item.setDamage(item.damage);
        Item.setName(item.name);
        Item.setLore(newLore(item.lore))
    })
})

const newLore = (oldLore) => {
    let newLore = new ArrayList();
    if(oldLore == null) return;
    oldLore.forEach(line => {
        newLore.add(line);
    })
    newLore.remove(0)
    let finalLore = [];
    newLore.toArray().forEach(i => {
        finalLore.push(i);
    })
    return finalLore;
}