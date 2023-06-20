(()=>{"use strict";var e,t,r,n,a,s={3548:(e,t,r)=>{r.a(e,(async(e,t)=>{try{var n=r(7049),a=r(2468),s=r(5973),l=r(7828),o=r(5484),i=r(4864),c=(r(9909),r(9755),r(3809));r(2812),r(1856);(0,n.oP)(),(0,n.wm)(),(0,a.c5)("background-music",(0,a.SM)("mute")),document.getElementById("profile").addEventListener("click",(function(){(0,i.Aj)(s.I8,(e=>{if(e){e.uid;(0,n.dm)(e)}else(0,n.dm)(e)}))}));const e=new URLSearchParams(window.location.search),d=e.get("cat"),u=e.get("diff");document.getElementById("title").innerHTML=`${Object.values(c.R).find((e=>e.name==d)).title} - ${u.charAt(0).toUpperCase()+u.slice(1)}`;const p=await(0,o.LC)(d,u),m=document.getElementById("grid-tiles");(0,i.Aj)(s.I8,(async e=>{if(e){const t=(0,l.JU)(s.db,"users",e.uid),r=await(0,l.QT)(t);if(r.exists()){let e=[],t=await(0,o.Gk)(r,d);if(t=t.map((e=>(0,o.gZ)(u,e))).filter((e=>null!=e||null!=e)),e=[...t],t.length<=0&&e.push("1"),t.length>0){let r=Math.max(...t);if(r<p.length){let t=String(parseInt(r)+1);e.push(t)}}p.sort(((e,t)=>e-t)).map((t=>{e.includes(t)?m.innerHTML+=`<div style="display:grid;align-items:center;justify-content:center;">\n                <button\n                class="${e.includes(t)?"":"is-disabled"} nes-btn level-select btn-sound" data-level=${t} style="height:5rem;width:5rem;font-size: 2rem; display: flex;\n    align-items: center;\n    justify-content: center;">${t}</button>\n            </div>`:m.innerHTML+=`<div style="display:grid;align-items:center;justify-content:center;">\n                <button\n                disabled=true\n                class="${e.includes(t)?"":"is-disabled"} nes-btn level-select btn-sound" data-level=${t} style="height:5rem;width:5rem;font-size: 2rem; display: flex;\n    align-items: center;\n    justify-content: center;">${t}</button>\n            </div>`}))}const n=document.getElementsByClassName("level-select");for(let e=0;e<n.length;e++){const t=n[e];t.addEventListener("mouseover",(function(){this.style.borderColor="white"})),t.addEventListener("mouseout",(function(){this.style.borderColor="gray"})),t.addEventListener("click",(function(){var e=this.getAttribute("data-level");t.disabled||setTimeout((()=>{location.href=`play.html?cat=${d}&diff=${u}&level=${e}`}),300)}))}(0,a.Ih)("btn-sound")}})),t()}catch(e){t(e)}}),1)},5484:(e,t,r)=>{r.d(t,{Gk:()=>o,LC:()=>l,gZ:()=>i});var n=r(7828),a=r(5973),s=r(3809);const l=async(e,t)=>{if(!e&&!t)return null;const r=(0,n.hJ)(a.db,`levels/${e}/${t}`),s=await(0,n.PL)(r);let l=[];return s.forEach((e=>{l.push(e.id)})),l},o=(e,t)=>{switch(t){case s.R.FLOWCHARTS_PSEUDO.name:return e.data().completedLevels1;case s.R.BASIC_SYNTAX.name:return e.data().completedLevels2;case s.R.VARIABLES.name:return e.data().completedLevels3;case s.R.DATA_TYPES.name:return e.data().completedLevels4;case s.R.OPERATORS.name:return e.data().completedLevels5;case s.R.CONDITIONAL_STATEMENTS.name:return e.data().completedLevels6;case s.R.LOOPS.name:return e.data().completedLevels7;case s.R.METHODS.name:return e.data().completedLevels8;case s.R.ARRAYS.name:return e.data().completedLevels9;case s.R.STRING_MANIPULATION.name:return e.data().completedLevels10}},i=(e,t)=>{let r=String(t).split("-")[0];if((e=>{switch(e){case"easy":default:return"1";case"medium":return"2";case"hard":return"3"}})(e)==r)return String(t).split("-")[1]}},2812:(e,t,r)=>{e.exports=r.p+"15a50b5bd0ee0233a3ae.png"},1856:(e,t,r)=>{e.exports=r.p+"b09506567489ea4998a0.png"}},l={};function o(e){var t=l[e];if(void 0!==t)return t.exports;var r=l[e]={exports:{}};return s[e].call(r.exports,r,r.exports,o),r.exports}o.m=s,e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o.a=(a,s,l)=>{var o;l&&((o=[]).d=1);var i,c,d,u=new Set,p=a.exports,m=new Promise(((e,t)=>{d=t,c=e}));m[t]=p,m[e]=e=>(o&&e(o),u.forEach(e),m.catch((e=>{}))),a.exports=m,s((a=>{var s;i=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var s=[];s.d=0,a.then((e=>{l[t]=e,n(s)}),(e=>{l[r]=e,n(s)}));var l={};return l[e]=e=>e(s),l}}var o={};return o[e]=e=>{},o[t]=a,o})))(a);var l=()=>i.map((e=>{if(e[r])throw e[r];return e[t]})),c=new Promise((t=>{(s=()=>t(l)).r=0;var r=e=>e!==o&&!u.has(e)&&(u.add(e),e&&!e.d&&(s.r++,e.push(s)));i.map((t=>t[e](r)))}));return s.r?c:l()}),(e=>(e?d(m[r]=e):c(p),n(o)))),o&&(o.d=0)},a=[],o.O=(e,t,r,n)=>{if(!t){var s=1/0;for(d=0;d<a.length;d++){for(var[t,r,n]=a[d],l=!0,i=0;i<t.length;i++)(!1&n||s>=n)&&Object.keys(o.O).every((e=>o.O[e](t[i])))?t.splice(i--,1):(l=!1,n<s&&(s=n));if(l){a.splice(d--,1);var c=r();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=a.length;d>0&&a[d-1][2]>n;d--)a[d]=a[d-1];a[d]=[t,r,n]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={24:0,123:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,a,[s,l,i]=r,c=0;if(s.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(i)var d=i(o)}for(t&&t(r);c<s.length;c++)a=s[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},r=self.webpackChunkCodeExpresso_4=self.webpackChunkCodeExpresso_4||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=o.O(void 0,[26,882,444,510,649,57,781,123,642],(()=>o(3548)));i=o.O(i)})();