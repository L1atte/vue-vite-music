<!--
 * @Author: Latte
 * @Date: 2021-12-09 22:42:31
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 23:16:03
 * @FilePath: \vue-vite-music\src\views\top-detail.vue
-->
<template>
  <div class="top-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      rank
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from "@/assets/js/create-detail-component.js";
import { getTopDetail } from "@/server/top-list";
import { TOP_KEY } from "@/assets/js/constant";

export default createDetailComponent("top-detail", TOP_KEY, getTopDetail);
</script>

<style lang="scss" scoped>
.top-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>