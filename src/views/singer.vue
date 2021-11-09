<!--
 * @Author: Latte
 * @Date: 2021-11-07 20:06:20
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-10 01:30:12
 * @FilePath: \vue-vite-music\src\views\singer.vue
-->
<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from "@/server/singer.js";
import indexList from "../components/base/index-list.vue/index-list.vue";
export default {
  components: { indexList },
  name: "singer",
  data() {
    return {
      singers: [],
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>