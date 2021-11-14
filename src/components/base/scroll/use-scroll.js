/*
 * @Author: Latte
 * @Date: 2021-11-09 00:34:03
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-14 20:57:33
 * @FilePath: \vue-vite-music\src\components\base\scroll\user-scroll.js
 */
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options, emit) {
	const scroll = ref(null);

	onMounted(() => {
		const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
			observeDOM: true,
			...options,
		}));

		if (options.probeType > 0) {
			scrollVal.on("scroll", (pos) => {
				emit("scroll", pos);
			});
		}
	});

	onUnmounted(() => {
		scroll.value.destroy();
	});

	return scroll
}
