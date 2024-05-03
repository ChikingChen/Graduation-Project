"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      backgroundClass: "background",
      screenHeightRpx: "",
      BaseURL: common_vendor.inject("BaseURL"),
      starBlockClass: "starBlock",
      contentClass: "content",
      informationDisplayClass: "informationDisplay",
      avatarClass: "avatar",
      nicknameClass: "nickname",
      likeClass: "like",
      likeCountClass: "likeCount",
      starList: null
    };
  },
  methods: {
    likeImg(index) {
      return this.starList[index].havelike ? "/static/like1.png" : "/static/like0.png";
    },
    likeClick(index) {
      const self = this;
      this.starList[index].havelike = !this.starList[index].havelike;
      if (this.starList[index].havelike) {
        this.starList[index].likeCount += 1;
        common_vendor.index.request({
          url: self.BaseURL + "comment/makelike/",
          method: "GET",
          data: {
            commentId: self.starList[index].commentId,
            account: self.$store.state.loginAccount
          }
        });
      } else {
        this.starList[index].likeCount -= 1;
        common_vendor.index.request({
          url: self.BaseURL + "comment/dislike/",
          method: "GET",
          data: {
            commentId: self.starList[index].commentId,
            account: self.$store.state.loginAccount
          }
        });
      }
    },
    clickStar(index) {
      this.$store.commit("getComment", this.starList[index].commentId);
      common_vendor.index.navigateTo({
        url: "/pages/comment/comment"
      });
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + "rpx";
      }
    });
    common_vendor.index.request({
      url: self.BaseURL + "star/get/",
      method: "GET",
      data: {
        account: self.$store.state.loginAccount
      },
      success(res) {
        self.starList = res.data.starList;
        console.log(self.starList);
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "4137bcf6": _ctx.screenHeightRpx
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
    a: common_vendor.f($data.starList, (star, index, i0) => {
      return {
        a: common_vendor.t($data.starList[index].content),
        b: common_vendor.t($data.starList[index].name),
        c: $options.likeImg(index),
        d: common_vendor.o(($event) => $options.likeClick(index), index),
        e: common_vendor.t($data.starList[index].likeCount),
        f: index,
        g: common_vendor.o(($event) => $options.clickStar(index), index)
      };
    }),
    b: common_vendor.n($data.contentClass),
    c: common_vendor.n($data.avatarClass),
    d: common_vendor.n($data.nicknameClass),
    e: common_vendor.n($data.likeClass),
    f: common_vendor.n($data.likeCountClass),
    g: common_vendor.n($data.informationDisplayClass),
    h: common_vendor.n($data.starBlockClass),
    i: common_vendor.n($data.backgroundClass),
    j: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/personEvaluation/personEvaluation.vue"]]);
wx.createPage(MiniProgramPage);
