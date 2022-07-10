import Settings from "./settings";
import "./utils/utils";
import "./features/chronomatron/sound";
import "./features/chronomatron/render";
import "./features/ultrasequenzer/ultra";
import "./features/Superpairs/super";
import "./utils/notes";
import "./features/misc";

register("command", () => {Settings.openGUI()}).setName("exp", true);