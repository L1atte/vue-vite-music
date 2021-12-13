/*
 * @Author: Latte
 * @Date: 2021-11-30 23:52:08
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 20:15:41
 * @FilePath: \vue-vite-music\src\components\player\use-mini-slider.js
 */
import { ref, computed } from "@vue/reactivity";
import { onActivated, onDeactivated } from "vue";
import { onMounted, onUnmounted, nextTick, watch } from "@vue/runtime-core";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BScroll.use(Slide);
import { useStore } from "vuex";
export default function useMiniSlider() {
	const sliderWrapperRef = ref(null);
	const slider = ref(null);

	const store = useStore();
	const fullScreen = computed(() => store.state.fullScreen);
	const playlist = computed(() => store.state.playlist);
	const currentIndex = computed(() => store.state.currentIndex);

	const sliderShow = computed(() => {
		return !fullScreen.value && !!playlist.value;
	});

	onMounted(() => {
		let sliderVal;
		watch(sliderShow, async (newSliderShow) => {
			if (newSliderShow) {
				await nextTick();
				if (!sliderVal) {
					sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
						click: true,
						scrollX: true, // 允许横向滚动
						scrollY: false, // 禁止垂直滚动
						momentum: false,
						bounce: false,
						probeType: 2,
						slide: {
							autoplay: false,
							loop: true,
						},
					});

					sliderVal.on("slidePageChanged", ({ pageX }) => {
						store.commit("setCurrentIndex", pageX);
					});
				} else {
					sliderVal.refresh();
				}
				sliderVal.goToPage(currentIndex.value, 0, 0);
			}
		});

		watch(currentIndex, (newIndex) => {
			if (sliderVal && sliderShow.value) {
				sliderVal.goToPage(newIndex, 0, 0);
			}
		});

		watch(playlist, async (newList) => {
			if (sliderVal && sliderShow.value && newList.length) {
				await nextTick();
				sliderVal.refresh();
			}
		});
	});

	onUnmounted(() => {
		if (slider.value) {
			slider.value.destroy();
		}
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
		sliderWrapperRef,
	};
}
