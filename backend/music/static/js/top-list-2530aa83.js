import{g as L}from"./top-list-ff76a6d0.js";import{S as k}from"./index-ed3a47fa.js";import{_ as w,T as x}from"./index-8bf5099d.js";import{s as C,r as d,H as _,z as p,o as s,c as a,a as l,w as c,d as o,F as u,e as m,t as r,T as N,f as j,N as B}from"./vendor-686b3c9c.js";const D={name:"top-list",components:{Scroll:k},data(){return{topList:[],loading:!0,selectedTop:null}},async created(){const e=await L();this.topList=e.topList,this.loading=!1},methods:{selectItem(e){this.selectedTop=e,this.cacheTop(e),this.$router.push({path:`/top-list/${e.id}`})},cacheTop(e){C.session.set(x,e)}}},b={class:"top-list"},z=["onClick"],I={class:"icon"},S={width:"100",height:"100"},$={class:"song-list"};function E(e,F,V,H,n,h){const f=d("scroll"),v=d("router-view"),g=_("lazy"),T=_("loading");return p((s(),a("div",b,[l(f,{class:"top-list-content"},{default:c(()=>[o("ul",null,[(s(!0),a(u,null,m(n.topList,t=>(s(),a("li",{class:"item",key:t.id,onClick:i=>h.selectItem(t)},[o("div",I,[p(o("img",S,null,512),[[g,t.pic]])]),o("ul",$,[(s(!0),a(u,null,m(t.songList,(i,y)=>(s(),a("li",{class:"song",key:i.id},[o("span",null,r(y+1),1),o("span",null,r(i.songName)+"-"+r(i.singerName),1)]))),128))])],8,z))),128))])]),_:1}),l(v,null,{default:c(({Component:t})=>[l(N,{appear:"",name:"slide"},{default:c(()=>[(s(),j(B(t),{data:n.selectedTop},null,8,["data"]))]),_:2},1024)]),_:1})])),[[T,n.loading]])}var q=w(D,[["render",E],["__scopeId","data-v-1559f8b6"]]);export{q as default};
