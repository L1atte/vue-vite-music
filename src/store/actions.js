/*
 * @Author: Latte
 * @Date: 2021-11-19 00:54:43
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-08 04:38:29
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

// 删除歌曲
export function removeSong({ commit, state }, song) {
	// 因为Vuex不允许直接修改数据
	const sequenceList = state.sequenceList.slice();
	const playlist = state.playlist.slice();

	const sequenceIndex = findIndex(sequenceList, song);
	const playIndex = findIndex(playlist, song);

	if (playIndex < 0 || sequenceIndex < 0) {
		return;
	}

	sequenceList.splice(sequenceIndex, 1);
	playlist.splice(playIndex, 1);

	// 如果删除的歌曲索引小于当前歌曲索引，
	// 或者删除歌曲的索引等于当前播放列表长度
	// 那么当前歌曲索引需要减 1
	let currentIndex = state.currentIndex;
	if (playIndex < currentIndex || currentIndex === playlist.length) {
		currentIndex--;
	}

	commit("setSequenceList", sequenceList);
	commit("setPlaylist", playlist);
	commit("setCurrentIndex", currentIndex);
	if (!playlist.length) {
		commit("setPlayingState", false);
	}
}

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id;
	});
}

export function clearSongList({ commit }) {
	commit("setSequenceList", []);
	commit("setPlaylist", []);
	commit("setCurrentIndex", 0);
	commit("setPlayingState", false);
}
