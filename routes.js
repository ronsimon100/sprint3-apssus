import mailApp from './apps/mail/pages/EmailApp.js'
import keepApp from './apps/keep/pages/keepApp.js'
import apsusApp from './views/HomePage.js'
import about from './views/AboutUs.js'
import mailList from './apps/mail/pages/EmailList.js'
import EmailCompose from './apps/mail/cmps/EmailCompose.js'

const { createRouter, createWebHashHistory } = VueRouter
const options = {
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: apsusApp },
    { path: '/mail-app', component: mailApp, children:[
        { path: '', component: mailList, name:'inbox' },
        { path: 'inbox', component: mailList, name:'inbox' },
        { path: 'compose', component: EmailCompose, name:'compose'},
        { path: 'sent', component: mailList, name:'sent'},
    ] },
    { path: '/keep', component: keepApp},
    {path: '/about', component: about},
],
}
export const router = createRouter(options)


