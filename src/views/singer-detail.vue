<!--
 * @Author: Latte
 * @Date: 2021-11-16 00:07:36
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 02:16:54
 * @FilePath: \vue-vite-music\src\views\singer-detail.vue
-->
<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :pic="pic"
      :title="title"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "../server/singer.js";
import { SINGER_KEY } from "@/assets/js/constant.js";
import createDetailComponent from "@/assets/js/create-detail-component.js";
export default createDetailComponent(
  "singer-detail",
  SINGER_KEY,
  getSingerDetail
);
// export default {
//   components: { MusicList },
//   name: "singer-detail",
//   props: {
//     singer: Object,
//   },
//   data() {
//     return {
//       songs: [],
//       loading: true,
//     };
//   },
//   computed: {
//     computedSinger() {
//       let res = null;
//       const singer = this.singer;
//       if (singer) {
//         res = singer;
//       } else {
//         const cachedSinger = storage.session.get(SINGER_KEY);
//         if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
//           res = cachedSinger;
//         }
//       }

//       return res;
//     },
//     pic() {
//       const singer = this.computedSinger;
//       return singer && singer.pic;
//     },
//     title() {
//       const singer = this.computedSinger;
//       return singer && singer.name;
//     },
//   },
//   async created() {
//     if (!this.computedSinger) {
//       const path = this.$route.matched[0].path;
//       this.$router.push({ path });
//       return;
//     }
//     const result = await getSingerDetail(this.computedSinger);
//     this.songs = await processSongs(result.songs);
//     this.loading = false;
//   },
// };
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>