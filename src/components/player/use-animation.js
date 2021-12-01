/*
 * @Author: Latte
 * @Date: 2021-12-01 23:21:23
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-02 01:10:04
 * @FilePath: \vue-vite-music\src\components\player\use-animation.js
 */
// 使用transition hook
import { ref } from "vue";
import animations from "create-keyframe-animation";

export default function useAnimation() {
	const cdWrapperRef = ref(null);

	// 如果操作过于迅速，在动画过渡时间内进行下一个动画，会导致afterEnter的销毁作用失效
	// 定义两个标志位，以避免这个bug
	let entering = false;
	let leaving = false;

	function enter(el, done) {
		if (leaving) {
			// 如果leave动画还没结束，就进入enter动画的话，强制执行afterLeave，达到销毁效果
			afterLeave();
		}
		entering = true;
		const { x, y, scale } = getPosAndScale();

		// 过渡效果
		const animation = {
			0: {
				transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
			},
			100: {
				transform: "translate3d(0, 0, 0) scale(1)",
			},
		};

		// 注册动画
		animations.registerAnimation({
			name: "move",
			animation,
			presets: {
				duration: 600,
				easing: "cubic-bezier(0.45, 0, 0.55, 1)",
			},
		});

		// 需要done函数是因为，通过JS做动画效果，Vue内部不知道什么时候进入afterEnter
		animations.runAnimation(cdWrapperRef.value, "move", done);
	}

	function afterEnter() {
		entering = false;
		// destroy
		animations.unregisterAnimation("move");
		cdWrapperRef.value.animation = "";
	}

	function leave(el, done) {
		if (entering) {
			// 如果enter动画还没结束，就进入leave动画的话，强制执行afterEnter，达到销毁效果
			afterEnter();
		}
		leaving = true;
		const { x, y, scale } = getPosAndScale();
		const cdWrapperEl = cdWrapperRef.value;

		cdWrapperEl.style.transition = "all .6s cubic-bezier(0.45, 0, 0.55, 1)";
		cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
		cdWrapperEl.addEventListener("transitionend", next);

		function next() {
			cdWrapperEl.removeEventListener("transitionend", next);
			done();
		}
	}

	function afterLeave() {
		leaving = false;
		const cdWrapperEl = cdWrapperRef.value;

		cdWrapperEl.style.transition = "";
		cdWrapperEl.style.transform = "";
	}

	function getPosAndScale() {
		// 因为cd-wrapper的css设置是
		/**
		 * .cd-wrapper {
		 *    flex: 0 0 40px;
		 *    width: 40px;
		 *    height: 40px;
		 *    padding: 0 10px 0 20px;
		 *   }
		 */
		// 小CD的宽度，即直径
		const targetWidth = 40;
		// 小CD圆心距离左屏幕的距离
		const paddingLeft = 40;
		// 小CD圆心距离底边的距离
		const paddingBottom = 30;
		// 大CD圆边距离上屏幕的距离
		const paddingTop = 80;
		// 大CD的宽度，即直径
		const width = window.innerWidth * 0.8;

		// 水平偏移量，因为是向左偏移，所以是负值
		const x = -(window.innerWidth / 2 - paddingLeft);
		// 垂直偏移量，向下偏移，正值
		const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
		// 缩放比例，用小CD直径比大CD直径
		const scale = targetWidth / width;
		return {
			x,
			y,
			scale,
		};
	}

	return {
		cdWrapperRef,
		enter,
		afterEnter,
		leave,
		afterLeave,
	};
}
