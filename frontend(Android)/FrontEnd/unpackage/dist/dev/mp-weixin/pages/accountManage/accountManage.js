"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      screenHeightRpx: null,
      backgroundClass: "background",
      BaseURL: common_vendor.inject("BaseURL"),
      nicknameList: [],
      emailList: [],
      arrowList: [],
      nicknameClass: "nickname",
      nicknameDisplayClass: "nicknameDisplay",
      arrowClass: "arrow",
      oldNickname: null,
      newNickname: null,
      accountShowIndex: -1,
      emailShow: null,
      pswordShow: null,
      powerShow: null
    };
  },
  methods: {
    getOldNickName(nickname) {
      this.oldNickname = nickname;
    },
    getNewNickName(nickname, index) {
      this.newNickname = nickname;
      if (this.oldNickname == this.newNickname)
        return;
      const email = this.emailList[index];
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "account/modify/",
        method: "GET",
        data: {
          email,
          nickname: self.newNickname
        }
      });
    },
    select(index) {
      if (index == this.accountShowIndex) {
        this.accountShowIndex = -1;
        this.arrowList[index] = "/static/left.png";
      } else {
        if (this.accountShowIndex == -1) {
          this.accountShowIndex = index;
          this.arrowList[index] = "/static/down.png";
        } else {
          this.arrowList[this.accountShowIndex] = "/static/left.png";
          this.accountShowIndex = index;
          this.arrowList[index] = "/static/down.png";
        }
        const self = this;
        common_vendor.index.request({
          url: self.BaseURL + "account/get/",
          method: "GET",
          data: {
            email: self.emailList[index]
          },
          success(res) {
          }
        });
      }
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
    common_vendor.index.request({
      url: self.BaseURL + "account/get/",
      method: "GET",
      success(res) {
        const nicknameList = res.data.nicknameList;
        const emailList = res.data.emailList;
        const len = nicknameList.length;
        for (let i = 0; i < len; i++) {
          self.nicknameList.push(nicknameList[i]);
          self.emailList.push(emailList[i]);
          self.arrowList.push("/static/left.png");
        }
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "241d7906": _ctx.screenHeightRpx
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
    a: common_vendor.f($data.nicknameList, (nickname, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.getOldNickName($data.nicknameList[index]), index),
        b: common_vendor.o(($event) => $options.getNewNickName($data.nicknameList[index], index), index),
        c: $data.nicknameList[index],
        d: common_vendor.o(($event) => $data.nicknameList[index] = $event.detail.value, index),
        e: $data.arrowList[index],
        f: common_vendor.o(($event) => $options.select(index), index),
        g: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        h: common_vendor.t($data.emailShow)
      } : {}, {
        i: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        j: common_vendor.t($data.pswordShow)
      } : {}, {
        k: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        l: common_vendor.t($data.powerShow)
      } : {}, {
        m: index
      });
    }),
    b: common_vendor.n($data.nicknameClass),
    c: common_vendor.n($data.arrowClass),
    d: common_vendor.n($data.nicknameDisplayClass),
    e: common_vendor.n($data.backgroundClass),
    f: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/accountManage/accountManage.vue"]]);
wx.createPage(MiniProgramPage);
