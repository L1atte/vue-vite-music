/*
 * @Author: Latte
 * @Date: 2021-11-16 23:59:38
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-17 00:04:33
 * @FilePath: \vue-vite-music\src\server\song.js
 */
import { get } from "./base";
export function processSongs(songs) {
	if (!songs.length) {
		return Promise.resolve(songs);
	}

	return get("/api/getSongsUrl", {
		mid: songs.map((song) => {
			return song.mid;
		}),
	}).then((result) => {
		const map = result.map;
		return songs
			.map((song) => {
				song.url = map[song.mid];
				return song;
			})
			.filter((song) => {
				return song.url && song.url.indexOf("vkey") > -1;
			});
	});
}
