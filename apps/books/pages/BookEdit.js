import { bookService } from '../services/book.Service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <input type="number" v-model="book.amount" placeholder="price">
                <input type="text" v-model="book.title" placeholder="Title">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptyBook(),
    }
  },
  methods: {
    save() {
      bookService.save(this.book).then((savedBook) => {
        this.$router.push('/book')
      })
    },
  },
}
