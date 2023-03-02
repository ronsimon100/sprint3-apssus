
import emailPreview from './Email-preview-cmp.js'
import utilService from '../../../services/util-service.js';
import mailService from '../services/Email-service.js'

export default {
    props: ['emails'],
    template: `
    <section class="email-list-show">
        <div class="mail-title" v-if="isInbox">Inbox
        <input type="search"  id="search-email-input" v-model="filterBy.searchTxt" autofocus placeholder="🔍 Search mail" >
            <select class="read-unread-all" v-model="filterBy.options">
                <option value="all" selected>All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
            </select>
        </div>
        <div class="mail-title" v-else>Recived
            <input type="search"  id="search-email-input" v-model="filterBy.searchTxt" autofocus placeholder="🔍 Search mail" >
        </div>
        <!-- <email-preview v-for="(currEmail, idx) in emails" :key="currEmail.id"
            :email="currEmail" :idx="idx" :is-inbox="isInbox"> 
        </email-preview>  -->
            <div  v-for="(currEmail, idx) in emails" >
                <email-Preview   :email="currEmail" ></email-Preview>
            </div>
    </section>
    `,
    data() {
        return {
            mailBoxType: this.$router.currentRoute.name,
            filterBy: {
                searchTxt: '',
                options: 'all',
            },
        }
    },
    methods: {
    },
    computed: {
        filteredEmails() {
            if (!this.emails) return
            if (this.filterBy.options === 'all') {
                var filtered = this.emails.filter(email => {

                    return email.type === this.mailBoxType &&
                        (email.body.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.subject.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.to.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.from.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()))
                })
            } else if (this.filterBy.options === 'unread') {
                var filtered = this.emails.filter(email => {
                    return email.type === this.mailBoxType && !email.isRead &&
                        (email.body.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.subject.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.to.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.from.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()))
                })
            } else {
                var filtered = this.emails.filter(email => {
                    return email.type === this.mailBoxType && email.isRead &&
                        (email.body.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.subject.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.to.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()) ||
                            email.from.toLowerCase().includes(this.filterBy.searchTxt.toLowerCase()))
                })
            }
            return filtered
        },
        isInbox() {
            return this.mailBoxType === 'inbox'
        }

    },

    created() {
        mailService.getEmails()
            .then((email) => {
                this.email = email
            })
        console.log(this.email);
    },

    components: {
        emailPreview,
    },

    watch: {
        '$route.path': function () {
            console.log(this.$router.currentRoute);
            this.mailBoxType = this.$router.currentRoute.name
            this.filterBy.options = 'all'
        },

    }
}