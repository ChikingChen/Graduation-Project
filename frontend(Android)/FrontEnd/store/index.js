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
		loginAccount: null,
		account: null,
		location: "",
		lastPage: 0,
		power: 4,
		clinicId: 1,
		doctorId: '1847365231@qq.com',
		service: '拔牙',
		appointmentId: 10,
		comment: 34,
		evaluationMode: 'modify',
		checkComment: null,
		deleteSignal: 0,
		commentHaveModified: 0
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
		},
		getAccount(stage, account) {
			stage.account = account
		},
		getEvaluationMode(stage, mode){
			stage.evaluationMode = mode
		},
		deleteAdd(stage){
			stage.deleteSignal += 1
		},
		commentHaveModifiedAdd(stage){
			stage.commentHaveModified += 1
		}
	}
})

export default store
