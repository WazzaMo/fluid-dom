'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
(function (MockNodeType) {
    MockNodeType["TextNode"] = "TEXTNODE";
    MockNodeType["ElementNode"] = "ELEMENTNODE";
})(exports.MockNodeType || (exports.MockNodeType = {}));
/**
 * Concrete implementation of a TextNode.
 * Represents the un-marked-up text in a document.
 */
class TextNode {
    get nodeType() { return exports.MockNodeType.TextNode; }
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
    get nodeType() { return exports.MockNodeType.ElementNode; }
    get children() { return this._children; }
    get text_value() { return this._text_value; }
    set text_value(value) { this._text_value = value; }
    get tag() { return this._tag; }
    get parent() { return this._parent; }
    constructor(tag, parent, id) {
        this._tag = tag;
        this._parent = parent;
        this._children = [];
        this._text_value = '';
        this._attributes = {};
        if (id) {
            this.attrib('id', id);
        }
        this.reset_queries();
        this._findElementQuery = () => undefined;
        this._findManyElementsQuery = () => { };
    }
    reset_queries() {
        this._findElementQuery = () => undefined;
        this._findManyElementsQuery = () => { };
    }
    attrib(name, value) {
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
    hasParent() {
        return !!this._parent;
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
    /**
     * Represents getting multiple nodes by their tag-name.
     * @param tag -
     * @param collector
     */
    queryByTag(tag, collector) {
        if (!collector)
            throw Error(`The 'collector' parameter is mandatory.`);
        if (this._tag === tag) {
            collector.push(this);
        }
        this.recursiveQuery((child) => {
            child.queryByTag(tag, collector);
            return false;
        });
    }
    recursiveQuery(callback) {
        let isDone = false;
        for (var index = 0; index < this._children.length && !isDone; index++) {
            let child = this._children[index];
            if (child.nodeType == exports.MockNodeType.ElementNode) {
                let child_element = child;
                isDone = callback(child_element);
            }
        }
    }
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
            if (node.nodeType === exports.MockNodeType.ElementNode) {
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
 * Represents an uncertain return type.
 * In TypeScript it's possible to return
 * `Type | undefined` but at runtime it can
 * get a bit messy to handle this well.
 * The Option class represents this cleanly
 * and explicitly while making it easy
 * determine whether the value is valid or not
 * and, if valid, provides easy ways to get
 * the value with proper type consistency in
 * TypeScript.
 */
class Option {
    constructor(_value) {
        if (_value) {
            this.value = _value;
        }
        else {
            this.value = null;
        }
    }
    /**
     * Check that there is a value before
     * calling this.
     * @see isValid
     */
    get Value() {
        return this.value;
    }
    /**
     * Tests if the value is known.
     */
    get isValid() {
        return !!this.value;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
class MockElement {
    constructor(element) {
        if (element) {
            this._element = new Option(element);
        }
        else {
            this._element = new Option();
        }
        // this._classes = new MockClasses(this);
    }
    isValid() {
        return this._element.isValid;
    }
    getParent() {
        if (this._element.isValid) {
            let element = this._element.Value;
            if (element.hasParent()) {
                return new MockElement(element.parent);
            }
        }
        return new MockElement();
    }
    withChildren(callback) {
        if (this._element.isValid) {
            let children = this._element.Value.children;
            if (children && children.length > 0) {
                let mockElements = this.makeElementList(children);
                callback(mockElements);
            }
        }
        return this;
    }
    makeElementList(fromList) {
        let elements = fromList
            .filter((node) => node.nodeType == exports.MockNodeType.ElementNode)
            .map((elementNode) => elementNode);
        return elements.map((ele) => new MockElement(ele));
    }
    expect(tagName) {
        if (this._element.isValid) {
            let element = this._element.Value;
            if (element.tag.toUpperCase() !== tagName.toUpperCase()) {
                console.trace(`Expected ${tagName} but actual value was ${element.tag}`);
            }
        }
        return this;
    }
    getId() {
        if (this._element.isValid) {
            let element = this._element.Value;
            let id = element.attrib('id');
            if (id) {
                return id;
            }
        }
        return null;
    }
    hasId() {
        return !!this.getId();
    }
    exists() {
        return this._element.isValid;
    }
    findAll(elementListLocation) {
        let results = [];
        if (elementListLocation.class && this._element.isValid) {
            this._element.Value.queryByClass(elementListLocation.class, results);
            return this.makeElementList(results);
        }
        else if (elementListLocation.tagName && this._element.isValid) {
            this._element.Value.queryByTag(elementListLocation.tagName, results);
            return this.makeElementList(results);
        }
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
// ----------
function TagSelector(selector) {
    let step = (element) => {
        let list = [];
        element.queryByTag(selector, list);
        return list;
    };
    return step;
}
function ChildrenByTag(tag) {
    let finder = (element) => {
        let nodeList = element.children
            .filter((node) => node.nodeType == exports.MockNodeType.ElementNode)
            .filter((child_node) => {
            let child = child_node;
            return child.tag.toUpperCase() == tag.toUpperCase();
        });
        return nodeList.map((item) => item);
    };
    return finder;
}
function HierarchySelector(selector) {
    return (element) => {
        let pathList = selector.split('>')
            .map((part) => part.trim())
            .map((sub) => ChildrenByTag(sub));
        let task = ApplyRecursiveElementForBestMatch(pathList);
        return task(element);
    };
}
function ApplyRecursiveElementForBestMatch(list) {
    function goDeeper(command_list, element, results) {
        let command = command_list.pop();
        if (command) {
            let possibles = command(element);
            if (command_list.length == 0) {
                possibles.forEach((item) => results.push(item));
            }
            else {
                possibles.forEach((item) => goDeeper(command_list, item, results));
            }
        }
    } //-- goDeeper --
    let trail = (root) => {
        list.reverse();
        let results = [];
        goDeeper(list, root, results);
        return results;
    };
    return trail;
}
function ApplySameElementToList(list) {
    let task = (element) => {
        let result = [];
        list.forEach((output) => result = result.concat(output(element)));
        return result;
    };
    return task;
}
function SelectorList(selector) {
    return (element) => {
        let list = selector.split(',')
            .map((s) => s.trim())
            .map((sub_selector) => TagSelector(sub_selector));
        let task = ApplySameElementToList(list);
        return task(element);
    };
}
function HierarchyOrOther(selector) {
    if (selector.includes('>')) {
        return HierarchySelector(selector);
    }
    else {
        return TagSelector(selector);
    }
}
function ListOrOther(selector) {
    if (selector.includes(',')) {
        return SelectorList(selector);
    }
    else {
        return HierarchyOrOther(selector);
    }
}
/**
 * Parses a selector to create a parse plan that can be
 * executed using the @see parseWith method.
 */
class MockSelectorParser {
    constructor(selector) {
        this.selector = selector;
    }
    parseWith(element) {
        let output = ListOrOther(this.selector);
        return output(element);
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

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

exports.ElementNode = ElementNode;
exports.TextNode = TextNode;
exports.MockDocument = MockDocument;
exports.Doc = Doc;
exports.MockSelectorParser = MockSelectorParser;
exports.MockElement = MockElement;
exports.MockAttributes = MockAttributes;
exports.MockClasses = MockClasses;
