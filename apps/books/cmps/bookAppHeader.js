export default {
    template: `
        <header class="app-header">
            <h1>Miss Book</h1>
            <nav>|
                <RouterLink to="/" >Home</RouterLink>|
                <RouterLink to="/about" >About</RouterLink>|
                <RouterLink to="/book" >our Books</RouterLink>|
            </nav>
        </header>
    `,
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}