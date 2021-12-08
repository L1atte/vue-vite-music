<!--
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 00:22:19
 * @FilePath: \vue-vite-music\src\App.vue
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle"></router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "@/components/player/player.vue";
import { mapState } from "vuex";

export default {
  components: {
    Player,
    MHeader: Header,
    Tab,
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? "60px" : "0";
      return {
        bottom,
      };
    },
    ...mapState(["playlist"]),
  },
};
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
</style>

