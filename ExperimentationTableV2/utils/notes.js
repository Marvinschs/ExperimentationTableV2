import {
    metaNames,
    metaPitches,
    metaSlots,
} from "./notesConstants";


class Note {
    constructor(name,pitch,slots){
        this.name = name;
        this.pitch = pitch;
        this.slots = slots;
    };
};

const createNotesMeta = () => {
    let list = new ArrayList();
    metaNames.forEach(name => {
        let i = metaNames.indexOf(name);
        let n = new Note(name, metaPitches[i], metaSlots[i]);
        list.add(n);
    })
    return list;
};

const metaNotes = createNotesMeta();

export {
    metaNotes
}