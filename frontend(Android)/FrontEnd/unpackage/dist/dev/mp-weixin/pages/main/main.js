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
    const ScrollY = common_vendor.ref("true");
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
      if (store.state.lastPage == 1) {
        ModeChoose.value = "2";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ModeChoose.value == 1
      }, ModeChoose.value == 1 ? {
        b: ScrollY.value,
        c: ScrollTop.value,
        d: common_vendor.n(chooseBarClass2.value),
        e: common_vendor.n(chooseBarClass1.value),
        f: common_vendor.o(appClicked),
        g: common_vendor.n(chooseBarClass1.value),
        h: common_vendor.o(messClicked),
        i: common_vendor.n(chooseBarClass3.value),
        j: common_vendor.o(perClicked),
        k: common_vendor.n(BarClass.value)
      } : ModeChoose.value == 2 ? {
        m: ScrollY.value,
        n: ScrollTop.value,
        o: common_vendor.n(chooseBarClass1.value),
        p: common_vendor.o(priClicked),
        q: common_vendor.n(chooseBarClass2.value),
        r: common_vendor.n(chooseBarClass1.value),
        s: common_vendor.o(messClicked),
        t: common_vendor.n(chooseBarClass3.value),
        v: common_vendor.o(perClicked),
        w: common_vendor.n(BarClass.value)
      } : ModeChoose.value == 3 ? {
        y: ScrollY.value,
        z: ScrollTop.value,
        A: common_vendor.n(chooseBarClass1.value),
        B: common_vendor.o(priClicked),
        C: common_vendor.n(chooseBarClass1.value),
        D: common_vendor.o(appClicked),
        E: common_vendor.n(chooseBarClass2.value),
        F: common_vendor.n(chooseBarClass3.value),
        G: common_vendor.o(perClicked),
        H: common_vendor.n(BarClass.value)
      } : {
        I: ScrollY.value,
        J: ScrollTop.value,
        K: common_vendor.n(chooseBarClass1.value),
        L: common_vendor.o(priClicked),
        M: common_vendor.n(chooseBarClass1.value),
        N: common_vendor.o(appClicked),
        O: common_vendor.n(chooseBarClass1.value),
        P: common_vendor.o(messClicked),
        Q: common_vendor.n(chooseBarClass4.value),
        R: common_vendor.n(BarClass.value)
      }, {
        l: ModeChoose.value == 2,
        x: ModeChoose.value == 3
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/main.vue"]]);
wx.createPage(MiniProgramPage);
