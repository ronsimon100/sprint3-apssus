import BookPreview from './BookPreview.js'

export default {
    props:['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <Router-link :to="'/book/'+book.id">Details</Router-link>
                    <button @click="remove(book.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        showDetails(bookId){
            this.$emit('show-details', bookId)
        },
    },
    components: {
        BookPreview,
    }
}