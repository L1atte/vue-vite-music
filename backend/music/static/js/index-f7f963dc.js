import{S as e}from"./index-1d3f0f78.js";import{Z as a,w as n,_ as c,h as p,g as l,u,i,y as f,z as m}from"./vendor-00d748a7.js";var h={name:"wrap-scroll",props:e.props,emits:e.emits,render(r){return a(e,c({ref:"scrollRef"},r.$props,{onScroll:s=>{r.$emit("scroll",s)}}),{default:n(()=>[f(r.$slots,"default")])})},setup(){const r=p(null),s=l(()=>r.value.scroll),o=u(),t=l(()=>o.state.playlist);return i(t,async()=>{await m(),s.value.refresh()}),{scrollRef:r,scroll:s}}};export{h as S};