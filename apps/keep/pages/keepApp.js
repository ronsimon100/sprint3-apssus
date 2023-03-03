import { noteService } from '../../../apps/keep/services/note.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import NoteList from '../../keep/cmps/NoteList.js';
import AddKeep from '../cmps/AddKeep.js';

export default {
    props: [],
    template: `
            <AddKeep/> 
            <NoteList :notes="notes" @remove="removeNote" />
    `,

    data() {
        return {
            notes: null,
            selectedNote: null,
            filterBy: null
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
        }

    },
    computed: {

    },
    created() {
        this.loadNotes()
        this.subUpdateNote = eventBus.on('updateNote', this.updateNote)

    }, watch: {
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
    emits: [],
}