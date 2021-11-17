/*
 * @Author: Latte
 * @Date: 2021-11-10 00:58:18
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-17 00:30:11
 * @FilePath: \vue-vite-music\src\server\singer.js
 */
import { get } from './base'

export function getSingerList() {
  return get('/api/getSingerList')
}

export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid
  })
}
