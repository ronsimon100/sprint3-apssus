import mailApp from './apps/mail/pages/EmailApp.js'
import keepApp from './apps/keep/pages/keepApp.js'
import apsusApp from './views/HomePage.js'
import about from './views/AboutUs.js'

const { createRouter, createWebHashHistory } = VueRouter
const options = {
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: apsusApp },
    { path: '/mail-app', component: mailApp},
    { path: '/keep', component: keepApp},
    {path: '/about', component: about},

],
}

export const router = createRouter(options)


