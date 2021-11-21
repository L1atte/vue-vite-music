/*
 * @Author: Latte
 * @Date: 2021-11-21 20:21:09
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-21 21:08:39
 * @FilePath: \vue-vite-music\src\assets\js\util.js
 */
export function shuffle(source) {
	// 复制一个新数组，避免函数修改原数组，即避免函数的副作用
	const arr = source.slice();
	for (let i = 0; i < arr.length; i++) {
		const j = getRandomInt(i);
		swap(arr, i, j);
	}
	return arr;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

function swap(arr, i, j) {
	const t = arr[i];
	arr[i] = arr[j];
	arr[j] = t;
}
