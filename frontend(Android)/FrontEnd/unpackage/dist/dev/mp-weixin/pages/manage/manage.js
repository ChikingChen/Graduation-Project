"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      backgroundClass: "background",
      screenHeightRpx: "",
      chooseBarClass1: "powerBar1"
    };
  },
  methods: {
    location() {
      common_vendor.index.navigateTo({
        url: "/pages/locationManage/locationManage"
      });
    },
    account() {
      common_vendor.index.navigateTo({
        url: "/pages/accountManage/accountManage"
      });
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "9e9c14e4": _ctx.screenHeightRpx
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.chooseBarClass1),
    b: common_vendor.o((...args) => $options.location && $options.location(...args)),
    c: common_vendor.n($data.chooseBarClass1),
    d: common_vendor.o((...args) => $options.account && $options.account(...args)),
    e: common_vendor.n($data.backgroundClass),
    f: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/manage/manage.vue"]]);
wx.createPage(MiniProgramPage);
