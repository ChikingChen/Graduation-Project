"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.createStore({
  state() {
    return {
      path: "http://127.0.0.1:8000/"
    };
  }
});
common_vendor.ref("");
common_vendor.ref("");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    tele() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.tele && $options.tele(...args)),
    b: _ctx.inputvalue1,
    c: common_vendor.o(($event) => _ctx.inputvalue1 = $event.detail.value),
    d: _ctx.inputvalue2,
    e: common_vendor.o(($event) => _ctx.inputvalue2 = $event.detail.value),
    f: common_vendor.t(_ctx.$baseURL)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
