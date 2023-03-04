import { bookService } from '../services/book.Service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'



export default {
  template: `
        <section class="book-index">
            <RouterLink to="/book/edit">add new book</RouterLink>
            
            <BookFilter @filter="setFilterBy"/>
            <BookList
            v-if="books" 
            :books="filteredBooks" 
            @remove="removeBook"/>

        </section>
    `,
  data() {
    return {
      books: null,
      filterBy: {},
    }
  },
  methods: {
    removeBook(BookId) {
      BookService.remove(BookId)
          .then(() => {
              const idx = this.Books.findIndex(Book => Book.id === BookId)
              this.Books.splice(idx, 1)
              eventBusService.emit('show-msg', { txt: 'Book removed', type: 'success' })
          })
          .catch(err=>{
              eventBusService.emit('show-msg', { txt: 'Book remove failed', type: 'error' })
          })
    },
    onSaveBook(newBook) {
        this.books.unshift(newBook)
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    filteredBooks() {
        const regex = new RegExp(this.filterBy.title, 'i')
        return this.books.filter(book => regex.test(book.title))
    }
  },
  created() {
    bookService.query().then((books) => (this.books = books))
  },
  components: {
    BookFilter,
    BookList,
    BookFilter,
  },
}
