"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/signin/signin.js";
  "./pages/main/main.js";
  "./pages/main/appointment/appointment.js";
  "./pages/main/home/home.js";
  "./pages/main/message/message.js";
  "./pages/main/personality/personality.js";
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
  return {
    app
  };
}
Vue.use(Vuex);
createApp().app.mount("#app");
exports.createApp = createApp;
