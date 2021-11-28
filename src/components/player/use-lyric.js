/*
 * @Author: Latte
 * @Date: 2021-11-28 19:42:24
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-29 00:13:18
 * @FilePath: \vue-vite-music\src\components\player\use-lyric.js
 */
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { getLyric } from "../../server/song";
import Lyric from "lyric-parser";
export default function useLyric({ songReady, currentTime }) {
	const store = useStore();
	const currentLyric = ref(null);
	const currentLineNum = ref(0);
	const pureMusicLyric = ref("");
	const playingLyric = ref("");
	const lyricScrollRef = ref(null);
	const lyricListRef = ref(null);

	const currentSong = computed(() => store.getters.currentSong);

	watch(currentSong, async (newSong) => {
		if (!newSong.url || !newSong.id) {
			return;
		}

		stopLyric();
		currentLyric.value = null;
		currentLineNum.value = 0;
		playingLyric.value = "";
		pureMusicLyric.value = "";

		const lyric = await getLyric(newSong);
		store.commit("addSongLyric", { song: newSong, lyric });
		// 假如 A 切换到 B 再切换到 C，因为currentSong是响应式的，而lyric是异步请求，则
		if (currentSong.value.lyric !== lyric) {
			return;
		}

		currentLyric.value = new Lyric(lyric, handleLyric);
		const hasLyric = currentLyric.value.lines.length;
		if (hasLyric) {
			if (songReady.value) {
				playLyric();
			}
		} else {
			playingLyric.value = pureMusicLyric.value = lyric.replace(
				/\[(\d{2}):(\d{2}):(\d{2})\]/g,
				""
			);
		}
	});

	function playLyric() {
		const currentLyricVal = currentLyric.value;
		if (currentLyricVal) {
			currentLyricVal.seek(currentTime.value * 1000);
		}
	}

	function stopLyric() {
		const currentLyricVal = currentLyric.value;
		if (currentLyricVal) {
			currentLyricVal.stop();
		}
	}

	function handleLyric({ lineNum, txt }) {
		currentLineNum.value = lineNum;
		playingLyric.value = txt;
		const scrollComp = lyricScrollRef.value;
		const listEl = lyricListRef.value;

		if (!listEl) return;

		if (lineNum > 5) {
			const lineEl = listEl.children[lineNum - 5];
			scrollComp.scroll.scrollToElement(lineEl, 1000);
		} else {
			scrollComp.scroll.scrollToElement(0, 0, 0);
		}
	}

	return {
		currentLyric,
		currentLineNum,
		playLyric,
		stopLyric,
		lyricScrollRef,
		lyricListRef,
		pureMusicLyric,
		playingLyric,
	};
}
