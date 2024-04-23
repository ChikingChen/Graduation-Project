"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    loginAccount: "chiking0718@163.com",
    location: "",
    lastPage: 0,
    power: 4,
    clinicId: 1,
    doctorId: "1847365231@qq.com",
    service: null
  },
  mutations: {
    login(state, loginAccount) {
      state.loginAccount = loginAccount;
    },
    getClinic(state, clinicId) {
      state.clinicId = clinicId;
    },
    getDoctorID(state, doctorId) {
      state.doctorId = doctorId;
    },
    getService(state, service) {
      state.service = service;
    },
    getLastPage(state, lastPage) {
      state.lastPage = lastPage;
    }
  }
});
exports.store = store;
