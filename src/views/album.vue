<!--
 * @Author: Latte
 * @Date: 2021-12-09 01:44:58
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 02:01:12
 * @FilePath: \vue-vite-music\src\views\album.vue
-->
<template>
  <div class="album">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from "@/assets/js/create-detail-component.js";
import { getAlbum } from "@/server/recommend.js";
import { ALBUM_KEY } from "@/assets/js/constant";

export default createDetailComponent("album", ALBUM_KEY, getAlbum);
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
