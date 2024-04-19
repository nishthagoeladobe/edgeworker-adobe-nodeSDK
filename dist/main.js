// All these are required to ensure everything runs smoothly
// in an Akamai EdgeWorker
var window = {};
var TextDecoder = function() {};
var setTimeout = function(callback) { callback(); };

import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import { logger } from 'log';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var targetclient_browser = createCommonjsModule(function (module, exports) {
/**
 * @adobe/target-nodejs-sdk v.2.1.0
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==e&&e,t="URLSearchParams"in e,n="Symbol"in e&&"iterator"in Symbol,r="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return !1}}(),o="FormData"in e,i="ArrayBuffer"in e;if(i)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(e){return e&&a.indexOf(Object.prototype.toString.call(e))>-1};function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function s(e){return "string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return {done:void 0===t,value:t}}};return n&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach((function(e,t){this.append(t,e);}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1]);}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t]);}),this);}function d(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0;}function p(e){return new Promise((function(t,n){e.onload=function(){t(e.result);},e.onerror=function(){n(e.error);};}))}function h(e){var t=new FileReader,n=p(t);return t.readAsArrayBuffer(e),n}function g(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(e){var n;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:r&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:o&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:t&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():i&&r&&((n=e)&&DataView.prototype.isPrototypeOf(n))?(this._bodyArrayBuffer=g(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i&&(ArrayBuffer.prototype.isPrototypeOf(e)||u(e))?this._bodyArrayBuffer=g(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"));},r&&(this.blob=function(){var e=d(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var e=d(this);return e||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}return this.blob().then(h)}),this.text=function(){var e,t,n,r=d(this);if(r)return r;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,n=p(t),t.readAsText(e),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},o&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}f.prototype.append=function(e,t){e=c(e),t=s(t);var n=this.map[e];this.map[e]=n?n+", "+t:t;},f.prototype.delete=function(e){delete this.map[c(e)];},f.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},f.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},f.prototype.set=function(e,t){this.map[c(e)]=s(t);},f.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this);},f.prototype.keys=function(){var e=[];return this.forEach((function(t,n){e.push(n);})),l(e)},f.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t);})),l(e)},f.prototype.entries=function(){var e=[];return this.forEach((function(t,n){e.push([n,t]);})),l(e)},n&&(f.prototype[Symbol.iterator]=f.prototype.entries);var m=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function y(e,t){if(!(this instanceof y))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var n,r,o=(t=t||{}).body;if(e instanceof y){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new f(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0);}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new f(t.headers)),this.method=(n=t.method||this.method||"GET",r=n.toUpperCase(),m.indexOf(r)>-1?r:n),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var i=/([?&])_=[^&]*/;if(i.test(this.url))this.url=this.url.replace(i,"$1_="+(new Date).getTime());else {this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime();}}}function b(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o));}})),t}function w(e,t){if(!(this instanceof w))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"",this.headers=new f(t.headers),this.url=t.url||"",this._initBody(e);}y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},v.call(y.prototype),v.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var e=new w(null,{status:0,statusText:""});return e.type="error",e};var x=[301,302,303,307,308];w.redirect=function(e,t){if(-1===x.indexOf(t))throw new RangeError("Invalid status code");return new w(null,{status:t,headers:{location:e}})};var I=e.DOMException;try{new I;}catch(e){(I=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack;}).prototype=Object.create(Error.prototype),I.prototype.constructor=I;}function E(t,n){return new Promise((function(o,a){var u=new y(t,n);if(u.signal&&u.signal.aborted)return a(new I("Aborted","AbortError"));var c=new XMLHttpRequest;function l(){c.abort();}c.onload=function(){var e,t,n={status:c.status,statusText:c.statusText,headers:(e=c.getAllResponseHeaders()||"",t=new f,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var n=e.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();t.append(r,o);}})),t)};n.url="responseURL"in c?c.responseURL:n.headers.get("X-Request-URL");var r="response"in c?c.response:c.responseText;setTimeout((function(){o(new w(r,n));}),0);},c.onerror=function(){setTimeout((function(){a(new TypeError("Network request failed"));}),0);},c.ontimeout=function(){setTimeout((function(){a(new TypeError("Network request failed"));}),0);},c.onabort=function(){setTimeout((function(){a(new I("Aborted","AbortError"));}),0);},c.open(u.method,function(t){try{return ""===t&&e.location.href?e.location.href:t}catch(e){return t}}(u.url),!0),"include"===u.credentials?c.withCredentials=!0:"omit"===u.credentials&&(c.withCredentials=!1),"responseType"in c&&(r?c.responseType="blob":i&&u.headers.get("Content-Type")&&-1!==u.headers.get("Content-Type").indexOf("application/octet-stream")&&(c.responseType="arraybuffer")),!n||"object"!=typeof n.headers||n.headers instanceof f?u.headers.forEach((function(e,t){c.setRequestHeader(t,e);})):Object.getOwnPropertyNames(n.headers).forEach((function(e){c.setRequestHeader(e,s(n.headers[e]));})),u.signal&&(u.signal.addEventListener("abort",l),c.onreadystatechange=function(){4===c.readyState&&u.signal.removeEventListener("abort",l);}),c.send(void 0===u._bodyInit?null:u._bodyInit);}))}E.polyfill=!0,e.fetch||(e.fetch=E,e.Headers=f,e.Request=y,e.Response=w)
/*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */;var S=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;function R(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var T=function(){try{if(!Object.assign)return !1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return !1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return !1;var r={};return "abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e;})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return !1}}()?Object.assign:function(e,t){for(var n,r,o=R(e),i=1;i<arguments.length;i++){for(var a in n=Object(arguments[i]))A.call(n,a)&&(o[a]=n[a]);if(S){r=S(n);for(var u=0;u<r.length;u++)O.call(n,r[u])&&(o[r[u]]=n[r[u]]);}}return o};function P(e){return null==e}const{isArray:_}=Array,{prototype:k}=Object,{toString:j}=k;function D(e){return function(e){return j.call(e)}(e)}function C(e){return P(e)?[]:[].concat.apply([],e)}function L(e){return null!=e&&function(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!function(e){return !!function(e){const t=typeof e;return null!=e&&("object"===t||"function"===t)}(e)&&"[object Function]"===D(e)}(e)}function U(e){return P(e)?[]:L(e)?function(e){return "string"==typeof e||!_(e)&&function(e){return null!=e&&"object"==typeof e}(e)&&"[object String]"===D(e)}(e)?e.split(""):function(e){let t=0;const{length:n}=e,r=Array(n);for(;t<n;)r[t]=e[t],t+=1;return r}(e):function(e,t){return n=e=>t[e],e.map(n);var n;}(P(t=e)?[]:Object.keys(t),e);var t;}function N(e,t){return (L(t)?t:U(t)).indexOf(e)>-1}const{prototype:M}=Function,{toString:q}=M;q.call(Object);function F(){return (new Date).getTime()}var B="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function $(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function V(e,t){return e(t={exports:{}},t.exports),t.exports}var H=function(e){return e&&e.Math==Math&&e},G=H("object"==typeof globalThis&&globalThis)||H("object"==typeof window&&window)||H("object"==typeof self&&self)||H("object"==typeof B&&B)||Function("return this")(),z=function(e){try{return !!e()}catch(e){return !0}},K=!z((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),Q={}.propertyIsEnumerable,X=Object.getOwnPropertyDescriptor,J={f:X&&!Q.call({1:2},1)?function(e){var t=X(this,e);return !!t&&t.enumerable}:Q},W=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},Y={}.toString,Z=function(e){return Y.call(e).slice(8,-1)},ee="".split,te=z((function(){return !Object("z").propertyIsEnumerable(0)}))?function(e){return "String"==Z(e)?ee.call(e,""):Object(e)}:Object,ne=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},re=function(e){return te(ne(e))},oe=function(e){return "object"==typeof e?null!==e:"function"==typeof e},ie=function(e,t){if(!oe(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!oe(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!oe(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!oe(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},ae={}.hasOwnProperty,ue=function(e,t){return ae.call(e,t)},ce=G.document,se=oe(ce)&&oe(ce.createElement),le=function(e){return se?ce.createElement(e):{}},fe=!K&&!z((function(){return 7!=Object.defineProperty(le("div"),"a",{get:function(){return 7}}).a})),de=Object.getOwnPropertyDescriptor,pe={f:K?de:function(e,t){if(e=re(e),t=ie(t,!0),fe)try{return de(e,t)}catch(e){}if(ue(e,t))return W(!J.f.call(e,t),e[t])}},he=function(e){if(!oe(e))throw TypeError(String(e)+" is not an object");return e},ge=Object.defineProperty,ve={f:K?ge:function(e,t,n){if(he(e),t=ie(t,!0),he(n),fe)try{return ge(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return "value"in n&&(e[t]=n.value),e}},me=K?function(e,t,n){return ve.f(e,t,W(1,n))}:function(e,t,n){return e[t]=n,e},ye=function(e,t){try{me(G,e,t);}catch(n){G[e]=t;}return t},be=G["__core-js_shared__"]||ye("__core-js_shared__",{}),we=Function.toString;"function"!=typeof be.inspectSource&&(be.inspectSource=function(e){return we.call(e)});var xe,Ie,Ee,Se=be.inspectSource,Ae=G.WeakMap,Oe="function"==typeof Ae&&/native code/.test(Se(Ae)),Re=V((function(e){(e.exports=function(e,t){return be[e]||(be[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"});})),Te=0,Pe=Math.random(),_e=function(e){return "Symbol("+String(void 0===e?"":e)+")_"+(++Te+Pe).toString(36)},ke=Re("keys"),je=function(e){return ke[e]||(ke[e]=_e(e))},De={},Ce=G.WeakMap;if(Oe){var Le=new Ce,Ue=Le.get,Ne=Le.has,Me=Le.set;xe=function(e,t){return Me.call(Le,e,t),t},Ie=function(e){return Ue.call(Le,e)||{}},Ee=function(e){return Ne.call(Le,e)};}else {var qe=je("state");De[qe]=!0,xe=function(e,t){return me(e,qe,t),t},Ie=function(e){return ue(e,qe)?e[qe]:{}},Ee=function(e){return ue(e,qe)};}var Fe={set:xe,get:Ie,has:Ee,enforce:function(e){return Ee(e)?Ie(e):xe(e,{})},getterFor:function(e){return function(t){var n;if(!oe(t)||(n=Ie(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},Be=V((function(e){var t=Fe.get,n=Fe.enforce,r=String(String).split("String");(e.exports=function(e,t,o,i){var a=!!i&&!!i.unsafe,u=!!i&&!!i.enumerable,c=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof t||ue(o,"name")||me(o,"name",t),n(o).source=r.join("string"==typeof t?t:"")),e!==G?(a?!c&&e[t]&&(u=!0):delete e[t],u?e[t]=o:me(e,t,o)):u?e[t]=o:ye(t,o);})(Function.prototype,"toString",(function(){return "function"==typeof this&&t(this).source||Se(this)}));})),$e=G,Ve=function(e){return "function"==typeof e?e:void 0},He=function(e,t){return arguments.length<2?Ve($e[e])||Ve(G[e]):$e[e]&&$e[e][t]||G[e]&&G[e][t]},Ge=Math.ceil,ze=Math.floor,Ke=function(e){return isNaN(e=+e)?0:(e>0?ze:Ge)(e)},Qe=Math.min,Xe=function(e){return e>0?Qe(Ke(e),9007199254740991):0},Je=Math.max,We=Math.min,Ye=function(e){return function(t,n,r){var o,i=re(t),a=Xe(i.length),u=function(e,t){var n=Ke(e);return n<0?Je(n+t,0):We(n,t)}(r,a);if(e&&n!=n){for(;a>u;)if((o=i[u++])!=o)return !0}else for(;a>u;u++)if((e||u in i)&&i[u]===n)return e||u||0;return !e&&-1}},Ze={includes:Ye(!0),indexOf:Ye(!1)}.indexOf,et=function(e,t){var n,r=re(e),o=0,i=[];for(n in r)!ue(De,n)&&ue(r,n)&&i.push(n);for(;t.length>o;)ue(r,n=t[o++])&&(~Ze(i,n)||i.push(n));return i},tt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],nt=tt.concat("length","prototype"),rt={f:Object.getOwnPropertyNames||function(e){return et(e,nt)}},ot={f:Object.getOwnPropertySymbols},it=He("Reflect","ownKeys")||function(e){var t=rt.f(he(e)),n=ot.f;return n?t.concat(n(e)):t},at=function(e,t){for(var n=it(t),r=ve.f,o=pe.f,i=0;i<n.length;i++){var a=n[i];ue(e,a)||r(e,a,o(t,a));}},ut=/#|\.prototype\./,ct=function(e,t){var n=lt[st(e)];return n==dt||n!=ft&&("function"==typeof t?z(t):!!t)},st=ct.normalize=function(e){return String(e).replace(ut,".").toLowerCase()},lt=ct.data={},ft=ct.NATIVE="N",dt=ct.POLYFILL="P",pt=ct,ht=pe.f,gt=function(e,t){var n,r,o,i,a,u=e.target,c=e.global,s=e.stat;if(n=c?G:s?G[u]||ye(u,{}):(G[u]||{}).prototype)for(r in t){if(i=t[r],o=e.noTargetGet?(a=ht(n,r))&&a.value:n[r],!pt(c?r:u+(s?".":"#")+r,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;at(i,o);}(e.sham||o&&o.sham)&&me(i,"sham",!0),Be(n,r,i,e);}},vt=function(){var e=he(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t};function mt(e,t){return RegExp(e,t)}var yt,bt,wt={UNSUPPORTED_Y:z((function(){var e=mt("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),BROKEN_CARET:z((function(){var e=mt("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},xt=RegExp.prototype.exec,It=String.prototype.replace,Et=xt,St=(yt=/a/,bt=/b*/g,xt.call(yt,"a"),xt.call(bt,"a"),0!==yt.lastIndex||0!==bt.lastIndex),At=wt.UNSUPPORTED_Y||wt.BROKEN_CARET,Ot=void 0!==/()??/.exec("")[1];(St||Ot||At)&&(Et=function(e){var t,n,r,o,i=this,a=At&&i.sticky,u=vt.call(i),c=i.source,s=0,l=e;return a&&(-1===(u=u.replace("y","")).indexOf("g")&&(u+="g"),l=String(e).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==e[i.lastIndex-1])&&(c="(?: "+c+")",l=" "+l,s++),n=new RegExp("^(?:"+c+")",u)),Ot&&(n=new RegExp("^"+c+"$(?!\\s)",u)),St&&(t=i.lastIndex),r=xt.call(a?n:i,l),a?r?(r.input=r.input.slice(s),r[0]=r[0].slice(s),r.index=i.lastIndex,i.lastIndex+=r[0].length):i.lastIndex=0:St&&r&&(i.lastIndex=i.global?r.index+r[0].length:t),Ot&&r&&r.length>1&&It.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0);})),r});var Rt=Et;gt({target:"RegExp",proto:!0,forced:/./.exec!==Rt},{exec:Rt});var Tt=!!Object.getOwnPropertySymbols&&!z((function(){return !String(Symbol())})),Pt=Tt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,_t=Re("wks"),kt=G.Symbol,jt=Pt?kt:kt&&kt.withoutSetter||_e,Dt=function(e){return ue(_t,e)||(Tt&&ue(kt,e)?_t[e]=kt[e]:_t[e]=jt("Symbol."+e)),_t[e]},Ct=Dt("species"),Lt=!z((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),Ut="$0"==="a".replace(/./,"$0"),Nt=Dt("replace"),Mt=!!/./[Nt]&&""===/./[Nt]("a","$0"),qt=!z((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),Ft=function(e){return Object(ne(e))},Bt=function(e){return function(t,n){var r,o,i=String(ne(t)),a=Ke(n),u=i.length;return a<0||a>=u?e?"":void 0:(r=i.charCodeAt(a))<55296||r>56319||a+1===u||(o=i.charCodeAt(a+1))<56320||o>57343?e?i.charAt(a):r:e?i.slice(a,a+2):o-56320+(r-55296<<10)+65536}},$t={codeAt:Bt(!1),charAt:Bt(!0)},Vt=$t.charAt,Ht=function(e,t,n){return t+(n?Vt(e,t).length:1)},Gt=function(e,t){var n=e.exec;if("function"==typeof n){var r=n.call(e,t);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==Z(e))throw TypeError("RegExp#exec called on incompatible receiver");return Rt.call(e,t)},zt=Math.max,Kt=Math.min,Qt=Math.floor,Xt=/\$([$&'`]|\d\d?|<[^>]*>)/g,Jt=/\$([$&'`]|\d\d?)/g;function Wt(){let e=F();return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,t=>{const n=(e+(o=16,(r=0)+Math.floor(Math.random()*(o-r+1))))%16|0;var r,o;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)})}function Yt(e){return null===e||"object"!=typeof e?[]:Object.keys(e).map(t=>e[t])}!function(e,t,n,r){var o=Dt(e),i=!z((function(){var t={};return t[o]=function(){return 7},7!=""[e](t)})),a=i&&!z((function(){var t=!1,n=/a/;return "split"===e&&((n={}).constructor={},n.constructor[Ct]=function(){return n},n.flags="",n[o]=/./[o]),n.exec=function(){return t=!0,null},n[o](""),!t}));if(!i||!a||"replace"===e&&(!Lt||!Ut||Mt)||"split"===e&&!qt){var u=/./[o],c=n(o,""[e],(function(e,t,n,r,o){return t.exec===Rt?i&&!o?{done:!0,value:u.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:Ut,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:Mt}),s=c[0],l=c[1];Be(String.prototype,e,s),Be(RegExp.prototype,o,2==t?function(e,t){return l.call(e,this,t)}:function(e){return l.call(e,this)});}r&&me(RegExp.prototype[o],"sham",!0);}("replace",2,(function(e,t,n,r){var o=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,i=r.REPLACE_KEEPS_$0,a=o?"$":"$0";return [function(n,r){var o=ne(this),i=null==n?void 0:n[e];return void 0!==i?i.call(n,o,r):t.call(String(o),n,r)},function(e,r){if(!o&&i||"string"==typeof r&&-1===r.indexOf(a)){var c=n(t,e,this,r);if(c.done)return c.value}var s=he(e),l=String(this),f="function"==typeof r;f||(r=String(r));var d=s.global;if(d){var p=s.unicode;s.lastIndex=0;}for(var h=[];;){var g=Gt(s,l);if(null===g)break;if(h.push(g),!d)break;""===String(g[0])&&(s.lastIndex=Ht(l,Xe(s.lastIndex),p));}for(var v,m="",y=0,b=0;b<h.length;b++){g=h[b];for(var w=String(g[0]),x=zt(Kt(Ke(g.index),l.length),0),I=[],E=1;E<g.length;E++)I.push(void 0===(v=g[E])?v:String(v));var S=g.groups;if(f){var A=[w].concat(I,x,l);void 0!==S&&A.push(S);var O=String(r.apply(void 0,A));}else O=u(w,l,x,I,S,r);x>=y&&(m+=l.slice(y,x)+O,y=x+w.length);}return m+l.slice(y)}];function u(e,n,r,o,i,a){var u=r+e.length,c=o.length,s=Jt;return void 0!==i&&(i=Ft(i),s=Xt),t.call(a,s,(function(t,a){var s;switch(a.charAt(0)){case"$":return "$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(u);case"<":s=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return t;if(l>c){var f=Qt(l/10);return 0===f?t:f<=c?void 0===o[f-1]?a.charAt(1):o[f-1]+a.charAt(1):t}s=o[l-1];}return void 0===s?"":s}))}}));const Zt={ON_DEVICE:"on-device",SERVER_SIDE:"server-side",HYBRID:"hybrid"},en={debug(...e){},error(...e){}};function tn(e={}){if(e.built)return e;const{debug:t,error:n}=e,r=T({built:!0},en);return "function"==typeof t&&(r.debug=(...t)=>{e.debug.apply(null,["AT:",...t]);}),"function"==typeof n&&(r.error=(...t)=>{e.error.apply(null,["AT:",...t]);}),r}const nn="target-global-mbox",rn="web",on="click",an="display",un="authenticated",cn={context:{channel:rn}},sn="production",ln=[sn,"staging","development"];function fn(e){return void 0===e}function dn(e){return !fn(e)}function pn(e,t){const n=new Set;return ["prefetch","execute"].forEach(r=>{(t&&t[r]&&t[r][e]instanceof Array?t[r][e]:[]).filter(e=>dn(e.name)).forEach(e=>{n.add(e.name);});}),n}function hn(e){return pn("mboxes",e)}function gn(e){return function(e,t){const n=["prefetch","execute"];for(let r=0;r<n.length;r+=1){const o=n[r],i=t&&t[o]&&t[o][e]instanceof Array?t[o][e]:void 0;if(dn(i)&&i instanceof Array)return !0}return !1}("views",e)}function vn(e,t,n="execute"){const r=hn(t),o=[];t&&t[n]&&t[n].mboxes instanceof Array&&Array.prototype.push.apply(o,t[n].mboxes);let i=o.reduce((e,t)=>Math.max(e,"number"==typeof t.index?t.index:0),0)+1;e.filter(e=>!r.has(e)).forEach(e=>{o.push({name:e,index:i}),i+=1;});const a={...t};return a[n]={...t[n],mboxes:o},a}function mn(){return "undefined"!=typeof window}function yn(){return "undefined"!=typeof commonjsGlobal}const bn=()=>Wt(),wn=()=>{};function xn(e){return N(e,[Zt.ON_DEVICE,Zt.HYBRID])}function In(e){const t={...e};return Object.keys(t).forEach(e=>{fn(t[e])&&delete t[e];}),t}function En(e={token:void 0}){const{token:t}=e;return t}function Sn(e){return "string"==typeof e&&/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g.test(e)}function An(e,t=(e=>e[0])){const n={};return function(...r){const o=t.call(this,r);return dn(n[o])||(n[o]=e.call(null,...r)),n[o]}}function On(e){if("function"==typeof e)return e;let t;return yn()&&"function"==typeof commonjsGlobal.fetch?t=commonjsGlobal.fetch:mn()&&"function"==typeof window.fetch&&(t=window.fetch.bind(window)),t}function Rn(e,t=10,n=(e=>e),r=wn){return function o(i,a,u=t){return e(i,a).then(e=>{if(!e.ok&&304!==e.status)throw Error(e.statusText);return e}).catch(e=>{if("function"==typeof r&&r.call(void 0,e),u<1)throw new Error(n(e.message));return o(i,a,u-1)})}}function Tn(e){const t=function(e){const t={};return ["prefetch","execute"].forEach(n=>{dn(e[n])&&dn(e[n].mboxes)&&e[n].mboxes instanceof Array&&e[n].mboxes.forEach(e=>{const{name:n,options:r=[]}=e;r.forEach(e=>{const{type:r,content:o}=e;"json"===r&&dn(o)&&(t[n]=T({},t[n],o));});});}),t}(e.response);function n(e){return fn(e)?{...t}:{...t[e]}}return {getValue:(e,n)=>function(e,n){return Object.prototype.hasOwnProperty.call(t,e)&&Object.prototype.hasOwnProperty.call(t[e],n)?t[e][n]:new Error(((e,t)=>`Attribute '${e}' does not exist for mbox '${t}'`)(n,e))}(e,n),asObject:e=>n(e),toJSON:()=>n(void 0),getResponse:()=>e}}function Pn(e,t={}){this.type=e,Object.keys(t).forEach(e=>{this[e]=t[e];});}function _n(e,t){return t="function"==typeof t?t:e=>e.name,function(n){for(let r=0;r<e.length;r+=1){const o=e[r],i=n.match(o.regex);if(i)return t(o,i)}return t({name:"Unknown"})}}function kn(e,t){const n=65535&t;return ((t-n)*e|0)+(n*e|0)|0}const jn=An((function(e,t=0){let n;const r=e.length,o=3432918353,i=461845907;let a=t;const u=-2&r;for(let t=0;t<u;t+=2)n=e.charCodeAt(t)|e.charCodeAt(t+1)<<16,n=kn(n,o),n=(131071&n)<<15|n>>>17,n=kn(n,i),a^=n,a=(524287&a)<<13|a>>>19,a=5*a+3864292196|0;return r%2==1&&(n=e.charCodeAt(u),n=kn(n,o),n=(131071&n)<<15|n>>>17,n=kn(n,i),a^=n),a^=r<<1,a^=a>>>16,a=kn(a,2246822507),a^=a>>>13,a=kn(a,3266489909),a^=a>>>16,a}),e=>e.join("-"));var Dn=V((function(e){(function(){var t,n,r,o,i,a;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return (t()-i)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),a=1e9*process.uptime(),i=o-a):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return (new Date).getTime()-r},r=(new Date).getTime());}).call(B);}));function Cn(){let e={},t={},n={};return {timeStart:function(n,r=!1){const o=r?function(t){const n=(dn(e[t])?e[t]:0)+1;return e[t]=n,`${t}${n}`}(n):n;return fn(t[o])&&(t[o]=Dn()),o},timeEnd:function(e,r=0){if(fn(t[e]))return -1;const o=Dn()-t[e]-r;return n[e]=o,o},getTimings:()=>n,getTiming:e=>n[e],reset:function(){e={},t={},n={};}}}const Ln=Cn();var Un=function(e,t){if(e){t=t||{};for(var n={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},r=n.parser[t.strictMode?"strict":"loose"].exec(e),o={},i=14;i--;)o[n.key[i]]=r[i]||"";return o[n.q.name]={},o[n.key[12]].replace(n.q.parser,(function(e,t,r){t&&(o[n.q.name][t]=r);})),o}},Nn=function(e){var t,n,r="0123456789",o="",i="",a=8,u=10,c=10;if(1==e){for(r+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*a),o+=r.substring(n,n+1),n=Math.floor(Math.random()*a),i+=r.substring(n,n+1),a=16;return o+"-"+i}for(t=0;19>t;t++)n=Math.floor(Math.random()*u),o+=r.substring(n,n+1),0===t&&9==n?u=3:((1==t||2==t)&&10!=u&&2>n||2<t)&&(u=10),n=Math.floor(Math.random()*c),i+=r.substring(n,n+1),0===t&&9==n?c=3:((1==t||2==t)&&10!=c&&2>n||2<t)&&(c=10);return o+i};function Mn(){return Nn(1)}var qn={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},Fn=function(e){var t=(e=e||{}).supplementalDataIDCurrent,n=e.supplementalDataIDCurrentConsumed||{},r=e.supplementalDataIDLast,o=e.supplementalDataIDLastConsumed||{};return {getID:function(e,i){t||i||(t=Mn());var a=t;return r&&!o[e]?(a=r,o[e]=!0):a&&(n[e]&&(r=t,o=n,t=a=i?"":Mn(),n={}),a&&(n[e]=!0)),a},getState:function(){return {supplementalDataIDCurrent:t,supplementalDataIDCurrentConsumed:n,supplementalDataIDLast:r,supplementalDataIDLastConsumed:o}}}},Bn=V((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e;}finally{try{!r&&u.return&&u.return();}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e};function o(e){return e.match(/^[\-0-9]+$/)}function i(e){var t=new Date;return r({},e,{hasExpired:!!(0<e.expire&&t.getTime()>=1e3*e.expire)})}var a={pickValues:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],n=a.parse(e);return t.reduce((function(e,t){var r=n[t];return r&&(e[t]=r.value),e}),{})},parse:function(e){if(!e||"T"===e)return {};for(var t=decodeURIComponent(e).split("|"),r=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(o(e[0])){var n={value:e[0],hasExpired:!1,shouldExpireOnSession:!1,expire:0};t.settingsDigest=n,e.shift(),1==e.length%2&&e.pop();}return t}(t),a=0,u=t.length;a<u;a+=2){var c=t[a].split("-"),s=n(c,2),l=s[0],f=s[1],d=void 0===f?0:f,p=t[a+1],h=!(!d||!d.includes("s")),g=d?parseInt(d,10):d;r[l]=i({value:p,expire:g,shouldExpireOnSession:h});}return r}};t.default=a,e.exports=t.default;}));$(Bn);var $n=$(V((function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){throw new Error(e)},o=function(e){return 0>e.indexOf("@")?e+"@AdobeOrg":e};function i(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:r("Org ID is required"),t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,i={},a=o(e),u=function(e){return i=Object.assign({},i,e)},c=Fn();this.getVisitorValues=function(){return t?(0, Bn.pickValues)(t,["MCMID","MCAAMB","MCAAMLH"]):{}},this.getSupplementalDataID=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:r("Consumer ID is required"),t=c.getID("payload:"+e),n=c.getState();return u({sdid:n}),t},this.setCustomerIDs=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};u({customerIDs:e});},this.getState=function(){return n({},a,i)},this.getCookieName=function(){return "AMCV_"+a};}i.AuthState=qn,t.default=i,e.exports=t.default;})));const Vn=(e,t)=>`Unable to retrieve artifact after ${e} retries: ${t}`,Hn="The decisioning artifact is not available",Gn=(e,t)=>`The decisioning artifact version (${e}) is not supported. This library is compatible with this major version: ${t}`,zn=e=>"Failed to retrieve artifact: "+e,Kn="Invalid Artifact",Qn=(e,t)=>`'${e}' is not a valid target environment, defaulting to '${t}'.`,Xn="Not Applicable",Jn="Unable to read artifact JSON",Wn="unknown",Yn=/.+\.bin$/i,Zn=["bin","json"],er={bin:"rules.bin",json:"rules.json"},tr={};tr[sn]="assets.adobetarget.com",tr.staging="assets.staging.adobetarget.com",tr.development="assets.staging.adobetarget.com";const nr="activity.id",rr="activity.name",or="activity.type",ir="experience.id",ar="experience.name",ur="location.id",cr="location.name",sr="location.type",lr="offer.id",fr="offer.name",dr="option.id",pr="option.name";function hr(e){return e.ruleKey}function gr(e,t){if(fn(e))throw new Error(Hn);const n=Array.from(hn(t)),r=Array.from(pn("views",t));const{remoteMboxes:o=[],localMboxes:i=[],remoteViews:a=[],localViews:u=[]}=e,c=new Set([...o.filter(e=>N(e,n)),...n.filter(e=>!N(e,i))]),s=gn(t)&&0===r.length?new Set(a):new Set([...a.filter(e=>N(e,r)),...r.filter(e=>!N(e,u))]);return {remoteNeeded:c.size>0||s.size>0,remoteMboxes:Array.from(c),remoteViews:Array.from(s)}}function vr(e,t){const n=N(e,ln);return n||tn(t).debug(Qn(e,sn)),n?e:sn}function mr(e){let{cdnBasePath:t}=e;if(!dn(t)){const n=function(e){const{cdnEnvironment:t=sn}=e;return vr(t,e.logger)}(e),r=N(n,ln)?n:sn;t=tr[r];}return "https://"+t}function yr(e="json"){return e=N(e,Zn)?e:"json",er[e]}function br(e,t=mn()){const{client:n,propertyToken:r,artifactFormat:o,artifactLocation:i}=e;if("string"==typeof i)return i;const a=function(e){const{environment:t=sn}=e;return vr(t,e.logger)}(e);return [mr(e),n,a,"v1",t?r:void 0,yr(o)].filter(e=>dn(e)).join("/")}const wr={channel:rn};function xr(e){const t={};return Object.keys(e).forEach(n=>{t[n+"_lc"]="string"==typeof e[n]?e[n].toLowerCase():e[n];}),t}function Ir(e){const{userAgent:t=""}=e,n=((e="")=>_n([{name:"Edge",regex:/(edge|edgios|edga|edg)\/((\d+)?[\w.]+)/i,versionGroupIndex:2},{name:"Mobile Safari",regex:/version\/([\w.]+).+?mobile\/\w+\s(safari)/i,versionGroupIndex:1},{name:"Safari",regex:/version\/([\w.]+).+?(mobile\s?safari|safari)/i,versionGroupIndex:1},{name:"Chrome",regex:/(chrome)\/v?([\w.]+)/i,versionGroupIndex:2},{name:"Firefox",regex:/(firefox)\/([\w.-]+)$/i,versionGroupIndex:2},{name:"IE",regex:/(?:ms|\()(ie)\s([\w.]+)/i,versionGroupIndex:2},{name:"IE",regex:/(trident).+rv[:\s]([\w.]+).+like\sgecko/i,versionGroupIndex:2,version:11}],(e,t)=>{const n=(t&&t.length>e.versionGroupIndex?t[e.versionGroupIndex]:e.version)||"-1",r="string"==typeof n?parseInt(n.split(".")[0],10):-1;return {name:e.name,version:r}})(e))(t),r=(e=>_n([{name:"iOS",regex:/iPhone|iPad|iPod/},{name:"Android",regex:/Android [0-9.]+;/},{name:"Linux",regex:/ Linux /},{name:"Unix",regex:/FreeBSD|OpenBSD|CrOS/},{name:"Windows",regex:/[( ]Windows /},{name:"Mac OS",regex:/Macintosh;/}])(e))(t);return {browserType:n.name.toLowerCase(),platform:r,locale:"en",browserVersion:n.version}}function Er(e){e&&"string"==typeof e||(e="");const t=function(e){"string"!=typeof e&&(e="");const t=Un(e)||{},{host:n="",path:r="",query:o="",anchor:i=""}=t,a={url:e,path:r,query:o,fragment:i},u=n.split(".");switch(u.length){case 1:a.subdomain="",a.domain=n,a.topLevelDomain="";break;case 2:a.subdomain="",a.domain=n,a.topLevelDomain=u[1];break;case 3:a.subdomain="www"===u[0]?"":u[0],a.domain=n,a.topLevelDomain=u[2];break;case 4:a.subdomain="www"===u[0]?"":u[0],a.domain=n,a.topLevelDomain=`${u[2]}.${u[3]}`;}return a}(e);return {...t,...xr(t)}}function Sr(e){return Er(e?e.url:"")}function Ar(e){if(!e)return {};const t=e.parameters||{};return {...t,...xr(t)}}function Or(e={}){return {country:e.countryCode,region:e.stateCode,city:e.city,latitude:e.latitude,longitude:e.longitude}}function Rr(){const e=new Date,t=e=>e<10?"0"+e:String(e),n=`${t(e.getUTCHours())}${t(e.getUTCMinutes())}`,r=e.getUTCDay();return {current_timestamp:e.getTime(),current_time:n,current_day:0===r?7:r}}const Tr=(e,t)=>e.order-t.order;function Pr(e,t){let n={};const r={};let o=0;const i={};let a=0;function u(){return {campaigns:Yt(r).sort(Tr).map(e=>{const t={...e};return delete t.order,t}),evaluatedCampaignTargets:Yt(i).sort(Tr).map(e=>{const t={...e,matchedSegmentIds:[...e.matchedSegmentIds],unmatchedSegmentIds:[...e.unmatchedSegmentIds]};return delete t.order,t}),request:n}}return {toJSON:u,traceRuleEvaluated:function(e,n,u,c,s){!function(e,n){const{meta:i}=e,a=i[nr];n&&fn(r[a])&&(o+=1,r[a]={id:a,order:o,campaignType:i[or],branchId:i[ir],offers:dn(i[lr])?[i[lr]]:[],environment:t.meta.environment});}(e,s),function(e,t,n){const{meta:r}=e,o=r["audience.ids"],u=r[nr];fn(i[u])&&(a+=1,i[u]={order:a,context:t,campaignId:u,campaignType:r[or],matchedSegmentIds:new Set,unmatchedSegmentIds:new Set,matchedRuleConditions:[],unmatchedRuleConditions:[]}),o.forEach(e=>{i[u][n?"matchedSegmentIds":"unmatchedSegmentIds"].add(e);}),i[u][n?"matchedRuleConditions":"unmatchedRuleConditions"].push(e.condition);}(e,c,s);},traceRequest:function(e,t,r,o){n={pageURL:o.page.url,host:o.page.domain},n[t]={...r,type:e};},traceNotification:function(e){const{meta:t}=e,n=t[nr];return r[n].notifications instanceof Array||(r[n].notifications=[]),e=>{r[n].notifications.push(e);}},getTraceResult:function(){return e.wrap(u())}}}const _r="mbox",kr="view",jr="html",Dr="actions";var Cr=function(e){return e&&e.Math==Math&&e},Lr=Cr("object"==typeof globalThis&&globalThis)||Cr("object"==typeof window&&window)||Cr("object"==typeof self&&self)||Cr("object"==typeof B&&B)||Function("return this")(),Ur=function(e){try{return !!e()}catch(e){return !0}},Nr=!Ur((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),Mr={}.propertyIsEnumerable,qr=Object.getOwnPropertyDescriptor,Fr={f:qr&&!Mr.call({1:2},1)?function(e){var t=qr(this,e);return !!t&&t.enumerable}:Mr},Br=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},$r={}.toString,Vr=function(e){return $r.call(e).slice(8,-1)},Hr="".split,Gr=Ur((function(){return !Object("z").propertyIsEnumerable(0)}))?function(e){return "String"==Vr(e)?Hr.call(e,""):Object(e)}:Object,zr=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},Kr=function(e){return Gr(zr(e))},Qr=function(e){return "object"==typeof e?null!==e:"function"==typeof e},Xr=function(e,t){if(!Qr(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!Qr(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!Qr(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!Qr(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},Jr={}.hasOwnProperty,Wr=function(e,t){return Jr.call(e,t)},Yr=Lr.document,Zr=Qr(Yr)&&Qr(Yr.createElement),eo=!Nr&&!Ur((function(){return 7!=Object.defineProperty((e="div",Zr?Yr.createElement(e):{}),"a",{get:function(){return 7}}).a;var e;})),to=Object.getOwnPropertyDescriptor,no={f:Nr?to:function(e,t){if(e=Kr(e),t=Xr(t,!0),eo)try{return to(e,t)}catch(e){}if(Wr(e,t))return Br(!Fr.f.call(e,t),e[t])}},ro=function(e){if(!Qr(e))throw TypeError(String(e)+" is not an object");return e},oo=Object.defineProperty,io={f:Nr?oo:function(e,t,n){if(ro(e),t=Xr(t,!0),ro(n),eo)try{return oo(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return "value"in n&&(e[t]=n.value),e}},ao=Nr?function(e,t,n){return io.f(e,t,Br(1,n))}:function(e,t,n){return e[t]=n,e},uo=function(e,t){try{ao(Lr,e,t);}catch(n){Lr[e]=t;}return t},co=Lr["__core-js_shared__"]||uo("__core-js_shared__",{}),so=Function.toString;"function"!=typeof co.inspectSource&&(co.inspectSource=function(e){return so.call(e)});var lo,fo,po,ho,go=co.inspectSource,vo=Lr.WeakMap,mo="function"==typeof vo&&/native code/.test(go(vo)),yo=V((function(e){(e.exports=function(e,t){return co[e]||(co[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"});})),bo=0,wo=Math.random(),xo=function(e){return "Symbol("+String(void 0===e?"":e)+")_"+(++bo+wo).toString(36)},Io=yo("keys"),Eo={},So=Lr.WeakMap;if(mo){var Ao=new So,Oo=Ao.get,Ro=Ao.has,To=Ao.set;lo=function(e,t){return To.call(Ao,e,t),t},fo=function(e){return Oo.call(Ao,e)||{}},po=function(e){return Ro.call(Ao,e)};}else {var Po=Io[ho="state"]||(Io[ho]=xo(ho));Eo[Po]=!0,lo=function(e,t){return ao(e,Po,t),t},fo=function(e){return Wr(e,Po)?e[Po]:{}},po=function(e){return Wr(e,Po)};}var _o={set:lo,get:fo,has:po,enforce:function(e){return po(e)?fo(e):lo(e,{})},getterFor:function(e){return function(t){var n;if(!Qr(t)||(n=fo(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},ko=V((function(e){var t=_o.get,n=_o.enforce,r=String(String).split("String");(e.exports=function(e,t,o,i){var a=!!i&&!!i.unsafe,u=!!i&&!!i.enumerable,c=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof t||Wr(o,"name")||ao(o,"name",t),n(o).source=r.join("string"==typeof t?t:"")),e!==Lr?(a?!c&&e[t]&&(u=!0):delete e[t],u?e[t]=o:ao(e,t,o)):u?e[t]=o:uo(t,o);})(Function.prototype,"toString",(function(){return "function"==typeof this&&t(this).source||go(this)}));})),jo=Lr,Do=function(e){return "function"==typeof e?e:void 0},Co=Math.ceil,Lo=Math.floor,Uo=function(e){return isNaN(e=+e)?0:(e>0?Lo:Co)(e)},No=Math.min,Mo=function(e){return e>0?No(Uo(e),9007199254740991):0},qo=Math.max,Fo=Math.min,Bo=function(e){return function(t,n,r){var o,i=Kr(t),a=Mo(i.length),u=function(e,t){var n=Uo(e);return n<0?qo(n+t,0):Fo(n,t)}(r,a);if(e&&n!=n){for(;a>u;)if((o=i[u++])!=o)return !0}else for(;a>u;u++)if((e||u in i)&&i[u]===n)return e||u||0;return !e&&-1}},$o={includes:Bo(!0),indexOf:Bo(!1)}.indexOf,Vo=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),Ho={f:Object.getOwnPropertyNames||function(e){return function(e,t){var n,r=Kr(e),o=0,i=[];for(n in r)!Wr(Eo,n)&&Wr(r,n)&&i.push(n);for(;t.length>o;)Wr(r,n=t[o++])&&(~$o(i,n)||i.push(n));return i}(e,Vo)}},Go={f:Object.getOwnPropertySymbols},zo=function(e,t){return arguments.length<2?Do(jo[e])||Do(Lr[e]):jo[e]&&jo[e][t]||Lr[e]&&Lr[e][t]}("Reflect","ownKeys")||function(e){var t=Ho.f(ro(e)),n=Go.f;return n?t.concat(n(e)):t},Ko=function(e,t){for(var n=zo(t),r=io.f,o=no.f,i=0;i<n.length;i++){var a=n[i];Wr(e,a)||r(e,a,o(t,a));}},Qo=/#|\.prototype\./,Xo=function(e,t){var n=Wo[Jo(e)];return n==Zo||n!=Yo&&("function"==typeof t?Ur(t):!!t)},Jo=Xo.normalize=function(e){return String(e).replace(Qo,".").toLowerCase()},Wo=Xo.data={},Yo=Xo.NATIVE="N",Zo=Xo.POLYFILL="P",ei=Xo,ti=no.f,ni=function(e,t){var n,r,o,i,a,u=e.target,c=e.global,s=e.stat;if(n=c?Lr:s?Lr[u]||uo(u,{}):(Lr[u]||{}).prototype)for(r in t){if(i=t[r],o=e.noTargetGet?(a=ti(n,r))&&a.value:n[r],!ei(c?r:u+(s?".":"#")+r,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;Ko(i,o);}(e.sham||o&&o.sham)&&ao(i,"sham",!0),ko(n,r,i,e);}},ri=function(){var e=ro(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t};function oi(e,t){return RegExp(e,t)}var ii={UNSUPPORTED_Y:Ur((function(){var e=oi("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),BROKEN_CARET:Ur((function(){var e=oi("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ai=RegExp.prototype.exec,ui=String.prototype.replace,ci=ai,si=function(){var e=/a/,t=/b*/g;return ai.call(e,"a"),ai.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),li=ii.UNSUPPORTED_Y||ii.BROKEN_CARET,fi=void 0!==/()??/.exec("")[1];(si||fi||li)&&(ci=function(e){var t,n,r,o,i=this,a=li&&i.sticky,u=ri.call(i),c=i.source,s=0,l=e;return a&&(-1===(u=u.replace("y","")).indexOf("g")&&(u+="g"),l=String(e).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==e[i.lastIndex-1])&&(c="(?: "+c+")",l=" "+l,s++),n=new RegExp("^(?:"+c+")",u)),fi&&(n=new RegExp("^"+c+"$(?!\\s)",u)),si&&(t=i.lastIndex),r=ai.call(a?n:i,l),a?r?(r.input=r.input.slice(s),r[0]=r[0].slice(s),r.index=i.lastIndex,i.lastIndex+=r[0].length):i.lastIndex=0:si&&r&&(i.lastIndex=i.global?r.index+r[0].length:t),fi&&r&&r.length>1&&ui.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0);})),r});var di=ci;ni({target:"RegExp",proto:!0,forced:/./.exec!==di},{exec:di});var pi=!!Object.getOwnPropertySymbols&&!Ur((function(){return !String(Symbol())})),hi=pi&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,gi=yo("wks"),vi=Lr.Symbol,mi=hi?vi:vi&&vi.withoutSetter||xo,yi=function(e){return Wr(gi,e)||(pi&&Wr(vi,e)?gi[e]=vi[e]:gi[e]=mi("Symbol."+e)),gi[e]},bi=yi("species"),wi=!Ur((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),xi="$0"==="a".replace(/./,"$0"),Ii=yi("replace"),Ei=!!/./[Ii]&&""===/./[Ii]("a","$0"),Si=!Ur((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),Ai=function(e){return function(t,n){var r,o,i=String(zr(t)),a=Uo(n),u=i.length;return a<0||a>=u?e?"":void 0:(r=i.charCodeAt(a))<55296||r>56319||a+1===u||(o=i.charCodeAt(a+1))<56320||o>57343?e?i.charAt(a):r:e?i.slice(a,a+2):o-56320+(r-55296<<10)+65536}},Oi={codeAt:Ai(!1),charAt:Ai(!0)}.charAt,Ri=function(e,t,n){return t+(n?Oi(e,t).length:1)},Ti=function(e,t){var n=e.exec;if("function"==typeof n){var r=n.call(e,t);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==Vr(e))throw TypeError("RegExp#exec called on incompatible receiver");return di.call(e,t)},Pi=Math.max,_i=Math.min,ki=Math.floor,ji=/\$([$&'`]|\d\d?|<[^>]*>)/g,Di=/\$([$&'`]|\d\d?)/g;!function(e,t,n,r){var o=yi(e),i=!Ur((function(){var t={};return t[o]=function(){return 7},7!=""[e](t)})),a=i&&!Ur((function(){var t=!1,n=/a/;return "split"===e&&((n={}).constructor={},n.constructor[bi]=function(){return n},n.flags="",n[o]=/./[o]),n.exec=function(){return t=!0,null},n[o](""),!t}));if(!i||!a||"replace"===e&&(!wi||!xi||Ei)||"split"===e&&!Si){var u=/./[o],c=n(o,""[e],(function(e,t,n,r,o){return t.exec===di?i&&!o?{done:!0,value:u.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:xi,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:Ei}),s=c[0],l=c[1];ko(String.prototype,e,s),ko(RegExp.prototype,o,2==t?function(e,t){return l.call(e,this,t)}:function(e){return l.call(e,this)});}r&&ao(RegExp.prototype[o],"sham",!0);}("replace",2,(function(e,t,n,r){var o=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,i=r.REPLACE_KEEPS_$0,a=o?"$":"$0";return [function(n,r){var o=zr(this),i=null==n?void 0:n[e];return void 0!==i?i.call(n,o,r):t.call(String(o),n,r)},function(e,r){if(!o&&i||"string"==typeof r&&-1===r.indexOf(a)){var c=n(t,e,this,r);if(c.done)return c.value}var s=ro(e),l=String(this),f="function"==typeof r;f||(r=String(r));var d=s.global;if(d){var p=s.unicode;s.lastIndex=0;}for(var h=[];;){var g=Ti(s,l);if(null===g)break;if(h.push(g),!d)break;""===String(g[0])&&(s.lastIndex=Ri(l,Mo(s.lastIndex),p));}for(var v,m="",y=0,b=0;b<h.length;b++){g=h[b];for(var w=String(g[0]),x=Pi(_i(Uo(g.index),l.length),0),I=[],E=1;E<g.length;E++)I.push(void 0===(v=g[E])?v:String(v));var S=g.groups;if(f){var A=[w].concat(I,x,l);void 0!==S&&A.push(S);var O=String(r.apply(void 0,A));}else O=u(w,l,x,I,S,r);x>=y&&(m+=l.slice(y,x)+O,y=x+w.length);}return m+l.slice(y)}];function u(e,n,r,o,i,a){var u=r+e.length,c=o.length,s=Di;return void 0!==i&&(i=Object(zr(i)),s=ji),t.call(a,s,(function(t,a){var s;switch(a.charAt(0)){case"$":return "$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(u);case"<":s=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return t;if(l>c){var f=ki(l/10);return 0===f?t:f<=c?void 0===o[f-1]?a.charAt(1):o[f-1]+a.charAt(1):t}s=o[l-1];}return void 0===s?"":s}))}}));const Ci=/\$\{([a-zA-Z0-9_.]*?)\}/gi,Li={campaign:"activity",recipe:"experience"},Ui=new RegExp(Object.keys(Li).join("|"),"gi"),Ni=["mbox"];function Mi(e){return !(fn(e.type)&&fn(e.content))}function qi(e,t,n,r,o){const{metrics:i=[],options:a=[]}=t,u={...t,options:a.filter(Mi).map(e=>{const t={...e};return delete t.eventToken,t}),metrics:i.filter(e=>e.type===on)};return 0===u.metrics.length&&delete u.metrics,u}function Fi(e,t,n,r,o){const{options:i=[]}=t,a={...t,options:i.map((e,n)=>{let{eventToken:r}=e;return fn(r)&&t.metrics.length>n&&t.metrics[n].type===an&&(r=t.metrics[n].eventToken),{...e,eventToken:r}})};return n!==kr&&delete a.metrics,a}function Bi(e,t,n,r,o){return {...t,trace:o.getTraceResult()}}function $i(e,t,n,r,o){return In(t)}function Vi(e,t,n,r,o){const i={...t};return delete i.index,delete i.name,delete i.trace,i}function Hi(e,t,n,r,o){function i(t){return dn(t)&&"string"==typeof t?t.replace(Ci,(t,n)=>{let o=n.replace(Ui,e=>Li[e]).split(".");o.length>2&&(o=o.slice(o.length-2));const i=o.filter(e=>!N(e,Ni)).join("."),{parameters:a={}}=r;return function(e,t=[],n){for(let n=0;n<t.length;n+=1){const r=t[n];if("object"==typeof r&&null!==r&&dn(r[e]))return r[e]}return n}(i,[e.meta,r,a],t)}):t}return {...t,options:t.options.map(e=>e.type===jr?{...e,content:i(e.content)}:e.type===Dr?{...e,content:e.content.map(e=>({...e,content:i(e.content)}))}:e)}}var Gi=V((function(e,t){e.exports=function(){Array.isArray||(Array.isArray=function(e){return "[object Array]"===Object.prototype.toString.call(e)});var e={},t={"==":function(e,t){return e==t},"===":function(e,t){return e===t},"!=":function(e,t){return e!=t},"!==":function(e,t){return e!==t},">":function(e,t){return e>t},">=":function(e,t){return e>=t},"<":function(e,t,n){return void 0===n?e<t:e<t&&t<n},"<=":function(e,t,n){return void 0===n?e<=t:e<=t&&t<=n},"!!":function(t){return e.truthy(t)},"!":function(t){return !e.truthy(t)},"%":function(e,t){return e%t},log:function(e){return console.log(e),e},in:function(e,t){return !(!t||void 0===t.indexOf)&&-1!==t.indexOf(e)},cat:function(){return Array.prototype.join.call(arguments,"")},substr:function(e,t,n){if(n<0){var r=String(e).substr(t);return r.substr(0,r.length+n)}return String(e).substr(t,n)},"+":function(){return Array.prototype.reduce.call(arguments,(function(e,t){return parseFloat(e,10)+parseFloat(t,10)}),0)},"*":function(){return Array.prototype.reduce.call(arguments,(function(e,t){return parseFloat(e,10)*parseFloat(t,10)}))},"-":function(e,t){return void 0===t?-e:e-t},"/":function(e,t){return e/t},min:function(){return Math.min.apply(this,arguments)},max:function(){return Math.max.apply(this,arguments)},merge:function(){return Array.prototype.reduce.call(arguments,(function(e,t){return e.concat(t)}),[])},var:function(e,t){var n=void 0===t?null:t,r=this;if(void 0===e||""===e||null===e)return r;for(var o=String(e).split("."),i=0;i<o.length;i++){if(null==r)return n;if(void 0===(r=r[o[i]]))return n}return r},missing:function(){for(var t=[],n=Array.isArray(arguments[0])?arguments[0]:arguments,r=0;r<n.length;r++){var o=n[r],i=e.apply({var:o},this);null!==i&&""!==i||t.push(o);}return t},missing_some:function(t,n){var r=e.apply({missing:n},this);return n.length-r.length>=t?[]:r}};return e.is_logic=function(e){return "object"==typeof e&&null!==e&&!Array.isArray(e)&&1===Object.keys(e).length},e.truthy=function(e){return !(Array.isArray(e)&&0===e.length||!e)},e.get_operator=function(e){return Object.keys(e)[0]},e.get_values=function(t){return t[e.get_operator(t)]},e.apply=function(n,r){if(Array.isArray(n))return n.map((function(t){return e.apply(t,r)}));if(!e.is_logic(n))return n;var o,i,a,u,c,s=e.get_operator(n),l=n[s];if(Array.isArray(l)||(l=[l]),"if"===s||"?:"==s){for(o=0;o<l.length-1;o+=2)if(e.truthy(e.apply(l[o],r)))return e.apply(l[o+1],r);return l.length===o+1?e.apply(l[o],r):null}if("and"===s){for(o=0;o<l.length;o+=1)if(i=e.apply(l[o],r),!e.truthy(i))return i;return i}if("or"===s){for(o=0;o<l.length;o+=1)if(i=e.apply(l[o],r),e.truthy(i))return i;return i}if("filter"===s)return u=e.apply(l[0],r),a=l[1],Array.isArray(u)?u.filter((function(t){return e.truthy(e.apply(a,t))})):[];if("map"===s)return u=e.apply(l[0],r),a=l[1],Array.isArray(u)?u.map((function(t){return e.apply(a,t)})):[];if("reduce"===s)return u=e.apply(l[0],r),a=l[1],c=void 0!==l[2]?l[2]:null,Array.isArray(u)?u.reduce((function(t,n){return e.apply(a,{current:n,accumulator:t})}),c):c;if("all"===s){if(u=e.apply(l[0],r),a=l[1],!u.length)return !1;for(o=0;o<u.length;o+=1)if(!e.truthy(e.apply(a,u[o])))return !1;return !0}if("none"===s)return 0===e.apply({filter:l},r).length;if("some"===s)return e.apply({filter:l},r).length>0;if(l=l.map((function(t){return e.apply(t,r)})),"function"==typeof t[s])return t[s].apply(r,l);if(s.indexOf(".")>0){var f=String(s).split("."),d=t;for(o=0;o<f.length;o++)if(void 0===(d=d[f[o]]))throw new Error("Unrecognized operation "+s+" (failed at "+f.slice(0,o+1).join(".")+")");return d.apply(r,l)}throw new Error("Unrecognized operation "+s)},e.uses_data=function(t){var n=[];if(e.is_logic(t)){var r=e.get_operator(t),o=t[r];Array.isArray(o)||(o=[o]),"var"===r?n.push(o[0]):o.map((function(t){n.push.apply(n,e.uses_data(t));}));}return function(e){for(var t=[],n=0,r=e.length;n<r;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n)},e.add_operation=function(e,n){t[e]=n;},e.rm_operation=function(e){delete t[e];},e.rule_like=function(t,n){if(n===t)return !0;if("@"===n)return !0;if("number"===n)return "number"==typeof t;if("string"===n)return "string"==typeof t;if("array"===n)return Array.isArray(t)&&!e.is_logic(t);if(e.is_logic(n)){if(e.is_logic(t)){var r=e.get_operator(n),o=e.get_operator(t);if("@"===r||r===o)return e.rule_like(e.get_values(t,!1),e.get_values(n,!1))}return !1}if(Array.isArray(n)){if(Array.isArray(t)){if(n.length!==t.length)return !1;for(var i=0;i<n.length;i+=1)if(!e.rule_like(t[i],n[i]))return !1;return !0}return !1}return !1},e}();}));function zi(e){return e&&(e.marketingCloudVisitorId||function(e=""){if("string"==typeof e&&e.length>0){const[t,n]=e.split(".");return t}}(e.tntId)||e.thirdPartyId)||bn()}const Ki=An((function(e){const t=jn(e),n=Math.abs(t)%1e4/1e4*100;return Math.round(100*n)/100}));function Qi(e,t,n,r="0"){const o=[e,t,"string"==typeof n&&n.length>0?n:zi(n),r].join(".");return Ki(o)}function Xi(e,t){const n=zi(t);return function(t,r,o,i,a,u){let c,{page:s,referring:l}=r;dn(i.address)&&(s=Sr(i.address)||s,l=Sr(i.address)||l);const f={...r,page:s,referring:l,mbox:Ar(i),allocation:Qi(e,t.meta[nr],n)},d=Gi.apply(t.condition,f);return u.traceRuleEvaluated(t,i,o,f,d),d&&(c={...t.consequence,index:i.index},a.forEach(e=>{c=e(t,c,o,i,u);})),function(e){if(dn(e))return JSON.parse(JSON.stringify(e))}(c)}}function Ji(e){return function(t){const{propertyTokens:n=[]}=t;return fn(e)?0===n.length:0===n.length||N(e,n)}}function Wi(e,t,n,r,o,i){const a=Cn();a.timeStart("get_offer");const{responseTokens:u,rules:c}=r,s=r.globalMbox||nn,l=e.client,{request:f,visitor:d}=t,p=En(f.property),{sendNotificationFunc:h,telemetryEnabled:g=!0}=e,v=Xi(l,f.id),m=gr(r,f),y=function(e,t,n,r=wn,o=!0){const{requestId:i}=e,a=F(),u=new Set;let c=[],s=[];return {addNotification:function(e,t=wn){const n=[];if(e.options.forEach(t=>{const{eventToken:r}=t,o=`${e.name}-${r}`;dn(r)&&!u.has(o)&&(n.push(r),u.add(o));}),0===n.length)return;const r={id:bn(),impressionId:bn(),timestamp:a,type:an,mbox:{name:e.name},tokens:n};"function"==typeof t&&t(r),c.push(r);},addTelemetryEntry:function(e){o&&s.push({requestId:i,timestamp:a,features:{decisioningMethod:Zt.ON_DEVICE},...e});},sendNotifications:function(){if(n.debug("LD.NotificationProvider.sendNotifications",c,s),c.length>0||s.length>0){const{id:n,context:o,experienceCloud:i}=e,a={request:{id:n,context:o,experienceCloud:i},visitor:t};c.length>0&&(a.request.notifications=c),s.length>0&&(a.request.telemetry={entries:s}),setTimeout(()=>r.call(null,a),0),c=[],s=[];}}}}(f,d,o,h,g);function b(e,t){if(fn(f[e]))return;const o=Pr(i,r);function a(r,i=[]){const a=r.name===s;o.traceRequest(e,_r,r,n);const u=[],l=(c.mboxes[r.name]||[]).filter(Ji(p)),f=new Set;for(const e of l){const c=hr(e);let s;if((!a||a&&!f.has(c))&&(s=v(e,n,_r,r,[...t,...i],o)),s&&(u.push(s),f.add(c),!a))break}return a||0!==u.length||u.push({name:r.name,index:r.index,trace:o.getTraceResult()}),u}const u={};return f[e].mboxes&&(u.mboxes=C(f[e].mboxes.map(e=>a(e)))),f[e].views&&(u.views=C(f[e].views.map(r=>function(r,i=[]){o.traceRequest(e,kr,r,n);const a={};let u=[];u=Object.prototype.hasOwnProperty.call(r,"name")&&dn(r.name)?c.views[r.name]||[]:Object.keys(c.views).reduce((e,t)=>[...e,...c.views[t]],[]),u=u.filter(Ji(p));const s=new Set;for(const e of u){const u=hr(e);let c;s.has(u)||(c=v(e,n,kr,r,[...t,...i],o)),c&&(s.add(u),a[c.name]?a[c.name]={...a[c.name],options:[...a[c.name].options,...c.options],metrics:[...a[c.name].metrics,...c.metrics]}:a[c.name]=c);}return Yt(a)}(r)))),f[e].pageLoad&&(u.pageLoad=function(e){let t;const n=a({...e,name:s},[function(e,n){return t=n.trace,n},Vi]),r={options:C(n.map(e=>e.options)),trace:t},o=Yt(n.reduce((e,t)=>(t.metrics instanceof Array&&t.metrics.forEach(t=>{e[t.eventToken]=t;}),e),{}));return o.length>0&&(r.metrics=o),r}(f[e].pageLoad)),u}const w=[function(e,t=[]){const n={"activity.decisioningMethod":"on-device"};return N("geo.city",t)&&dn(e.geo.city)&&(n["geo.city"]=e.geo.city),N("geo.country",t)&&dn(e.geo.country)&&(n["geo.country"]=e.geo.country),N("geo.state",t)&&dn(e.geo.region)&&(n["geo.state"]=e.geo.region),N("geo.latitude",t)&&dn(e.geo.latitude)&&(n["geo.latitude"]=e.geo.latitude),N("geo.longitude",t)&&dn(e.geo.longitude)&&(n["geo.longitude"]=e.geo.longitude),function(e,r){const o=e.meta||{},i=[nr,rr,or,ir,ar,ur,cr,sr,lr,fr,dr,pr].reduce((e,n)=>(N(n,t)&&dn(o[n])&&(e[n]=o[n]),e),{}),a=r.options.map(e=>({...e,responseTokens:{...i,...n}}));return {...r,options:a}}}(n,u),Hi,Bi,$i],x=In({status:m.remoteNeeded?206:200,remoteMboxes:m.remoteMboxes,remoteViews:m.remoteViews,requestId:f.requestId,id:{...f.id},client:l,edgeHost:void 0,execute:(I=w,b("execute",[function(e,t,n,r,o){return y.addNotification(t,o.traceNotification(e)),t},qi,...I])),prefetch:function(e){return b("prefetch",[Fi,...e])}(w)});var I;return y.addTelemetryEntry({execution:a.timeEnd("get_offer")}),y.sendNotifications(),o.debug("LD.DecisionProvider",f,x),Promise.resolve(x)}ni({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}});const Yi=[{headerName:"x-forwarded-for",parseValue:e=>e,valueKey:"ipAddress"},{headerName:"x-geo-latitude",parseValue:e=>parseFloat(e),valueKey:"latitude"},{headerName:"x-geo-longitude",parseValue:e=>parseFloat(e),valueKey:"longitude"},{headerName:"x-geo-country-code",parseValue:e=>e,valueKey:"countryCode"},{headerName:"x-geo-region-code",parseValue:e=>e,valueKey:"stateCode"},{headerName:"x-geo-city",parseValue:e=>e,valueKey:"city"}];function Zi(e,t={}){return Yi.reduce((t,n)=>{const r=e.call(null,n.headerName);return null!=r&&dn(r)&&(t[n.valueKey]=n.parseValue(r)),t},t)}function ea(e,t){const n=On(e.fetchApi),{geoTargetingEnabled:r=!1}=t,{eventEmitter:o=wn}=e;return function(t={}){const i={...t};"unknownIpAddress"!==t.ipAddress&&Sn(t.ipAddress)||delete i.ipAddress;const a=function(e){return mr(e)+"/v1/geo"}(e);if(r&&("unknownIpAddress"===t.ipAddress||Sn(t.ipAddress))&&fn(t.latitude)&&fn(t.longitude)&&fn(t.countryCode)&&fn(t.stateCode)&&fn(t.city)){const e={};return "unknownIpAddress"!==t.ipAddress&&(e["x-forwarded-for"]=t.ipAddress),n(a,{headers:e}).then(e=>e.json().then(e=>function(e={}){return Zi(t=>e[t])}(e))).then(e=>(T(i,e),o("geoLocationUpdated",{geoContext:i}),i))}return Promise.resolve(i)}}function ta(e){const{organizationId:t}=e,n=new TextDecoder("utf-8");return {deobfuscate:function(e){const r=function(e){const t=new DataView(e),r=n.decode(t),[o,i]=r.slice(0,8).split(":"),a=r.slice(8,41);return {prefix:o,version:parseInt(i,10),key:a}}(e.slice(0,40));if(1!==r.version)throw new Error(Kn);return function(e,r){let o={};const i=(new TextEncoder).encode([t,e].join("")),a=new DataView(i.buffer),u=a.byteLength,c=new DataView(r),s=c.byteLength,l=new DataView(new ArrayBuffer(s));for(let e=0;e<s;e+=1)l.setInt8(e,c.getInt8(e)^a.getInt8(e%u));const f=n.decode(l);try{o=JSON.parse(f);}catch(e){throw new Error(Jn)}return o}(r.key,e.slice(40))}}}function na(e){const t=tn(e.logger),{eventEmitter:n=wn}=e,r=ta(e);const o="number"==typeof e.pollingInterval&&0===e.pollingInterval?0:Math.max(3e5,"number"==typeof e.pollingInterval?e.pollingInterval:3e5),i=On(e.fetchApi);let a,u,c=!1;const s={};let l,f,d=0;const p=br(e),h="string"==typeof e.artifactFormat?e.artifactFormat:function(e){return null!=e.match(Yn)?"bin":"json"}(p),g=Rn(i,10,e=>Vn(10,e),e=>n("artifactDownloadFailed",{artifactLocation:p,error:e}));function v(e){Ln.timeStart("artifactDownloaded_total");const o={};return t.debug("LD.ArtifactProvider fetching artifact - "+e),l&&!mn()&&yn()&&(o["If-None-Match"]=l),Ln.timeStart("artifactDownloaded_fetch"),g(e,{headers:o,cache:"default"}).then(e=>(Ln.timeEnd("artifactDownloaded_fetch"),t.debug("LD.ArtifactProvider artifact received - status="+e.status),304===e.status&&f?f:e.ok&&200===e.status?function(e){return "bin"===h?(Ln.timeStart("deobfuscate_total"),e.arrayBuffer().then(e=>r.deobfuscate(e).then(e=>(Ln.timeEnd("deobfuscate_total"),e)))):(Ln.timeStart("artifactDownloaded_read_JSON"),e.json().then(e=>(Ln.timeEnd("artifactDownloaded_read_JSON"),e)))}(e).then(t=>{const r=e.headers.get("Etag");var o;return null!=r&&dn(r)&&(f=t,l=r),function(e,t={}){n("artifactDownloadSucceeded",{artifactLocation:p,artifactPayload:e}),n("geoLocationUpdated",{geoContext:t}),Yt(s).forEach(t=>t(e));}(t,(o=e.headers,Zi(e=>o.get(e)))),Ln.timeEnd("artifactDownloaded_total"),t}):void 0)).catch(e=>{const n=e.message||e.toString();t.error(zn(n));})}function m(e){return d+=1,s[d]=e,d}function y(){0===o||c||(a=setTimeout(()=>{v(p).then(e=>(u=e,e)),y();},o));}return (Ln.timeStart("artifactGetInitial"),"object"==typeof e.artifactPayload?Promise.resolve(e.artifactPayload):v(p)).then(t=>{Ln.timeEnd("artifactGetInitial"),u=t;const n=function(e,t,n,r,o){let i=o,a=1,u=new Date;const c=dn(i)?i.meta:{};return {provideNewArtifact:function(e){u=new Date,a+=1,i=e;},toJSON:function(){return {artifactLocation:"object"==typeof t?Xn:e,pollingInterval:n,pollingHalted:r,artifactVersion:dn(i)?i.version:Wn,artifactRetrievalCount:a,artifactLastRetrieved:u.toISOString(),...c}}}}(p,e.artifactPayload,o,c,u);return m(e=>n.provideNewArtifact(e)),{getArtifact:()=>u,subscribe:e=>m(e),unsubscribe:e=>function(e){delete s[e];}(e),stopPolling:()=>(dn(a)&&(clearTimeout(a),a=void 0),void(c=!0)),resumePolling:()=>(c=!1,void y()),getTrace:()=>n.toJSON()}}).finally(()=>{y();})}function ra(e,t){const n={...e};if(!(n.tntId||n.marketingCloudVisitorId||function(e){if(!(e.customerIds&&e.customerIds instanceof Array))return;const t=e.customerIds.filter(e=>e.authenticatedState===un);return t.length>0?t[0].id:void 0}(n)||n.thirdPartyId)){const e="string"==typeof t&&t.length>0?`.${t}_0`:"";n.tntId=`${bn()}${e}`;}return n}function oa(e){const t=tn(e.logger);let n,r;function o(o){let{request:i}=o;return fn(r)?Promise.reject(new Error(Hn)):function(e,t){const[n,r,o]=e.split(".").map(e=>parseInt(e,10));return t===n}(r.version,1)?function(e,t,n){const{context:r={}}=e;return n(r.geo||{}).then(n=>({...e,context:{...r,geo:n},id:ra(e.id,t),requestId:e.requestId||bn()}))}(i,o.targetLocationHint,ea(e,r)).then(a=>{i=a;const u={...o,request:i},c=function(e,t,n){const r=e.client,{sessionId:o,request:i}=t,a=dn(i.trace),[u,c]=dn(i.id)&&"string"==typeof i.id.tntId?i.id.tntId.split("."):[void 0,void 0],s={visitorId:{...i.id,tntId:u,profileLocation:c}};return {wrap:function(e){if(a)return {clientCode:r,artifact:n,profile:s,request:{sessionId:o,...e.request},campaigns:e.campaigns,evaluatedCampaignTargets:e.evaluatedCampaignTargets}}}}(e,u,n.getTrace());return Wi(e,u,function(e){const{context:t=wr}=e;return {...Rr(),user:Ir(t),page:Sr(t.address),referring:(n=t.address,Er(n?n.referringUrl:"")),geo:Or(t.geo||{})};var n;}(i),r,t,c)}):Promise.reject(new Error(Gn(r.version,1)))}function i(){return dn(r)}return na({...e,logger:t}).then(e=>{if(n=e,r=n.getArtifact(),fn(r))throw new Error(Hn);return n.subscribe(e=>{r=e;}),{getRawArtifact:()=>r,stopPolling:()=>n.stopPolling(),getOffers:e=>o(e),hasRemoteDependency:e=>gr(r,e),isReady:i}})}const ia=e=>e instanceof Object,aa=e=>"number"==typeof e||e instanceof Number,ua=e=>!!Object.values(e).filter(e=>dn(e)).length,ca=e=>ia(e)&&!Array.isArray(e)&&!(e=>e instanceof String||e instanceof Number||e instanceof Boolean||e instanceof Symbol)(e)&&ua(e),sa=e=>!ca(e),la=e=>(e=>"string"==typeof e||e instanceof String)(e)&&!!e.length,fa=e=>!la(e),da=e=>Array.isArray(e)&&!!e.length&&ua(e),pa=e=>!da(e),ha=e=>Object.keys(e).forEach(t=>!e[t]&&delete e[t]),ga=(e=[])=>[].concat(...e);function va(e,t){const{organizationId:n}=t,{visitor:r,visitorCookie:o,customerIds:i}=e,a=r||new $n(n,o);return i&&a.setCustomerIDs(i),a}const ma={PRIVATE_CONSTRUCTOR:"Please use TargetClient.create static method instead",ORG_ID_REQUIRED:"Organization Id is required",DECISIONING_METHOD_INVALID:"Invalid Decisioning Method.  Must be set to one of: "+Object.values(Zt).join(","),FETCH_API_REQUIRED:"Fetch API is required",REQUEST_REQUIRED:"Request object is required",EXECUTE_FIELDS_REQUIRED:"Either pageLoad or mboxes is required in execute",PREFETCH_FIELDS_REQUIRED:"Either views, pageLoad or mboxes is required in prefetch",NOTIFICATIONS_REQUIRED:"Notifications array is required in request",MBOX_INVALID:"Mbox validation failed for: ",NOTIFICATION_INVALID:"Notification validation failed for: ",CLIENT_REQUIRED:"Client is required",OPTIONS_REQUIRED:"Options map is required",REQUEST_SENT:"Request sent",RESPONSE_RECEIVED:"Response received",FETCH_UNDEFINED:"Fetch is not defined!",DECISIONING_ENGINE_UNDEFINED:"Decisioning Engine is undefined",LOCATION_HINT_REQUEST_FAILED:"Unable to retrieve location hint cookie."};function ya(e){return e.expires}function ba(e){const t={};if(!e)return t;const n=e.split("|").map(e=>function(e){const t=e.split("#"),n=t.length;return 0===n||n<3||Number.isNaN(parseInt(t[2],10))?null:(r=decodeURIComponent(t[0]),o=decodeURIComponent(t[1]),i=Number(t[2]),{name:r,value:o,expires:i});var r,o,i;}(e)),r=Math.ceil(Date.now()/1e3);return n.filter(e=>e&&r<=e.expires).forEach(e=>{t[e.name]=e;}),t}function wa(e){const t=Date.now(),n=Math.abs(1e3*function(e){return Math.max.apply(null,e.map(ya))}(e)-t);return {name:"mbox",value:e.map(e=>{return t=e,[encodeURIComponent(t.name),encodeURIComponent(t.value),t.expires].join("#");var t;}).join("|"),maxAge:Math.ceil(n/1e3)}}var xa=function(e){return e&&e.Math==Math&&e},Ia=xa("object"==typeof globalThis&&globalThis)||xa("object"==typeof window&&window)||xa("object"==typeof self&&self)||xa("object"==typeof B&&B)||Function("return this")(),Ea=function(e){try{return !!e()}catch(e){return !0}},Sa=!Ea((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),Aa={}.propertyIsEnumerable,Oa=Object.getOwnPropertyDescriptor,Ra={f:Oa&&!Aa.call({1:2},1)?function(e){var t=Oa(this,e);return !!t&&t.enumerable}:Aa},Ta=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},Pa={}.toString,_a=function(e){return Pa.call(e).slice(8,-1)},ka="".split,ja=Ea((function(){return !Object("z").propertyIsEnumerable(0)}))?function(e){return "String"==_a(e)?ka.call(e,""):Object(e)}:Object,Da=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},Ca=function(e){return ja(Da(e))},La=function(e){return "object"==typeof e?null!==e:"function"==typeof e},Ua=function(e,t){if(!La(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!La(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!La(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!La(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},Na={}.hasOwnProperty,Ma=function(e,t){return Na.call(e,t)},qa=Ia.document,Fa=La(qa)&&La(qa.createElement),Ba=!Sa&&!Ea((function(){return 7!=Object.defineProperty((e="div",Fa?qa.createElement(e):{}),"a",{get:function(){return 7}}).a;var e;})),$a=Object.getOwnPropertyDescriptor,Va={f:Sa?$a:function(e,t){if(e=Ca(e),t=Ua(t,!0),Ba)try{return $a(e,t)}catch(e){}if(Ma(e,t))return Ta(!Ra.f.call(e,t),e[t])}},Ha=function(e){if(!La(e))throw TypeError(String(e)+" is not an object");return e},Ga=Object.defineProperty,za={f:Sa?Ga:function(e,t,n){if(Ha(e),t=Ua(t,!0),Ha(n),Ba)try{return Ga(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return "value"in n&&(e[t]=n.value),e}},Ka=Sa?function(e,t,n){return za.f(e,t,Ta(1,n))}:function(e,t,n){return e[t]=n,e},Qa=function(e,t){try{Ka(Ia,e,t);}catch(n){Ia[e]=t;}return t},Xa=Ia["__core-js_shared__"]||Qa("__core-js_shared__",{}),Ja=Function.toString;"function"!=typeof Xa.inspectSource&&(Xa.inspectSource=function(e){return Ja.call(e)});var Wa,Ya,Za,eu=Xa.inspectSource,tu=Ia.WeakMap,nu="function"==typeof tu&&/native code/.test(eu(tu)),ru=V((function(e){(e.exports=function(e,t){return Xa[e]||(Xa[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"});})),ou=0,iu=Math.random(),au=function(e){return "Symbol("+String(void 0===e?"":e)+")_"+(++ou+iu).toString(36)},uu=ru("keys"),cu={},su=Ia.WeakMap;if(nu){var lu=new su,fu=lu.get,du=lu.has,pu=lu.set;Wa=function(e,t){return pu.call(lu,e,t),t},Ya=function(e){return fu.call(lu,e)||{}},Za=function(e){return du.call(lu,e)};}else {var hu=function(e){return uu[e]||(uu[e]=au(e))}("state");cu[hu]=!0,Wa=function(e,t){return Ka(e,hu,t),t},Ya=function(e){return Ma(e,hu)?e[hu]:{}},Za=function(e){return Ma(e,hu)};}var gu={set:Wa,get:Ya,has:Za,enforce:function(e){return Za(e)?Ya(e):Wa(e,{})},getterFor:function(e){return function(t){var n;if(!La(t)||(n=Ya(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},vu=V((function(e){var t=gu.get,n=gu.enforce,r=String(String).split("String");(e.exports=function(e,t,o,i){var a=!!i&&!!i.unsafe,u=!!i&&!!i.enumerable,c=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof t||Ma(o,"name")||Ka(o,"name",t),n(o).source=r.join("string"==typeof t?t:"")),e!==Ia?(a?!c&&e[t]&&(u=!0):delete e[t],u?e[t]=o:Ka(e,t,o)):u?e[t]=o:Qa(t,o);})(Function.prototype,"toString",(function(){return "function"==typeof this&&t(this).source||eu(this)}));})),mu=Ia,yu=function(e){return "function"==typeof e?e:void 0},bu=Math.ceil,wu=Math.floor,xu=function(e){return isNaN(e=+e)?0:(e>0?wu:bu)(e)},Iu=Math.min,Eu=function(e){return e>0?Iu(xu(e),9007199254740991):0},Su=Math.max,Au=Math.min,Ou=function(e){return function(t,n,r){var o,i=Ca(t),a=Eu(i.length),u=function(e,t){var n=xu(e);return n<0?Su(n+t,0):Au(n,t)}(r,a);if(e&&n!=n){for(;a>u;)if((o=i[u++])!=o)return !0}else for(;a>u;u++)if((e||u in i)&&i[u]===n)return e||u||0;return !e&&-1}},Ru={includes:Ou(!0),indexOf:Ou(!1)}.indexOf,Tu=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),Pu={f:Object.getOwnPropertyNames||function(e){return function(e,t){var n,r=Ca(e),o=0,i=[];for(n in r)!Ma(cu,n)&&Ma(r,n)&&i.push(n);for(;t.length>o;)Ma(r,n=t[o++])&&(~Ru(i,n)||i.push(n));return i}(e,Tu)}},_u={f:Object.getOwnPropertySymbols},ku=function(e,t){return arguments.length<2?yu(mu[e])||yu(Ia[e]):mu[e]&&mu[e][t]||Ia[e]&&Ia[e][t]}("Reflect","ownKeys")||function(e){var t=Pu.f(Ha(e)),n=_u.f;return n?t.concat(n(e)):t},ju=function(e,t){for(var n=ku(t),r=za.f,o=Va.f,i=0;i<n.length;i++){var a=n[i];Ma(e,a)||r(e,a,o(t,a));}},Du=/#|\.prototype\./,Cu=function(e,t){var n=Uu[Lu(e)];return n==Mu||n!=Nu&&("function"==typeof t?Ea(t):!!t)},Lu=Cu.normalize=function(e){return String(e).replace(Du,".").toLowerCase()},Uu=Cu.data={},Nu=Cu.NATIVE="N",Mu=Cu.POLYFILL="P",qu=Cu,Fu=Va.f,Bu=function(){var e=Ha(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t};function $u(e,t){return RegExp(e,t)}var Vu={UNSUPPORTED_Y:Ea((function(){var e=$u("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),BROKEN_CARET:Ea((function(){var e=$u("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},Hu=RegExp.prototype.exec,Gu=String.prototype.replace,zu=Hu,Ku=function(){var e=/a/,t=/b*/g;return Hu.call(e,"a"),Hu.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),Qu=Vu.UNSUPPORTED_Y||Vu.BROKEN_CARET,Xu=void 0!==/()??/.exec("")[1];(Ku||Xu||Qu)&&(zu=function(e){var t,n,r,o,i=this,a=Qu&&i.sticky,u=Bu.call(i),c=i.source,s=0,l=e;return a&&(-1===(u=u.replace("y","")).indexOf("g")&&(u+="g"),l=String(e).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==e[i.lastIndex-1])&&(c="(?: "+c+")",l=" "+l,s++),n=new RegExp("^(?:"+c+")",u)),Xu&&(n=new RegExp("^"+c+"$(?!\\s)",u)),Ku&&(t=i.lastIndex),r=Hu.call(a?n:i,l),a?r?(r.input=r.input.slice(s),r[0]=r[0].slice(s),r.index=i.lastIndex,i.lastIndex+=r[0].length):i.lastIndex=0:Ku&&r&&(i.lastIndex=i.global?r.index+r[0].length:t),Xu&&r&&r.length>1&&Gu.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0);})),r});var Ju=zu;!function(e,t){var n,r,o,i,a,u=e.target,c=e.global,s=e.stat;if(n=c?Ia:s?Ia[u]||Qa(u,{}):(Ia[u]||{}).prototype)for(r in t){if(i=t[r],o=e.noTargetGet?(a=Fu(n,r))&&a.value:n[r],!qu(c?r:u+(s?".":"#")+r,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;ju(i,o);}(e.sham||o&&o.sham)&&Ka(i,"sham",!0),vu(n,r,i,e);}}({target:"RegExp",proto:!0,forced:/./.exec!==Ju},{exec:Ju});var Wu=!!Object.getOwnPropertySymbols&&!Ea((function(){return !String(Symbol())})),Yu=Wu&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Zu=ru("wks"),ec=Ia.Symbol,tc=Yu?ec:ec&&ec.withoutSetter||au,nc=function(e){return Ma(Zu,e)||(Wu&&Ma(ec,e)?Zu[e]=ec[e]:Zu[e]=tc("Symbol."+e)),Zu[e]},rc=nc("species"),oc=!Ea((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),ic="$0"==="a".replace(/./,"$0"),ac=nc("replace"),uc=!!/./[ac]&&""===/./[ac]("a","$0"),cc=!Ea((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),sc=function(e){return function(t,n){var r,o,i=String(Da(t)),a=xu(n),u=i.length;return a<0||a>=u?e?"":void 0:(r=i.charCodeAt(a))<55296||r>56319||a+1===u||(o=i.charCodeAt(a+1))<56320||o>57343?e?i.charAt(a):r:e?i.slice(a,a+2):o-56320+(r-55296<<10)+65536}},lc={codeAt:sc(!1),charAt:sc(!0)}.charAt,fc=function(e,t,n){return t+(n?lc(e,t).length:1)},dc=function(e,t){var n=e.exec;if("function"==typeof n){var r=n.call(e,t);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==_a(e))throw TypeError("RegExp#exec called on incompatible receiver");return Ju.call(e,t)},pc=Math.max,hc=Math.min,gc=Math.floor,vc=/\$([$&'`]|\d\d?|<[^>]*>)/g,mc=/\$([$&'`]|\d\d?)/g;!function(e,t,n,r){var o=nc(e),i=!Ea((function(){var t={};return t[o]=function(){return 7},7!=""[e](t)})),a=i&&!Ea((function(){var t=!1,n=/a/;return "split"===e&&((n={}).constructor={},n.constructor[rc]=function(){return n},n.flags="",n[o]=/./[o]),n.exec=function(){return t=!0,null},n[o](""),!t}));if(!i||!a||"replace"===e&&(!oc||!ic||uc)||"split"===e&&!cc){var u=/./[o],c=n(o,""[e],(function(e,t,n,r,o){return t.exec===Ju?i&&!o?{done:!0,value:u.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:ic,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:uc}),s=c[0],l=c[1];vu(String.prototype,e,s),vu(RegExp.prototype,o,2==t?function(e,t){return l.call(e,this,t)}:function(e){return l.call(e,this)});}r&&Ka(RegExp.prototype[o],"sham",!0);}("replace",2,(function(e,t,n,r){var o=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,i=r.REPLACE_KEEPS_$0,a=o?"$":"$0";return [function(n,r){var o=Da(this),i=null==n?void 0:n[e];return void 0!==i?i.call(n,o,r):t.call(String(o),n,r)},function(e,r){if(!o&&i||"string"==typeof r&&-1===r.indexOf(a)){var c=n(t,e,this,r);if(c.done)return c.value}var s=Ha(e),l=String(this),f="function"==typeof r;f||(r=String(r));var d=s.global;if(d){var p=s.unicode;s.lastIndex=0;}for(var h=[];;){var g=dc(s,l);if(null===g)break;if(h.push(g),!d)break;""===String(g[0])&&(s.lastIndex=fc(l,Eu(s.lastIndex),p));}for(var v,m="",y=0,b=0;b<h.length;b++){g=h[b];for(var w=String(g[0]),x=pc(hc(xu(g.index),l.length),0),I=[],E=1;E<g.length;E++)I.push(void 0===(v=g[E])?v:String(v));var S=g.groups;if(f){var A=[w].concat(I,x,l);void 0!==S&&A.push(S);var O=String(r.apply(void 0,A));}else O=u(w,l,x,I,S,r);x>=y&&(m+=l.slice(y,x)+O,y=x+w.length);}return m+l.slice(y)}];function u(e,n,r,o,i,a){var u=r+e.length,c=o.length,s=mc;return void 0!==i&&(i=Object(Da(i)),s=vc),t.call(a,s,(function(t,a){var s;switch(a.charAt(0)){case"$":return "$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(u);case"<":s=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return t;if(l>c){var f=gc(l/10);return 0===f?t:f<=c?void 0===o[f-1]?a.charAt(1):o[f-1]+a.charAt(1):t}s=o[l-1];}return void 0===s?"":s}))}}));var yc,bc,wc,xc=!z((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),Ic=je("IE_PROTO"),Ec=Object.prototype,Sc=xc?Object.getPrototypeOf:function(e){return e=Ft(e),ue(e,Ic)?e[Ic]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?Ec:null},Ac=Dt("iterator"),Oc=!1;[].keys&&("next"in(wc=[].keys())?(bc=Sc(Sc(wc)))!==Object.prototype&&(yc=bc):Oc=!0),null==yc&&(yc={}),ue(yc,Ac)||me(yc,Ac,(function(){return this}));var Rc,Tc={IteratorPrototype:yc,BUGGY_SAFARI_ITERATORS:Oc},Pc=Object.keys||function(e){return et(e,tt)},_c=K?Object.defineProperties:function(e,t){he(e);for(var n,r=Pc(t),o=r.length,i=0;o>i;)ve.f(e,n=r[i++],t[n]);return e},kc=He("document","documentElement"),jc=je("IE_PROTO"),Dc=function(){},Cc=function(e){return "<script>"+e+"<\/script>"},Lc=function(){try{Rc=document.domain&&new ActiveXObject("htmlfile");}catch(e){}var e,t;Lc=Rc?function(e){e.write(Cc("")),e.close();var t=e.parentWindow.Object;return e=null,t}(Rc):((t=le("iframe")).style.display="none",kc.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(Cc("document.F=Object")),e.close(),e.F);for(var n=tt.length;n--;)delete Lc.prototype[tt[n]];return Lc()};De[jc]=!0;var Uc=Object.create||function(e,t){var n;return null!==e?(Dc.prototype=he(e),n=new Dc,Dc.prototype=null,n[jc]=e):n=Lc(),void 0===t?n:_c(n,t)},Nc=ve.f,Mc=Dt("toStringTag"),qc=function(e,t,n){e&&!ue(e=n?e:e.prototype,Mc)&&Nc(e,Mc,{configurable:!0,value:t});},Fc={},Bc=Tc.IteratorPrototype,$c=function(){return this},Vc=function(e,t,n){var r=t+" Iterator";return e.prototype=Uc(Bc,{next:W(1,n)}),qc(e,r,!1),Fc[r]=$c,e},Hc=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),t=n instanceof Array;}catch(e){}return function(n,r){return he(n),function(e){if(!oe(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(r),t?e.call(n,r):n.__proto__=r,n}}():void 0),Gc=Tc.IteratorPrototype,zc=Tc.BUGGY_SAFARI_ITERATORS,Kc=Dt("iterator"),Qc=function(){return this},Xc=function(e,t,n,r,o,i,a){Vc(n,t,r);var u,c,s,l=function(e){if(e===o&&g)return g;if(!zc&&e in p)return p[e];switch(e){case"keys":case"values":case"entries":return function(){return new n(this,e)}}return function(){return new n(this)}},f=t+" Iterator",d=!1,p=e.prototype,h=p[Kc]||p["@@iterator"]||o&&p[o],g=!zc&&h||l(o),v="Array"==t&&p.entries||h;if(v&&(u=Sc(v.call(new e)),Gc!==Object.prototype&&u.next&&(Sc(u)!==Gc&&(Hc?Hc(u,Gc):"function"!=typeof u[Kc]&&me(u,Kc,Qc)),qc(u,f,!0))),"values"==o&&h&&"values"!==h.name&&(d=!0,g=function(){return h.call(this)}),p[Kc]!==g&&me(p,Kc,g),Fc[t]=g,o)if(c={values:l("values"),keys:i?g:l("keys"),entries:l("entries")},a)for(s in c)(zc||d||!(s in p))&&Be(p,s,c[s]);else gt({target:t,proto:!0,forced:zc||d},c);return c},Jc=$t.charAt,Wc=Fe.set,Yc=Fe.getterFor("String Iterator");Xc(String,"String",(function(e){Wc(this,{type:"String Iterator",string:String(e),index:0});}),(function(){var e,t=Yc(this),n=t.string,r=t.index;return r>=n.length?{value:void 0,done:!0}:(e=Jc(n,r),t.index+=e.length,{value:e,done:!1})}));var Zc=Dt("iterator"),es=!z((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,n="";return e.pathname="c%20d",t.forEach((function(e,r){t.delete("b"),n+=r+e;})),!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[Zc]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host})),ts=function(e,t,n){if(!(e instanceof t))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return e},ns=Object.assign,rs=Object.defineProperty,os=!ns||z((function(){if(K&&1!==ns({b:1},ns(rs({},"a",{enumerable:!0,get:function(){rs(this,"b",{value:3,enumerable:!1});}}),{b:2})).b)return !0;var e={},t={},n=Symbol();return e[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e;})),7!=ns({},e)[n]||"abcdefghijklmnopqrst"!=Pc(ns({},t)).join("")}))?function(e,t){for(var n=Ft(e),r=arguments.length,o=1,i=ot.f,a=J.f;r>o;)for(var u,c=te(arguments[o++]),s=i?Pc(c).concat(i(c)):Pc(c),l=s.length,f=0;l>f;)u=s[f++],K&&!a.call(c,u)||(n[u]=c[u]);return n}:ns,is=function(e,t,n){if(function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function")}(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}},as=function(e,t,n,r){try{return r?t(he(n)[0],n[1]):t(n)}catch(t){var o=e.return;throw void 0!==o&&he(o.call(e)),t}},us=Dt("iterator"),cs=Array.prototype,ss=function(e){return void 0!==e&&(Fc.Array===e||cs[us]===e)},ls=function(e,t,n){var r=ie(t);r in e?ve.f(e,r,W(0,n)):e[r]=n;},fs={};fs[Dt("toStringTag")]="z";var ds="[object z]"===String(fs),ps=Dt("toStringTag"),hs="Arguments"==Z(function(){return arguments}()),gs=ds?Z:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),ps))?n:hs?Z(t):"Object"==(r=Z(t))&&"function"==typeof t.callee?"Arguments":r},vs=Dt("iterator"),ms=function(e){if(null!=e)return e[vs]||e["@@iterator"]||Fc[gs(e)]},ys=function(e){var t,n,r,o,i,a,u=Ft(e),c="function"==typeof this?this:Array,s=arguments.length,l=s>1?arguments[1]:void 0,f=void 0!==l,d=ms(u),p=0;if(f&&(l=is(l,s>2?arguments[2]:void 0,2)),null==d||c==Array&&ss(d))for(n=new c(t=Xe(u.length));t>p;p++)a=f?l(u[p],p):u[p],ls(n,p,a);else for(i=(o=d.call(u)).next,n=new c;!(r=i.call(o)).done;p++)a=f?as(o,l,[r.value,p],!0):r.value,ls(n,p,a);return n.length=p,n},bs=/[^\0-\u007E]/,ws=/[.\u3002\uFF0E\uFF61]/g,xs="Overflow: input needs wider integers to process",Is=Math.floor,Es=String.fromCharCode,Ss=function(e){return e+22+75*(e<26)},As=function(e,t,n){var r=0;for(e=n?Is(e/700):e>>1,e+=Is(e/t);e>455;r+=36)e=Is(e/35);return Is(r+36*e/(e+38))},Os=function(e){var t,n,r=[],o=(e=function(e){for(var t=[],n=0,r=e.length;n<r;){var o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<r){var i=e.charCodeAt(n++);56320==(64512&i)?t.push(((1023&o)<<10)+(1023&i)+65536):(t.push(o),n--);}else t.push(o);}return t}(e)).length,i=128,a=0,u=72;for(t=0;t<e.length;t++)(n=e[t])<128&&r.push(Es(n));var c=r.length,s=c;for(c&&r.push("-");s<o;){var l=2147483647;for(t=0;t<e.length;t++)(n=e[t])>=i&&n<l&&(l=n);var f=s+1;if(l-i>Is((2147483647-a)/f))throw RangeError(xs);for(a+=(l-i)*f,i=l,t=0;t<e.length;t++){if((n=e[t])<i&&++a>2147483647)throw RangeError(xs);if(n==i){for(var d=a,p=36;;p+=36){var h=p<=u?1:p>=u+26?26:p-u;if(d<h)break;var g=d-h,v=36-h;r.push(Es(Ss(h+g%v))),d=Is(g/v);}r.push(Es(Ss(d))),u=As(a,f,s==c),a=0,++s;}}++a,++i;}return r.join("")},Rs=Dt("unscopables"),Ts=Array.prototype;null==Ts[Rs]&&ve.f(Ts,Rs,{configurable:!0,value:Uc(null)});var Ps=function(e){Ts[Rs][e]=!0;},_s=Fe.set,ks=Fe.getterFor("Array Iterator");Xc(Array,"Array",(function(e,t){_s(this,{type:"Array Iterator",target:re(e),index:0,kind:t});}),(function(){var e=ks(this),t=e.target,n=e.kind,r=e.index++;return !t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}}),"values");Fc.Arguments=Fc.Array,Ps("keys"),Ps("values"),Ps("entries");var js=function(e){var t=ms(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return he(t.call(e))},Ds=He("fetch"),Cs=He("Headers"),Ls=Dt("iterator"),Us=Fe.set,Ns=Fe.getterFor("URLSearchParams"),Ms=Fe.getterFor("URLSearchParamsIterator"),qs=/\+/g,Fs=Array(4),Bs=function(e){return Fs[e-1]||(Fs[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},$s=function(e){try{return decodeURIComponent(e)}catch(t){return e}},Vs=function(e){var t=e.replace(qs," "),n=4;try{return decodeURIComponent(t)}catch(e){for(;n;)t=t.replace(Bs(n--),$s);return t}},Hs=/[!'()~]|%20/g,Gs={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},zs=function(e){return Gs[e]},Ks=function(e){return encodeURIComponent(e).replace(Hs,zs)},Qs=function(e,t){if(t)for(var n,r,o=t.split("&"),i=0;i<o.length;)(n=o[i++]).length&&(r=n.split("="),e.push({key:Vs(r.shift()),value:Vs(r.join("="))}));},Xs=function(e){this.entries.length=0,Qs(this.entries,e);},Js=function(e,t){if(e<t)throw TypeError("Not enough arguments")},Ws=Vc((function(e,t){Us(this,{type:"URLSearchParamsIterator",iterator:js(Ns(e).entries),kind:t});}),"Iterator",(function(){var e=Ms(this),t=e.kind,n=e.iterator.next(),r=n.value;return n.done||(n.value="keys"===t?r.key:"values"===t?r.value:[r.key,r.value]),n})),Ys=function(){ts(this,Ys,"URLSearchParams");var e,t,n,r,o,i,a,u,c,s=arguments.length>0?arguments[0]:void 0,l=this,f=[];if(Us(l,{type:"URLSearchParams",entries:f,updateURL:function(){},updateSearchParams:Xs}),void 0!==s)if(oe(s))if("function"==typeof(e=ms(s)))for(n=(t=e.call(s)).next;!(r=n.call(t)).done;){if((a=(i=(o=js(he(r.value))).next).call(o)).done||(u=i.call(o)).done||!i.call(o).done)throw TypeError("Expected sequence with length 2");f.push({key:a.value+"",value:u.value+""});}else for(c in s)ue(s,c)&&f.push({key:c,value:s[c]+""});else Qs(f,"string"==typeof s?"?"===s.charAt(0)?s.slice(1):s:s+"");},Zs=Ys.prototype;!function(e,t,n){for(var r in t)Be(e,r,t[r],n);}(Zs,{append:function(e,t){Js(arguments.length,2);var n=Ns(this);n.entries.push({key:e+"",value:t+""}),n.updateURL();},delete:function(e){Js(arguments.length,1);for(var t=Ns(this),n=t.entries,r=e+"",o=0;o<n.length;)n[o].key===r?n.splice(o,1):o++;t.updateURL();},get:function(e){Js(arguments.length,1);for(var t=Ns(this).entries,n=e+"",r=0;r<t.length;r++)if(t[r].key===n)return t[r].value;return null},getAll:function(e){Js(arguments.length,1);for(var t=Ns(this).entries,n=e+"",r=[],o=0;o<t.length;o++)t[o].key===n&&r.push(t[o].value);return r},has:function(e){Js(arguments.length,1);for(var t=Ns(this).entries,n=e+"",r=0;r<t.length;)if(t[r++].key===n)return !0;return !1},set:function(e,t){Js(arguments.length,1);for(var n,r=Ns(this),o=r.entries,i=!1,a=e+"",u=t+"",c=0;c<o.length;c++)(n=o[c]).key===a&&(i?o.splice(c--,1):(i=!0,n.value=u));i||o.push({key:a,value:u}),r.updateURL();},sort:function(){var e,t,n,r=Ns(this),o=r.entries,i=o.slice();for(o.length=0,n=0;n<i.length;n++){for(e=i[n],t=0;t<n;t++)if(o[t].key>e.key){o.splice(t,0,e);break}t===n&&o.push(e);}r.updateURL();},forEach:function(e){for(var t,n=Ns(this).entries,r=is(e,arguments.length>1?arguments[1]:void 0,3),o=0;o<n.length;)r((t=n[o++]).value,t.key,this);},keys:function(){return new Ws(this,"keys")},values:function(){return new Ws(this,"values")},entries:function(){return new Ws(this,"entries")}},{enumerable:!0}),Be(Zs,Ls,Zs.entries),Be(Zs,"toString",(function(){for(var e,t=Ns(this).entries,n=[],r=0;r<t.length;)e=t[r++],n.push(Ks(e.key)+"="+Ks(e.value));return n.join("&")}),{enumerable:!0}),qc(Ys,"URLSearchParams"),gt({global:!0,forced:!es},{URLSearchParams:Ys}),es||"function"!=typeof Ds||"function"!=typeof Cs||gt({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,n,r,o=[e];return arguments.length>1&&(oe(t=arguments[1])&&(n=t.body,"URLSearchParams"===gs(n)&&((r=t.headers?new Cs(t.headers):new Cs).has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=Uc(t,{body:W(0,String(n)),headers:W(0,r)}))),o.push(t)),Ds.apply(this,o)}});var el,tl={URLSearchParams:Ys,getState:Ns},nl=$t.codeAt,rl=G.URL,ol=tl.URLSearchParams,il=tl.getState,al=Fe.set,ul=Fe.getterFor("URL"),cl=Math.floor,sl=Math.pow,ll=/[A-Za-z]/,fl=/[\d+-.A-Za-z]/,dl=/\d/,pl=/^(0x|0X)/,hl=/^[0-7]+$/,gl=/^\d+$/,vl=/^[\dA-Fa-f]+$/,ml=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,yl=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,bl=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,wl=/[\u0009\u000A\u000D]/g,xl=function(e,t){var n,r,o;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return "Invalid host";if(!(n=El(t.slice(1,-1))))return "Invalid host";e.host=n;}else if(kl(e)){if(t=function(e){var t,n,r=[],o=e.toLowerCase().replace(ws,".").split(".");for(t=0;t<o.length;t++)n=o[t],r.push(bs.test(n)?"xn--"+Os(n):n);return r.join(".")}(t),ml.test(t))return "Invalid host";if(null===(n=Il(t)))return "Invalid host";e.host=n;}else {if(yl.test(t))return "Invalid host";for(n="",r=ys(t),o=0;o<r.length;o++)n+=Pl(r[o],Al);e.host=n;}},Il=function(e){var t,n,r,o,i,a,u,c=e.split(".");if(c.length&&""==c[c.length-1]&&c.pop(),(t=c.length)>4)return e;for(n=[],r=0;r<t;r++){if(""==(o=c[r]))return e;if(i=10,o.length>1&&"0"==o.charAt(0)&&(i=pl.test(o)?16:8,o=o.slice(8==i?1:2)),""===o)a=0;else {if(!(10==i?gl:8==i?hl:vl).test(o))return e;a=parseInt(o,i);}n.push(a);}for(r=0;r<t;r++)if(a=n[r],r==t-1){if(a>=sl(256,5-t))return null}else if(a>255)return null;for(u=n.pop(),r=0;r<n.length;r++)u+=n[r]*sl(256,3-r);return u},El=function(e){var t,n,r,o,i,a,u,c=[0,0,0,0,0,0,0,0],s=0,l=null,f=0,d=function(){return e.charAt(f)};if(":"==d()){if(":"!=e.charAt(1))return;f+=2,l=++s;}for(;d();){if(8==s)return;if(":"!=d()){for(t=n=0;n<4&&vl.test(d());)t=16*t+parseInt(d(),16),f++,n++;if("."==d()){if(0==n)return;if(f-=n,s>6)return;for(r=0;d();){if(o=null,r>0){if(!("."==d()&&r<4))return;f++;}if(!dl.test(d()))return;for(;dl.test(d());){if(i=parseInt(d(),10),null===o)o=i;else {if(0==o)return;o=10*o+i;}if(o>255)return;f++;}c[s]=256*c[s]+o,2!=++r&&4!=r||s++;}if(4!=r)return;break}if(":"==d()){if(f++,!d())return}else if(d())return;c[s++]=t;}else {if(null!==l)return;f++,l=++s;}}if(null!==l)for(a=s-l,s=7;0!=s&&a>0;)u=c[s],c[s--]=c[l+a-1],c[l+--a]=u;else if(8!=s)return;return c},Sl=function(e){var t,n,r,o;if("number"==typeof e){for(t=[],n=0;n<4;n++)t.unshift(e%256),e=cl(e/256);return t.join(".")}if("object"==typeof e){for(t="",r=function(e){for(var t=null,n=1,r=null,o=0,i=0;i<8;i++)0!==e[i]?(o>n&&(t=r,n=o),r=null,o=0):(null===r&&(r=i),++o);return o>n&&(t=r,n=o),t}(e),n=0;n<8;n++)o&&0===e[n]||(o&&(o=!1),r===n?(t+=n?":":"::",o=!0):(t+=e[n].toString(16),n<7&&(t+=":")));return "["+t+"]"}return e},Al={},Ol=os({},Al,{" ":1,'"':1,"<":1,">":1,"`":1}),Rl=os({},Ol,{"#":1,"?":1,"{":1,"}":1}),Tl=os({},Rl,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),Pl=function(e,t){var n=nl(e,0);return n>32&&n<127&&!ue(t,e)?e:encodeURIComponent(e)},_l={ftp:21,file:null,http:80,https:443,ws:80,wss:443},kl=function(e){return ue(_l,e.scheme)},jl=function(e){return ""!=e.username||""!=e.password},Dl=function(e){return !e.host||e.cannotBeABaseURL||"file"==e.scheme},Cl=function(e,t){var n;return 2==e.length&&ll.test(e.charAt(0))&&(":"==(n=e.charAt(1))||!t&&"|"==n)},Ll=function(e){var t;return e.length>1&&Cl(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},Ul=function(e){var t=e.path,n=t.length;!n||"file"==e.scheme&&1==n&&Cl(t[0],!0)||t.pop();},Nl=function(e){return "."===e||"%2e"===e.toLowerCase()},Ml={},ql={},Fl={},Bl={},$l={},Vl={},Hl={},Gl={},zl={},Kl={},Ql={},Xl={},Jl={},Wl={},Yl={},Zl={},ef={},tf={},nf={},rf={},of={},af=function(e,t,n,r){var o,i,a,u,c,s=n||Ml,l=0,f="",d=!1,p=!1,h=!1;for(n||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(bl,"")),t=t.replace(wl,""),o=ys(t);l<=o.length;){switch(i=o[l],s){case Ml:if(!i||!ll.test(i)){if(n)return "Invalid scheme";s=Fl;continue}f+=i.toLowerCase(),s=ql;break;case ql:if(i&&(fl.test(i)||"+"==i||"-"==i||"."==i))f+=i.toLowerCase();else {if(":"!=i){if(n)return "Invalid scheme";f="",s=Fl,l=0;continue}if(n&&(kl(e)!=ue(_l,f)||"file"==f&&(jl(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=f,n)return void(kl(e)&&_l[e.scheme]==e.port&&(e.port=null));f="","file"==e.scheme?s=Wl:kl(e)&&r&&r.scheme==e.scheme?s=Bl:kl(e)?s=Gl:"/"==o[l+1]?(s=$l,l++):(e.cannotBeABaseURL=!0,e.path.push(""),s=nf);}break;case Fl:if(!r||r.cannotBeABaseURL&&"#"!=i)return "Invalid scheme";if(r.cannotBeABaseURL&&"#"==i){e.scheme=r.scheme,e.path=r.path.slice(),e.query=r.query,e.fragment="",e.cannotBeABaseURL=!0,s=of;break}s="file"==r.scheme?Wl:Vl;continue;case Bl:if("/"!=i||"/"!=o[l+1]){s=Vl;continue}s=zl,l++;break;case $l:if("/"==i){s=Kl;break}s=tf;continue;case Vl:if(e.scheme=r.scheme,i==el)e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query=r.query;else if("/"==i||"\\"==i&&kl(e))s=Hl;else if("?"==i)e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query="",s=rf;else {if("#"!=i){e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.path.pop(),s=tf;continue}e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query=r.query,e.fragment="",s=of;}break;case Hl:if(!kl(e)||"/"!=i&&"\\"!=i){if("/"!=i){e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,s=tf;continue}s=Kl;}else s=zl;break;case Gl:if(s=zl,"/"!=i||"/"!=f.charAt(l+1))continue;l++;break;case zl:if("/"!=i&&"\\"!=i){s=Kl;continue}break;case Kl:if("@"==i){d&&(f="%40"+f),d=!0,a=ys(f);for(var g=0;g<a.length;g++){var v=a[g];if(":"!=v||h){var m=Pl(v,Tl);h?e.password+=m:e.username+=m;}else h=!0;}f="";}else if(i==el||"/"==i||"?"==i||"#"==i||"\\"==i&&kl(e)){if(d&&""==f)return "Invalid authority";l-=ys(f).length+1,f="",s=Ql;}else f+=i;break;case Ql:case Xl:if(n&&"file"==e.scheme){s=Zl;continue}if(":"!=i||p){if(i==el||"/"==i||"?"==i||"#"==i||"\\"==i&&kl(e)){if(kl(e)&&""==f)return "Invalid host";if(n&&""==f&&(jl(e)||null!==e.port))return;if(u=xl(e,f))return u;if(f="",s=ef,n)return;continue}"["==i?p=!0:"]"==i&&(p=!1),f+=i;}else {if(""==f)return "Invalid host";if(u=xl(e,f))return u;if(f="",s=Jl,n==Xl)return}break;case Jl:if(!dl.test(i)){if(i==el||"/"==i||"?"==i||"#"==i||"\\"==i&&kl(e)||n){if(""!=f){var y=parseInt(f,10);if(y>65535)return "Invalid port";e.port=kl(e)&&y===_l[e.scheme]?null:y,f="";}if(n)return;s=ef;continue}return "Invalid port"}f+=i;break;case Wl:if(e.scheme="file","/"==i||"\\"==i)s=Yl;else {if(!r||"file"!=r.scheme){s=tf;continue}if(i==el)e.host=r.host,e.path=r.path.slice(),e.query=r.query;else if("?"==i)e.host=r.host,e.path=r.path.slice(),e.query="",s=rf;else {if("#"!=i){Ll(o.slice(l).join(""))||(e.host=r.host,e.path=r.path.slice(),Ul(e)),s=tf;continue}e.host=r.host,e.path=r.path.slice(),e.query=r.query,e.fragment="",s=of;}}break;case Yl:if("/"==i||"\\"==i){s=Zl;break}r&&"file"==r.scheme&&!Ll(o.slice(l).join(""))&&(Cl(r.path[0],!0)?e.path.push(r.path[0]):e.host=r.host),s=tf;continue;case Zl:if(i==el||"/"==i||"\\"==i||"?"==i||"#"==i){if(!n&&Cl(f))s=tf;else if(""==f){if(e.host="",n)return;s=ef;}else {if(u=xl(e,f))return u;if("localhost"==e.host&&(e.host=""),n)return;f="",s=ef;}continue}f+=i;break;case ef:if(kl(e)){if(s=tf,"/"!=i&&"\\"!=i)continue}else if(n||"?"!=i)if(n||"#"!=i){if(i!=el&&(s=tf,"/"!=i))continue}else e.fragment="",s=of;else e.query="",s=rf;break;case tf:if(i==el||"/"==i||"\\"==i&&kl(e)||!n&&("?"==i||"#"==i)){if(".."===(c=(c=f).toLowerCase())||"%2e."===c||".%2e"===c||"%2e%2e"===c?(Ul(e),"/"==i||"\\"==i&&kl(e)||e.path.push("")):Nl(f)?"/"==i||"\\"==i&&kl(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&Cl(f)&&(e.host&&(e.host=""),f=f.charAt(0)+":"),e.path.push(f)),f="","file"==e.scheme&&(i==el||"?"==i||"#"==i))for(;e.path.length>1&&""===e.path[0];)e.path.shift();"?"==i?(e.query="",s=rf):"#"==i&&(e.fragment="",s=of);}else f+=Pl(i,Rl);break;case nf:"?"==i?(e.query="",s=rf):"#"==i?(e.fragment="",s=of):i!=el&&(e.path[0]+=Pl(i,Al));break;case rf:n||"#"!=i?i!=el&&("'"==i&&kl(e)?e.query+="%27":e.query+="#"==i?"%23":Pl(i,Al)):(e.fragment="",s=of);break;case of:i!=el&&(e.fragment+=Pl(i,Ol));}l++;}},uf=function(e){var t,n,r=ts(this,uf,"URL"),o=arguments.length>1?arguments[1]:void 0,i=String(e),a=al(r,{type:"URL"});if(void 0!==o)if(o instanceof uf)t=ul(o);else if(n=af(t={},String(o)))throw TypeError(n);if(n=af(a,i,null,t))throw TypeError(n);var u=a.searchParams=new ol,c=il(u);c.updateSearchParams(a.query),c.updateURL=function(){a.query=String(u)||null;},K||(r.href=sf.call(r),r.origin=lf.call(r),r.protocol=ff.call(r),r.username=df.call(r),r.password=pf.call(r),r.host=hf.call(r),r.hostname=gf.call(r),r.port=vf.call(r),r.pathname=mf.call(r),r.search=yf.call(r),r.searchParams=bf.call(r),r.hash=wf.call(r));},cf=uf.prototype,sf=function(){var e=ul(this),t=e.scheme,n=e.username,r=e.password,o=e.host,i=e.port,a=e.path,u=e.query,c=e.fragment,s=t+":";return null!==o?(s+="//",jl(e)&&(s+=n+(r?":"+r:"")+"@"),s+=Sl(o),null!==i&&(s+=":"+i)):"file"==t&&(s+="//"),s+=e.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==u&&(s+="?"+u),null!==c&&(s+="#"+c),s},lf=function(){var e=ul(this),t=e.scheme,n=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(e){return "null"}return "file"!=t&&kl(e)?t+"://"+Sl(e.host)+(null!==n?":"+n:""):"null"},ff=function(){return ul(this).scheme+":"},df=function(){return ul(this).username},pf=function(){return ul(this).password},hf=function(){var e=ul(this),t=e.host,n=e.port;return null===t?"":null===n?Sl(t):Sl(t)+":"+n},gf=function(){var e=ul(this).host;return null===e?"":Sl(e)},vf=function(){var e=ul(this).port;return null===e?"":String(e)},mf=function(){var e=ul(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},yf=function(){var e=ul(this).query;return e?"?"+e:""},bf=function(){return ul(this).searchParams},wf=function(){var e=ul(this).fragment;return e?"#"+e:""},xf=function(e,t){return {get:e,set:t,configurable:!0,enumerable:!0}};if(K&&_c(cf,{href:xf(sf,(function(e){var t=ul(this),n=String(e),r=af(t,n);if(r)throw TypeError(r);il(t.searchParams).updateSearchParams(t.query);})),origin:xf(lf),protocol:xf(ff,(function(e){var t=ul(this);af(t,String(e)+":",Ml);})),username:xf(df,(function(e){var t=ul(this),n=ys(String(e));if(!Dl(t)){t.username="";for(var r=0;r<n.length;r++)t.username+=Pl(n[r],Tl);}})),password:xf(pf,(function(e){var t=ul(this),n=ys(String(e));if(!Dl(t)){t.password="";for(var r=0;r<n.length;r++)t.password+=Pl(n[r],Tl);}})),host:xf(hf,(function(e){var t=ul(this);t.cannotBeABaseURL||af(t,String(e),Ql);})),hostname:xf(gf,(function(e){var t=ul(this);t.cannotBeABaseURL||af(t,String(e),Xl);})),port:xf(vf,(function(e){var t=ul(this);Dl(t)||(""==(e=String(e))?t.port=null:af(t,e,Jl));})),pathname:xf(mf,(function(e){var t=ul(this);t.cannotBeABaseURL||(t.path=[],af(t,e+"",ef));})),search:xf(yf,(function(e){var t=ul(this);""==(e=String(e))?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",af(t,e,rf)),il(t.searchParams).updateSearchParams(t.query);})),searchParams:xf(bf),hash:xf(wf,(function(e){var t=ul(this);""!=(e=String(e))?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",af(t,e,of)):t.fragment=null;}))}),Be(cf,"toJSON",(function(){return sf.call(this)}),{enumerable:!0}),Be(cf,"toString",(function(){return sf.call(this)}),{enumerable:!0}),rl){var If=rl.createObjectURL,Ef=rl.revokeObjectURL;If&&Be(uf,"createObjectURL",(function(e){return If.apply(rl,arguments)})),Ef&&Be(uf,"revokeObjectURL",(function(e){return Ef.apply(rl,arguments)}));}qc(uf,"URL"),gt({global:!0,forced:!es,sham:!K},{URL:uf});const Sf="https://.tt.omtrdc.net".replace(/\/+$/,"");class Af extends Error{constructor(e,t){super(t),this.field=e,this.name="RequiredError";}}class Of{constructor(e={}){this.configuration=e;}get basePath(){return this.configuration.basePath||Sf}get fetchApi(){const e=this.configuration.timeout,t=this.configuration.fetchApi||window.fetch.bind(window);return function(n,r){return new Promise((o,i)=>{let a=setTimeout(()=>i(new Error("Request timed out")),e);t(n,r).then(e=>o(e),e=>i(e)).finally(()=>clearTimeout(a));})}}get middleware(){return this.configuration.middleware||[]}get queryParamsStringify(){return this.configuration.queryParamsStringify||Tf}get username(){return this.configuration.username}get password(){return this.configuration.password}get apiKey(){const e=this.configuration.apiKey;if(e)return "function"==typeof e?e:()=>e}get accessToken(){const e=this.configuration.accessToken;if(e)return "function"==typeof e?e:()=>e}get headers(){return this.configuration.headers}get credentials(){return this.configuration.credentials}get timeout(){return this.configuration.timeout||3e3}}function Rf(e,t){const n=e[t];return null!=n}function Tf(e,t=""){return Object.keys(e).map(n=>{const r=t+(t.length?`[${n}]`:n),o=e[n];if(o instanceof Array){const e=o.map(e=>encodeURIComponent(String(e))).join(`&${encodeURIComponent(r)}=`);return `${encodeURIComponent(r)}=${e}`}return o instanceof Object?Tf(o,r):`${encodeURIComponent(r)}=${encodeURIComponent(String(o))}`}).filter(e=>e.length>0).join("&")}class Pf{constructor(e,t=(e=>e)){this.raw=e,this.transformer=t;}async value(){return this.transformer(204===this.raw.status?{}:await this.raw.json())}}function _f(e){return function(e,t){if(null==e)return e;return {url:Rf(e,"url")?e.url:void 0,referringUrl:Rf(e,"referringUrl")?e.referringUrl:void 0}}(e)}function kf(e){if(void 0!==e)return null===e?null:{url:e.url,referringUrl:e.referringUrl}}function jf(e){return function(e,t){if(null==e)return e;return {pe:Rf(e,"pe")?e.pe:void 0,tnta:Rf(e,"tnta")?e.tnta:void 0}}(e)}function Df(e){return function(e,t){if(null==e)return e;return {supplementalDataId:Rf(e,"supplementalDataId")?e.supplementalDataId:void 0,logging:Rf(e,"logging")?gd(e.logging):void 0,trackingServer:Rf(e,"trackingServer")?e.trackingServer:void 0,trackingServerSecure:Rf(e,"trackingServerSecure")?e.trackingServerSecure:void 0}}(e)}function Cf(e){if(void 0!==e)return null===e?null:{supplementalDataId:e.supplementalDataId,logging:e.logging,trackingServer:e.trackingServer,trackingServerSecure:e.trackingServerSecure}}function Lf(e){return function(e,t){if(null==e)return e;return {payload:Rf(e,"payload")?jf(e.payload):void 0}}(e)}function Uf(e){return function(e,t){if(null==e)return e;return {id:Rf(e,"id")?e.id:void 0,name:Rf(e,"name")?e.name:void 0,version:Rf(e,"version")?e.version:void 0}}(e)}function Nf(e){if(void 0!==e)return null===e?null:{id:e.id,name:e.name,version:e.version}}function Mf(e){return function(e,t){if(null==e)return e;return {locationHint:Rf(e,"locationHint")?e.locationHint:void 0,blob:Rf(e,"blob")?e.blob:void 0}}(e)}function qf(e){if(void 0!==e)return null===e?null:{locationHint:e.locationHint,blob:e.blob}}var Ff,Bf,$f,Vf,Hf,Gf,zf,Kf,Qf;function Xf(e){return function(e,t){return e}(e)}function Jf(e){return function(e,t){if(null==e)return e;return {host:Rf(e,"host")?e.host:void 0,language:Rf(e,"language")?e.language:void 0,webGLRenderer:Rf(e,"webGLRenderer")?e.webGLRenderer:void 0}}(e)}function Wf(e){if(void 0!==e)return null===e?null:{host:e.host,language:e.language,webGLRenderer:e.webGLRenderer}}function Yf(e){return function(e,t){return e}(e)}function Zf(e){return function(e,t){if(null==e)return e;return {channel:Yf(e.channel),mobilePlatform:Rf(e,"mobilePlatform")?xd(e.mobilePlatform):void 0,application:Rf(e,"application")?Uf(e.application):void 0,screen:Rf(e,"screen")?Wd(e.screen):void 0,window:Rf(e,"window")?pp(e.window):void 0,browser:Rf(e,"browser")?Jf(e.browser):void 0,address:Rf(e,"address")?_f(e.address):void 0,geo:Rf(e,"geo")?pd(e.geo):void 0,timeOffsetInMinutes:Rf(e,"timeOffsetInMinutes")?e.timeOffsetInMinutes:void 0,userAgent:Rf(e,"userAgent")?e.userAgent:void 0,beacon:Rf(e,"beacon")?e.beacon:void 0}}(e)}function ed(e){if(void 0!==e)return null===e?null:{channel:e.channel,mobilePlatform:Id(e.mobilePlatform),application:Nf(e.application),screen:Yd(e.screen),window:hp(e.window),browser:Wf(e.browser),address:kf(e.address),geo:hd(e.geo),timeOffsetInMinutes:e.timeOffsetInMinutes,userAgent:e.userAgent,beacon:e.beacon}}function td(e){return function(e,t){if(null==e)return e;return {id:e.id,integrationCode:e.integrationCode,authenticatedState:Xf(e.authenticatedState)}}(e)}function nd(e){if(void 0!==e)return null===e?null:{id:e.id,integrationCode:e.integrationCode,authenticatedState:e.authenticatedState}}function rd(e){return function(e,t){return e}(e)}function od(e){return function(e,t){if(null==e)return e;return {requestId:Rf(e,"requestId")?e.requestId:void 0,impressionId:Rf(e,"impressionId")?e.impressionId:void 0,id:Rf(e,"id")?fp(e.id):void 0,environmentId:Rf(e,"environmentId")?e.environmentId:void 0,property:Rf(e,"property")?Vd(e.property):void 0,trace:Rf(e,"trace")?ap(e.trace):void 0,context:Zf(e.context),experienceCloud:Rf(e,"experienceCloud")?fd(e.experienceCloud):void 0,execute:Rf(e,"execute")?cd(e.execute):void 0,prefetch:Rf(e,"prefetch")?Md(e.prefetch):void 0,telemetry:Rf(e,"telemetry")?ep(e.telemetry):void 0,notifications:Rf(e,"notifications")?e.notifications.map(Sd):void 0,qaMode:Rf(e,"qaMode")?Gd(e.qaMode):void 0}}(e)}function id(e){if(void 0!==e)return null===e?null:{requestId:e.requestId,impressionId:e.impressionId,id:dp(e.id),environmentId:e.environmentId,property:Hd(e.property),trace:up(e.trace),context:ed(e.context),experienceCloud:dd(e.experienceCloud),execute:sd(e.execute),prefetch:qd(e.prefetch),telemetry:tp(e.telemetry),notifications:void 0===e.notifications?void 0:e.notifications.map(Ad),qaMode:zd(e.qaMode)}}function ad(e){return function(e,t){if(null==e)return e;return {status:Rf(e,"status")?e.status:void 0,requestId:Rf(e,"requestId")?e.requestId:void 0,id:Rf(e,"id")?fp(e.id):void 0,client:Rf(e,"client")?e.client:void 0,edgeHost:Rf(e,"edgeHost")?e.edgeHost:void 0,execute:Rf(e,"execute")?ld(e.execute):void 0,prefetch:Rf(e,"prefetch")?Fd(e.prefetch):void 0}}(e)}function ud(e){return function(e,t){return e}(e)}function cd(e){return function(e,t){if(null==e)return e;return {pageLoad:Rf(e,"pageLoad")?Xd(e.pageLoad):void 0,mboxes:Rf(e,"mboxes")?e.mboxes.map(vd):void 0}}(e)}function sd(e){if(void 0!==e)return null===e?null:{pageLoad:Jd(e.pageLoad),mboxes:void 0===e.mboxes?void 0:e.mboxes.map(md)}}function ld(e){return function(e,t){if(null==e)return e;return {pageLoad:Rf(e,"pageLoad")?Ud(e.pageLoad):void 0,mboxes:Rf(e,"mboxes")?e.mboxes.map(yd):void 0}}(e)}function fd(e){return function(e,t){if(null==e)return e;return {audienceManager:Rf(e,"audienceManager")?Mf(e.audienceManager):void 0,analytics:Rf(e,"analytics")?Df(e.analytics):void 0}}(e)}function dd(e){if(void 0!==e)return null===e?null:{audienceManager:qf(e.audienceManager),analytics:Cf(e.analytics)}}function pd(e){return function(e,t){if(null==e)return e;return {ipAddress:Rf(e,"ipAddress")?e.ipAddress:void 0,latitude:Rf(e,"latitude")?e.latitude:void 0,longitude:Rf(e,"longitude")?e.longitude:void 0,countryCode:Rf(e,"countryCode")?e.countryCode:void 0,stateCode:Rf(e,"stateCode")?e.stateCode:void 0,city:Rf(e,"city")?e.city:void 0,zip:Rf(e,"zip")?e.zip:void 0}}(e)}function hd(e){if(void 0!==e)return null===e?null:{ipAddress:e.ipAddress,latitude:e.latitude,longitude:e.longitude,countryCode:e.countryCode,stateCode:e.stateCode,city:e.city,zip:e.zip}}function gd(e){return function(e,t){return e}(e)}function vd(e){return function(e,t){if(null==e)return e;return {address:Rf(e,"address")?_f(e.address):void 0,parameters:Rf(e,"parameters")?e.parameters:void 0,profileParameters:Rf(e,"profileParameters")?e.profileParameters:void 0,order:Rf(e,"order")?Cd(e.order):void 0,product:Rf(e,"product")?Bd(e.product):void 0,index:Rf(e,"index")?e.index:void 0,name:Rf(e,"name")?e.name:void 0}}(e)}function md(e){if(void 0!==e)return null===e?null:{address:kf(e.address),parameters:e.parameters,profileParameters:e.profileParameters,order:Ld(e.order),product:$d(e.product),index:e.index,name:e.name}}function yd(e){return function(e,t){if(null==e)return e;return {index:Rf(e,"index")?e.index:void 0,name:Rf(e,"name")?e.name:void 0,options:Rf(e,"options")?e.options.map(jd):void 0,metrics:Rf(e,"metrics")?e.metrics.map(bd):void 0,analytics:Rf(e,"analytics")?Lf(e.analytics):void 0,trace:Rf(e,"trace")?e.trace:void 0}}(e)}function bd(e){return function(e,t){if(null==e)return e;return {type:Rf(e,"type")?wd(e.type):void 0,selector:Rf(e,"selector")?e.selector:void 0,eventToken:Rf(e,"eventToken")?e.eventToken:void 0}}(e)}function wd(e){return function(e,t){return e}(e)}function xd(e){return function(e,t){if(null==e)return e;return {deviceName:Rf(e,"deviceName")?e.deviceName:void 0,deviceType:ud(e.deviceType),platformType:Ed(e.platformType),version:Rf(e,"version")?e.version:void 0}}(e)}function Id(e){if(void 0!==e)return null===e?null:{deviceName:e.deviceName,deviceType:e.deviceType,platformType:e.platformType,version:e.version}}function Ed(e){return function(e,t){return e}(e)}function Sd(e){return function(e,t){if(null==e)return e;return {address:Rf(e,"address")?_f(e.address):void 0,parameters:Rf(e,"parameters")?e.parameters:void 0,profileParameters:Rf(e,"profileParameters")?e.profileParameters:void 0,order:Rf(e,"order")?Cd(e.order):void 0,product:Rf(e,"product")?Bd(e.product):void 0,id:Rf(e,"id")?e.id:void 0,impressionId:Rf(e,"impressionId")?e.impressionId:void 0,type:Rf(e,"type")?wd(e.type):void 0,timestamp:Rf(e,"timestamp")?e.timestamp:void 0,tokens:Rf(e,"tokens")?e.tokens:void 0,mbox:Rf(e,"mbox")?Od(e.mbox):void 0,view:Rf(e,"view")?_d(e.view):void 0,pageLoad:Rf(e,"pageLoad")?Td(e.pageLoad):void 0}}(e)}function Ad(e){if(void 0!==e)return null===e?null:{address:kf(e.address),parameters:e.parameters,profileParameters:e.profileParameters,order:Ld(e.order),product:$d(e.product),id:e.id,impressionId:e.impressionId,type:e.type,timestamp:e.timestamp,tokens:e.tokens,mbox:Rd(e.mbox),view:kd(e.view),pageLoad:Pd(e.pageLoad)}}function Od(e){return function(e,t){if(null==e)return e;return {name:Rf(e,"name")?e.name:void 0,state:Rf(e,"state")?e.state:void 0}}(e)}function Rd(e){if(void 0!==e)return null===e?null:{name:e.name,state:e.state}}function Td(e){return function(e,t){if(null==e)return e;return {state:Rf(e,"state")?e.state:void 0}}(e)}function Pd(e){if(void 0!==e)return null===e?null:{state:e.state}}function _d(e){return function(e,t){if(null==e)return e;return {name:Rf(e,"name")?e.name:void 0,key:Rf(e,"key")?e.key:void 0,state:Rf(e,"state")?e.state:void 0}}(e)}function kd(e){if(void 0!==e)return null===e?null:{name:e.name,key:e.key,state:e.state}}function jd(e){return function(e,t){if(null==e)return e;return {type:Rf(e,"type")?Dd(e.type):void 0,content:Rf(e,"content")?e.content:void 0,eventToken:Rf(e,"eventToken")?e.eventToken:void 0,responseTokens:Rf(e,"responseTokens")?e.responseTokens:void 0}}(e)}function Dd(e){return function(e,t){return e}(e)}function Cd(e){return function(e,t){if(null==e)return e;return {id:Rf(e,"id")?e.id:void 0,total:Rf(e,"total")?e.total:void 0,purchasedProductIds:Rf(e,"purchasedProductIds")?e.purchasedProductIds:void 0,time:Rf(e,"time")?(n=e.time,new Date(n)):void 0,experienceLocalId:Rf(e,"experienceLocalId")?e.experienceLocalId:void 0,duplicate:Rf(e,"duplicate")?e.duplicate:void 0,outlier:Rf(e,"outlier")?e.outlier:void 0};var n;}(e)}function Ld(e){if(void 0!==e)return null===e?null:{id:e.id,total:e.total,purchasedProductIds:e.purchasedProductIds,time:gp(e.time),experienceLocalId:e.experienceLocalId,duplicate:e.duplicate,outlier:e.outlier}}function Ud(e){return function(e,t){if(null==e)return e;return {options:Rf(e,"options")?e.options.map(jd):void 0,metrics:Rf(e,"metrics")?e.metrics.map(bd):void 0,analytics:Rf(e,"analytics")?Lf(e.analytics):void 0,state:Rf(e,"state")?e.state:void 0,trace:Rf(e,"trace")?e.trace:void 0}}(e)}function Nd(e){return function(e,t){if(null==e)return e;return {index:Rf(e,"index")?e.index:void 0,name:Rf(e,"name")?e.name:void 0,options:Rf(e,"options")?e.options.map(jd):void 0,metrics:Rf(e,"metrics")?e.metrics.map(bd):void 0,analytics:Rf(e,"analytics")?Lf(e.analytics):void 0,trace:Rf(e,"trace")?e.trace:void 0,state:Rf(e,"state")?e.state:void 0}}(e)}function Md(e){return function(e,t){if(null==e)return e;return {views:Rf(e,"views")?e.views.map(sp):void 0,pageLoad:Rf(e,"pageLoad")?Xd(e.pageLoad):void 0,mboxes:Rf(e,"mboxes")?e.mboxes.map(vd):void 0}}(e)}function qd(e){if(void 0!==e)return null===e?null:{views:void 0===e.views?void 0:e.views.map(lp),pageLoad:Jd(e.pageLoad),mboxes:void 0===e.mboxes?void 0:e.mboxes.map(md)}}function Fd(e){return function(e,t){if(null==e)return e;return {views:Rf(e,"views")?e.views.map(cp):void 0,pageLoad:Rf(e,"pageLoad")?Ud(e.pageLoad):void 0,mboxes:Rf(e,"mboxes")?e.mboxes.map(Nd):void 0,metrics:Rf(e,"metrics")?e.metrics.map(bd):void 0}}(e)}function Bd(e){return function(e,t){if(null==e)return e;return {id:Rf(e,"id")?e.id:void 0,categoryId:Rf(e,"categoryId")?e.categoryId:void 0}}(e)}function $d(e){if(void 0!==e)return null===e?null:{id:e.id,categoryId:e.categoryId}}function Vd(e){return function(e,t){if(null==e)return e;return {token:e.token}}(e)}function Hd(e){if(void 0!==e)return null===e?null:{token:e.token}}function Gd(e){return function(e,t){if(null==e)return e;return {token:Rf(e,"token")?e.token:void 0,listedActivitiesOnly:Rf(e,"listedActivitiesOnly")?e.listedActivitiesOnly:void 0,evaluateAsTrueAudienceIds:Rf(e,"evaluateAsTrueAudienceIds")?e.evaluateAsTrueAudienceIds:void 0,evaluateAsFalseAudienceIds:Rf(e,"evaluateAsFalseAudienceIds")?e.evaluateAsFalseAudienceIds:void 0,previewIndexes:Rf(e,"previewIndexes")?e.previewIndexes.map(Kd):void 0}}(e)}function zd(e){if(void 0!==e)return null===e?null:{token:e.token,listedActivitiesOnly:e.listedActivitiesOnly,evaluateAsTrueAudienceIds:e.evaluateAsTrueAudienceIds,evaluateAsFalseAudienceIds:e.evaluateAsFalseAudienceIds,previewIndexes:void 0===e.previewIndexes?void 0:e.previewIndexes.map(Qd)}}function Kd(e){return function(e,t){if(null==e)return e;return {activityIndex:Rf(e,"activityIndex")?e.activityIndex:void 0,experienceIndex:Rf(e,"experienceIndex")?e.experienceIndex:void 0}}(e)}function Qd(e){if(void 0!==e)return null===e?null:{activityIndex:e.activityIndex,experienceIndex:e.experienceIndex}}function Xd(e){return function(e,t){if(null==e)return e;return {address:Rf(e,"address")?_f(e.address):void 0,parameters:Rf(e,"parameters")?e.parameters:void 0,profileParameters:Rf(e,"profileParameters")?e.profileParameters:void 0,order:Rf(e,"order")?Cd(e.order):void 0,product:Rf(e,"product")?Bd(e.product):void 0}}(e)}function Jd(e){if(void 0!==e)return null===e?null:{address:kf(e.address),parameters:e.parameters,profileParameters:e.profileParameters,order:Ld(e.order),product:$d(e.product)}}function Wd(e){return function(e,t){if(null==e)return e;return {width:Rf(e,"width")?e.width:void 0,height:Rf(e,"height")?e.height:void 0,colorDepth:Rf(e,"colorDepth")?e.colorDepth:void 0,pixelRatio:Rf(e,"pixelRatio")?e.pixelRatio:void 0,orientation:Rf(e,"orientation")?Zd(e.orientation):void 0}}(e)}function Yd(e){if(void 0!==e)return null===e?null:{width:e.width,height:e.height,colorDepth:e.colorDepth,pixelRatio:e.pixelRatio,orientation:e.orientation}}function Zd(e){return function(e,t){return e}(e)}function ep(e){return function(e,t){if(null==e)return e;return {entries:Rf(e,"entries")?e.entries.map(np):void 0}}(e)}function tp(e){if(void 0!==e)return null===e?null:{entries:void 0===e.entries?void 0:e.entries.map(rp)}}function np(e){return function(e,t){if(null==e)return e;return {requestId:Rf(e,"requestId")?e.requestId:void 0,timestamp:Rf(e,"timestamp")?e.timestamp:void 0,execution:Rf(e,"execution")?e.execution:void 0,features:Rf(e,"features")?op(e.features):void 0}}(e)}function rp(e){if(void 0!==e)return null===e?null:{requestId:e.requestId,timestamp:e.timestamp,execution:e.execution,features:ip(e.features)}}function op(e){return function(e,t){if(null==e)return e;return {decisioningMethod:Rf(e,"decisioningMethod")?rd(e.decisioningMethod):void 0}}(e)}function ip(e){if(void 0!==e)return null===e?null:{decisioningMethod:e.decisioningMethod}}function ap(e){return function(e,t){if(null==e)return e;return {authorizationToken:e.authorizationToken,usage:Rf(e,"usage")?e.usage:void 0}}(e)}function up(e){if(void 0!==e)return null===e?null:{authorizationToken:e.authorizationToken,usage:e.usage}}function cp(e){return function(e,t){if(null==e)return e;return {name:Rf(e,"name")?e.name:void 0,key:Rf(e,"key")?e.key:void 0,options:Rf(e,"options")?e.options.map(jd):void 0,metrics:Rf(e,"metrics")?e.metrics.map(bd):void 0,analytics:Rf(e,"analytics")?Lf(e.analytics):void 0,state:Rf(e,"state")?e.state:void 0,trace:Rf(e,"trace")?e.trace:void 0}}(e)}function sp(e){return function(e,t){if(null==e)return e;return {address:Rf(e,"address")?_f(e.address):void 0,parameters:Rf(e,"parameters")?e.parameters:void 0,profileParameters:Rf(e,"profileParameters")?e.profileParameters:void 0,order:Rf(e,"order")?Cd(e.order):void 0,product:Rf(e,"product")?Bd(e.product):void 0,name:Rf(e,"name")?e.name:void 0,key:Rf(e,"key")?e.key:void 0}}(e)}function lp(e){if(void 0!==e)return null===e?null:{address:kf(e.address),parameters:e.parameters,profileParameters:e.profileParameters,order:Ld(e.order),product:$d(e.product),name:e.name,key:e.key}}function fp(e){return function(e,t){if(null==e)return e;return {tntId:Rf(e,"tntId")?e.tntId:void 0,thirdPartyId:Rf(e,"thirdPartyId")?e.thirdPartyId:void 0,marketingCloudVisitorId:Rf(e,"marketingCloudVisitorId")?e.marketingCloudVisitorId:void 0,customerIds:Rf(e,"customerIds")?e.customerIds.map(td):void 0}}(e)}function dp(e){if(void 0!==e)return null===e?null:{tntId:e.tntId,thirdPartyId:e.thirdPartyId,marketingCloudVisitorId:e.marketingCloudVisitorId,customerIds:void 0===e.customerIds?void 0:e.customerIds.map(nd)}}function pp(e){return function(e,t){if(null==e)return e;return {width:Rf(e,"width")?e.width:void 0,height:Rf(e,"height")?e.height:void 0}}(e)}function hp(e){if(void 0!==e)return null===e?null:{width:e.width,height:e.height}}function gp(e){return null!=e&&void 0!==e?e.toISOString():""}!function(e){e.Unknown="unknown",e.Authenticated="authenticated",e.LoggedOut="logged_out";}(Ff||(Ff={})),function(e){e.Mobile="mobile",e.Web="web";}(Bf||(Bf={})),function(e){e.ServerSide="server-side",e.OnDevice="on-device",e.Hybrid="hybrid";}($f||($f={})),function(e){e.Phone="phone",e.Tablet="tablet";}(Vf||(Vf={})),function(e){e.ServerSide="server_side",e.ClientSide="client_side";}(Hf||(Hf={})),function(e){e.Click="click",e.Display="display";}(Gf||(Gf={})),function(e){e.Android="android",e.Ios="ios";}(zf||(zf={})),function(e){e.Html="html",e.Json="json",e.Redirect="redirect",e.Dynamic="dynamic",e.Actions="actions";}(Kf||(Kf={})),function(e){e.Portrait="portrait",e.Landscape="landscape";}(Qf||(Qf={}));class vp extends class{constructor(e=new Of){this.configuration=e,this.fetchApi=async(e,t)=>{let n={url:e,init:t};for(const e of this.middleware)e.pre&&(n=await e.pre({fetch:this.fetchApi,...n})||n);let r=await this.configuration.fetchApi(n.url,n.init);for(const n of this.middleware)n.post&&(r=await n.post({fetch:this.fetchApi,url:e,init:t,response:r.clone()})||r);return r},this.middleware=e.middleware;}withMiddleware(...e){const t=this.clone();return t.middleware=t.middleware.concat(...e),t}withPreMiddleware(...e){const t=e.map(e=>({pre:e}));return this.withMiddleware(...t)}withPostMiddleware(...e){const t=e.map(e=>({post:e}));return this.withMiddleware(...t)}async request(e){const{url:t,init:n}=this.createFetchParams(e),r=await this.fetchApi(t,n);if(r.status>=200&&r.status<300)return r;throw r}createFetchParams(e){let t=this.configuration.basePath+e.path;void 0!==e.query&&0!==Object.keys(e.query).length&&(t+="?"+this.configuration.queryParamsStringify(e.query));const n=e.body instanceof FormData||e.body instanceof URLSearchParams||(r=e.body,"undefined"!=typeof Blob&&r instanceof Blob)?e.body:JSON.stringify(e.body);var r;const o=Object.assign({},this.configuration.headers,e.headers);return {url:t,init:{method:e.method,headers:o,body:n,credentials:this.configuration.credentials}}}clone(){const e=new(this.constructor)(this.configuration);return e.middleware=this.middleware.slice(),e}}{async executeRaw(e){if(null===e.imsOrgId||void 0===e.imsOrgId)throw new Af("imsOrgId","Required parameter requestParameters.imsOrgId was null or undefined when calling execute.");if(null===e.sessionId||void 0===e.sessionId)throw new Af("sessionId","Required parameter requestParameters.sessionId was null or undefined when calling execute.");if(null===e.deliveryRequest||void 0===e.deliveryRequest)throw new Af("deliveryRequest","Required parameter requestParameters.deliveryRequest was null or undefined when calling execute.");const t={};void 0!==e.imsOrgId&&(t.imsOrgId=e.imsOrgId),void 0!==e.sessionId&&(t.sessionId=e.sessionId),void 0!==e.version&&(t.version=e.version);const n={"Content-Type":"application/json"},r=await this.request({path:"/rest/v1/delivery",method:"POST",headers:n,query:t,body:id(e.deliveryRequest)});return new Pf(r,e=>ad(e))}async execute(e,t,n,r){const o=await this.executeRaw({imsOrgId:e,sessionId:t,deliveryRequest:n,version:r});return await o.value()}}const mp="http://",yp="https://",bp={0:Ff.Unknown,1:Ff.Authenticated,2:Ff.LoggedOut};function wp(e,t){return function(e){if(fa(e))return null;const t=e.split(".");if(2!==t.length||!t[1])return null;const n=t[1].split("_");return 2===n.length&&n[0]?n[0]:null}(e)||t}function xp(e){const t=e.getVisitorValues(),{MCMID:n}=t;return n}function Ip(e,t){const n=function(e){const t=e.getState();return t[Object.keys(t)[0]].customerIDs}(t);if(sa(n))return e;const r=Object.keys(n).reduce((e,t)=>{const r=n[t];if(r){let n;n=ia(r)?td({id:r.id||void 0,integrationCode:t||void 0,authenticatedState:bp[r.authState]||void 0}):td({id:r,integrationCode:t||void 0,authenticatedState:bp[0]}),e.push(n);}return e},[]);return r.length?r.concat(e||[]):e}function Ep(e,t){const{visitor:n,consumerId:r=nn}=t,{supplementalDataId:o}=e;return function(e,t){const n=t.getState(),r=n[Object.keys(n)[0]];return ca(r.sdid)&&r.sdid.supplementalDataIDCurrent===e}(o,n)?o:n.getSupplementalDataID(r)}function Sp(e={},t){return Df({logging:la(e.logging)?e.logging:Hf.ServerSide,supplementalDataId:Ep(e,t),trackingServer:la(e.trackingServer)?e.trackingServer:void 0,trackingServerSecure:la(e.trackingServerSecure)?e.trackingServerSecure:void 0})}function Ap(e){const t=parseInt(e,10);return isNaN(t)?void 0:t}function Op(e={},t){const{analytics:n,audienceManager:r}=e,o=function(e={},t){const{visitor:n}=t,r=n.getVisitorValues()||{},{locationHint:o=Ap(r.MCAAMLH),blob:i=r.MCAAMB}=e,a=Mf({locationHint:o,blob:i});return ca(a)?a:void 0}(r,t);return fd({analytics:Sp(n,t),audienceManager:o||void 0})}vp.prototype.decisioningMethod=Zt.SERVER_SIDE;function Rp(e,t){if(pa(e))return;const n=e.filter(e=>((e,t)=>{const n=ca(e)&&la(e.name);return n||t.error(ma.MBOX_INVALID,e),n})(e,t)).map((e,t)=>{const n=vd(e);return n.name=e.name,aa(e.index)?n.index=e.index:n.index=t,n});return da(n)?n:void 0}function Tp(e){if(pa(e))return;const t=e.map(e=>{const t=sp(e);return la(e.name)&&(t.name=e.name),la(e.key)&&(t.key=e.key),t});return da(t)?t:void 0}function Pp(e,t){if(pa(e))return;const n=e.filter(e=>((e,t)=>{const n=ca(e)&&la(e.id)&&aa(e.timestamp)&&Object.values(Gf).includes(e.type);return n||t.error(ma.NOTIFICATION_INVALID,e),n})(e,t)).map(e=>{const{id:t,type:n,timestamp:r,impressionId:o,tokens:i,mbox:a,view:u}=e,c=Sd(e);return c.id=t,c.type=n,c.timestamp=r,la(o)&&(c.impressionId=o),da(i)&&(c.tokens=i),ca(a)&&(c.mbox=a),ca(u)&&(c.view=u),c});return da(n)?n:void 0}function _p(e,t){const{logger:n,uuidMethod:r=bn}=t,o=od({requestId:r(),environmentId:t.environmentId,...e});return o.id=function(e={},t){const{deviceId:n,visitor:r}=t,{tntId:o=n,thirdPartyId:i,marketingCloudVisitorId:a=xp(r),customerIds:u}=e,c=Ip(u,r),s=fp({tntId:la(o)?o:void 0,thirdPartyId:la(i)?i:void 0,marketingCloudVisitorId:la(a)?a:void 0,customerIds:da(c)?c:void 0});return ca(s)?s:void 0}(o.id,t),o.property=function(e={}){const{token:t}=e;if(la(t))return Vd(e)}(o.property),o.trace=ap(o.trace),o.context=function(e={}){const t=Zf({timeOffsetInMinutes:-(new Date).getTimezoneOffset(),...e});return Object.keys(Bf).includes(t.channel)?e:(t.channel=Bf.Web,t)}(o.context),o.experienceCloud=Op(o.experienceCloud,t),o.execute=function(e,t){if(sa(e))return;const{pageLoad:n,mboxes:r}=e;return ia(n)||!pa(r)?new cd({pageLoad:ia(n)?Xd(n):void 0,mboxes:da(r)?Rp(r,t):void 0}):void 0}(o.execute,n),o.prefetch=function(e,t){if(sa(e))return;const{pageLoad:n,views:r,mboxes:o}=e;return !ia(n)&&pa(r)&&pa(o)?void 0:Md({pageLoad:ia(n)?Xd(n):void 0,views:da(r)?Tp(r):void 0,mboxes:da(o)?Rp(o,t):void 0})}(o.prefetch,n),o.notifications=Pp(o.notifications,n),ha(o),o}function kp(e){return {execute:(t,n,r,o)=>{const i={imsOrgId:t,sessionId:n};dn(e.version)&&(i.version=o);const a=e.queryParamsStringify(i);return function(e,t){return window.navigator.sendBeacon(e,t)}(`${e.basePath}/rest/v1/delivery?${a}`,JSON.stringify({...r,context:{...r.context,beacon:!0}}))?Promise.resolve():Promise.reject()},decisioningMethod:Zt.SERVER_SIDE}}function jp(e,t){return t&&mn()&&"navigator"in window&&"sendBeacon"in window.navigator?kp(e):new vp(e)}function Dp(e,t,n=!1,r=Zt.SERVER_SIDE,o,i,a){if(xn(r)){const u=a.hasRemoteDependency(i);return r===Zt.HYBRID&&u.remoteNeeded?jp(e,n):function(e,t,n){return {execute:(r,o,i,a)=>fn(e)?Promise.reject(new Error("Unable to fulfill request; decisioning engine not ready.")):e.getOffers({targetLocationHint:n,request:i,sessionId:o,visitor:t}),decisioningMethod:Zt.ON_DEVICE}}(a,t,o)}return jp(e,n)}function Cp(e,t){const n=Math.ceil(Date.now()/1e3),r=[],{tntId:o}=t;return r.push({name:"session",value:e,expires:n+1860}),o&&r.push({name:"PC",value:o,expires:n+63244800}),wa(r)}function Lp(e,t){const n=function(e){if(fa(e))return null;const t=e.split(".");return 4===t.length&&t[0]?t[0].replace("mboxedge",""):null}(t),r=e||n;if(!fa(r))return {name:"mboxEdgeCluster",value:r,maxAge:1860}}function Up(e){return dn(e.targetLocationHintCookie)&&(this.config.targetLocationHint=e.targetLocationHintCookie.value),e}function Np(e={}){const{analytics:t}=e;return ca(t)?[t]:void 0}function Mp(e=[]){return ga(e.map(Np))}function qp(e){const{execute:t={},prefetch:n={}}=e;if(sa(t)&&sa(n))return;const r=Np(t.pageLoad),o=Mp(t.mboxes),i=Np(n.pageLoad),a=Mp(n.views),u=Mp(n.mboxes),c=ga([r,o,i,a,u].filter(e=>!!e));return da(c)?c:void 0}function Fp(e,t,n,r){let{remoteMboxes:o=[],remoteViews:i=[]}=t;if(delete t.remoteMboxes,delete t.remoteViews,r){const t=r.hasRemoteDependency(e);o=t.remoteMboxes,i=t.remoteViews;}return {decisioningMethod:n,remoteMboxes:o,remoteViews:i}}function Bp(e={}){const{trace:t}=e;return ca(t)?[t]:void 0}function $p(e=[]){return ga(e.map(Bp))}function Vp(e){const{execute:t={},prefetch:n={}}=e;if(sa(t)&&sa(n))return;const r=Bp(t.pageLoad),o=$p(t.mboxes),i=Bp(n.pageLoad),a=$p(n.views),u=$p(n.mboxes),c=ga([r,o,i,a,u].filter(e=>!!e));return da(c)?c:void 0}function Hp(e={}){const{options:t}=e;return pa(t)?[]:t.map(e=>e.responseTokens).filter(ca)}function Gp(e=[]){return ga(e.map(Hp))}function zp(e){const{execute:t={},prefetch:n={}}=e;if(sa(t)&&sa(n))return;const r=Hp(t.pageLoad),o=Gp(t.mboxes),i=Hp(n.pageLoad),a=Gp(n.views),u=Gp(n.mboxes),c=ga([r,o,i,a,u]);return da(c)?c:void 0}function Kp(e,t){const{visitor:n,config:r,logger:o,targetCookie:i,consumerId:a,request:u,useBeacon:c,createDeliveryApiMethod:s=Dp}=e,l=function(e={},t={},n){const r=e.propertyToken,o=En(t.property),i=o||r;return dn(o)&&o!==r&&tn(n).debug(`The property token specified in the request "${o}" does not match the one specified in the config "${r}".`),i?{token:i}:void 0}(r,u,o);dn(l)&&(u.property=l);const{serverDomain:f,client:d,organizationId:p,timeout:h,secure:g,environmentId:v}=r;let{decisioningMethod:m}=r;const y=Rn(r.fetchApi),b=e.targetLocationHint||r.targetLocationHint;if(xn(m)&&!function(e){return dn(e)&&e.isReady()}(t)){if(m!==Zt.HYBRID)return Promise.reject(new Error("Unable to fulfill request; decisioning engine not ready."));m=Zt.SERVER_SIDE;}const w=ba(i),x=function(e){const t=e.PC||{},{value:n}=t;if(!fa(n))return n}(w),I=wp(x,b),E=function(e,t,n,r){const o=!1===r?mp:yp;return la(t)?`${o}mboxedge${t}.tt.omtrdc.net`:la(e)?`${o}${e}`:`${o}${n}.tt.omtrdc.net`}(f,I,d,g),S=function(e,t,n=bn){const r=e.session||{},{value:o}=r;return la(o)?o:t||n()}(w,e.sessionId),A=function(e=bn){return {"Content-Type":"application/json","X-EXC-SDK":"AdobeTargetNode","X-EXC-SDK-Version":"2.1.0","X-Request-Id":e()}}(),O=_p(u,{logger:o,visitor:n,deviceId:x,consumerId:a,environmentId:v,organizationId:p}),R=s(function(e,t,n,r){return new Of({basePath:t,fetchApi:e,headers:n,timeout:r})}(y,E,A,h),n,c,m,b,O,t);return o.debug(ma.REQUEST_SENT,R.decisioningMethod,E,JSON.stringify(O,null,2)),R.execute(p,S,O,r.version).then((e={})=>(o.debug(ma.RESPONSE_RECEIVED,JSON.stringify(e,null,2)),Object.assign({visitorState:n.getState(),request:O},function(e,t,n,r,o=Zt.SERVER_SIDE,i){const{id:a={},edgeHost:u}=r,c={targetCookie:Cp(e,a),targetLocationHintCookie:Lp(t,u),analyticsDetails:qp(r),trace:Vp(r),responseTokens:zp(r),meta:Fp(n,r,o,i),response:r};return ha(c),c}(S,I,O,e,R.decisioningMethod,t))))}return function(e){const t=On(e);if(!t)throw new Error(ma.FETCH_UNDEFINED);class n{constructor(e){if(!e||!e.internal)throw new Error(ma.PRIVATE_CONSTRUCTOR);this.config=e,this.config.timeout=e.timeout||3e3,this.logger=tn(e.logger);const n=function(e={}){const t={};let n=0;function r(e,r){return n+=1,fn(t[e])&&(t[e]={}),t[e][n]=r,`${e}:${n}`}return Object.keys(e).forEach(t=>r(t,e[t])),{subscribe:r,unsubscribe:function(e){const[n,r]=e.split(":");dn(t[n])&&delete t[n][r];},emit:function(e,n={}){Yt(t[e]||[]).forEach(t=>t.call(void 0,new Pn(e,n)));}}}(this.config.events).emit;var r,o;xn(e.decisioningMethod)?Promise.all([(r=this,o=this.config.targetLocationHint,dn(o)?Promise.resolve({targetLocationHintCookie:Lp(o)}):r.getOffers({sessionId:"ping123",decisioningMethod:Zt.SERVER_SIDE,request:cn}).catch(()=>new Error(ma.LOCATION_HINT_REQUEST_FAILED))),oa({client:e.client,organizationId:e.organizationId,pollingInterval:e.pollingInterval,maximumWaitReady:e.maximumWaitReady,artifactFormat:e.artifactFormat,artifactLocation:e.artifactLocation,artifactPayload:e.artifactPayload,propertyToken:e.propertyToken,environment:e.environment,cdnEnvironment:e.cdnEnvironment,cdnBasePath:e.cdnBasePath,telemetryEnabled:e.telemetryEnabled,logger:this.logger,fetchApi:t,eventEmitter:n,sendNotificationFunc:e=>this.sendNotifications(e)})]).then(([e,t])=>{this.decisioningEngine=t,n("clientReady");}).catch(e=>{this.logger.error(e.message);}):setTimeout(()=>n("clientReady"),100);}static create(e){const r=function(e){if(sa(e))return ma.OPTIONS_REQUIRED;const{client:t,organizationId:n,decisioningMethod:r}=e;return fa(t)?ma.CLIENT_REQUIRED:fa(n)?ma.ORG_ID_REQUIRED:dn(r)&&!Object.values(Zt).includes(r)?ma.DECISIONING_METHOD_INVALID:null}(e);if(r)throw new Error(r);return new n(Object.assign({internal:!0,decisioningMethod:Zt.SERVER_SIDE,fetchApi:t},e))}getOffers(e){const t=function(e){if(sa(e))return ma.OPTIONS_REQUIRED;const{request:t}=e;if(sa(t))return ma.REQUEST_REQUIRED;const{execute:n,prefetch:r}=t;return ca(n)&&fn(n.pageLoad)&&pa(n.mboxes)?ma.EXECUTE_FIELDS_REQUIRED:ca(r)&&fn(r.pageLoad)&&pa(r.views)&&pa(r.mboxes)?ma.PREFETCH_FIELDS_REQUIRED:null}(e);if(t)return Promise.reject(new Error(t));const n=va(e,this.config);return Kp(Object.assign({visitor:n,config:{...this.config,decisioningMethod:e.decisioningMethod||this.config.decisioningMethod},logger:this.logger},e),this.decisioningEngine).then(Up.bind(this))}getAttributes(e,t={}){return t.request=t.request||cn,this.getOffers({...t,request:vn(e,t.request,"execute")}).then(e=>Tn(e))}sendNotifications(e){const t=function(e){if(sa(e))return ma.OPTIONS_REQUIRED;const{request:t}=e;if(sa(t))return ma.REQUEST_REQUIRED;const{notifications:n,telemetry:r}=t;return pa(n)&&fn(r)?ma.NOTIFICATIONS_REQUIRED:null}(e);if(t)return Promise.reject(new Error(t));return Kp({visitor:va(e,this.config),config:{...this.config,decisioningMethod:Zt.SERVER_SIDE},logger:this.logger,useBeacon:!0,...e}).then(Up.bind(this))}static getVisitorCookieName(e){return "AMCV_"+e}static get TargetCookieName(){return "mbox"}static get TargetLocationHintCookieName(){return "mboxEdgeCluster"}static get AuthState(){return $n.AuthState}}return n}(dn(window.fetch)?window.fetch.bind(window):E)}));

});

var TargetClient = unwrapExports(targetclient_browser);

var RULES = {
  "version": "1.0.0",
  "meta": {
    "clientCode": "targettesting",
    "environment": "production"
  },
  "globalMbox": "target-global-mbox",
  "geoTargetingEnabled": true,
  "responseTokens": ["activity.id", "activity.name", "experience.id", "experience.name", "geo.city", "geo.country", "geo.state", "offer.id", "offer.name", "option.id", "option.name"],
  "remoteMboxes": [],
  "remoteViews": [],
  "localMboxes": ["100k", "1MB", "1MB2", "1MB3", "250k", "500k", "allmatches", "browserTest", "mbox-browsers", "mbox-dateranges", "mbox-feature-flags", "mbox-geography", "mbox-macros", "mbox-magician", "mbox-params", "mbox-prioritized", "mbox-salutations", "mbox-urlcontains", "perf-mbox", "super-duper", "testoffer"],
  "rules": {
    "mboxes": {
      "mbox-macros": [{
        "ruleKey": "125891",
        "activityId": 125891,
        "meta": {
          "activity.id": 125891,
          "activity.name": "[unit-test] mbox-macros",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-macros",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246892,
          "offer.name": "/_unit-test_mbox-macros/experiences/0/pages/0/zones/0/1612393051539",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-macros",
          "options": [{
            "type": "html",
            "eventToken": "DpFV0O7sTrjpJSbqoBduF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<ul>\n  <li>${offer.id}</li>\n  <li>${offer.name}</li>\n  <li>${campaign.id}</li>\n  <li>${campaign.name}</li>\n  <li>${campaign.recipe.id}</li>\n  <li>${campaign.recipe.name}</li>\n  <li>${activity.id}</li>\n  <li>${activity.name}</li>\n  <li>${activity.experience.id}</li>\n  <li>${activity.experience.name}</li>\n  <li>${mbox.name}</li>\n  <li>${mbox.user}</li>\n  <li>${mbox.pgname}</li>\n  <li>${mbox.browserWidth}</li>\n</ul>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125891",
        "activityId": 125891,
        "meta": {
          "activity.id": 125891,
          "activity.name": "[unit-test] mbox-macros",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-macros",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246893,
          "offer.name": "/_unit-test_mbox-macros/experiences/1/pages/0/zones/0/1612393051556",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-macros",
          "options": [{
            "type": "html",
            "eventToken": "DpFV0O7sTrjpJSbqoBduF5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<ol>\n  <li>${offer.id}</li>\n  <li>${offer.name}</li>\n  <li>${campaign.id}</li>\n  <li>${campaign.name}</li>\n  <li>${campaign.recipe.id}</li>\n  <li>${campaign.recipe.name}</li>\n  <li>${activity.id}</li>\n  <li>${activity.name}</li>\n  <li>${activity.experience.id}</li>\n  <li>${activity.experience.name}</li>\n  <li>${mbox.name}</li>\n  <li>${mbox.user}</li>\n  <li>${mbox.pgname}</li>\n  <li>${mbox.browserWidth}</li>\n</ol>"
          }],
          "metrics": []
        }
      }],
      "mbox-salutations": [{
        "ruleKey": "125872",
        "activityId": 125872,
        "meta": {
          "activity.id": 125872,
          "activity.name": "[unit-test] mbox-salutations",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-salutations",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246847,
          "offer.name": "/_unit-test_mbox-salutations/experiences/0/pages/0/zones/0/1612386185278",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-salutations",
          "options": [{
            "type": "html",
            "eventToken": "avr5zuTFMrtFi7QuWrscBmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>hello</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125872",
        "activityId": 125872,
        "meta": {
          "activity.id": 125872,
          "activity.name": "[unit-test] mbox-salutations",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-salutations",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246848,
          "offer.name": "/_unit-test_mbox-salutations/experiences/1/pages/0/zones/0/1612386185295",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-salutations",
          "options": [{
            "type": "html",
            "eventToken": "avr5zuTFMrtFi7QuWrscBpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>goodbye</div>"
          }],
          "metrics": []
        }
      }],
      "super-duper": [{
        "ruleKey": "121723",
        "activityId": 121723,
        "meta": {
          "activity.id": 121723,
          "activity.name": "demo mbox: super-duper",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "super-duper",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 238129,
          "offer.name": "/demo_mbox_super-duper/experiences/0/pages/0/zones/0/1601501517686",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "super-duper",
          "options": [{
            "type": "json",
            "eventToken": "yFKTpUjZ7nV5sesQouP+s2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "experience": "A"
            }
          }],
          "metrics": []
        },
        "propertyTokens": ["16ffac77-1de4-ffe1-54de-aedbb34dcf7b"]
      }, {
        "ruleKey": "121723",
        "activityId": 121723,
        "meta": {
          "activity.id": 121723,
          "activity.name": "demo mbox: super-duper",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "super-duper",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 238130,
          "offer.name": "/demo_mbox_super-duper/experiences/1/pages/0/zones/0/1601501517699",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "super-duper",
          "options": [{
            "type": "json",
            "eventToken": "yFKTpUjZ7nV5sesQouP+s5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "experience": "B"
            }
          }],
          "metrics": []
        },
        "propertyTokens": ["16ffac77-1de4-ffe1-54de-aedbb34dcf7b"]
      }],
      "mbox-magician": [{
        "ruleKey": "125873",
        "activityId": 125873,
        "meta": {
          "activity.id": 125873,
          "activity.name": "[unit-test] mbox-magician",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-magician",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246850,
          "offer.name": "/_unit-test_mbox-magician/experiences/0/pages/0/zones/0/1612386382173",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-magician",
          "options": [{
            "type": "json",
            "eventToken": "eHKYleVZBTi/nM3Fv/fx1WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "doMagic": true,
              "importantValue": 150
            }
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125873",
        "activityId": 125873,
        "meta": {
          "activity.id": 125873,
          "activity.name": "[unit-test] mbox-magician",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-magician",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246849,
          "offer.name": "/_unit-test_mbox-magician/experiences/1/pages/0/zones/0/1612386382166",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-magician",
          "options": [{
            "type": "json",
            "eventToken": "eHKYleVZBTi/nM3Fv/fx1ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "doMagic": false,
              "importantValue": 75
            }
          }],
          "metrics": []
        }
      }],
      "mbox-geography": [{
        "ruleKey": "125889",
        "activityId": 125889,
        "meta": {
          "activity.id": 125889,
          "activity.name": "[unit-test] mbox-geography",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-geography",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821883],
          "offer.id": 246889,
          "offer.name": "/_unit-test_mbox-geography/experiences/0/pages/0/zones/0/1612391678374",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "and": [{
              "<=": [0.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [50.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "and": [{
              "or": [{
                "==": ["UNITED STATES", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["US", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["CANADA", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["CA", {
                  "var": "geo.country"
                }]
              }]
            }, {
              "or": [{
                "==": ["CALIFORNIA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["CA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["BRITISH COLUMBIA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["BC", {
                  "var": "geo.region"
                }]
              }]
            }, {
              "or": [{
                "==": ["SAN FRANCISCO", {
                  "var": "geo.city"
                }]
              }, {
                "==": ["SANFRANCISCO", {
                  "var": "geo.city"
                }]
              }, {
                "==": ["VANCOUVER", {
                  "var": "geo.city"
                }]
              }]
            }, {
              "<": ["37.70", {
                "var": "geo.latitude"
              }]
            }, {
              ">=": ["37.80", {
                "var": "geo.latitude"
              }]
            }, {
              "<=": ["-122.5", {
                "var": "geo.longitude"
              }]
            }, {
              ">": ["-122.3", {
                "var": "geo.longitude"
              }]
            }, {
              "!": {
                "or": [{
                  "==": ["SOUTH SAN FRANCISCO", {
                    "var": "geo.city"
                  }]
                }, {
                  "==": ["SOUTHSANFRANCISCO", {
                    "var": "geo.city"
                  }]
                }]
              }
            }]
          }]
        },
        "consequence": {
          "name": "mbox-geography",
          "options": [{
            "type": "json",
            "eventToken": "coIgApD3Y5vSUJeOkfTmHWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "geo": true,
              "exp": "geo.a"
            }
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125889",
        "activityId": 125889,
        "meta": {
          "activity.id": 125889,
          "activity.name": "[unit-test] mbox-geography",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-geography",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821883],
          "offer.id": 246888,
          "offer.name": "/_unit-test_mbox-geography/experiences/1/pages/0/zones/0/1612391678370",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "and": [{
              "<": [50.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [100.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "and": [{
              "or": [{
                "==": ["UNITED STATES", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["US", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["CANADA", {
                  "var": "geo.country"
                }]
              }, {
                "==": ["CA", {
                  "var": "geo.country"
                }]
              }]
            }, {
              "or": [{
                "==": ["CALIFORNIA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["CA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["BRITISH COLUMBIA", {
                  "var": "geo.region"
                }]
              }, {
                "==": ["BC", {
                  "var": "geo.region"
                }]
              }]
            }, {
              "or": [{
                "==": ["SAN FRANCISCO", {
                  "var": "geo.city"
                }]
              }, {
                "==": ["SANFRANCISCO", {
                  "var": "geo.city"
                }]
              }, {
                "==": ["VANCOUVER", {
                  "var": "geo.city"
                }]
              }]
            }, {
              "<": ["37.70", {
                "var": "geo.latitude"
              }]
            }, {
              ">=": ["37.80", {
                "var": "geo.latitude"
              }]
            }, {
              "<=": ["-122.5", {
                "var": "geo.longitude"
              }]
            }, {
              ">": ["-122.3", {
                "var": "geo.longitude"
              }]
            }, {
              "!": {
                "or": [{
                  "==": ["SOUTH SAN FRANCISCO", {
                    "var": "geo.city"
                  }]
                }, {
                  "==": ["SOUTHSANFRANCISCO", {
                    "var": "geo.city"
                  }]
                }]
              }
            }]
          }]
        },
        "consequence": {
          "name": "mbox-geography",
          "options": [{
            "type": "json",
            "eventToken": "coIgApD3Y5vSUJeOkfTmHZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "geo": true,
              "exp": "geo.b"
            }
          }],
          "metrics": []
        }
      }],
      "perf-mbox": [{
        "ruleKey": "120100",
        "activityId": 120100,
        "meta": {
          "activity.id": 120100,
          "activity.name": "perf-mbox ab",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "perf-mbox",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 234084,
          "offer.name": "/perf-mbox_ab/experiences/0/pages/0/zones/0/1597348174705",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "perf-mbox",
          "options": [{
            "type": "json",
            "eventToken": "l6xWntUYACBBIBr390eIY2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "experience": "A",
              "name": "perf-mbox"
            }
          }],
          "metrics": []
        },
        "propertyTokens": ["be92ac4c-e72f-9f82-2a80-2c211ea86578", "693de2cd-ac92-d2c7-59fc-a3c0f2bce646"]
      }, {
        "ruleKey": "120100",
        "activityId": 120100,
        "meta": {
          "activity.id": 120100,
          "activity.name": "perf-mbox ab",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "perf-mbox",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 234085,
          "offer.name": "/perf-mbox_ab/experiences/1/pages/0/zones/0/1597348174719",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "perf-mbox",
          "options": [{
            "type": "json",
            "eventToken": "l6xWntUYACBBIBr390eIY5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "experience": "B",
              "name": "perf-mbox"
            }
          }],
          "metrics": []
        },
        "propertyTokens": ["be92ac4c-e72f-9f82-2a80-2c211ea86578", "693de2cd-ac92-d2c7-59fc-a3c0f2bce646"]
      }],
      "mbox-params": [{
        "ruleKey": "125874",
        "activityId": 125874,
        "meta": {
          "activity.id": 125874,
          "activity.name": "[unit-test] mbox-params",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-params",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821805],
          "offer.id": 246852,
          "offer.name": "/_unit-test_mbox-params/experiences/0/pages/0/zones/0/1612386851217",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "and": [{
              "<=": [0.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [50.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "==": ["bar", {
              "var": "mbox.foo"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-params",
          "options": [{
            "type": "json",
            "eventToken": "gsDuhGuCbuMhKLusIlPUI2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "foo": "bar",
              "isFooBar": true,
              "experience": "A"
            }
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125874",
        "activityId": 125874,
        "meta": {
          "activity.id": 125874,
          "activity.name": "[unit-test] mbox-params",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-params",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821805],
          "offer.id": 246851,
          "offer.name": "/_unit-test_mbox-params/experiences/1/pages/0/zones/0/1612386851213",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "and": [{
              "<": [50.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [100.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "==": ["bar", {
              "var": "mbox.foo"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-params",
          "options": [{
            "type": "json",
            "eventToken": "gsDuhGuCbuMhKLusIlPUI5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "foo": "bar",
              "isFooBar": true,
              "experience": "B"
            }
          }],
          "metrics": []
        }
      }],
      "mbox-feature-flags": [{
        "ruleKey": "125885",
        "activityId": 125885,
        "meta": {
          "activity.id": 125885,
          "activity.name": "[unit-test] mbox-feature-flags",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-feature-flags",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246878,
          "offer.name": "/_unit-test_mbox-feature-flags/experiences/0/pages/0/zones/0/1612389952922",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-feature-flags",
          "options": [{
            "type": "json",
            "eventToken": "Gr3lfpVVQA7MB0ma+rFZwGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "paymentExperience": "legacy",
              "showFeatureX": false,
              "paymentGatewayVersion": 2.3,
              "customerFeedbackValue": 10
            }
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125885",
        "activityId": 125885,
        "meta": {
          "activity.id": 125885,
          "activity.name": "[unit-test] mbox-feature-flags",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-feature-flags",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246879,
          "offer.name": "/_unit-test_mbox-feature-flags/experiences/1/pages/0/zones/0/1612389952933",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-feature-flags",
          "options": [{
            "type": "json",
            "eventToken": "Gr3lfpVVQA7MB0ma+rFZwJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "paymentExperience": "alpha10",
              "showFeatureX": true,
              "paymentGatewayVersion": 3.1,
              "customerFeedbackValue": 99
            }
          }],
          "metrics": []
        }
      }],
      "mbox-urlcontains": [{
        "ruleKey": "125867",
        "activityId": 125867,
        "meta": {
          "activity.id": 125867,
          "activity.name": "[unit-test] mbox-urlcontains",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-urlcontains",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821691],
          "offer.id": 246839,
          "offer.name": "/mbox-urlcontains/experiences/0/pages/0/zones/0/1612377739875",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "and": [{
              "<=": [0.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [50.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "in": ["bar", {
              "var": "page.url_lc"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-urlcontains",
          "options": [{
            "type": "json",
            "eventToken": "Fz8yENHFv2OZFezX3Cj7fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "baz": 1
            }
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125867",
        "activityId": 125867,
        "meta": {
          "activity.id": 125867,
          "activity.name": "[unit-test] mbox-urlcontains",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-urlcontains",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821691],
          "offer.id": 246838,
          "offer.name": "/mbox-urlcontains/experiences/1/pages/0/zones/0/1612377739867",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "and": [{
              "<": [50.0, {
                "var": "allocation"
              }]
            }, {
              ">=": [100.0, {
                "var": "allocation"
              }]
            }]
          }, {
            "in": ["bar", {
              "var": "page.url_lc"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-urlcontains",
          "options": [{
            "type": "json",
            "eventToken": "Fz8yENHFv2OZFezX3Cj7fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": {
              "baz": 2
            }
          }],
          "metrics": []
        }
      }],
      "mbox-prioritized": [{
        "ruleKey": "125877",
        "activityId": 125877,
        "meta": {
          "activity.id": 125877,
          "activity.name": "[unit-test] mbox-prioritized high with targeting",
          "activity.type": "landing",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750975],
          "offer.id": 246857,
          "offer.name": "/_unit-test_mbox-prioritizedhighwithtargeting/experiences/0/pages/0/zones/0/1612387453374",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "firefox"]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "/pLXAvfJbFlti2W9k7cANWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized high with targeting: Firefox</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125877",
        "activityId": 125877,
        "meta": {
          "activity.id": 125877,
          "activity.name": "[unit-test] mbox-prioritized high with targeting",
          "activity.type": "landing",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750991],
          "offer.id": 246858,
          "offer.name": "/_unit-test_mbox-prioritizedhighwithtargeting/experiences/1/pages/0/zones/0/1612387453380",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "safari"]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "/pLXAvfJbFlti2W9k7cANZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized high with targeting: Safari</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125876",
        "activityId": 125876,
        "meta": {
          "activity.id": 125876,
          "activity.name": "[unit-test] mbox-prioritized high",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246855,
          "offer.name": "/_unit-test_mbox-prioritizedhigh/experiences/0/pages/0/zones/0/1612387280489",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "K48CgydFcAttgrFpQ6oMaGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized high A</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125876",
        "activityId": 125876,
        "meta": {
          "activity.id": 125876,
          "activity.name": "[unit-test] mbox-prioritized high",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246856,
          "offer.name": "/_unit-test_mbox-prioritizedhigh/experiences/1/pages/0/zones/0/1612387280498",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "K48CgydFcAttgrFpQ6oMaJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized high B</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125875",
        "activityId": 125875,
        "meta": {
          "activity.id": 125875,
          "activity.name": "[unit-test] mbox-prioritized low",
          "activity.type": "ab",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246853,
          "offer.name": "/_unit-test_mbox-prioritizedlow/experiences/0/pages/0/zones/0/1612387116413",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "<=": [0.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [50.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "5rESxhp5Gu3znJEt9Zbx7WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized low A</div>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125875",
        "activityId": 125875,
        "meta": {
          "activity.id": 125875,
          "activity.name": "[unit-test] mbox-prioritized low",
          "activity.type": "ab",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "mbox-prioritized",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246854,
          "offer.name": "/_unit-test_mbox-prioritizedlow/experiences/1/pages/0/zones/0/1612387116418",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "and": [{
            "<": [50.0, {
              "var": "allocation"
            }]
          }, {
            ">=": [100.0, {
              "var": "allocation"
            }]
          }]
        },
        "consequence": {
          "name": "mbox-prioritized",
          "options": [{
            "type": "html",
            "eventToken": "5rESxhp5Gu3znJEt9Zbx7ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<div>prioritized low B</div>"
          }],
          "metrics": []
        }
      }],
      "mbox-browsers": [{
        "ruleKey": "125871",
        "activityId": 125871,
        "meta": {
          "activity.id": 125871,
          "activity.name": "[unit-test] mbox-browsers",
          "activity.type": "landing",
          "experience.id": 0,
          "experience.name": "Experience B",
          "location.name": "mbox-browsers",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750975],
          "offer.id": 246842,
          "offer.name": "/_unit-test_mbox-browsers/experiences/0/pages/0/zones/0/1612382815070",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "firefox"]
        },
        "consequence": {
          "name": "mbox-browsers",
          "options": [{
            "type": "html",
            "eventToken": "hnriCPC1+WKdphJNCmqRW2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>it's firefox</h1>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125871",
        "activityId": 125871,
        "meta": {
          "activity.id": 125871,
          "activity.name": "[unit-test] mbox-browsers",
          "activity.type": "landing",
          "experience.id": 1,
          "experience.name": "Experience C",
          "location.name": "mbox-browsers",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750991],
          "offer.id": 246843,
          "offer.name": "/_unit-test_mbox-browsers/experiences/1/pages/0/zones/0/1612382815073",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "safari"]
        },
        "consequence": {
          "name": "mbox-browsers",
          "options": [{
            "type": "html",
            "eventToken": "hnriCPC1+WKdphJNCmqRW5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>it's safari</h1>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125871",
        "activityId": 125871,
        "meta": {
          "activity.id": 125871,
          "activity.name": "[unit-test] mbox-browsers",
          "activity.type": "landing",
          "experience.id": 2,
          "experience.name": "Experience D",
          "location.name": "mbox-browsers",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750953],
          "offer.id": 246841,
          "offer.name": "/_unit-test_mbox-browsers/experiences/2/pages/0/zones/0/1612382815066",
          "option.id": 4,
          "option.name": "Offer4"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "chrome"]
        },
        "consequence": {
          "name": "mbox-browsers",
          "options": [{
            "type": "html",
            "eventToken": "hnriCPC1+WKdphJNCmqRWwreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>it's chrome</h1>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125871",
        "activityId": 125871,
        "meta": {
          "activity.id": 125871,
          "activity.name": "[unit-test] mbox-browsers",
          "activity.type": "landing",
          "experience.id": 3,
          "experience.name": "Experience E",
          "location.name": "mbox-browsers",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1751423],
          "offer.id": 246844,
          "offer.name": "/_unit-test_mbox-browsers/experiences/3/pages/0/zones/0/1612382815076",
          "option.id": 5,
          "option.name": "Offer5"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "ie"]
        },
        "consequence": {
          "name": "mbox-browsers",
          "options": [{
            "type": "html",
            "eventToken": "hnriCPC1+WKdphJNCmqRW5ZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>it's internet explorer</h1>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125871",
        "activityId": 125871,
        "meta": {
          "activity.id": 125871,
          "activity.name": "[unit-test] mbox-browsers",
          "activity.type": "landing",
          "experience.id": 4,
          "experience.name": "Experience A",
          "location.name": "mbox-browsers",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246845,
          "offer.name": "/_unit-test_mbox-browsers/experiences/4/pages/0/zones/0/1612382815080",
          "option.id": 6,
          "option.name": "Offer6"
        },
        "condition": true,
        "consequence": {
          "name": "mbox-browsers",
          "options": [{
            "type": "html",
            "eventToken": "hnriCPC1+WKdphJNCmqRWxB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>not firefox, safari, chrome or ie</h1>"
          }],
          "metrics": []
        }
      }],
      "browserTest": [{
        "ruleKey": "121937",
        "activityId": 121937,
        "meta": {
          "activity.id": 121937,
          "activity.name": "browserTest",
          "activity.type": "landing",
          "experience.id": 0,
          "experience.name": "Experience A",
          "location.name": "browserTest",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750991],
          "offer.id": 238632,
          "offer.name": "/browsertest/experiences/0/pages/0/zones/0/1602097568991",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "safari"]
        },
        "consequence": {
          "name": "browserTest",
          "options": [{
            "type": "html",
            "eventToken": "n7Lut9NCnBqP8EY6pwDiu2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>Safari</h1>"
          }],
          "metrics": []
        },
        "propertyTokens": ["8f338442-d308-3456-4298-e454aa6341bf"]
      }, {
        "ruleKey": "121937",
        "activityId": 121937,
        "meta": {
          "activity.id": 121937,
          "activity.name": "browserTest",
          "activity.type": "landing",
          "experience.id": 1,
          "experience.name": "Experience B",
          "location.name": "browserTest",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750975],
          "offer.id": 238633,
          "offer.name": "/browsertest/experiences/1/pages/0/zones/0/1602097568996",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "firefox"]
        },
        "consequence": {
          "name": "browserTest",
          "options": [{
            "type": "html",
            "eventToken": "n7Lut9NCnBqP8EY6pwDiu5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>Firefox</h1>"
          }],
          "metrics": []
        },
        "propertyTokens": ["8f338442-d308-3456-4298-e454aa6341bf"]
      }, {
        "ruleKey": "121937",
        "activityId": 121937,
        "meta": {
          "activity.id": 121937,
          "activity.name": "browserTest",
          "activity.type": "landing",
          "experience.id": 2,
          "experience.name": "Experience C",
          "location.name": "browserTest",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1750953],
          "offer.id": 238634,
          "offer.name": "/browsertest/experiences/2/pages/0/zones/0/1602097569001",
          "option.id": 4,
          "option.name": "Offer4"
        },
        "condition": {
          "==": [{
            "var": "user.browserType"
          }, "chrome"]
        },
        "consequence": {
          "name": "browserTest",
          "options": [{
            "type": "html",
            "eventToken": "n7Lut9NCnBqP8EY6pwDiuwreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<h1>Chrome</h1>"
          }],
          "metrics": []
        },
        "propertyTokens": ["8f338442-d308-3456-4298-e454aa6341bf"]
      }],
      "mbox-dateranges": [{
        "ruleKey": "125879",
        "activityId": 125879,
        "meta": {
          "activity.id": 125879,
          "activity.name": "[unit-test] mbox-dateranges",
          "activity.type": "landing",
          "experience.id": 0,
          "experience.name": "Experience C",
          "location.name": "mbox-dateranges",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821826],
          "offer.id": 246860,
          "offer.name": "/_unit-test_mbox-dateranges/experiences/0/pages/0/zones/0/1612388787483",
          "option.id": 2,
          "option.name": "Offer2"
        },
        "condition": {
          "and": [{
            "or": [{
              "==": [{
                "var": "current_day"
              }, "5"]
            }]
          }, {
            "<=": ["0000", {
              "var": "current_time"
            }, "2359"]
          }]
        },
        "consequence": {
          "name": "mbox-dateranges",
          "options": [{
            "type": "html",
            "eventToken": "gUwIlRvXckxF9guX7PpLqGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<strong>it's friday</strong>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125879",
        "activityId": 125879,
        "meta": {
          "activity.id": 125879,
          "activity.name": "[unit-test] mbox-dateranges",
          "activity.type": "landing",
          "experience.id": 1,
          "experience.name": "Experience D",
          "location.name": "mbox-dateranges",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821824],
          "offer.id": 246861,
          "offer.name": "/_unit-test_mbox-dateranges/experiences/1/pages/0/zones/0/1612388787487",
          "option.id": 3,
          "option.name": "Offer3"
        },
        "condition": {
          "<=": [1613034000000, {
            "var": "current_timestamp"
          }, 1613239200000]
        },
        "consequence": {
          "name": "mbox-dateranges",
          "options": [{
            "type": "html",
            "eventToken": "gUwIlRvXckxF9guX7PpLqJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<strong>date range 1 (feb 11-13)</strong>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125879",
        "activityId": 125879,
        "meta": {
          "activity.id": 125879,
          "activity.name": "[unit-test] mbox-dateranges",
          "activity.type": "landing",
          "experience.id": 2,
          "experience.name": "Experience B",
          "location.name": "mbox-dateranges",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [1821825],
          "offer.id": 246862,
          "offer.name": "/_unit-test_mbox-dateranges/experiences/2/pages/0/zones/0/1612388787492",
          "option.id": 4,
          "option.name": "Offer4"
        },
        "condition": {
          "<=": [1613389200000, {
            "var": "current_timestamp"
          }, 1613734800000]
        },
        "consequence": {
          "name": "mbox-dateranges",
          "options": [{
            "type": "html",
            "eventToken": "gUwIlRvXckxF9guX7PpLqAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<strong>date range 2 (feb 15 - 19, 2021)</strong>"
          }],
          "metrics": []
        }
      }, {
        "ruleKey": "125879",
        "activityId": 125879,
        "meta": {
          "activity.id": 125879,
          "activity.name": "[unit-test] mbox-dateranges",
          "activity.type": "landing",
          "experience.id": 3,
          "experience.name": "Experience A",
          "location.name": "mbox-dateranges",
          "location.type": "mbox",
          "location.id": 0,
          "audience.ids": [],
          "offer.id": 246863,
          "offer.name": "/_unit-test_mbox-dateranges/experiences/3/pages/0/zones/0/1612388842573",
          "option.id": 5,
          "option.name": "Offer5"
        },
        "condition": true,
        "consequence": {
          "name": "mbox-dateranges",
          "options": [{
            "type": "html",
            "eventToken": "gUwIlRvXckxF9guX7PpLqJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "content": "<strong>default result</strong>"
          }],
          "metrics": []
        }
      }]
    }
  }
};

const STATUS = 200;
const HEADERS = {
  "Content-Type": ["application/json"]
};

const createTargetClient = () => {
  return new Promise(resolve => {
    const result = TargetClient.create({
      client: "targettesting",
      organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
      decisioningMethod: "on-device",
      artifactPayload: RULES,
      pollingInterval: 0,
      // "0" prevents polling, if artifactPayload is provided
      targetLocationHint: "34",
      // prevent cluster discovery
      logger: logger,
      fetchApi: httpRequest,
      events: {
        clientReady: () => resolve(result)
      }
    });
  });
};

async function responseProvider(request) {
  const deliveryRequest = {
    execute: {
      mboxes: [{
        index: 0,
        name: "mbox-params",
        parameters: {
          foo: "bar"
        }
      }]
    }
  };
  logger.log("Received request", JSON.stringify(request));
  const client = await createTargetClient();
  const {
    response
  } = await client.getOffers({
    request: deliveryRequest
  });
  logger.log("Sending response", JSON.stringify(response));
  return createResponse(STATUS, HEADERS, JSON.stringify(response));
}

export { responseProvider };
