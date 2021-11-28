/*
 * @Author: Latte
 * @Date: 2021-11-29 00:22:31
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-29 01:06:00
 * @FilePath: \vue-vite-music\src\components\player\use-middle-interactive.js
 */
import { ref, computed } from "@vue/reactivity";
export default function useMiddleInteractive(params) {
	const currentShow = ref("cd");
	const middleLStyle = ref(null);
	const middleRStyle = ref(null);

	const touch = {};
	let currentView = "cd";

	function onMiddleTouchStart(e) {
		touch.startX = e.touches[0].pageX;
	}

	function onMiddleTouchMove(e) {
		const deltaX = e.touches[0].pageX - touch.startX;
		const left = currentView === "cd" ? 0 : -window.innerWidth;
		const offsetWidth = Math.min(
			0,
			Math.max(-window.innerWidth, left + deltaX)
		);
		touch.percent = Math.abs(offsetWidth / window.innerWidth);

		if (currentView === "cd") {
			if (touch.percent > 0.2) {
				currentShow.value = "lyric";
			} else {
				currentShow.value = "cd";
			}
		} else {
			if (touch.percent < 0.8) {
				currentShow.value = "cd";
			} else {
				currentShow.value = "lyric";
			}
		}

		middleLStyle.value = {
			opacity: 1 - touch.percent,
			transitionDuration: "0ms",
		};

		middleRStyle.value = {
			transform: `translate3D(${offsetWidth}px,0,0)`,
			transitionDuration: "0ms",
		};
	}

	function onMiddleTouchEnd(e) {
		let offsetWidth;
		let opacity;
		if (currentShow.value === "cd") {
			currentView = "cd";
			offsetWidth = 0;
			opacity = 1;
		} else {
			currentView = "lyric";
			offsetWidth = -window.innerWidth;
			opacity = 0;
		}

		const duration = 300;

		middleLStyle.value = {
			opacity,
			transitionDuration: `${duration}ms`,
		};

		middleRStyle.value = {
			transform: `translate3D(${offsetWidth}px,0,0)`,
			transitionDuration: `${duration}ms`,
		};
	}

	return {
		currentShow,
		middleLStyle,
		middleRStyle,
		onMiddleTouchStart,
		onMiddleTouchMove,
		onMiddleTouchEnd,
	};
}
