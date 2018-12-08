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

import { NonElement } from './non-element';

import {
  IMockDocNode,
  ElementNode,
  MockNodeType,
  TextNode,
} from './mock-document-nodes';

import { MockSelectorParser } from './mock-selector-parser';
import { empty_array } from './util';

export class MockElement implements IElement {
  private _element : Option<ElementNode>;
  private _selector_parser: Option<MockSelectorParser>;

  constructor(element?: ElementNode) {
    if (element) {
      this._element = new Option<ElementNode>(element);
      this._selector_parser = new Option<MockSelectorParser>(new MockSelectorParser(element));
    } else {
      this._element = new Option<ElementNode>();
      this._selector_parser = new Option<MockSelectorParser>();
    }
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
        throw new Error(`Expected ${tagName} but actual value was ${element.tag}`);
      }
    }
    return this;
  }

  getId(): string | null {
    if (this._element.isValid) {
      let element = this._element.Value;

      let id = element.id();
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

  findAll(elementListSource: ElementListSource): IElement[] {
    let results: Array<ElementNode> = [];
    if (elementListSource.class && this._element.isValid) {
      this._element.Value.queryByClass(elementListSource.class, results);
      
      return this.makeElementList(results);
    } else if ( elementListSource.tagName && this._element.isValid ) {
      this._element.Value.queryByTag(elementListSource.tagName, results);
      return this.makeElementList(results);
    } else if ( elementListSource.selector && this._selector_parser.isValid ) {
      let parser = this._selector_parser.Value;
      let outcome = parser.parseWith(elementListSource.selector);
      return this.makeElementList(outcome);
    }
    
    throw new Error("Method not implemented.");
  }
  
  selectFirst(selector: string): IElement {
    if (this._selector_parser.isValid) {
      let parser = this._selector_parser.Value;
      let results = parser.parseWith(selector);
      if (results.length > 0) {
        return new MockElement(results[0]);
      }
    }
    return new MockElement();
  }

  selectorPath(): string {
    throw new Error("Method not implemented.");
  }

  tagName(): string {
    if (this._element.isValid) {
      return this._element.Value.tag.toUpperCase();
    }
    throw new Error("Null MockElement - no tagName");
  }

  text(_text?: string | undefined): string | IElement {
    if (! _text && this._element.isValid) {
      let element = this._element.Value;
      let text_summary: string = '';
      for(var node of element.children) {
        if (node.nodeType === MockNodeType.ElementNode) {
          let child : ElementNode= <ElementNode>node;
          let childElement = new MockElement(child);
          text_summary += childElement.text();
        } else {
          text_summary += node.text_value + '\n';
        }
      }
      return text_summary;
    } else if (this._element.isValid) {
      let node = new TextNode(_text);
      empty_array( this._element.Value.children );
      this._element.Value.children.push(node);
      return this;
    }
    return new NonElement();
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

  toString(): string {
    let element: ElementNode;
    if (this._element.isValid) {
      element = this._element.Value;
      return element.toString();
    }
    return 'NULL-MockElement';
  }
}