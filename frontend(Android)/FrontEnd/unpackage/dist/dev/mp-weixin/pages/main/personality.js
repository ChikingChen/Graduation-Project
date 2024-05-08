"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      name: "游客",
      loginAccount: "",
      backgroundClass: "background",
      BaseURL: common_vendor.inject("BaseURL"),
      power: 0,
      screenHeightRpx: "",
      nameBarClass: "nameBar",
      nameClass: "name",
      avatarClass: "avatar",
      optionClass: "option",
      optionDisplayClass: "optionDisplay"
    };
  },
  methods: {
    changeMessage() {
      this.test = "this is another test";
    },
    manage() {
      common_vendor.index.navigateTo({
        url: "/pages/manage/manage"
      });
    },
    appointment() {
      common_vendor.index.navigateTo({
        url: "/pages/PersonAppointment/PersonAppointment"
      });
    },
    evaluation() {
      common_vendor.index.navigateTo({
        url: "/pages/evaluationDisplay/evaluationDisplay"
      });
    },
    star() {
      common_vendor.index.navigateTo({
        url: "/pages/personEvaluation/personEvaluation"
      });
    },
    personClick() {
      this.$store.commit("getAccount", this.$store.state.loginAccount);
      common_vendor.index.navigateTo({
        url: "/pages/personPage/personPage"
      });
    },
    message() {
      common_vendor.index.navigateTo({
        url: "/pages/message/message"
      });
    }
  },
  mounted() {
    const self = this;
    self.loginAccount = self.$store.state.loginAccount;
    common_vendor.index.request({
      url: self.BaseURL + "personality/name/",
      method: "GET",
      data: {
        email: self.loginAccount
      },
      success: function(res) {
        self.name = res.data.nickname;
        self.$store.state.power = self.power = res.data.power;
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + "rpx";
      }
    });
  },
  created() {
    if (this.$store.state.loginAccount == null) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "61cd810b": _ctx.screenHeightRpx
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.avatarClass),
    b: common_vendor.t($data.name),
    c: common_vendor.n($data.nameClass),
    d: common_vendor.n($data.nameBarClass),
    e: common_vendor.o((...args) => $options.personClick && $options.personClick(...args)),
    f: $data.power >= 2
  }, $data.power >= 2 ? {
    g: common_vendor.n($data.optionClass),
    h: common_vendor.o((...args) => $options.manage && $options.manage(...args))
  } : {}, {
    i: common_vendor.n($data.optionClass),
    j: common_vendor.o((...args) => $options.appointment && $options.appointment(...args)),
    k: common_vendor.n($data.optionClass),
    l: common_vendor.o((...args) => $options.evaluation && $options.evaluation(...args)),
    m: common_vendor.n($data.optionClass),
    n: common_vendor.o((...args) => $options.star && $options.star(...args)),
    o: common_vendor.n($data.optionClass),
    p: common_vendor.o((...args) => $options.message && $options.message(...args)),
    q: common_vendor.n($data.optionDisplayClass),
    r: common_vendor.n($data.backgroundClass),
    s: common_vendor.s(_ctx.__cssVars())
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/personality.vue"]]);
wx.createComponent(Component);
