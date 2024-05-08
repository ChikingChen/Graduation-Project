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
		loginAccount: "chiking0718@163.com",
		BaseURL: 'http://127.0.0.1:8000/'
	},
	mutations: {
		login(state, loginAccount) {
			state.loginAccount = loginAccount
		}
	}
})

export default store
