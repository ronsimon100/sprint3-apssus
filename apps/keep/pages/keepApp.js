import { noteService } from '../../../apps/keep/services/note.service.js';
import NoteList from '../../keep/cmps/NoteList.js';
export default {
    props: [],
    template: `

<NoteList :notes="notes" @remove="removeNote" />


    
</section>
    
    
    
    
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
                    console.log(' notes :>> ', notes);
                })
        },
        removeNote(noteId) {
            console.log(noteId);
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'note removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },

    },
    computed: {

    },
    created() {
        this.loadNotes()
        // noteService.query()
        // .then(notes => {
        //     this.notes = notes
        //     console.log(' notes :>> ', notes);
        // })
    },
    components: {
        NoteList,
    },
    emits: [],
}