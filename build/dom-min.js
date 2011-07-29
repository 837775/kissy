/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 28 15:35
*/
KISSY.add("dom/attr",function(l,b,w,p){function A(e,a){a=v[a]||a;var d=q[a];if(!e)return p;return d&&d.get?d.get(e,a):e[a]}w=document.documentElement;var z=!w.hasAttribute,x=w.textContent!==p?"textContent":"innerText",g=b._isElementNode,k=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,m=/^(?:button|input|object|select|textarea)$/i,y=/^a(?:rea)?$/i,i=/:|^on/,n=/\r/g,c={},j={val:1,css:1,html:1,text:1,data:1,width:1,height:1,
offset:1},r={tabindex:{get:function(e){var a=e.getAttributeNode("tabindex");return a&&a.specified?parseInt(a.value,10):m.test(e.nodeName)||y.test(e.nodeName)&&e.href?0:p}},style:{get:function(e){return e.style.cssText},set:function(e,a){e.style.cssText=a}}},v={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},
B={get:function(e,a){return b.prop(e,a)?a.toLowerCase():p},set:function(e,a,d){if(a===false)b.removeAttr(e,d);else{a=v[d]||d;if(a in e)e[a]=true;e.setAttribute(d,d.toLowerCase())}return d}},q={},h={},s={option:{get:function(e){var a=e.attributes.value;return!a||a.specified?e.value:e.text}},select:{get:function(e){var a=e.selectedIndex,d=e.options;e=e.type==="select-one";if(a<0)return null;else if(e)return b.val(d[a]);a=[];e=0;for(var f=d.length;e<f;++e)d[e].selected&&a.push(b.val(d[e]));return a},
set:function(e,a){var d=l.makeArray(a);l.each(e.options,function(f){f.selected=l.inArray(b.val(f),d)});if(!d.length)e.selectedIndex=-1;return d}}};if(z){h={get:function(e,a){var d;return(d=e.getAttributeNode(a))&&d.nodeValue!==""?d.nodeValue:p},set:function(e,a,d){if(e=e.getAttributeNode(d))e.nodeValue=a}};c=v;r.tabIndex=r.tabindex;l.each(["href","src","width","height","colSpan","rowSpan"],function(e){r[e]={get:function(a){a=a.getAttribute(e,2);return a===null?p:a}}});s.button=r.value=h}l.each(["radio",
"checkbox"],function(e){s[e]={get:function(a){return a.getAttribute("value")===null?"on":a.value},set:function(a,d){if(l.isArray(d))return a.checked=l.inArray(b.val(a),d)}}});l.mix(b,{prop:function(e,a,d){if(l.isPlainObject(a))for(var f in a)b.prop(e,f,a[f]);else{e=b.query(e);a=v[a]||a;var o=q[a];if(d!==p)l.each(e,function(t){if(o&&o.set)o.set(t,d,a);else t[a]=d});else if(e=e[0])return A(e,a)}},hasProp:function(e,a){return A(e,a)!==p},removeProp:function(e,a){a=v[a]||a;b.query(e).each(function(d){try{d[a]=
p;delete d[a]}catch(f){}})},attr:function(e,a,d,f){if(l.isPlainObject(a)){f=d;for(var o in a)b.attr(e,o,a[o],f)}else if(a=l.trim(a)){a=a.toLowerCase();if(f&&j[a])return b[a](e,d);a=c[a]||a;var t;t=k.test(a)?B:i.test(a)?h:r[a];if(d===p){e=b.get(e);if(g(e)){if(e.nodeName.toLowerCase()=="form")t=h;if(t&&t.get)return t.get(e,a);e=e.getAttribute(a);return e===null?p:e}}else l.each(b.query(e),function(u){if(g(u))t&&t.set?t.set(u,d,a):u.setAttribute(a,""+d)})}},removeAttr:function(e,a){a=a.toLowerCase();
a=c[a]||a;l.each(b.query(e),function(d){if(g(d)){var f;d.removeAttribute(a);if(k.test(a)&&(f=v[a]||a)in d)d[f]=false}})},hasAttr:z?function(e,a){a=a.toLowerCase();var d=b.get(e).getAttributeNode(a);return!!(d&&d.specified)}:function(e,a){a=a.toLowerCase();return b.get(e).hasAttribute(a)},val:function(e,a){var d,f;if(a===p){var o=b.get(e);if(o){if((d=s[o.nodeName.toLowerCase()]||s[o.type])&&"get"in d&&(f=d.get(o,"value"))!==p)return f;f=o.value;return typeof f==="string"?f.replace(n,""):f==null?"":
f}}else b.query(e).each(function(t){if(t.nodeType===1){var u=a;if(u==null)u="";else if(typeof u==="number")u+="";else if(l.isArray(u))u=l.map(u,function(C){return C==null?"":C+""});d=s[t.nodeName.toLowerCase()]||s[t.type];if(!d||!("set"in d)||d.set(t,u,"value")===p)t.value=u}})},text:function(e,a){if(a===p){var d=b.get(e);if(g(d))return d[x]||"";else if(b._nodeTypeIs(d,3))return d.nodeValue;return p}else l.each(b.query(e),function(f){if(g(f))f[x]=a;else if(b._nodeTypeIs(f,3))f.nodeValue=a})}});return b},
{requires:["./base","ua"]});KISSY.add("dom/base",function(l,b){function w(p,A){return p&&p.nodeType===A}return{_isElementNode:function(p){return w(p,1)},_getWin:function(p){return p&&"scrollTo"in p&&p.document?p:w(p,9)?p.defaultView||p.parentWindow:p==b?window:false},_nodeTypeIs:w,_isNodeList:function(p){return p&&!p.nodeType&&p.item&&!p.setTimeout}}});
KISSY.add("dom/class",function(l,b,w){function p(x,g,k,m){if(!(g=l.trim(g)))return m?false:w;x=b.query(x);var y=0,i=x.length,n=g.split(A);for(g=[];y<n.length;y++){var c=l.trim(n[y]);c&&g.push(c)}for(y=0;y<i;y++){n=x[y];if(b._isElementNode(n)){n=k(n,g,g.length);if(n!==w)return n}}if(m)return false;return w}var A=/[\.\s]\s*\.?/,z=/[\n\t]/g;l.mix(b,{hasClass:function(x,g){return p(x,g,function(k,m,y){if(k=k.className){k=(" "+k+" ").replace(z," ");for(var i=0,n=true;i<y;i++)if(k.indexOf(" "+m[i]+" ")<
0){n=false;break}if(n)return true}},true)},addClass:function(x,g){p(x,g,function(k,m,y){var i=k.className;if(i){var n=(" "+i+" ").replace(z," ");i=i;for(var c=0;c<y;c++)if(n.indexOf(" "+m[c]+" ")<0)i+=" "+m[c];k.className=l.trim(i)}else k.className=g},w)},removeClass:function(x,g){p(x,g,function(k,m,y){var i=k.className;if(i)if(y){i=(" "+i+" ").replace(z," ");for(var n=0,c;n<y;n++)for(c=" "+m[n]+" ";i.indexOf(c)>=0;)i=i.replace(c," ");k.className=l.trim(i)}else k.className=""},w)},replaceClass:function(x,
g,k){b.removeClass(x,g);b.addClass(x,k)},toggleClass:function(x,g,k){var m=l.isBoolean(k),y;p(x,g,function(i,n,c){for(var j=0,r;j<c;j++){r=n[j];y=m?!k:b.hasClass(i,r);b[y?"removeClass":"addClass"](i,r)}},w)}});return b},{requires:["dom/base"]});
KISSY.add("dom/create",function(l,b,w,p){function A(f,o){if(l.isPlainObject(o))if(i(f))b.attr(f,o,true);else f.nodeType==11&&l.each(f.childNodes,function(t){b.attr(t,o,true)});return f}function z(f,o){var t=null,u,C;if(f&&(f.push||f.item)&&f[0]){o=o||f[0].ownerDocument;t=o.createDocumentFragment();if(f.item)f=l.makeArray(f);u=0;for(C=f.length;u<C;u++)t.appendChild(f[u])}return t}function x(f,o,t,u){if(t){var C=l.guid("ks-tmp-"),D=RegExp(r);o+='<span id="'+C+'"></span>';l.available(C,function(){var E=
b.get("head"),F,J,H,G,K,I;for(D.lastIndex=0;F=D.exec(o);)if((H=(J=F[1])?J.match(B):false)&&H[2]){F=k.createElement("script");F.src=H[2];if((G=J.match(q))&&G[2])F.charset=G[2];F.async=true;E.appendChild(F)}else if((I=F[2])&&I.length>0)l.globalEval(I);(K=k.getElementById(C))&&b.remove(K);l.isFunction(u)&&u()});g(f,o)}else{g(f,o);l.isFunction(u)&&u()}}function g(f,o){o=(o+"").replace(r,"");try{f.innerHTML=o}catch(t){for(;f.firstChild;)f.removeChild(f.firstChild);o&&f.appendChild(b.create(o))}}var k=
document,m=w.ie,y=b._nodeTypeIs,i=b._isElementNode,n=k.createElement("div"),c=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,j=/<(\w+)/,r=/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,v=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,B=/\ssrc=(['"])(.*?)\1/i,q=/\scharset=(['"])(.*?)\1/i;l.mix(b,{create:function(f,o,t){if(y(f,1)||y(f,3)){o=f;t=o.cloneNode(true);if(w.ie<8)t.innerHTML=o.innerHTML;return t}if(!(f=l.trim(f)))return null;var u=null;u=b._creators;var C,D="div",E;
if(C=v.exec(f))u=(t||k).createElement(C[1]);else{f=f.replace(c,"<$1></$2>");if((C=j.exec(f))&&(E=C[1])&&l.isFunction(u[E=E.toLowerCase()]))D=E;f=u[D](f,t).childNodes;u=f.length===1?f[0].parentNode.removeChild(f[0]):z(f,t||k)}return A(u,o)},_creators:{div:function(f,o){var t=o?o.createElement("div"):n;t.innerHTML="w<div>"+f+"</div>";return t.lastChild}},html:function(f,o,t,u){if(o===p){f=b.get(f);if(i(f))return f.innerHTML}else l.each(b.query(f),function(C){i(C)&&x(C,o,t,u)})},remove:function(f){l.each(b.query(f),
function(o){o.parentNode&&o.parentNode.removeChild(o)})},_nl2frag:z});if(m||w.gecko||w.webkit){var h=b._creators,s=b.create,e=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,a={option:"select",td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"},d;for(d in a)(function(f){h[d]=function(o,t){return s("<"+f+">"+o+"</"+f+">",null,t)}})(a[d]);if(m){h.script=function(f,o){var t=o?o.createElement("div"):n;t.innerHTML="-"+f;t.removeChild(t.firstChild);return t};if(m<8)h.tbody=function(f,
o){var t=s("<table>"+f+"</table>",null,o),u=t.children.tags("tbody")[0];t.children.length>1&&u&&!e.test(f)&&u.parentNode.removeChild(u);return t}}l.mix(h,{optgroup:h.option,th:h.td,thead:h.tbody,tfoot:h.tbody,caption:h.tbody,colgroup:h.tbody})}return b},{requires:["./base","ua"]});
KISSY.add("dom/data",function(l,b,w){var p=window,A="_ks_data_"+l.now(),z={},x={},g={};g.applet=1;g.object=1;g.embed=1;var k={hasData:function(i,n){if(i)if(n!==w){if(n in i)return true}else if(!l.isEmptyObject(i))return true;return false}},m={hasData:function(i,n){if(i==p)return m.hasData(x,n);return k.hasData(i[A],n)},data:function(i,n,c){if(i==p)return m.data(x,n,c);var j=i[A];if(c!==w){j=i[A]=i[A]||{};j[n]=c}else if(n!==w)return j&&j[n];else return j=i[A]=i[A]||{}},removeData:function(i,n){if(i==
p)return m.removeData(x,n);var c=i[A];if(c)if(n!==w){delete c[n];l.isEmptyObject(c)&&m.removeData(i,w)}else delete i[A]}},y={hasData:function(i,n){var c=i[A];if(!c)return false;return k.hasData(z[c],n)},data:function(i,n,c){if(!g[i.nodeName.toLowerCase()]){var j=i[A];j||(j=i[A]=l.guid());i=z[j];if(c!==w){i=z[j]=z[j]||{};i[n]=c}else if(n!==w)return i&&i[n];else return i=z[j]=z[j]||{}}},removeData:function(i,n){var c=i[A];if(c){var j=z[c];if(j)if(n!==w){delete j[n];l.isEmptyObject(j)&&y.removeData(i,
w)}else{delete z[c];try{delete i[A]}catch(r){}i.removeAttribute&&i.removeAttribute(A)}}}};l.mix(b,{hasData:function(i,n){var c=false;b.query(i).each(function(j){c=j&&j.nodeType?c||y.hasData(j,n):c||m.hasData(j,n)});return c},data:function(i,n,c){if(l.isPlainObject(n))for(var j in n)b.data(i,j,n[j]);else if(c===w)return(i=b.get(i))&&i.nodeType?y.data(i,n,c):m.data(i,n,c);else b.query(i).each(function(r){r&&r.nodeType?y.data(r,n,c):m.data(r,n,c)})},removeData:function(i,n){b.query(i).each(function(c){c&&
c.nodeType?y.removeData(c,n):m.removeData(c,n)})}});return b},{requires:["./base"]});
KISSY.add("dom/insertion",function(l,b){function w(x,g,k){x=b.query(x);g=b.query(g);if(x=p(x)){var m;if(g.length>1)m=x.cloneNode(true);for(var y=0;y<g.length;y++){var i=g[y],n=y>0?m.cloneNode(true):x;k(n,i)}}}var p=b._nl2frag;l.mix(b,{insertBefore:function(x,g){w(x,g,function(k,m){m.parentNode&&m.parentNode.insertBefore(k,m)})},insertAfter:function(x,g){w(x,g,function(k,m){m.parentNode&&m.parentNode.insertBefore(k,m.nextSibling)})},appendTo:function(x,g){w(x,g,function(k,m){m.appendChild(k)})},prependTo:function(x,
g){w(x,g,function(k,m){m.insertBefore(k,m.firstChild)})}});var A={prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},z;for(z in A)b[z]=b[A[z]];return b},{requires:["./create"]});
KISSY.add("dom/offset",function(l,b,w,p){function A(a){var d,f=0;d=0;var o=g.body,t=n(a[v]);if(a[e]){d=a[e]();f=d[B];d=d[q];a=k&&g.documentMode!=9&&(c?m.clientTop:o.clientTop)||0;f-=k&&g.documentMode!=9&&(c?m.clientLeft:o.clientLeft)||0;d-=a;if(w.mobile=="apple"){f-=b[h](t);d-=b[s](t)}}return{left:f,top:d}}function z(a,d){var f={left:0,top:0},o=n(a[v]),t=a;d=d||o;do{var u;if(o==d){var C=t;u=A(C);C=n(C[v]);u.left+=b[h](C);u.top+=b[s](C);u=u}else u=A(t);u=u;f.left+=u.left;f.top+=u.top}while(o&&o!=d&&
(t=o.frameElement)&&(o=o.parent));return f}var x=window,g=document,k=w.ie,m=g.documentElement,y=b._isElementNode,i=b._nodeTypeIs,n=b._getWin,c=g.compatMode==="CSS1Compat",j=Math.max,r=parseInt,v="ownerDocument",B="left",q="top",h="scrollLeft",s="scrollTop",e="getBoundingClientRect";l.mix(b,{offset:function(a,d,f){if((a=b.get(a))&&a[v]){if(d===p)return z(a,f);a=a;if(b.css(a,"position")==="static")a.style.position="relative";f=z(a);var o={},t,u;for(u in d){t=r(b.css(a,u),10)||0;o[u]=t+d[u]-f[u]}b.css(a,
o)}},scrollIntoView:function(a,d,f,o){if((a=b.get(a))&&a[v]){o=o===p?true:!!o;f=f===p?true:!!f;if(!d||(d=b.get(d))===x)a.scrollIntoView(f);else{if(i(d,9))d=n(d);var t=!!n(d),u=b.offset(a),C=t?{left:b.scrollLeft(d),top:b.scrollTop(d)}:b.offset(d),D={left:u[B]-C[B],top:u[q]-C[q]};u=t?b.viewportHeight(d):d.clientHeight;t=t?b.viewportWidth(d):d.clientWidth;C=b[h](d);var E=b[s](d),F=C+t,J=E+u,H=a.offsetHeight;a=a.offsetWidth;var G=D.left+C-(r(b.css(d,"borderLeftWidth"))||0);D=D.top+E-(r(b.css(d,"borderTopWidth"))||
0);var K=G+a,I=D+H,L,M;if(H>u||D<E||f)L=D;else if(I>J)L=I-u;if(o)if(a>t||G<C||f)M=G;else if(K>F)M=K-t;b[s](d,L);b[h](d,M)}}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0});l.each(["Left","Top"],function(a,d){var f="scroll"+a;b[f]=function(o,t){if(l.isNumber(o))arguments.callee(x,o);else{o=b.get(o);var u=0,C=n(o);if(C){if(t!==p){u=a=="Left"?t:b.scrollLeft(C);var D=a=="Top"?t:b.scrollTop(C);C.scrollTo(u,D)}u=C.document;u=C[d?"pageYOffset":"pageXOffset"]||u.documentElement[f]||u.body[f]}else if(y(o=
b.get(o)))u=t!==p?o[f]=t:o[f];return t===p?u:p}}});l.each(["Width","Height"],function(a){b["doc"+a]=function(d){d=b.get(d);d=n(d).document;return j(d.documentElement["scroll"+a],d.body["scroll"+a],b["viewport"+a](d))};b["viewport"+a]=function(d){d=b.get(d);var f="inner"+a;d=n(d);var o=d.document;return f in d?d[f]:c?o.documentElement["client"+a]:o.body["client"+a]}});return b},{requires:["./base","ua"]});
KISSY.add("dom/selector",function(l,b,w){function p(c,j){var r,v,B=[],q;v=l.require("sizzle");j=A(j);if(l.isString(c))if(c.indexOf(",")!=-1){r=c.split(",");l.each(r,function(h){B.push.apply(B,l.makeArray(p(h,j)))})}else{c=l.trim(c);if(y.test(c)){if(v=z(c.slice(1),j))B=[v]}else if(r=i.exec(String(c))){v=r[1];q=r[2];r=r[3];if(j=v?z(v,j):j)if(r)if(!v||c.indexOf(m)!==-1)B=l.makeArray(n(r,q,j));else{if((v=z(v,j))&&b.hasClass(v,r))B=[v]}else if(q)B=x(q,j)}else if(v)B=v(c,j)}else if(c&&(l.isArray(c)||k(c)))B=
c;else if(c)B=[c];if(k(B))B=l.makeArray(B);B.each=function(h,s){return l.each(B,h,s)};return B}function A(c){if(c===w)c=g;else if(l.isString(c)&&y.test(c))c=z(c.slice(1),g);else if(l.isArray(c)||k(c))c=c[0]||null;else if(c&&c.nodeType!==1&&c.nodeType!==9)c=null;return c}function z(c,j){if(!j)return null;if(j.nodeType!==9)j=j.ownerDocument;return j.getElementById(c)}function x(c,j){return j.getElementsByTagName(c)}var g=document,k=b._isNodeList,m=" ",y=/^#[\w-]+$/,i=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
(function(){var c=g.createElement("div");c.appendChild(g.createComment(""));if(c.getElementsByTagName("*").length>0)x=function(j,r){var v=l.makeArray(r.getElementsByTagName(j));if(j==="*"){for(var B=[],q=0,h=0,s;s=v[q++];)if(s.nodeType===1)B[h++]=s;v=B}return v}})();var n=g.getElementsByClassName?function(c,j,r){r=c=l.makeArray(r.getElementsByClassName(c));var v=0,B=0,q=c.length,h;if(j&&j!=="*"){r=[];for(j=j.toUpperCase();v<q;++v){h=c[v];if(h.tagName===j)r[B++]=h}}return r}:g.querySelectorAll?function(c,
j,r){return r.querySelectorAll((j?j:"")+"."+c)}:function(c,j,r){j=r.getElementsByTagName(j||"*");r=[];var v=0,B=0,q=j.length,h,s;for(c=m+c+m;v<q;++v){h=j[v];if((s=h.className)&&(m+s+m).indexOf(c)>-1)r[B++]=h}return r};l.mix(b,{query:p,get:function(c,j){return p(c,j)[0]||null},filter:function(c,j,r){var v=p(c,r),B=l.require("sizzle"),q,h,s,e=[];if(l.isString(j)&&(q=i.exec(j))&&!q[1]){h=q[2];s=q[3];j=function(a){return!(h&&a.tagName.toLowerCase()!==h.toLowerCase()||s&&!b.hasClass(a,s))}}if(l.isFunction(j))e=
l.filter(v,j);else if(j&&B)e=B._filter(c,j,r);return e},test:function(c,j,r){c=p(c,r);return c.length&&b.filter(c,j,r).length===c.length}});return b},{requires:["dom/base"]});
KISSY.add("dom/style-ie",function(l,b,w,p,A){if(!w.ie)return b;p=document;var z=p.documentElement,x=b._CUSTOM_STYLES,g=/^-?\d+(?:px)?$/i,k=/^-?\d/,m=/^(?:width|height)$/;try{if(z.style.opacity==A&&z.filters)x.opacity={get:function(c){var j=100;try{j=c.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(r){try{j=c.filters("alpha").opacity}catch(v){if(c=((c.currentStyle||0).filter||"").match(/alpha\(opacity[=:]([^)]+)\)/))j=parseInt(l.trim(c[1]))}}return j/100+""},set:function(c,j){var r=c.style,
v=(c.currentStyle||0).filter||"";r.zoom=1;if(v)v=l.trim(v.replace(/alpha\(opacity[^=]*=[^)]+\),?/ig,""));if(v&&j!=1)v+=", ";r.filter=v+(j!=1?"alpha(opacity="+j*100+")":"")}}}catch(y){}w=w.ie==8;var i={},n={get:function(c,j){var r=c.currentStyle[j]+"";if(r.indexOf("px")<0)r=i[r]?i[r]:0;return r}};i.thin=w?"1px":"2px";i.medium=w?"3px":"4px";i.thick=w?"5px":"6px";l.each(["","Top","Left","Right","Bottom"],function(c){x["border"+c+"Width"]=n});if(!(p.defaultView||{}).getComputedStyle&&z.currentStyle)b._getComputedStyle=
function(c,j){var r=c.style,v=c.currentStyle[j];if(m.test(j))v=b[j](c)+"px";else if(!g.test(v)&&k.test(v)){var B=r.left,q=c.runtimeStyle.left;c.runtimeStyle.left=c.currentStyle.left;r.left=j==="fontSize"?"1em":v||0;v=r.pixelLeft+"px";r.left=B;c.runtimeStyle.left=q}return v};return b},{requires:["./base","ua","./style"]});
KISSY.add("dom/style",function(l,b,w,p){function A(q,h){var s=b.get(q);if(l.isWindow(s))return h==m?b.viewportWidth(s):b.viewportHeight(s);else if(s.nodeType==9)return h==m?b.docWidth(s):b.docHeight(s);var e=h===m?s.offsetWidth:s.offsetHeight;l.each(h===m?["Left","Right"]:["Top","Bottom"],function(a){e-=parseFloat(b._getComputedStyle(s,"padding"+a))||0;e-=parseFloat(b._getComputedStyle(s,"border"+a+"Width"))||0});return e}function z(q,h,s){var e=s;if(s===y&&n.test(h)){e=0;if(l.inArray(b.css(q,"position"),
["absolute","fixed"])){s=q[h==="left"?"offsetLeft":"offsetTop"];if(k&&document.documentMode!=9||w.opera)s-=q.offsetParent["client"+(h=="left"?"Left":"Top")]||0;e=s-(i(b.css(q,"margin-"+h))||0)}}return e}var x=document,g=x.documentElement,k=w.ie,m="width",y="auto",i=parseInt,n=/^(?:left|top)/,c=/^(?:width|height|top|left|right|bottom|margin|padding)/i,j=/-([a-z])/ig,r=function(q,h){return h.toUpperCase()},v={},B={};l.mix(b,{_CUSTOM_STYLES:v,_getComputedStyle:function(q,h){var s="",e=q.ownerDocument;
if(q.style)s=e.defaultView.getComputedStyle(q,null)[h];return s},css:function(q,h,s){if(l.isPlainObject(h))for(var e in h)b.css(q,e,h[e]);else{if(h.indexOf("-")>0)h=h.replace(j,r);e=h;h=v[h]||h;if(s===p){q=b.get(q);var a="";if(q&&q.style){a=h.get?h.get(q,e):q.style[h];if(a===""&&!h.get)a=z(q,h,b._getComputedStyle(q,h))}return a===p?"":a}else{if(s===null||s==="")s="";else if(!isNaN(new Number(s))&&c.test(h))s+="px";(h===m||h==="height")&&parseFloat(s)<0||l.each(b.query(q),function(d){if(d&&d.style){h.set?
h.set(d,s):d.style[h]=s;if(s==="")d.style.cssText||d.removeAttribute("style")}})}}},width:function(q,h){if(h===p)return A(q,m);else b.css(q,m,h)},height:function(q,h){if(h===p)return A(q,"height");else b.css(q,"height",h)},show:function(q){b.query(q).each(function(h){if(h){h.style.display=b.data(h,"display")||"";if(b.css(h,"display")==="none"){var s=h.tagName,e=B[s],a;if(!e){a=x.createElement(s);x.body.appendChild(a);e=b.css(a,"display");b.remove(a);B[s]=e}b.data(h,"display",e);h.style.display=e}}})},
hide:function(q){b.query(q).each(function(h){if(h){var s=h.style,e=s.display;if(e!=="none"){e&&b.data(h,"display",e);s.display="none"}}})},toggle:function(q){b.query(q).each(function(h){if(h)b.css(h,"display")==="none"?b.show(h):b.hide(h)})},addStyleSheet:function(q,h,s){if(l.isString(q)){s=h;h=q;q=window}q=b.get(q);q=b._getWin(q).document;var e;if(s&&(s=s.replace("#","")))e=b.get("#"+s,q);if(!e){e=b.create("<style>",{id:s},q);b.get("head",q).appendChild(e);if(e.styleSheet)e.styleSheet.cssText=h;
else e.appendChild(q.createTextNode(h))}},unselectable:function(q){b.query(q).each(function(h){if(h)if(w.gecko)h.style.MozUserSelect="none";else if(w.webkit)h.style.KhtmlUserSelect="none";else if(w.ie||w.opera){var s=0,e=h.getElementsByTagName("*");for(h.setAttribute("unselectable","on");h=e[s++];)switch(h.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:h.setAttribute("unselectable","on")}}})}});if(g.style.cssFloat!==p)v["float"]="cssFloat";else if(g.style.styleFloat!==
p)v["float"]="styleFloat";return b},{requires:["dom/base","ua"]});
KISSY.add("dom/traversal",function(l,b,w){function p(g,k,m,y,i,n){if(!(g=b.get(g)))return null;if(k===0)return g;n||(g=g[m]);if(!g)return null;i=i&&b.get(i)||null;if(k===w)k=1;n=[];var c=l.isArray(k),j,r;if(l.isNumber(k)){j=0;r=k;k=function(){return++j===r}}do if(x(g)&&A(g,k)&&(!y||y(g))){n.push(g);if(!c)break}while(g!=i&&(g=g[m]));return c?n:n[0]||null}function A(g,k){if(!k)return true;if(l.isArray(k))for(var m=0;m<k.length;m++){if(b.test(g,k[m]))return true}else if(b.test(g,k))return true;return false}
function z(g,k,m){var y=[];var i=g=b.get(g);if(g&&m)i=g.parentNode;if(i){m=0;for(i=i.firstChild;i;i=i.nextSibling)if(x(i)&&i!==g&&(!k||b.test(i,k)))y[m++]=i}return y}var x=b._isElementNode;l.mix(b,{closest:function(g,k,m){return p(g,k,"parentNode",function(y){return y.nodeType!=11},m,true)},parent:function(g,k,m){return p(g,k,"parentNode",function(y){return y.nodeType!=11},m)},next:function(g,k){return p(g,k,"nextSibling",w)},prev:function(g,k){return p(g,k,"previousSibling",w)},siblings:function(g,
k){return z(g,k,true)},children:function(g,k){return z(g,k,w)},contains:document.documentElement.contains?function(g,k){g=b.get(g);k=b.get(k);if(g.nodeType==3)return false;var m;if(k.nodeType==3){k=k.parentNode;m=true}else if(k.nodeType==9)return false;else m=g!==k;return m&&(g.contains?g.contains(k):true)}:document.documentElement.compareDocumentPosition?function(g,k){g=b.get(g);k=b.get(k);return!!(g.compareDocumentPosition(k)&16)}:0,equals:function(g,k){g=b.query(g);k=b.query(k);if(g.length!=k.length)return false;
for(var m=g.length;m>=0;m--)if(g[m]!=k[m])return false;return true}});return b},{requires:["./base"]});KISSY.add("dom",function(l,b){return b},{requires:["dom/attr","dom/class","dom/create","dom/data","dom/insertion","dom/offset","dom/style","dom/selector","dom/style-ie","dom/traversal"]});
