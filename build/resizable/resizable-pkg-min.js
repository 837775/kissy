/*
Copyright 2010, KISSY UI Library v1.1.7dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("resizable",function(j){for(var q=j.Draggable,r=j.Node,l={t:function(a,b,c,d,e,f,g,h,i){a=Math.min(Math.max(c,h-i),d);return[0,a,e+h-a,0]},b:function(a,b,c,d,e,f,g,h,i){return[0,Math.min(Math.max(c,h+i),d),0,0]},r:function(a,b,c,d,e,f,g,h,i,k){return[Math.min(Math.max(a,g+k),b),0,0,0]},l:function(a,b,c,d,e,f,g,h,i,k){a=Math.min(Math.max(a,g-k),b);return[a,0,0,f+g-a]}},m=["l","r"],p=["t","b"],n=0;n<m.length;n++)for(var o=0;o<p.length;o++)(function(a,b){l[a+b]=l[b+a]=function(){for(var c=
l[a].apply(this,arguments),d=l[b].apply(this,arguments),e=[],f=0;f<c.length;f++)e[f]=c[f]||d[f];return e}})(m[n],p[o]);m=j.UIBase.create([],{renderUI:function(){var a=this.get("node");this.dds={};a.css("position")=="static"&&a.css("position","relative")},_uiSetHandlers:function(a){var b=this.dds,c=this.get("node");this.destructor();for(var d=0;d<a.length;d++){var e=a[d];el=(new r("<div class='ke-resizehandler ke-resizehandler-"+e+"'>")).prependTo(c);e=b[e]=new q({node:el});e.on("drag",this._drag,
this);e.on("dragstart",this._dragStart,this)}},_dragStart:function(){var a=this.get("node");this._width=a.width();this._top=parseInt(a.css("top"));this._left=parseInt(a.css("left"));this._height=a.height()},_drag:function(a){var b=this.get("node"),c=a.currentTarget||a.target,d=this._getHanderC(c),e=this._width,f=this._height,g=this.get("minWidth"),h=this.get("maxWidth"),i=this.get("minHeight"),k=this.get("maxHeight");a=l[d](g,h,i,k,this._top,this._left,e,f,a.top-c.startNodePos.top,a.left-c.startNodePos.left);
c=["width","height","top","left"];for(d=0;d<c.length;d++)a[d]&&b.css(c[d],a[d])},_getHanderC:function(a){var b=this.dds,c;for(c in b){if(!b.hasOwnProperty(c))break;if(b[c]==a)return c}},destructor:function(){var a=this.dds,b;for(b in a){if(!a.hasOwnProperty(b))break;a[b].destroy();a[b].get("node").remove();delete a[b]}}},{ATTRS:{node:{setter:function(a){return j.one(a)}},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},handlers:{value:[]}}});
j.Resizable=m},{requires:["dd"]});
