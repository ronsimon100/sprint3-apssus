const { createApp } = Vue
import AppHeader from './cmps/AppHeader.js'
import bookAppHeader from './apps/books/cmps/bookAppHeader.js'
import UserMsg from './cmps/UserMsg.js'
import { router } from './routes.js'
const options = {
    template: `
        <section>
            <AppHeader />
            <RouterView />
            <UserMsg />
        </section>
    `,

data() {
    return {
      route: 'BookIndex',
    }
  },
    components: {
        AppHeader,
        UserMsg,
        bookAppHeader,
    },
}
const app = createApp(options)
app.use(router)
app.mount('#app')
