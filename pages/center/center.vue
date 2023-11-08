<template>
  <view>
    <view class="person-box gd-flex">
      <image :src="userInfo.headPhoto" class="avatar" @click.stop="toNextPage('setting')"></image>
      <view class="person-info gd-flex-v">
        <text class="name">{{ userInfo.name}}</text>
        <text class="code">ID：{{ userInfo.agentId }}</text>
        <text class="address">{{ userInfo.identityTypeName }}</text>
      </view>
      <view class="identity-card">
        <text>{{ userInfo.identityName }}</text>
      </view>
    </view>
    <view class="commission-box">
      <uni-grid :column="4" :highlight="true" :show-border="false">
				<uni-grid-item v-for="(item, index) in commissonList" :index="index" :key="index">
					<view class="item-box" @click="toNextPage(item.pageKey)">
						<text class="item-box-label">{{ item.label }}</text>
            <text class="item-box-value">{{ (item.pageKey == 'commission') ? '-.--' :  item.value }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
    </view>
    <view class="operate-box">
      <uni-list class="operate-list" :border="false">
        <uni-list-item title="收藏项目" thumb="/static/img/center/collect-icon.png" :border="false" clickable link to="/subpagesA/pages/collect/collect"></uni-list-item>
        <uni-list-item title="我的消息" thumb="/static/img/center/message-icon.png" :border="false" clickable link to="/subpagesA/pages/message/message">
          <template v-slot:header>
            <view class="center-item">
              <uni-badge v-if="isNewMsg" text="0" type="error" :is-dot="true" absolute="rightTop" size="small">
                <image src="/static/img/center/message-icon.png" class="center-img"></image>
              </uni-badge>
              <image v-else src="/static/img/center/message-icon.png" class="center-img"></image>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item v-for="item in centerList" :key="item.key" :title="item.text" :thumb="item.img" :border="false" clickable link :rightText="item.extraText" :to="item.link" ></uni-list-item>
        <!-- --TODO 客户跟进的链接要注意环境变更（测试https://crmtest.cimccity.com/cimcqa-page-mobile 正式https://crm.cimccity.com/ams/page-mobile） -->
        <uni-list-item v-if="userInfo.identityType == '1' || userInfo.identityType == '6'" title="客户跟进" thumb="/static/img/center/client-icon.png" :border="false" clickable link to="/subpagesA/pages/webview/webview?url=https://crmtest.cimccity.com/cimcqa-page-mobile"></uni-list-item>
        <uni-list-item v-if="userInfo.isReceptionist == '1'" title="来访登记" thumb="/static/img/center/operate-icon.png" :border="false" clickable link to="/subpagesA/pages/visit/visit-register"></uni-list-item>
        <uni-list-item v-if="userInfo.identityType == '6'" title="渠道运营管理" thumb="/static/img/center/docuemnt-icon.png" :border="false" clickable link to="/subpagesA/pages/boss/boss?type=operator"></uni-list-item>
        <uni-list-item v-if="userInfo.isOrgLeader == '1'" title="Boss管理" thumb="/static/img/center/docuemnt-icon.png" :border="false" clickable link to="/subpagesA/pages/boss/boss?type=leader"></uni-list-item>
        <!-- <uni-list-item v-if="userInfo.identityType == '4'" title="签署佣金协议" thumb="/static/img/center/docuemnt-icon.png" :border="false" clickable link @click="toSign()"></uni-list-item> -->
        <uni-list-item v-if="userInfo.identityType == '4'" title="我的网店" thumb="/static/img/center/docuemnt-icon.png" :border="false" clickable link to="/subpagesA/pages/onlinestore/onlinestore"></uni-list-item>
      </uni-list>
    </view>
    <uni-popup ref="msgPopup" type="dialog">
      <uni-popup-dialog type="info" cancelText="关闭" confirmText="同意" content="是否同意授权消息提醒" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>

</script>