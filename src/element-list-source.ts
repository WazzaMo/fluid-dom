/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IElement } from './i-element';

export interface ElementListSource {
  selector ?: string;
  tagName ?: string;
  class ?: string;
  children ?: any;
  parent?: IElement;
  mock ?: boolean;
}