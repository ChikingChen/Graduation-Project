"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      cityList: null,
      countyList: null,
      cityShowIndex: -1,
      screenHeightRpx: "0rpx",
      backgroundClass: "background",
      cityClass: "city",
      countyClass: "county",
      imgClass: "img",
      chooseClass: "choose",
      countyDisplayClass: "countyDisplay",
      srcUrl: [],
      newCounty: "",
      newCity: "",
      oldCountyName: "",
      oldCityName: ""
    };
  },
  methods: {
    img(index, city) {
      const self = this;
      if (this.srcUrl[index] == "/static/left.png") {
        this.srcUrl[index] = "/static/down.png";
        common_vendor.index.request({
          // 获取县名
          url: self.BaseURL + "location/county/get/",
          method: "GET",
          data: {
            city
          },
          success(res) {
            self.countyList = res.data.countyList;
          }
        });
        self.cityShowIndex = index;
      } else {
        this.srcUrl[index] = "/static/left.png";
        self.cityShowIndex = -1;
      }
    },
    getCountyOldName(county) {
      this.oldCountyName = county;
    },
    getCountyNewName(city, county, index) {
      const self = this;
      if (self.oldCountyName == county)
        return;
      else {
        if (self.newCounty != "") {
          common_vendor.index.request({
            url: self.BaseURL + "location/county/add/",
            method: "GET",
            data: {
              city,
              county
            },
            success(res) {
              self.countyList.push(county);
            }
          });
          self.newCounty = "";
        } else if (self.oldCountyName != self.countyList[index]) {
          common_vendor.index.request({
            url: self.BaseURL + "location/county/modify/",
            method: "GET",
            data: {
              city,
              oldName: self.oldCountyName,
              newName: self.countyList[index]
            }
          });
        } else if (self.countyList[index] == "") {
          common_vendor.index.request({
            url: self.BaseURL + "location/county/delete/",
            method: "GET",
            data: {
              city,
              county: self.oldCountyName
            },
            success(res) {
              self.countyList.splice(index, 1);
            }
          });
        }
      }
    },
    getCityOldName(city) {
      const self = this;
      self.oldCityName = city;
    },
    getCityNewName(city, index) {
      const self = this;
      if (self.oldCityName == city)
        return;
      if (self.newCity != "") {
        common_vendor.index.request({
          url: self.BaseURL + "location/city/add/",
          method: "GET",
          data: {
            city
          },
          success(res) {
            self.cityList.push(city);
          }
        });
        self.newCity = "";
      } else if (self.oldCityName != self.cityList[index]) {
        common_vendor.index.request({
          url: self.BaseURL + "location/city/modify/",
          method: "GET",
          data: {
            oldName: self.oldCityName,
            newName: self.cityList[index]
          }
        });
      } else if (self.cityList[index] == "") {
        common_vendor.index.request({
          url: self.BaseURL + "location/city/delete/",
          method: "GET",
          data: {
            city: self.oldCityName
          },
          success(res) {
            self.cityList.splice(index, 1);
          }
        });
      }
    }
  },
  computed: {
    triangleStyle() {
      return (index) => {
        return index == this.cityShowIndex ? "/static/down.png" : "/static/left.png";
      };
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.request({
      // 获取城市名
      url: this.BaseURL + "location/city/get/",
      method: "GET",
      success: function(res) {
        self.cityList = res.data.cityList;
        const city = self.cityList.length;
        for (let i = 0; i < city; i++) {
          self.srcUrl.push("/static/left.png");
        }
      }
    });
    common_vendor.index.getSystemInfo({
      success(res) {
        self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + "rpx";
      }
    });
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "3f813b41": _ctx.screenHeightRpx
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.cityList, (city, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.getCityOldName(city), index),
        b: common_vendor.o(($event) => $options.getCityNewName(city, index), index),
        c: $data.cityList[index],
        d: common_vendor.o(($event) => $data.cityList[index] = $event.detail.value, index),
        e: $options.triangleStyle(index),
        f: common_vendor.o(($event) => $options.img(index, city), index),
        g: index == $data.cityShowIndex
      }, index == $data.cityShowIndex ? {
        h: common_vendor.f($data.countyList, (county, index2, i1) => {
          return {
            a: common_vendor.o(($event) => $options.getCountyOldName(county), index2),
            b: common_vendor.o(($event) => $options.getCountyNewName(city, county, index2), index2),
            c: $data.countyList[index2],
            d: common_vendor.o(($event) => $data.countyList[index2] = $event.detail.value, index2),
            e: index2
          };
        }),
        i: common_vendor.n($data.countyClass)
      } : {}, {
        j: index == $data.cityShowIndex
      }, index == $data.cityShowIndex ? {
        k: common_vendor.o(($event) => $options.getCountyOldName($data.newCounty), index),
        l: common_vendor.o(($event) => $options.getCountyNewName(city, $data.newCounty), index),
        m: $data.newCounty,
        n: common_vendor.o(($event) => $data.newCounty = $event.detail.value, index),
        o: common_vendor.n($data.countyClass)
      } : {}, {
        p: index
      });
    }),
    b: common_vendor.n($data.cityClass),
    c: common_vendor.n($data.imgClass),
    d: common_vendor.n($data.chooseClass),
    e: common_vendor.n($data.countyDisplayClass),
    f: $data.cityShowIndex == -1
  }, $data.cityShowIndex == -1 ? {
    g: common_vendor.o(($event) => $options.getCityOldName($data.newCity)),
    h: common_vendor.o(($event) => $options.getCityNewName($data.newCity)),
    i: $data.newCity,
    j: common_vendor.o(($event) => $data.newCity = $event.detail.value),
    k: common_vendor.n($data.cityClass)
  } : {}, {
    l: common_vendor.n($data.backgroundClass),
    m: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/locationManage/locationManage.vue"]]);
wx.createPage(MiniProgramPage);
