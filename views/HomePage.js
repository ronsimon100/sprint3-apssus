import mailApp from '../apps/mail/pages/EmailApp.js'
import navBar from '../cmps/nav-bar-cmp.js'
import about from '../views/AboutUs.js'
import keep from '../apps/keep/pages/keepApp.js'



export default {
    props: [],
    template: `
    <section class="apsus-app">
        <div class="bg">
            <div class="home-page-content">
                <h1>Appsus.</h1>
                    <h2> choose your needs </h2>
                    <h4> the way to route your day</h4>
                    <div class="links-container home-page-links-container"></div>
                        <nav-bar> </nav-bar>

            </div>
                
        </div>
    </section>
    `,
    data() {
        return {

        }
    },

    methods: {


    },
    computed: {


    },
    created() {

    },
    components: {
        mailApp,
        navBar,
        about,
        keep
    }
}