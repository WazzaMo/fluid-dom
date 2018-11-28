/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import {
  ElementNode,
  IMockNodeAttributes,
  MockNodeType,
  IMockDocNode,
  getElementChildrenFrom
} from './mock-document-nodes';

import {
  AttribInfo,
  SelectorLexer,
  SelectorToken,
  selectorTokentoString
} from './selector-lexer';

import {
  merge_array,
  empty_array
} from './util';


enum MatchResults {
  NoMatch = 'no-match',
  AncestorMatch = 'ancestor-element-match',
  TargetMatch = 'target-element-match',
  AncestorMismatch = 'ancestor-element-MISMATCH'
}

interface MatchOutcome {
  result: MatchResults;
  target ?: Array<ElementNode>;
  ancestor_candidates ?: Array<ElementNode>;
}

type CollectorFilter = (element: ElementNode, root: ElementNode) => MatchOutcome;

    //---// Selector Token Functions //---//
function hasTag(selector: SelectorToken) : boolean { return !! selector._tag; }

function hasAttribute(selector: SelectorToken) : boolean { return !! selector._attrib && selector._attrib.length> 0; }

function hasDescendent(selector: SelectorToken) : boolean { return !! selector._descendent; }

function hasChild(selector: SelectorToken) : boolean { return !! selector._child; }

function isTargetToken(selector: SelectorToken) : boolean {
  return ! selector._child && ! selector._descendent
    && ! selector._adjacent_sibling && ! selector._general_sibling;
}

function isTraversalSelector(selector: SelectorToken) : boolean {
  return (!!selector._child )
    || (!! selector._descendent )
    || (!! selector._adjacent_sibling )
    || (!! selector._general_sibling );
}

    //---// Selector Token Functions //---//


    //---// Match Helper Functions //---//

function isTagMatch(selector:SelectorToken | undefined, element: ElementNode) : boolean {
  return !! selector ? (element.tag.toUpperCase() === selector._tag) : false;
}

