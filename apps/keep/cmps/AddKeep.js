
import { noteService } from '../../../apps/keep/services/note.service.js';

export default {
    props: [],
    template: `
    <input type="text"   :placeholder="placeholder"   v-model="keep.info.txt" /> 
    <button @click="saveKeep">save your keep</button>
  
    
    
    
    
    `,

    data() {
        return {
            keep: {
                info: { txt: null },
                type: 'NoteTxt'
            },
            placeholder: 'Enter your keep text'
        }
    },
    methods: {
        // saveKeep() {
        //     if (this.keep.info.txt !== null) {
        //         // console.log('this.keep.info.txt :>> ', this.keep.info.txt);
        //         noteService.save(this.keep)
        //     }
        //     this.keep.info.txt = null
        //     // this.keep.info = null
        // }
        saveKeep() {
            if (this.keep.info.txt !== null) {
                let newKeep = noteService.getEmptyNote()
                newKeep.type = this.keep.type
                newKeep.info.txt = this.keep.info.txt
                console.log('newKeep :>> ', newKeep);
                noteService.save(newKeep)
                this.keep.info.txt = null

            }
        }
    },
    computed: {

    },
    created() {

    },
    components: {

    },
    emits: [],
}