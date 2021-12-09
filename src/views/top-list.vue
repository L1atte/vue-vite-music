<!--
 * @Author: Latte
 * @Date: 2021-11-07 20:06:20
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-09 22:55:09
 * @FilePath: \vue-vite-music\src\views\top-list.vue
-->
<template>
  <div class="top-list" v-loading="loading">
    <scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}</span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getTopList } from "@/server/top-list";
import Scroll from "@/components/wrap-scroll/index.js";
import { TOP_KEY } from "@/assets/js/constant";
import storage from "good-storage";
export default {
  name: "top-list",
  components: {
    Scroll,
  },
  data() {
    return {
      topList: [],
      loading: true,
      selectedTop: null,
    };
  },
  async created() {
    const result = await getTopList();
    this.topList = result.topList;
    this.loading = false;
  },
  methods: {
    selectItem(top) {
      this.selectedTop = top;
      this.cacheTop(top);
      this.$router.push({
        path: `/top-list/${top.id}`,
      });
    },
    cacheTop(top) {
      storage.session.set(TOP_KEY, top );
    },
  },
};
</script>
<style lang="scss" scoped>
.top-list {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .top-list-content {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
  }
}
</style>