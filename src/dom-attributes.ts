/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IAttributes } from './i-attributes';
import { IElement } from './i-element';

function cast( attr: DomAttributes) : IAttributes {
  return <IAttributes> (<unknown> attr);
}

export class DomAttributes implements IAttributes {
  private _webElement: Element;

  constructor(_webElement: Element) {
    this._webElement = _webElement;
  }

  each(callback: (name:string, value:string)=> void) {
    for(var attribute of this._webElement.attributes) {
      callback(attribute.name, attribute.value);
    }
    return this;
  }

  attributeNames() : Array<string> {
    var list = new Array<string>()

    for(var attr of this._webElement.attributes) {
      list.push( attr.name);
    }
    return list;
  }

  add(name: string, value: any) : IAttributes {
    return this.set(name, value);
  }

  set(name: string, value: any) : IAttributes {
    this._webElement.setAttribute(name, value)
    return this;
  }

  with(name: string, callback: (value:string | null) => void): IAttributes {
    var value = this.get(name);
    callback(value)
    return this;
  }

  get(name: string): string | null {
    return this._webElement.getAttribute(name);
  }

  has(name: string): boolean {
    return this._webElement.getAttribute(name) != null;
  }

  remove(name: string) : IAttributes {
    this._webElement.removeAttribute(name);
    return this;
  }
}
