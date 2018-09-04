/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { providesOne, providesAll } from './util'
import { Element } from './element'
import { ElementList } from './element-list'
import { LocatedBy, Tag } from './constants'
import { ElementLocation } from './element-location'
import { ElementListLocation } from './element-list-location'
import { EventHandlerInfo } from './event-handler-info';

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

export class DOM {
  events: any;

  constructor() {
    this.events = createEventHash()
  }

  findElement(arg: ElementLocation) {
    return new Element(arg)
  }

  findAll(arg: ElementListLocation) {
    return new ElementList(arg)
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
