
import emailPreview from './Email-preview-cmp.js'
import emailService from '../services/Email-service.js'

export default {
    props:['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <RouterLink :to="'/email/'+email.id">Details</RouterLink> |
                    <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> |
                    <button hidden @click="showDetails(email.id)">Details</button>
                    <button @click="remove(email.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null,
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
        //to do - fins a better way to filter whitout repeating code
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
        emailService.getEmails()
            .then((emails) => {
                this.emails = emails
            })        
    },
 
    components: {
        emailPreview,
    },

    watch: {
        '$route.path': function() {
            console.log(this.$router.currentRoute);
            this.mailBoxType = this.$router.currentRoute.name
            this.filterBy.options = 'all'
        },
        
    }
}