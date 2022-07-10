import Settings from "./settings";
import "./utils/utils";
import "./features/chronomatron/sound";
import "./features/chronomatron/render";
import "./features/ultrasequenzer/ultra";
import "./features/Superpairs/super";
import "./features/misc";
import "./features/updateChecker";
import "./utils/notes";

register("command", () => {Settings.openGUI()}).setName("exp", true);