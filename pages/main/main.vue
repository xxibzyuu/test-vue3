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
              :src="imageHostUrl + item.resUrl"
              mode="scaleToFill"
              class="swiper-item-image"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
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
const rotatetop = (uni.upx2px( 554)- (menuButtonInfo.top+5+41+61) -10);

const searchValue = ref("");
const curProjectList = reactive([]);
const slideImageList = reactive([]);
const searchProject = () => {};
const clearProject = () => {};
function getProject() {
  uni.showNavigationBarLoading();
  $request
    .request({
      url: "/front/list",
      data: {
        pageSize: 10,
        pageNo: 1,
        name: searchValue,
      },
      header: {
        "custom-header": "hello", //自定义请求头信息
      },
    })
    .then((res) => {
      let index = 0;
      let data = ret.data;
      // console.log(data);
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
        // that.loadingText = "上拉显示更多";
      }
    })
    .catch(() => {
      // that.loadingText = "---加载数据失败---";
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
</style>