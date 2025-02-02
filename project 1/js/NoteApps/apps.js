import NotesView from './noteView.js';
import StorageAPI from './storageAPI.js';

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    };

    _refreshNotes() {
        const notes = StorageAPI.getAllNotes();
        
        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    };

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            noteSelect : noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            noteAdd : () => {
                const newNote = {
                    title : "New Note",
                    body : "Take Note.."
                }
                StorageAPI.saveNotes(newNote);
                this._refreshNotes();
            },
            noteEdit : (title, body) => {
                StorageAPI.saveNotes({
                    id : this.activeNote.id,
                    title : title,
                    body : body
                });
                this._refreshNotes();
                console.log(title, body);
            },
            noteDelete : noteId => {
                StorageAPI.deleteNotes(noteId);
                this._refreshNotes();
            }
        };
    };
};