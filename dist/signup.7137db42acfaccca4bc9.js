(()=>{"use strict";var e,t={5973:(e,t,n)=>{n.d(t,{I8:()=>d});var o=n(5852),r=(n(7049),n(3977)),i=n(4864),c=n(9828);n(9909),n(9755);(0,r.ZF)(o.q);const d=(0,i.v0)();(0,c.ad)(),new i.hJ},7049:(e,t,n)=>{n.d(t,{Km:()=>p,dm:()=>f,oP:()=>g,wm:()=>v});var o=n(9909),r=n(5122),i=n(7659),c=n(8805),d=n(6027),u=n(6729),s=n(420),a=n(3529),m=n(8322),l=n(2188);function g(){!function(){try{document.getElementById("back").addEventListener("mouseover",(function(){document.getElementById("back-button-img").src=i})),document.getElementById("back").addEventListener("mouseout",(function(){document.getElementById("back-button-img").src=r})),document.getElementById("back").addEventListener("mousedown",(function(){document.getElementById("back-button-img").src=c})),document.getElementById("back").addEventListener("mouseup",(function(){document.getElementById("back-button-img").src=i}))}catch(e){}}(),function(){try{document.getElementById("profile").addEventListener("mouseover",(function(){document.getElementById("profile-button-img").src=u})),document.getElementById("profile").addEventListener("mouseout",(function(){document.getElementById("profile-button-img").src=d})),document.getElementById("profile").addEventListener("mousedown",(function(){document.getElementById("profile-button-img").src=s})),document.getElementById("profile").addEventListener("mouseup",(function(){document.getElementById("profile-button-img").src=u}))}catch(e){}}(),function(){try{document.getElementById("settings").addEventListener("mouseover",(function(){document.getElementById("settings-button-img").src=m})),document.getElementById("settings").addEventListener("mouseout",(function(){document.getElementById("settings-button-img").src=a})),document.getElementById("settings").addEventListener("mousedown",(function(){document.getElementById("settings-button-img").src=l})),document.getElementById("settings").addEventListener("mouseup",(function(){document.getElementById("settings-button-img").src=m}))}catch(e){}}()}function f(e){e?setTimeout((function(){location.href="profile.html"}),300):setTimeout((function(){location.href="login.html"}),300)}function v(){!function(){try{document.getElementById("back").addEventListener("click",(function(){setTimeout((function(){history.back()}),300)}))}catch(e){}}(),function(e){try{document.getElementById("settings").addEventListener("click",(t=>{e.toggle()})),document.getElementById("settings-save").addEventListener("click",(t=>{e.toggle()}))}catch(e){}}(new o.u_(document.getElementById("exampleModalCenter"),{}))}function y(e){const t=document.getElementsByClassName(e);for(;t.length>0;)t[0].parentNode.removeChild(t[0])}function E(){[].slice.call(document.querySelectorAll(".toast")).map((function(e){return new o.FN(e)})).forEach((e=>e.show()))}function p(e,t){y("hide"),document.getElementById("toastsContainer").innerHTML+='\n  <div class="toast" data-autohide="false">\n    <div class="toast-header">\n      <h7 class="mr-auto">'+e+'</h7>\n    </div>\n    <div class="toast-body">\n      '+t+"\n    </div>\n  </div>\n  ",E()}},6881:(e,t,n)=>{var o=n(7049),r=n(2468),i=n(5973),c=n(4864),d=n(5484);function u(){try{var e;if(0!=(e=document.getElementById("errorDiv")).style.opacity)(e=document.getElementById("errorDiv")).classList.add("hideErrorBot"),setTimeout((function(){e.classList.remove("hideErrorBot"),e.style.opacity="0"}),250)}catch(e){}}function s(){var e=document.getElementById("email").value;""==e||null==e||e.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)?u():function(){try{var e=document.getElementById("errorDiv");1!=e.style.opacity&&(e.classList.add("showErrorBot"),setTimeout((function(){e.classList.remove("showErrorBot"),e.style.opacity="1"}),250))}catch(e){}}()}var a={url:"https://codeexpresso-ae5b5.web.app/verify.html",handleCodeInApp:!0};(0,d.mY)(),(0,o.oP)(),(0,o.wm)(),(0,r.c5)("background-music",(0,r.SM)("mute")),(0,r.Ih)("btn-sound"),document.getElementById("profile").addEventListener("click",(function(){(0,c.Aj)(i.I8,(e=>{if(e){e.uid;(0,o.dm)(e)}else(0,o.dm)(e)}))})),document.getElementById("email").addEventListener("focusout",(e=>{s()}));document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault();const t=e.target.elements.email.value;(0,c.oo)(i.I8,t,a).then((()=>{window.localStorage.setItem("emailForSignIn",email),(0,o.Km)("Success","Email Sent")})).catch((e=>{"auth/invalid-email"==e.code&&(0,o.Km)("Task Failed","Invalid email")}))}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var c=1/0;for(a=0;a<e.length;a++){for(var[n,r,i]=e[a],d=!0,u=0;u<n.length;u++)(!1&i||c>=i)&&Object.keys(o.O).every((e=>o.O[e](n[u])))?n.splice(u--,1):(d=!1,i<c&&(c=i));if(d){e.splice(a--,1);var s=r();void 0!==s&&(t=s)}}return t}i=i||0;for(var a=e.length;a>0&&e[a-1][2]>i;a--)e[a]=e[a-1];e[a]=[n,r,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={830:0,123:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[c,d,u]=n,s=0;if(c.some((t=>0!==e[t]))){for(r in d)o.o(d,r)&&(o.m[r]=d[r]);if(u)var a=u(o)}for(t&&t(n);s<c.length;s++)i=c[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(a)},n=self.webpackChunkCodeExpresso_4=self.webpackChunkCodeExpresso_4||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[26,882,444,909,503,788,123,292],(()=>o(6881)));r=o.O(r)})();