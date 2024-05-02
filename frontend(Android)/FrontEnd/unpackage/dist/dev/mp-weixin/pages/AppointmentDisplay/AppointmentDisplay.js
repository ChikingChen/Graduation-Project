"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      backgroundClass: "background",
      screenHeightRpx: "0rpx",
      doctorId: null,
      barClass: "bar",
      informationDisplayClass: "informationDisplay",
      pictureClass: "picture",
      introductionDisplayClass: "introductionDisplay",
      appointmentDisplayClass: "appointmentDisplay",
      titleClass: "title",
      nameClass: "name",
      ageClass: "age",
      eduClass: "edu",
      introductionClass: "introduction",
      dateClass: "date",
      appointmentChooseDisplayClass: "appointmentChooseDisplay",
      name: null,
      age: null,
      edu: null,
      introduction: null,
      datelist: null,
      appointmentlist: null,
      appointmentClassList: null,
      usedList: null
    };
  },
  methods: {
    getAppointment(index1, index2) {
      if (this.usedList[index1][index2] == true)
        return;
      const self = this;
      if (self.$store.state.doctorId != -1) {
        common_vendor.index.request({
          url: self.BaseURL + "appointment/make1/",
          method: "GET",
          data: {
            clinic: self.$store.state.clinicId,
            doctor: self.$store.state.doctorId,
            date: self.datelist[index1],
            starttime: self.appointmentlist[index1][index2].slice(0, 5),
            endtime: self.appointmentlist[index1][index2].slice(7),
            account: self.$store.state.loginAccount,
            service: self.$store.state.service
          },
          success(res) {
            self.$store.commit("getLastPage", "AppointmentDisplay");
            common_vendor.index.showToast({
              title: "预约成功",
              success() {
                common_vendor.index.reLaunch({
                  url: "/pages/main/main"
                });
              }
            });
          }
        });
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "appointment/make2/",
          method: "GET",
          data: {
            clinic: self.$store.state.clinicId,
            date: self.datelist[index1],
            starttime: self.appointmentlist[index1][index2].slice(0, 5),
            endtime: self.appointmentlist[index1][index2].slice(7),
            account: self.$store.state.loginAccount,
            service: self.$store.state.service
          },
          success(res) {
            self.$store.commit("getLastPage", "AppointmentDisplay");
            common_vendor.index.showToast({
              title: "预约成功",
              success() {
                common_vendor.index.reLaunch({
                  url: "/pages/main/main"
                });
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    const self = this;
    self.doctorId = self.$store.state.doctorId;
    if (self.$store.state.doctorId != -1) {
      common_vendor.index.request({
        url: self.BaseURL + "appointment/display/initial1/",
        methods: "GET",
        data: {
          clinic: self.$store.state.clinicId,
          doctor: self.$store.state.doctorId
        },
        success(res) {
          self.name = res.data.name;
          self.age = res.data.age;
          self.edu = res.data.edu;
          self.title = res.data.title;
          self.introduction = res.data.introduction;
          self.datelist = [];
          self.appointmentlist = [];
          self.appointmentClassList = [];
          self.usedList = [];
          const datelist = res.data.datelist;
          const appointmentlist = res.data.appointmentlist;
          const usedlist = res.data.usedlist;
          const len = datelist.length;
          for (let i = 0; i < len; i++) {
            self.datelist.push(datelist[i]);
            let appointment = [];
            let appointmentClass = [];
            let used = [];
            const len1 = appointmentlist[i].length;
            for (let j = 0; j < len1; j++) {
              appointment.push(appointmentlist[i][j][0].slice(0, 5) + "--" + appointmentlist[i][j][1].slice(0, 5));
              appointmentClass.push(usedlist[i][j] ? "appointmentClassB" : "appointmentClassA");
              used.push(usedlist[i][j]);
            }
            self.appointmentlist.push(appointment);
            self.appointmentClassList.push(appointmentClass);
            self.usedList.push(used);
          }
        }
      });
    } else {
      common_vendor.index.request({
        url: self.BaseURL + "appointment/display/initial2/",
        methods: "GET",
        data: {
          clinic: self.$store.state.clinicId,
          service: self.$store.state.service
        },
        success(res) {
          self.datelist = [];
          self.appointmentlist = [];
          self.appointmentClassList = [];
          self.usedList = [];
          const datelist = res.data.datelist;
          const appointmentlist = res.data.appointmentlist;
          const len = datelist.length;
          for (let i = 0; i < len; i++) {
            self.datelist.push(datelist[i]);
            let appointment = [];
            let appointmentClass = [];
            let used = [];
            const len1 = appointmentlist[i].length;
            for (let j = 0; j < len1; j++) {
              appointment.push(appointmentlist[i][j][0].slice(0, 5) + "--" + appointmentlist[i][j][1].slice(0, 5));
              appointmentClass.push("appointmentClassA");
              used.push(false);
            }
            self.appointmentlist.push(appointment);
            self.appointmentClassList.push(appointmentClass);
            self.usedList.push(used);
          }
        }
      });
    }
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "54a1c1a0": _ctx.screenHeightRpx
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
    a: common_vendor.t("预约"),
    b: common_vendor.n($data.titleClass),
    c: common_vendor.n($data.barClass),
    d: $data.doctorId != -1
  }, $data.doctorId != -1 ? {
    e: common_vendor.n($data.pictureClass),
    f: common_vendor.t($data.name),
    g: common_vendor.n($data.nameClass),
    h: common_vendor.t($data.age + "岁"),
    i: common_vendor.n($data.ageClass),
    j: common_vendor.t(_ctx.title + " / " + $data.edu),
    k: common_vendor.n($data.eduClass),
    l: common_vendor.t("简介：" + $data.introduction),
    m: common_vendor.n($data.introductionClass),
    n: common_vendor.n($data.introductionDisplayClass),
    o: common_vendor.n($data.informationDisplayClass)
  } : {}, {
    p: common_vendor.f($data.datelist, (date, index1, i0) => {
      return {
        a: common_vendor.t(date),
        b: common_vendor.f($data.appointmentlist[index1], (appointment, index2, i1) => {
          return {
            a: common_vendor.t(appointment),
            b: common_vendor.n($data.appointmentClassList[index1][index2]),
            c: common_vendor.o(($event) => $options.getAppointment(index1, index2))
          };
        }),
        c: index1
      };
    }),
    q: common_vendor.n($data.appointmentChooseDisplayClass),
    r: common_vendor.n($data.dateClass),
    s: common_vendor.n($data.appointmentDisplayClass),
    t: common_vendor.n($data.backgroundClass),
    v: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/AppointmentDisplay/AppointmentDisplay.vue"]]);
wx.createPage(MiniProgramPage);
