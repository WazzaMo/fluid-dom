/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { providesOne, providesAll, logWarning } from './util'
import { Element } from './element'

import * as CONST from './constants'

function convertToListOfElements(htmlList) {
  var list = []
  if (!! htmlList) {
    for(var member of htmlList) {
      var element = new Element({element: member})
      list.push(element)
    }
  }
  return list
}

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

    function selectList() {
      elementList = document.querySelectorAll(selector)
      keyType = CONST.DOC_KEY_SELECTOR
      matcher = selector
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
    }

    function tagList() {
      elementList = document.getElementsByTagName(tagName)
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
      keyType = CONST.DOC_KEY_TAGNAME
      matcher = tagName
    }

    function childList() {
      elementList = children,
      parent = arg.parent,
      keyType = CONST.DOC_KEY_CHILDREN
      matcher = 'CHILDREN'
    }

    function classList() {
      elementList = document.getElementsByClassName(_class)
      parent = elementList.length > 0 ? elementList[0].parentElement : undefined
      keyType = CONST.DOC_KEY_CLASS
      matcher = _class
    }

    if (!!selector ) {
      selectList()
    } else if (!!tagName) {
      tagList()
    } else if (!!children) {
      childList()
    } else if (!!_class) {
      classList()
    } else {
      providesOne(['selector', 'class', 'tagName'], arg)
      elementList = []
    }

    this.elementList = convertToListOfElements(elementList)
    this.parent = !! parent ? new Element({element:parent}) : undefined
    this.docKey = keyType
    this.isSingle = false
    this.docMatcher = matcher
    this.arg  = arg
    this.type = 'ElementList'
  }

  each(doTask) {
    for(var index = 0; index < this.elementList.length; index++) {
      var item = this.elementList[index]
      doTask( item )
    }
    return this
  }

  getElementAt(index) {
    return this.elementList[index]
  }

  map(func) {
    return this.elementList.map(func)
  }

  filter(func) {
    return this.elementList.filter(func)
  }

  reduce(func) {
    return this.elementList.reduce(func)
  }
}

