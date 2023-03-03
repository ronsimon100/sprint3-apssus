const { createApp } = Vue

import AppHeader from './cmps/AppHeader.js'
import UserMsg from './cmps/UserMsg.js'
import { router } from './routes.js'

const options = {
	template: `
        <section>
            <EmailDetails />
            <AppHeader />
            <RouterView />
            <AppFooter />
            <UserMsg />
        </section>
    `,
	components: {
		AppHeader,
		UserMsg,
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
