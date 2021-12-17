/*
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-17 13:51:52
 * @FilePath: \vue-vite-music\vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	let publicPath;
	if (command === "serve") {
		// 开发模式
		publicPath = "./";
	} else if (command === "build") {
		// 生产模式
		publicPath = "./";
	}

	return {
		// 静态资源服务的文件夹
		publicDir: "public",
		// 开发或生产环境服务的公共基础路径
		base: publicPath,

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
		//打包配置
		build: {
			//浏览器兼容性  "esnext"|"modules"
			target: "modules",
			//指定输出路径
			outDir: "./backend/music",
			//生成静态资源的存放路径
			assetsDir: "static/img/",
			rollupOptions: {
				output: {
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
				},
			},
			//小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
			assetsInlineLimit: 4096,
			//启用/禁用 CSS 代码拆分
			cssCodeSplit: true,
			//构建后是否生成 source map 文件
			sourcemap: false,
		},
	};
});
