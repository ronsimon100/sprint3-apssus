import { eventBus } from "../../../services/event-bus.service.js";

export default {
    props: ['note'],
    template: `
<input type="color" v-model="color"  @input="changeBgc"/>
<button @click="pinNote">pin</button>
<h2>hi</h2>`,

    data() {
        return {
            color: '#000000'
        }
    },
    methods: {
        changeBgc() {
            console.log(this.color)
            const note = JSON.parse(JSON.stringify(this.note))
            note.style.backgroundColor = this.color
            eventBus.emit('updateNote', note)
        },pinNote() {
            const note = JSON.parse(JSON.stringify(this.note))
            note.isPinned = !note.isPinned
            console.log('note :>> ', note);
            eventBus.emit('updateNote', note)
    
    }, 



    },
    computed: {

    },
    created() {

        // console.log('this.note :>> ', this.note);
    },
    components: {

    },
    emits: [],
}