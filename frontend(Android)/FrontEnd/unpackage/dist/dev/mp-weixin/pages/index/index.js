"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      LoginMode: true,
      OverallDisplay: "col1",
      LoginChooseDisplay: "row1",
      CodeDisplay: "row2",
      LoginChooseClass: {
        PasswordLogin: "loginChooseClass1",
        CodeLogin: "loginChooseClass2"
      },
      LoginButtonClass: "loginButtonClass1",
      InputValue: {
        InputBox1: "",
        InputBox2: ""
      },
      InputClass: {
        InputBox1: "inputClass1",
        InputBox2: "inputClass1"
      },
      InputPlaceHolder: {
        InputBox1: "请输入邮箱号",
        InputBox2: "请输入密码"
      },
      ErrorShow: {
        ErrorBox1: "",
        ErrorBox2: ""
      },
      ErrorClass: {
        ErrorBox1: "errorClass",
        ErrorBox2: "errorClass"
      },
      GetClass: "get1",
      SigninClass: "signin",
      BaseURL: common_vendor.inject("BaseURL")
    };
  },
  setup() {
  },
  methods: {
    CodeChoose() {
      this.LoginMode = false;
      this.LoginChooseClass.PasswordLogin = "loginChooseClass3";
      this.LoginChooseClass.CodeLogin = "loginChooseClass4";
      this.ErrorShow.ErrorBox1 = "";
      this.ErrorShow.ErrorBox2 = "";
      this.InputPlaceHolder.InputBox2 = "请输入验证码";
      this.InputClass.InputBox2 = "inputClass3";
      this.InputValue.InputBox2 = "";
      this.LoginButtonClass = "loginButtonClass1";
      this.GetClass = "get1";
    },
    PswChoose() {
      this.LoginMode = true;
      this.LoginChooseClass.PasswordLogin = "loginChooseClass1";
      this.LoginChooseClass.CodeLogin = "loginChooseClass2";
      this.ErrorShow.ErrorBox1 = "";
      this.ErrorShow.ErrorBox2 = "";
      this.InputPlaceHolder.InputBox2 = "请输入密码";
      this.InputClass.InputBox2 = "inputClass1";
      this.InputValue.InputBox2 = "";
      this.LoginButtonClass = "loginButtonClass1";
      this.GetClass = "get1";
    },
    AccountLogin(self) {
      this.$store.commit("login", self.InputValue.InputBox1);
    },
    login() {
      const self = this;
      if (self.LoginMode) {
        common_vendor.index.request({
          url: self.BaseURL + "login/psw/",
          method: "GET",
          data: {
            email: self.InputValue.InputBox1,
            psw: self.InputValue.InputBox2
          },
          success: function(res) {
            const back = res.data;
            console.log(back);
            if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
              self.ErrorShow.ErrorBox1 = "邮箱号错误";
              self.ErrorShow.ErrorBox2 = "";
              self.InputClass.InputBox2 = "inputClass2";
              self.LoginButtonClass = "loginButtonClass1";
            } else if (back == "PSW ERROR.") {
              self.ErrorShow.ErrorBox1 = "";
              self.ErrorShow.ErrorBox2 = "密码错误";
              self.InputClass.InputBox2 = "inputClass1";
              self.LoginButtonClass = "loginButtonClass2";
            } else {
              self.AccountLogin(self);
              common_vendor.index.redirectTo({
                url: "/pages/main/main"
              });
            }
          },
          fail: function(res) {
            console.log("LOGIN FAILED.");
          }
        });
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "login/email/",
          method: "GET",
          data: {
            email: self.InputValue.InputBox1,
            code: self.InputValue.InputBox2
          },
          success: function(res) {
            const back = res.data;
            console.log(back);
            if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
              self.ErrorShow.ErrorBox1 = "邮箱号错误";
              self.ErrorShow.ErrorBox2 = "";
              self.InputClass.InputBox2 = "inputClass4";
              self.GetClass = "get2";
              self.LoginButtonClass = "loginButtonClass1";
            } else if (back == "CODE ERROR.") {
              self.ErrorShow.ErrorBox1 = "";
              self.ErrorShow.ErrorBox2 = "验证码错误";
              self.InputClass.InputBox2 = "inputClass3";
              self.GetClass = "get1";
              self.LoginButtonClass = "loginButtonClass2";
            } else {
              self.AccountLogin(self);
              common_vendor.index.redirectTo({
                url: "/pages/main/main"
              });
            }
          },
          fail: function(res) {
            console.log("LOGIN FAILED.");
          }
        });
      }
    },
    signin() {
      common_vendor.index.redirectTo({
        url: "/pages/signin/signin"
      });
    },
    get() {
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "login/get/",
        method: "GET",
        data: {
          email: self.InputValue.InputBox1
        },
        success: function(res) {
          const back = res.data;
          if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
            self.ErrorShow.ErrorBox1 = "邮箱号错误";
            self.ErrorShow.ErrorBox2 = "";
            self.InputClass.InputBox2 = "inputClass4";
            self.GetClass = "get2";
            self.LoginButtonClass = "loginButtonClass1";
          }
        },
        fail: function(res) {
          console.log("LOGIN FAILED.");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.LoginMode
  }, $data.LoginMode ? {
    b: common_vendor.n($data.LoginChooseClass.PasswordLogin),
    c: common_vendor.n($data.LoginChooseClass.CodeLogin),
    d: common_vendor.o((...args) => $options.CodeChoose && $options.CodeChoose(...args)),
    e: common_vendor.n($data.LoginChooseDisplay),
    f: common_vendor.n($data.InputClass.InputBox1),
    g: $data.InputPlaceHolder.InputBox1,
    h: $data.InputValue.InputBox1,
    i: common_vendor.o(($event) => $data.InputValue.InputBox1 = $event.detail.value),
    j: common_vendor.t($data.ErrorShow.ErrorBox1),
    k: common_vendor.n($data.ErrorClass.ErrorBox1),
    l: common_vendor.n($data.InputClass.InputBox2),
    m: $data.InputPlaceHolder.InputBox2,
    n: $data.InputValue.InputBox2,
    o: common_vendor.o(($event) => $data.InputValue.InputBox2 = $event.detail.value),
    p: common_vendor.t($data.ErrorShow.ErrorBox2),
    q: common_vendor.n($data.ErrorClass.ErrorBox2),
    r: common_vendor.n($data.LoginButtonClass),
    s: common_vendor.o((...args) => $options.login && $options.login(...args)),
    t: common_vendor.n($data.SigninClass),
    v: common_vendor.o((...args) => $options.signin && $options.signin(...args)),
    w: common_vendor.n($data.OverallDisplay)
  } : {
    x: common_vendor.n($data.LoginChooseClass.PasswordLogin),
    y: common_vendor.o((...args) => $options.PswChoose && $options.PswChoose(...args)),
    z: common_vendor.n($data.LoginChooseClass.CodeLogin),
    A: common_vendor.n($data.LoginChooseDisplay),
    B: common_vendor.n($data.InputClass.InputBox1),
    C: $data.InputPlaceHolder.InputBox1,
    D: $data.InputValue.InputBox1,
    E: common_vendor.o(($event) => $data.InputValue.InputBox1 = $event.detail.value),
    F: common_vendor.t($data.ErrorShow.ErrorBox1),
    G: common_vendor.n($data.ErrorClass.ErrorBox1),
    H: common_vendor.n($data.InputClass.InputBox2),
    I: $data.InputPlaceHolder.InputBox2,
    J: $data.InputValue.InputBox2,
    K: common_vendor.o(($event) => $data.InputValue.InputBox2 = $event.detail.value),
    L: common_vendor.t($data.ErrorShow.ErrorBox2),
    M: common_vendor.n($data.ErrorClass.ErrorBox2),
    N: common_vendor.n($data.GetClass),
    O: common_vendor.o((...args) => $options.get && $options.get(...args)),
    P: common_vendor.n($data.CodeDisplay),
    Q: common_vendor.n($data.LoginButtonClass),
    R: common_vendor.o((...args) => $options.login && $options.login(...args)),
    S: common_vendor.n($data.SigninClass),
    T: common_vendor.o((...args) => $options.signin && $options.signin(...args)),
    U: common_vendor.n($data.OverallDisplay)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
