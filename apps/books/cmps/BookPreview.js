export default {
    name: 'bookPreview',
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.amount }}</h3>
        </article>
    `,
}