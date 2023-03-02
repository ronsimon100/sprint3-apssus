import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section>
            <ul  class="note-list">
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note" @remove="remove(note.id)"/>
                    <!-- <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->
                    <button hidden @click="showDetails(note.id)">Details</button>
                    
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        }
        // ,
        // showDetails(noteId){
        //     this.$emit('show-details', noteId)
        // },
    },
    components: {
        NotePreview,
    }
}