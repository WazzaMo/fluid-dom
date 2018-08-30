/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { Element } from './element'

import * as CONST from './constants'


export class ElementList {
  constructor (arg) {
    var selector = arg.selector
    var tagName = arg.tagName
    var children = arg.children
    var _class = arg.class
    var keyType = undefined
    var matcher
    var parent
    var elementList
    if (!!selector ) {
      elementList = document.querySelectorAll(selector)
      keyType = CONST.DOC_KEY_SELECTOR
      matcher = selector
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
    } else if (!!tagName) {
      elementList = document.getElementsByTagName(tagName)
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
      keyType = CONST.DOC_KEY_TAGNAME
      matcher = tagName
    } else if (!!children) {
      elementList = children,
      parent = arg.parent,
      keyType = CONST.DOC_KEY_CHILDREN
      matcher = 'CHILDREN'
    } else if (!!_class) {
      elementList = document.getElementsByClassName(_class)
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
      keyType = CONST.DOC_KEY_CLASS
      matcher = _class
    } else {
      providesOne(['selector', 'class', 'tagName'], arg)
      elementList = []
    }

    this.elementList  = elementList
    this.parent = parent
    this.docKey = keyType
    this.isSingle = false
    this.docMatcher = matcher
    this.arg  = arg
    this.type = 'ElementList'
  }

  each(doTask) {
    for(var index = 0; index < this.elementList.length; index++) {
      var item = this.elementList[index]
      doTask( new Element({element: item}) )
    }
    return this
  }

  getElementAt(index) {
    var element = this.elementList[index]
    return new Element({element: element})
  }

  length() {
    return this.elementList.length
  }

}
