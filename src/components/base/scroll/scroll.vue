<!--
 * @Author: Latte
 * @Date: 2021-11-09 00:33:02
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-14 20:56:28
 * @FilePath: \vue-vite-music\src\components\base\scroll\scroll.vue
-->
<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'scroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    emits: ['scroll'],
    setup(props, { emit }) {
      const rootRef = ref(null)
      const scroll = useScroll(rootRef, props, emit)

      return {
        rootRef,
        scroll
      }
    }
  }
</script>