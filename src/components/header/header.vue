<!--
 * @Author: Latte
 * @Date: 2021-11-07 18:17:49
 * @LAstEditors: Latte
 * @LastEditTime: 2022-01-30 17:23:15
 * @FilePath: \vue-vite-music\src\components\header\header.vue
-->
<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">Latte</h1>
    <router-link class="mine" to="/user">
      <i class="iconfont icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "m-header",
};
</script>

<style lang="scss" scoped>
  .header {
    height: 44px;
    text-align: center;
    color: $color-theme;
    font-size: 0;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      @include bg-image('logo');
      background-size: 30px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: $font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
  }
</style>