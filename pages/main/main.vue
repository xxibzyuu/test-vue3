<template>
  <view class="header-box">
    <view
      class="logo-top"
      :style="{ paddingTop: menuButtonInfo.top + 5 + 'px' }"
    >
      <image src="/static/img/logo.png" class="image-logo"></image>
    </view>
    <view>
      <uni-search-bar
        placeholder="请输入项目名称"
        v-model="searchValue"
        cancelButton="none"
        @confirm="searchProject"
        @clear="clearProject"
      />
    </view>
  </view>
  <view
    class="rotate-box"
    :style="{ margin: '-' + rotatetop + 'px 20rpx 0px 20rpx' }"
  >
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      @clickItem="clickSlideItem"
      :info="slideImageList"
      :current="current"
      mode="default"
    >
      <swiper
        class="swiper-box"
        @change="slideChange"
        :current="swiperDotIndex"
      >
        <swiper-item v-for="(item, index) in slideImageList" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <image
              :src="imageHost + item.resUrl"
              mode="scaleToFill"
              class="swiper-item-image"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
  <view class="catelog-box">
    <uni-row>
      <uni-col :span="12">
        <view
          :class="[
            'catelog-item',
            { 'selected-catelog': catelogType == 'rent' },
          ]"
          @click="changeCatelogType('rent')"
          >租赁</view
        >
      </uni-col>
      <uni-col :span="12">
        <view
          :class="[
            'catelog-item',
            { 'selected-catelog': catelogType == 'buy' },
          ]"
          @click="changeCatelogType('buy')"
          >购买</view
        >
      </uni-col>
    </uni-row>
  </view>
  <view class="projet-box">
    <view class="project-item" v-for="item in curProjectList" :key="item.id">
      <view
        class="project-item-image"
        :style="{ 'background-image': 'url(' + item.imgsrc + ')' }"
        @click="gotoItemDetail(item.id)"
      >
        <view
          v-if="item.recommendRule.commission"
          class="project-item-image-label1"
        >
          <text class="project-item-image-text">{{
            item.recommendRule.commission || ""
          }}</text>
        </view>
        <view class="project-item-image-label2">
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col" style="height: 100%">
                <view class="prject-item-title">
                  <text class="text-style">{{ item.title }}</text>
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col" style="height: 100%">
                <view class="prject-item-area">
                  <text class="text-style">{{ item.area }}</text>
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
      <view class="project-item-detail">
        <view @click="gotoItemDetail(item.id)">
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col" style="height: 100%">
                <view class="prject-item-price">{{ item.price }}</view>
                <view class="prject-item-address">
                  <text class="text-style">{{ item.address }}</text></view
                >
              </view>
            </uni-col>
          </uni-row>
        </view>
        <view class="recommend-box">
          <view class="project-item-tag">
            <uni-tag
              v-for="(prj, index) in item.recommendReasonList"
              :key="index"
              :text="prj.reason"
              :custom-style="tagCustomStyle"
            >
            </uni-tag>
          </view>
          <view class="prject-item-recommend">
            <button
              type="default"
              style="width: 87px"
              size="mini"
              @click="recommend(item.id)"
              class="prject-item-recommend-btn"
              hover-class="prject-item-recommend-btn-hover"
            >
              推荐客户
            </button>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载更多 -->
    <view class="loading">{{ loadingText }}</view>
  </view>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const $request = inject("request");
const imageHost = inject("imageHost");

onLoad(() => {
  getProject();
});

const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
const rotatetop = uni.upx2px(554) - (menuButtonInfo.top + 5 + 41 + 61) - 10;

let catelogType = ref("rent");
function changeCatelogType(type) {
  catelogType.value = type;
}
// ----项目列表相关变量和方法----
const tagCustomStyle = {
  backgroundColor: "#f5f5f5",
  borderColor: "#f5f5f5",
  color: "#69bea1",
  fontWeight: "bold",
  fontSize: "12px",
  marginRight: "8rpx",
};
function gotoItemDetail(id) {
  uni.navigateTo({
    url: "/subpagesA/pages/project/project?type=page&id=" + id,
  });
}
// ----项目列表相关变量和方法----

let searchValue = ref("");
let loadingText = ref("");
let curProjectList = reactive([]);
let slideImageList = reactive([]);
let current = ref(0);
let swiperDotIndex = ref(0);
const searchProject = () => {};
const clearProject = () => {};
function slideChange(e) {
  current = e.detail.current
} 
function clickSlideItem(e) {
  swiperDotIndex = e
}

