/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IClasses } from './i-classes';
import { IElement } from './i-element';

/**
 * # NonClasses
 * 
 * Is a nil-effect IClasses instance to return
 * in any situation where the IElement implementation
 * cannot provide a backing for the style classes from
 * a document.
 */
export class NonClasses implements IClasses {
  constructor() {}

  each(callback: (className: string) => void): IClasses {
    return this;
  }
  
  has(name: string): boolean {
    return false;
  }

  whenHas(name: string, callback: (element: IElement) => void): IClasses {
    return this;
  }

  add(_class: string): IClasses {
    return this;
  }

  remove(_class: string): IClasses {
    return this;
  }

  set(_class: string): IClasses {
    return this;
  }
}
