/*
 * @Author: Latte
 * @Date: 2021-12-12 18:34:57
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-12 20:03:55
 * @FilePath: \vue-vite-music\src\components\search\use-search-history.js
 */
import { save, remove, clear } from "@/assets/js/array-store.js";
import { SEARCH_KEY } from "@/assets/js/constant";
import { useStore } from "vuex";

export default function useSearchHistory(params) {
	const maxLen = 200;

	const store = useStore();

	function saveSearch(query) {
		const searches = save(
			query,
			SEARCH_KEY,
			(item) => {
				return item === query;
			},
			maxLen
		);
		store.commit("setSearchHistory", searches);
	}

	function deleteSearch(query) {
		const searches = remove(SEARCH_KEY, (item) => {
			return item === query;
		});
		store.commit("setSearchHistory", searches);
	}

	function clearSearch() {
		const searches = clear(SEARCH_KEY);
		store.commit("setSearchHistory", searches);
	}

	return {
		saveSearch,
		deleteSearch,
		clearSearch,
	};
}
