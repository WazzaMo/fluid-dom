/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { providesOne, providesAll } from './util'
import { Attributes } from './attributes'
import { Classes } from './classes'
import { ElementList } from './element-list'

import * as CONST from './constants'

export class Element {

  constructor (arg) {
    var id = arg.id
    var selector = arg.selector
    var keyType = undefined
    var matcher
    var element = arg.element
    var isValid

    if (!!element) {
      keyType = CONST.DOC_KEY_ELEMENT
      matcher = 'ELEMENT: ' + element.tagName
      isValid = !!element
    } else if (!!id) {
      keyType = CONST.DOC_KEY_ID
      element = document.getElementById(id)
      matcher = id
      isValid = !!element
    } else if (!!selector) {
      keyType = CONST.DOC_KEY_SELECTOR
      matcher = selector
      element = document.querySelector(selector)
      isValid = !!element
    } else {
      providesOne(['id', 'selector'], arg)
      isValid = false
      element = {
        tagName: `NO MATCH by ${arg}`,
        parentElement: undefined,
        innerHTML: undefined,
        innerText: undefined
      }
    }
    this.docKey   = keyType
    this.docMatcher = matcher
    this.element  = element
    this.parent   = isValid ? element.parentElement : undefined
    this.value    =  isValid ? element.value : undefined
    this.type     = 'Element'
    this.arg      = arg
    this.isSingle = true
  }

  children() {
    return new ElementList({
      children: this.element.children,
      parent: this.element
    })
  }

  expect(tagName) {
    if (this.element.tagName === tagName) {
      return this
    } else {
      console.error(`Expected ${tagName} but Actual ${element.tagName}`)
    }
  }

  getId() {
    return this.attributes().get('id')
  }

  getParent() {
    return new Element({element: this.element.parentElement})
  }

  hasId() {
    return this.attributes().has('id')
  }

  exists() {
    return isValid
  }

  selectAll(selector) {
    var elementList = this.element.querySelectorAll(selector)
    return new ElementList({children: elementList, parent: this.element})
  }

  selectFirst(selector) {
    if (typeof(selector) === 'string') {
      var element = this.element.querySelector(selector)
      if (!element) {
        console.error(`Selector ${selector} did not match an element`)
        return undefined
      }
      return new Element({element: element})
    } else {
      console.error(`Not a valid selector string: ${JSON.stringify(selector)}`)
      return undefined
    }
  }

  selectorPath() {
    var element = this.element
    var isValid = (e) => (!! e)
    var nodeList = []
    while(isValid(element)) {
      var _id = element.getAttribute('id')
      var _class = element.getAttribute('class')
      if (_id) {
        nodeList.push( '#'+_id )
        element = null // break out
      } else {
        if (_class) {
          nodeList.push( '.'+_class )
        } else {
          nodeList.push( element.tagName )
        }
        element = element.parentElement
      }
    }
    nodeList.reverse()
    return nodeList.reduce( (parent,child) => `${parent}>${child}` )
  }

  tagName() {
    return this.element.tagName
  }

  text(_text) {
    if (!!_text) {
      this.element.innerText = _text
      return this
    }
    return this.element.innerText
  }

  html(_html) {
    if (!! _html) {
      this.element.innerHTML = _html
      return this
    } else {
      return this.element.innerHTML
    }
  }

  append(_html) {
    var totalHtml = `${this.html()}${_html}`
    this.html(totalHtml)
    return this
  }

  prepend(_html) {
    var totalHtml = `${_html}${this.html()}`
    this.html(totalHtml)
    return this
  }

  remove() {
    this.element.remove()
    return undefined
  }

  attributes() {
    return new Attributes(this.element)
  }

  classes() {
    return new Classes(this.element, this)
  }

  on(args) {
    if (providesAll(['event','handler'], args)) {
      var event = args.event
      var handler = args.handler
      var optKeepDefault = args.keepDefault
      this.element.addEventListener(event, function(firedEvent) {
        if (! optKeepDefault) {
          firedEvent.preventDefault()
        }
        handler(firedEvent)
      })
    }
  }

}