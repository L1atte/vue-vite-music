/*
 * @Author: Latte
 * @Date: 2021-11-09 23:33:30
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-18 22:03:05
 * @FilePath: \vue-vite-music\src\components\base\no-result\directive.js
 */
import NoResult from './no-result.vue'
import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

const noResultDirective = createLoadingLikeDirective(NoResult)

export default noResultDirective
