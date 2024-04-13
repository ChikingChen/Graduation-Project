"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginAccount: "",
      location: ""
    };
  },
  set() {
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
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/appointment.vue"]]);
wx.createComponent(Component);
