"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_request = require("./common/request.js");
require("./common/util.js");
if (!Math) {
  "./pages/main/main.js";
  "./pages/recommend/recommend.js";
  "./pages/center/center.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {},
  methods: {}
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.provide("request", common_request.request);
  app.provide("imageHost", "https://vktest.cimccity.com");
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
