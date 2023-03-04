export default {
    props: ['note'],
    template: `
    <img :src="note.info.url"   />
    <button @click="remove(note.id)">x</button>    
    
    
    `,

    data() {
        return {

        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        }
    },
    computed: {

    },
    created() {
        // console.log('this.note :>> ', this.note);
    },
    components: {

    },
    emits: ['remove'],
}