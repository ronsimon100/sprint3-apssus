import mailApp from './apps/email/pages/mail-app.js'
import keepApp from './apps/keep/pages/keepApp.js'
import apsusApp from './pages/home-page.js'
import about from './cmps/about-cmp.js'




const routes = [
    { path: '/', component: apsusApp },
    { path: '/mail-app', component: mailApp},
    { path: '/keep', component: keepApp},
    {path: '/about', component: about}

]

export default routes;