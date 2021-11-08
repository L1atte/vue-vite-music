/*
 * @Author: Latte
 * @Date: 2021-11-07 15:56:15
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-08 23:27:50
 * @FilePath: \vue-vite-music\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/recommend",
	},
	{
		path: "/recommend",
		component: () => import("@/views/recommend.vue"),
	},
	{
		path: "/singer",
		component: () => import("@/views/singer.vue"),
	},
	{
		path: "/top-list",
		component: () => import("@/views/top-list.vue"),
	},
	{
		path: "/search",
		component: () => import("@/views/search.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(), // hash模式
	routes,
});

export default router;
