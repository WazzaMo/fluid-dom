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
import { Option } from './option';

import {
  IMockDocNode,
  ElementNode,
  MockNodeType,
} from './mock-document-nodes';

export class MockElement implements IElement {
  private _element : Option<ElementNode>;

  constructor(element?: ElementNode) {
    if (element) {
      this._element = new Option<ElementNode>(element);
    } else {
      this._element = new Option<ElementNode>();
    }
    // this._classes = new MockClasses(this);
  }

  isValid(): boolean {
    return this._element.isValid;
  }

  getParent(): IElement {
    if (this._element.isValid) {
      let element = this._element.Value;
      if (element.hasParent()) {
        return new MockElement( element.parent );
      }
    }
    return new MockElement();
  }

  withChildren(callback: (list: IElement[]) => void): IElement {
    if (this._element.isValid) {
      let children = this._element.Value.children;
      if(children && children.length > 0) {
        let mockElements = this.makeElementList(children);
        callback(mockElements);
      }
    }
    return this;
  }

  private makeElementList(
    fromList: Array<IMockDocNode>
  ): Array<MockElement> {
    let elements: Array<ElementNode> = fromList
      .filter( (node:IMockDocNode) => node.nodeType == MockNodeType.ElementNode)
      .map( (elementNode: IMockDocNode) => <ElementNode> elementNode);
    return elements.map( (ele: ElementNode) => new MockElement(ele));
  }

  expect(tagName: string): IElement {
    if (this._element.isValid) {
      let element = this._element.Value;
      if (element.tag.toUpperCase() !== tagName.toUpperCase()) {
        console.trace(`Expected ${tagName} but actual value was ${element.tag}`);
      }
    }
    return this;
  }

  getId(): string | null {
    if (this._element.isValid) {
      let element = this._element.Value;

      let id = element.attrib('id');
      if (id) {
        return id;
      }
    }
    return null;
  }

  hasId(): boolean {
    return !! this.getId();
  }

  exists(): boolean {
    return this._element.isValid;
  }

  findAll(elementListLocation: ElementListSource): IElement[] {
    let results: Array<ElementNode> = [];
    if (elementListLocation.class && this._element.isValid) {
      this._element.Value.queryByClass(elementListLocation.class, results);
      return this.makeElementList(results);
    } else if ( elementListLocation.tagName && this._element.isValid ) {
      this._element.Value.queryByTag(elementListLocation.tagName, results);
      return this.makeElementList(results);
    }
    
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