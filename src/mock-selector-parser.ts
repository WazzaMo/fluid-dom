/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import {
  ElementNode,
  IMockNodeAttributes,
  MockNodeType
} from './mock-document-nodes';

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

function AllOutputs(list: Array<ParseOutput>) : ParseOutput {
  let task : ParseOutput = (element: ElementNode) => {
    let result: Array<ElementNode> = [];
    list.forEach( (output: ParseOutput) => result = result.concat(output(element)));
    return result;
  };
  return task;
}

function UnionSelector(selector: string) : ParseOutput {
  // if (selector.includes(',')) {
    return (element: ElementNode) => {
      let list = selector.split(',')
        .map( (s:string) => s.trim() )
        .map( (sub_selector:string ) => TagSelector(sub_selector));
      let task = AllOutputs(list);
      return task(element);
    }
  // }
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
    let output = UnionSelector(this.selector);
    return output(element);
  }
}