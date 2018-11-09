/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { providesOne, providesAll } from './util'
import { DomElement } from './dom-element'
import { SourceType, Tag } from './constants'
import { ElementListSource } from './element-list-source'
import { EventHandlerInfo } from './event-handler-info';
import { IElement } from './i-element';
import { ElementSource } from './element-source';



const EVENT_LIST = [
  'abort', 'afterscriptexecute',
  'animationcancel', 'animationend', 'animationiteration',
  'auxclick',
  'beforescriptexecute', 'blur',
  'change', 'click', 'close', 'contextmenu',
  'dblclick',
  'error',
  'focus', 'fullscreenchange', 'fullscreenerror',
  'gotpointercapture',
  'input',
  'keydown', 'keypress', 'keyup',
  'load', 'loadend', 'loadstart', 'lostpointercapture',
  'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
  'offline', 'online',
  'pointercancel', 'pointerdown', 'pointerenter', 'pointerleave',
  'pointermove', 'pointerout', 'pointerover', 'pointerup', 
  'reset', 'resize',
  'scroll', 'select', 'selectionchange', 'selectionchange',
  'selectstart', 'submit', 
  'touchcancel', 'touchmove', 'touchstart',
  'transitioncancel', 'transitionend',
  'visibilitychange',
  'wheel'
]

function createEventHash() {
  var events : any = {}
  for(var ev of EVENT_LIST) {
    var key = ev.toUpperCase()
    events[key] = ev
  }
  return events
}

export { Http } from './http';
export { HttpMethod } from "./http-method";
export { HttpResponseType } from "./http-response-type";
export { HttpProtocol } from "./http-protocol";
export { HttpResponse } from "./http-response";


export class DOM {
  events: any;

  constructor() {
    this.events = createEventHash()
  }

  findElement(arg: ElementSource) : IElement {
    let id = arg['id'];
    if (id) {
      return DomElement.getElementFromId(id);
    }

    let selector = arg['selector'];
    if (selector) {
      return  DomElement.getElementFromSelector(selector);
    }
    return DomElement.nullElement();
  }

  findAll(arg: ElementListSource) : Array<IElement> {
    let selector = arg['selector'];
    if(selector) {
      return DomElement.getListFromSelector(selector);
    }

    let _class = arg['class'];
    if (_class) {
      return DomElement.getListFromClass(_class);
    }

    let tagName = arg['tagName'];
    if (tagName) {
      return DomElement.getListFromTagName(tagName);
    }

    return [];
  }

  buttonOn(eventInfo: EventHandlerInfo) {
    if (providesAll(['id', 'event', 'handler'],eventInfo)) {
      var id = eventInfo.id
      var button = this.findElement({id: id}).expect(Tag.Button)
      button.on(eventInfo)
    }
  }

}

export const Events : any = {}

for(var event of EVENT_LIST) {
  Events[event.toUpperCase()] = event
}

