
import mailTxt from './mailTxt,js'
import mailService from '../services/mail-service.js';
import {eventBus,EMAILS_UNREAD, REPLY} from '../../../event-bus.js'



export default {
    props: ['email', 'isInbox'],
    template: `
        <section class="email-preview-cmp grid" :class="isRead" @click='readEmail'>
            <div class="compressed-mail grid" v-if="isCompressed">
                <div class="sender-name" v-if="isInbox">{{limitSenderName}}</div>
                <div class="sender-name" v-else>{{limitReciverName}}</div>
                <div class="email-prev-subj" ref="subject">{{limitSubject}}</div>
                <div class="email-prev-time">{{formatDate}}</div>
            </div>
            <body-text v-else  :currEmail="email">  </body-text>
            <div class="email-btns-container flex" v-if="btnsContainerShouldShow">
                <button class="btn email-btn btn-read-unread" @click.stop="toogleReadEmail" 
                    v-if="isInbox"><i :class="envelopeIcon"></i></button>
                <button class="btn email-btn btn-delete" @click.stop="deleteEmail"><i class="far fa-trash-alt"></i></button>
                <button class="btn email-btn btn-replay" @click.stop="reply"><i class="fas fa-reply"></i></button>
            </div> 
         


        </section>
`
    ,
    data() {
        return {
            hour: '',
            min: '',
            isCompressed: true,
        }
    },
    computed: {
        formatDate() {
            this.hour = new Date(this.email.date).getHours()
            this.min = new Date(this.email.date).getMinutes()
            return `${this.hour}:${this.min}`
        },
        isRead() {
            if (this.email.isRead) return 'read'
            else return 'un-read'
        },
        envelopeIcon(){
            if (!this.email.isRead) return 'far fa-envelope'
            else return 'far fa-envelope-open'
        },
        limitSubject() {
            var isMobile = document.body.clientWidth < 700
            if (this.email.subject.length > 20 && isMobile) {
                return this.email.subject.substring(0,20) +'...'
            } else if (this.email.subject.length > 25) {
                return this.email.subject.substring(0,25) +'...'
            }
            return this.email.subject
        },
        limitSenderName() {
            if (this.email.from.length < 10) return this.email.from
            else return this.email.from.substring(0,10) +'...'
        },
        limitReciverName() {
            if (this.email.to.length < 10) return this.email.to
            else return this.email.to.substring(0,10) +'...'
        },
        btnsContainerShouldShow() {
            var isMobile = document.body.clientWidth < 600
            if (isMobile && this.isCompressed) return false
            else return true
        }
    },

    created() {
        this.emailsUnRead = mailService.getNumOfUnRead()
    },
    components: {
        mailTxt,
    },
    methods: {
        readEmail() {
            this.isCompressed = !this.isCompressed;
            if (this.email.isRead === true) return
            mailService.toggleUnread(this.email)
            var unread = mailService.updateNumOfUnread(-1)
            setTimeout(() => {
                eventBus.$emit(EMAILS_UNREAD, unread)

            }, 700);
        },
        toogleReadEmail() {
            this.isCompressed = true
            mailService.toggleUnread(this.email)
            if (this.email.isRead) var unread = mailService.updateNumOfUnread(-1)
            else var unread = mailService.updateNumOfUnread(1)
            eventBus.$emit(EMAILS_UNREAD, unread)
            
        },
        deleteEmail() {
            console.log('delete')
            this.$emit('toast', 'Email was deleted')
            var unread = !this.email.isRead
            mailService.deleteEmail(this.email)
            .then(()=> {
                
                if (unread) {
                eventBus.$emit(EMAILS_UNREAD, mailService.updateNumOfUnread(-1))
            }
            })
        },
        reply() {
            console.log(this.email)
            mailService.saveEmailForReply (this.email)
            this.$router.push('/mail-app/compose')
            eventBus.$emit(REPLY, this.email)
        }
    }
}