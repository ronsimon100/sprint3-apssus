import LongTxt from '../cmps/LongTxt.js';
import { bookService } from "../services/book.Service.js"

export default {
    props: ['book'],
    template: `
        <section class="book-details" v-if="book">
            <h2><span>Title:</span> {{ book.title }}</h2>
            <h3><span>Subtitle:</span> {{ book.subtitle }}</h3>
            <h3><span>Authors:</span> {{ authors }}</h3>
            <h3><span>Published Date:</span> {{book.publishedDate}} {{ handleDateState }}</h3>
            <LongTxt :txt="book.description" />
            <h3><span>Page Count:</span>{{book.pageCount}} {{ handleReadingState }}</h3>
            <h3><span>Categories:</span> {{ book.categories[0] }}</h3>
            <h3><span>Language:</span> {{ book.language }}</h3>
            
            <h4>Amount: 
              <span :class="handleAmountClass">{{ formattedPrice }}</span>
            </h4>

            <h4 v-if="book.listPrice.isOnSale">ON SALE!</h4>
         
          <img :src="book.thumbnail" alt="thumbnail">
          <RouterLink to="/book">Back to list</RouterLink>
        </section>
    `,
    data() {
        return {
            book : null
        }
    },
    created() {
        console.log('Params:',  this.$route.params)
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    },


    methods: {
        closeDetails() {
            this.$emit('hide-details');
        },
    },
    computed: {
        handleReadingState() {
            const currCount = this.book.pageCount;
            if (currCount >= 500) return ', Serious Reading';
            if (currCount >= 200) return ', Descent Reading ';
            if (currCount < 100) return ', Light Reading';
        },
        handleDateState() {
            const currYear = new Date().getFullYear();
            if (currYear - 10 > this.book.publishedDate) return ', Vintage';
            if (currYear - 1 <= this.book.publishedDate) return ', New';
        },
        handleAmountClass() {
            const currAmount = this.book.listPrice.amount;
            return { red: currAmount > 150, green: currAmount < 20 };
        },
        formattedPrice(){
          const {amount, currencyCode} = this.book.listPrice
          return new Intl.NumberFormat('en', {style:'currency', currency:currencyCode}).format(amount)
        },
        authors() {
            return this.book.authors.join(', ');
        },
    },
    components: {
        LongTxt,
    },
};