function getProject() {
  loadingText = '加载中...';
  uni.showNavigationBarLoading();
  $request.request({
    url: "/front/list",
    data: {
      pageSize: 10,
      pageNo: 1,
      name: searchValue.value
    },
    header: {
      "custom-header": "hello", //自定义请求头信息
    },
  }).then((res) => {
    let index = 0;
    let data = res.data;
    //首页轮播图片
    if (data.banner != undefined && data.banner != null) {
      slideImageList = data.banner;
    }

    //首页项目列表
    let projectList = data.projectList;

    if (projectList == null || projectList.length <= 0) {
      // that.loadingText = "---没有更多数据了---";
      uni.hideNavigationBarLoading();
      return false;
    } else {
      for (index = 0; index < projectList.length; index++) {
        curProjectList.push({
          id: projectList[index].id,
          title: projectList[index].name,
          address: projectList[index].address,
          area: projectList[index].areaSectionWithUnit,
          recommendReasonList: projectList[index].recommendReasonList,
          recommendRule: projectList[index].recommendRule,
          price: projectList[index].priceSectionWithUnit,
          imgsrc: "'" + imageHost + projectList[index].mediaThumbnail + "'",
        });
      }
      // that.pageNo++;
      uni.hideNavigationBarLoading();
      loadingText = "上拉显示更多";
    }
  }).catch(() => {
    loadingText = "---加载数据失败---";
  });
}
</script>

<style lang="scss" scoped>
.header-box {
  height: 554rpx;
  background: linear-gradient(
    180deg,
    #034190 0%,
    rgba(3, 65, 144, 0.98) 54%,
    rgba(3, 65, 144, 0) 100%
  );
}
.logo-top {
  text-align: left;
  padding-left: 10px;
  /* padding-top:"+(menuButtonInfo.top+5)+"px */
}
.image-logo {
  width: 284rpx;
  height: 64rpx;
}
.search-top {
  padding-top: 20rpx;
}
.rotate-box {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.swiper-box {
  height: 240px; //默认是150px
}
.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 200px;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.swiper-item0 {
  background-color: #cee1fd;
}

.swiper-item1 {
  background-color: #b2cef7;
}

.swiper-item2 {
  background-color: #cee1fd;
}
.swiper-item3 {
  background-color: #b2cef7;
}
.swiper-item4 {
  background-color: #cee1fd;
}
.swiper-item5 {
  background-color: #b2cef7;
}
.swiper-item-image {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
@media screen and (min-width: 500px) {
  .uni-swiper-dot-box {
    width: 400px;
    margin: 0 auto;
    margin-top: 8px;
  }

  .image {
    width: 100%;
  }
}
.catelog-box {
  margin: 20rpx 0;
  font-size: 36rpx;
}
.catelog-item {
  position: relative;
  text-align: center;
}
.selected-catelog {
  font-weight: bold;
}
.selected-catelog::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: 40%;
  width: 22%;
  height: 10rpx;
  background: linear-gradient(270deg, rgba(3, 65, 144, 0) 0%, #034190 100%);
}
.text-style {
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.recommend-box {
  margin-top: -10px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
.projet-box {
  padding-top: 10px;
}
.project-item {
  height: 380px;
  margin: 0px 10px 10px 10px;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.project-item-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
  height: 240px;
}
.project-item-image-label1 {
  text-align: left;
  padding: 10rpx 0rpx 0rpx 10rpx;
}
.project-item-image-text {
  font-size: 14px;
  background-color: white;
  padding: 2rpx 5rpx 2rpx 5rpx;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.project-item-image-label2 {
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  top: 172px;
}
.project-item-detail {
  display: flex;
  flex-direction: column;
  padding-top: 20rpx;
}
.project-item-tag {
  background-color: #ffffff;
  text-align: left;
  padding-left: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 10px;
}
.prject-item-recommend {
  padding: 5px 0px 0px 0px;
  text-align: right;
  color: red;
  font-size: 20px;
  margin-top: 10px;
}
.prject-item-recommend-btn {
  background: #034190;
  border-radius: 8rpx;
  color: white;
}
.prject-item-recommend-btn-hover {
  //#012045 #c2c2c2
  background: #022b5e;
  border-radius: 8rpx;
  color: #e0e0e0;
}
.prject-item-title {
  padding: 10px 5rpx 10px 10rpx;
  text-align: left;
  font-size: 14px;
  color: white;
  font-weight: 500;
}
.prject-item-address {
  padding: 5px 0px 0px 10px;
  text-align: left;
  font-size: 14px;
}
.prject-item-area {
  padding: 10px 10rpx 10px 0rpx;
  text-align: right;
  font-size: 14px;
  color: white;
}

.prject-item-price {
  padding: 5px 0px 0px 10px;
  text-align: left;
  color: red;
  font-size: 16px;
}
.loading {
  font-size: 24rpx;
}
</style>