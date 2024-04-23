"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      backgroundClass: "background",
      screenHeightRpx: "0rpx",
      informationDisplayClass: "informationDisplay",
      pictureClass: "picture",
      introductionDisplayClass: "introductionDisplay",
      nameClass: "name",
      ageClass: "age",
      eduClass: "edu",
      introductionClass: "introduction",
      name: null,
      age: null,
      edu: null,
      introduction: null
    };
  },
  methods: {},
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "appointment/display/initial",
      methods: "GET",
      data: {
        clinic: self.$store.state.clinicId,
        doctor: self.$store.state.doctorId
      },
      success(res) {
        self.name = res.data.name;
        self.age = res.data.age;
        self.edu = res.data.edu;
        self.introduction = res.data.introduction;
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "54a1c1a0": _ctx.screenHeightRpx
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
    a: common_vendor.n($data.pictureClass),
    b: common_vendor.t($data.name),
    c: common_vendor.n($data.nameClass),
    d: common_vendor.t($data.age + "岁"),
    e: common_vendor.n($data.ageClass),
    f: common_vendor.t($data.edu),
    g: common_vendor.n($data.eduClass),
    h: common_vendor.t("简介：" + $data.introduction),
    i: common_vendor.n($data.introductionClass),
    j: common_vendor.n($data.introductionDisplayClass),
    k: common_vendor.n($data.informationDisplayClass),
    l: common_vendor.n($data.backgroundClass),
    m: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/AppointmentDisplay/AppointmentDisplay.vue"]]);
wx.createPage(MiniProgramPage);
