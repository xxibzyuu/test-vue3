"use strict";
const common_vendor = require("../../../common/vendor.js");
const reciver = () => "./reciver.js";
const sender = () => "./sender.js";
const senderBus = () => "./sender-bus.js";
const _sfc_main = {
  components: {
    reciver,
    sender,
    senderBus
  },
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  const _component_reciver = common_vendor.resolveComponent("reciver");
  const _component_sender = common_vendor.resolveComponent("sender");
  const _component_sender_bus = common_vendor.resolveComponent("sender-bus");
  (_easycom_page_head2 + _component_reciver + _component_sender + _component_sender_bus)();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "组件通讯示例"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/pages/template/component-communication/component-communication.vue"]]);
wx.createPage(MiniProgramPage);
