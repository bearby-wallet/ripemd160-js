"use strict";function t(t,e,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)}function e(t,e,r,n,i){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?i.call(t,r):i?i.value=r:e.set(t,r),r}function r(t,e,r){const n=r-e;if(n%4!=0)throw new RangeError("the remainder of the division of len should be zero.");const i=new Array(n/4);for(let r=0,n=e;r<i.length;r++,n+=4){const e=t[n+3]<<24|t[n+2]<<16|t[n+1]<<8|t[n];i[r]=e>>>0}return i}function n(t,e){return t+e>>>0}function i(t,e){return t<<e|t>>>32-e}function s(t,e,r,n){return t+e+r+n>>>0}function o(t,e,r){return t+e+r>>>0}function h(t){const e=new Array(4*t.length);for(let r=0,n=0;r<t.length;r++,n+=4){const i=t[r];e[n+3]=i>>>24,e[n+2]=i>>>16&255,e[n+1]=i>>>8&255,e[n]=255&i}return e}function f(t){if(Array.isArray(t))return Array.from(t).slice();if(!t)return[];const e=[];for(let r=0;r<t.length;r++)e[r]=0|t[r];return e}var a,c,l,u,w,p,d,g,m,y,v;Object.defineProperty(exports,"__esModule",{value:!0});const b=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],k=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],x=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],A=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];function M(t){return t<=15?1352829926:t<=31?1548603684:t<=47?1836072691:t<=63?2053994217:0}function W(t){return t<=15?0:t<=31?1518500249:t<=47?1859775393:t<=63?2400959708:2840853838}function E(t,e,r,n){return t<=15?e^r^n:t<=31?e&r|~e&n:t<=47?(e|~r)^n:t<=63?e&n|r&~n:e^(r|~n)}c=new WeakMap,l=new WeakMap,u=new WeakMap,w=new WeakMap,p=new WeakMap,d=new WeakMap,g=new WeakMap,a=new WeakSet,m=function(e,r){let h=t(this,g,"f")[0],f=t(this,g,"f")[1],a=t(this,g,"f")[2],c=t(this,g,"f")[3],l=t(this,g,"f")[4],u=h,w=f,p=a,d=c,m=l;for(let t=0;t<80;t++){var y=n(i(s(h,E(t,f,a,c),e[b[t]+r],W(t)),x[t]),l);h=l,l=c,c=i(a,10),a=f,f=y,y=n(i(s(u,E(79-t,w,p,d),e[k[t]+r],M(t)),A[t]),m),u=m,m=d,d=i(p,10),p=w,w=y}y=o(t(this,g,"f")[1],a,d),t(this,g,"f")[1]=o(t(this,g,"f")[2],c,m),t(this,g,"f")[2]=o(t(this,g,"f")[3],l,u),t(this,g,"f")[3]=o(t(this,g,"f")[4],h,w),t(this,g,"f")[4]=o(t(this,g,"f")[0],f,p),t(this,g,"f")[0]=y},y=function(){return h(t(this,g,"f"))},v=function(){let e=t(this,w,"f");const r=t(this,p,"f"),n=r-(e+t(this,u,"f"))%r;let i=new Array(n+t(this,u,"f"));i[0]=128;for(var s=1;s<n;s++)i[s]=0;e<<=3,i[s++]=255&e,i[s++]=e>>>8&255,i[s++]=e>>>16&255,i[s++]=e>>>24&255,i[s++]=0,i[s++]=0,i[s++]=0,i[s++]=0;for(let e=8;e<t(this,u,"f");e++)i[s++]=0;return i},exports.Ripemd160=class{constructor(){a.add(this),c.set(this,void 0),l.set(this,512),u.set(this,8),w.set(this,0),p.set(this,t(this,l,"f")/8),d.set(this,t(this,l,"f")/32),g.set(this,[1732584193,4023233417,2562383102,271733878,3285377520])}get blockSize(){return t(this,l,"f")}digest(){if(this.update(t(this,a,"m",v).call(this)),null===t(this,c,"f"))throw new Error("pending cannot be null");return t(this,a,"m",y).call(this)}update(n){if(n=f(n),t(this,c,"f")?e(this,c,t(this,c,"f").concat(n),"f"):e(this,c,n,"f"),e(this,w,t(this,w,"f")+n.length,"f"),t(this,c,"f").length>=t(this,p,"f")){const i=(n=t(this,c,"f")).length%t(this,p,"f");e(this,c,n.slice(n.length-i,n.length),"f"),0===t(this,c,"f").length&&e(this,c,void 0,"f"),n=r(n,0,n.length-i);for(let e=0;e<n.length;e+=t(this,d,"f"))t(this,a,"m",m).call(this,Array.from(n),e)}return this}},exports.join32=r,exports.rotl32=i,exports.split32=h,exports.sum32=n,exports.sum32By3=o,exports.sum32By4=s,exports.toArray=f;
//# sourceMappingURL=index.js.map
