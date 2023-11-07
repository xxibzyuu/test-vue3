"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "getNetworkType",
      hasNetworkType: false,
      networkType: "",
      connectedWifi: ""
    };
  },
  onUnload: function() {
    this.networkType = "", this.hasNetworkType = false;
  },
  methods: {
    getNetworkType: function() {
      common_vendor.index.getNetworkType({
        success: (res) => {
          console.log(res);
          this.hasNetworkType = true, this.networkType = res.subtype || res.networkType;
        },
        fail: () => {
          common_vendor.index.showModal({
            content: "获取失败！",
            showCancel: false
          });
        }
      });
    },
    clear: function() {
      this.hasNetworkType = false, this.networkType = "", this.connectedWifi = "";
    },
    getConnectedWifi() {
      const that = this;
      common_vendor.index.startWifi({
        success: function() {
          common_vendor.index.getConnectedWifi({
            success: function(res) {
              const { wifi } = res;
              that.connectedWifi = JSON.stringify(wifi);
            },
            fail: function(res) {
            }
          });
        },
        fail: function(res) {
        }
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.hasNetworkType === false
  }, $data.hasNetworkType === false ? {} : {}, {
    c: $data.hasNetworkType === true
  }, $data.hasNetworkType === true ? {
    d: common_vendor.t($data.networkType)
  } : {}, {
    e: $data.hasNetworkType === true && $data.networkType === "wifi"
  }, $data.hasNetworkType === true && $data.networkType === "wifi" ? {
    f: $data.connectedWifi
  } : {}, {
    g: common_vendor.o((...args) => $options.getNetworkType && $options.getNetworkType(...args)),
    h: $data.hasNetworkType === true && $data.networkType === "wifi"
  }, $data.hasNetworkType === true && $data.networkType === "wifi" ? {
    i: common_vendor.o((...args) => $options.getConnectedWifi && $options.getConnectedWifi(...args))
  } : {}, {
    j: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuu/Desktop/project/vue3_project/zhongji_vue3/pages/API/get-network-type/get-network-type.vue"]]);
wx.createPage(MiniProgramPage);
