// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
const store = createStore({
// #endif
	state: {
		loginAccount: "1196775239@qq.com",
		location: ""
	},
	mutations: {
		login(state, loginAccount) {
			state.loginAccount = loginAccount
		}
	}
})

export default store
