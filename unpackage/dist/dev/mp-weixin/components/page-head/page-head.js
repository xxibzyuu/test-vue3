"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "page-head",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/components/page-head/page-head.vue"]]);
wx.createComponent(Component);
