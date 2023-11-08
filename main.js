import App from './App'
import request from './common/request.js'

import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)

	app.provide("request", request)
	app.provide("imageHost", "https://vktest.cimccity.com")
	// app.config.globalProperties.$request = request
	// app.config.globalProperties.imageHost = "https://vktest.cimccity.com";
	// app.config.globalProperties.imageHost = "https://vk.cimccity.com";

	return {
		app
	}
}
