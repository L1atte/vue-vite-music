/*
 * @Author: Latte
 * @Date: 2021-11-09 00:34:03
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 20:11:50
 * @FilePath: \vue-vite-music\src\components\base\scroll\use-scroll.js
 */
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue";

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

	onActivated(() => {
		scroll.value.enable();
		scroll.value.refresh();
	});

	onDeactivated(() => {
		scroll.value.disable()
	})

	return scroll;
}
