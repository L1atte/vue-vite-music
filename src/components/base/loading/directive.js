/*
 * @Author: Latte
 * @Date: 2021-11-09 23:33:30
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-18 22:03:23
 * @FilePath: \vue-vite-music\src\components\base\loading\directive.js
 */
// 开发 Vue 指令
import Loading from "./loading.vue";
import createLoadingLikeDirective from "@/assets/js/create-loading-like-directive";

const loadingDirective = createLoadingLikeDirective(Loading);

export default loadingDirective;
