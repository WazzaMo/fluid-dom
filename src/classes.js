/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export class Classes {

  constructor(element, elementObject) {
    this.elementObject = elementObject
    this.element = element
  }

  each(task) {
    for(var _class of this.element.classList) {
      task(_class)
    }
    return this
  }
  
  has(name) {
    return this.element.classList.contains(name)
  }

  whenHas(name, task) {
    if (this.has(name)) {
      task(elementObject)
    }
    return this
  }

  add(_class) {
    if (!! _class && _class.length > 0) {
      this.element.classList.add(_class)
    } else {
      console.error(`Class name given was "${_class}" - it must not be empty!`)
    }
    return this
  }

  remove(_class) {
    this.element.classList.remove(_class)
  }

  set(_class) {
    if (! this.has(_class)) {
      this.add(_class)
    }
    return this
  }
}
