<!--
 * @Author: Latte
 * @Date: 2021-12-06 01:00:54
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-12 20:53:06
 * @FilePath: \vue-vite-music\src\components\player\playlist.vue
-->
<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <!-- 添加hack方法，添加@click.stop，阻止方法冒泡被@click="hide"捕获 -->
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click.stop="changeMode"></i>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" tag="ul" name="list">
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorite">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <span
                  class="delete"
                  :class="{ disable: removing }"
                  @click.stop="removeSong(song)"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <div class="list-footer" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref="confirmRef"
          @confirm="confirmClear"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
        ></confirm>
        <add-song ref="addSongRef"></add-song>
      </div>
    </transition>
  </teleport>
</template>

<script>
import scroll from "../base/scroll/scroll.vue";
import Confirm from "../base/confirm/confirm.vue";
import { ref, computed } from "@vue/reactivity";
import { nextTick, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import useMode from "./use-mode";
import useFavorite from "./use-favorite";
import AddSong from "../add-song/add-song.vue";

export default {
  name: "playlist",
  components: { scroll, Confirm, AddSong },
  setup() {
    const visible = ref(false);
    const scrollRef = ref(null);
    const listRef = ref(null);
    const confirmRef = ref(null);
    const addSongRef = ref(null);
    const removing = ref(false);

    // Vuex
    const store = useStore();
    const playlist = computed(() => store.state.playlist);
    const sequenceList = computed(() => store.state.sequenceList);
    const currentSong = computed(() => store.getters.currentSong);

    // hooks
    const { modeIcon, modeText, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();

    // watch
    // 切换歌曲时自动滚动到当前歌曲
    watch(currentSong, async (newSong) => {
      if (!visible.value || !newSong.id) return;

      // 因为部分操作也会导致currentSong变化，比如删除歌曲。
      // 为了避免这种意外操作的影响，在nextTick之后再进行滚动
      await nextTick();
      scrollToCurrent();
    });

    function hide() {
      visible.value = false;
    }

    async function show() {
      visible.value = true;

      // 因为 refreshScroll 里的 scroll.refresh()是依赖 dom 元素 scroll 渲染成功才能调用的
      // 所以需要在 nextTick 之后运行
      await nextTick();
      refreshScroll();
      scrollToCurrent();
    }

    function selectItem(song) {
      const index = playlist.value.findIndex((item) => {
        return item.id === song.id;
      });
      store.commit("setCurrentIndex", index);
      store.commit("setPlayingState", true);
    }

    function getCurrentIcon(song) {
      if (song.id === currentSong.value.id) {
        return "icon-play";
      }
    }

    // 调整scroll渲染时机
    function refreshScroll() {
      scrollRef.value.scroll.refresh();
    }

    function scrollToCurrent() {
      // 获得当前播放歌曲的索引
      const index = sequenceList.value.findIndex((song) => {
        return currentSong.value.id === song.id;
      });

      if (index === -1) {
        return;
      }

      // 根据索引获得当前播放歌曲的dom
      const target = listRef.value.$el.children[index];

      scrollRef.value.scroll.scrollToElement(target, 300);
    }

    function removeSong(song) {
      if (removing.value) {
        return;
      }
      removing.value = true;
      store.dispatch("removeSong", song);
      if (!playlist.value.length) {
        hide();
      }
      setTimeout(() => {
        removing.value = false;
      }, 300);
    }

    function showConfirm() {
      confirmRef.value.show();
    }

    function confirmClear() {
      store.dispatch("clearSongList");
      hide();
    }

    function showAddSong() {
      addSongRef.value.show();
    }

    return {
      visible,
      removing,
      scrollRef,
      confirmRef,
      addSongRef,
      listRef,
      playlist,
      sequenceList,
      hide,
      show,
      selectItem,
      removeSong,
      getCurrentIcon,
      showConfirm,
      confirmClear,
      showAddSong,
      // mode
      modeIcon,
      modeText,
      changeMode,
      // favorite
      getFavoriteIcon,
      toggleFavorite,
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>