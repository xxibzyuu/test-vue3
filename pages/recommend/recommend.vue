<template>
  <view>
    <view class="view-header">
      <image class="view-header-image" :src="banner">
        <!-- src="http://39.108.155.236:20006/userfiles/1/files/mediaResource/2023/03/1.jpg" -->
      </image>
    </view>
    <view class="view-content">
      <view class="view-content-form">
        <uni-forms border label-position="top" label-width="400rpx">
          <uni-forms-item label="企业名称">
            <input
              placeholder="请输入企业名称"
              class="view-content-form-input"
              v-model="formData.company"
            />
          </uni-forms-item>
          <uni-forms-item label="客户姓名" required>
            <input
              placeholder="请输入客户姓名"
              class="view-content-form-input"
              v-model="formData.name"
            />
          </uni-forms-item>
          <uni-forms-item label="客户手机" required>
            <view>
              <!-- <zj-phone-input @getNumber="getNumber"  ref='phonenum'/> -->
            </view>
          </uni-forms-item>
          <uni-forms-item label="报备项目" required>
            <uni-data-picker
              placeholder="请选择报备项目"
              popup-title="请选择报备项目"
              :localdata="PROJECR_LIST"
              :border="false"
              :clear-icon="false"
              v-model="formData.selectedProject"
            >
            </uni-data-picker>
          </uni-forms-item>

          <uni-forms-item label="需求产品">
            <uni-data-picker
              placeholder="请选择需求产品"
              popup-title="请选择需求产品"
              :localdata="PRODUCT_LIST"
              :border="false"
              :clear-icon="false"
              v-model="formData.selectedProduct"
            >
            </uni-data-picker>
          </uni-forms-item>
          <uni-forms-item label="需求面积">
            <uni-data-picker
              placeholder="请选择需求面积"
              popup-title="请选择需求面积"
              :localdata="AREA_LIST"
              :border="false"
              :clear-icon="false"
              v-model="formData.selectedArea"
            >
            </uni-data-picker>
          </uni-forms-item>

          <uni-forms-item label="现场招商接待" required>
            <uni-data-picker
              placeholder="请选择现场招商接待"
              popup-title="请选择现场招商接待"
              :localdata="CLERK_LIST"
              :border="false"
              :clear-icon="false"
              v-model="formData.selectedClerk"
            >
            </uni-data-picker>
          </uni-forms-item>
          <!-- <uni-forms-item label="预计到访时间" required>
						<view  class="filter-item-last-box">
							<uni-datetime-picker ref="VisitTime" type="datetime" :border="false" v-model="selectedVisitTime" 
							@change="changeLog" :start="datestart" hide-second="true" :clear-icon="false"/>
							
							<view class="filter-item-last-box-info" @click="toggleVisitTime">
									<view class="filter-item-last-box-infoitem">
									</view>							
							</view>
						</view>
					</uni-forms-item> -->
        </uni-forms>
      </view>
      <view>
        <button
          @click="submitRecommend"
          style="width: 100%; position: fixed; bottom: 0"
          :disabled="disabledRecommend"
          type="default"
          class="primary-btn"
          hover-class="btn-recommend-hover"
        >
          提交报备
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, inject, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  PROJECR_LIST,
  PRODUCT_LIST,
  AREA_LIST,
  CLERK_LIST,
} from "../../static/js/dist.js";
const $request = inject("request");
const imageHost = inject("imageHost");

onLoad(() => {
  getBannerImage();
});

// 获取banner
let banner = ref("");
function getBannerImage() {
  $request
    .request({
      url: "/front/getBanners",
      data: {
        type: "recommend",
      },
    })
    .then((res) => {
      let data = res.data;

      if (data && data.length > 0) {
        banner = imageHost + data[0].mediaThumbnail;
      }
    });
}

//
let formData = reactive({
  company: "",
  name: "",
  selectedProject: "",
  selectedProduct: "",
  selectedArea: "",
  selectedClerk: "",
});
function submitRecommend() {
  console.log(formData);
}
</script>

<style lang="scss" scoped>
.view-header {
  z-index: -1;
  position: relative;
  width: 750rpx;
  height: 456rpx;
}
.view-header-image {
  width: 100%;
  display: inline-block;
}
.view-content {
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  margin-top: -50rpx;
  z-index: 99;
  background-color: white;
  // text-align: center;
}
.view-content-form {
  padding: 40rpx 40rpx 180rpx 40rpx;
}
.view-content-form-button {
  margin: 0rpx 10rpx 20rpx 10rpx;
}
.view-content-form-input {
  width: auto;
  position: relative;
  overflow: hidden;
  flex: 1;
  line-height: 1;
  font-size: 26rpx;
  height: 35px;
}
.view-content-form-textarea {
  position: relative;
  overflow: hidden;
  flex: 1;
  line-height: 1.5;
  font-size: 26rpx;
  // margin: 6px;
  margin-left: -10rpx;
  margin-right: -10rpx;
  height: 80px;
  min-height: 80px;
  width: auto;
}
</style>