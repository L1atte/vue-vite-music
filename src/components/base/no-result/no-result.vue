<!--
 * @Author: Latte
 * @Date: 2021-11-18 21:25:25
 * @LAstEditors: Latte
 * @LastEditTime: 2022-01-27 17:39:04
 * @FilePath: \vue-vite-music\src\components\base\no-result\no-result.vue
-->
<template>
  <class class="no-result">
    <div class="no-result-content">
      <!-- <div class="icon">
        <p class="text">{{ title }}</p>
      </div> -->
      <p class="text">{{ title }}</p>
    </div>
  </class>
</template>

<script type="text/ecmascript-6">
export default {
  name: "no-result",
  data() {
    return {
      title: "抱歉，没有结果",
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .no-result-content {
    text-align: center;
    .icon {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      @include bg-image("no-result");
      background-size: 86px 90px;
    }
    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
