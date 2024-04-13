"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      titleClass: "title",
      chooseClass: "choose",
      choosePlaceholder: "请选择您的地点",
      searchUrl: "/static/search.jpeg",
      searchClass: "img",
      overallDisplayClass: "overallDisplay",
      nowLocationClass: "nowLocation",
      nowLocationDisplayClass: "nowLocationDisplay",
      LocationClass: "Location",
      Location: "杭州",
      refreshURL: "/static/refresh.jpeg",
      refreshClass: "refresh",
      LocationDisplayClass: "LocationDisplay"
    };
  },
  methods: {
    refresh() {
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.searchUrl,
    b: common_vendor.n($data.searchClass),
    c: common_vendor.n($data.chooseClass),
    d: $data.choosePlaceholder,
    e: common_vendor.n($data.overallDisplayClass),
    f: common_vendor.n($data.nowLocationClass),
    g: common_vendor.t($data.Location),
    h: common_vendor.n($data.LocationClass),
    i: $data.refreshURL,
    j: common_vendor.n($data.refreshClass),
    k: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    l: common_vendor.n($data.nowLocationDisplayClass),
    m: common_vendor.n($data.LocationDisplayClass)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/locationChoose/locationChoose.vue"]]);
wx.createPage(MiniProgramPage);
