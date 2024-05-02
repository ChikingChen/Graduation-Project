"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      BaseURL: common_vendor.inject("BaseURL"),
      account: null,
      commentClass: "comment",
      namebarClass: "namebar",
      avatarClass: "avatar",
      nicknameClass: "nickname",
      contentClass: "content",
      dateClass: "date",
      followDisplayClass: "followDisplay",
      clinicClass: "clinic",
      imgClass: "img",
      clinicNameClass: "clinicName",
      clinicMarkClass: "clinicMark",
      clinicInformationDisplayClass: "clinicInformationDisplay",
      arrowClass: "arrow",
      followClass: "follow",
      followInformationClass: "followInformation",
      followAvatarClass: "followAvatar",
      followNicknameClass: "followNickname",
      followContentClass: "followContent",
      sumClass: "sum",
      followDateClass: "followDate",
      likeDisplayClass: "likeDisplay",
      likeClass: "like",
      typeinClass: "typein",
      typeinAvatarClass: "typeinAvatar",
      typeinInputClass: "typeinInput",
      typeinPlaceHolderClass: "typeinPlaceHolder",
      sendClass: "send",
      deleteClass: "delete",
      informationDisplayClass: "informationDisplay",
      commentDeleteClass: "commentDelete",
      markDisplayClass: "markDisplay",
      doctorDisplayClass: "doctorDisplay",
      serviceDisplayClass: "serviceDisplay",
      starClass: "star",
      followList: null,
      starList: [],
      comment: null,
      newFollow: ""
    };
  },
  methods: {
    arrowClick() {
      this.$store.commit("getClinic", this.comment.clinic.id);
      common_vendor.index.navigateTo({
        url: "/pages/clinicDisplay/clinicDisplay"
      });
    },
    like(index) {
      return this.followList[index].havelike ? "/static/like1.png" : "/static/like0.png";
    },
    likeClick(index) {
      const self = this;
      if (this.followList[index].havelike) {
        common_vendor.index.request({
          url: self.BaseURL + "follow/dislike/",
          method: "GET",
          data: {
            id: self.followList[index].id,
            account: self.$store.state.loginAccount
          }
        });
        this.followList[index].havelike = false;
        this.followList[index].likeCount -= 1;
      } else {
        common_vendor.index.request({
          url: self.BaseURL + "follow/like/",
          method: "GET",
          data: {
            id: self.followList[index].id,
            account: self.$store.state.loginAccount
          }
        });
        this.followList[index].havelike = true;
        this.followList[index].likeCount += 1;
      }
    },
    commentDeleteClick(index) {
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "comment/delete/",
        method: "GET",
        data: {
          id: self.$store.state.comment
        },
        success(res) {
          common_vendor.index.showToast({
            title: "删除成功",
            success() {
              common_vendor.index.navigateBack();
            }
          });
        }
      });
    },
    deleteClick(index) {
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "follow/delete/",
        method: "GET",
        data: {
          followId: self.followList[index].id
        },
        success() {
          common_vendor.index.request({
            url: self.BaseURL + "comment/initial/",
            method: "GET",
            data: {
              id: self.$store.state.comment,
              account: self.$store.state.loginAccount
            },
            success(res) {
              self.followList = res.data.followList;
              self.comment = res.data.comment;
              self.followList.length;
              common_vendor.index.showToast({
                title: "删除成功"
              });
            }
          });
        }
      });
    },
    send() {
      if (this.newFollow == "") {
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "error"
        });
        return;
      }
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "follow/add/",
        method: "GET",
        data: {
          commentId: self.$store.state.comment,
          account: self.$store.state.loginAccount,
          content: self.newFollow
        },
        success(res) {
          common_vendor.index.showToast({
            title: "发布成功",
            success() {
              self.newFollow = "";
              common_vendor.index.request({
                url: self.BaseURL + "comment/initial/",
                method: "GET",
                data: {
                  id: self.$store.state.comment,
                  account: self.$store.state.loginAccount
                },
                success(res2) {
                  self.followList = res2.data.followList;
                  self.comment = res2.data.comment;
                  self.followList.length;
                }
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    const self = this;
    common_vendor.index.request({
      url: self.BaseURL + "comment/initial/",
      method: "GET",
      data: {
        id: self.$store.state.comment,
        account: self.$store.state.loginAccount
      },
      success(res) {
        self.followList = res.data.followList;
        self.comment = res.data.comment;
        const len = self.comment.mark;
        console.log(self.comment);
        for (let i = 0; i < len; i++)
          self.starList.push("/static/star1.png");
        for (let i = len; i < 5; i++)
          self.starList.push("/static/star0.png");
        console.log(self.starList);
      }
    });
    self.account = self.$store.state.loginAccount;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.avatarClass),
    b: common_vendor.t($data.comment.nickname),
    c: common_vendor.n($data.nicknameClass),
    d: common_vendor.n($data.namebarClass),
    e: common_vendor.t("评分："),
    f: common_vendor.f($data.starList, (star, index, i0) => {
      return {
        a: star,
        b: index
      };
    }),
    g: common_vendor.n($data.starClass),
    h: common_vendor.n($data.markDisplayClass),
    i: common_vendor.t("医生：" + $data.comment.doctor),
    j: common_vendor.n($data.doctorDisplayClass),
    k: common_vendor.t("服务：" + $data.comment.service),
    l: common_vendor.n($data.serviceDisplayClass),
    m: common_vendor.t($data.comment.content),
    n: common_vendor.n($data.contentClass),
    o: common_vendor.n($data.imgClass),
    p: common_vendor.t($data.comment.clinic.name),
    q: common_vendor.n($data.clinicNameClass),
    r: common_vendor.t("分数：" + $data.comment.clinic.mark.toFixed(1)),
    s: common_vendor.n($data.clinicMarkClass),
    t: common_vendor.n($data.clinicInformationDisplayClass),
    v: common_vendor.n($data.arrowClass),
    w: common_vendor.o((...args) => $options.arrowClick && $options.arrowClick(...args)),
    x: common_vendor.n($data.clinicClass),
    y: common_vendor.t("发布于：  " + $data.comment.date),
    z: common_vendor.n($data.dateClass),
    A: $data.account == $data.comment.account
  }, $data.account == $data.comment.account ? {
    B: common_vendor.n($data.commentDeleteClass),
    C: common_vendor.o((...args) => $options.commentDeleteClick && $options.commentDeleteClick(...args))
  } : {}, {
    D: common_vendor.n($data.informationDisplayClass),
    E: common_vendor.n($data.commentClass),
    F: common_vendor.t("共" + $data.followList.length + "条评论"),
    G: common_vendor.n($data.sumClass),
    H: common_vendor.n($data.typeinAvatarClass),
    I: common_vendor.n($data.typeinPlaceHolderClass),
    J: $data.newFollow,
    K: common_vendor.o(($event) => $data.newFollow = $event.detail.value),
    L: common_vendor.n($data.typeinInputClass),
    M: common_vendor.n($data.sendClass),
    N: common_vendor.o((...args) => $options.send && $options.send(...args)),
    O: common_vendor.n($data.typeinClass),
    P: common_vendor.f($data.followList, (follow, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(follow.nickname),
        b: common_vendor.t(follow.content),
        c: common_vendor.t(follow.date),
        d: $options.like(index),
        e: common_vendor.o(($event) => $options.likeClick(index), index),
        f: common_vendor.t(follow.likeCount),
        g: $data.account == $data.followList[index].account
      }, $data.account == $data.followList[index].account ? {
        h: common_vendor.n($data.deleteClass),
        i: common_vendor.o(($event) => $options.deleteClick(index), index)
      } : {}, {
        j: index
      });
    }),
    Q: common_vendor.n($data.followAvatarClass),
    R: common_vendor.n($data.followNicknameClass),
    S: common_vendor.n($data.followContentClass),
    T: common_vendor.n($data.followDateClass),
    U: common_vendor.n($data.followInformationClass),
    V: common_vendor.n($data.likeClass),
    W: common_vendor.n($data.likeDisplayClass),
    X: common_vendor.n($data.followClass),
    Y: common_vendor.n($data.followDisplayClass)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/comment/comment.vue"]]);
wx.createPage(MiniProgramPage);
