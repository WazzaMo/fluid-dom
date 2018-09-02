/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { providesOne, providesAll, logWarning } from './util'
import { Attributes } from './attributes'
import { Classes } from './classes'
import { ElementList } from './element-list'

import { ElementLocation } from './element-location'

import { LocatedBy } from './constants';
import { ElementListLocation } from './element-list-location';
import { EventHandlerInfo } from './event-handler-info';

export class Element {
  domElement: any
  locatedBy: LocatedBy
  parent: Element
  type  = 'Element'
  elementLocation: ElementLocation
  isSingle = true
  isValid: boolean

  private elementPassed(elementLocation: ElementLocation) : void{
    this.domElement = elementLocation.domElement
    this.locatedBy = LocatedBy.ConstructedWithElement
    this.isValid = !! this.domElement
  }

  private idPassed(id: string) : void {
    this.locatedBy = LocatedBy.Id
    this.domElement = document.getElementById(id)
    this.isValid = !!this.domElement
  }

  private selectorPassed(selector: string) : void {
    this.domElement = document.querySelector(selector)
    this.locatedBy = LocatedBy.Selector;
    this.isValid = !!this.domElement
  }

  private nullElement(elementLocation: ElementLocation) : void {
    this.domElement = {
      tagName: `NO MATCH by ${elementLocation}`,
      parentElement: undefined,
      innerHTML: undefined,
      innerText: undefined
    }
    this.locatedBy = LocatedBy.FailedToLocate
  }

  constructor (elementLocation: ElementLocation) {
    var id = elementLocation.id
    var selector = elementLocation.selector
    var domElement : any = elementLocation.domElement
    
    this.locatedBy = LocatedBy.FailedToLocate
    this.isValid = false
    if (!!domElement) {
      this.elementPassed(elementLocation)
    } else if (!!id) {
      this.idPassed(id)
    } else if (!!selector) {
      this.selectorPassed(selector)
    } else {
      providesOne(['id', 'selector'], elementLocation)
      this.nullElement(elementLocation)
      this.isValid = false
    }
    if (!this.isValid) {
      logWarning(`Element to be matched by ${this.locatedBy} was not valid`)
    }
    this.parent   = this.isValid ? this.domElement.parentElement : undefined
    this.type     = 'Element'
    this.elementLocation      = elementLocation
    this.isSingle = true
  }

  children() : ElementList {
    return new ElementList({
      children: this.domElement.children
    })
  }

  eachChild(doWith: (e:Element)=>void) : Element {
    for(var child of this.domElement.children) {
      var childElement = new Element({domElement: child})
      doWith(childElement)
    }
    return this
  }

  expect(tagName: string) : Element{
    if (this.domElement.tagName !== tagName) {
      console.error(`Expected ${tagName} but Actual ${this.domElement.tagName}`)
    }
    return this
  }

  getId() {
    return this.attributes().get('id')
  }

  getParent() {
    return new Element({domElement: this.domElement.parentElement})
  }

  hasId() {
    return this.attributes().has('id')
  }

  exists() {
    return this.isValid
  }

  findAll(elementListLocation: ElementListLocation) : ElementList {
    return new ElementList(elementListLocation)
  }

  selectFirst(selector: string) : Element {
    var domElement = this.domElement.querySelector(selector)
    if (!domElement) {
      var fullSelector = `${this.selectorPath()}>${selector}`
      return new Element({selector: fullSelector}) 
    } else {
      return new Element({selector: selector})
    }
  }

  selectorPath() : string {
    var domElement = this.domElement
    var isValid = (e:any) => (!! e)
    var nodeList = []
    while(isValid(domElement)) {
      var _id = domElement.getAttribute('id')
      var _class = domElement.getAttribute('class')
      if (_id) {
        nodeList.push( '#'+_id )
        domElement = null // break out
      } else {
        if (_class) {
          nodeList.push( '.'+_class )
        } else {
          nodeList.push( domElement.tagName )
        }
        domElement = domElement.parentElement
      }
    }
    nodeList.reverse()
    return nodeList.reduce( (parent,child) => `${parent}>${child}` )
  }

  tagName() : string {
    return this.isValid ? this.domElement.tagName : 'UNKNOWN'
  }

  text(_text ?: string) : Element | string {
    if (!!_text) {
      this.domElement.innerText = _text
      return this
    }
    return this.domElement.innerText
  }

  html(_html ?: string) : Element | string {
    if (!! _html) {
      this.domElement.innerHTML = _html
      return this
    } else {
      return this.domElement.innerHTML
    }
  }

  append(_html: string) : Element{
    var totalHtml = `${this.html()}${_html}`
    this.html(totalHtml)
    return this
  }

  prepend(_html: string) : Element {
    var totalHtml = `${_html}${this.html()}`
    this.html(totalHtml)
    return this
  }

  remove() : undefined {
    this.domElement.remove()
    return undefined
  }

  attributes() {
    return new Attributes(this.domElement)
  }

  classes() {
    return new Classes(this.domElement, this)
  }

  on(args: EventHandlerInfo) {
    if (providesAll(['event','handler'], args)) {
      var event = args.event
      var handler = args.handler
      var optKeepDefault = args.keepDefault
      this.domElement.addEventListener(event, function(firedEvent: any) {
        if (! optKeepDefault) {
          firedEvent.preventDefault()
        }
        handler(firedEvent)
      })
    }
  }

  value() : string | undefined {
    if (this.domElement['value'] != undefined) {
      return this.domElement.value
    }
    return undefined
  }
}