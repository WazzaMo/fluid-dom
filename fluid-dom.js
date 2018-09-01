/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { providesOne, providesAll } from './src/util'
import { Element } from './src/element'
import { ElementList } from './src/element-list'
import * as CONST from './src/constants'


const eventlist = [
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
  var events = {}
  for(var ev of eventlist) {
    var key = ev.toUpperCase()
    events[key] = ev
  }
  return events
}

export class DOM {
  constructor() {
    this.events = createEventHash()
  }

  findElement(arg) {
    return new Element(arg)
  }

  findAll(arg) {
    return new ElementList(arg)
  }

  buttonOn(arg) {
    if (providesAll(['id', 'event', 'handler'],arg)) {
      var id = arg.id
      var button = this.findElement({id: id}).expect(CONST.TAG_BUTTON)
      button.on(arg)
    }
  }
}

export const Events = {}

for(var event of eventlist) {
  Events[event.toUpperCase()] = event
}
