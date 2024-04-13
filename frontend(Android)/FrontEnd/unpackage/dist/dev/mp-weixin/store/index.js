"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    loginAccount: "1196775239@qq.com",
    location: ""
  },
  mutations: {
    login(state, loginAccount) {
      state.loginAccount = loginAccount;
    }
  }
});
exports.store = store;
