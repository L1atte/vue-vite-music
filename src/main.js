/*
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-23 00:45:15
 * @FilePath: \vue-vite-music\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import loadingDirective from "./components/base/loading/directive";
import noResultDirective from "./components/base/no-result/directive";

// 引入全局样式文件
import '@/assets/scss/index.scss'

const app = createApp(App);
app
	.use(router)
	.use(store)
	.use(lazyPlugin, {
		loading: import("./assets/logo.png"),
	})
	.directive("loading", loadingDirective)
	.directive("no-result", noResultDirective)
	.mount("#app");
