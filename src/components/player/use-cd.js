/*
 * @Author: Latte
 * @Date: 2021-11-27 21:23:19
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-28 18:34:23
 * @FilePath: \vue-vite-music\src\components\player\use-cd.js
 */
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default function useCD() {
	const cdRef = ref(null);
	const cdImageRef = ref(null);

	const store = useStore();
	const playing = computed(() => store.state.playing); // 获取播放状态

	const cdCls = computed(() => {
		// 根据播放状态设置图片是否旋转
		return playing.value ? "playing" : "";
	});

	watch(playing, (newPlaying) => {
		if (!newPlaying) {
			syncTransform(cdRef.value, cdImageRef.value);
		}
	});

	function syncTransform(wrapper, inner) {
    // 难点，对应视频5-10
		// 因为innerTransform是相对于wrapperTransform的角度，所以需要进行叠加
		const wrapperTransform = getComputedStyle(wrapper).transform;
		const innerTransform = getComputedStyle(inner).transform;
		wrapper.style.transform =
			wrapperTransform === "none"
				? innerTransform
				: innerTransform.concat(" ", wrapperTransform);
	}

	return {
		cdCls,
		cdRef,
		cdImageRef,
	};
}
