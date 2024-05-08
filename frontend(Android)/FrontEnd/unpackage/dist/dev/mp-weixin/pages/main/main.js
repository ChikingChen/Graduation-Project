"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (common_vendor.unref(appointment) + common_vendor.unref(personality))();
}
const appointment = () => "./appointment.js";
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
    const ModeChoose = common_vendor.ref("4");
    common_vendor.ref("null");
    function appClicked() {
      ModeChoose.value = 2;
    }
    function perClicked() {
      ModeChoose.value = 4;
    }
    common_vendor.onMounted(() => {
      const store = common_vendor.useStore();
      if (store.state.lastPage == 1) {
        ModeChoose.value = "2";
      } else if (store.state.lastPage == "AppointmentDisplay") {
        ModeChoose.value = "4";
        common_vendor.index.navigateTo({
          url: "/pages/message/message"
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ModeChoose.value == 2
      }, ModeChoose.value == 2 ? {
        b: ScrollTop.value,
        c: common_vendor.n(chooseBarClass2.value),
        d: common_vendor.n(chooseBarClass3.value),
        e: common_vendor.o(perClicked),
        f: common_vendor.n(BarClass.value)
      } : {
        g: ScrollTop.value,
        h: common_vendor.n(chooseBarClass1.value),
        i: common_vendor.o(appClicked),
        j: common_vendor.n(chooseBarClass4.value),
        k: common_vendor.n(BarClass.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/main.vue"]]);
wx.createPage(MiniProgramPage);
