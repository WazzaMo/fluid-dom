
/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import {
  IMockDocNode,
  IMockNodeAttributes,
  ElementNode,
  MockNodeType,
  TextNode,
  IElementNodeFactory,
  toHtml
} from './mock-document-nodes';

import { IFluidDocument } from './i-fluid-document';

import { IElement } from './i-element';
import { ElementSource } from './element-source';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';

export { MockElement } from './mock-element';
export { MockAttributeSet, MockAttributes } from './mock-attributes';
export { MockClasses } from './mock-classes';
export { MockSelectorParser } from './mock-selector-parser';

export { ElementNode };

/**
 * # MockDocument
 */
export class MockDocument implements IElementNodeFactory, IFluidDocument {
  root_node: ElementNode;

  constructor() {
    this.root_node = new ElementNode( 'HTML' );
  }

  create_child_text(text: string): IElementNodeFactory {
    this.root_node.create_child_text(text);
    return this;
  }

  create_child_element(
    child_tag: string,
    callback: ((mock: ElementNode) => void ) | undefined
  ): IElementNodeFactory {
    this.root_node.create_child_element(child_tag, callback);
    return this;
  }

  toHtml() : string {
    return toHtml(this.root_node);
  }

  findElement(arg: ElementSource): IElement {
    throw new Error("Method not implemented.");
  }

  findAll(arg: ElementListSource): IElement[] {
    throw new Error("Method not implemented.");
  }

  buttonOn(eventInfo: EventHandlerInfo): void {
    throw new Error("Method not implemented.");
  }
}

export function Doc() : IFluidDocument {
  return new MockDocument();
}