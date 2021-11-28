/*
 * @Author: Latte
 * @Date: 2021-11-19 00:48:33
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-24 22:50:33
 * @FilePath: \vue-vite-music\src\store\mutations.js
 */
const mutations = {
	setPlayingState(state, playing) {
		state.playing = playing;
	},
	setSequenceList(state, list) {
		state.sequenceList = list;
	},
	setPlaylist(state, list) {
		state.playlist = list;
	},
	setPlayMode(state, mode) {
		state.playMode = mode;
	},
	setCurrentIndex(state, index) {
		state.currentIndex = index;
	},
	setFullScreen(state, fullScreen) {
		state.fullScreen = fullScreen;
	},
	setFavoriteList(state, list) {
		state.favoriteList = list;
	},
	addSongLyric(state, { song, lyric }) {
		// 遍历sequenceList，找到相应的song然后复制lyric
		state.sequenceList.map((item) => {
			if (item.mid === song.mid) {
				item.lyric = lyric;
			}
      return item
		});
	},
};

export default mutations;
