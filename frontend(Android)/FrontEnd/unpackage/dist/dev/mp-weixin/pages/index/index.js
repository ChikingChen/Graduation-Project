"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const baseURL = common_vendor.inject("baseURL");
    const valuelist = common_vendor.ref({
      loginClasspsw: "loginClass1",
      loginClasstele: "loginClass2",
      inputPlaceholder1: "请输入注册时的手机号",
      inputPlaceholder2: "请输入密码",
      inputClass1: "inputClass1",
      inputClass2: "inputClass2",
      inputValue1: "",
      inputValue2: "",
      getClass: "get",
      getShow: 0,
      loginStyle: "login",
      signinClass: "signinClass",
      inputMaxLength2: -1,
      inputPassword: 1
    });
    function psw() {
      valuelist.value.loginClasspsw = "loginClass1";
      valuelist.value.loginClasstele = "loginClass2";
      valuelist.value.inputPlaceholder2 = "请输入密码";
      valuelist.value.getShow = 0;
      valuelist.value.inputValue2 = "";
      valuelist.value.inputMaxLength2 = -1;
      valuelist.value.inputPassword = 1;
    }
    function tele() {
      valuelist.value.loginClasspsw = "loginClass3";
      valuelist.value.loginClasstele = "loginClass4";
      valuelist.value.inputPlaceholder2 = "请输入验证码";
      valuelist.value.getShow = 1;
      valuelist.value.inputValue2 = "";
      valuelist.value.inputMaxLength2 = 4;
      valuelist.value.inputPassword = 0;
    }
    function get() {
      console.log(valuelist.value.inputValue1);
      common_vendor.index.request({
        url: baseURL + "login/get/",
        method: "GET",
        data: {
          tele: valuelist.value.inputValue1
        },
        success: function(res) {
          console.log(res.data);
        },
        fail: function(res) {
          console.log("GET FAILED");
        }
      });
    }
    function login() {
      if (valuelist.value.getShow === 0) {
        common_vendor.index.request({
          url: baseURL + "login/psw/",
          method: "GET",
          data: {
            tele: valuelist.value.inputValue1,
            psw: valuelist.value.inputValue2
          },
          success: function(res) {
            console.log(res.data);
          },
          fail: function(res) {
            console.log(res);
            console.log("LOGIN FAILED");
          }
        });
      } else {
        common_vendor.index.request({
          url: baseURL + "login/tele/",
          method: "GET",
          data: {
            tele: valuelist.value.inputValue1,
            code: valuelist.value.inputValue2
          },
          success: function(res) {
            console.log(res.data);
          },
          fail: function(res) {
            console.log("LOGIN FAILED");
          }
        });
      }
    }
    function signin() {
      console.log("signin");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !valuelist.value.getShow
      }, !valuelist.value.getShow ? {
        b: common_vendor.n(valuelist.value.loginClasspsw),
        c: common_vendor.o(psw),
        d: common_vendor.n(valuelist.value.loginClasstele),
        e: common_vendor.o(tele),
        f: common_vendor.n(valuelist.value.inputClass1),
        g: valuelist.value.inputPlaceholder1,
        h: valuelist.value.inputValue1,
        i: common_vendor.o(($event) => valuelist.value.inputValue1 = $event.detail.value),
        j: common_vendor.n(valuelist.value.inputClass2),
        k: valuelist.value.inputPlaceholder2,
        l: valuelist.value.inputMaxLength2,
        m: valuelist.value.inputPassword,
        n: valuelist.value.inputValue2,
        o: common_vendor.o(($event) => valuelist.value.inputValue2 = $event.detail.value),
        p: common_vendor.n(valuelist.value.loginStyle),
        q: common_vendor.o(login),
        r: common_vendor.n(valuelist.value.signinClass),
        s: common_vendor.o(signin)
      } : {
        t: common_vendor.n(valuelist.value.loginClasspsw),
        v: common_vendor.o(psw),
        w: common_vendor.n(valuelist.value.loginClasstele),
        x: common_vendor.o(tele),
        y: common_vendor.n(valuelist.value.inputClass1),
        z: valuelist.value.inputPlaceholder1,
        A: valuelist.value.inputValue1,
        B: common_vendor.o(($event) => valuelist.value.inputValue1 = $event.detail.value),
        C: common_vendor.n(valuelist.value.inputClass2),
        D: valuelist.value.inputPlaceholder2,
        E: valuelist.value.inputMaxLength2,
        F: valuelist.value.inputPassword,
        G: valuelist.value.inputValue2,
        H: common_vendor.o(($event) => valuelist.value.inputValue2 = $event.detail.value),
        I: common_vendor.o(get),
        J: common_vendor.n(valuelist.value.getClass),
        K: common_vendor.n(valuelist.value.loginStyle),
        L: common_vendor.o(login),
        M: common_vendor.n(valuelist.value.signinClass),
        N: common_vendor.o(signin)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
