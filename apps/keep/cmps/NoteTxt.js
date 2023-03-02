export default {
    props: ['note'],
    template: `
    <article>
        <!-- <h2 >{{ note.id }}</h2> -->
        <p>{{note.info.txt}}</p>
        <button @click="remove(note.id)">x</button>
    </article>
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

    },
    components: {

    },
    emits: [],
}