/*
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-17 09:53:45
 * @FilePath: \vue-vite-music\vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			// 配置路径别名
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			// 使用 proxy 实例
			"/api": {
				target: "http://localhost:8080/",
				changeOrigin: true,
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "./src/assets/scss/variable.scss";
          @import "./src/assets/scss/mixin.scss";
        `,
			},
		},
	},
	configureWebpack: (config) => {
		if (process.env.npm_config_report) {
			const BundleAnalyzerPlugin =
				require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
			config.plugins.push(new BundleAnalyzerPlugin());
		}
	},
	plugins: [vue()],
	build: {
		assetsDir: "static/img/",
		rollupOptions: {
			output: {
				chunkFileNames: "static/js/[name]-[hash].js",
				entryFileNames: "static/js/[name]-[hash].js",
				assetFileNames: "static/[ext]/[name]-[hash].[ext]",
			},
		},
	},
});
