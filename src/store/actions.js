/*
 * @Author: Latte
 * @Date: 2021-11-19 00:54:43
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 01:02:22
 * @FilePath: \vue-vite-music\src\store\actions.js
 */

import { PLAY_MODE } from "../assets/js/constant";
export function selectPlay({commit}, {list, index}) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}