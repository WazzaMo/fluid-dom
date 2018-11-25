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

import { merge_array } from './util';



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

function ListSelectorsFollowing(
  selector: SelectorToken, next: (sel: SelectorToken)=>SelectorToken | undefined
) : Array<SelectorToken> {
  let list : Array<SelectorToken> = [];
  let current : SelectorToken | undefined = selector;
  do {
    if (current) {
      list.push(current);
      current = next(current);
    }
  } while(!! current);
  return list;
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


function ListElementsFromUltimateChildToRoot(descendent: ElementNode, root: ElementNode) : Array<ElementNode> {
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

  tokens = ListSelectorTokens(root, (token:SelectorToken ) => token._child );
  return tokens.reverse();
}

function ListSelectorTokens(
  root: SelectorToken,
  next: (token: SelectorToken)=> SelectorToken | undefined
): Array<SelectorToken> {
  let tokens : Array<SelectorToken> = [];
  let current : SelectorToken | undefined = root;

  while(!!current ) {
    tokens.push(current);
    current = next( current );
  }
  return tokens;
}

function navigate_descendents(element: ElementNode, token: SelectorToken) : MatchOutcome {
  let filter = MakeSingleElementFilter(token);
  let list: Array<ElementNode> = [];
  selector(filter, list, element, element);
  console.log(`navigate_descendents: e: ${element} S: ${selectorTokentoString(token)} Len: ${list.length}`);

  if (list.length> 0) {
    if (token._descendent) {
      let result_list: Array<ElementNode> = [];
  
      for(var child of list) {
        let candidate = navigate_descendents(child, token._descendent);
        console.log(`navigate_descendents: ${candidate.result} ${candidate.target}`);
        if (candidate.result === MatchResults.TargetMatch && candidate.target) {
          result_list = merge_array(result_list, candidate.target);
        }
      }
      console.log(`navigate_descendents: selector ${selectorTokentoString(token)} = ${result_list.length} results`);
      return (result_list.length > 0)
        ? { result: MatchResults.TargetMatch, target: result_list }
        : { result: MatchResults.AncestorMismatch };
    } else if (token._child) {
      let result: Array<ElementNode> = [];
      for(var child of list) {
        let outcome = navigate_children(child, token);
        if (outcome.target) {
          result = merge_array(result, outcome.target);
        }
      }
      if (result.length > 0) {
        return { result: MatchResults.TargetMatch, target: result };
      }
    } else {
      return { result: MatchResults.TargetMatch, target: list };
    }
  }
  return { result: MatchResults.AncestorMismatch };
}

function navigate_children(element: ElementNode, selector: SelectorToken): MatchOutcome {
  console.log(`navigate_children: ${element} | selector ${selectorTokentoString( selector)}`);
  if (isSelectorMatch(selector, element)) {
    if (selector._child ) {
      let children = getElementChildrenFrom(element);
      let matchedTargets : Array<ElementNode> = [];
      for(var child of children) {
        let outcome = navigate_children(child, selector._child);
        if (outcome.result === MatchResults.TargetMatch && outcome.target) {
          matchedTargets = merge_array(matchedTargets, outcome.target);
        }
      }
      if (matchedTargets.length > 0) {
        return { result: MatchResults.TargetMatch, target: matchedTargets };
      }
    } else if (selector._descendent) {
      console.log(`navigate_children - going to descendents: e: ${element} s: ${selectorTokentoString(selector._descendent)}`);
      return navigate_descendents(element, selector._descendent);
    }
    else {
      return { result: MatchResults.TargetMatch, target: [ element ]};
    }
  }

  return { result: MatchResults.AncestorMismatch };
}

function follow(element: ElementNode, next_selector: SelectorToken) : MatchOutcome {
  if (next_selector._descendent) {
    return navigate_descendents(element, next_selector);
  } else if (next_selector._child) {
    return navigate_children(element, next_selector);
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
        return follow(element, selector);
      } else {
        return { result: MatchResults.AncestorMismatch };
      }
    }
  }
}


function MakeParentDescendentFilter(token: SelectorToken) : CollectorFilter {

  function getCandidates(element: ElementNode, next_selector: SelectorToken) : MatchOutcome {
    let list: Array<ElementNode> = [];
    let filter = MakeSingleElementFilter(next_selector);
    selector(filter, list, element, element);
    if (next_selector._descendent) {
      let result_list: Array<ElementNode> = [];

      for(var child of list) {
        let candidate = getCandidates(child, next_selector._descendent);
        console.log(`getCandidates: ${candidate.result} ${candidate.target}`);
        if (candidate.result === MatchResults.TargetMatch && candidate.target) {
          result_list = merge_array(result_list, candidate.target);
        }
      }
      console.log(`getCandidates: selector ${selectorTokentoString(next_selector)} = ${result_list.length} results`);
      return (result_list.length > 0) ? { result: MatchResults.TargetMatch, target: result_list } : { result: MatchResults.NoMatch };
    }
    if (list.length > 0) {
      console.log(`getCandidates: TargetMatch - ${list.length} values`);
      return { result: MatchResults.TargetMatch, target: list};
    } else {
      console.log(`getCandidates: leaf - no match`);
      return { result: MatchResults.NoMatch };
    }
  }

  return (element: ElementNode, root: ElementNode) : MatchOutcome => {
    // return getCandidates(element, token);
    // return navigate_descendents(element, token);
    return follow(element, token);
  }
}

function MakeSingleElementFilter(selector: SelectorToken) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {

    // console.log(` selector ${selectorTokentoString(selector)} <==> element ${element} ? ${isSelectorMatch(selector, element)}`);

    return isSelectorMatch(selector, element)
    ? { result: MatchResults.TargetMatch, target: [element] }
    : { result: MatchResults.NoMatch };
  }
}

function MakeSingleSelectorFilter(selector: SelectorToken) : CollectorFilter {
  if ( hasChild(selector) ) {
    return MakeParentChildFilter(selector);
  } else if (hasDescendent(selector)) {
    return MakeParentDescendentFilter(selector);
  } else {
    return MakeSingleElementFilter(selector);
  }
}

function MakeSelectorListFilter(selectors: Array<SelectorToken>) : CollectorFilter {
  return (element: ElementNode, root: ElementNode) => {
    let targets_matched : Array<ElementNode> = [];
    let outcome : MatchOutcome = {result: MatchResults.NoMatch};

    let filters = selectors.map( (sel: SelectorToken) => MakeSingleSelectorFilter(sel));
    for( var index = 0; index< filters.length; index++) {
      outcome = filters[index](element, root);
      if (outcome.result === MatchResults.TargetMatch && outcome.target) {
        targets_matched = targets_matched.concat(outcome.target);

        console.warn(`Element: ${element}, Token:"${selectorTokentoString(selectors[index])}" -- Adding ${outcome.target.length} to total (${targets_matched.length})`);
      }
    }
    return targets_matched.length > 0
      ? { result: MatchResults.TargetMatch, target: targets_matched }
      : { result: MatchResults.NoMatch };
  }
}


function selector(
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
    } else if (outcome.result != MatchResults.AncestorMismatch) {
      let children : Array<ElementNode> = getElementChildrenFrom(current);
      for(var child of children) {
        selector(filter, collection, root, child);
      }
    } else if (outcome.result === MatchResults.AncestorMismatch) {
      console.warn(`!!! Ancestor Mismatch - length ${collection.length}`);
      while(collection.length > 0) {
        collection.pop();
      }
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