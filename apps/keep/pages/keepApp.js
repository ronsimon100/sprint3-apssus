import { noteService } from '../../../apps/keep/services/note.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import NoteList from '../../keep/cmps/NoteList.js';
import AddKeep from '../cmps/AddKeep.js';

export default {
    props: [],
    template: `
            <AddKeep @keepInput="keepInput"/> 
            <NoteList :notes="getPinned" @remove="removeNote" />
            <NoteList :notes="getUnPinned" @remove="removeNote" />
    `,

    data() {
        return {
            notes: null,
            selectedNote: null,
            filterBy: { searchTxt: null }
        }
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                    // console.log(' notes :>> ', notes);
                })
        },
        removeNote(noteId) {
            console.log(noteId);
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'note removed', type: 'success' })
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },
        updateNote(note) {
            console.log(note)
            noteService.save(note).then(this.loadNotes)
        },
        duplicateNote(note) {
            console.log('note :>> ', note);
            const copy = { ...note }
            copy.id = ''
            noteService.save(copy).then(copy => {
                this.notes.push(copy)
            });
        }, keepInput(input) {
            this.filterBy.searchTxt = input
            console.log('this.filterBy.searchTxt :>> ', this.filterBy.searchTxt);


        }



    },

    created() {
        this.loadNotes()
        this.subUpdateNote = eventBus.on('updateNote', this.updateNote)
        this.subToDuplicate = eventBus.on('duplicate', this.duplicateNote)
    },
    computed: {
        getPinned() {
            let pinnedNotes
            if (this.filterBy.searchTxt) {
                pinnedNotes = this.notes.filter(note => note.isPinned && note.info.txt.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()))
            } else pinnedNotes = this.notes.filter(note => note.isPinned)
            // const titleRegex = new RegExp(this.filterBy.title, 'i')
            // const typeRegex = new RegExp(this.filterBy.type, 'i')
            // console.log('pinnedNotes :>> ', pinnedNotes);
            if (pinnedNotes) return pinnedNotes
        }, getUnPinned() {
            let unpinnedNotes
            if (this.filterBy.searchTxt) {

                unpinnedNotes = this.notes.filter(note => !note.isPinned && note.info.txt.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()))
            }
            else unpinnedNotes = this.notes.filter(note => !note.isPinned)
            // const titleRegex = new RegExp(this.filterBy.search, 'i')
            // const typeRegex = new RegExp(this.filterBy.type, 'i')
            if (unpinnedNotes) return unpinnedNotes
        },
    },
    watch: {
        notes: function (newValue, oldValue) {
            this.loadNotes();
        }
    },
    unmounted() {
        this.subUpdateNote()
    },
    components: {
        NoteList,
        AddKeep,

    },
    emits: ['remove'],
}