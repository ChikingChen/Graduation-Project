"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const BaseURL = common_vendor.inject("BaseURL");
    const LoginMode = common_vendor.ref(true);
    const OverallDisplay = common_vendor.ref("col1");
    const LoginChooseDisplay = common_vendor.ref("row1");
    const CodeDisplay = common_vendor.ref("row2");
    const LoginChooseClass = common_vendor.ref({
      PasswordLogin: "loginChooseClass1",
      CodeLogin: "loginChooseClass2"
    });
    const LoginButtonClass = common_vendor.ref("loginButtonClass1");
    const InputValue = common_vendor.ref({
      InputBox1: "",
      InputBox2: ""
    });
    const InputClass = common_vendor.ref({
      InputBox1: "inputClass1",
      InputBox2: "inputClass1"
    });
    const InputPlaceHolder = common_vendor.ref({
      InputBox1: "请输入手机号",
      InputBox2: "请输入密码"
    });
    const ErrorShow = common_vendor.ref({
      ErrorBox1: "",
      ErrorBox2: ""
    });
    const ErrorClass = common_vendor.ref({
      ErrorBox1: "errorClass",
      ErrorBox2: "errorClass"
    });
    const GetClass = common_vendor.ref("get1");
    const SigninClass = common_vendor.ref("signin");
    function CodeChoose() {
      LoginMode.value = false;
      LoginChooseClass.value.PasswordLogin = "loginChooseClass3";
      LoginChooseClass.value.CodeLogin = "loginChooseClass4";
      ErrorShow.value.ErrorBox1 = "";
      ErrorShow.value.ErrorBox2 = "";
      InputPlaceHolder.value.InputBox2 = "请输入验证码";
      InputClass.value.InputBox2 = "inputClass3";
      InputValue.value.InputBox2 = "";
      LoginButtonClass.value = "loginButtonClass1";
      GetClass.value = "get1";
    }
    function PswChoose() {
      LoginMode.value = true;
      LoginChooseClass.value.PasswordLogin = "loginChooseClass1";
      LoginChooseClass.value.CodeLogin = "loginChooseClass2";
      ErrorShow.value.ErrorBox1 = "";
      ErrorShow.value.ErrorBox2 = "";
      InputPlaceHolder.value.InputBox2 = "请输入密码";
      InputClass.value.InputBox2 = "inputClass1";
      InputValue.value.InputBox2 = "";
      LoginButtonClass.value = "loginButtonClass1";
      GetClass.value = "get1";
    }
    function login() {
      if (LoginMode.value) {
        common_vendor.index.request({
          url: BaseURL + "login/psw/",
          method: "GET",
          data: {
            tele: InputValue.value.InputBox1,
            psw: InputValue.value.InputBox2
          },
          success: function(res) {
            const back = res.data;
            console.log(back);
            if (back == "LEN ERROR." || back == "TELE ERROR.") {
              ErrorShow.value.ErrorBox1 = "手机号错误";
              ErrorShow.value.ErrorBox2 = "";
              InputClass.value.InputBox2 = "inputClass2";
              LoginButtonClass.value = "loginButtonClass1";
            } else if (back == "PSW ERROR.") {
              ErrorShow.value.ErrorBox1 = "";
              ErrorShow.value.ErrorBox2 = "密码错误";
              InputClass.value.InputBox2 = "inputClass1";
              LoginButtonClass.value = "loginButtonClass2";
            }
          },
          fail: function(res) {
            console.log("LOGIN FAILED.");
          }
        });
      } else {
        common_vendor.index.request({
          url: BaseURL + "login/tele/",
          method: "GET",
          data: {
            tele: InputValue.value.InputBox1,
            psw: InputValue.value.InputBox2
          },
          success: function(res) {
            const back = res.data;
            console.log(back);
            if (back == "LEN ERROR." || back == "TELE ERROR.") {
              ErrorShow.value.ErrorBox1 = "手机号错误";
              ErrorShow.value.ErrorBox2 = "";
              InputClass.value.InputBox2 = "inputClass4";
              GetClass.value = "get2";
              LoginButtonClass.value = "loginButtonClass1";
            } else if (back == "CODE ERROR.") {
              ErrorShow.value.ErrorBox1 = "";
              ErrorShow.value.ErrorBox2 = "验证码错误";
              InputClass.value.InputBox2 = "inputClass3";
              GetClass.value = "get1";
              LoginButtonClass.value = "loginButtonClass2";
            }
          },
          fail: function(res) {
            console.log("LOGIN FAILED.");
          }
        });
      }
    }
    function signin() {
      common_vendor.index.navigateTo({
        url: "/pages/signin/signin"
      });
    }
    function get() {
      common_vendor.index.request({
        url: BaseURL + "login/get/",
        method: "GET",
        data: {
          tele: InputValue.value.InputBox1
        },
        success: function(res) {
          const back = res.data;
          if (back == "LEN ERROR." || back == "TELE ERROR.") {
            ErrorShow.value.ErrorBox1 = "手机号错误";
            ErrorShow.value.ErrorBox2 = "";
            InputClass.value.InputBox2 = "inputClass4";
            GetClass.value = "get2";
            LoginButtonClass.value = "loginButtonClass1";
          }
        },
        fail: function(res) {
          console.log("LOGIN FAILED.");
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: LoginMode.value
      }, LoginMode.value ? {
        b: common_vendor.n(LoginChooseClass.value.PasswordLogin),
        c: common_vendor.n(LoginChooseClass.value.CodeLogin),
        d: common_vendor.o(CodeChoose),
        e: common_vendor.n(LoginChooseDisplay.value),
        f: common_vendor.n(InputClass.value.InputBox1),
        g: InputPlaceHolder.value.InputBox1,
        h: InputValue.value.InputBox1,
        i: common_vendor.o(($event) => InputValue.value.InputBox1 = $event.detail.value),
        j: common_vendor.t(ErrorShow.value.ErrorBox1),
        k: common_vendor.n(ErrorClass.value.ErrorBox1),
        l: common_vendor.n(InputClass.value.InputBox2),
        m: InputPlaceHolder.value.InputBox2,
        n: InputValue.value.InputBox2,
        o: common_vendor.o(($event) => InputValue.value.InputBox2 = $event.detail.value),
        p: common_vendor.t(ErrorShow.value.ErrorBox2),
        q: common_vendor.n(ErrorClass.value.ErrorBox2),
        r: common_vendor.n(LoginButtonClass.value),
        s: common_vendor.o(login),
        t: common_vendor.n(SigninClass.value),
        v: common_vendor.o(signin),
        w: common_vendor.n(OverallDisplay.value)
      } : {
        x: common_vendor.n(LoginChooseClass.value.PasswordLogin),
        y: common_vendor.o(PswChoose),
        z: common_vendor.n(LoginChooseClass.value.CodeLogin),
        A: common_vendor.n(LoginChooseDisplay.value),
        B: common_vendor.n(InputClass.value.InputBox1),
        C: InputPlaceHolder.value.InputBox1,
        D: InputValue.value.InputBox1,
        E: common_vendor.o(($event) => InputValue.value.InputBox1 = $event.detail.value),
        F: common_vendor.t(ErrorShow.value.ErrorBox1),
        G: common_vendor.n(ErrorClass.value.ErrorBox1),
        H: common_vendor.n(InputClass.value.InputBox2),
        I: InputPlaceHolder.value.InputBox2,
        J: InputValue.value.InputBox2,
        K: common_vendor.o(($event) => InputValue.value.InputBox2 = $event.detail.value),
        L: common_vendor.t(ErrorShow.value.ErrorBox2),
        M: common_vendor.n(ErrorClass.value.ErrorBox2),
        N: common_vendor.n(GetClass.value),
        O: common_vendor.o(get),
        P: common_vendor.n(CodeDisplay.value),
        Q: common_vendor.n(LoginButtonClass.value),
        R: common_vendor.o(login),
        S: common_vendor.n(SigninClass.value),
        T: common_vendor.o(signin),
        U: common_vendor.n(OverallDisplay.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
