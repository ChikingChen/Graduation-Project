"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      screenHeightRpx: null,
      backgroundClass: "background",
      BaseURL: common_vendor.inject("BaseURL"),
      power: null,
      nicknameList: [],
      emailList: [],
      arrowList: [],
      doctorBelongList: [],
      clinicBelongList: [],
      appointmentList: [],
      nicknameClass: "nickname",
      nicknameDisplayClass: "nicknameDisplay",
      arrowClass: "arrow",
      informationClass: "information",
      informationDisplayClass: "informationDisplay",
      pswordClass: "psword",
      doctorBelongClass: "more",
      clinicBelongClass: "more",
      appointmentClass: "more",
      doctorBelongArrow: "/static/left.png",
      clinicBelongArrow: "/static/left.png",
      appointmentArrow: "/static/left.png",
      oldNickname: null,
      newNickname: null,
      oldPsword: null,
      newPsword: null,
      oldPower: null,
      newPower: null,
      accountShowIndex: -1,
      moreIndex: -1,
      nicknameShow: null,
      emailShow: null,
      pswordShow: null,
      powerShow: null
    };
  },
  methods: {
    getOldNickName(nickname) {
      this.oldNickname = nickname;
    },
    getNewNickName(nickname, index) {
      this.newNickname = nickname;
      if (this.oldNickname == this.newNickname)
        return;
      const email = this.emailList[index];
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "account/modify/nickname/",
        method: "GET",
        data: {
          email,
          nickname: self.newNickname
        }
      });
    },
    getOldPsword(pswordShow) {
      this.oldPsword = pswordShow;
    },
    getNewPsword(pswordShow, index) {
      this.newPsword = pswordShow;
      if (this.oldPsword == this.newPsword)
        return;
      const email = this.emailList[index];
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "account/modify/psword/",
        method: "GET",
        data: {
          email,
          psword: self.newPsword
        }
      });
    },
    getOldPower(powerShow) {
      this.oldPower = powerShow;
    },
    getNewPower(powerShow, index) {
      this.newPower = powerShow;
      if (this.oldPower == this.newPower)
        return;
      if (this.newPower == 1 || this.newPower == 2) {
        this.powerShow = this.oldPower;
        return;
      }
      const email = this.emailList[index];
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "account/modify/power",
        method: "GET",
        data: {
          email,
          power: self.newPower
        }
      });
    },
    select(index) {
      if (index == this.accountShowIndex) {
        this.accountShowIndex = -1;
        this.arrowList[index] = "/static/left.png";
      } else {
        if (this.accountShowIndex == -1) {
          this.accountShowIndex = index;
          this.arrowList[index] = "/static/down.png";
        } else {
          this.arrowList[this.accountShowIndex] = "/static/left.png";
          this.accountShowIndex = index;
          this.arrowList[index] = "/static/down.png";
        }
        const self = this;
        common_vendor.index.request({
          url: self.BaseURL + "account/information/",
          method: "GET",
          data: {
            email: self.emailList[index]
          },
          success(res) {
            self.emailShow = res.data.email;
            self.pswordShow = res.data.psword;
            self.nicknameShow = res.data.nickname;
            self.powerShow = res.data.power;
          }
        });
      }
      this.moreIndex = -1;
      this.doctorBelongArrow = this.clinicBelongArrow = this.appointmentArrow = "/static/left.png";
    },
    doctorBelong(index) {
      if (this.moreIndex == 1) {
        this.moreIndex = -1;
        this.doctorBelongArrow = "/static/left.png";
      } else {
        if (this.moreIndex == 2) {
          this.clinicBelongArrow = "/static/left.png";
        } else if (this.moreIndex == 3) {
          this.appointmentArrow = "/static/left.png";
        }
        this.moreIndex = 1;
        this.doctorBelongArrow = "/static/down.png";
      }
    },
    clinicBelong(index) {
      if (this.moreIndex == 2) {
        this.moreIndex = -1;
        this.clinicBelongArrow = "/static/left.png";
      } else {
        if (this.moreIndex == 1) {
          this.doctorBelongArrow = "/static/left.png";
        } else if (this.moreIndex == 3) {
          this.appointmentArrow = "/static/left.png";
        }
        this.moreIndex = 2;
        this.clinicBelongArrow = "/static/down.png";
      }
    },
    appointment(index) {
      if (this.moreIndex == 3) {
        this.moreIndex = -1;
        this.appointmentArrow = "/static/left.png";
      } else {
        if (this.moreIndex == 1) {
          this.doctorBelongArrow = "/static/left.png";
        } else if (this.moreIndex == 2) {
          this.clinicBelongArrow = "/static/left.png";
        }
        this.moreIndex = 3;
        this.appointmentArrow = "/static/down.png";
      }
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
    common_vendor.index.request({
      url: self.BaseURL + "account/get/",
      method: "GET",
      success(res) {
        const nicknameList = res.data.nicknameList;
        const emailList = res.data.emailList;
        const len = nicknameList.length;
        for (let i = 0; i < len; i++) {
          self.nicknameList.push(nicknameList[i]);
          self.emailList.push(emailList[i]);
          self.arrowList.push("/static/left.png");
        }
      }
    });
  },
  computed: {
    power() {
      if (this.powerShow == 0) {
        return "普通用户";
      } else if (this.powerShow == 1) {
        return "医生";
      } else if (this.powerShow == 2) {
        return "诊所";
      } else if (this.powerShow == 3) {
        return "管理员";
      } else if (this.powerShow == 4) {
        return "高级管理员";
      } else {
        return "权限错误";
      }
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "241d7906": _ctx.screenHeightRpx
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.nicknameList, (nickname, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.getOldNickName($data.nicknameList[index]), index),
        b: common_vendor.o(($event) => $options.getNewNickName($data.nicknameList[index], index), index),
        c: $data.nicknameList[index],
        d: common_vendor.o(($event) => $data.nicknameList[index] = $event.detail.value, index),
        e: $data.arrowList[index],
        f: common_vendor.o(($event) => $options.select(index), index),
        g: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        h: common_vendor.o(($event) => $options.getOldNickName($data.nicknameShow), index),
        i: common_vendor.o(($event) => $options.getNewNickName($data.nicknameShow, index), index),
        j: $data.nicknameShow,
        k: common_vendor.o(($event) => $data.nicknameShow = $event.detail.value, index),
        l: common_vendor.n($data.informationClass)
      } : {}, {
        m: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        n: common_vendor.t("邮箱：" + $data.emailShow),
        o: common_vendor.n($data.informationClass)
      } : {}, {
        p: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        q: common_vendor.n($data.pswordClass),
        r: common_vendor.o(($event) => $options.getOldPsword($data.pswordShow), index),
        s: common_vendor.o(($event) => $options.getNewPsword($data.pswordShow, index), index),
        t: $data.pswordShow,
        v: common_vendor.o(($event) => $data.pswordShow = $event.detail.value, index),
        w: common_vendor.n($data.informationClass)
      } : {}, {
        x: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        y: common_vendor.o(($event) => $options.getOldPower($data.powerShow), index),
        z: common_vendor.o(($event) => $options.getNewPower($data.powerShow, index), index),
        A: $data.powerShow,
        B: common_vendor.o(($event) => $data.powerShow = $event.detail.value, index),
        C: common_vendor.t($options.power),
        D: common_vendor.n($data.informationClass)
      } : {}, {
        E: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        F: common_vendor.n($data.doctorBelongClass),
        G: $data.doctorBelongArrow,
        H: common_vendor.n($data.arrowClass),
        I: common_vendor.o(($event) => $options.doctorBelong(index), index),
        J: common_vendor.n($data.informationClass)
      } : {}, {
        K: index == $data.accountShowIndex && $data.moreIndex == 1
      }, index == $data.accountShowIndex && $data.moreIndex == 1 ? {
        L: common_vendor.f($data.doctorBelongList, (clinic, index2, i1) => {
          return {
            a: index2
          };
        })
      } : {}, {
        M: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        N: common_vendor.n($data.clinicBelongClass),
        O: $data.clinicBelongArrow,
        P: common_vendor.n($data.arrowClass),
        Q: common_vendor.o(($event) => $options.clinicBelong(index), index),
        R: common_vendor.n($data.informationClass)
      } : {}, {
        S: index == $data.accountShowIndex && $data.moreIndex == 2
      }, index == $data.accountShowIndex && $data.moreIndex == 2 ? {
        T: common_vendor.f($data.clinicBelongList, (manage, index2, i1) => {
          return {
            a: index2
          };
        })
      } : {}, {
        U: index == $data.accountShowIndex
      }, index == $data.accountShowIndex ? {
        V: common_vendor.n($data.appointmentClass),
        W: $data.appointmentArrow,
        X: common_vendor.n($data.arrowClass),
        Y: common_vendor.o(($event) => $options.appointment(index), index),
        Z: common_vendor.n($data.informationClass)
      } : {}, {
        aa: index == $data.accountShowIndex && $data.moreIndex == 3
      }, index == $data.accountShowIndex && $data.moreIndex == 3 ? {
        ab: common_vendor.f($data.appointmentList, (appointment, index2, i1) => {
          return {
            a: index2
          };
        })
      } : {}, {
        ac: index
      });
    }),
    b: common_vendor.n($data.nicknameClass),
    c: common_vendor.n($data.arrowClass),
    d: common_vendor.n($data.nicknameDisplayClass),
    e: common_vendor.n($data.informationDisplayClass),
    f: common_vendor.n($data.backgroundClass),
    g: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/accountManage/accountManage.vue"]]);
wx.createPage(MiniProgramPage);
