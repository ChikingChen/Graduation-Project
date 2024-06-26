"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      clinicId: null,
      clinic: null,
      doctorId: null,
      doctor: null,
      service: null,
      mark: 0,
      input: "",
      overallClass: "overall",
      clinicClass: "clinic",
      doctorClass: "doctor",
      serviceClass: "service",
      markClass: "mark",
      starClass: "star",
      contentClass: "content",
      textClass: "text",
      inputClass: "input",
      loginButtonClass: "loginButton",
      starList: []
    };
  },
  methods: {
    starClick(index) {
      this.mark = index + 1;
      this.starList = [];
      for (let i = 0; i <= index; i++)
        this.starList.push("/static/star1.png");
      for (let i = index + 1; i < 5; i++)
        this.starList.push("/static/star0.png");
    },
    sleep(time) {
      var timeStamp = (/* @__PURE__ */ new Date()).getTime();
      var endTime = timeStamp + time;
      while (true) {
        if ((/* @__PURE__ */ new Date()).getTime() > endTime)
          return;
      }
    },
    submmit() {
      const self = this;
      if (this.$store.state.evaluationMode == "modify") {
        common_vendor.index.request({
          url: self.BaseURL + "comment/modify/submmit/",
          method: "GET",
          data: {
            id: self.$store.state.appointmentId,
            comment: self.input,
            mark: self.mark
          },
          success(res) {
            common_vendor.index.showToast({
              title: "修改成功"
            });
            self.sleep(1e3);
            common_vendor.index.redirectTo({
              url: "/pages/evaluationDisplay/evaluationDisplay"
            });
            self.$store.commit("commentHaveModifiedAdd");
          }
        });
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "comment/submmit/",
          method: "GET",
          data: {
            id: self.$store.state.appointmentId,
            account: self.$store.state.loginAccount,
            comment: self.input,
            mark: self.mark
          },
          success(res) {
            common_vendor.index.showToast({
              title: "评价成功"
            });
            self.sleep(1e3);
            common_vendor.index.redirectTo({
              url: "/pages/evaluationDisplay/evaluationDisplay"
            });
          }
        });
      }
    }
  },
  mounted() {
    const self = this;
    if (this.$store.state.evaluationMode == "modify") {
      common_vendor.index.request({
        url: self.BaseURL + "comment/modify/information/",
        method: "GET",
        data: {
          appointmentId: self.$store.state.appointmentId
        },
        success(res) {
          self.clinicId = res.data.clinicId;
          self.clinic = res.data.clinic;
          self.doctorId = res.data.doctorId;
          self.doctor = res.data.doctor;
          self.service = res.data.service;
          self.input = res.data.input;
          self.starClick(res.data.mark - 1);
        }
      });
    } else {
      common_vendor.index.request({
        url: self.BaseURL + "comment/information/",
        method: "GET",
        data: {
          appointmentId: self.$store.state.appointmentId
        },
        success(res) {
          self.clinicId = res.data.clinicId;
          self.clinic = res.data.clinic;
          self.doctorId = res.data.doctorId;
          self.doctor = res.data.doctor;
          self.service = res.data.service;
        }
      });
    }
    for (let i = 0; i < 5; i++)
      self.starList.push("/static/star0.png");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t("诊所：  " + $data.clinic),
    b: common_vendor.n($data.clinicClass),
    c: common_vendor.t("医生：  " + $data.doctor),
    d: common_vendor.n($data.doctorClass),
    e: common_vendor.t("服务：  " + $data.service),
    f: common_vendor.n($data.serviceClass),
    g: common_vendor.t("分数："),
    h: common_vendor.f($data.starList, (star, index, i0) => {
      return {
        a: $data.starList[index],
        b: common_vendor.o(($event) => $options.starClick(index), index),
        c: index
      };
    }),
    i: common_vendor.n($data.starClass),
    j: common_vendor.n($data.markClass),
    k: common_vendor.n($data.textClass),
    l: common_vendor.o([($event) => $data.input = $event.detail.value, (...args) => _ctx.typein && _ctx.typein(...args)]),
    m: $data.input,
    n: common_vendor.t($data.input.length + "/140"),
    o: common_vendor.n($data.inputClass),
    p: common_vendor.n($data.contentClass),
    q: common_vendor.n($data.overallClass),
    r: common_vendor.n($data.loginButtonClass),
    s: common_vendor.o((...args) => $options.submmit && $options.submmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/evaluation/evaluation.vue"]]);
wx.createPage(MiniProgramPage);
