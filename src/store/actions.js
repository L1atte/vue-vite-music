/*
 * @Author: Latte
 * @Date: 2021-11-19 00:54:43
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-23 01:19:53
 * @FilePath: \vue-vite-music\src\store\actions.js
 */

import { PLAY_MODE } from "../assets/js/constant";
import { shuffle } from "../assets/js/util";
export function selectPlay({ commit }, { list, index }) {
	commit("setPlayMode", PLAY_MODE.sequence);
	commit("setSequenceList", list);
	commit("setPlayingState", true);
	commit("setFullScreen", true);
	commit("setPlaylist", list);
	commit("setCurrentIndex", index);
}

export function randomPlay({ commit }, list) {
	commit("setPlayMode", PLAY_MODE.random);
	commit("setSequenceList", list);
	commit("setPlayingState", true);
	commit("setFullScreen", true);
	commit("setPlaylist", shuffle(list));
	commit("setCurrentIndex", 0);
}

export function changeMode({ commit, state, getters }, mode) {
	const currentId = getters.currentSong.id;
	if (mode === PLAY_MODE.random) {
		commit("setPlaylist", shuffle(state.sequenceList));
	} else {
		commit("setPlaylist", state.sequenceList);
	}

	// 防止点击随机播放后改变当前播放歌曲
	/**
	 * 获得当前播放歌曲的id(const currentId = getters.currentSong.id;)
	 * 通过匹配id获得该歌曲的索引index，然后通过设置当前播放歌曲的索引来实现
	 */
	const index = state.playlist.findIndex((song) => {
		return song.id === currentId;
	});

	commit("setCurrentIndex", index);
	commit("setPlayMode", mode);
}
