/*
 * @Author: Latte
 * @Date: 2021-11-23 00:49:25
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-06 01:35:38
 * @FilePath: \vue-vite-music\src\components\player\use-mode.js
 */
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { PLAY_MODE } from "../../assets/js/constant";
export default function useMode() {
	const store = useStore();
	const playMode = computed(() => store.state.playMode);

	const modeIcon = computed(() => {
		const playModeVal = playMode.value;
		return playModeVal === PLAY_MODE.sequence
			? "icon-sequence"
			: playModeVal === PLAY_MODE.random
			? "icon-random"
			: "icon-loop";
	});

	// 播放模式文本 如单曲循环
	const modeText = computed(() => {
		const playModeVal = playMode.value;
		return playModeVal === PLAY_MODE.sequence
			? "顺序播放"
			: playModeVal === PLAY_MODE.random
			? "随机播放"
			: "单曲循环";
	});

	function changeMode() {
		const mode = (playMode.value + 1) % 3;
		store.dispatch("changeMode", mode);
	}

	return {
		modeIcon,
		modeText,
		changeMode,
	};
}
