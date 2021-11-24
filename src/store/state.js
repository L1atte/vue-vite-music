/*
 * @Author: Latte
 * @Date: 2021-11-19 00:31:45
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-24 23:44:31
 * @FilePath: \vue-vite-music\src\store\state.js
 */
import { PLAY_MODE, FAVORITE_KEY } from "../assets/js/constant";
import { load } from "../assets/js/array-store";
const state = {
	sequenceList: [],
	playlist: [],
	playing: false,
	playMode: PLAY_MODE.sequence,
	currentIndex: 0,
	fullScreen: false,
	favoriteList: load(FAVORITE_KEY),
};

export default state;
