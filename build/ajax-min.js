/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 15 15:44
*/
KISSY.add("ajax/base",function(i,h,j,c){function d(f){f=i.mix(i.clone(r),f||{},undefined,undefined,true);if(f.crossDomain==null){var k=p.exec(f.url.toLowerCase());f.crossDomain=!!(k&&(k[1]!=n[1]||k[2]!=n[2]||(k[3]||(k[1]==="http:"?80:443))!=(n[3]||(n[1]==="http:"?80:443))))}if(f.processData&&f.data&&!i.isString(f.data))f.data=i.param(f.data,undefined,undefined,f.serializeArray);f.type=f.type.toUpperCase();f.hasContent=!q.test(f.type);if(!f.hasContent){if(f.data)f.url+=(/\?/.test(f.url)?"&":"?")+f.data;
if(f.cache===false)f.url+=(/\?/.test(f.url)?"&":"?")+"_ksTS="+(i.now()+"_"+i.guid())}f.dataType=i.trim(f.dataType||"*").split(g);f.context=f.context||f;return f}function a(f,k){e.fire(f,{ajaxConfig:k.config,xhr:k})}function b(f){var k=this.config;f=f.type;this.timeoutTimer&&clearTimeout(this.timeoutTimer);k[f]&&k[f].call(k.context,this.responseData,this.statusText,this);a(f,this)}function e(f){if(f.url){f=d(f);var k=new c(f);a("start",k);var v=new (s[f.dataType[0]]||s["*"])(k);k.transport=v;f.contentType&&
k.setRequestHeader("Content-Type",f.contentType);var t=f.dataType[0],u=f.accepts;k.setRequestHeader("Accept",t&&u[t]?u[t]+(t!=="*"?", */*; q=0.01":""):u["*"]);for(var w in f.headers)k.setRequestHeader(w,f.headers[w]);k.on("complete success error",b);k.readyState=1;a("send",k);if(f.async&&f.timeout>0)k.timeoutTimer=setTimeout(function(){k.abort("timeout")},f.timeout);try{k.state=1;v.send()}catch(x){k.status<2&&k.callback(-1,x)}return k}}var g=/\s+/,p=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
l=function(f){return f},q=/^(?:GET|HEAD)$/,o,n;try{o=location.href}catch(m){o=document.createElement("a");o.href="";o=o.href}n=p.exec(o);o=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/.test(n[1]);var s={},r={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:true,serializeArray:true,processData:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},converters:{text:{json:h.parse,
html:l,text:l,xml:i.parseXML}},contents:{xml:/xml/,html:/html/,json:/json/}};r.converters.html=r.converters.text;i.mix(e,j.Target);i.mix(e,{isLocal:o,setupConfig:function(f){i.mix(r,f,undefined,undefined,true)},setupTransport:function(f,k){s[f]=k},getTransport:function(f){return s[f]},getConfig:function(){return r}});return e},{requires:["json","event","./xhrobject"]});
KISSY.add("ajax/form-serializer",function(i,h){return{serialize:function(j){j=h.get(j);var c={};i.each(j.elements,function(d){d.disabled||(c[d.name]=h.val(d))});return i.param(c,undefined,undefined,false)}}},{requires:["dom"]});
KISSY.add("ajax/form",function(i,h,j,c){h.on("start",function(d){d=d.xhr.config;if(d.form){var a=j.get(d.form);if((a.encoding||a.enctype).toLowerCase()!="multipart/form-data"){if(a=c.serialize(a))if(d.hasContent){d.data=d.data||"";if(d.data)d.data+="&";d.data+=a}else d.url+=(/\?/.test(d.url)?"&":"?")+a}else{a=d.dataType[0];if(a=="*")a="text";d.dataType.length=2;d.dataType[0]="iframe";d.dataType[1]=a}}});return h},{requires:["./base","dom","./form-serializer"]});
KISSY.add("ajax/iframe-upload",function(i,h,j,c){function d(b){this.xhr=b}var a=document;c.setupConfig({converters:{iframe:c.getConfig().converters.text,text:{iframe:function(b){return b}}}});i.augment(d,{send:function(){var b=this.xhr,e=b.config,g,p=h.get(e.form);this.attrs={target:h.attr(p,"target")||"",action:h.attr(p,"action")||""};this.form=p;var l=i.guid("ajax-iframe");b.iframe=h.create("<iframe  id='"+l+"' name='"+l+"' style='position:absolute;left:-9999px;top:-9999px;'/>");b.iframeId=l;h.prepend(b.iframe,
a.body||a.documentElement);h.attr(p,{target:b.iframeId,action:e.url});if(e.data){g=e.data;e=e.serializeArray;g=i.unparam(g);l=[];for(var q in g)for(var o=i.makeArray(g[q]),n=0;n<o.length;n++){var m=a.createElement("input");m.type="hidden";m.name=q+(e?"[]":"");m.value=o[n];h.append(m,p);l.push(m)}g=l}this.fields=g;j.on(b.iframe,"load error",this._callback,this);p.submit()},_callback:function(b){var e=this.xhr;b=b.type;var g=e.iframe;h.attr(this.form,this.attrs);if(b=="load"){b=g.contentWindow.document;
e.responseXML=b;e.responseText=h.text(b.body);e.callback(200,"success")}else b=="error"&&e.callback(500,"error");h.remove(this.fields);j.detach(g);setTimeout(function(){h.remove(g)},30);e.iframe=null},abort:function(){this._callback(0,1)}});c.setupTransport("iframe",d);return c},{requires:["dom","event","./base"]});
KISSY.add("ajax/jsonp",function(i,h){h.setupConfig({jsonp:"callback",jsonpCallback:function(){return i.guid("jsonp")}});h.on("start",function(j){j=j.xhr;var c=j.config;if(c.dataType[0]=="jsonp"){var d,a=c.jsonpCallback,b=i.isFunction(a)?a():a,e=window[b];c.url+=(/\?/.test(c.url)?"&":"?")+c.jsonp+"="+b;window[b]=function(g){d=[g]};j.on("complete",function(){window[b]=e;if(e===undefined)try{delete window[b]}catch(g){}else d&&e(d[0])});j.converters=j.converters||{};j.converters.script=j.converters.script||
{};j.converters.script.json=function(){return d[0]};c.dataType.length=2;c.dataType[0]="script";c.dataType[1]="json"}});return h},{requires:["./base"]});
KISSY.add("ajax/script",function(i,h){function j(c){if(!c.config.crossDomain&&!c.config.forceScript)return new (h.getTransport("*"))(c);this.xhrObj=c;return 0}h.setupConfig({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{text:{script:function(c){i.globalEval(c);return c}}}});i.augment(j,{send:function(){var c=this,d,a=this.xhrObj.config,b=document.head||document.getElementsByTagName("head")[0]||
document.documentElement;c.head=b;d=document.createElement("script");c.script=d;d.async="async";if(a.scriptCharset)d.charset=a.scriptCharset;d.src=a.url;d.onerror=d.onload=d.onreadystatechange=function(e){e=e||window.event;c._callback((e.type||"error").toLowerCase())};b.insertBefore(d,b.firstChild)},_callback:function(c,d){var a=this.script,b=this.xhrObj,e=this.head;if(d||!a.readyState||/loaded|complete/.test(a.readyState)||c=="error"){a.onerror=a.onload=a.onreadystatechange=null;e&&a.parentNode&&
e.removeChild(a);this.head=this.script=undefined;if(!d&&c!="error")b.callback(200,"success");else c=="error"&&b.callback(500,"scripterror")}},abort:function(){this._callback(0,1)}});h.setupTransport("script",j);return h},{requires:["./base","./xhr"]});
KISSY.add("ajax/xhr",function(i,h){function j(){try{return new window.XMLHttpRequest}catch(a){}}h.xhr=window.ActiveXObject?function(){var a;if(!(a=!h.isLocal&&j()))a:{try{a=new window.ActiveXObject("Microsoft.XMLHTTP");break a}catch(b){}a=void 0}return a}:j;var c=h.xhr(),d=false;if(c){if("withCredentials"in c)d=true;c=function(a){this.xhrObj=a};i.augment(c,{send:function(){var a=this,b=a.xhrObj,e=b.config;if(!(e.crossDomain&&!d)){var g=h.xhr(),p,l;a.xhr=g;e.username?g.open(e.type,e.url,e.async,e.username,
e.password):g.open(e.type,e.url,e.async);if(p=e.xhrFields)for(l in p)g[l]=p[l];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType);if(!e.crossDomain&&!b.requestHeaders["X-Requested-With"])b.requestHeaders["X-Requested-With"]="XMLHttpRequest";try{for(l in b.requestHeaders)g.setRequestHeader(l,b.requestHeaders[l])}catch(q){}g.send(e.hasContent&&e.data||null);if(!e.async||g.readyState==4)a._callback();else g.onreadystatechange=function(){a._callback()}}},abort:function(){this._callback(0,
1)},_callback:function(a,b){try{var e=this.xhr,g=this.xhrObj,p=g.config;if(b||e.readyState==4){e.onreadystatechange=i.noop;if(b)e.readyState!==4&&e.abort();else{var l=e.status;g.responseHeadersString=e.getAllResponseHeaders();var q=e.responseXML;if(q&&q.documentElement)g.responseXML=q;g.responseText=e.responseText;try{var o=e.statusText}catch(n){o=""}if(!l&&h.isLocal&&!p.crossDomain)l=g.responseText?200:404;else if(l===1223)l=204;g.callback(l,o)}}}catch(m){e.onreadystatechange=i.noop;b||g.callback(-1,
m)}}});h.setupTransport("*",c);return h}},{requires:["./base"]});
KISSY.add("ajax/xhrobject",function(i,h){function j(a){var b=a.responseText,e=a.responseXML,g=a.config,p=g.converters,l=a.converters||{},q,o,n=g.contents,m=g.dataType;if(b||e){for(g=a.mimeType||a.getResponseHeader("Content-Type");m[0]=="*";)m.shift();if(!m.length)for(q in n)if(n[q].test(g)){m[0]!=q&&m.unshift(q);break}m[0]=m[0]||"text";if(m[0]=="text"&&b!=undefined)o=b;else if(m[0]=="xml"&&e!=undefined)o=e;else i.each(["text","xml"],function(r){var f=m[0];if(l[r]&&l[r][f]||p[r]&&p[r][f]){m.unshift(r);
o=r=="text"?b:e;return false}})}n=m[0];for(g=1;g<m.length;g++){q=m[g];var s=l[n]&&l[n][q]||p[n]&&p[n][q];if(!s)throw"no covert for "+n+" => "+q;o=s(o);n=q}a.responseData=o}function c(a){i.mix(this,{responseData:null,config:a||{},timeoutTimer:null,responseText:null,responseXML:null,responseHeadersString:"",responseHeaders:null,requestHeaders:{},readyState:0,state:0,statusText:null,status:0,transport:null})}var d=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg;i.augment(c,h.Target,{setRequestHeader:function(a,b){this.requestHeaders[a]=
b;return this},getAllResponseHeaders:function(){return this.state===2?this.responseHeadersString:null},getResponseHeader:function(a){var b;if(this.state===2){if(!this.responseHeaders)for(this.responseHeaders={};b=d.exec(this.responseHeadersString);)this.responseHeaders[b[1]]=b[2];b=this.responseHeaders[a]}return b===undefined?null:b},overrideMimeType:function(a){if(!this.state)this.mimeType=a;return this},abort:function(a){a=a||"abort";this.transport&&this.transport.abort(a);this.callback(0,a);return this},
callback:function(a,b){if(this.state!=2){this.state=2;this.readyState=4;var e;if(a>=200&&a<300||a==304)if(a==304){b="notmodified";e=true}else try{j(this);b="success";e=true}catch(g){b="parsererror : "+g}else if(a<0)a=0;this.status=a;this.statusText=b;e?this.fire("success"):this.fire("error");this.fire("complete");this.transport=undefined}}});return c},{requires:["event"]});
KISSY.add("ajax",function(i,h){i.mix(h,{get:function(j,c,d,a,b){if(i.isFunction(c)){a=d;d=c;c=undefined}return h({type:b||"get",url:j,data:c,success:d,dataType:a})},post:function(j,c,d,a){if(i.isFunction(c)){a=d;d=c;c=undefined}return h.get(j,c,d,a,"post")},jsonp:function(j,c,d){if(i.isFunction(c)){d=c;c=undefined}return h.get(j,c,d,"jsonp")},getScript:i.getScript,getJSON:function(j,c,d){if(i.isFunction(c)){d=c;c=undefined}return h.get(j,c,d,"json")},upload:function(j,c,d,a,b){if(i.isFunction(d)){b=
a;a=d;d=undefined}return h({url:j,type:"post",dataType:b,form:c,data:d,success:a})}});return h},{requires:["ajax/base","ajax/xhrobject","ajax/xhr","ajax/script","ajax/jsonp","ajax/form","ajax/iframe-upload"]});
