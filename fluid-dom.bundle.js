var fluid=function(e){"use strict";function t(e,t){var s="";for(var n of e){null!=t[n]||(s+=`Value for ${n} was not provided.\n`)}return!s||(console.error(`Expected ${e.length} parameters:\n${s}`),!1)}function s(e,t){var s=e.filter(e=>void 0===t[e]).length===e.length-1;if(s){var n=e.reduce((e,t)=>`${e}, ${t}`);console.error(`One of these parameters were expected ${n} but none had a hasValue!`)}return s}class n{constructor(e){this.domElement=e}each(e){for(var t of this.domElement.attributes)e(t.name,t.value);return this}attributeNames(){var e=new Array;for(var t of this.domElement.attributes)e.push(t);return e}set(e,t){return this.domElement.setAttribute(e,t),this}with(e,t){return t(this.get(e)),this}get(e){return this.domElement.getAttribute(e)}has(e){return null!=this.domElement.getAttribute(e)}remove(e){return this.domElement.removeAttribute(e),this}}class i{constructor(e,t){this.element=t,this.domElement=e}each(e){for(var t of this.domElement.classList)e(t);return this}has(e){return this.domElement.classList.contains(e)}whenHas(e,t){return this.has(e)&&t(this.element),this}add(e){return e&&e.length>0?this.domElement.classList.add(e):console.error(`Class name given was "${e}" - it must not be empty!`),this}remove(e){return this.domElement.classList.remove(e),this}set(e){return this.has(e)||this.add(e),this}}var r,l;!function(e){e.FailedToLocate="Failed to locate",e.Id="id",e.Selector="selector",e.Class="class",e.TagName="tagName",e.ConstructedWithElement="from given element",e.ConstructedWithChildren="from given list of children"}(r||(r={})),function(e){e.Button="BUTTON",e.Div="DIV",e.Input="INPUT",e.Paragraph="P"}(l||(l={}));class o{convertToListOfElements(e){var t=[];if(e)for(var s of e){var n=new a({domElement:s});t.push(n)}return t}selectList(e){this.elementList=this.convertToListOfElements(document.querySelectorAll(e)),this.locatedBy=r.Selector}tagList(e){this.elementList=this.convertToListOfElements(document.getElementsByTagName(e)),this.locatedBy=r.TagName}childList(e){this.elementList=this.convertToListOfElements(e),this.locatedBy=r.ConstructedWithChildren}classList(e){this.elementList=this.convertToListOfElements(document.getElementsByClassName(e)),this.locatedBy=r.Class}constructor(e){var t=e.selector,n=e.tagName,i=e.children,l=e.class;this.elementListLocation=e,this.elementList=Array(),this.locatedBy=r.FailedToLocate,null!=t?this.selectList(t):n?this.tagList(n):i?this.childList(i):l?this.classList(l):(s(["selector","class","tagName"],e),this.elementList=[]),this.isSingle=!1,this.type="ElementList"}each(e){for(var t=0;t<this.elementList.length;t++)e(this.getElementAt(t));return this}getElementAt(e){return this.elementList[e]}map(e){return this.elementList.map(e)}filter(e){return this.elementList.filter(e)}reduce(e){return this.elementList.reduce(e)}}class a{constructor(e){this.type="Element",this.isSingle=!0;var t,n=e.id,i=e.selector,l=e.domElement;this.locatedBy=r.FailedToLocate,this.isValid=!1,l?this.elementPassed(e):n?this.idPassed(n):i?this.selectorPassed(i):(s(["id","selector"],e),this.nullElement(e),this.isValid=!1),this.isValid||(t=`Element to be matched by ${this.locatedBy} was not valid`,console.warn("FluidDOM: "+t)),this.parent=this.isValid?this.domElement.parentElement:void 0,this.type="Element",this.elementLocation=e,this.isSingle=!0}elementPassed(e){this.domElement=e.domElement,this.locatedBy=r.ConstructedWithElement,this.isValid=!!this.domElement}idPassed(e){this.locatedBy=r.Id,this.domElement=document.getElementById(e),this.isValid=!!this.domElement}selectorPassed(e){this.domElement=document.querySelector(e),this.locatedBy=r.Selector,this.isValid=!!this.domElement}nullElement(e){this.domElement={tagName:`NO MATCH by ${e}`,parentElement:void 0,innerHTML:void 0,innerText:void 0},this.locatedBy=r.FailedToLocate}children(){return new o({children:this.domElement.children})}eachChild(e){for(var t of this.domElement.children){e(new a({domElement:t}))}return this}expect(e){return this.domElement.tagName!==e&&console.error(`Expected ${e} but Actual ${this.domElement.tagName}`),this}getId(){return this.attributes().get("id")}getParent(){return new a({domElement:this.domElement.parentElement})}hasId(){return this.attributes().has("id")}exists(){return this.isValid}findAll(e){return new o(e)}selectFirst(e){if(this.domElement.querySelector(e))return new a({selector:e});var t=`${this.selectorPath()}>${e}`;return new a({selector:t})}selectorPath(){for(var e=this.domElement,t=e=>!!e,s=[];t(e);){var n=e.getAttribute("id"),i=e.getAttribute("class");n?(s.push("#"+n),e=null):(i?s.push("."+i):s.push(e.tagName),e=e.parentElement)}return s.reverse(),s.reduce((e,t)=>`${e}>${t}`)}tagName(){return this.isValid?this.domElement.tagName:"UNKNOWN"}text(e){return e?(this.domElement.innerText=e,this):this.domElement.innerText}html(e){return e?(this.domElement.innerHTML=e,this):this.domElement.innerHTML}append(e){var t=`${this.html()}${e}`;return this.html(t),this}prepend(e){var t=`${e}${this.html()}`;return this.html(t),this}remove(){this.domElement.remove()}attributes(){return new n(this.domElement)}classes(){return new i(this.domElement,this)}on(e){if(t(["event","handler"],e)){var s=e.event,n=e.handler,i=e.keepDefault;this.domElement.addEventListener(s,function(e){i||e.preventDefault(),n(e)})}}value(){if(null!=this.domElement.value)return this.domElement.value}}const h=["abort","afterscriptexecute","animationcancel","animationend","animationiteration","auxclick","beforescriptexecute","blur","change","click","close","contextmenu","dblclick","error","focus","fullscreenchange","fullscreenerror","gotpointercapture","input","keydown","keypress","keyup","load","loadend","loadstart","lostpointercapture","mousedown","mousemove","mouseout","mouseover","mouseup","offline","online","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup","reset","resize","scroll","select","selectionchange","selectionchange","selectstart","submit","touchcancel","touchmove","touchstart","transitioncancel","transitionend","visibilitychange","wheel"];const m={};for(var d of h)m[d.toUpperCase()]=d;return e.DOM=class{constructor(){this.events=function(){var e={};for(var t of h)e[t.toUpperCase()]=t;return e}()}findElement(e){return new a(e)}findAll(e){return new o(e)}buttonOn(e){if(t(["id","event","handler"],e)){var s=e.id;this.findElement({id:s}).expect(l.Button).on(e)}}},e.Events=m,e}({});