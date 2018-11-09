/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { DomElement } from './dom-element'
import { SourceType, Tag } from './constants'
import { ElementSource } from './element-source'
import { ElementListSource } from './element-list-source'
import { EventHandlerInfo } from './event-handler-info';


 // API for Mocking DOM for running specs etc
 // on NodeJS or just to control the mock document.

export interface MockAttributes {
  [key:string] : string
}

export class MockElement {
  tag: string;
  attributes: MockAttributes;
  children: Array<MockElement>;
  text_value: string;

  constructor(tag: string, attribs ?: MockAttributes) {
    this.tag = tag;
    this.attributes = !! attribs ? attribs : {};
    this.text_value = '';
    this.children = [];
  }

  create(
    child_tag: string,
    child_attribs ?: MockAttributes,
    func ?: (mock:MockElement) => MockElement | void
  ) : MockElement {
    let newChild = new MockElement(child_tag, child_attribs);
    this.children.push(newChild);
    if (func) {
      func(newChild);
    }
    return this;
  }

  text(_val: string) {
    this.text_value = _val;
    return this;
  }
}

export class MockDom {
  root_element: MockElement;

  constructor(
    tag: string,
    attribs ?: MockAttributes,
    func ?: (mock:MockElement) => MockElement | void
  ) {
    this.root_element = new MockElement(tag, attribs);
    if (func) {
      func(this.root_element);
    }
  }
}