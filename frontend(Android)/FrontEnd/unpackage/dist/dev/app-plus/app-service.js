if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
    __name: "index",
    setup(__props) {
      const valuelist = vue.ref({
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
        inputMaxLength2: -1
      });
      function psw() {
        valuelist.value.loginClasspsw = "loginClass1";
        valuelist.value.loginClasstele = "loginClass2";
        valuelist.value.inputPlaceholder2 = "请输入密码";
        valuelist.value.getShow = 0;
        valuelist.value.inputValue2 = "";
        valuelist.value.inputMaxLength2 = -1;
      }
      function tele() {
        valuelist.value.loginClasspsw = "loginClass3";
        valuelist.value.loginClasstele = "loginClass4";
        valuelist.value.inputPlaceholder2 = "请输入验证码";
        valuelist.value.getShow = 1;
        valuelist.value.inputValue2 = "";
        valuelist.value.inputMaxLength2 = 4;
      }
      function get() {
        formatAppLog("log", "at pages/index/index.vue:67", "get");
      }
      function login() {
        formatAppLog("log", "at pages/index/index.vue:70", "login");
      }
      function signin() {
        formatAppLog("log", "at pages/index/index.vue:73", "signin");
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", { class: "col1" }, [
          vue.createElementVNode("div", { class: "row1" }, [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(valuelist.value.loginClasspsw),
                onClick: psw,
                ref: "loginchoose1"
              },
              " 密码登录 ",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(valuelist.value.loginClasstele),
                onClick: tele,
                ref: "loginchoose2"
              },
              " 验证码登录 ",
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("div", { class: "col1" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: vue.normalizeClass(valuelist.value.inputClass1),
              placeholder: valuelist.value.inputPlaceholder1,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => valuelist.value.inputValue1 = $event),
              maxlength: 11
            }, null, 10, ["placeholder"]), [
              [vue.vModelText, valuelist.value.inputValue1]
            ]),
            vue.createElementVNode("div", { class: "row2" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: vue.normalizeClass(valuelist.value.inputClass2),
                placeholder: valuelist.value.inputPlaceholder2,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => valuelist.value.inputValue2 = $event),
                maxlength: valuelist.value.inputMaxLength2
              }, null, 10, ["placeholder", "maxlength"]), [
                [vue.vModelText, valuelist.value.inputValue2]
              ]),
              valuelist.value.getShow ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(valuelist.value.getClass),
                  onClick: get
                },
                " 获取验证码 ",
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode(
            "button",
            {
              class: vue.normalizeClass(valuelist.value.loginStyle),
              onClick: login
            },
            " 登录 ",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(valuelist.value.signinClass),
              onClick: signin
            },
            " 还没有账号？ ",
            2
            /* CLASS */
          )
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/index/index.vue"]]);
  vue.ref("");
  vue.ref("");
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {
      tele() {
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "col1" }, [
      vue.createElementVNode("div", { class: "row1" }, [
        vue.createElementVNode("div", { class: "loginchoose1" }, " 账号密码登录 "),
        vue.createElementVNode(
          "div",
          {
            class: "loginchoose2",
            ref: "loginchoose2",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.tele && $options.tele(...args))
          },
          " 手机号码登录 ",
          512
          /* NEED_PATCH */
        )
      ]),
      vue.createElementVNode("div", { class: "col2" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            placeholder: "请输入注册时的账号",
            class: "accpwd",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.inputvalue1 = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, _ctx.inputvalue1]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "password",
            placeholder: "请输入密码",
            class: "accpwd",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputvalue2 = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, _ctx.inputvalue2]
        ])
      ]),
      vue.createElementVNode("div", { class: "row1" }, [
        vue.createElementVNode("button", { class: "login" }, " 登录 ")
      ]),
      vue.createElementVNode("div", { class: "row2" }, [
        vue.createElementVNode("div", { class: "signin" }, " 还没有账号？ ")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/login/login.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
