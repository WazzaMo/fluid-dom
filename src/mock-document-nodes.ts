
/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export enum MockNodeType {
  TextNode = 'TEXTNODE',
  ElementNode = 'ELEMENTNODE'
}

/*
export interface NodeRef {
  node_id: string;
}
*/

export interface IElementNodeFactory {
  create_child_text( text: string ): IElementNodeFactory;

  create_child_element(
    child_tag: string,
    id ?: string,
    callback ?: (mock:ElementNode) => void
  ) : IElementNodeFactory;
}

export interface IMockDocNode {
  nodeType: MockNodeType;
  children: Array<IMockDocNode>;
  text_value: string;
}

export class TextNode implements IMockDocNode {
  get nodeType(): MockNodeType { return MockNodeType.TextNode; }
  get children(): IMockDocNode[] { return []; }
  text_value: string;

  constructor(text ?: string) {
    this.text_value = (!! text) ? text : '';
  }
}

export interface IMockNodeAttributes {
  [_name: string] : string;
}

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

  get tag() : string { return this._tag; }
  get parent() : ElementNode | undefined { return this._parent; }

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
  //         let attribs = attributesToString(element);
  //         return `
  // <${element.tag}${attribs}>
  //   ${element.text_value}${element.children_as_html()}
  // </${element.tag}>`;
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
}

function attributesToString(element: ElementNode) : string {
  let attribs = '';
  for(var attr in element.attributes) {
    let value = element.attributes[attr];
    attribs += ` ${attr}="${value}"`
  }
  return attribs;
}

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