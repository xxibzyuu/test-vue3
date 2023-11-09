<template>
  <view>
    <view class="person-box gd-flex">
      <image
        :src="userInfo.headPhoto"
        class="avatar"
        @click.stop="toNextPage('setting')"
      ></image>
      <view class="person-info gd-flex-v">
        <text class="name">{{ userInfo.name }}</text>
        <text class="code">ID：{{ userInfo.agentId }}</text>
        <text class="address">{{ userInfo.identityTypeName }}</text>
      </view>
      <view class="identity-card">
        <text>{{ userInfo.identityName }}</text>
      </view>
    </view>
    <view class="commission-box">
      <uni-grid :column="4" :highlight="true" :show-border="false">
        <uni-grid-item
          v-for="(item, index) in commissonList"
          :index="index"
          :key="index"
        >
          <view class="item-box" @click="toNextPage(item.pageKey)">
            <text class="item-box-label">{{ item.label }}</text>
            <text class="item-box-value">{{
              item.pageKey == "commission" ? "-.--" : item.value
            }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
    <view class="operate-box">
      <uni-list class="operate-list" :border="false">
        <uni-list-item
          v-for="item in CENTER_COLUMN"
          :key="item.key"
          :title="item.text"
          :thumb="item.img"
          :border="false"
          clickable
          link
          :rightText="item.extraText"
          :to="item.link"
        ></uni-list-item>
        <uni-list-item
          v-if="userInfo.isReceptionist == '1'"
          title="来访登记"
          thumb="/static/img/center/operate-icon.png"
          :border="false"
          clickable
          link
          to="/subpagesA/pages/visit/visit-register"
        ></uni-list-item>
        <uni-list-item
          v-if="userInfo.identityType == '6'"
          title="渠道运营管理"
          thumb="/static/img/center/docuemnt-icon.png"
          :border="false"
          clickable
          link
          to="/subpagesA/pages/boss/boss?type=operator"
        ></uni-list-item>
        <uni-list-item
          v-if="userInfo.isOrgLeader == '1'"
          title="Boss管理"
          thumb="/static/img/center/docuemnt-icon.png"
          :border="false"
          clickable
          link
          to="/subpagesA/pages/boss/boss?type=leader"
        ></uni-list-item>
        <uni-list-item
          v-if="userInfo.identityType == '4'"
          title="我的网店"
          thumb="/static/img/center/docuemnt-icon.png"
          :border="false"
          clickable
          link
          to="/subpagesA/pages/onlinestore/onlinestore"
        ></uni-list-item>
      </uni-list>
    </view>
    <uni-popup ref="msgPopup" type="dialog">
      <uni-popup-dialog
        type="info"
        cancelText="关闭"
        confirmText="同意"
        content="是否同意授权消息提醒"
        :before-close="true"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { reactive, inject } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { CENTER_COLUMN } from '@/static/js/center.js'
const $request = inject("request");
const tokenId = uni.getStorageSync('token');
let userInfo = reactive({});
const commissonList = reactive([
  {
    key: 'commendCustomerNum',
    label: '客户',
    value: 0,
    pageKey: 'customer'
  },
  {
    key: 'totalCommission',
    label: '总佣金',
    value: '-.--',
    pageKey: 'commission'
  },
  {
    key: 'hasPayCommission',
    label: '已结佣',
    value: '-.--',
    pageKey: 'commission'
  },
  {
    key: 'noPayCommission',
    label: '未结佣',
    value: '-.--',
    pageKey: 'commission'
  }
]);

onLoad(() => {
  init()
})

function init() {
  $request.request({
    url: '/agent/queryAgentInfo',
    data: {
      tokenId: tokenId    
    }
  }).then(res => {
    const data = res.data
    userInfo = data
    commissonList.forEach(item => {
      for (const key in data) {
        if (item.key === key) {
          item.value = data[key]
        }
      }
    })
  })
}
</script>


<style lang="scss" scoped>
.person-box {
  // width: 100%;
  height: 346rpx;
  background: #034190;
  margin-top: -2rpx;
  padding: 40rpx 40rpx 0;
  position: relative;

  .avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    margin: 0 40rpx 0 20rpx;
    will-change: transform;   //以防加载慢会闪一下
  }

  .person-info {
    color: #FFFFFF;

    .name {
      font-weight: bold;
      font-size: 34rpx;
    }
    .code {
      font-size: 28rpx;
    }
    .address {
      font-size: 24rpx;
    }
  }

  .identity-card {
    position: absolute;
    right: 40rpx;
    top: 40rpx;
    padding: 4rpx 24rpx;
    background: #FFFFFF;
    border-radius: 18rpx; 
    color: #034190;
    font-size: 28rpx;
  }
}
.commission-box {
  width: 670rpx;
  height: 176rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(182,182,182,0.25);
  border-radius: 12rpx;
  position: absolute;
  top: 20%;
  left: 5%;

  .item-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    padding: 30rpx 0;

    &-label {
      font-size: 28rpx;
    }

    &-value {
      font-size: 36rpx;
      font-weight: bold;
    }
  }
}

.operate-box {
  padding: 20rpx 30rpx 40rpx;
  margin-top: 8%;
}
.center-item {
  align-items: center;
  height: 52rpx;
  margin-right: 36rpx;
}
.center-img {
  width: 52rpx;
  height: 52rpx;
}
</style>