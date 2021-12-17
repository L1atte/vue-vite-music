/*
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-17 13:52:50
 * @FilePath: \vue-vite-music\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import loadingDirective from "./components/base/loading/directive";
import noResultDirective from "./components/base/no-result/directive";
import { load, saveAll } from "@/assets/js/array-store";
import { FAVORITE_KEY, PLAY_KEY } from "./assets/js/constant";
import { processSongs } from "@/server/song.js";

// 引入全局样式文件
import "@/assets/scss/index.scss";

console.log("env",import.meta.env)

// 初始化FavoriteList
const favoriteSongs = load(FAVORITE_KEY);
if (favoriteSongs.length > 0) {
	processSongs(favoriteSongs).then((songs) => {
		store.commit("setFavoriteList", songs);
		saveAll(songs, FAVORITE_KEY);
	});
}

// 初始化播放历史列表
const historySongs = load(PLAY_KEY);
if (historySongs.length > 0) {
	processSongs(historySongs).then((songs) => {
		store.commit("setPlayHistory", songs);
		saveAll(songs, PLAY_KEY);
	});
}

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
