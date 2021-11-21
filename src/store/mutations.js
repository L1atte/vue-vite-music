/*
 * @Author: Latte
 * @Date: 2021-11-19 00:48:33
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-21 21:06:23
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
    state.playlist = list
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen
  },
};

export default mutations
