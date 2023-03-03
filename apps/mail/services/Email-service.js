import utilService from '../../../services/util-service.js'




export default {
    getEmails,
    sendEmail,
    toggleUnread,
    deleteEmail,
    getNumOfUnRead,
    updateNumOfUnread,
    saveEmailForReply,
    getEmailForReply
}

var emailsDB = []


const EMAIL_KEY = 'emails'
const lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, consectetur magni? Consectetur architecto earum soluta repellat assumenda quae dolor amet quasi voluptas voluptatum, beatae vitae velit ullam quod ducimus itaque?'
const SELF = 'self'
const INBOX = 'inbox'
var numOfUnread
var emailReply

function getEmails() {
    var emails = utilService.getFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = _createEmails()
    }
    emailsDB = emails
    utilService.saveToStorage(EMAIL_KEY, emails)
    return Promise.resolve(emails)
}


function sendEmail(composed) {
    if (composed.to.toLowerCase() !== SELF) _addToEmails(composed)
    else {
        //add as sent
        _addToEmails(composed)
        //add as recived
        var emailToRecive = { ...composed }
        emailToRecive.type = INBOX
        emailToRecive.from = 'self'
        emailToRecive.isRead = false
        emailToRecive.id = utilService.makeId()
        _addToEmails(emailToRecive)
    }
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
    return Promise.resolve()
}

function toggleUnread(email) {
    console.log('gothere')
    email.isRead = !email.isRead
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
}


function _addToEmails(email) {
    emailsDB.push(email)
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
    return Promise.resolve()
}

function _createExampleEmail(type, subject, body, date, from = 'lorem', to = 'ron') {
    return {
        type, 
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        date,
        from,
        to,

    }
}

function _createEmails() {
    var emails = []
    var email1 = _createExampleEmail(INBOX, 'this code wishes he wouldnt be written', lorem, Date.now() + 10000, 'ben', '')
    emails.push(email1)
    var email2 = _createExampleEmail(INBOX, 'this code will make your application die sloley with suffer and sorrow', Date.now(), 'dan', '')
    emails.push(email2)
    var email3 = _createExampleEmail(INBOX, 'vue is ashamed of you', lorem, Date.now(), 'bella', '')
    emails.push(email3)
    var email4 = _createExampleEmail(INBOX, 'pass pass, its a come', Date.now(), 'brittney', '')
    emails.push(email4)
   var  email5 = _createExampleEmail(INBOX, 'whats up man?',lorem, Date.now(), 'puki', '')
    emails.push(email5)
    var email6 = _createExampleEmail(INBOX, 'lets hang out!',lorem, Date.now(), 'muki', '')
    emails.push(email6)
    var email7 = _createExampleEmail(INBOX, 'i booked a place for 21:00 pm','get your ass over here', lorem, Date.now(), 'Yaron', '')
    emails.push(email7)
    var email8 = _createExampleEmail(INBOX, 'you think i look ok?', lorem, Date.now(), 'shluki', '')
    emails.push(email8)
    var email9 = _createExampleEmail(INBOX, 'im out of ideas',lorem, Date.now(), 'duki', '')
    emails.push(email9)
    var email10 = _createExampleEmail(INBOX, 'how much mail can one man write?', lorem, Date.now(), 'David', '')
    emails.push(email10)
    var email11 = _createExampleEmail(INBOX, 'think about school', lorem, Date.now(), 'Guy', '')
    emails.push(email11)
    var email12 = _createExampleEmail(INBOX, 'am i alive?', lorem, Date.now(), 'Adi', '')
    emails.push(email12)
    var email13 = _createExampleEmail(INBOX, 'you have 2 days to give me the cash!',lorem, Date.now(), 'Yanai', '')
    emails.push(email13)
    return emails
}




function deleteEmail(email) {
    var idx = getEmailIdx(email.id)
    emailsDB.splice(idx, 1)
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
    return Promise.resolve()
}


function getEmailIdx(id) {
    return emailsDB.findIndex((email) => email.id === id)

}


function _countUnread() {
    getEmails()
    var unread = 0
    for (var i = 0; i < emailsDB.length; i++) {
        if (emailsDB[i].isRead === false) unread++

    }
    return unread
}

function getNumOfUnRead() {
    if (!numOfUnread) numOfUnread = _countUnread()
    return numOfUnread
}

function updateNumOfUnread(change) {
    numOfUnread += change
    return numOfUnread
}

function saveEmailForReply(email) {
    emailReply = email
}

function getEmailForReply() {
    var res = emailReply
    emailReply = null
    return res
}