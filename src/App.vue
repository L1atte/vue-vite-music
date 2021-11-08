<!--
 * @Author: Latte
 * @Date: 2021-11-07 15:17:10
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-07 20:15:22
 * @FilePath: \vue-vite-music\src\App.vue
-->
<script setup>
import MHeader from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
</script>

<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
</template>

<style lang="scss">
@import "./assets/scss/index.scss";
</style>
