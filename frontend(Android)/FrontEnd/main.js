import App from './App'

import { createStore } from 'vuex'

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}

Vue.use(Vuex)

