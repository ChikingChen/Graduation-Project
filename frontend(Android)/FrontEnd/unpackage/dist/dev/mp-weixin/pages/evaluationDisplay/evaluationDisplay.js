"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      backgroundClass: "background",
      screenHeightRpx: "",
      BaseURL: common_vendor.inject("BaseURL"),
      AppointmentBlockClass: "AppointmentBlock",
      titleClass: "title",
      doctorClass: "doctor",
      clinicClass: "clinic",
      timeClass: "time",
      serviceClass: "service",
      evalClass: "eval",
      arrowClass1: "arrow1",
      arrowClass2: "arrow2",
      markClass: "mark",
      markDisplayClass: "markDisplay",
      starClass: "star",
      commentClass: "comment",
      contentClass: "content",
      idList: [],
      dateList: [],
      startList: [],
      endList: [],
      doctorIdList: [],
      clinicList: [],
      doctorNameList: [],
      serviceList: [],
      arrowList: [],
      starList: [],
      stageList: [],
      name: null,
      content: null,
      showIndex: -1,
      noEvaluation: ""
    };
  },
  methods: {
    clickEval(index) {
      this.$store.commit("getAppointment", this.idList[index]);
      common_vendor.index.redirectTo({
        url: "/pages/evaluation/evaluation"
      });
    },
    arrowClick(index) {
      const self = this;
      if (self.showIndex == index) {
        self.arrowList[index] = "/static/left.png";
        self.showIndex = -1;
        return;
      }
      if (self.stageList[index] == 2) {
        self.noEvaluation = "未评价";
        self.content = "";
        self.starList = [];
        self.arrowList[self.showIndex] = "/static/left.png";
        self.showIndex = index;
        self.arrowList[index] = "/static/down.png";
      } else {
        self.noEvaluation = "";
        common_vendor.index.request({
          url: self.BaseURL + "comment/get/",
          method: "GET",
          data: {
            appointmentId: self.idList[index]
          },
          success(res) {
            self.content = res.data.content;
            self.starList = [];
            const mark = res.data.mark;
            for (let i = 0; i < mark; i++)
              self.starList.push("/static/star1.png");
            for (let i = mark; i < 5; i++)
              self.starList.push("/static/star0.png");
          }
        });
        self.arrowList[self.showIndex] = "/static/left.png";
        self.showIndex = index;
        self.arrowList[index] = "/static/down.png";
      }
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
      url: self.BaseURL + "comment/appointment/",
      method: "GET",
      data: {
        patient: self.$store.state.loginAccount
      },
      success(res) {
        const idList = res.data.idList;
        const dateList = res.data.dateList;
        const startList = res.data.startList;
        const endList = res.data.endList;
        const doctorIdList = res.data.doctorIdList;
        const clinicList = res.data.clinicList;
        const doctorNameList = res.data.doctorNameList;
        const serviceList = res.data.serviceList;
        const stageList = res.data.stageList;
        const len = idList.length;
        for (let i = 0; i < len; i++) {
          self.idList.push(idList[i]);
          self.dateList.push(dateList[i].slice(dateList[i][5] == "0" ? 6 : 5, 7) + "月" + dateList[i].slice(8) + "日");
          self.startList.push(startList[i].slice(0, 5));
          self.endList.push(endList[i].slice(0, 5));
          self.doctorIdList.push(doctorIdList[i]);
          self.clinicList.push(clinicList[i]);
          self.doctorNameList.push(doctorNameList[i]);
          self.serviceList.push(serviceList[i]);
          self.arrowList.push("/static/left.png");
          self.stageList.push(stageList[i]);
        }
      }
    });
    common_vendor.index.request({
      url: self.BaseURL + "name/get/",
      method: "GET",
      data: {
        email: self.$store.state.loginAccount
      },
      success(res) {
        self.name = res.data.name;
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "7aae1bf8": _ctx.screenHeightRpx
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
    a: common_vendor.f($data.idList, (id, index, i0) => {
      return common_vendor.e({
        a: $data.arrowList[index],
        b: common_vendor.o(($event) => $options.arrowClick(index), index),
        c: common_vendor.t("诊所：  " + $data.clinicList[index]),
        d: common_vendor.t("医生：  " + $data.doctorNameList[index]),
        e: common_vendor.t("服务：  " + $data.serviceList[index]),
        f: common_vendor.t("时间：  " + $data.dateList[index] + "  " + $data.startList[index] + " -- " + $data.endList[index]),
        g: $data.showIndex == index
      }, $data.showIndex == index ? {
        h: common_vendor.t("分数：" + $data.noEvaluation),
        i: common_vendor.n($data.markClass),
        j: common_vendor.f($data.starList, (star, index2, i1) => {
          return {
            a: $data.starList[index2],
            b: index2
          };
        }),
        k: common_vendor.n($data.starClass),
        l: common_vendor.n($data.markDisplayClass)
      } : {}, {
        m: $data.showIndex == index
      }, $data.showIndex == index ? {
        n: common_vendor.t("评价：" + $data.noEvaluation),
        o: common_vendor.t($data.content),
        p: common_vendor.n($data.contentClass),
        q: common_vendor.n($data.commentClass)
      } : {}, {
        r: $data.stageList[index] == 2 && $data.showIndex == index
      }, $data.stageList[index] == 2 && $data.showIndex == index ? {
        s: common_vendor.t("评价"),
        t: common_vendor.n($data.arrowClass2),
        v: common_vendor.n($data.evalClass),
        w: common_vendor.o(($event) => $options.clickEval(index), index)
      } : {}, {
        x: index
      });
    }),
    b: common_vendor.t("就诊人：  " + $data.name),
    c: common_vendor.n($data.arrowClass1),
    d: common_vendor.n($data.titleClass),
    e: common_vendor.n($data.clinicClass),
    f: common_vendor.n($data.doctorClass),
    g: common_vendor.n($data.serviceClass),
    h: common_vendor.n($data.timeClass),
    i: common_vendor.n($data.AppointmentBlockClass),
    j: common_vendor.n($data.backgroundClass),
    k: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/evaluationDisplay/evaluationDisplay.vue"]]);
wx.createPage(MiniProgramPage);
