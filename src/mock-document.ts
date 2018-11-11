
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

export { MockElement } from './mock-element';
export { MockAttributeSet, MockAttributes } from './mock-attributes';
export { MockClasses } from './mock-classes';

function toBase64(num: number) : string {
  let strNum = `${num}`;
  let base64 : string;
  try {
    // Browser
    base64 = btoa(strNum);
  } catch(e) {
    // NodeJS
    let buffer = Buffer.from(strNum);
    base64 = buffer.toString('base64');
  }
  return base64;
}

function getTimeId() : number {
  let timeId = new Date().getTime();
  return timeId;
}

function getRandomId() : number {
  const SCALE = 1000;
  return Math.floor(Math.random() * SCALE);
}

// function MakeNodeRef() : NodeRef {
//   let timeId = toBase64( getTimeId() );
//   let randId = toBase64( getRandomId() );
//   return { node_id: `${randId}-${timeId}` };
// }

/**
 * # MockDocument
 */
export class MockDocument implements IElementNodeFactory {
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
    id?: string | undefined,
    callback?: ((mock: ElementNode) => void ) | undefined
  ): IElementNodeFactory {
    this.root_node.create_child_element(child_tag, id, callback);
    return this;
  }

  toHtml() : string {
    return toHtml(this.root_node);
  }
}

