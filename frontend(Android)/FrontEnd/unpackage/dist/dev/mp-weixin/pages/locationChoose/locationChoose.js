"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
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
      LocationDisplayClass: "LocationDisplay",
      cityList: [],
      cityClass: "class"
    };
  },
  methods: {
    refresh() {
    },
    chooseCity(city) {
      this.$store.state.location = city;
      this.$store.state.lastPage = 1;
      common_vendor.index.redirectTo({
        url: "/pages/main/main"
      });
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "location/city/get/",
      method: "GET",
      success(res) {
        const cityList = res.data.cityList;
        const len = cityList.length;
        for (let i = 0; i < len; i++) {
          self.cityList.push(cityList[i]);
        }
      }
    });
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
    i: common_vendor.o(($event) => $options.chooseCity($data.Location)),
    j: $data.refreshURL,
    k: common_vendor.n($data.refreshClass),
    l: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    m: common_vendor.n($data.nowLocationDisplayClass),
    n: common_vendor.f($data.cityList, (city, k0, i0) => {
      return {
        a: common_vendor.t(city),
        b: common_vendor.o(($event) => $options.chooseCity(city))
      };
    }),
    o: common_vendor.n($data.cityClass),
    p: common_vendor.n($data.LocationDisplayClass)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/locationChoose/locationChoose.vue"]]);
wx.createPage(MiniProgramPage);
