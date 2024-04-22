"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginAccount: "",
      location: "",
      BaseURL: common_vendor.inject("BaseURL"),
      countyList: [],
      locationList: [],
      timeList: [],
      nameList: [],
      idList: [],
      countyIndex: 0,
      countyDisplayClass: "countyDisplay",
      clinicClass: "clinic",
      picClass: "pic",
      informationClass: "information",
      locationClass: "location",
      nameClass: "name",
      timeClass: "time",
      scrollX: "false"
    };
  },
  methods: {
    countyClass(index) {
      return index == this.countyIndex ? "countyChoose" : "countyNoChoose";
    },
    countyClick(index) {
      this.countyIndex = index;
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "appointment/clinic/get/",
        method: "GET",
        data: {
          city: self.location,
          county: self.countyList[index]
        },
        success(res) {
          self.locationList = [];
          self.nameList = [];
          self.timeList = [];
          self.idList = [];
          const locationList = res.data.locationList;
          const timeList = res.data.timeList;
          const nameList = res.data.nameList;
          const idList = res.data.idList;
          const len = nameList.length;
          for (let i = 0; i < len; i++) {
            self.locationList.push(locationList[i]);
            self.timeList.push(timeList[i]);
            self.nameList.push(nameList[i]);
            self.idList.push(idList[i]);
          }
        }
      });
    },
    getClinic(index) {
      this.$store.commit("getClinic", this.idList[index]);
      common_vendor.index.navigateTo({
        url: "/pages/clinicDisplay/clinicDisplay"
      });
    }
  },
  mounted() {
    const self = this;
    this.loginAccount = this.$store.state.loginAccount;
    if (this.$store.state.location != "") {
      this.location = this.$store.state.location;
    } else {
      common_vendor.index.redirectTo({
        url: "/pages/locationChoose/locationChoose"
      });
      return;
    }
    common_vendor.index.request({
      url: self.BaseURL + "appointment/initial/",
      method: "GET",
      data: {
        city: self.location
      },
      success(res) {
        const countyList = res.data.countyList;
        const countyLen = countyList.length;
        for (let i = 0; i < countyLen; i++) {
          self.countyList.push(countyList[i]);
        }
        const locationList = res.data.locationList;
        const timeList = res.data.timeList;
        const nameList = res.data.nameList;
        const idList = res.data.idList;
        const len = locationList.length;
        for (let i = 0; i < len; i++) {
          self.locationList.push(locationList[i]);
          self.timeList.push(timeList[i]);
          self.nameList.push(nameList[i]);
          self.idList.push(idList[i]);
        }
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.countyList, (county, index, i0) => {
      return {
        a: common_vendor.t(county),
        b: common_vendor.n($options.countyClass(index)),
        c: common_vendor.o(($event) => $options.countyClick(index), index),
        d: index
      };
    }),
    b: common_vendor.n($data.countyDisplayClass),
    c: common_vendor.f($data.nameList, (name, index, i0) => {
      return {
        a: common_vendor.t(name),
        b: common_vendor.t($data.locationList[index]),
        c: common_vendor.t($data.timeList[index]),
        d: common_vendor.o(($event) => $options.getClinic(index), index),
        e: index
      };
    }),
    d: common_vendor.n($data.picClass),
    e: common_vendor.n($data.nameClass),
    f: common_vendor.n($data.locationClass),
    g: common_vendor.n($data.timeClass),
    h: common_vendor.n($data.informationClass),
    i: common_vendor.n($data.clinicClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/appointment.vue"]]);
wx.createComponent(Component);
