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
import { find } from 'shelljs';

/*
selector ::= (advanced_selector ',' )* advanced_selector
advanced_selector ::= path_selector | composite_selector
simple_selector ::= #ID | .CLASS | TAG_NAME
 */

//export type ParseCommand = (parser: MockSelectorParser, element:ElementNode) => ParseDecision;

interface ParseDecision {
  next_step?: ParseStep;
  outcome?: ParseOutput;
}

type ParseOutput = (element: ElementNode) => Array<ElementNode>;
type ParseStep = (element: ElementNode) => ParseDecision;
// ----------

function TagSelector(selector: string) : ParseOutput {
  let step:ParseOutput = (element: ElementNode) => {
    let list: Array<ElementNode> = [];
    element.queryByTag(selector, list);
    return list;
  }
  return step;
}

function ChildrenByTag(tag:string) : ParseOutput {
  let finder: ParseOutput = (element: ElementNode) => {
    let nodeList = element.children
      .filter( (node: IMockDocNode) => node.nodeType == MockNodeType.ElementNode)
      .filter( (child_node: IMockDocNode) => {
        let child = <ElementNode> child_node;
        return child.tag.toUpperCase() == tag.toUpperCase();
      });
    return nodeList.map( (item: IMockDocNode)=> <ElementNode>item);
  };
  return finder;
}

function HierarchySelector(selector: string): ParseOutput {
  return (element: ElementNode) => {
    let pathList = selector.split('>')
      .map( (part:string)=> part.trim() )
      .map( (sub: string) => ChildrenByTag(sub));
    let task = ApplyRecursiveElementForBestMatch(pathList);
    return task(element);
  }
}

function ApplyRecursiveElementForBestMatch(list: Array<ParseOutput>) : ParseOutput {

  function goDeeper(
    command_list: Array<ParseOutput>,
    element: ElementNode,
    results: Array<ElementNode>
  ) : void {
    let command = command_list.pop();
    if (command) {
      let possibles = command(element);
      if (command_list.length == 0) {
        possibles.forEach( (item: ElementNode) => results.push(item));
      } else {
        possibles.forEach( (item: ElementNode) => goDeeper(command_list, item, results));
      }
    }
  } //-- goDeeper --

  let trail : ParseOutput = (root: ElementNode) => {
    list.reverse();
    let results: Array<ElementNode> = [];
    goDeeper(list, root, results);
    return results;
  };
  return trail;
}

function ApplySameElementToList(list: Array<ParseOutput>) : ParseOutput {
  let task : ParseOutput = (element: ElementNode) => {
    let result: Array<ElementNode> = [];
    list.forEach( (output: ParseOutput) => result = result.concat(output(element)));
    return result;
  };
  return task;
}

function SelectorList(selector: string) : ParseOutput {
  return (element: ElementNode) => {
    let list = selector.split(',')
      .map( (s:string) => s.trim() )
      .map( (sub_selector:string ) => TagSelector(sub_selector));
    let task = ApplySameElementToList(list);
    return task(element);
  }
}

function HierarchyOrOther(selector: string) : ParseOutput {
  if (selector.includes('>')) {
    return HierarchySelector(selector);
  } else {
    return TagSelector(selector);
  }
}

function ListOrOther(selector: string) : ParseOutput {
  if (selector.includes(',')) {
    return SelectorList(selector);
  } else {
    return HierarchyOrOther(selector);
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
    let output = ListOrOther(this.selector);
    return output(element);
  }
}