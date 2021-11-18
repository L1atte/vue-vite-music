<!--
 * @Author: Latte
 * @Date: 2021-11-16 23:27:04
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 01:23:14
 * @FilePath: \vue-vite-music\src\components\music-list\music-list.vue
-->
<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../base/scroll/scroll.vue";
import SongList from "../base/song-list/song-list.vue";
import { mapActions } from "vuex";

const RESERVED_HEIGHT = 40;

export default {
  name: "music-list",
  components: {
    SongList,
    Scroll,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: "抱歉，没有找到可播放的歌曲",
    },
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length;
    },
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;

      // 处理 iOS 兼容
      let translateZ = 0;

      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        translateZ = 1;
        height = `${RESERVED_HEIGHT}px`;
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;

      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }

      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    selectItem({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>