import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import ToolCmp from '../cmps/ToolCmp.js';
export default {
    props: ['note'],
    emits:['remove'],
    template: `
        <article class="note-preview" :style="note.style">
         
        <!-- pass the note in props -->
        <div>

            <component  :note="note" :is ="note.type" @remove="remove"/>
            <ToolCmp :note="note" />
        </div>
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
        ToolCmp,
        NoteImg
    }
}