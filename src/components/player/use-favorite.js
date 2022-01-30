/*
 * @Author: Latte
 * @Date: 2021-11-24 22:51:00
 * @LAstEditors: Latte
 * @LastEditTime: 2022-01-30 17:06:12
 * @FilePath: \vue-vite-music\src\components\player\use-favorite.js
 */
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { save, remove } from "../../assets/js/array-store";
import { FAVORITE_KEY } from "../../assets/js/constant";

export default function useFavorite() {
	const store = useStore();
	const favoriteList = computed(() => store.state.favoriteList);
	const maxLen = 100;

	function getFavoriteIcon(song) {
		return isFavorite(song) ? "iconfont icon-favorite" : "iconfont icon-not-favorite";
	}

	function isFavorite(song) {
		return (
			favoriteList.value.findIndex((item) => {
				return item.id === song.id;
			}) > -1
		);
	}

	function toggleFavorite(song) {
		let list;
		if (isFavorite(song)) {
			// remove
			list = remove(FAVORITE_KEY, compare);
		} else {
			// save
			list = save(song, FAVORITE_KEY, compare, maxLen);
		}
		store.commit("setFavoriteList", list);

		function compare(item) {
			return item.id === song.id;
		}
	}

	return {
		getFavoriteIcon,
		toggleFavorite,
	};
}
