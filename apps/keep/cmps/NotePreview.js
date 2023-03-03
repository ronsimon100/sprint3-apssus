import NoteTxt from "./NoteTxt.js"
import ToolCmp from '../cmps/ToolCmp.js';
export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
         
        <!-- pass the note in props -->
        <component  :note="note" :is ="note.type" @remove="remove(note.id)"/>
        <ToolCmp :note="note" />
        <!-- //tools component -->
    </article>



        <!-- <button @click="remove(note.id)">x</button> -->
     
    `, methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        }
        // ,
        // showDetails(noteId){
        //     this.$emit('show-details', noteId)
        // },
    },
    //note type sould be NoteTxt
    components: {
        NoteTxt,
        ToolCmp
    }
}