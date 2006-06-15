/* X Library, Copyright (C) 2001,2002,2003,2004,2005 Michael Foster (Cross-Browser.com). Distributed under the terms of the GNU LGPL */
/* layout2or3_xlib.js compiled with XC v0.22b, see layout2or3_xlib.txt for contributor copyrights, license info and documentation */
var xVersion='4.0',xOp7,xOp5or6,xIE4Up,xIE4,xIE5,xNN4,xMoz,xMac,xUA=navigator.userAgent.toLowerCase();if (window.opera){xOp7=(xUA.indexOf('opera 7')!=-1 || xUA.indexOf('opera/7')!=-1);if (!xOp7) xOp5or6=(xUA.indexOf('opera 5')!=-1 || xUA.indexOf('opera/5')!=-1 || xUA.indexOf('opera 6')!=-1 || xUA.indexOf('opera/6')!=-1);}else if (document.all && xUA.indexOf('msie')!=-1) {xIE4Up=parseInt(navigator.appVersion)>=4;xIE4=xUA.indexOf('msie 4')!=-1;xIE5=xUA.indexOf('msie 5')!=-1;}else if (document.layers) {xNN4=true;}xMoz=xUA.indexOf('gecko')!=-1;xMac=xUA.indexOf('mac')!=-1;function xGetElementById(e){if(typeof(e)!='string') return e;if(document.getElementById) e=document.getElementById(e);else if(document.all) e=document.all[e];else e=null;return e;}function xStr(s){for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])!='string') return false;}return true;}function xScrollLeft(e, bWin){var offset=0;if (!xDef(e) || bWin) {var w = e || window;if(w.document.documentElement && w.document.documentElement.scrollLeft) offset=w.document.documentElement.scrollLeft;else if(w.document.body && xDef(w.document.body.scrollLeft)) offset=w.document.body.scrollLeft;}else {e = xGetElementById(e);if (e && xNum(e.scrollLeft)) offset = e.scrollLeft;}return offset;}function xScrollTop(e, bWin){var offset=0;if (!xDef(e) || bWin) {var w = e || window;if(w.document.documentElement && w.document.documentElement.scrollTop) offset=w.document.documentElement.scrollTop;else if(w.document.body && xDef(w.document.body.scrollTop)) offset=w.document.body.scrollTop;}else {e = xGetElementById(e);if (e && xNum(e.scrollTop)) offset = e.scrollTop;}return offset;}function xHeight(e,h){if(!(e=xGetElementById(e))) return 0;if (xNum(h)) {if (h<0) h = 0;else h=Math.round(h);}else h=-1;var css=xDef(e.style);if(css && xDef(e.offsetHeight) && xStr(e.style.height)) {if(h>=0) {var pt=0,pb=0,bt=0,bb=0;if (document.compatMode=='CSS1Compat') {var gcs = xGetComputedStyle;pt=gcs(e,'padding-top',1);if (pt != null) {pb=gcs(e,'padding-bottom',1);bt=gcs(e,'border-top-width',1);bb=gcs(e,'border-bottom-width',1);}else if(xDef(e.offsetHeight,e.style.height)){e.style.height=h+'px';pt=e.offsetHeight-h;}}h-=(pt+pb+bt+bb);if(isNaN(h)||h<0) return;else e.style.height=h+'px';}h=e.offsetHeight;}else if(css && xDef(e.style.pixelHeight)) {if(h>=0) e.style.pixelHeight=h;h=e.style.pixelHeight;}return h;}function xClientWidth(){var w=0;if(xOp5or6) w=window.innerWidth;else if(document.compatMode == 'CSS1Compat' && !window.opera && document.documentElement && document.documentElement.clientWidth)w=document.documentElement.clientWidth;else if(document.body && document.body.clientWidth)w=document.body.clientWidth;else if(xDef(window.innerWidth,window.innerHeight,document.height)) {w=window.innerWidth;if(document.height>window.innerHeight) w-=16;}return w;}function xClientHeight(){var h=0;if(xOp5or6) h=window.innerHeight;else if(document.compatMode == 'CSS1Compat' && !window.opera && document.documentElement && document.documentElement.clientHeight)h=document.documentElement.clientHeight;else if(document.body && document.body.clientHeight)h=document.body.clientHeight;else if(xDef(window.innerWidth,window.innerHeight,document.width)) {h=window.innerHeight;if(document.width>window.innerWidth) h-=16;}return h;}function xAddEventListener(e,eT,eL,cap){if(!(e=xGetElementById(e))) return;eT=eT.toLowerCase();if((!xIE4Up && !xOp7 /* && !xMoz */) && e==window) {if(eT=='resize') { window.xPCW=xClientWidth(); window.xPCH=xClientHeight(); window.xREL=eL; xResizeEvent(); return; }if(eT=='scroll') { window.xPSL=xScrollLeft(); window.xPST=xScrollTop(); window.xSEL=eL; xScrollEvent(); return; }}var eh='e.on'+eT+'=eL';if(e.addEventListener) e.addEventListener(eT,eL,cap);else if(e.attachEvent) e.attachEvent('on'+eT,eL);else eval(eh);}function xResizeEvent(){if (window.xREL) setTimeout('xResizeEvent()', 250);var cw = xClientWidth(), ch = xClientHeight();if (window.xPCW != cw || window.xPCH != ch) { window.xPCW = cw; window.xPCH = ch; if (window.xREL) window.xREL(); }}function xScrollEvent(){if (window.xSEL) setTimeout('xScrollEvent()', 250);var sl = xScrollLeft(), st = xScrollTop();if (window.xPSL != sl || window.xPST != st) { window.xPSL = sl; window.xPST = st; if (window.xSEL) window.xSEL(); }}function xGetComputedStyle(oEle, sProp, bInt){var s, p = 'undefined';var dv = document.defaultView;if(dv && dv.getComputedStyle){s = dv.getComputedStyle(oEle,'');if (s) p = s.getPropertyValue(sProp);}else if(oEle.currentStyle) {var a = sProp.split('-');sProp = a[0];for (var i=1; i<a.length; ++i) {c = a[i].charAt(0);sProp += a[i].replace(c, c.toUpperCase());}   p = oEle.currentStyle[sProp];}else return null;return bInt ? (parseInt(p) || 0) : p;}function xShow(e) {return xVisibility(e,1);}function xDef(){for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])=='undefined') return false;}return true;}function xNum(){for(var i=0; i<arguments.length; ++i){if(isNaN(arguments[i]) || typeof(arguments[i])!='number') return false;}return true;}function xVisibility(e, bShow){if(!(e=xGetElementById(e))) return null;if(e.style && xDef(e.style.visibility)) {if (xDef(bShow)) e.style.visibility = bShow ? 'visible' : 'hidden';return e.style.visibility;}return null;}