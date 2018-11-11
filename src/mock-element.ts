/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IAttributes } from './i-attributes';
import { IClasses } from './i-classes';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';
import { IElement } from './i-element';

import { MockAttributeSet, MockAttributes } from './mock-attributes';
import { MockClasses } from './mock-classes';

import {
  IMockDocNode,
  ElementNode,
} from './mock-document-nodes';

export class MockElement implements IElement {
  private _attributes: MockAttributeSet;
  private _classes: MockClasses;
  private _tag: string;
  private _children: Array<MockElement>;
  private _text_value: string;
  private _parent: IElement;

  constructor(tag: string, parent: IElement) {
    this._tag = tag;
    this._attributes = {};
    this._classes = new MockClasses(this);
    this._children = [];
    this._text_value = '';
    this._parent = parent;
  }

  isValid(): boolean {
    return true;
  }

  getParent(): IElement {
    return this._parent;
  }

  withChildren(callback: (list: IElement[]) => void): IElement {
    if(this._children.length > 0) {
      callback(this._children);
    }
    return this;
  }

  expect(tagName: string): IElement {
    if (this._tag.toUpperCase() !== tagName.toUpperCase()) {
      console.trace(`Expected ${tagName} but actual value was ${this._tag}`);
    }
    return this;
  }

  getId(): string | null {
    let id = this._attributes['id'];
    if (id) {
      return id;
    }
    return null;
  }

  hasId(): boolean {
    return !! this._attributes['id'];
  }

  exists(): boolean {
    return true;
  }

  findAll(elementListLocation: ElementListSource): IElement[] {
    throw new Error("Method not implemented.");
  }
  selectFirst(selector: string): IElement {
    throw new Error("Method not implemented.");
  }
  selectorPath(): string {
    throw new Error("Method not implemented.");
  }
  tagName(): string {
    throw new Error("Method not implemented.");
  }
  text(_text?: string | undefined): string | IElement {
    throw new Error("Method not implemented.");
  }
  html(_html?: string | undefined): string | IElement {
    throw new Error("Method not implemented.");
  }
  append(_html: string): IElement {
    throw new Error("Method not implemented.");
  }
  prepend(_html: string): IElement {
    throw new Error("Method not implemented.");
  }
  remove(): undefined {
    throw new Error("Method not implemented.");
  }
  attributes(): IAttributes {
    throw new Error("Method not implemented.");
  }
  classes(): IClasses {
    throw new Error("Method not implemented.");
  }
  on(args: EventHandlerInfo): void {
    throw new Error("Method not implemented.");
  }
  value(): string | undefined {
    throw new Error("Method not implemented.");
  }
}