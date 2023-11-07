"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "rich-text",
      nodes: [{
        name: "div",
        attrs: {
          class: "div-class",
          style: "line-height: 60px; color: red; text-align:center;"
        },
        children: [{
          type: "text",
          text: "Hello&nbsp;uni-app!"
        }]
      }],
      strings: '<div style="text-align:center;"><img src="https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
    };
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
    b: $data.nodes,
    c: $data.strings
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/pages/component/rich-text/rich-text.vue"]]);
wx.createPage(MiniProgramPage);
