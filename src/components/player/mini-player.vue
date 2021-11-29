<!--
 * @Author: Latte
 * @Date: 2021-11-29 23:42:34
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-30 01:10:55
 * @FilePath: \vue-vite-music\src\components\player\mini-player.vue
-->
<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            :class="cdCls"
            ref="cdImageRef"
            :src="currentSong.pic"
            width="40"
            height="40"
          />
        </div>
      </div>
      <div>
        <h2 class="name">{{ currentSong.name }}</h2>
        <p class="desc">{{ currentSong.singer }}</p>
      </div>
      <div class="control">
        <progress-circle :radius="32" :progress="progress">
          <i
            class="icon-mini"
            :class="miniPlayIcon"
            @click.stop="togglePlay"
          ></i>
        </progress-circle>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import useCD from "./use-cd";
import progressCircle from "./progress-circle.vue";
export default {
  components: { progressCircle },
  name: "mini-player",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    togglePlay: Function,
  },
  setup() {
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const miniPlayIcon = computed(() => {
      return playing.value ? "icon-pause-mini" : "icon-play-mini";
    });

    // hooks
    const { cdCls, cdRef, cdImageRef } = useCD();

    function showNormalPlayer() {
      store.commit("setFullScreen", true);
    }

    return {
      fullScreen,
      currentSong,
      miniPlayIcon,
      showNormalPlayer,
      // cd
      cdCls,
      cdRef,
      cdImageRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .name {
    margin-bottom: 2px;
    @include no-wrap();
    font-size: $font-size-medium;
    color: $color-text;
  }
  .desc {
    @include no-wrap();
    font-size: $font-size-small;
    color: $color-text-d;
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;

    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>