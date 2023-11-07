"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "u-link",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    inWhiteList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openURL() {
      if (this.inWhiteList) {
        common_vendor.index.navigateTo({
          url: "/pages/component/web-view/web-view?url=" + this.href
        });
      } else {
        common_vendor.index.setClipboardData({
          data: this.href
        });
        common_vendor.index.showModal({
          content: "本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址",
          showCancel: false
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.text),
    b: $props.href,
    c: common_vendor.o((...args) => $options.openURL && $options.openURL(...args)),
    d: $props.inWhiteList
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/components/u-link/u-link.vue"]]);
wx.createComponent(Component);
