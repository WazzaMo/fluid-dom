/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IElement } from './i-element';
import { IClasses } from './i-classes';

/**
 * # MockClasses
 * 
 * Representation of classes on a mock element.
 */
export class MockClasses implements IClasses {
  private classNames: Array<string>;
  private element: IElement;

  constructor(element: IElement) {
    this.classNames = [];
    this.element = element;
  }

  internalGetClassValue() : string {
    return this.classNames.reduce( (a:string, b: string) => `${a} ${b}`);
  }

  forEach(callback: (className: string) => void): IClasses {
    this.classNames.forEach( callback );
    return this;
  }

  has(name: string): boolean {
    return this.classNames.includes( name );
  }

  whenHas(name: string, callback: (element: IElement) => void): IClasses {
    if (this.has(name)) {
      callback(this.element);
    }
    return this;
  }

  add(_class: string): IClasses {
    if (! this.has(_class)) {
      this.classNames.push(_class);
    }
    return this;
  }

  remove(_class: string): IClasses {
    if (this.has(_class)) {
      let index = this.classNames.indexOf(_class);
      let before = this.classNames.slice(0, index);
      let after = this.classNames.slice(index);
      this.classNames = before.concat(after);
    }
    return this;
  }

  set(_class: string): IClasses {
    return this.add(_class);
  }
}