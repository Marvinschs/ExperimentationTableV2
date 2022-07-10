import Settings from "../settings";
import request from "requestV2/index"

let checked = false;

register("step", () => {
    if(checked || !Settings.updateChecker) return;
    checked = true;
    request("https://raw.githubusercontent.com/Cakend123/ExperimentationTableV2/main/ExperimentationTableV2/metadata.json").then(data => {
        data = JSON.parse(data.replace(new RegExp("    ", "g"), ""));

        let metadata = JSON.parse(FileLib.read("ExperimentationTableV2", "metadata.json"));

        if(metadata.version != data.version) {
            new Message(`&9&m${ChatLib.getChatBreak()}\n`,
            new TextComponent(`[&6EXP&f] &aA new Version of ExperimentationTableV2 is available (&c${data.version}&a) Click this Message to go to the GitHub page!`).setClick(
                "open_url",
                "https://github.com/Cakend123/ExperimentationTableV2"
            ).setHover(
                "show_text",
                "&aClick to open\n&bhttps://github.com/Cakend123/ExperimentationTableV2"
            ),
            `&9&m${ChatLib.getChatBreak()}`).chat()
        }
    }).catch(e => {
        ChatLib.chat(`[&6EXP&f] &cError whilst checking for update: ${e}`)
    })
})

