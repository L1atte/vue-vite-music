/*
 * @Author: Latte
 * @Date: 2021-12-10 00:42:25
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-10 00:43:34
 * @FilePath: \vue-vite-music\src\server\search.js
 */
import { get } from "./base.js";

export function getHotKeys() {
	return get("/api/getHotKeys");
}
