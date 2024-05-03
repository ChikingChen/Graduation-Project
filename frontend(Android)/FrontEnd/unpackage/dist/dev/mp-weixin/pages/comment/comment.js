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
      commentModifyClass: "commentModify",
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
      console.log(123);
      return this.followList[index].havelike ? "/static/like1.png" : "/static/like0.png";
    },
    likeClick(index) {
      console.log(123);
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
    sleep(time) {
      console.log(123);
      var timeStamp = (/* @__PURE__ */ new Date()).getTime();
      var endTime = timeStamp + time;
      while (true) {
        if ((/* @__PURE__ */ new Date()).getTime() > endTime)
          return;
      }
    },
    commentDeleteClick(index) {
      console.log(123);
      const self = this;
      common_vendor.index.request({
        url: self.BaseURL + "comment/delete/",
        method: "GET",
        data: {
          id: self.$store.state.comment
        },
        success(res) {
          common_vendor.index.showToast({
            title: "删除成功"
          });
          self.sleep(1e3);
          self.$store.commit("deleteAdd");
          common_vendor.index.navigateBack();
        }
      });
    },
    deleteClick(index) {
      console.log(123);
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
      console.log(123);
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
    },
    namebarClick() {
      this.$store.commit("getAccount", this.comment.account);
      common_vendor.index.navigateTo({
        url: "/pages/personPage/personPage"
      });
    },
    commentModifyClick() {
      this.$store.commit("getEvaluationMode", "modify");
      common_vendor.index.navigateTo({
        url: "/pages/evaluation/evaluation"
      });
    },
    avatarClick(index) {
      console.log(this.followList);
      this.$store.commit("getAccount", this.followList[index].account);
      common_vendor.index.navigateTo({
        url: "/pages/personPage/personPage"
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
        for (let i = 0; i < len; i++)
          self.starList.push("/static/star1.png");
        for (let i = len; i < 5; i++)
          self.starList.push("/static/star0.png");
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
    e: common_vendor.o((...args) => $options.namebarClick && $options.namebarClick(...args)),
    f: common_vendor.t("评分："),
    g: common_vendor.f($data.starList, (star, index, i0) => {
      return {
        a: star,
        b: index
      };
    }),
    h: common_vendor.n($data.starClass),
    i: common_vendor.n($data.markDisplayClass),
    j: common_vendor.t("医生：" + $data.comment.doctor),
    k: common_vendor.n($data.doctorDisplayClass),
    l: common_vendor.t("服务：" + $data.comment.service),
    m: common_vendor.n($data.serviceDisplayClass),
    n: common_vendor.t($data.comment.content),
    o: common_vendor.n($data.contentClass),
    p: common_vendor.n($data.imgClass),
    q: common_vendor.t($data.comment.clinic.name),
    r: common_vendor.n($data.clinicNameClass),
    s: common_vendor.t("分数：" + $data.comment.clinic.mark.toFixed(1)),
    t: common_vendor.n($data.clinicMarkClass),
    v: common_vendor.n($data.clinicInformationDisplayClass),
    w: common_vendor.n($data.arrowClass),
    x: common_vendor.o((...args) => $options.arrowClick && $options.arrowClick(...args)),
    y: common_vendor.n($data.clinicClass),
    z: common_vendor.t("发布于：  " + $data.comment.date),
    A: common_vendor.n($data.dateClass),
    B: $data.account == $data.comment.account
  }, $data.account == $data.comment.account ? {
    C: common_vendor.n($data.commentDeleteClass),
    D: common_vendor.o((...args) => $options.commentDeleteClick && $options.commentDeleteClick(...args))
  } : {}, {
    E: $data.account == $data.comment.account
  }, $data.account == $data.comment.account ? {
    F: common_vendor.n($data.commentModifyClass),
    G: common_vendor.o((...args) => $options.commentModifyClick && $options.commentModifyClick(...args))
  } : {}, {
    H: common_vendor.n($data.informationDisplayClass),
    I: common_vendor.n($data.commentClass),
    J: common_vendor.t("共" + $data.followList.length + "条评论"),
    K: common_vendor.n($data.sumClass),
    L: common_vendor.n($data.typeinAvatarClass),
    M: common_vendor.n($data.typeinPlaceHolderClass),
    N: $data.newFollow,
    O: common_vendor.o(($event) => $data.newFollow = $event.detail.value),
    P: common_vendor.n($data.typeinInputClass),
    Q: common_vendor.n($data.sendClass),
    R: common_vendor.o((...args) => $options.send && $options.send(...args)),
    S: common_vendor.n($data.typeinClass),
    T: common_vendor.f($data.followList, (follow, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.avatarClick(index), index),
        b: common_vendor.t(follow.nickname),
        c: common_vendor.t(follow.content),
        d: common_vendor.t(follow.date),
        e: $options.like(index),
        f: common_vendor.o(($event) => $options.likeClick(index), index),
        g: common_vendor.t(follow.likeCount),
        h: $data.account == $data.followList[index].account
      }, $data.account == $data.followList[index].account ? {
        i: common_vendor.n($data.deleteClass),
        j: common_vendor.o(($event) => $options.deleteClick(index), index)
      } : {}, {
        k: index
      });
    }),
    U: common_vendor.n($data.followAvatarClass),
    V: common_vendor.n($data.followNicknameClass),
    W: common_vendor.n($data.followContentClass),
    X: common_vendor.n($data.followDateClass),
    Y: common_vendor.n($data.followInformationClass),
    Z: common_vendor.n($data.likeClass),
    aa: common_vendor.n($data.likeDisplayClass),
    ab: common_vendor.n($data.followClass),
    ac: common_vendor.n($data.followDisplayClass)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/comment/comment.vue"]]);
wx.createPage(MiniProgramPage);
