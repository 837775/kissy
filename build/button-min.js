/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("button/base",function(d,b,c,a){var e=b.create(c.ModelControl,{_handleClick:function(f){e.superclass._handleClick.call(this,f)!==false&&this.fire("click")}},{ATTRS:{value:{},content:{view:true,valueFn:function(){return this.get("view")&&this.get("view").get("content")}},describedby:{view:true},tooltip:{view:true}}});e.DefaultRender=a;return e},{requires:["uibase","component","./customrender"]});
KISSY.add("button/buttonrender",function(d,b,c){return b.create(c.Render,{renderUI:function(){this.get("el").attr("role","button")},_uiSetContent:function(a){this.get("el").html(a)},_uiSetTooltip:function(a){this.get("el").attr("title",a)},_uiSetDescribedby:function(a){this.get("el").attr("aria-describedby",a)}},{ATTRS:{content:{},describedby:{},tooltip:{}},HTML_PARSER:{content:function(a){return a.html()}}})},{requires:["uibase","component"]});
KISSY.add("button/css3render",function(d,b,c){function a(e,f){return d.substitute(f,{prefixCls:e.get("prefixCls"),tag:e.__css_tag})}return b.create(c,{__css_tag:"css3",renderUI:function(){this.get("el").unselectable().addClass(a(this,"{prefixCls}inline-block  {prefixCls}{tag}-button"))},_handleFocus:function(){this.get("el").addClass(a(this,"{prefixCls}{tag}-button-focused"))},_handleBlur:function(){this.get("el").removeClass(a(this,"{prefixCls}{tag}-button-focused"))},_handleMouseEnter:function(){this.get("el").addClass(a(this,
"{prefixCls}{tag}-button-hover"))},_handleMouseLeave:function(){this.get("el").removeClass(a(this,"{prefixCls}{tag}-button-hover"));this._handleMouseUp()},_uiSetDisabled:function(e){var f=this.get("el");e?f.addClass(a(this,"{prefixCls}{tag}-button-disabled")).attr({tabindex:-1,"aria-disabled":true}):f.removeClass(a(this,"{prefixCls}{tag}-button-disabled")).attr({tabindex:0,"aria-disabled":false})},_handleMouseDown:function(){this.get("el").addClass(a(this,"{prefixCls}{tag}-button-active")).attr("aria-pressed",
true)},_handleMouseUp:function(){this.get("el").removeClass(a(this,"{prefixCls}{tag}-button-active")).attr("aria-pressed",false)}})},{requires:["uibase","./buttonrender"]});
KISSY.add("button/customrender",function(d,b,c){return b.create(c,{__css_tag:"custom",renderUI:function(){var a=d.guid("ks-button-labelby");this.get("el").html(d.substitute("<div class='{prefixCls}inline-block {prefixCls}custom-button-outer-box'><div id='{{id}}' class='{prefixCls}inline-block {prefixCls}custom-button-inner-box'></div></div>",{prefixCls:this.get("prefixCls"),id:a})).attr("aria-labelledby",a)},_uiSetContent:function(a){this.get("el").one("div").one("div").html(a||"")}})},{requires:["uibase",
"./css3render"]});KISSY.add("button/nativerender",function(d,b,c){return b.create(c,{_uiSetDisabled:function(a){this.get("el")[0].disabled=a}},{ATTRS:{elTagName:{value:"button"}}})},{requires:["uibase","./buttonrender"]});KISSY.add("button",function(d,b,c){b.Render=c;return b},{requires:["button/base","button/customrender"]});
