/*
 * @Author: Latte
 * @Date: 2021-11-15 00:50:29
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-15 01:29:41
 * @FilePath: \vue-vite-music\src\components\base\index-list.vue\use-shortcut.js
 */
import { computed } from "@vue/reactivity";
import { ref } from "@vue/reactivity";
export default function useShortcut(props, groupRef) {
	const scrollRef = ref(null);

	const shortcutList = computed(() => {
		return props.data.map((group) => {
			return group.title;
		});
	});

	function onShortcutTouchStart(e) {
    // 可以使用e.target.dataset.xxx获取data-xxx的值
		// 小技巧，通过绑定 :data-index="index"，然后利用 e.target.dataset.index获取索引
		const anchorIndex = parseInt(e.target.dataset.index);
		const targetEl = groupRef.value.children[anchorIndex];
		const scroll = scrollRef.value.scroll;
		scroll.scrollToElement(targetEl, 0);
	}

	return {
		shortcutList,
    scrollRef,
		onShortcutTouchStart,
	};
}
