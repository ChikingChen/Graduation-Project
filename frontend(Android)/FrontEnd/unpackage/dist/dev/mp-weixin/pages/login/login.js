"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    tele() {
      console.log("clicked");
    }
  },
  mounted() {
    console.log("!!!!!!" + document.getElementById("loginchoose2"));
    document.getElementById("loginchoose2").addEventListener("click", this.tele);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
