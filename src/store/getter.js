/*
 * @Author: Latte
 * @Date: 2021-11-19 00:34:36
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 00:34:36
 * @FilePath: \vue-vite-music\src\store\getter.js
 */
export const currentSong = (state) => {
  return state.playList[state.currentIndex]
}