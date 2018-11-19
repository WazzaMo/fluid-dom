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
name_selector ::= TAG QUALIFIER ATTRIBSET
attribset ::= '[' LABEL ']' ATTRIBSET
=' '"' VALUE'"'
qualifier ::= (CLASS | ID ) QUALIFIER
          ::= NONE
class ::= '.' LABEL
id ::= '#' LABEL
tag ::= LABEL
 */

//export type ParseCommand = (parser: MockSelectorParser, element:ElementNode) => ParseDecision;

interface ParseDecision {
  next_step?: ParseStep;
  outcome?: ParseOutput;
}

type ParseOutput = (element: ElementNode) => Array<ElementNode>;
type ParseStep = (element: ElementNode) => ParseDecision;
// ----------

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

function AttributeSelector(selector: string) : ParseOutput {
  interface AttribPair { name: string, value?: string | undefined};

  function HasTag(tag: string) : boolean {
    return (!!tag) && tag.length > 0;
  }

  function toPairs(attribList:Array<string>): Array<AttribPair> {
    let attribs : Array<AttribPair> = [];

    attribList.forEach( (part: string)=>{
      let nameOnly, nameValue;
      nameOnly = part.match(/(\w+)/);
      nameValue = part.match(/(\w+).*="(.*)"/);
      if (nameValue) {
        let  [_all, name, value] = nameValue;
        attribs.push( <AttribPair>{name,value} );
      } else if (nameOnly) {
        let [_all, name] = nameOnly;
        attribs.push( <AttribPair> { name } );
      }
    });
    return attribs;
  }

  function isMatch(
    tag:string, pairList: Array<AttribPair>, element: ElementNode
  ): boolean {
    let matchesAttrib: boolean = pairList.every( (pair: AttribPair)=> {
      if (pair.value) {
        return element.attrib(pair.name) === pair.value;
      } else {
        return !! element.attrib(pair.name);
      }
    });
    let matchesTag = HasTag(tag) 
      ? tag.toUpperCase() === element.tag.toUpperCase()
      : true;
    return matchesTag && matchesAttrib;
  }

  function addAllMatches(
    tag: string,
    attribs: Array<AttribPair>,
    element: ElementNode,
    collection: Array<ElementNode>
  ) : void {
    if (isMatch(tag, attribs, element)) {
      collection.push(element);
    }
    if (element.children) {
      element.children.forEach( (child: IMockDocNode) => {
        if (child.nodeType == MockNodeType.ElementNode) {
          addAllMatches(tag, attribs, <ElementNode>child, collection)
        }
      });
    }
  }

  const OPT_TAG_AND_ATTRIBUTE_PATTERN = /(\w*)\W*\[(.*)\]/;
  let _match = selector.match(OPT_TAG_AND_ATTRIBUTE_PATTERN);
  let _all, tag: string, attribs: string | undefined;

  if (_match) {
    [_all, tag, attribs] = _match;

    let attribList = (!! attribs) ? toPairs( attribs.split('][') ) : [];
    return (element: ElementNode) => {
      let collection: Array<ElementNode> = [];
      addAllMatches(tag, attribList, element, collection);
      return collection;
    }
  } else {
    return ChildrenByTag(selector);
  }

} // -- AttributeSelector

function SingleSelector(selector: string) : ParseOutput {
  return AttributeSelector(selector);
}

function HierarchySelector(selector: string): ParseOutput {
  return (element: ElementNode) => {
    let pathList = selector.split('>')
      .map( (part:string)=> part.trim() )
      .map( (sub: string) => SingleSelector(sub));
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
      .map( (sub_selector:string ) => SingleSelector(sub_selector));
    let task = ApplySameElementToList(list);
    return task(element);
  }
}

function HierarchyOrOther(selector: string) : ParseOutput {
  if (selector.includes('>')) {
    return HierarchySelector(selector);
  } else {
    return SingleSelector(selector);
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