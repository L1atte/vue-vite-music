<!--
 * @Author: Latte
 * @Date: 2021-11-09 00:33:02
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-09 01:07:45
 * @FilePath: \vue-vite-music\src\components\base\scroll\scroll.vue
-->
<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from "./user-scroll";
import { ref } from "@vue/reactivity";
export default {
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rootRef = ref(null);
    useScroll(rootRef, props);

    return {
      rootRef,
    };
  },
};
</script>

<style>
</style>