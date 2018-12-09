/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
//

export {
  ElementNode,
  TextNode,
  MockNodeType,
  IElementNodeFactory
} from './mock-document-nodes';

export { MockDocument, Doc } from './mock-document';
export { MockSelectorParser } from './mock-selector-parser';

export { MockElement } from './mock-element';
export { MockAttributes } from './mock-attributes';
export { MockClasses } from './mock-classes';
import { Tag, EventSet, createEventSet } from './constants';

export * from './selector-lexer';


/**
 * List of events for convenience with intelli-sense.
 */
export const Events: EventSet = createEventSet();

