"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      backgroundClass: "background",
      BaseURL: common_vendor.inject("BaseURL"),
      nameBarClass: "nameBar",
      nameClass: "name",
      avatarClass: "avatar",
      evaluationDisplayClass: "evaluationDisplay",
      commentClass: "comment",
      chooseBarClass: "chooseBar",
      evaluationClass: "evaluation",
      clinicClass: "clinic",
      commentDisplayClass: "commentDisplay",
      dateClass: "date",
      starDisplayClass: "starDisplay",
      starClass: "star",
      account: null,
      commentList: null
    };
  },
  methods: {
    datecal(index) {
      return this.commentList[index].date.slice(5 + (this.commentList[index].date[5] == "0" ? 1 : 0), 7) + "月" + this.commentList[index].date.slice(8 + (this.commentList[index].date[8] == "0" ? 1 : 0), 10) + "日";
    },
    commentClick(index) {
      console.log(this.commentList[index]);
      this.$store.commit("getComment", this.commentList[index].id);
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
      url: self.BaseURL + "personality/initial/",
      method: "GET",
      data: {
        email: self.$store.state.account
      },
      success(res) {
        self.account = res.data.account;
        self.commentList = res.data.commentList;
        const len = self.commentList.length;
        for (let i = 0; i < len; i++) {
          self.commentList[i].starList = [];
          const mark = self.commentList[i].mark;
          for (let j = 0; j < mark; j++) {
            self.commentList[i].starList.push("/static/star1.png");
          }
          for (let j = mark; j < 5; j++) {
            self.commentList[i].starList.push("/static/star0.png");
          }
        }
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "4be0379d": _ctx.screenHeightRpx
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
    a: common_vendor.n($data.avatarClass),
    b: common_vendor.t($data.account.nickname),
    c: common_vendor.n($data.nameClass),
    d: common_vendor.n($data.nameBarClass),
    e: common_vendor.n($data.evaluationClass),
    f: common_vendor.n($data.chooseBarClass),
    g: common_vendor.f($data.commentList, (comment, index, i0) => {
      return {
        a: common_vendor.t($data.commentList[index].clinicName),
        b: common_vendor.t("发布于 " + $options.datecal(index)),
        c: common_vendor.f($data.commentList[index].starList, (star, index1, i1) => {
          return {
            a: star,
            b: index1
          };
        }),
        d: common_vendor.t($data.commentList[index].content),
        e: index,
        f: common_vendor.o(($event) => $options.commentClick(index), index)
      };
    }),
    h: common_vendor.n($data.clinicClass),
    i: common_vendor.n($data.dateClass),
    j: common_vendor.t("评分："),
    k: common_vendor.n($data.starClass),
    l: common_vendor.n($data.starDisplayClass),
    m: common_vendor.n($data.commentDisplayClass),
    n: common_vendor.n($data.commentClass),
    o: common_vendor.n($data.evaluationDisplayClass),
    p: common_vendor.n($data.backgroundClass),
    q: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/personPage/personPage.vue"]]);
wx.createPage(MiniProgramPage);
