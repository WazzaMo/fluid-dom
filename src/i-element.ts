/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IAttributes } from './i-attributes';
import { IClasses } from './i-classes';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';


export interface IElement {
  isValid(): boolean;
  getParent(): IElement;

  withChildren(callback: (list:Array<IElement>)=>void) : IElement;

  expect(tagName: string) : IElement;

  getId() : string;

  getParent(): IElement;

  hasId() : boolean;

  exists() : boolean;

  findAll(elementListLocation: ElementListSource) : Array<IElement>;

  selectFirst(selector: string) : IElement;

  selectorPath() : string;

  tagName() : string;

  text(_text ?: string) : IElement | string;

  html(_html ?: string) : IElement | string;

  append(_html: string) : IElement;

  prepend(_html: string) : IElement;

  remove() : undefined;

  attributes() : IAttributes;

  classes() : IClasses;

  on(args: EventHandlerInfo) : void;

  value() : string | undefined;
}