/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

 /**
  * @type ElementSource
  * Represents optional parameters for DOM.findElement()
  */
export interface ElementSource {
  id ?: string
  selector ?: string
  // domElement ?: any
}