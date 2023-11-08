let _debounceTimeout = null,
	_throttleRunning = false
import { pathToBase64, base64ToPath } from 'image-tools'
import CryptoJS from "crypto-js"

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay=500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay=500) => {
	if(_throttleRunning){
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
	    _throttleRunning = false;
	}, delay);
}
/**
 * toast
 */
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options={}) => {
	const userInfo = uni.getStorageSync('userInfo');
	if(userInfo){
		return true;
	}
	if(options.nav !== false){
		uni.navigateTo({
			url: '/pages/login'
		})
	}
	return false;
}


/**
 * 获取当前url
 */
export const getCurrentUrl = () => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const url = currentPage.$page.fullPath
	uni.setStorageSync('currentUrl', url)

	let options = currentPage.options
	if(options) {
		let urlParams = url + '?'
		for (let key in options) {
			const value = options[key]
			urlParams += `${key}=${value}&`
		}
		urlParams = urlParams.substring(0, urlParams.length-1);//去掉末尾的&
		uni.setStorageSync('currentUrl',`${urlParams}`)
	}

}


/**
 * url转换base64
 */
export const pathToBase = (path) => {
	const base64 = pathToBase64(path).then(base64 => {
		return base64
	})
	return base64
}

/**
 * base64转换url
 */
export const baseToPath = (base64) => {
	const path = base64ToPath(base64).then(path => {
		return path
	})
	return path
}

export function decrypt(data) {
	// let key = CryptoJS.enc.Utf8.parse('?~!@#$%^');//**必须是16位，且避免使用保留字符
	// let encryptedData  = CryptoJS.AES.encrypt("13580805131|21|1686128781382", key, {
	// 		mode: CryptoJS.mode.ECB,
	// 		padding: CryptoJS.pad.Pkcs7
	// });
	// let hexData = encryptedData.ciphertext.toString();
	// console.log('ecrypt',hexData)

	const SECRET_KEY = CryptoJS.enc.Utf8.parse('?~!@#$%^?~!@#$%^')
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	console.log('decrypt',decryptedStr)
  return decryptedStr.toString();
}