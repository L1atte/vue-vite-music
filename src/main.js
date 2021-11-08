/*
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-09 01:37:04
 * @FilePath: \vue-vite-music\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";

const app = createApp(App);
app
	.use(router)
	.use(store)
	.use(lazyPlugin, {
		loading: import("./assets/logo.png"),
	})
	.mount("#app");
