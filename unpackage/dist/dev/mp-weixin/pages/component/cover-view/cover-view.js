"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showMap: false
    };
  },
  onLoad() {
    this.showMap = true;
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
  return common_vendor.e({
    a: common_vendor.p({
      title: "cover-view用于覆盖map、video等原生组件"
    }),
    b: $data.showMap
  }, $data.showMap ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/pages/component/cover-view/cover-view.vue"]]);
wx.createPage(MiniProgramPage);
