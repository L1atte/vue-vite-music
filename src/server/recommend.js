/*
 * @Author: Latte
 * @Date: 2021-11-07 21:14:24
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-08 01:03:04
 * @FilePath: \vue-vite-music\src\server\recommend.js
 */
import { get } from "./base";

export function getRecommend() {
	return get("/api/getRecommend");
}
