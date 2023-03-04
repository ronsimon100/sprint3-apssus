import navBar from '../cmps/nav-bar-cmp.js'

export default {
    template: `
<section class="about-page">
    <div class="bg-about">

        <nav-bar class="about-nav-bar"></nav-bar >
        <div class="about-txt-container">
            <h1>About Us </h1>
            <p class="about-us-txt">
            Lior Lvovsky , 27 years old, lives in Karmiel. 
            i have got 7 cats and i love coading all day. <br>
            for future coaporation you can reach me in my email. <br>
            liorlvovsky@gmail.com
           <br>
            <hr><hr>
            Ron Simon, lives in tel aviv likes sports and programing 
            for future coaporation you can reach me in this mail <br>
            ronsimon100@gmail.com
            </p>

        </div>

    </div>
</section>
`,
    methods: {

    },
    created() {

    },
    destroyed() {
    },
    components: {
        navBar
    }

}