//  Fluid-DOM v 1.2.0
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * Identifies a mock document node as text-only or a mark-up element.
 */
var MockNodeType;
(function (MockNodeType) {
    MockNodeType["TextNode"] = "TEXTNODE";
    MockNodeType["ElementNode"] = "ELEMENTNODE";
})(MockNodeType || (MockNodeType = {}));
/**
 * Concrete implementation of a TextNode.
 * Represents the un-marked-up text in a document.
 */
class TextNode {
    get nodeType() { return MockNodeType.TextNode; }
    get children() { return []; }
    constructor(text) {
        this.text_value = (!!text) ? text : '';
    }
}
/**
 * Concrete implementation of a mark-up element node.
 * Represents the main building blocks of a mock document.
 */
class ElementNode {
    get nodeType() { return MockNodeType.ElementNode; }
    get children() { return this._children; }
    get text_value() { return this._text_value; }
    set text_value(value) { this._text_value = value; }
    constructor(tag, parent, id) {
        this._tag = tag;
        this._parent = parent;
        this._children = [];
        this._text_value = '';
        this._attributes = {};
        if (id) {
            this.attrib('id', id);
        }
    }
    attrib(name, value) {
        if (value) {
            this._attributes[name] = value;
        }
        return this._attributes[name];
    }
    /**
     * Represents a single element get using the ID
     * @param id_value - raw string without "#" prefix.
     * @returns ElementNode instance or undefined
     */
    queryById(id_value) {
        let id = this.attrib('id');
        if (id && id === id_value) {
            return this;
        }
        else {
            let element;
            this.recursiveQuery((child) => {
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
    queryByClass(class_name, collector) {
        if (!collector) {
            throw Error("Parameter 'collector' was not passed");
        }
        let classes = this.attrib('class');
        if (classes && classes.includes(class_name)) {
            collector.push(this);
        }
        this.recursiveQuery((child) => {
            child.queryByClass(class_name, collector);
            return false;
        });
    }
    recursiveQuery(callback) {
        let isDone = false;
        for (var index = 0; index < this._children.length && !isDone; index++) {
            let child = this._children[index];
            if (child.nodeType == MockNodeType.ElementNode) {
                let child_element = child;
                isDone = callback(child_element);
            }
        }
    }
    get tag() { return this._tag; }
    get parent() { return this._parent; }
    addChild(node) {
        this._children.push(node);
    }
    create_child_text(text) {
        let text_node = new TextNode(text);
        this.addChild(text_node);
        return this;
    }
    create_child_element(child_tag, id, callback) {
        let element = new ElementNode(child_tag, this, id);
        this.addChild(element);
        if (callback) {
            callback(element);
        }
        return this;
    }
    children_as_text() {
        let summary = this._children
            .map((node1) => node1.text_value)
            .reduce((text1, text2) => `${text1} ${text2}`, '');
        return summary;
    }
    children_as_html() {
        if (this._children.length == 0) {
            return '';
        }
        let html = this._children
            .map((node) => {
            if (node.nodeType === MockNodeType.ElementNode) {
                let element = node;
                return toHtml(element);
            }
            else {
                return node.text_value;
            }
        })
            .reduce((text1, text2) => text1 + text2, '');
        return html;
    }
    get attributes() {
        return this._attributes;
    }
    toString() {
        return `Element [${this._tag}](${attributesToString(this)})`;
    }
} // -- ElementNode --
function attributesToString(element) {
    let attribs = '';
    for (var attr in element.attributes) {
        let value = element.attributes[attr];
        attribs += ` ${attr}="${value}"`;
    }
    return attribs;
}
/**
 * For the mocking API, will take an internal mock representation
 * and write it out as HTML text. It won't be pretty but it works.
 * @param element - base element to dump.
 */
function toHtml(element) {
    let attribs = attributesToString(element);
    let as_html = `
    <${element.tag}${attribs}>
      ${element.text_value}${element.children_as_html()}
    </${element.tag}>
  `;
    return as_html;
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * # MockClasses
 *
 * Representation of classes on a mock element.
 */
class MockClasses {
    constructor(element) {
        this.classNames = [];
        this.element = element;
    }
    internalGetClassValue() {
        return this.classNames.reduce((a, b) => `${a} ${b}`);
    }
    forEach(callback) {
        this.classNames.forEach(callback);
        return this;
    }
    has(name) {
        return this.classNames.includes(name);
    }
    whenHas(name, callback) {
        if (this.has(name)) {
            callback(this.element);
        }
        return this;
    }
    add(_class) {
        if (!this.has(_class)) {
            this.classNames.push(_class);
        }
        return this;
    }
    remove(_class) {
        if (this.has(_class)) {
            let index = this.classNames.indexOf(_class);
            let before = this.classNames.slice(0, index);
            let after = this.classNames.slice(index);
            this.classNames = before.concat(after);
        }
        return this;
    }
    set(_class) {
        return this.add(_class);
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
class MockElement {
    constructor(tag, parent) {
        this._tag = tag;
        this._attributes = {};
        this._classes = new MockClasses(this);
        this._children = [];
        this._text_value = '';
        this._parent = parent;
    }
    isValid() {
        return true;
    }
    getParent() {
        return this._parent;
    }
    withChildren(callback) {
        if (this._children.length > 0) {
            callback(this._children);
        }
        return this;
    }
    expect(tagName) {
        if (this._tag.toUpperCase() !== tagName.toUpperCase()) {
            console.trace(`Expected ${tagName} but actual value was ${this._tag}`);
        }
        return this;
    }
    getId() {
        let id = this._attributes['id'];
        if (id) {
            return id;
        }
        return null;
    }
    hasId() {
        return !!this._attributes['id'];
    }
    exists() {
        return true;
    }
    findAll(elementListLocation) {
        throw new Error("Method not implemented.");
    }
    selectFirst(selector) {
        throw new Error("Method not implemented.");
    }
    selectorPath() {
        throw new Error("Method not implemented.");
    }
    tagName() {
        throw new Error("Method not implemented.");
    }
    text(_text) {
        throw new Error("Method not implemented.");
    }
    html(_html) {
        throw new Error("Method not implemented.");
    }
    append(_html) {
        throw new Error("Method not implemented.");
    }
    prepend(_html) {
        throw new Error("Method not implemented.");
    }
    remove() {
        throw new Error("Method not implemented.");
    }
    attributes() {
        throw new Error("Method not implemented.");
    }
    classes() {
        throw new Error("Method not implemented.");
    }
    on(args) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
class MockAttributes {
    constructor(set) {
        this.attributes = set;
    }
    forEach(callback) {
        for (var key in this.attributes) {
            let value = this.attributes[key];
            callback(key, value);
        }
        return this;
    }
    attributeNames() {
        let allNames = [];
        for (var key in this.attributes) {
            allNames.push(key);
        }
        return allNames;
    }
    add(name, value) {
        throw new Error("Method not implemented.");
    }
    set(name, value) {
        throw new Error("Method not implemented.");
    }
    with(name, callback) {
        throw new Error("Method not implemented.");
    }
    get(name) {
        throw new Error("Method not implemented.");
    }
    has(name) {
        throw new Error("Method not implemented.");
    }
    remove(name) {
        throw new Error("Method not implemented.");
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * # MockDocument
 */
class MockDocument {
    constructor() {
        this.root_node = new ElementNode('HTML');
    }
    create_child_text(text) {
        this.root_node.create_child_text(text);
        return this;
    }
    create_child_element(child_tag, id, callback) {
        this.root_node.create_child_element(child_tag, id, callback);
        return this;
    }
    toHtml() {
        return toHtml(this.root_node);
    }
    findElement(arg) {
        throw new Error("Method not implemented.");
    }
    findAll(arg) {
        throw new Error("Method not implemented.");
    }
    buttonOn(eventInfo) {
        throw new Error("Method not implemented.");
    }
}
function Doc() {
    return new MockDocument();
}

exports.MockDocument = MockDocument;
exports.Doc = Doc;
exports.MockElement = MockElement;
exports.MockAttributes = MockAttributes;
exports.MockClasses = MockClasses;

