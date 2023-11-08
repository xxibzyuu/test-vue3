"use strict";
const common_vendor = require("./vendor.js");
const getCurrentUrl = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.$page.fullPath;
  common_vendor.index.setStorageSync("currentUrl", url);
  let options = currentPage.options;
  if (options) {
    let urlParams = url + "?";
    for (let key in options) {
      const value = options[key];
      urlParams += `${key}=${value}&`;
    }
    urlParams = urlParams.substring(0, urlParams.length - 1);
    common_vendor.index.setStorageSync("currentUrl", `${urlParams}`);
  }
};
exports.getCurrentUrl = getCurrentUrl;
