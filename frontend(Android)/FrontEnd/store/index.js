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
		location: "",
		lastPage: 0,
		power: 4,
		clinicId: 1,
		doctorId: '1847365231@qq.com',
		service: '拔牙',
		appointmentId: 1,
		comment: 15
	},
	mutations: {
		login(state, loginAccount) {
			state.loginAccount = loginAccount
		},
		getClinic(state, clinicId) {
			state.clinicId = clinicId
		},
		getDoctorID(state, doctorId) {
			state.doctorId = doctorId
		},
		getService(state, service) {
			state.service = service
		},
		getLastPage(state, lastPage) {
			state.lastPage = lastPage
		},
		getAppointment(stage, appointment) {
			stage.appointmentId = appointment
		},
		getComment(stage, comment) {
			stage.comment = comment
		}
	}
})

export default store
