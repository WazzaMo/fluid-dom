//  Fluid-DOM v 1.1.3
"use strict";function providesAll(e,t){var s="";for(var r of e){null!=t[r]||(s+=`Value for ${r} was not provided.\n`)}return!s||(console.error(`Expected ${e.length} parameters:\n${s}`),!1)}function providesOne(e,t){var s=e.filter(e=>void 0===t[e]).length===e.length-1;if(s){var r=e.reduce((e,t)=>`${e}, ${t}`);console.error(`One of these parameters were expected ${r} but none had a hasValue!`)}return s}function logWarning(e){console.warn("FluidDOM: "+e)}Object.defineProperty(exports,"__esModule",{value:!0});class Attributes{constructor(e){this.domElement=e}each(e){for(var t of this.domElement.attributes)e(t.name,t.value);return this}attributeNames(){var e=new Array;for(var t of this.domElement.attributes)e.push(t);return e}add(e,t){return this.set(e,t)}set(e,t){return this.domElement.setAttribute(e,t),this}with(e,t){return t(this.get(e)),this}get(e){return this.domElement.getAttribute(e)}has(e){return null!=this.domElement.getAttribute(e)}remove(e){return this.domElement.removeAttribute(e),this}}class Classes{constructor(e,t){this.element=t,this.domElement=e}each(e){for(var t of this.domElement.classList)e(t);return this}has(e){return this.domElement.classList.contains(e)}whenHas(e,t){return this.has(e)&&t(this.element),this}add(e){return e&&e.length>0?this.domElement.classList.add(e):console.error(`Class name given was "${e}" - it must not be empty!`),this}remove(e){return this.domElement.classList.remove(e),this}set(e){return this.has(e)||this.add(e),this}}var LocatedBy,Tag;!function(e){e.FailedToLocate="Failed to locate",e.Id="id",e.Selector="selector",e.Class="class",e.TagName="tagName",e.ConstructedWithElement="from given element",e.ConstructedWithChildren="from given list of children"}(LocatedBy||(LocatedBy={})),function(e){e.Button="BUTTON",e.Div="DIV",e.Input="INPUT",e.Paragraph="P"}(Tag||(Tag={}));class ElementList{convertToListOfElements(e){var t=[];if(e)for(var s of e){var r=new Element({domElement:s});t.push(r)}return t}constructor(e){var t=e.selector,s=e.tagName,r=e.children,n=e.class;this.elementListLocation=e,this.elementList=Array(),this.locatedBy=LocatedBy.FailedToLocate,null!=t?this.selectList(t):s?this.tagList(s):r?this.childList(r):n?this.classList(n):(providesOne(["selector","class","tagName"],e),this.elementList=[]),this.isSingle=!1,this.type="ElementList"}each(e){for(var t=0;t<this.elementList.length;t++)e(this.getElementAt(t));return this}getElementAt(e){return this.elementList[e]}map(e){return this.elementList.map(e)}filter(e){return this.elementList.filter(e)}reduce(e){return this.elementList.reduce(e)}length(){return this.elementList.length}selectList(e){this.elementList=this.convertToListOfElements(document.querySelectorAll(e)),this.locatedBy=LocatedBy.Selector}tagList(e){this.elementList=this.convertToListOfElements(document.getElementsByTagName(e)),this.locatedBy=LocatedBy.TagName}childList(e){this.elementList=this.convertToListOfElements(e),this.locatedBy=LocatedBy.ConstructedWithChildren}classList(e){this.elementList=this.convertToListOfElements(document.getElementsByClassName(e)),this.locatedBy=LocatedBy.Class}}class Element{constructor(e){this.type="Element",this.isSingle=!0;var t=e.id,s=e.selector,r=e.domElement;this.locatedBy=LocatedBy.FailedToLocate,this.isValid=!1,r?this.elementPassed(e):t?this.idPassed(t):s?this.selectorPassed(s):(providesOne(["id","selector"],e),this.nullElement(e),this.isValid=!1),this.isValid||logWarning(`Element to be matched by ${this.locatedBy} was not valid`),this.parent=this.isValid?this.domElement.parentElement:void 0,this.type="Element",this.elementLocation=e,this.isSingle=!0}elementPassed(e){this.domElement=e.domElement,this.locatedBy=LocatedBy.ConstructedWithElement,this.isValid=!!this.domElement}idPassed(e){this.locatedBy=LocatedBy.Id,this.domElement=document.getElementById(e),this.isValid=!!this.domElement}selectorPassed(e){this.domElement=document.querySelector(e),this.locatedBy=LocatedBy.Selector,this.isValid=!!this.domElement}nullElement(e){this.domElement={tagName:`NO MATCH by ${e}`,parentElement:void 0,innerHTML:void 0,innerText:void 0},this.locatedBy=LocatedBy.FailedToLocate}children(){return new ElementList({children:this.domElement.children})}eachChild(e){for(var t of this.domElement.children){e(new Element({domElement:t}))}return this}expect(e){return this.domElement.tagName!==e&&console.error(`Expected ${e} but Actual ${this.domElement.tagName}`),this}getId(){return this.attributes().get("id")}getParent(){return new Element({domElement:this.domElement.parentElement})}hasId(){return this.attributes().has("id")}exists(){return this.isValid}findAll(e){return new ElementList(e)}selectFirst(e){if(this.domElement.querySelector(e))return new Element({selector:e});var t=`${this.selectorPath()}>${e}`;return new Element({selector:t})}selectorPath(){for(var e=this.domElement,t=e=>!!e,s=[];t(e);){var r=e.getAttribute("id"),n=e.getAttribute("class");r?(s.push("#"+r),e=null):(n?s.push("."+n):s.push(e.tagName),e=e.parentElement)}return s.reverse(),s.reduce((e,t)=>`${e}>${t}`)}tagName(){return this.isValid?this.domElement.tagName:"UNKNOWN"}text(e){return e?(this.domElement.innerText=e,this):this.domElement.innerText}html(e){return e?(this.domElement.innerHTML=e,this):this.domElement.innerHTML}append(e){var t=`${this.html()}${e}`;return this.html(t),this}prepend(e){var t=`${e}${this.html()}`;return this.html(t),this}remove(){this.domElement.remove()}attributes(){return new Attributes(this.domElement)}classes(){return new Classes(this.domElement,this)}on(e){if(providesAll(["event","handler"],e)){var t=e.event,s=e.handler,r=e.keepDefault;this.domElement.addEventListener(t,function(e){r||e.preventDefault(),s(e)})}}value(){if(null!=this.domElement.value)return this.domElement.value}}!function(e){e.CONNECT="CONNECT",e.DELETE="DELETE",e.GET="GET",e.HEAD="HEAD",e.OPTIONS="OPTIONS",e.PATCH="PATCH",e.POST="POST",e.PUT="PUT",e.TRACE="TRACE"}(exports.HttpMethod||(exports.HttpMethod={})),function(e){e.TEXT="text",e.ARRAYBUFFER="arraybuffer",e.BLOB="blob",e.DOCUMENT="document",e.JSON="json"}(exports.HttpResponseType||(exports.HttpResponseType={})),function(e){e.HTTP="http",e.HTTPS="https",e.FILE="file"}(exports.HttpProtocol||(exports.HttpProtocol={}));class Http{constructor(){this.protocol=exports.HttpProtocol.HTTP,this.port=void 0,this.hostname="",this.requestHeaders=[],this.path="",this.method=exports.HttpMethod.GET,this.body=void 0,this.uploadData=void 0,this.responseType=exports.HttpResponseType.TEXT,this.timeoutMS=1e3}host(e,t,s){return this.hostname=t,this.port=s,this.protocol=e,this}header(e,t){return this.requestHeaders.push({name:e,value:t}),this}expectedData(e){return this.responseType=e,this}timeoutAt(e){return this.timeoutMS=e,this}context(e){let t=new Http;return t.protocol=this.protocol,t.port=this.port,t.hostname=this.hostname,t.requestHeaders=(new Array).concat(this.requestHeaders),t.path=this.path,t.method=this.method,t.body=this.body,t.uploadData=this.uploadData,t.responseType=this.responseType,e(t),this}call(e,t,s){this.method=e,this.path=t,this.body=s,this.syncPortAndProtocol();let r=this.port?`:${this.port}`:"",n=`${this.protocol}://${this.hostname}${r}${t}`,o=this.createRequestTo(n),i=this.setHandlers(o);return this.addAnyHeaders(o),o.send(this.body),i}syncPortAndProtocol(){(this.protocol==exports.HttpProtocol.HTTP&&80==this.port||this.protocol==exports.HttpProtocol.HTTPS&&443==this.port||this.protocol==exports.HttpProtocol.FILE)&&(this.port=void 0)}createRequestTo(e){let t=new XMLHttpRequest;return t.timeout=this.timeoutMS,t.open(this.method,e),t}setErrorHandlers(e,t){e.onabort=(()=>{t("Request Aborted")}),e.ontimeout=(()=>{t("Timed out")}),e.onerror=(()=>{t("Error occurred.")})}createResponseObject(e){let t=e.getAllResponseHeaders().split("\r\n").map(e=>{let t=e.split(":");return t&&2==t.length?{name:t[0],value:t[1]}:void 0}).filter(e=>null!=e),s={};for(var r in t){let e=t[r];e&&(s[e.name]=e.value)}return{status:e.status,type:e.responseType,body:e.response,headers:s}}setOnCompleteHandler(e,t,s){e.onreadystatechange=(()=>{4==e.readyState&&(200==e.status?t(this.createResponseObject(e)):s(`Returned HTTP ${e.status}`))})}addAnyHeaders(e){if(this.requestHeaders.length>0)for(var t of this.requestHeaders)e.setRequestHeader(t.name,t.value)}setHandlers(e){return new Promise((t,s)=>{this.setErrorHandlers(e,s),this.setOnCompleteHandler(e,t,s)})}}const EVENT_LIST=["abort","afterscriptexecute","animationcancel","animationend","animationiteration","auxclick","beforescriptexecute","blur","change","click","close","contextmenu","dblclick","error","focus","fullscreenchange","fullscreenerror","gotpointercapture","input","keydown","keypress","keyup","load","loadend","loadstart","lostpointercapture","mousedown","mousemove","mouseout","mouseover","mouseup","offline","online","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup","reset","resize","scroll","select","selectionchange","selectionchange","selectstart","submit","touchcancel","touchmove","touchstart","transitioncancel","transitionend","visibilitychange","wheel"];function createEventHash(){var e={};for(var t of EVENT_LIST){e[t.toUpperCase()]=t}return e}class DOM{constructor(){this.events=createEventHash()}findElement(e){return new Element(e)}findAll(e){return new ElementList(e)}buttonOn(e){if(providesAll(["id","event","handler"],e)){var t=e.id;this.findElement({id:t}).expect(Tag.Button).on(e)}}}const Events={};for(var event of EVENT_LIST)Events[event.toUpperCase()]=event;exports.DOM=DOM,exports.Events=Events,exports.Http=Http;

