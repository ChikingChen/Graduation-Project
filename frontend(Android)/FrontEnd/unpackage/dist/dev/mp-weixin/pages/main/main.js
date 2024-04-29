"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (common_vendor.unref(home) + common_vendor.unref(appointment) + common_vendor.unref(message) + common_vendor.unref(personality))();
}
const appointment = () => "./appointment.js";
const home = () => "./home.js";
const message = () => "./message.js";
const personality = () => "./personality.js";
const _sfc_main = {
  __name: "main",
  setup(__props) {
    common_vendor.ref("true");
    common_vendor.ref("scrollClass");
    const ScrollTop = common_vendor.ref("0");
    const BarClass = common_vendor.ref("barClass");
    const chooseBarClass1 = common_vendor.ref("chooseBarClass1");
    const chooseBarClass2 = common_vendor.ref("chooseBarClass2");
    const chooseBarClass3 = common_vendor.ref("chooseBarClass3");
    const chooseBarClass4 = common_vendor.ref("chooseBarClass4");
    const ModeChoose = common_vendor.ref("1");
    common_vendor.ref("null");
    function priClicked() {
      ModeChoose.value = 1;
    }
    function appClicked() {
      ModeChoose.value = 2;
    }
    function messClicked() {
      ModeChoose.value = 3;
    }
    function perClicked() {
      ModeChoose.value = 4;
    }
    common_vendor.onMounted(() => {
      const store = common_vendor.useStore();
      console.log(store.state.lastPage);
      if (store.state.lastPage == 1) {
        ModeChoose.value = "2";
      } else if (store.state.lastPage == "AppointmentDisplay") {
        ModeChoose.value = "3";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ModeChoose.value == 1
      }, ModeChoose.value == 1 ? {
        b: ScrollTop.value,
        c: common_vendor.n(chooseBarClass2.value),
        d: common_vendor.n(chooseBarClass1.value),
        e: common_vendor.o(appClicked),
        f: common_vendor.n(chooseBarClass1.value),
        g: common_vendor.o(messClicked),
        h: common_vendor.n(chooseBarClass3.value),
        i: common_vendor.o(perClicked),
        j: common_vendor.n(BarClass.value)
      } : ModeChoose.value == 2 ? {
        l: ScrollTop.value,
        m: common_vendor.n(chooseBarClass1.value),
        n: common_vendor.o(priClicked),
        o: common_vendor.n(chooseBarClass2.value),
        p: common_vendor.n(chooseBarClass1.value),
        q: common_vendor.o(messClicked),
        r: common_vendor.n(chooseBarClass3.value),
        s: common_vendor.o(perClicked),
        t: common_vendor.n(BarClass.value)
      } : ModeChoose.value == 3 ? {
        w: ScrollTop.value,
        x: common_vendor.n(chooseBarClass1.value),
        y: common_vendor.o(priClicked),
        z: common_vendor.n(chooseBarClass1.value),
        A: common_vendor.o(appClicked),
        B: common_vendor.n(chooseBarClass2.value),
        C: common_vendor.n(chooseBarClass3.value),
        D: common_vendor.o(perClicked),
        E: common_vendor.n(BarClass.value)
      } : {
        F: ScrollTop.value,
        G: common_vendor.n(chooseBarClass1.value),
        H: common_vendor.o(priClicked),
        I: common_vendor.n(chooseBarClass1.value),
        J: common_vendor.o(appClicked),
        K: common_vendor.n(chooseBarClass1.value),
        L: common_vendor.o(messClicked),
        M: common_vendor.n(chooseBarClass4.value),
        N: common_vendor.n(BarClass.value)
      }, {
        k: ModeChoose.value == 2,
        v: ModeChoose.value == 3
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/main.vue"]]);
wx.createPage(MiniProgramPage);
