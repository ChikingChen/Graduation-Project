"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      loginAccount: "",
      BaseURL: common_vendor.inject("BaseURL"),
      screenHeightRpx: null,
      idList: null,
      titleList: null,
      timeList: null,
      classList: null,
      contentList: null,
      typeList: null,
      titleClass: "title",
      timeClass: "time",
      contentClass: "content",
      backgroundClass: "background",
      evaluateClass: "evaluate",
      textClass: "text"
    };
  },
  methods: {
    clickMessage(index) {
      this.classList[index] = "haveread";
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "message/read/",
        method: "GET",
        data: {
          id: self.idList[index]
        }
      });
    },
    evalClick(index) {
    }
  },
  mounted() {
    this.loginAccount = this.$store.state.loginAccount;
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "message/get/",
      method: "GET",
      data: {
        account: self.loginAccount
      },
      success(res) {
        const messageList = res.data.messageList;
        messageList.reverse();
        const len = messageList.length;
        self.idList = [];
        self.titleList = [];
        self.timeList = [];
        self.classList = [];
        self.contentList = [];
        self.typeList = [];
        for (let i = 0; i < len; i++) {
          self.idList.push(messageList[i].id);
          self.titleList.push(messageList[i].title);
          self.timeList.push(messageList[i].time.slice(0, 10));
          self.classList.push(messageList[i].read ? "haveread" : "noread");
          self.contentList.push(messageList[i].content);
          self.typeList.push(messageList[i].type);
        }
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + "rpx";
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "2f52a9ca": _ctx.screenHeightRpx
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
    a: common_vendor.f($data.titleList, (title, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t($data.titleList[index]),
        b: common_vendor.t($data.timeList[index]),
        c: common_vendor.t($data.contentList[index]),
        d: $data.typeList[index] == 2
      }, $data.typeList[index] == 2 ? {
        e: common_vendor.t("评价"),
        f: common_vendor.n($data.evaluateClass),
        g: common_vendor.o(($event) => $options.evalClick(index), index)
      } : {}, {
        h: common_vendor.n($data.classList[index]),
        i: common_vendor.o(($event) => $options.clickMessage(index), index),
        j: index
      });
    }),
    b: common_vendor.n($data.titleClass),
    c: common_vendor.n($data.timeClass),
    d: common_vendor.n($data.contentClass),
    e: common_vendor.n($data.textClass),
    f: common_vendor.n($data.backgroundClass),
    g: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
