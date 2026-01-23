import './assets/styles/main.css'
import 'vue-sonner/style.css'
import './plugins/ag-grid.ts'

import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
