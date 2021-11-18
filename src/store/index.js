/*
 * @Author: Latte
 * @Date: 2021-11-07 16:05:33
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 01:20:55
 * @FilePath: \vue-vite-music\src\store\index.js
 */
import { createStore, createLogger } from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as getters from "./getter";
import * as actions from "./actions";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
	state,
	mutations,
	actions,
	getters,
	plugins: [createLogger()]
});
