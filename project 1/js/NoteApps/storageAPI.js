export default class StorageAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("tuxtask-notes") || "[]");

        return notes
    }
    static saveNotes(noteToSave) {
        const notes = StorageAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id)
        
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            
        } else {
            noteToSave.id = Math.floor(Math.random() * 10000);
            notes.push(noteToSave);
        }
        
        localStorage.setItem("tuxtask-notes", JSON.stringify(notes));

    }
    static deleteNotes(id) {
        const notes = StorageAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem('tuxtask-notes', JSON.stringify(newNotes))
    }

    
}