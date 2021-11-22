/*
 * @Author: Latte
 * @Date: 2021-11-23 00:49:25
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-23 01:08:05
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

	function changeMode() {
		const mode = (playMode.value + 1) % 3;
		store.dispatch("changeMode", mode);
	}

	return {
		modeIcon,
		changeMode,
	};
}
