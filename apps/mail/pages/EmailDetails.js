export default {
    props: ['Book'],
    template: `
        <section class="Book-details">
            <h2>{{ Book.vendor }}</h2>
            <h3>{{ Book.maxSpeed }}</h3>
            <img :src="'../assets/img/' + Book.vendor + '.png'" alt="">
            <button @click="closeDetails">Close</button>
        </section>
    `,
    methods: {
        closeDetails(){
            this.$emit('hide-details')
        }
    }
}