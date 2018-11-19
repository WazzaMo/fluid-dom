
/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

 /**
  * Identifies a mock document node as text-only or a mark-up element.
  */
export enum MockNodeType {
  TextNode = 'TEXTNODE',
  ElementNode = 'ELEMENTNODE'
}

/**
 * The document creation API for mock document setup.
 * This is a substitute for not being able to load HTML.
 */
export interface IElementNodeFactory {
  create_child_text( text: string ): IElementNodeFactory;

  create_child_element(
    child_tag: string,
    id ?: string,
    callback ?: (mock:ElementNode) => void
  ) : IElementNodeFactory;
}

/**
 * Basic definition of a mock document node.
 */
export interface IMockDocNode {
  nodeType: MockNodeType;
  children: Array<IMockDocNode>;
  text_value: string;
}

/**
 * Concrete implementation of a TextNode.
 * Represents the un-marked-up text in a document.
 */
export class TextNode implements IMockDocNode {
  get nodeType(): MockNodeType { return MockNodeType.TextNode; }
  get children(): IMockDocNode[] { return []; }
  text_value: string;

  constructor(text ?: string) {
    this.text_value = (!! text) ? text : '';
  }
}

/**
 * Definition of an attributes JS Object.
 */
export interface IMockNodeAttributes {
  [_name: string] : string;
}

/**
 * Concrete implementation of a mark-up element node.
 * Represents the main building blocks of a mock document.
 */
export class ElementNode implements IMockDocNode, IElementNodeFactory {
  private _children: Array<IMockDocNode>;
  private _text_value: string;
  private _tag: string;
  private _parent: ElementNode | undefined;
  private _attributes: IMockNodeAttributes;

  get nodeType(): MockNodeType { return MockNodeType.ElementNode; }
  get children(): IMockDocNode[] { return this._children; }
  get text_value(): string { return this._text_value; }
  set text_value(value: string) { this._text_value = value; }

  get tag() : string { return this._tag; }
  get parent() : ElementNode | undefined { return this._parent; }

  constructor(
    tag: string,
    parent ?: ElementNode,
    id ?: string
  ) {
    this._tag = tag;
    this._parent = parent;
    this._children = [];
    this._text_value = '';
    this._attributes = {};
    if (id) {
      this.attrib('id', id);
    }
  }

  attrib(name: string, value?: string) : undefined | string {
    if (value) {
      this._attributes[name] = value;
    }
    return this._attributes[name];
  }

  /**
   * The root element of a document has no parent so, in a way,
   * this is asking if this node is the root or not. Note: it
   * also asks if the parent node should be followed for
   * upward traversal or de-referencing.
   */
  hasParent() : boolean {
    return !! this._parent;
  }

  /**
   * Represents a single element get using the ID
   * @param id_value - raw string without "#" prefix.
   * @returns ElementNode instance or undefined
   */
  queryById(id_value: string) : ElementNode | undefined {
    let id = this.attrib('id');
    if (id && id === id_value) {
      return this;
    } else {
      let element;
      this.recursiveQuery( (child: ElementNode)=> {
        element = child.queryById(id_value);
        return !!element;
      });
      return element;
    }
  }

  /**
   * Represents a multi-element get using the class name.
   * @param class_name - without CSS '.' prefix.
   * @param collector - an array to push ElementNode instances into.
   */
  queryByClass(
    class_name: string,
    collector: Array<ElementNode>
  ) : void {
    if (! collector) {
      throw Error("Parameter 'collector' was not passed");
    }
    let classes = this.attrib('class');
    if (classes && classes.includes(class_name)) {
      collector.push(this);
    }
    this.recursiveQuery((child: ElementNode) => {
      child.queryByClass(class_name, collector);
      return false;
    });
  }

  /**
   * Represents getting multiple nodes by their tag-name.
   * @param tag - 
   * @param collector 
   */
  queryByTag(
    tag: string,
    collector: Array<ElementNode>
  ) : void {
    if (! collector) throw Error(`The 'collector' parameter is mandatory.`);
    if (this._tag === tag) {
      collector.push(this);
    }
    this.recursiveQuery( (child: ElementNode) => {
      child.queryByTag( tag, collector);
      return false;
    });
  }

  private recursiveQuery(
    callback: (candidate:ElementNode)=> boolean
  ) : void {
    let isDone : boolean = false;

    for(var index = 0; index < this._children.length && ! isDone; index++) {
      let child = this._children[index];
      if (child.nodeType == MockNodeType.ElementNode) {
        let child_element = <ElementNode> child;
        isDone = callback(child_element);
      }
    }
  }

  private addChild(node: IMockDocNode) {
    this._children.push( node );
  }

  create_child_text(
    text: string
  ): IElementNodeFactory {
    let text_node = new TextNode(text);
    this.addChild(text_node);
    return this;
  }

  create_child_element(
    child_tag: string,
    id?: string | undefined,
    callback?: ((mock: ElementNode) => void ) | undefined
  ): IElementNodeFactory {
    let element = new ElementNode(child_tag, this, id);
    this.addChild(element);
    if (callback) {
      callback(element);
    }
    return this;
  }

  children_as_text() : string {
    let summary = this._children
      .map((node1: IMockDocNode) => node1.text_value)
      .reduce( (text1: string, text2: string) => `${text1} ${text2}`, '');
    return summary;
  }

  children_as_html() : string {
    if (this._children.length == 0) {
      return '';
    }

    let html = this._children
      .map( (node: IMockDocNode) => {
        if (node.nodeType === MockNodeType.ElementNode) {
          let element = <ElementNode> node;
          return toHtml(element);
        } else {
          return node.text_value;
        }
      })
      .reduce( (text1: string, text2: string) => text1 + text2, '');
    return html;
  }

  get attributes() : any {
    return this._attributes;
  }

  toString() : string {
    return `Element [${this._tag}](${attributesToString(this)})`;
  }
} // -- ElementNode --


function attributesToString(element: ElementNode) : string {
  let attribs = '';
  for(var attr in element.attributes) {
    let value = element.attributes[attr];
    attribs += ` ${attr}="${value}"`
  }
  return attribs;
}

/**
 * For the mocking API, will take an internal mock representation
 * and write it out as HTML text. It won't be pretty but it works.
 * @param element - base element to dump.
 */
export function toHtml( element: ElementNode) : string {
  let attribs = attributesToString(element);
  let as_html =
  `
    <${element.tag}${attribs}>
      ${element.text_value}${element.children_as_html()}
    </${element.tag}>
  `;
  return as_html;
}