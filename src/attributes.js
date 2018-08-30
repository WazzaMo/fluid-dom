/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export class Attributes {
  constructor(element) {
    this.element = element
  }

  each(task) {
    for(var attribute of this.element.attributes) {
      task(attribute.name, attribute.value)
    }
    return this
  }

  attributeNames() {
    var list = []
    this.each( (name,val) => list.push(name))
    return list
  }

  set(name, value) {
    this.element.setAttribute(name, value)
    return this
  }

  with(name, task) {
    var value = this.get(name)
    task(value)
    return this
  }

  get(name) {
    return this.element.getAttribute(name)
  }

  has(name) {
    return this.element.getAttribute(name) != null
  }

  remove(name) {
    this.element.removeAttribute(name)
    return this
  }
}
