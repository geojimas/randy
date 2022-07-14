import { createApp } from 'vue'
import App from './App.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import Notifications from '@kyvg/vue3-notification'
import './index.css'
import 'animate.css'

createApp(App).use(VueClipboard).use(Notifications).mount('#app')
