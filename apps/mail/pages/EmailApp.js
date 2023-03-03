import mailService from '../services/Email-service.js'
import EmailList from './EmailList.js'
import AppHeader from '../../../cmps/AppHeader.js'


export default {
    template: `
    <section class="mail-app">
  
        </AppHeader>
        <div class="toast-msg" v-if="toastMsg">{{toastMsg}}</div>
        <div id="hamburger" @click="toggleNav" v-if="isMobile">🍔</div>
        <div class="content-container" @click="closeNav">
            <div class="inner-links-container" :class="navState" >
                <router-link :to="'/mail-app/compose'"><button>compose</button></router-link> 
                <router-link :to="'/mail-app/inbox'"><button>inbox</button></router-link> 
                <router-link :to="'/mail-app/sent'"><button>sent</button></router-link> 
            </div>
            <mail-List :emails="emails"></mail-List>
            <router-view class="email-list-show" @toast="showToast"></router-view>
        </div>
        
    </section>
    `,
    data() {
        return {
            emails: null,
            toastMsg: null,
            navOpen: false,
            unreadMails: ''

        }
    },
    props: [],

    methods: {
        showToast(msg = 'Action was Done') {
            this.toastMsg = msg
            setTimeout(() => this.toastMsg = null, 2000)
        },
        toggleNav() {
            console.log(screen.width)
            this.navOpen = !this.navOpen
        },
        closeNav() {
            this.navOpen = false
        }

    },
    computed: {
        numOfUnread() {
            return this.unreadMails;
        },
        navState() {
            return (this.navOpen) ? 'nav-open' : 'nav-closed'
        },
        isMobile() {
            return document.body.clientWidth < 780
        },


    },
    created() {
        mailService.getEmails()
            .then((emails) => {
                console.log(emails);
                this.emails = emails
            })
        this.unreadMails = mailService.getNumOfUnRead()
    },
    components: {
        mailService,
        EmailList,
        AppHeader
    }
}