export default class NotesView {
    constructor(root, { noteSelect, noteAdd, noteEdit, noteDelete} = {}) {
        this.root = root;
        this.noteSelect = noteSelect;
        this.noteAdd = noteAdd;
        this.noteEdit = noteEdit;
        this.noteDelete = noteDelete;
        this.root.innerHTML = `
            <aside>
                <h3 class="my_notes">My Notes</h3>
                <button class="notes__add" type="button">
                    <i id="add_btn" class="fa-solid fa-plus"></i>
                    <p>Add Notes</p>
                </button>
                <div class="notes_list"></div>
            </aside>
            <article class="notes__preview">
                <input type="text" class="notes__title" placeholder="New Title" spellcheck="false"></input>
                <section>
                    <textarea class="notes__body" placeholder="add text...."  spellcheck="false"></textarea>
                </section>
            </article>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const titleNotes = this.root.querySelector(".notes__title");
        const bodyNotes = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.noteAdd();
        }); 

        if (titleNotes && bodyNotes) {
            [titleNotes, bodyNotes].forEach(inputField => {
                inputField.addEventListener("blur", () => {
                    const updatedTitle = titleNotes.value.trim();
                    const updatedBody = bodyNotes.value.trim();
    
                    this.noteEdit(updatedTitle, updatedBody);
                });
            });
        };

        this.updateNotePreviewVisibility(false);
        
    };

    _createListItem(id, title, body) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes_list_items" data-note-id="${id}">
            
                <h3 class="notes_small_title">${title}</h3>
                <p class="notes_small_body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "...." : ""}
                </p>
            
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesList = this.root.querySelector(".notes_list");

        notesList.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItem(note.id, note.title, note.body);

            notesList.insertAdjacentHTML('beforeend', html);
        }

        notesList.querySelectorAll(".notes_list_items").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.noteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                this.noteDelete(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure to DELETE this note?");

                if (doDelete) {
                    this.noteDelete(noteListItem.dataset.noteId)
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        if (!note.title || !note.body) {
            console.log("Notes is empty");
            return;
        }

        this.root.querySelectorAll(".notes_list_items").forEach(noteListItem => {
            noteListItem.classList.remove("notes_list_items--selected");
            
        })  
        this.root.querySelector(`.notes_list_items[data-note-id="${note.id}"]`).classList.add("notes_list_items--selected"); 
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
};