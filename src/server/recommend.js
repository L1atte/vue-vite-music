/*
 * @Author: Latte
 * @Date: 2021-11-07 21:14:24
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 01:44:26
 * @FilePath: \vue-vite-music\src\server\recommend.js
 */
import { get } from "./base";

export function getRecommend() {
	return get("/api/getRecommend");
}

export function getAlbum(album) {
	return get("/api/getAlbum", {
		id: album.id,
	});
}
