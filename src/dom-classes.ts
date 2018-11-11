/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IElement } from './i-element';
import { DomElement } from './dom-element';
import { IClasses } from './i-classes';

/**
 * # DomClasses
 * 
 * An implementation of the IClasses interface that allows operations
 * to be performed on DOM objects in a browser.
 */
export class DomClasses implements IClasses {
  htmlElement: Element;
  element: DomElement;

  constructor(_element: Element, elementObject: DomElement) {
    this.element = elementObject;
    this.htmlElement = _element;
  }

  forEach(task: (className: string)=> void) : IClasses {
    for(var _class of this.htmlElement.classList) {
      task(_class)
    }
    return this;
  }
  
  has(name: string) : boolean {
    return this.htmlElement.classList.contains(name);
  }

/**
 * Calls the given function if-and-only-if the named class is on the element.
 * The function is called with the (fluid) element object to allow things to
 * be done with it. Returns self.
 * @param name- HTML class name to seek
 * @param callback- callback to run to manipulate the element if present. 
 */
  whenHas(name: string, callback: (element: IElement)=> void) : IClasses {
    if (this.has(name)) {
      callback(this.element);
    }
    return this;
  }

  add(_class: string) : IClasses {
    if (!! _class && _class.length > 0) {
      if (this.htmlElement) {
        this.htmlElement.classList.add(_class);
      } else {
        throw Error(`Can't edit classes on DomElement that provides no HTMLElement.`);
      }
    } else {
      console.error(`Class name given was "${_class}" - it must not be empty!`)
    }
    return this
  }

  remove(_class: string) : IClasses {
    this.htmlElement.classList.remove(_class)
    return this
  }

  set(_class: string) : IClasses {
    if (! this.has(_class)) {
      this.add(_class)
    }
    return this
  }
}
