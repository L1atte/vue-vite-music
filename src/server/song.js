/*
 * @Author: Latte
 * @Date: 2021-11-16 23:59:38
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-28 20:17:54
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

// export function getLyric(song) {
// 	const mid = song.mid;

// 	return get("/api/getLyric", {
// 		mid,
// 	}).then((result) => {
// 		const lyric = result ? result.lyric : "[00:00:00]该歌曲暂时无法获取歌词";
// 		return lyric;
// 	});
// }

const lyricMap = {};

export function getLyric(song) {
	// 如果存在歌词，则不发送请求，达到缓存歌词的效果
	if (song.lyric) {
		return Promise.resolve(song.lyric);
	}
	// 不同song对象的mid可能相同，则歌词可能相同，所以存在相同歌词时也不发送请求
	const mid = song.mid;
	const lyric = lyricMap[mid];
	if (lyric) {
		return Promise.resolve(lyric);
	}

	return get("/api/getLyric", {
		mid,
	}).then((result) => {
		const lyric = result ? result.lyric : "[00:00:00]该歌曲暂时无法获取歌词";
		lyricMap[mid] = lyric;
		return lyric;
	});
}
