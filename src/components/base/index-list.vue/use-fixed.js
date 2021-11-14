/*
 * @Author: Latte
 * @Date: 2021-11-14 19:55:29
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-15 00:59:42
 * @FilePath: \vue-vite-music\src\components\base\index-list.vue\use-fixed.js
 */
import { ref, computed } from "@vue/reactivity";
import { watch, nextTick } from "@vue/runtime-core";

export default function useFixed(props) {
	const TITLE_HEIGHT = 30;
	const groupRef = ref(null);
	const listHeights = ref([]);
	const scrollY = ref(0);
	const currentIndex = ref(0);
	const distance = ref(0);

	const fixedTitle = computed(() => {
		if (scrollY.value < 0) {
			return "";
		}
		const currentGroup = props.data[currentIndex.value];
		return currentGroup ? currentGroup.title : "";
	});

	const fixedStyle = computed(() => {
		const distanceVal = distance.value;
		const diff =
			distanceVal > 0 && distanceVal < TITLE_HEIGHT
				? distanceVal - TITLE_HEIGHT
				: 0;
		return {
			transform: `translate3d(0,${diff}px,0)`,
		};
	});

	// 监听一个 getter函数，也就是监听 data 的变化
	watch(
		() => props.data,
		async () => {
			await nextTick();
			calculate();
		}
	);

	watch(scrollY, (newY) => {
		const listHeightsVal = listHeights.value;
		for (let i = 0; i < listHeightsVal.length - 1; i++) {
			const heightTop = listHeightsVal[i];
			const heightBottom = listHeightsVal[i + 1];

			if (newY >= heightTop && newY <= heightBottom) {
				currentIndex.value = i;
				distance.value = heightBottom - newY;
			}
		}
	});

	function calculate() {
		const list = groupRef.value.children;
		let height = 0;

		listHeights.value.length = 0;
		listHeights.value.push(height);

		for (let i = 0; i < list.length; i++) {
			height += list[i].clientHeight;
			listHeights.value.push(height);
		}
	}

	function onScroll(pos) {
		scrollY.value = -pos.y; // 因为betterScroll从0到负值
	}

	return {
		groupRef,
		onScroll,
		fixedTitle,
		fixedStyle,
    currentIndex,
	};
}
