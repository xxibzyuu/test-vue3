import {
	getCurrentUrl
} from './util'

const common = {
	// baseUrl: 'https://dev.1hello.com/cimcdev/api',
	baseUrl: 'https://vktest.cimccity.com/api',
	// baseUrl: 'https://vk.cimccity.com/api',
	
	header: {
		'custom-header': 'hello' //自定义请求头信息
	},
	data: {},
	method: 'GET',
	dataType: 'json'
}

export default { 
	// common: {
	// 	// baseUrl: 'https://dev.1hello.com/cimcdev/api',
	// 	baseUrl: 'https://vktest.cimccity.com/api',
	// 	// baseUrl: 'https://vk.cimccity.com/api',
		
	// 	header: {
	// 		'custom-header': 'hello' //自定义请求头信息
	// 	},
	// 	data: {},
	// 	method: 'GET',
	// 	dataType: 'json'
	// },
	request(options={}, extraOptions={loading: true}) {
		options.url = common.baseUrl + options.url;
		options.data =  options.data || common.data;
		options.header = Object.assign(common.header, options.header);
		options.method = options.method || common.method;
		options.dataType = common.dataType || options.dataType;
		
		return new Promise((response,reject)=>{
			if(extraOptions.loading) {
				uni.showLoading({
					title: '加载中'
				});
			}
			
			uni.request({
				...options,
				success: (result) => {
					const res = result.data
					const jump = uni.getStorageSync('jump')
					if(res.code === '0001') {
						debugger
						if(!jump) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							setTimeout(() => {
								uni.removeStorageSync('userInfo')
								uni.removeStorageSync('token')
								getCurrentUrl()
								uni.redirectTo({
									url: '/subpagesA/pages/login/login'
								})
							}, 1500);
							uni.setStorageSync('jump', true)
						}
						
						return
					}
					// if(res.code === '0002') {
					// 	if(!jump) {
					// 		uni.showToast({
					// 			title: res.msg,
					// 			icon: 'none'
					// 		})
							
					// 		setTimeout(() => {
					// 			getCurrentUrl()
					// 			uni.navigateTo({
					// 				url: '/subpagesA/pages/login/register'
					// 			})
					// 		}, 1500);
					// 		uni.setStorageSync('jump', true)
					// 	}
						
					// 	return
					// }
					if(res.code !== '0000'){
						return reject(res);
					}
					
					response(res)
				},
				fail: (err) => {console.log('err:');console.log(err)
					reject(err)
				},
				complete: () => {
					if(extraOptions.loading) {
						uni.hideLoading();
					}
				}
			})
		})
	}
}