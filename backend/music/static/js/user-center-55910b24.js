var k=Object.defineProperty;var m=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var v=(s,e,t)=>e in s?k(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,a=(s,e)=>{for(var t in e||(e={}))I.call(e,t)&&v(s,t,e[t]);if(m)for(var t of m(e))b.call(e,t)&&v(s,t,e[t]);return s};import{_ as w,h as L,a as C}from"./index-8bf5099d.js";import{S as V}from"./index-ed3a47fa.js";import{M as H,a0 as B,r as i,H as R,z as j,o as l,c as f,d as o,a as d,I as u,f as y,w as S,p as N,b as D}from"./vendor-686b3c9c.js";const P={name:"user-center",components:{Switches:L,Scroll:V,SongList:C},data(){return{currentIndex:0}},computed:a({noResult(){return this.currentIndex===0?!this.favoriteList.length:!this.playHistory.length},noResultText(){return this.currentIndex===0?"\u6682\u65E0\u6536\u85CF\u6B4C\u66F2/(\u3112o\u3112)/~~":"\u4F60\u8FD8\u6CA1\u6709\u542C\u8FC7\u6B4C\u66F2"},currentList(){return this.currentIndex===0?this.favoriteList:this.playHistory}},H(["favoriteList","playHistory"])),methods:a({back(){this.$router.back()},selectSong({song:s}){this.addSong(s)},random(){this.randomPlay(this.currentList)}},B(["addSong","randomPlay"]))},_=s=>(N("data-v-1355f7d9"),s=s(),D(),s),T={class:"user-center"},z=_(()=>o("i",{class:"icon-back"},null,-1)),A=[z],E={class:"switches-wrapper"},M=_(()=>o("i",{class:"icon-play"},null,-1)),U=_(()=>o("span",{class:"text"},"\u968F\u673A\u64AD\u653E\u5168\u90E8",-1)),q=[M,U],F={class:"list-wrapper"},G={class:"list-inner"},J={class:"list-inner"};function K(s,e,t,O,c,n){const g=i("switches"),p=i("song-list"),h=i("scroll"),x=R("no-result");return j((l(),f("div",T,[o("div",{class:"back",onClick:e[0]||(e[0]=(...r)=>n.back&&n.back(...r))},A),o("div",E,[d(g,{items:["\u6211\u559C\u6B22\u7684","\u6700\u8FD1\u64AD\u653E"],modelValue:c.currentIndex,"onUpdate:modelValue":e[1]||(e[1]=r=>c.currentIndex=r)},null,8,["modelValue"])]),n.currentList.length?(l(),f("div",{key:0,class:"play-btn",onClick:e[2]||(e[2]=(...r)=>n.random&&n.random(...r))},q)):u("",!0),o("div",F,[c.currentIndex===0?(l(),y(h,{key:0,class:"list-scroll"},{default:S(()=>[o("div",G,[d(p,{songs:s.favoriteList,onSelect:n.selectSong},null,8,["songs","onSelect"])])]),_:1})):u("",!0),c.currentIndex===1?(l(),y(h,{key:1,class:"list-scroll"},{default:S(()=>[o("div",J,[d(p,{songs:s.playHistory,onSelect:n.selectSong},null,8,["songs","onSelect"])])]),_:1})):u("",!0)])])),[[x,n.noResult,n.noResultText]])}var Z=w(P,[["render",K],["__scopeId","data-v-1355f7d9"]]);export{Z as default};