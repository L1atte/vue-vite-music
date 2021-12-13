<!--
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-13 19:57:11
 * @FilePath: \vue-vite-music\src\App.vue
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-slot="{ Component }" name="user" :style="viewStyle">
    <!-- 使用任何自定义过渡和回退到 `fade` -->
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
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

