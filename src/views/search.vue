<!--
 * @Author: Latte
 * @Date: 2021-11-07 20:06:20
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-10 00:47:31
 * @FilePath: \vue-vite-music\src\views\search.vue
-->
<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="search-content">
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            class="item"
            v-for="item in hotKeys"
            :key="item.id"
            @click="addQuery(item.key)"
          >
            <span>{{ item.key }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/search/search-input.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { getHotKeys } from "@/server/search";
export default {
  name: "search",
  components: { SearchInput },
  setup() {
    const query = ref("");
    const hotKeys = ref([]);

    getHotKeys().then((result) => {
      hotKeys.value = result.hotKeys;
    });

    function addQuery(key) {
      query.value = key;
    }

    return {
      query,
      hotKeys,
      addQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
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
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
