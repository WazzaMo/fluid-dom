/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import {
  ElementNode,
  IMockNodeAttributes,
  MockNodeType,
  IMockDocNode
} from './mock-document-nodes';

import {
  AttribInfo,
  SelectorLexer,
  SelectorToken
} from './selector-lexer';
import { match } from 'minimatch';

type ElementOrNot = ElementNode | undefined;
type CollectorFilter = (element: ElementNode, root: ElementNode) => ElementOrNot;

function hasTag(selector: SelectorToken) : boolean { return !! selector._tag; }

function isTagMatch(selector:SelectorToken | undefined, element: ElementNode) : boolean {
  return !! selector ? (element.tag.toUpperCase() === selector._tag) : false;
}

function hasAttribute(selector: SelectorToken) : boolean { return !! selector._attrib && selector._attrib.length> 0; }

function isAttributeMatch( selector: SelectorToken | undefined, element: ElementNode) : boolean {
  if (!! selector && selector._attrib && selector._attrib.length > 0) {
    let isMatch = true;
    for(var index = 0; index < selector._attrib.length && isMatch; index++) {
      let attr = selector._attrib[index];
      let {name, value} = attr;
      let element_attr = element.attrib(name);
      if (element_attr && value) {
        isMatch = isMatch && element_attr === value;
      } else {
        isMatch = isMatch && !! element_attr;
      }
    }
    return isMatch;
  }
  return false;
}

function isSelectorMatch(selector: SelectorToken | undefined, element: ElementNode) : boolean {
  if (!! selector) {
    let isMatch: boolean = true;
    if (hasTag( selector) ) {
      isMatch = isMatch && isTagMatch(selector, element);
    }
    if (hasAttribute(selector)) {
      isMatch = isMatch && isAttributeMatch(selector, element);
    }
    return isMatch;
  } else {
    return false;
  }
}

function MakeTagFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    return isTagMatch(selector, element) ? element : undefined;
  }
}

function MakeAttributeFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    return isAttributeMatch(selector, element) ? element : undefined;
  }
}

function hasChild(selector: SelectorToken) : boolean { return !! selector._child; }

function ListElementsFromDescendentToRoot(descendent: ElementNode, root: ElementNode) : Array<ElementNode> {
  let list: Array<ElementNode> = [];
  let current = descendent;

  while(!!current && current != root && (!!current.parent) ) {
    list.push(current);
    current = current.parent;
  }
  return list;
}

function ListSelectorTokensLeafChildToRoot(root: SelectorToken): Array<SelectorToken> {
  let tokens : Array<SelectorToken> = [];
  let current : SelectorToken | undefined = root;

  while(!!current ) {
    tokens.push(current);
    current = current._child;
  }
  return tokens.reverse();
}

function MakeParentChildFilter(selector: SelectorToken) : CollectorFilter {
  let selectorChain = ListSelectorTokensLeafChildToRoot(selector);

  return (element: ElementNode, root: ElementNode) => {
    let descendentToRoot = ListElementsFromDescendentToRoot(element, root);
    if (selectorChain.length > descendentToRoot.length) {
      return undefined;
    } else {
      let isOkToContinue = true;

      for(var index = 0; isOkToContinue && index < selectorChain.length; index++) {
        let tokenToMatch = selectorChain[index];
        let elementToCheck = descendentToRoot[index];

        isOkToContinue = isSelectorMatch(tokenToMatch, elementToCheck);
      }
      return isOkToContinue ? element : undefined;
    }
  }
}

function MakeSingleElementFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    return isSelectorMatch(selector, element) ? element : undefined;
  }
}

function MakeSingleSelectorFilter(selector: SelectorToken) : CollectorFilter {

  // if ( hasTag( selector ) && ! hasChild( selector) ) {
  //   return MakeTagFilter(selector);
  // }
  if ( hasChild(selector) ) {
    return MakeParentChildFilter(selector);
  } else {
    return MakeSingleElementFilter(selector);
  }
  return (e: ElementNode) => { return undefined;};
}

function MakeSelectorListFilter(selectors: Array<SelectorToken>) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    let isMatch : ElementOrNot = undefined;
    let filters = selectors.map( (sel: SelectorToken) => MakeSingleSelectorFilter(sel));
    for( var index = 0; ! isMatch && index< filters.length; index++) {
      isMatch = filters[index](element, root);
    }
    return isMatch;
  }
}

function getElementChildrenFrom(element: ElementNode) : Array<ElementNode> {
  return element.children
        .filter( (node: IMockDocNode) => node.nodeType === MockNodeType.ElementNode)
        .map( (element: IMockDocNode) => <ElementNode> element);
}

function selector(
  filter: CollectorFilter,
  collection: Array<ElementNode>,
  root: ElementNode,
  current: ElementNode | undefined
) : void {
  if (current) {
    let collectable = filter(current, root);
    if (!! collectable) {
      collection.push( collectable );
    }
    let children : Array<ElementNode> = getElementChildrenFrom(current);
    for(var child of children) {
      selector(filter, collection, root, child);
    }
  }
}


/**
 * Parses a selector to create a parse plan that can be
 * executed using the @see parseWith method.
 */
export class MockSelectorParser {
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  parseWith(element: ElementNode) : Array<ElementNode> {
    let list : Array<ElementNode> = [];
    let lexer = new SelectorLexer();
    lexer.lex_selector(this.selector);

    let filter = MakeSelectorListFilter(lexer.tokens);

    selector(filter, list, element, element);
    return list;
  }
}