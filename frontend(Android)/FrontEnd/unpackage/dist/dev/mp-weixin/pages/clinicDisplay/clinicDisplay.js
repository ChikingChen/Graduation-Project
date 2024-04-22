"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      barClass: "bar",
      BaseURL: common_vendor.inject("BaseURL"),
      name: "",
      time: "",
      location: "",
      locationClass: "location",
      nameClass: "name"
    };
  },
  methods: {},
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "clinic/initial/",
      method: "GET",
      data: {
        index: self.$store.state.clinicId
      },
      success(res) {
        self.name = res.data.name;
        self.time = res.data.time;
        self.location = res.data.location;
        console.log(self.name);
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.name),
    b: common_vendor.n($data.nameClass),
    c: common_vendor.t("地址：" + $data.location),
    d: common_vendor.n($data.locationClass),
    e: common_vendor.n($data.barClass)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/clinicDisplay/clinicDisplay.vue"]]);
wx.createPage(MiniProgramPage);
