/*
 * @Author: Latte
 * @Date: 2021-12-12 21:40:26
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-12 21:47:35
 * @FilePath: \vue-vite-music\src\components\player\use-play-history.js
 */
import { useStore } from "vuex";
import { PLAY_KEY } from "@/assets/js/constant";
import { save } from "@/assets/js/array-store";
export default function usePlayHistory(params) {
	const store = useStore();

	const maxLen = 200;

	function savePlay(song) {
		const songs = save(
			song,
			PLAY_KEY,
			(item) => {
				return item.id === song.id;
			},
			maxLen
		);

		store.commit("setPlayHistory", songs);
	}
	return {
		savePlay,
	};
}
