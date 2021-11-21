<!--
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-22 01:33:48
 * @FilePath: \vue-vite-music\src\App.vue
-->
<script setup>
import MHeader from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "./components/player/player.vue";
</script>

<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
  <player></player>
</template>

<style lang="scss">
@import "./assets/scss/index.scss";
</style>

