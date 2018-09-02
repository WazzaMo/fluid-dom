/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { providesOne, providesAll, logWarning } from './util'
import { Element } from './element'
import { ElementLocation } from './element-location'
import { ElementListLocation } from './element-list-location'
import { LocatedBy } from './constants'



export class ElementList {
  elementListLocation: ElementListLocation
  elementList : Array<Element>
  locatedBy: LocatedBy
  isSingle: boolean
  type: string

  private convertToListOfElements(htmlList: any) : Array<Element> {
    var list = []
    if (!! htmlList) {
      for(var member of htmlList) {
        var element = new Element({domElement: member})
        list.push(element)
      }
    }
    return list
  }

  private selectList(selector: string) {
    this.elementList = this.convertToListOfElements(
      document.querySelectorAll(selector)
    )
    this.locatedBy = LocatedBy.Selector
  }

  private tagList(tagName: string) {
    this.elementList = this.convertToListOfElements(
      document.getElementsByTagName(tagName)
    )
    this.locatedBy = LocatedBy.TagName
  }

  private childList(children: any) {
    this.elementList = this.convertToListOfElements( children )
    this.locatedBy = LocatedBy.ConstructedWithChildren
  }

  private classList(_class: string) {
    this.elementList = this.convertToListOfElements(
      document.getElementsByClassName(_class)
    )
    this.locatedBy = LocatedBy.Class
  }

  constructor (elementListLocation : ElementListLocation ) {
    var selector = elementListLocation.selector
    var tagName = elementListLocation.tagName
    var children = elementListLocation.children
    var _class = elementListLocation.class

    this.elementListLocation = elementListLocation
    this.elementList = Array<Element>()
    this.locatedBy = LocatedBy.FailedToLocate

    if (selector != undefined ) {
      this.selectList(selector)
    } else if (!!tagName) {
      this.tagList(tagName)
    } else if (!!children) {
      this.childList(children)
    } else if (!!_class) {
      this.classList(_class)
    } else {
      providesOne(['selector', 'class', 'tagName'], elementListLocation)
      this.elementList = []
    }

    this.isSingle = false
    this.type = 'ElementList'
  }

  each(doTask: (e: Element) => void) : ElementList {
    for(var index = 0; index < this.elementList.length; index++) {
      doTask( this.getElementAt(index) )
    }
    return this
  }

  getElementAt(index: number): Element {
    return this.elementList[index]
  }

  map(func: (e:Element)=>Array<any>) : Array<any> {
    return this.elementList.map(func)
  }

  filter(func: (e:Element)=> Array<Element>) {
    return this.elementList.filter(func)
  }

  reduce(func: (e:Element)=> Element) {
    return this.elementList.reduce(func)
  }
}

