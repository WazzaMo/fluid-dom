/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


export enum Tag {
  Button = 'BUTTON',
  Div = 'DIV',
  Input = 'INPUT',
  Paragraph = 'P'
}

export const EVENT_LIST = [
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
];