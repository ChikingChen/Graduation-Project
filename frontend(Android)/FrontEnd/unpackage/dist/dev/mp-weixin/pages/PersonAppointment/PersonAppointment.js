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
      stageClass: "stage",
      serviceClass: "service",
      evalClass: "eval",
      arrowClass: "arrow",
      idList: [],
      dateList: [],
      startList: [],
      endList: [],
      doctorIdList: [],
      clinicList: [],
      doctorNameList: [],
      serviceList: [],
      stageList: [],
      name: null
    };
  },
  methods: {
    clickEval(index) {
      this.$store.commit("getAppointment", this.idList[index]);
      common_vendor.index.redirectTo({
        url: "/pages/evaluation/evaluation"
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
      url: self.BaseURL + "appointment/get/",
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
          self.stageList.push(stageList[i]);
          self.serviceList.push(serviceList[i]);
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
    "8fffefa0": _ctx.screenHeightRpx
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
        a: common_vendor.t($data.stageList[index]),
        b: common_vendor.t("诊所：  " + $data.clinicList[index]),
        c: common_vendor.t("医生：  " + $data.doctorNameList[index]),
        d: common_vendor.t("服务：  " + $data.serviceList[index]),
        e: common_vendor.t("时间：  " + $data.dateList[index] + "  " + $data.startList[index] + " -- " + $data.endList[index]),
        f: $data.stageList[index] == "未评价"
      }, $data.stageList[index] == "未评价" ? {
        g: common_vendor.t("评价"),
        h: common_vendor.n($data.arrowClass),
        i: common_vendor.n($data.evalClass),
        j: common_vendor.o(($event) => $options.clickEval(index), index)
      } : {}, {
        k: index
      });
    }),
    b: common_vendor.t("就诊人：  " + $data.name),
    c: common_vendor.n($data.stageClass),
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/PersonAppointment/PersonAppointment.vue"]]);
wx.createPage(MiniProgramPage);
