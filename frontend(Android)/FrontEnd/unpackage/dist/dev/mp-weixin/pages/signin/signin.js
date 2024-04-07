"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "signin",
  setup(__props) {
    const BaseURL = common_vendor.inject("BaseURL");
    const OverallDisplay = common_vendor.ref("col1");
    const CodeDisplay = common_vendor.ref("row2");
    const TitleDisplay = common_vendor.ref("row1");
    common_vendor.ref("无");
    const TitleClass = common_vendor.ref("title");
    const GetClass = common_vendor.ref("get1");
    const ErrorClass = common_vendor.ref("errorClass");
    const TipClass = common_vendor.ref("tipClass");
    common_vendor.ref(null);
    const passwordValid = common_vendor.ref({
      code: "1",
      password: "1",
      repeat: "1"
    });
    const errorValue = common_vendor.ref({
      telephoneError: "",
      // 请输入正确的电话号码
      codeError: "",
      // 请输入正确的验证码
      nicknameError: "",
      passwordError: "",
      // 请保证输入格式正确
      repeatError: ""
      // 请保证两次输入的密码相同
    });
    const placeholderValue = common_vendor.ref({
      telephonePlaceholder: "请输入电话号码",
      codePlaceholder: "请输入验证码",
      nicknamePlaceholder: "请输入昵称",
      passwordPlaceholder: "请输入密码",
      repeatPlaceholder: "请确认密码"
    });
    const inputClass = common_vendor.ref({
      telephoneInput: "inputClass1",
      codeInput: "inputClass3",
      nicknameInput: "inputClass1",
      passwordInput: "inputClass1",
      repeatInput: "inputClass1"
    });
    const inputValue = common_vendor.ref({
      telephoneInput: "",
      codeInput: "",
      nicknameInput: "",
      passwordInput: "",
      repeatInput: ""
    });
    const buttonClass = common_vendor.ref("loginButtonClass1");
    function teleValid(tele) {
      if (tele.length != 11)
        return false;
      for (let i = 0; i < tele.length; i++) {
        if (!(tele[i] >= "0" && tele[i] <= "9"))
          return false;
      }
      return true;
    }
    function codeValid(code) {
      if (code.length != 4)
        return false;
      for (let i = 0; i < code.length; i++) {
        if (!(code[i] >= "0" && code[i] <= "9"))
          return false;
      }
      return true;
    }
    function nickValid(code) {
      if (code.length > 10)
        return false;
      return true;
    }
    function pswValid(code) {
      if (!(code.length >= 6 && code.length <= 20))
        return false;
      return true;
    }
    function signin() {
      if (!teleValid(inputValue.value.telephoneInput)) {
        errorValue.value.telephoneError = "请输入正确的电话号码";
        errorValue.value.codeError = "";
        errorValue.value.nicknameError = "";
        errorValue.value.passwordError = "";
        errorValue.value.repeatError = "";
        GetClass.value = "get2";
        inputClass.value.codeInput = "inputClass4";
        inputClass.value.nicknameInput = "inputClass1";
        inputClass.value.passwordInput = "inputClass1";
        inputClass.value.repeatInput = "inputClass1";
        buttonClass.value = "loginButtonClass1";
        return;
      }
      if (!codeValid(inputValue.value.codeInput)) {
        errorValue.value.telephoneError = "";
        errorValue.value.codeError = "验证码错误";
        errorValue.value.nicknameError = "";
        errorValue.value.passwordError = "";
        errorValue.value.repeatError = "";
        GetClass.value = "get1";
        inputClass.value.codeInput = "inputClass3";
        inputClass.value.nicknameInput = "inputClass2";
        inputClass.value.passwordInput = "inputClass1";
        inputClass.value.repeatInput = "inputClass1";
        buttonClass.value = "loginButtonClass1";
        return;
      }
      if (!nickValid(inputValue.value.nicknameInput)) {
        errorValue.value.telephoneError = "";
        errorValue.value.codeError = "";
        errorValue.value.nicknameError = "昵称只能由少于或等于10个字符";
        errorValue.value.passwordError = "";
        errorValue.value.repeatError = "";
        GetClass.value = "get1";
        inputClass.value.codeInput = "inputClass3";
        inputClass.value.nicknameInput = "inputClass1";
        inputClass.value.passwordInput = "inputClass2";
        inputClass.value.repeatInput = "inputClass1";
        buttonClass.value = "loginButtonClass1";
        return;
      }
      if (!pswValid(inputValue.value.passwordInput)) {
        errorValue.value.telephoneError = "";
        errorValue.value.codeError = "";
        errorValue.value.nicknameError = "";
        errorValue.value.passwordError = "密码只能由少于20位并且多于6位大小写英文或数字";
        errorValue.value.repeatError = "";
        GetClass.value = "get1";
        inputClass.value.codeInput = "inputClass3";
        inputClass.value.nicknameInput = "inputClass1";
        inputClass.value.passwordInput = "inputClass1";
        inputClass.value.repeatInput = "inputClass2";
        buttonClass.value = "loginButtonClass1";
        return;
      }
      if (inputValue.value.passwordInput != inputValue.value.repeatInput) {
        errorValue.value.telephoneError = "";
        errorValue.value.codeError = "";
        errorValue.value.nicknameError = "";
        errorValue.value.passwordError = "";
        errorValue.value.repeatError = "请保证两次输入的密码相同";
        GetClass.value = "get1";
        inputClass.value.codeInput = "inputClass3";
        inputClass.value.nicknameInput = "inputClass1";
        inputClass.value.passwordInput = "inputClass1";
        inputClass.value.repeatInput = "inputClass1";
        buttonClass.value = "loginButtonClass2";
        return;
      }
      errorValue.value.telephoneError = "";
      errorValue.value.codeError = "";
      errorValue.value.nicknameError = "";
      errorValue.value.passwordError = "";
      errorValue.value.repeatError = "";
      GetClass.value = "get1";
      inputClass.value.codeInput = "inputClass3";
      inputClass.value.nicknameInput = "inputClass1";
      inputClass.value.passwordInput = "inputClass1";
      inputClass.value.repeatInput = "inputClass1";
      buttonClass.value = "loginButtonClass1";
      common_vendor.index.request({
        url: BaseURL + "signin/signin/",
        method: "GET",
        data: {
          tele: inputValue.value.telephoneInput,
          code: inputValue.value.codeInput,
          nickname: inputValue.value.nicknameInput,
          password: inputValue.value.passwordInput
        },
        success: function(res) {
          res.data;
          if (data == "TELE EXISTS") {
            errorValue.value.telephoneError = "该号码已经被注册";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get2";
            inputClass.value.codeInput = "inputClass4";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          }
        },
        fail: function(res) {
          console.log("SIGNIN FAILED.");
        }
      });
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    }
    function get() {
      common_vendor.index.request({
        url: BaseURL + "signin/get/",
        method: "GET",
        data: {
          tele: inputValue.value.telephoneInput
        },
        success: function(res) {
          const back = res.data;
          if (back == "LEN ERROR.") {
            errorValue.value.telephoneError = "请输入正确的电话号码";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get2";
            inputClass.value.codeInput = "inputClass4";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          } else if (back == "TELE EXISTS.") {
            errorValue.value.telephoneError = "该号码已经被注册";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get2";
            inputClass.value.codeInput = "inputClass4";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          } else {
            errorValue.value.telephoneError = "";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get1";
            inputClass.value.codeInput = "inputClass3";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          }
        },
        fail: function(res) {
          console.log("LOGIN FAILED.");
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(TitleClass.value),
        b: common_vendor.n(TitleDisplay.value),
        c: placeholderValue.value.telephonePlaceholder,
        d: common_vendor.n(inputClass.value.telephoneInput),
        e: inputValue.value.telephoneInput,
        f: common_vendor.o(($event) => inputValue.value.telephoneInput = $event.detail.value),
        g: common_vendor.t(errorValue.value.telephoneError),
        h: common_vendor.n(ErrorClass.value),
        i: placeholderValue.value.codePlaceholder,
        j: common_vendor.n(inputClass.value.codeInput),
        k: passwordValid.value.code,
        l: inputValue.value.codeInput,
        m: common_vendor.o(($event) => inputValue.value.codeInput = $event.detail.value),
        n: common_vendor.n(GetClass.value),
        o: common_vendor.o(get),
        p: common_vendor.n(CodeDisplay.value),
        q: common_vendor.t(errorValue.value.codeError),
        r: common_vendor.n(ErrorClass.value),
        s: placeholderValue.value.nicknamePlaceholder,
        t: common_vendor.n(inputClass.value.nicknameInput),
        v: inputValue.value.nicknameInput,
        w: common_vendor.o(($event) => inputValue.value.nicknameInput = $event.detail.value),
        x: common_vendor.t(errorValue.value.nicknameError),
        y: common_vendor.n(ErrorClass.value),
        z: placeholderValue.value.passwordPlaceholder,
        A: common_vendor.n(inputClass.value.passwordInput),
        B: passwordValid.value.password,
        C: inputValue.value.passwordInput,
        D: common_vendor.o(($event) => inputValue.value.passwordInput = $event.detail.value),
        E: common_vendor.t(errorValue.value.passwordError),
        F: common_vendor.n(ErrorClass.value),
        G: placeholderValue.value.repeatPlaceholder,
        H: common_vendor.n(inputClass.value.repeatInput),
        I: passwordValid.value.repeat,
        J: inputValue.value.repeatInput,
        K: common_vendor.o(($event) => inputValue.value.repeatInput = $event.detail.value),
        L: common_vendor.t(errorValue.value.repeatError),
        M: common_vendor.n(ErrorClass.value),
        N: common_vendor.n(buttonClass.value),
        O: common_vendor.o(signin),
        P: common_vendor.n(TipClass.value),
        Q: common_vendor.n(OverallDisplay.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/signin/signin.vue"]]);
wx.createPage(MiniProgramPage);
