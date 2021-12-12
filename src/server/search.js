/*
 * @Author: Latte
 * @Date: 2021-12-10 00:42:25
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-11 22:58:03
 * @FilePath: \vue-vite-music\src\server\search.js
 */
import { get } from "./base.js";

export function getHotKeys() {
	return get("/api/getHotKeys");
}

export function search(query, page, showSinger) {
	return get("/api/search", {
		query,
		page,
		showSinger,
	});
}
