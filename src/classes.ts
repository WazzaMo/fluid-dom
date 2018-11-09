/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { DomElement } from './dom-element'

export class Classes {
  domElement: any
  element: DomElement

  constructor(domElement: any, elementObject: DomElement) {
    this.element = elementObject
    this.domElement = domElement
  }

  each(task: (className: string)=> void) : Classes {
    for(var _class of this.domElement.classList) {
      task(_class)
    }
    return this
  }
  
  has(name: string) : boolean {
    return this.domElement.classList.contains(name)
  }

  whenHas(name: string, task: (element: DomElement)=> void) : Classes {
    if (this.has(name)) {
      task(this.element)
    }
    return this
  }

  add(_class: string) : Classes {
    if (!! _class && _class.length > 0) {
      this.domElement.classList.add(_class)
    } else {
      console.error(`Class name given was "${_class}" - it must not be empty!`)
    }
    return this
  }

  remove(_class: string) : Classes {
    this.domElement.classList.remove(_class)
    return this
  }

  set(_class: string) : Classes {
    if (! this.has(_class)) {
      this.add(_class)
    }
    return this
  }
}
