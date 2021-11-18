/*
 * @Author: Latte
 * @Date: 2021-11-19 00:31:45
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 01:12:54
 * @FilePath: \vue-vite-music\src\store\state.js
 */
import { PLAY_MODE } from "../assets/js/constant";
const state = {
	sequenceList: [],
	playList: [],
	playing: false,
	playMode: PLAY_MODE.sequence,
	currentIndex: 0,
	fullScreen: false,
};

export default state;
