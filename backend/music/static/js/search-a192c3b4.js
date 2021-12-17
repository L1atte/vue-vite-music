import{_ as I,c as R,d as D,e as K,C as V,u as B,f as j,b as E}from"./index-e1556c34.js";import{S as N}from"./index-7c1395bf.js";import{h as l,u as Q,g as T,a0 as F,i as L,r,o as d,c as v,d as o,a as c,z as g,A as w,w as C,s as z,F as A,e as G,t as M,T as U,f as Y,M as J,y as O,p as P,b as W}from"./vendor-193ab207.js";const X={name:"search",components:{SearchInput:R,Suggest:D,SearchList:K,Scroll:N,Confirm:V},setup(){const n=l(""),a=l([]),h=l(null),e=l(null),u=l(null),_=Q(),f=T(()=>_.state.searchHistory),m=F(),{saveSearch:i,deleteSearch:S,clearSearch:p}=B();j().then(s=>{a.value=s.hotKeys}),L(n,async s=>{s||(await O(),y())});function y(){e.value.scroll.refresh()}function t(s){n.value=s}function x(s){i(n.value),_.dispatch("addSong",s)}function q(s){i(n.value),h.value=s,b(s),m.push({path:`/search/${s.mid}`})}function b(s){z.session.set(E,s)}function H(s){u.value.show()}return{scrollRef:e,confirmRef:u,query:n,hotKeys:a,addQuery:t,selectSong:x,selectSinger:q,selectedSinger:h,searchHistory:f,showConfirm:H,deleteSearch:S,clearSearch:p}}},k=n=>(P("data-v-2282b9ef"),n=n(),W(),n),Z={class:"search"},$={class:"search-input-wrapper"},ee={class:"hot-keys"},se=k(()=>o("h1",{class:"title"},"\u70ED\u95E8\u641C\u7D22",-1)),oe=["onClick"],te={class:"search-history"},ne={class:"title"},ae=k(()=>o("span",{class:"text"},"\u641C\u7D22\u5386\u53F2",-1)),ce=k(()=>o("i",{class:"icon-clear"},null,-1)),re=[ce],le={class:"search-result"};function ie(n,a,h,e,u,_){const f=r("search-input"),m=r("confirm"),i=r("search-list"),S=r("scroll"),p=r("suggest"),y=r("router-view");return d(),v("div",Z,[o("div",$,[c(f,{modelValue:e.query,"onUpdate:modelValue":a[0]||(a[0]=t=>e.query=t)},null,8,["modelValue"])]),g(c(S,{ref:"scrollRef",class:"search-content"},{default:C(()=>[o("div",null,[o("div",ee,[se,o("ul",null,[(d(!0),v(A,null,G(e.hotKeys,t=>(d(),v("li",{class:"item",key:t.id,onClick:x=>e.addQuery(t.key)},[o("span",null,M(t.key),1)],8,oe))),128))])]),g(o("div",te,[o("h1",ne,[ae,o("span",{class:"clear",onClick:a[1]||(a[1]=(...t)=>e.showConfirm&&e.showConfirm(...t))},re)]),c(m,{ref:"confirmRef",text:"\u662F\u5426\u6E05\u7A7A\u6240\u6709\u641C\u7D22\u5386\u53F2","confirm-btn-text":"\u6E05\u7A7A",onConfirm:e.clearSearch},null,8,["onConfirm"]),c(i,{searches:e.searchHistory,onSelect:e.addQuery,onDelete:e.deleteSearch},null,8,["searches","onSelect","onDelete"])],512),[[w,e.searchHistory.length]])])]),_:1},512),[[w,!e.query]]),g(o("div",le,[c(p,{query:e.query,onSelectSong:e.selectSong,onSelectSinger:e.selectSinger},null,8,["query","onSelectSong","onSelectSinger"])],512),[[w,e.query]]),c(y,null,{default:C(({Component:t})=>[c(U,{appear:"",name:"slide"},{default:C(()=>[(d(),Y(J(t),{data:e.selectedSinger},null,8,["data"]))]),_:2},1024)]),_:1})])}var _e=I(X,[["render",ie],["__scopeId","data-v-2282b9ef"]]);export{_e as default};
