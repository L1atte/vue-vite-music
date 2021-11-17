/*
 * @Author: Latte
 * @Date: 2021-11-15 00:50:29
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-15 23:34:55
 * @FilePath: \vue-vite-music\src\components\base\index-list.vue\use-shortcut.js
 */
import { computed } from "@vue/reactivity";
import { ref } from "@vue/reactivity";
export default function useShortcut(props, groupRef) {
	const scrollRef = ref(null);
	const ANCHOR_HEIGHT = 18;

	const shortcutList = computed(() => {
		return props.data.map((group) => {
			return group.title;
		});
	});

	const touch = {};

	function onShortcutTouchStart(e) {
		// 可以使用e.target.dataset.xxx获取data-xxx的值
		// 小技巧，通过绑定 :data-index="index"，然后利用 e.target.dataset.index获取索引
		const anchorIndex = parseInt(e.target.dataset.index);
		touch.y1 = e.touches[0].pageY;
		touch.anchorIndex = anchorIndex;

		scrollTo(anchorIndex);
	}

	function onShortcutTouchMove(e) {
		touch.y2 = e.touches[0].pageY;
		const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
		const anchorIndex = touch.anchorIndex + delta;

		scrollTo(anchorIndex);
	}

	function scrollTo(index) {
		if (isNaN(index)) return;

		index = Math.max(0, Math.min(index, shortcutList.value.length - 1));
		const targetEl = groupRef.value.children[index];
		const scroll = scrollRef.value.scroll;
		scroll.scrollToElement(targetEl, 0);
	}

	return {
		shortcutList,
		scrollRef,
		onShortcutTouchStart,
		onShortcutTouchMove,
	};
}
