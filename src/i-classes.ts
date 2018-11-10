/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IElement } from './i-element';

/**
 * # IClasses
 * 
 * Represents a container of class names attached to an element.
 * 
 * @see DomClasses for a concrete implementation for the DOM.
 */
export interface IClasses {
  /**
   * Iterate through each HTML class.
   * @param callback - called with the name of the class as the parameter. 
   */
  each(callback: (className: string)=> void) : IClasses;
  
  has(name: string) : boolean;

  /**
   * Calls the given function if-and-only-if the named class is on the element.
   * The function is called with the (fluid) element object to allow things to
   * be done with it. Returns self.
   * @param name- HTML class name to seek
   * @param callback- callback to run to manipulate the element if present. 
   */
  whenHas(name: string, callback: (element: IElement)=> void) : IClasses;

  /**
   * Adds the class name to the element.
   * @param _class HTML class name to add.
   */
  add(_class: string) : IClasses;

  /** Removes an HTML class name from an element. */
  remove(_class: string) : IClasses;

  /**
   * An alternate name for 'add.'
   * @param _class HTML class name.
   * @see add
   */
  set(_class: string) : IClasses;
}