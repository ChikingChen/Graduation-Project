"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/signin/signin.js";
  "./pages/main/main.js";
  "./pages/locationChoose/locationChoose.js";
  "./pages/manage/manage.js";
  "./pages/locationManage/locationManage.js";
  "./pages/accountManage/accountManage.js";
  "./pages/clinicDisplay/clinicDisplay.js";
  "./pages/AppointmentDisplay/AppointmentDisplay.js";
  "./pages/PersonAppointment/PersonAppointment.js";
  "./pages/evaluation/evaluation.js";
  "./pages/evaluationDisplay/evaluationDisplay.js";
  "./pages/ClinicEvaluation/ClinicEvaluation.js";
  "./pages/comment/comment.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.provide("BaseURL", "http://127.0.0.1:8000/");
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
const Account = "123";
createApp().app.mount("#app");
exports.Account = Account;
exports.createApp = createApp;
