/*
 * @Author: Latte
 * @Date: 2021-12-09 00:34:40
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 01:18:47
 * @FilePath: \vue-vite-music\src\components\wrap-scroll\index.js
 */

// 高阶组件
import Scroll from "@/components/base/scroll/scroll.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { nextTick } from "@vue/runtime-core";
import { h, mergeProps, withCtx, renderSlot } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
	name: "wrap-scroll",
	props: Scroll.props,
	emits: Scroll.emits,
	render(ctx) {
		// h渲染函数可以理解为 Vue2的createElement()和createComponent()
		return h(
			Scroll,
			mergeProps(
				{
					ref: "scrollRef", // ref: "scrollRef" 相当于在模板中定义 ref="scrollRef"
				},
				ctx.$props,
				{
					onScroll: (e) => {
						ctx.$emit("scroll", e);
					},
				}
			),
			{
				default: withCtx(() => {
					return [renderSlot(ctx.$slots, "default")];
				}),
			}
		);
	},
	setup() {
		const scrollRef = ref(null);
		// 用计算属性确保能拿到 scrollRef.value.scroll
		const scroll = computed(() => {
			return scrollRef.value.scroll;
		});

		const store = useStore();
		const playlist = computed(() => store.state.playlist);

		watch(playlist, async () => {
			await nextTick();
			scroll.value.refresh();
		});

		return {
			scrollRef,
			scroll,
		};
	},
};
