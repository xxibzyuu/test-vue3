<template>
  <view class="login-box gd-flex-v">
    <view class="login-top gd-flex">
      <view class="gd-flex-v">
        <text>--</text>
        <text>手机号：暂无</text>
      </view>
    </view>
    <view class="login-bottom gd-flex-v">
      <image
        src="../../../static/img/login-empty.png"
        class="empty-img"
      ></image>
      <view class="gd-flex-v">
        <text>您还不是经纪人，</text>
        <text>马上注册经纪人赚取丰厚佣金吧</text>
      </view>
      <button
        class="primary-btn login-btn"
        open-type="getPhoneNumber"
        @getphonenumber="getphonenumber"
      >
        授权登录/注册
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, isRef, inject } from 'vue'
import { onLoad } from "@dcloudio/uni-app";

const $request = inject('request')
let loginCode = ref('')
const shareId = ref('')

onLoad((options) => {
  uni.removeStorageSync('jump')
  uni.login({
    success: (res) => {
      loginCode.value = res.code
    }
  })
  if(options.q) {
    let url = decodeURIComponent(options.q);
    let obj = getUrlParam(url);
    shareId = obj.shareId
  }
})

function getUrlParam(url) {
  if(url) {
    let params = url.split("?")[1].split("&");
    let obj = {};
    params.map((v) => (obj[v.split("=")[0]] = v.split("=")[1]));
    console.log(obj, "获取参数");
    return obj;
  }
}
async function getphonenumber(res) {
  const detail = res.detail
  let openId = ''
  let sessionKey = ''
  
  if(detail.errMsg == "getPhoneNumber:ok") {
    
    await $request.request({
      url: '/agent/wxauthinfo',
      data: {
        code: loginCode.value
      }
    }).then(res => {
      openId = res.data.openId
      sessionKey = res.data.sessionKey
    })

    await $request.request({
      url: '/agent/wxlogin',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        code: detail.code,
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        openId: openId,
        sessionKey: sessionKey,
        shareId: shareId
      }
    }).then(res => {
      uni.showToast({
        title: '登录成功'
      })
      
      setTimeout(() => {
        uni.setStorageSync('userInfo', res.data)
        uni.setStorageSync('token', res.data.tokenId)

        const isRegister = res.data.isRegister
        if(isRegister == '0') {
          uni.reLaunch({
            url: '/subpagesA/pages/login/register'
          })
          return
        }
        
        const lastUrl = uni.getStorageSync('currentUrl')
        
        if(lastUrl) {
          uni.reLaunch({
            url: lastUrl
          })
        }else {
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      }, 1500);
    }).catch(err => {
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
    })
  } else {
    console.log('用户拒绝授权');
  }
}


</script>


<style lang="scss" scoped>
.login-top {
  height: 100rpx;
  background: #034190;
  margin-bottom: 40rpx;
  padding: 40rpx;
  color: #ffffff;
}
.login-bottom {
  padding: 40rpx;
  align-items: center;
}
.empty-img {
  align-self: center;
}
.know-btn {
  margin-top: 30rpx;
  height: 60rpx;
  line-height: 60rpx;
}
.login-btn {
  width: 100%;
  margin-top: 40rpx;
}
</style>