
import { noteService } from '../../../apps/keep/services/note.service.js';
import { eventBus } from '../../../services/event-bus.service.js'


// export default {
//     props: [],
//     template: `
//     <input type="text"   :placeholder="placeholder"   v-model="keep.info.txt" /> 
//     <button @click="saveKeep">save your keep</button>
//     <button @click="chooseFile" @change="handleFileChange">choose file</button>
//     <input type="file" ref="fileInput" @change="handleFileChange" style="display:none"/>
// <img :src="imageUrl" v-if="imageUrl" />





//     `,

//     data() {
//         return {
//             keep: {
//                 info: { txt: null },
//                 type: 'NoteTxt'
//             },
//             placeholder: 'Enter your keep text',
//             selectedFile: null,
//             imageSrc: null,
//         }
//     },
//     methods: {
//         saveKeep() {
//             if (this.keep.info.txt !== null) {
//                 // console.log('this.keep.info.txt :>> ', this.keep.info.txt);
//                 noteService.save(this.keep)
//             }
//             this.keep.info.txt = null
//             // this.keep.info = null
//         },




//         // saveKeep() {
//         //     if (this.keep.info.txt !== null) {
//         //         let newKeep = noteService.getEmptyNote()
//         //         newKeep.type = this.keep.type
//         //         newKeep.info.txt = this.keep.info.txt
//         //         console.log('newKeep :>> ', newKeep);
//         //         noteService.save(newKeep)
//         //         this.keep.info.txt = null

//         //     }
//         // }, 

//         saveKeep() {
//             if (this.keep.info.txt !== null) {
//                 let newKeep = noteService.getEmptyNote();
//                 newKeep.type = this.keep.type;
//                 newKeep.info.txt = this.keep.info.txt;
//                 if (this.selectedFile) {
//                     newKeep.type = "noteImg";
//                     newKeep.info.url = this.imageUrl;
//                 }
//                 noteService.save(newKeep);
//                 this.keep.info.txt = null;
//                 this.selectedFile = null;
//             }
//         },



//         chooseFile() {
//             this.$refs.fileInput.click()
//         },
//         handleFileChange(event) {
//             const file = event.target.files[0]
//             this.imageSrc = URL.createObjectURL(file)
//         }  // this.selectedFile = event.target.files[0]
//         // let newKeep = noteService.getEmptyNote()
//         // this.keep.type = 'noteImg'
//         // newKeep.type = this.keep.type
//         // newKeep.info.url = this.keep.info.url = this.imageUrl
//         // noteService.save(newKeep)
//     },
//     computed: {
//         imageUrl() {
//             if (this.selectedFile) {
//                 return URL.createObjectURL(this.selectedFile)
//             } else null
//         }
//     },
//     created() {

//     },
//     components: {

//     },
//     emits: [],
// }



// ---------------------------------------------------------------------
export default {
    props: [],
    template: `
    
    <!-- <div class="addKeep" >
<form @submit.prevent="saveNote" class="addForm">
  <input type="text" v-model="noteTxt" placeholder="Add Note..." />
  <input type="file" ref="fileInput" @change="handleFileSelect" />
  <button type="submit">Add</button>
</form>
</div> -->
 

<div class="addKeep">
  <form @submit.prevent="saveNote">
    <input type="text" v-model="noteTxt" placeholder="Add Note..." />
    <div class="file-input-container">
      <label for="file-input">Choose File</label>
      <input type="file" id="file-input" ref="fileInput" @change="handleFileSelect" />
    </div>
    <input ref="keepInput" type="search" placeholder="search" class="keepSearch" @input="keepInput"/>
    <button type="submit">Add</button>
  </form>
</div>
`,

    data() {
        return {
            noteTxt: '',
            imageSrc: ''
        };
    },
    methods: {
        handleFileSelect() {
            const file = this.$refs.fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.imageSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        saveNote() {
            if (!this.noteTxt && !this.imageSrc) return;



            let newKeep = noteService.getEmptyNote();
            newKeep.type = this.imageSrc ? 'noteImg' : 'NoteTxt',
                newKeep.info = {
                    txt: this.noteTxt,
                    url: this.imageSrc
                },
                // const newNote = {
                //     type: this.imageSrc ? 'noteImg' : 'NoteTxt',
                //     isPinned: false,
                //     info: {
                //         txt: this.noteTxt,
                //         url: this.imageSrc
                //     },
                //     style: {
                //         backgroundColor: 'white'
                //     }
                // };
                noteService.save(newKeep).then(() => {
                    this.noteTxt = '';
                    this.imageSrc = '';
                });
        }, keepInput() {
            this.$emit('keepInput', this.$refs.keepInput.value)
            console.log('keepInput :>> ', this.$refs.keepInput.value);
        }

    }
};











