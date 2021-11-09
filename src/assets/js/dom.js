/*
 * @Author: Latte
 * @Date: 2021-11-10 00:07:38
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-10 00:10:00
 * @FilePath: \vue-vite-music\src\assets\js\dom.js
 */
export function addClass(el, className) {
	if (!el.classList.contains(className)) {
		el.classList.add(className);
	}
}

export function removeClass(el, className) {
	el.classList.remove(className);
}
