/*
 * @Author: Latte
 * @Date: 2021-12-09 21:56:07
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 22:36:15
 * @FilePath: \vue-vite-music\src\server\top-list.js
 */
import { get } from "./base.js";
export function getTopList() {
	return get("/api/getTopList");
}

export function getTopDetail(top) {
	return get("/api/getTopDetail", {
		id: top.id,
		period: top.period,
	});
}
