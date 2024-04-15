"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginAccount: "",
      location: "",
      BaseURL: common_vendor.inject("BaseURL"),
      countyList: [],
      countyClassList: [],
      countyDisplayClass: "countyDisplay",
      scrollX: "false"
    };
  },
  mounted() {
    this.loginAccount = this.$store.state.loginAccount;
    if (this.$store.state.location != "") {
      this.location = this.$store.state.location;
    } else {
      common_vendor.index.redirectTo({
        url: "/pages/locationChoose/locationChoose"
      });
    }
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "location/county/get/",
      method: "GET",
      data: {
        city: self.$store.state.location
      },
      success(res) {
        const countyList = res.data.countyList;
        const len = countyList.length;
        for (let i = 0; i < len; i++) {
          self.countyList.push(countyList[i]);
          self.countyClassList.push("countyNoChoose");
        }
        self.countyClassList[0] = "countyChoose";
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.countyList, (county, index, i0) => {
      return {
        a: common_vendor.t(county),
        b: common_vendor.n($data.countyClassList[index])
      };
    }),
    b: common_vendor.n($data.countyDisplayClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/appointment.vue"]]);
wx.createComponent(Component);
