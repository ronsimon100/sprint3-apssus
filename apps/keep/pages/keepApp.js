import { noteService } from '../../../apps/keep/services/note.service.js';
export default {
    props: [],
    template: `
    <section class="keep-app">




    
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
                .then(notes => this.notes = notes);
        },

    },
    computed: {

    },
    created() {
        this.loadNotes()
    },
    components: {

    },
    emits: [],
}