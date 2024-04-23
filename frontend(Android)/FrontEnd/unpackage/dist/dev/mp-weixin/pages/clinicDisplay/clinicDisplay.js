"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      barClass: "bar",
      BaseURL: common_vendor.inject("BaseURL"),
      screenHeightRpx: "",
      name: "",
      location: "",
      locationClass: "location",
      nameClass: "name",
      displayClass: "display",
      serviceDisplayClass: "serviceDisplay",
      doctorDisplayClass: "doctorDisplay",
      backgroundClass: "background",
      doctorClass: "doctor",
      doctorBarClass: "doctorBar",
      arrowClass: "arrow",
      serviceList: [],
      doctorList: [],
      serviceClassList: [],
      idList: [],
      serviceIndex: 0
    };
  },
  methods: {
    serviceChoose(index) {
      this.serviceClassList[this.serviceIndex] = "serviceNotChoose";
      this.serviceIndex = index;
      this.serviceClassList[this.serviceIndex] = "serviceChoose";
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "clinic/getdoctor/",
        method: "GET",
        data: {
          clinic: self.$store.state.clinicId,
          service: self.serviceList[index]
        },
        success(res) {
          const doctorList = res.data.nameList;
          const idList = res.data.idList;
          const len = doctorList.length;
          self.doctorList = [];
          self.idList = [];
          for (let i = 0; i < len; i++) {
            self.doctorList.push(doctorList[i]);
            self.idList.push(idList[i]);
          }
        }
      });
      this.$store.commit("getService", this.serviceList[index]);
      console.log(this.serviceList[index]);
    },
    doctorChoose(index) {
      if (index == -1) {
        this.$store.commit("getDoctorID", "-1");
      } else {
        this.$store.commit("getDoctorID", this.idList[index]);
      }
      common_vendor.index.navigateTo({
        url: "/pages/AppointmentDisplay/AppointmentDisplay"
      });
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "clinic/initial/",
      method: "GET",
      data: {
        index: self.$store.state.clinicId
      },
      success(res) {
        self.name = res.data.name;
        self.location = res.data.location;
        const serviceList = res.data.serviceList;
        let len = serviceList.length;
        for (let i = 0; i < len; i++) {
          self.serviceList.push(serviceList[i]);
          self.serviceClassList.push("serviceNotChoose");
        }
        self.serviceClassList[self.serviceIndex] = "serviceChoose";
        const doctorList = res.data.nameList;
        const idList = res.data.idList;
        len = doctorList.length;
        self.doctorList = [];
        for (let i = 0; i < len; i++) {
          self.doctorList.push(doctorList[i]);
          self.idList.push(idList[i]);
        }
        self.$store.commit("getService", self.serviceList[0]);
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750);
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "85ae916a": _ctx.screenHeightRpx + "rpx",
    "3709458c": _ctx.screenHeightRpx
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
    a: common_vendor.t($data.name),
    b: common_vendor.n($data.nameClass),
    c: common_vendor.t("地址：" + $data.location),
    d: common_vendor.n($data.locationClass),
    e: common_vendor.n($data.barClass),
    f: common_vendor.f($data.serviceList, (service, index, i0) => {
      return {
        a: common_vendor.t(service),
        b: common_vendor.n($data.serviceClassList[index]),
        c: common_vendor.o(($event) => $options.serviceChoose(index), index),
        d: index
      };
    }),
    g: common_vendor.n($data.serviceDisplayClass),
    h: common_vendor.t("普通号"),
    i: common_vendor.n($data.doctorClass),
    j: common_vendor.o(($event) => $options.doctorChoose(-1)),
    k: common_vendor.n($data.arrowClass),
    l: common_vendor.n($data.doctorBarClass),
    m: common_vendor.f($data.doctorList, (doctor, index, i0) => {
      return {
        a: common_vendor.t(doctor),
        b: common_vendor.o(($event) => $options.doctorChoose(index), index),
        c: index
      };
    }),
    n: common_vendor.n($data.doctorClass),
    o: common_vendor.n($data.arrowClass),
    p: common_vendor.n($data.doctorBarClass),
    q: common_vendor.n($data.doctorDisplayClass),
    r: common_vendor.n($data.displayClass),
    s: common_vendor.n($data.backgroundClass),
    t: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/clinicDisplay/clinicDisplay.vue"]]);
wx.createPage(MiniProgramPage);
