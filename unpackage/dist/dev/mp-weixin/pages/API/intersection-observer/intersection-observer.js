"use strict";
const common_vendor = require("../../../common/vendor.js");
let observer = null;
const _sfc_main = {
  data() {
    return {
      appear: false,
      title: "intersectionObserver"
    };
  },
  onReady() {
    observer = common_vendor.index.createIntersectionObserver(this);
    observer.relativeTo(".scroll-view").observe(".ball", (res) => {
      if (res.intersectionRatio > 0 && !this.appear) {
        this.appear = true;
      } else if (!res.intersectionRatio > 0 && this.appear) {
        this.appear = false;
      }
    });
  },
  onUnload() {
    if (observer) {
      observer.disconnect();
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.appear ? "小球出现" : "小球消失")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/pages/API/intersection-observer/intersection-observer.vue"]]);
wx.createPage(MiniProgramPage);
