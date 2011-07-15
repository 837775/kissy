/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 15 15:46
*/
KISSY.add("validation/base",function(f,j,o,e,h,b,a,d){function i(g,k){if(f.isString(g))g=f.get(g);g?this._init(g,k||{}):e.log("\u8bf7\u914d\u7f6e\u6b63\u786e\u7684form ID.")}f.augment(i,f.EventTarget,{_init:function(g,k){this.config=f.merge(h.Config,k);this.form=g;this.fields=new e.storage;this._initfields()},_initfields:function(){var g=this,k=g.config;f.each(g.form.elements,function(c){var l=j.attr(c,k.attrname);l&&g.add(c,e.toJSON(l))})},add:function(g,k){var c=this.fields,l=f.merge(this.config,k);if(f.isObject(g)&&g instanceof
b){c.add(g.id,g);return this}if(f.isString(g)&&g.substr(0,1)!="#")g="#"+g;var m=j.get(g),n=j.attr(m,"id");if(!m||m.form!=this.form)e.log("\u5b57\u6bb5"+g+"\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u8be5form");else{if(!n){n=l.prefix+f.guid();j.attr(m,"id",n)}c.add(n,new b(m,l));return this}},remove:function(g){this.fields.remove(g)},get:function(g){return this.fields.get(g)},isValid:function(g){var k=this.fields;if(g&&k.get(g))return k.get(g).isValid();var c=true;k.each(function(l,m){if(!m.isValid()){c=false;if(m.single)return false}});return c},
submit:function(){this.fire("submit",this.fields)&&this.isValid()&&this.form.submit()}});f.mix(i,{Util:e,Define:h,Field:b,Warn:a,Rule:d});return i},{requires:["dom","event","./utils","./define","./field","./warn","./rule"]});KISSY.add("validation/define",function(){var f={};f.Config={attrname:"data-valid",prefix:"auth-f",defaultwarn:"alert"};f.Const={enumvalidsign:{error:0,ok:1,hint:2,ignore:3}};return f});
KISSY.add("validation/field",function(f,j,o,e,h,b,a,d){function i(c,l){if(c=f.get(c)){this.el=c;this.rule=new e.storage;this._init(l)}else e.log("\u5b57\u6bb5\u4e0d\u5b58\u5728\u3002")}var g=h.Const.enumvalidsign,k=document;i.Config={required:[true,"\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002"],initerror:"data-showerror"};f.augment(i,{_init:function(c){c=f.merge(i.Config,c||{});f.mix(this,c,"label");this._initfield();this._initVType(c);this._initWarn(c);j.attr(this.el,c.initerror)&&this.showMessage(false,j.attr(this.el,c.initerror))},_initfield:function(){var c=
this.el,l=c.form,m=j.attr(c,"name");if(!("checkbox,radio".indexOf(j.attr(c,"type"))<0)){var n=[];f.each(k.getElementsByName(m),function(p){c.form==l&&n.push(p)});this.el=n}},_initVType:function(c){var l=this,m=l.el,n;for(n in c)l.addRule(n,c[n]);if(c.remote){c=f.isArray(c.remote)?{url:c.remote[0]}:c.remote;var p=new a(m,c,function(q,r){l.showMessage(q,r)});l.addRule("ajax",function(q){return p.check(q)})}},_initWarn:function(c){var l=this,m,n={};if(c.warn){m=f.isFunction(c.warn)?c.warn:d.get(c.warn);
n=f.merge(c,{})}if(c.style&&d.getStyle(c.style)){n=d.getStyle(c.style);m=d.get(n.core);n=f.merge(c,n)}if(m){c=new m(l.el,n);c.on("valid",function(p){return l._validateValue(p.event)});f.mix(l,{warn:c,single:c.single})}else e.log("\u63d0\u793a\u4fe1\u606f\u7c7b\u914d\u7f6e\u9519\u8bef.")},_validateValue:function(){var c=this.rule,l=this._getValue(),m=c.getAll();make=function(q,r){return[r,q]};exec=function(q){q=c.get(q);if(!q)return true;f.isArray(q)||(q=[q]);for(var r=0;r<q.length;r++){var s=q[r].call(this,l);if(!e.isEmpty(s))return s}return true};
if(j.attr(this.el,"disabled")||j.hasClass(this.el,"disabled"))return make(g.ignore,undefined);if(m.depend&&m.depend.call(this,l)!==true)return make(g.ignore,undefined);for(var n in m){if(n=="required")if(this.label&&e.isEmpty(l))return make(g.hint,this.label);if(!("depend".indexOf(n)>-1)){if("ajax".indexOf(n)>-1)break;var p=m[n].call(this,l);if(!e.isEmpty(p)){this._ajaxtimer&&this._ajaxtimer.cancel();return make(g.error,p)}}}if(m.ajax)return m.ajax.call(this,l);return make(g.ok,this.okMsg||"OK")},
_getValue:function(){var c=this.el,l=[];switch(j.attr(c,"type")){case "select-one":l=c[c.selectedIndex].value;break;case "select-multiple":f.each(c,function(m){m.selected&&l.push(m.value)});break;case "radio":case "checkbox":f.each(c,function(m){m.checked&&l.push(m.value)});break;case "file":case "text":case "hidden":case "textarea":case "password":l=c.value}return l},addRule:function(c,l){var m=this.rule;if(f.isFunction(c)){m.add(f.guid(),c);return this}var n=b.get(c,l);if(n){m.add(c,n);return this}},
removeRule:function(c){this.rule.remove(c)},showMessage:function(c,l,m){this.warn.showMessage(c,l,m)},isValid:function(){var c=this._validateValue("submit");this.showMessage(c[1],c[0],"submit");return c[1]!=0}});return i},{requires:["dom","event","./utils","./define","./rule","./rule/remote","./warn"]});KISSY.add("validation/rule",function(f,j,o){return o},{requires:["./utils","./rule/base","./rule/normal"]});
KISSY.add("validation/rule/base",function(f,j,o,e){return new function(){var h=new e.storage;this.add=function(b,a,d){f.isFunction(d)&&h.add(b,{name:b,fun:d,text:a})};this.get=function(b,a){var d=h.get(b);if(!d)return null;var i=d.fun;d=d.text;var g=i.length-1,k=[];if(a)if(f.isArray(a))if(a.length>=g){k.push(a[a.length-1]);k=k.concat(a.slice(0,-1))}else{k.push(d);k=k.concat(a)}else if(g>0){k.push(d);k.push(a)}else k.push(d);else k=[d];return function(c){return i.apply(this,[c].concat(k))}};this.toString=
function(b,a){var d=h.get(b);a=a||"\u3010\u89c4\u5219\u540d\u3011\n {0}\n\n\u3010\u9ed8\u8ba4\u63d0\u793a\u4fe1\u606f\u3011\n {1}\n\n\u3010\u51fd\u6570\u4f53\u3011\n {2}";return d?e.format(a,d.name,d.text,d.fun.toString()):e.format("\u89c4\u5219[{0}]\u4e0d\u5b58\u5728",b)}}},{requires:["dom","event","../utils"]});
KISSY.add("validation/rule/normal",function(f,j,o,e,h){h.add("func","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){b=d.call(this,b);if(b===false)return a;if(!e.isEmpty(b))return b});h.add("regex","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){if(!RegExp(d).test(b))return a});h.add("depend","\u8be5\u5b57\u6bb5\u65e0\u9700\u6821\u9a8c",function(b,a,d){return d.call(this,b)});h.add("ajax","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){return d.call(this,b)});h.add("required","\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002",function(b,a,d){if(f.isArray(b)&&b.length==0)return a;if(e.isEmpty(b)&&d)return a});h.add("equalTo","\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\u3002",function(b,
a,d){if(b!==j.val(f.get(d)))return a});h.add("length","\u5b57\u7b26\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0},\u4e14\u4e0d\u80fd\u5927\u4e8e{1}",function(b,a,d,i,g){b=e.getStrLen(b,g);d=e.toNumber(d);i=e.toNumber(i);if(!(b>=d&&b<=i))return e.format(a,d,i)});h.add("minLength","\u4e0d\u80fd\u5c0f\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,d,i){b=e.getStrLen(b,i);d=e.toNumber(d);if(b<d)return e.format(a,d)});h.add("maxLength","\u4e0d\u80fd\u5927\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,d,i){b=e.getStrLen(b,i);d=e.toNumber(d);if(b>d)return e.format(a,d)});h.add("fiter","\u5141\u8bb8\u7684\u683c\u5f0f{0}\u3002",function(b,a,d){if(!RegExp("^.+.(?=EXT)(EXT)$".replace(/EXT/g,
d.split(/\s*,\s*/).join("|")),"gi").test(b))return e.format(a,d)});h.add("range","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,d,i){d=e.toNumber(d);i=e.toNumber(i);if(b<d||b>i)return e.format(a,d,i)});h.add("group","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,d,i){if(f.isArray(b)){b=b.length;if(!(b>=d&&b<=i))return e.format(a,d,i)}});h.add("trim","\u4e24\u7aef\u4e0d\u80fd\u542b\u6709\u7a7a\u683c\u3002",function(b,a){if(/(^\s+)|(\s+$)/g.test(b))return a});h.add("ltrim","\u5b57\u7b26\u4e32\u6700\u524d\u9762\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(b,a){if(/^\s+/g.test(b))return a});h.add("rtrim","\u5b57\u7b26\u4e32\u672b\u5c3e\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(b,a){if(/\s+$/g.test(b))return a});
f.each([["chinese",/^[\u0391-\uFFE5]+$/,"\u53ea\u80fd\u8f93\u5165\u4e2d\u6587"],["english",/^[A-Za-z]+$/,"\u53ea\u80fd\u8f93\u5165\u82f1\u6587\u5b57\u6bcd"],["currency",/^\d+(\.\d+)?$/,"\u91d1\u989d\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["phone",/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,"\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["mobile",/^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,"\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["url",/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>""])*$/,"url\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684email\u683c\u5f0f"]],function(b){h.add(b[0],b[2],function(a,d){if(!RegExp(b[1]).test(a))return d})})},
{requires:["dom","event","../utils","./base"]});
KISSY.add("validation/rule/remote",function(f,j,o,e){return function(h,b,a){function d(n){return function(p,q,r){if(n==k)if(!p&&!p.state){e.log('\u8fd4\u56de\u6570\u636e\u683c\u5f0f\u9519\u8bef\uff0c\u6b63\u786e\u7684\u683c\u5f0f\u5982\uff1a\n\n {"state": false,"message": "\u63d0\u793a\u4fe1\u606f"}');self.showMessage(0,"\u6821\u9a8c\u5931\u8d25")}else{p.state?a(1,p.message):a(0,p.message);f.isFunction(b.success)&&b.success.call(self,p,q,r)}}}function i(n,p){var q=j.attr(h,"name"),r={type:"POST",dataType:"json",data:{}};f.mix(r,b);r.error=function(s,t,u){f.isFunction(b.error)&&b.success.call(this,s,t,u)};b.data&&f.isFunction(b.data)&&
f.mix(r.data,b.data);r.data[q]=p;r.success=function(s,t,u){c.add(p,{est:s.state,msg:s.message});d(n).call(this,s,t,u)};f.io(r)}var g=null,k=null,c=new e.storage,l=j.attr(h,"name"),m={type:"POST",dataType:"json",data:{}};m.data[l]=null;f.mix(m,b);m.data[l]=null;this.check=function(n){var p=c.get(n);if(p)return[p.msg,p.est];g&&g.cancel();g=f.later(function(){k=f.guid();i(k,n)},500);return["loading",0]}}},{requires:["dom","event","../utils"]});
KISSY.add("validation/utils",function(f,j){var o={toJSON:function(e){try{eval("var result="+e)}catch(h){return null}return result},isEmpty:function(e){return e===null||e===j||e===""},format:function(e){var h=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(b,a){return h[a]})},toNumber:function(e){e=new String(e);e=e.indexOf(".")>-1?parseFloat(e):parseInt(e);return isNaN(e)?0:e},getStrLen:function(e,h){return h?e.replace(/[^\x00-\xFF]/g,"**").length:e.length},log:f.log,
getValue:function(e){var h=function(i){var g=[];f.each(i,function(k){k.checked&&g.push(k.value)})},b=function(i){f.each(i,function(g){if(g.checked)return false});return null},a,d=function(i){var g=[];f.each(i.options,function(k){k.selected&&g.push(k.value)});return g};switch(f.DOM.attr(e,"type").toLowerCase()){case "text":case "hidden":case "textarea":case "password":a=e.value;break;case "select-one":a=e[e.selectedIndex].value;break;case "radio":a=b(f.isArray(e)?e:[e]);break;case "checkbox":a=h(f.isArray(e)?
e:[e]);break;case "select-multiple":a=d(e)}return a},storage:function(){this.cache={}}};f.augment(o.storage,{add:function(e,h,b){var a=this.cache;if(!a[e]||a[e]&&(b==null||b))a[e]=h},remove:function(e){var h=this.cache;h[e]&&delete h[e]},get:function(e){var h=this.cache;return h[e]?h[e]:null},getAll:function(){return this.cache},each:function(e){var h=this.cache,b;for(b in h)if(e.call(this,b,h[b])===false)break}});return o});
KISSY.add("validation/warn",function(f,j,o,e,h,b,a,d){o.extend("Alert",h);o.extend("Static",b);o.extend("Float",a);o.extend("Fixed",d);o.BaseClass=e;return o},{requires:["./utils","./warn/base","./warn/baseclass","./warn/alert","./warn/static","./warn/float","./warn/fixed"]});
KISSY.add("validation/warn/alert",function(f,j,o,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){this.single=true},showMessage:function(a,d){if(a==b.error){this.invalidClass&&j.addClass(this.target,this.invalidClass);alert(d);this.target.focus();return false}else this.invalidClass&&j.removeClass(this.target,this.invalidClass)},style:{alert:{invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/base",function(f,j,o,e,h){var b=new e.storage,a=new e.storage;return{extend:function(d,i){var g=function(l,m){g.superclass.constructor.call(this,l,m)},k=f.isFunction(i)?i():i;if(k.style){for(var c in k.style)this.addStyle(c,f.merge(k.style[c],{core:d}));delete k.style}f.extend(g,h,k);b.add(d,g);return g},addStyle:function(d,i){a.add(d,i)},getStyle:function(d){return a.get(d)},get:function(d){return b.get(d)}}},{requires:["dom","event","../utils","./baseclass"]});
KISSY.add("validation/warn/baseclass",function(f,j,o){function e(h,b){this.target=f.isArray(h)?h[h.length-1]:h;this.el=h;this.single=false;f.mix(this,b||{});this.init()}f.augment(e,f.EventTarget,{init:function(){},_bindEvent:function(h,b,a){switch((j.attr(h,"type")||"input").toLowerCase()){case "radio":case "checkbox":o.on(h,"click",a);break;case "select":case "select-multi":case "file":o.on(h,"change",a);break;default:o.on(h,b,a)}},showMessage:function(){}});return e},{requires:["dom","event"]});
KISSY.add("validation/warn/fixed",function(f,j,o,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){var a=this,d,i,g;d=j.attr(a.target,"data=for");g=j.get(".estate",d);i=j.get(".label",d);f.mix(a,{panel:d,estate:g,label:i});a._bindEvent(a.el,a.event,function(k){var c=a.fire("valid",{event:k.type});f.isArray(c)&&c.length==2&&a.showMessage(c[1],c[0],k.type)})},showMessage:function(a,d){var i=this.panel,g=this.estate,k=this.label;if(this.invalidClass)a==b.ignore&&a==b.ok?j.removeClass(this.el,
this.invalidClass):j.addClass(this.el,this.invalidClass);if(a==b.ignore)j.hide(i);else{var c="error";if(a==b.error)c="error";else if(a==b.ok)c="ok";else if(a==b.hint)c="tip";j.removeClass(g,"ok tip error");j.addClass(g,c);j.html(k,d);j.show(i)}},style:{text1:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur keyup"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/float",function(f,j,o,e,h){var b=h.Const.enumvalidsign;return function(){return{invalidCls:"J_Invalid",init:function(){var a=this,d=a.target,i=j.create(a.template),g=j.get("div.msg",i);f.ready(function(){document.body.appendChild(i)});f.mix(a,{panel:f.one(i),msg:f.one(g)});a._bindEvent(a.el,"focus keyup",function(k){var c=a.fire("valid",{event:k.type});f.isArray(c)&&c.length==2&&a.showMessage(c[1],c[0],k.type,k.target)});o.on(a.el,"focus",function(k){j.hasClass(d,a.invalidCls)&&
a._toggleError(true,k.target)});o.on(a.el,"blur",function(){a._toggleError(false)})},showMessage:function(a,d,i,g){var k=this.target,c=this.msg;if(b.ok==a){j.removeClass(k,this.invalidClass);c.html("OK")}else{i!="submit"&&this._toggleError(true,g);j.addClass(k,this.invalidClass);c.html(d)}},_pos:function(a){a=j.offset(a||this.target);var d=this.panel.height();d=a.top-d-20;this.panel.css("left",a.left-10).css("top",d)},_toggleError:function(a,d){var i=this.panel;if(a){j.show(i);this._pos(d)}else j.hide(i)},
style:{"float":{template:'<div class="valid-float" style="display:none;"><div class="msg">&nbsp;</div><s>\u25e5\u25e4</s></div>',event:"focus blur",invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/static",function(f,j,o,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){var a=this,d=a.target,i,g,k;i=j.create(a.template);k=j.get(".estate",i);g=j.get(".label",i);d.parentNode.appendChild(i);j.hide(i);f.mix(a,{panel:i,estate:k,label:g});a._bindEvent(a.el,a.event,function(c){var l=a.fire("valid",{event:c.type});f.isArray(l)&&l.length==2&&a.showMessage(l[1],l[0],c.type)})},showMessage:function(a,d){var i=this.panel,g=this.estate,k=this.label;if(this.invalidClass)a==
b.ignore&&a==b.ok?j.removeClass(this.el,this.invalidClass):j.addClass(this.el,this.invalidClass);if(a==b.ignore)j.hide(i);else{var c="error";if(a==b.error)c="error";else if(a==b.ok)c="ok";else if(a==b.hint)c="tip";j.removeClass(g,"ok tip error");j.addClass(g,c);j.html(k,d);j.show(i)}},style:{text:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur keyup"},siderr:{template:'<div class="valid-siderr"><p class="estate"><s></s><span class="label"></span></p></div>',
event:"focus blur keyup"},under:{template:'<div class="valid-under"><p class="estate"><span class="label"></span></p></div>',event:"focus blur keyup"},sidebd:{template:'<div class="valid-sidebd"><p class="estate"><span class="label"></span></p></div>',event:"focus blur"}}}}},{requires:["dom","event","../utils","../define"]});KISSY.add("validation",function(f,j){return f.Validation=j},{requires:["validation/base","validation/assets/base.css"]});
