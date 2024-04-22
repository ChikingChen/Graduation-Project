"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    loginAccount: "1196775239@qq.com",
    location: "",
    lastPage: 0,
    power: 4,
    clinicId: 1
  },
  mutations: {
    login(state, loginAccount) {
      state.loginAccount = loginAccount;
    },
    getClinic(state, clinicId) {
      state.clinicId = clinicId;
    }
  }
});
exports.store = store;
