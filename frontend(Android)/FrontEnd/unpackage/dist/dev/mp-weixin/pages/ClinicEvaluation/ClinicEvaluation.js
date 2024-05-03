"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      screenHeightRpx: "",
      backgroundClass: "background",
      barClass: "bar",
      titleClass: "title",
      nameClass: "name",
      commentClass: "comment",
      informationBarClass: "informationBar",
      avatarClass: "avatar",
      commitClass: "commit",
      nicknameClass: "nickname",
      timeClass: "time",
      contentClass: "content",
      arrowClass: "arrow",
      chooseDisplayClass: "chooseDisplay",
      buttonClass: "button",
      countClass: "count",
      searchDisplayClass: "searchDisplay",
      searchButtonClass: "searchButton",
      hintClass: "hint",
      noCmpClass: "noCmp",
      dataList: null,
      showList: [],
      name: null,
      input: "",
      searchBarClass: "searchBar"
    };
  },
  methods: {
    date(index) {
      if (this.showList[index].time[5] == "0")
        return this.showList[index].time.slice(6, 7) + "月" + this.showList[index].time.slice(8, 10) + "日";
      else
        return this.showList[index].time.slice(5, 7) + "月" + this.showList[index].time.slice(8, 10) + "日";
    },
    arrowClick(index) {
      this.$store.commit("getComment", this.showList[index].id);
      common_vendor.index.navigateTo({
        url: "/pages/comment/comment"
      });
    },
    likeImg(index) {
      return this.showList[index].haveLike ? "/static/like1.png" : "/static/like0.png";
    },
    starImg(index) {
      return this.showList[index].starLike ? "/static/star1.png" : "/static/star0.png";
    },
    likeClick(index) {
      const self = this;
      if (this.showList[index].haveLike) {
        common_vendor.index.request({
          url: self.BaseURL + "comment/dislike/",
          method: "GET",
          data: {
            commentId: self.showList[index].id,
            account: self.$store.state.loginAccount
          },
          success() {
            self.showList[index].haveLike = false;
            self.showList[index].likeCount -= 1;
          }
        });
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "comment/makelike/",
          method: "GET",
          data: {
            commentId: self.showList[index].id,
            account: self.$store.state.loginAccount
          },
          success() {
            self.showList[index].haveLike = true;
            self.showList[index].likeCount += 1;
          }
        });
      }
    },
    starClick(index) {
      const self = this;
      if (this.showList[index].starLike) {
        common_vendor.index.request({
          url: self.BaseURL + "comment/disstar/",
          method: "GET",
          data: {
            commentId: self.showList[index].id,
            account: self.$store.state.loginAccount
          },
          success() {
            self.showList[index].starLike = false;
            self.showList[index].starCount -= 1;
          }
        });
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "comment/makestar/",
          method: "GET",
          data: {
            commentId: self.showList[index].id,
            account: self.$store.state.loginAccount
          },
          success() {
            self.showList[index].starLike = true;
            self.showList[index].starCount += 1;
          }
        });
      }
    },
    informationClick(index) {
      this.$store.commit("getAccount", this.showList[index].committerAccount);
      common_vendor.index.navigateTo({
        url: "/pages/personPage/personPage"
      });
    },
    search() {
      if (this.input == "") {
        this.showList = this.dataList;
        return;
      }
      this.showList = this.dataList.filter((val) => {
        return val.doctor == this.input || val.service == this.input;
      });
      const len = this.showList.length;
      for (let i = 0; i < len; i++) {
        if (this.showList[i].doctor == this.input) {
          this.showList[i].hint = "医生：" + this.input;
        } else {
          this.showList[i].hint = "服务：" + this.input;
        }
      }
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "comment/clinic/",
      method: "GET",
      data: {
        clinicId: self.$store.state.clinicId,
        account: self.$store.state.loginAccount
      },
      success(res) {
        self.showList = res.data.commentList;
        self.dataList = res.data.commentList;
        self.name = res.data.name;
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + "rpx";
      }
    });
  },
  watch: {
    "$store.state.deleteSignal": {
      handler: function(newVal, oldVal) {
        console.log(123);
        const self = this;
        common_vendor.index.request({
          url: self.BaseURL + "comment/clinic/",
          method: "GET",
          data: {
            clinicId: self.$store.state.clinicId,
            account: self.$store.state.loginAccount
          },
          success(res) {
            self.showList = res.data.commentList;
            self.dataList = res.data.commentList;
            self.name = res.data.name;
          }
        });
      }
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "753b9cb8": _ctx.screenHeightRpx
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.titleClass),
    b: common_vendor.t($data.name),
    c: common_vendor.n($data.nameClass),
    d: common_vendor.n($data.barClass),
    e: common_vendor.n($data.searchBarClass),
    f: $data.input,
    g: common_vendor.o(($event) => $data.input = $event.detail.value),
    h: common_vendor.n($data.searchButtonClass),
    i: common_vendor.o((...args) => $options.search && $options.search(...args)),
    j: common_vendor.n($data.searchDisplayClass),
    k: common_vendor.f($data.showList, (comment, index, i0) => {
      return {
        a: common_vendor.t($data.showList[index].committerName),
        b: common_vendor.t($options.date(index)),
        c: common_vendor.o(($event) => $options.arrowClick(index), index),
        d: common_vendor.o(($event) => $options.informationClick(index), index),
        e: common_vendor.t($data.showList[index].hint),
        f: common_vendor.t($data.showList[index].content),
        g: $options.likeImg(index),
        h: common_vendor.o(($event) => $options.likeClick(index), index),
        i: common_vendor.t($data.showList[index].likeCount),
        j: $options.starImg(index),
        k: common_vendor.o(($event) => $options.starClick(index), index),
        l: common_vendor.t($data.showList[index].starCount),
        m: index
      };
    }),
    l: common_vendor.n($data.avatarClass),
    m: common_vendor.n($data.nicknameClass),
    n: common_vendor.n($data.timeClass),
    o: common_vendor.n($data.commitClass),
    p: common_vendor.n($data.arrowClass),
    q: common_vendor.n($data.informationBarClass),
    r: common_vendor.n($data.hintClass),
    s: common_vendor.n($data.contentClass),
    t: common_vendor.n($data.buttonClass),
    v: common_vendor.n($data.countClass),
    w: common_vendor.n($data.buttonClass),
    x: common_vendor.n($data.countClass),
    y: common_vendor.n($data.chooseDisplayClass),
    z: common_vendor.n($data.commentClass),
    A: $data.showList.length == 0
  }, $data.showList.length == 0 ? {
    B: common_vendor.n($data.noCmpClass)
  } : {}, {
    C: common_vendor.n($data.backgroundClass),
    D: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/ClinicEvaluation/ClinicEvaluation.vue"]]);
wx.createPage(MiniProgramPage);
