<!--
 * @Author: Latte
 * @Date: 2021-11-07 20:06:20
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 02:11:24
 * @FilePath: \vue-vite-music\src\views\singer.vue
-->
<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "../server/singer";
import indexList from "../components/base/index-list.vue/index-list.vue";
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
export default {
  components: { indexList },
  name: "singer",
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.cacheSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
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