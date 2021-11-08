/*
 * @Author: Latte
 * @Date: 2021-11-09 00:34:03
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-09 01:16:14
 * @FilePath: \vue-vite-music\src\components\base\scroll\user-scroll.js
 */
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options) {
	const scroll = ref(null);

	onMounted(() => {
		scroll.value = new BScroll(wrapperRef.value, {
			observeDOM: true,
			...options,
		});
	});

	onUnmounted(() => {
		scroll.value.destroy();
	});
}
