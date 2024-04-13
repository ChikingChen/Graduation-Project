"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      test: "this is a test",
      Account: ""
    };
  },
  methods: {
    changeMessage() {
      this.test = "this is another test";
    }
  },
  mounted() {
    console.log(this.$store.state.Account);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.test),
    b: common_vendor.o((...args) => $options.changeMessage && $options.changeMessage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/personality/personality.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
