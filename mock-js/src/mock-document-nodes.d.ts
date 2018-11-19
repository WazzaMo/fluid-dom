/**
 * Identifies a mock document node as text-only or a mark-up element.
 */
export declare enum MockNodeType {
    TextNode = "TEXTNODE",
    ElementNode = "ELEMENTNODE"
}
/**
 * The document creation API for mock document setup.
 * This is a substitute for not being able to load HTML.
 */
export interface IElementNodeFactory {
    create_child_text(text: string): IElementNodeFactory;
    create_child_element(child_tag: string, id?: string, callback?: (mock: ElementNode) => void): IElementNodeFactory;
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
export declare class TextNode implements IMockDocNode {
    readonly nodeType: MockNodeType;
    readonly children: IMockDocNode[];
    text_value: string;
    constructor(text?: string);
}
/**
 * Definition of an attributes JS Object.
 */
export interface IMockNodeAttributes {
    [_name: string]: string;
}
/**
 * Concrete implementation of a mark-up element node.
 * Represents the main building blocks of a mock document.
 */
export declare class ElementNode implements IMockDocNode, IElementNodeFactory {
    private _children;
    private _text_value;
    private _tag;
    private _parent;
    private _attributes;
    readonly nodeType: MockNodeType;
    readonly children: IMockDocNode[];
    text_value: string;
    readonly tag: string;
    readonly parent: ElementNode | undefined;
    constructor(tag: string, parent?: ElementNode, id?: string);
    attrib(name: string, value?: string): undefined | string;
    /**
     * The root element of a document has no parent so, in a way,
     * this is asking if this node is the root or not. Note: it
     * also asks if the parent node should be followed for
     * upward traversal or de-referencing.
     */
    hasParent(): boolean;
    /**
     * Represents a single element get using the ID
     * @param id_value - raw string without "#" prefix.
     * @returns ElementNode instance or undefined
     */
    queryById(id_value: string): ElementNode | undefined;
    /**
     * Represents a multi-element get using the class name.
     * @param class_name - without CSS '.' prefix.
     * @param collector - an array to push ElementNode instances into.
     */
    queryByClass(class_name: string, collector: Array<ElementNode>): void;
    /**
     * Represents getting multiple nodes by their tag-name.
     * @param tag -
     * @param collector
     */
    queryByTag(tag: string, collector: Array<ElementNode>): void;
    private recursiveQuery;
    private addChild;
    create_child_text(text: string): IElementNodeFactory;
    create_child_element(child_tag: string, id?: string | undefined, callback?: ((mock: ElementNode) => void) | undefined): IElementNodeFactory;
    children_as_text(): string;
    children_as_html(): string;
    readonly attributes: any;
    toString(): string;
}
/**
 * For the mocking API, will take an internal mock representation
 * and write it out as HTML text. It won't be pretty but it works.
 * @param element - base element to dump.
 */
export declare function toHtml(element: ElementNode): string;
