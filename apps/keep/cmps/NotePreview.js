export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.id }}</h2>
            <!-- <h3>{{ note.maxSpeed }}</h3> -->
            <!-- <pre> {{note}}</pre> -->
        </article>
    `,
}