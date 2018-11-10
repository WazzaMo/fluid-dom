/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IElement } from './i-element';
import { IAttributes } from './i-attributes';
import { IClasses } from './i-classes';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';

import { NonAttributes } from './non-attributes';
import { NonClasses } from './non-classes';


/**
 * Represents a non-element. To be returned in answer
 * for an element but one cannot be provided.
 */
export class NonElement implements IElement {

  constructor() {}

  isValid(): boolean {
    return false;
  }
  
  getParent(): IElement {
    return this;
  }

  withChildren(callback: (list: IElement[]) => void): IElement {
    return this;
  }

  expect(tagName: string): IElement {
    return this;
  }

  getId(): string | null {
    return null;
  }

  hasId(): boolean {
    return false;
  }

  exists(): boolean {
    return false;
  }

  findAll(elementListLocation: ElementListSource): IElement[] {
    return [];
  }

  selectFirst(selector: string): IElement {
    return this;
  }

  selectorPath(): string {
    return '';
  }

  tagName(): string {
    return '';
  }

  text(_text?: string | undefined): string | IElement {
    if (_text) {
      return this;
    } else {
      return '';
    }
  }

  html(_html?: string | undefined): string | IElement {
    if (_html) {
      return this;
    } else {
      return '';
    }
  }

  append(_html: string): IElement {
    return this;
  }

  prepend(_html: string): IElement {
    return this;
  }

  remove(): undefined {
    return undefined;
  }

  attributes(): IAttributes {
    return new NonAttributes();
  }

  classes(): IClasses {
    return new NonClasses();
  }
  on(args: EventHandlerInfo): void {  }

  value(): string | undefined {
    return undefined;
  }
}