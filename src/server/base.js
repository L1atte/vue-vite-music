/*
 * @Author: Latte
 * @Date: 2021-11-07 21:03:16
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-18 02:29:06
 * @FilePath: \vue-vite-music\src\server\base.js
 */
import axios from "axios";

const ERR_OK = 0;
const baseURL = import.meta.env.VITE_BASEURL || "";

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