function isSelectorMatch(selector: SelectorToken | undefined, element: ElementNode) : boolean {
  if (!! selector) {
    let isMatch: boolean = hasTag(selector) || hasAttribute(selector);
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

/**
 * Checks if element has all expected attribute properties.
 * Must have confirmed the selector is valid before calling.
 * @param selector - verified, valid selector token object
 * @param element - element to compare with.
 * @see hasAttribute
 */
function isAttributeMatch( selector: SelectorToken | undefined, element: ElementNode) : boolean {
  let isMatch = true;
  let attribs = !!selector ? <Array<AttribInfo>> selector._attrib : [];
  for(var index = 0; index < attribs.length && isMatch; index++) {
    let attr = attribs[index];
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

        //---// Match Helper Functions //---//

/**
 * Internal to navigateDescendents().
 * Applies a matching callback or function to a list of candidate element nodes
 * and collect the matches.
 * @param elementList 
 * @param selector 
 * @param callback 
 * @returns MatchOutcome with list of matching element nodes (if matched).
 * @see navigateDescendents
 */
function applyToElementsInListAndCollectMatches(
  elementList: Array<ElementNode>,
  selector: SelectorToken,
  callback: (child: ElementNode, selector: SelectorToken) => MatchOutcome
) : MatchOutcome {
  let result: Array<ElementNode> = [];

  for(var child of elementList) {
    let outcome = callback(child, selector);
    if (outcome.target) {
      result = merge_array(result, outcome.target);
    }
  }
  if (result.length > 0) {
    return { result: MatchResults.TargetMatch, target: result };
  } else {
    return { result: MatchResults.NoMatch };
  }
}

/**
 * Internal function that applies a recursive tree node exploration approach
 * to finding descendent element nodes.
 * @param element - top-level node from which to start search.
 * @param token - selector token to use for search.
 */
function navigateDescendents(element: ElementNode, token: SelectorToken) : MatchOutcome {
  let filter = MakeSingleElementFilter(token);
  let list: Array<ElementNode> = [];

  exploreNodeTreeByFilterAndCollectMatches(filter, list, element, element);

  if (list.length> 0) {
    if (token._descendent) {
      return applyToElementsInListAndCollectMatches(list, token._descendent, navigateDescendents);
    } else if (token._child) {
      return applyToElementsInListAndCollectMatches(list, token, navigateChildren);
    } else {
      return { result: MatchResults.TargetMatch, target: list };
    }
  }
  return { result: MatchResults.AncestorMismatch };
}

/**
 * Internal function that applies a callback to each child that represents
 * an element node.
 * @param parent - parent element to find element children
 * @param callback - callback to apply
 */
function applyToEachChildElement(
  parent: ElementNode,
  callback: (element:ElementNode)=>void
) : void {
  let children = getElementChildrenFrom(parent);
  for(var child of children) {
    callback(child);
  }
}

/**
 * Internal to navigate_children() this takes each child of the current
 * element and calls navigate_children() recursively.
 * @param element - parent that matched, children of this will be used.
 * @param selector - matched selector, child of this will be used.
 * @see navigate_children
 */
function recurseToChildrenAndReturnMatchList(
  element: ElementNode,
  selector: SelectorToken
) : Array<ElementNode> {
  let matchedTargets : Array<ElementNode> = [];
  applyToEachChildElement(element,
    (child: ElementNode) : void => {
      if (selector._child) {
        let outcome = navigateChildren(child, selector._child);
        if (outcome.result === MatchResults.TargetMatch && outcome.target) {
          matchedTargets = merge_array(matchedTargets, outcome.target);
        }
      }
    }
  );
  return matchedTargets;
}

/**
 * Attempts a parent->child match and if matched at the parent level, will explore
 * the selector path as far as it can maintain matches. Supports switching from
 * parent->child to parent-...-> desendent as may happen but calls navigateDescendents().
 * @param element - top level element to match against and descend from.
 * @param selector - selector that may have children or other traversal criteria.
 * @see navigateDescendents
 */
function navigateChildren(element: ElementNode, selector: SelectorToken): MatchOutcome {
  if (isSelectorMatch(selector, element)) {
    if (selector._child ) {
      let matchedTargets = recurseToChildrenAndReturnMatchList(element, selector);
      if (matchedTargets.length > 0) {
        return { result: MatchResults.TargetMatch, target: matchedTargets };
      }
    } else if (selector._descendent) {
      return navigateDescendents(element, selector._descendent);
    }
    else {
      return { result: MatchResults.TargetMatch, target: [ element ]};
    }
  }

  return { result: MatchResults.NoMatch };
}

/**
 * Worker function that does much heavy lifting for either the parent-child filter
 * or the parent descendent filter.
 * @param element - element to consider next in document tree
 * @param next_selector - selector to use for matching
 * @see MakeParentChildFilter
 * @see MakeParentDescendentFilter
 */
function traverseDocumentWithPathLikeSelectorTokens(element: ElementNode, next_selector: SelectorToken) : MatchOutcome {
  if (next_selector._descendent) {
    return navigateDescendents(element, next_selector);
  } else if (next_selector._child) {
    return navigateChildren(element, next_selector);
  }

  if (isTargetToken(next_selector) && isSelectorMatch(next_selector, element)) {
    return { result: MatchResults.TargetMatch, target: [ element ]};
  } else {
    return { result: MatchResults.NoMatch };
  }
}

/**
 * A CollectorFilter factory for parent->child relationship.
 * @param selector - selector to match
 */
function MakeParentChildFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) : MatchOutcome => {
    if (isTargetToken(selector)) {
      return { result: MatchResults.TargetMatch, target: [ element ]};
    } else {
      if (isTraversalSelector(selector) && isSelectorMatch(selector, element)) {
        return traverseDocumentWithPathLikeSelectorTokens(element, selector);
      } else {
        return { result: MatchResults.NoMatch };
      }
    }
  }
}

/**
 * CollectorFilter factory for handling a selector that has parent-to-child/descendent
 * traversal required.
 * @param token - selector token that has a _child or _descendent token.
 */
function MakeParentDescendentFilter(token: SelectorToken) : CollectorFilter {

  return (element: ElementNode, root: ElementNode) : MatchOutcome => {
    return traverseDocumentWithPathLikeSelectorTokens(element, token);
  }
}

/**
 * CollectorFilter factory for handling a selector that does not require
 * traversal and should be used to match the given element without looking any further.
 * Represents a one-off match!
 * @param selector - selector that seeks to match the given element.
 */
function MakeSingleElementFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    return isSelectorMatch(selector, element)
    ? { result: MatchResults.TargetMatch, target: [element] }
    : { result: MatchResults.NoMatch };
  }
}

/**
 * CollectorFilter factory for handling selector that does not require
 * traversal and should be used to find one element.
 * @param selector - selector that seeks to match an element in the document tree.
 */
function MakeSingleSelectorFilter(selector: SelectorToken) : CollectorFilter {
  if ( hasChild(selector) ) {
    return MakeParentChildFilter(selector);
  } else if (hasDescendent(selector)) {
    return MakeParentDescendentFilter(selector);
  } else {
    return MakeSingleElementFilter(selector);
  }
}

/**
 * Explores the element node tree and collects matches.
 * @param filter - filter to use for match finding.
 * @param collection - list of elements to hold the matches
 * @param root - the root of the search (not necessary root of document)
 * @param current - current node in a recursive call.
 */
function exploreNodeTreeByFilterAndCollectMatches(
  filter: CollectorFilter,
  collection: Array<ElementNode>,
  root: ElementNode,
  current: ElementNode | undefined
) : void {
  if (current) {
    let outcome = filter(current, root);
    if (outcome.result === MatchResults.TargetMatch && outcome.target ) {
      for(var target of outcome.target) {
        collection.push(target);
      }
    } else if (outcome.result === MatchResults.AncestorMismatch) {
      empty_array(collection);
    } else {
      applyToEachChildElement(current, (child: ElementNode)=> exploreNodeTreeByFilterAndCollectMatches(filter, collection, root, child) );
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

    let idea = lexer.tokens.map( (token: SelectorToken)=> selectorTokentoString(token));

    let filter_list = lexer.tokens.map( (sel: SelectorToken) => MakeSingleSelectorFilter(sel));

    for(var filter of filter_list) {
      exploreNodeTreeByFilterAndCollectMatches(filter, list, element, element);
    }
    return list;
  }
}