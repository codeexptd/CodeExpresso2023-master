(()=>{"use strict";var e,t={1320:(e,t,n)=>{var o=n(9909);const c=n.p+"fcf44f50ba5e1ea06c44.png",r=n.p+"7156dde0ce7925dd4de3.png",d=n.p+"2b57cf329cd5cb169897.png",i=n.p+"5755d3f3b922550915b1.png",u=n.p+"f7deed0f51f9b8cccde3.png",a=n.p+"c202cfeadb6a2f87b099.png",s=n.p+"3a15c7733a97b0a4e151.png",m=n.p+"ef2dd2de4932386cba12.png",l=n.p+"5b336d02fed8a41c231d.png";function f(e){e?setTimeout((function(){location.href="profile.html"}),300):setTimeout((function(){location.href="login.html"}),300)}function g(e){const t=document.getElementsByClassName(e);for(;t.length>0;)t[0].parentNode.removeChild(t[0])}function p(){[].slice.call(document.querySelectorAll(".toast")).map((function(e){return new o.FN(e)})).forEach((e=>e.show()))}function v(e,t){g("hide"),document.getElementById("toastsContainer").innerHTML+='\n  <div class="toast" data-autohide="false">\n    <div class="toast-header">\n      <h7 class="mr-auto">'+e+'</h7>\n    </div>\n    <div class="toast-body">\n      '+t+"\n    </div>\n  </div>\n  ",p()}function y(e,t,n){const o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);let c="expires="+o.toUTCString();document.cookie=e+"="+t+";"+c+";path=/"}function b(e){let t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}const E=n.p+"90bf8ca3654ab285f764.mp3",h=n.p+"ff2162a8df436b85494c.mp3",I=n.p+"4cb78bb46acae006990f.mp3",B=n.p+"9deb98cd4eecb584c5f8.mp3",L=n.p+"0bceddb041ad73c32a18.mp3";var k=n(3977),w=n(4864),S=n(7828);n(9755);(0,k.ZF)({apiKey:"AIzaSyDQ5M0TuT6v0JlqhcvZ9tkP5gKYPCCUL2A",authDomain:"codeexpresso-ae5b5.firebaseapp.com",projectId:"codeexpresso-ae5b5",storageBucket:"codeexpresso-ae5b5.appspot.com",messagingSenderId:"340531525579",appId:"1:340531525579:web:9a7d69339dd2963386284e",measurementId:"G-91J9LZ5MXF"});const T=(0,w.v0)();(0,S.ad)(),new w.hJ;function x(){try{var e;if(0!=(e=document.getElementById("errorDiv")).style.opacity)(e=document.getElementById("errorDiv")).classList.add("hideErrorBot"),setTimeout((function(){e.classList.remove("hideErrorBot"),e.style.opacity="0"}),250)}catch(e){}}function C(){var e=document.getElementById("email").value;""==e||null==e||e.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)?x():function(){try{var e=document.getElementById("errorDiv");1!=e.style.opacity&&(e.classList.add("showErrorBot"),setTimeout((function(){e.classList.remove("showErrorBot"),e.style.opacity="1"}),250))}catch(e){}}()}var O={url:"https://codeexpresso-ae5b5.web.app/verify.html",handleCodeInApp:!0};!function(){try{document.getElementById("back").addEventListener("mouseover",(function(){document.getElementById("back-button-img").src=r})),document.getElementById("back").addEventListener("mouseout",(function(){document.getElementById("back-button-img").src=c})),document.getElementById("back").addEventListener("mousedown",(function(){document.getElementById("back-button-img").src=d})),document.getElementById("back").addEventListener("mouseup",(function(){document.getElementById("back-button-img").src=r}))}catch(e){}}(),function(){try{document.getElementById("profile").addEventListener("mouseover",(function(){document.getElementById("profile-button-img").src=u})),document.getElementById("profile").addEventListener("mouseout",(function(){document.getElementById("profile-button-img").src=i})),document.getElementById("profile").addEventListener("mousedown",(function(){document.getElementById("profile-button-img").src=a})),document.getElementById("profile").addEventListener("mouseup",(function(){document.getElementById("profile-button-img").src=u}))}catch(e){}}(),function(){try{document.getElementById("settings").addEventListener("mouseover",(function(){document.getElementById("settings-button-img").src=m})),document.getElementById("settings").addEventListener("mouseout",(function(){document.getElementById("settings-button-img").src=s})),document.getElementById("settings").addEventListener("mousedown",(function(){document.getElementById("settings-button-img").src=l})),document.getElementById("settings").addEventListener("mouseup",(function(){document.getElementById("settings-button-img").src=m}))}catch(e){}}(),function(){try{document.getElementById("back").addEventListener("click",(function(){setTimeout((function(){history.back()}),300)}))}catch(e){}}(),function(e){try{document.getElementById("settings").addEventListener("click",(t=>{e.toggle()})),document.getElementById("settings-save").addEventListener("click",(t=>{e.toggle()}))}catch(e){}}(new o.u_(document.getElementById("exampleModalCenter"),{})),function(e,t){if("mute"!=t){document.getElementById("audioContainer").innerHTML+='\n      <audio id="'+e+'" src="'+t+'" style="display:none;" loop ></audio>\n    ';var n=.1,o=b("musicVolume");o&&(n=o),document.addEventListener("click",(function(){var t=document.getElementById(e);t.paused&&(t.volume=n,t.play(),function(e,t){var n=document.getElementById(e),o=document.getElementById(t);o.value=100*n.volume,o.addEventListener("change",(function(){n.volume=Number(this.value/100),y("musicVolume",n.volume,365)}))}(e,"musicVolume"))}))}}("background-music",function(e){switch(e){case"theme1":return I;case"theme2":return B;case"theme3":return h;case"mute":return"mute";default:return E}}("mute")),function(e){var t,n,o,c,r=document.getElementsByClassName(e),d=new Audio(L);for(let e=0;e<r.length;e++){r[e].addEventListener("click",(function(){var e=.3,t=b("SFXVolume");t&&(e=t),d.volume=e,d.play()}))}t="sfxVolume",n=document.getElementById(t),o=.3,(c=b("SFXVolume"))&&(o=c),n.value=100*o,n.addEventListener("change",(function(){y("SFXVolume",Number(n.value/100),365)}))}("btn-sound"),document.getElementById("profile").addEventListener("click",(function(){(0,w.Aj)(T,(e=>{if(e){e.uid;f(e)}else f(e)}))})),document.getElementById("email").addEventListener("focusout",(e=>{C()}));document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault();const t=e.target.elements.email.value;(0,w.oo)(T,t,O).then((()=>{window.localStorage.setItem("emailForSignIn",email),v("Success","Email Sent")})).catch((e=>{"auth/invalid-email"==e.code&&v("Task Failed","Invalid email")}))}))}},n={};function o(e){var c=n[e];if(void 0!==c)return c.exports;var r=n[e]={exports:{}};return t[e].call(r.exports,r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,n,c,r)=>{if(!n){var d=1/0;for(s=0;s<e.length;s++){for(var[n,c,r]=e[s],i=!0,u=0;u<n.length;u++)(!1&r||d>=r)&&Object.keys(o.O).every((e=>o.O[e](n[u])))?n.splice(u--,1):(i=!1,r<d&&(d=r));if(i){e.splice(s--,1);var a=c();void 0!==a&&(t=a)}}return t}r=r||0;for(var s=e.length;s>0&&e[s-1][2]>r;s--)e[s]=e[s-1];e[s]=[n,c,r]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={830:0,123:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var c,r,[d,i,u]=n,a=0;if(d.some((t=>0!==e[t]))){for(c in i)o.o(i,c)&&(o.m[c]=i[c]);if(u)var s=u(o)}for(t&&t(n);a<d.length;a++)r=d[a],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(s)},n=self.webpackChunkCodeExpresso_4=self.webpackChunkCodeExpresso_4||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var c=o.O(void 0,[26,882,444,909,372,829,123],(()=>o(1320)));c=o.O(c)})();