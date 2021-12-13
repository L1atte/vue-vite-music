/*
 * @Author: Latte
 * @Date: 2021-11-07 21:03:16
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 23:39:31
 * @FilePath: \vue-vite-music\src\server\base.js
 */
import axios from "axios";

const ERR_OK = 0;
const baseURL = "http://localhost:9002";

axios.defaults.baseURL = baseURL;

export function get(url, params) {
	return axios
		.get(url, {
			params,
		})
		.then((res) => {
			const serverData = res.data;
			if (serverData.code === ERR_OK) {
				return serverData.result;
			}
		})
		.catch((e) => {
			console.log(e);
		});
}
