/*
 * @Author: Latte
 * @Date: 2021-11-19 00:31:45
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 01:19:46
 * @FilePath: \vue-vite-music\src\store\state.js
 */
import {
	PLAY_MODE,
	FAVORITE_KEY,
	SEARCH_KEY,
	PLAY_KEY,
} from "../assets/js/constant";
import { load } from "../assets/js/array-store";
const state = {
	sequenceList: [],
	playlist: [],
	playing: false,
	playMode: PLAY_MODE.sequence,
	currentIndex: 0,
	fullScreen: false,
	favoriteList: [],
	searchHistory: load(SEARCH_KEY),
	playHistory: [],
};

export default state;
