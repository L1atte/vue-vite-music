/*
 * @Author: Latte
 * @Date: 2021-11-18 21:33:20
 * @LAstEditors: Latte
 * @LastEditTime: 2021-11-19 01:15:05
 * @FilePath: \vue-vite-music\src\assets\js\create-loading-like-directive.js
 */
import { createApp } from "@vue/runtime-dom";
import { addClass, removeClass } from "@/assets/js/dom";

const relativeCls = "g-relative";

export default function createLoadingLikeDirective(Comp) {
  return {
    mounted(el, binding) {
      const app = createApp(Comp);
      const instance = app.mount(document.createElement("div"));
      const name = Comp.name
      if(!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance;
  
      // 动态设置loading的title
      const title = binding.arg;
      if (typeof title !== "undefined") {
        instance.setTitle(title);
      }
   
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      // 动态设置loading的title
      const title = binding.arg;
      // 通过函数闭包获取 Comp.name 
      const name = Comp.name
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
      
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };

  function append(el) {
    const style = getComputedStyle(el);
    const name = Comp.name
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeCls);
    }
    el.appendChild(el[name].instance.$el);
  }
  
  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls);
    el.removeChild(el[name].instance.$el);
  }
}