/*
 * @Author: Latte
 * @Date: 2021-11-07 21:44:38
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 20:14:21
 * @FilePath: \vue-vite-music\src\components\base\slider\user-slider.js
 */
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from "vue";

BScroll.use(Slide);

export default function useSlider(wrapperRef) {
	const slider = ref(null);
	const currentPageIndex = ref(0);

	onMounted(() => {
		const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
			click: true,
			scrollX: true,
			scrollY: false,
			momentum: false,
			bounce: false,
			probeType: 2,
			slide: true,
		}));

		sliderVal.on("slideWillChange", (page) => {
			currentPageIndex.value = page.pageX;
		});
	});

	onUnmounted(() => {
		slider.value.destroy();
	});

	onActivated(() => {
		slider.value.enable();
		slider.value.refresh();
	});

	onDeactivated(() => {
		slider.value.disable();
	});

	return {
		slider,
		currentPageIndex,
	};
}
