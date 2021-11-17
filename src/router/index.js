/*
 * @Author: Latte
 * @Date: 2021-11-07 15:56:15
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-16 00:13:47
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
		children: [
			{
				path: ':id',
				component: () => import("@/views/singer-detail.vue"),
			},
		],
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
