/*
 * @Author: Latte
 * @Date: 2021-11-09 23:33:30
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-10 00:32:21
 * @FilePath: \vue-vite-music\src\components\base\loading\directive.js
 */
// 开发 Vue 指令
import { createApp } from "@vue/runtime-dom";
import Loading from "./loading.vue";
import { addClass, removeClass } from "../../../assets/js/dom";

const relativeCls = "g-relative";

const loadingDirective = {
	mounted(el, binding) {
		const app = createApp(Loading);
		const instance = app.mount(document.createElement("div"));
		el.instance = instance;

		// 动态设置loading的title
		const title = binding.arg;
		if (typeof title !== "undefined") {
			el.instance.setTitle(title);
		}

		if (binding.value) {
			append(el);
		}
	},
	updated(el, binding) {
		// 动态设置loading的title
		const title = binding.arg;
		if (typeof title !== "undefined") {
			el.instance.setTitle(title);
		}
    
		if (binding.value !== binding.oldValue) {
			binding.value ? append(el) : remove(el);
		}
	},
};

function append(el) {
	const style = getComputedStyle(el);
	if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
		addClass(el, relativeCls);
	}
	el.appendChild(el.instance.$el);
}

function remove(el) {
	removeClass(el, relativeCls);
	el.removeChild(el.instance.$el);
}

export default loadingDirective;
