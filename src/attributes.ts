/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export class Attributes {
  domElement: any

  constructor(domElement: any) {
    this.domElement = domElement
  }

  each(task: (name:string, value:string)=> void) {
    for(var attribute of this.domElement.attributes) {
      task(attribute.name, attribute.value)
    }
    return this
  }

  attributeNames() : Array<string> {
    var list = new Array<string>()

    for(var name of this.domElement.attributeNames) {
      list.push(name)
    }
    return list
  }

  set(name: string, value: string) : Attributes {
    this.domElement.setAttribute(name, value)
    return this
  }

  with(name: string, task: (value:string) => void): Attributes {
    var value = this.get(name)
    task(value)
    return this
  }

  get(name: string): string {
    return this.domElement.getAttribute(name)
  }

  has(name: string): boolean {
    return this.domElement.getAttribute(name) != null
  }

  remove(name: string) : Attributes {
    this.domElement.removeAttribute(name)
    return this
  }
}
