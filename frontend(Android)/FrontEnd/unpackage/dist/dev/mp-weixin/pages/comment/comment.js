"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      followList: null,
      comment: null
    };
  },
  methods: {},
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "comment/initial/",
      method: "GET",
      data: {
        id: self.$store.state.comment,
        account: self.$store.state.loginAccount
      },
      success(res) {
        self.followList = res.data.followList;
        self.comment = res.data.comment;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/comment/comment.vue"]]);
wx.createPage(MiniProgramPage);
