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
function AttributeSelector(selector) {
    function HasTag(tag) {
        return (!!tag) && tag.length > 0;
    }
    function toPairs(attribList) {
        let attribs = [];
        attribList.forEach((part) => {
            let nameOnly, nameValue;
            nameOnly = part.match(/(\w+)/);
            nameValue = part.match(/(\w+).*="(.*)"/);
            if (nameValue) {
                let [_all, name, value] = nameValue;
                attribs.push({ name, value });
            }
            else if (nameOnly) {
                let [_all, name] = nameOnly;
                attribs.push({ name });
            }
        });
        return attribs;
    }
    function isMatch(tag, pairList, element) {
        let matchesAttrib = pairList.every((pair) => {
            if (pair.value) {
                return element.attrib(pair.name) === pair.value;
            }
            else {
                return !!element.attrib(pair.name);
            }
        });
        let matchesTag = HasTag(tag)
            ? tag.toUpperCase() === element.tag.toUpperCase()
            : true;
        return matchesTag && matchesAttrib;
    }
    function addAllMatches(tag, attribs, element, collection) {
        if (isMatch(tag, attribs, element)) {
            collection.push(element);
        }
        if (element.children) {
            element.children.forEach((child) => {
                if (child.nodeType == exports.MockNodeType.ElementNode) {
                    addAllMatches(tag, attribs, child, collection);
                }
            });
        }
    }
    const OPT_TAG_AND_ATTRIBUTE_PATTERN = /(\w*)\W*\[(.*)\]/;
    let _match = selector.match(OPT_TAG_AND_ATTRIBUTE_PATTERN);
    let _all, tag, attribs;
    if (_match) {
        [_all, tag, attribs] = _match;
        let attribList = (!!attribs) ? toPairs(attribs.split('][')) : [];
        return (element) => {
            let collection = [];
            addAllMatches(tag, attribList, element, collection);
            return collection;
        };
    }
    else {
        return ChildrenByTag(selector);
    }
} // -- AttributeSelector
function SingleSelector(selector) {
    return AttributeSelector(selector);
}
function HierarchySelector(selector) {
    return (element) => {
        let pathList = selector.split('>')
            .map((part) => part.trim())
            .map((sub) => SingleSelector(sub));
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
            .map((sub_selector) => SingleSelector(sub_selector));
        let task = ApplySameElementToList(list);
        return task(element);
    };
}
function HierarchyOrOther(selector) {
    if (selector.includes('>')) {
        return HierarchySelector(selector);
    }
    else {
        return SingleSelector(selector);
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
// selector ::= (advanced_selector ',' )* advanced_selector
// advanced_selector ::= path_selector | composite_selector
// simple_selector ::= #ID | .CLASS | TAG_NAME
// name_selector ::= TAG QUALIFIER ATTRIBSET
// attribset ::= '[' LABEL ']' ATTRIBSET
// =' '"' VALUE'"'
// qualifier ::= (CLASS | ID ) QUALIFIER
//           ::= NONE
// class ::= '.' LABEL
// id ::= '#' LABEL
// tag ::= LABEL
var Events;
(function (Events) {
    Events[Events["LeadLabelChar"] = 0] = "LeadLabelChar";
    Events[Events["LabelChar"] = 1] = "LabelChar";
    Events[Events["ChildSeparator"] = 2] = "ChildSeparator";
    Events[Events["DescendentSeparator"] = 3] = "DescendentSeparator";
    Events[Events["ClassPrefix"] = 4] = "ClassPrefix";
    Events[Events["IdPrefix"] = 5] = "IdPrefix";
    Events[Events["LeftSqBracket"] = 6] = "LeftSqBracket";
    Events[Events["RightSqBracket"] = 7] = "RightSqBracket";
    Events[Events["EqualSign"] = 8] = "EqualSign";
    Events[Events["Quote"] = 9] = "Quote";
    Events[Events["EndInput"] = 10] = "EndInput";
    Events[Events["Illegal"] = 11] = "Illegal";
    Events[Events["LAST_EVENT"] = 12] = "LAST_EVENT";
})(Events || (Events = {}));
var Actions;
(function (Actions) {
    Actions["Ignore"] = "IGNORE";
    Actions["ErrorBeforeSelector"] = "ERROR-before-selector";
    Actions["ErrorInTag"] = "ERROR-in-tag";
    Actions["ErrorAfterTag"] = "ERROR-after-tag";
    Actions["ErrorInClass"] = "ERROR-in-class";
    Actions["ErrorInId"] = "ERROR-in-ID";
    Actions["ErrorInAttribute"] = "ERROR-in-attrib";
    Actions["ErrorInAttribValue"] = "ERROR-in-attrib-value";
    Actions["ErrorUnexpectedEnd"] = "ERROR-unexpected-end-of-input";
    Actions["ClearTag"] = "CLEAR-TAG";
    Actions["AppendTag"] = "APPEND-TAG";
    Actions["SaveTag"] = "SAVE-TAG";
    Actions["ClearClass"] = "CLEAR-CLASS";
    Actions["AppendClass"] = "APPEND-CLASS";
    Actions["SaveClass"] = "SAVE-CLASS";
    Actions["ClearId"] = "CLEAR-ID";
    Actions["AppendId"] = "STORE-ID";
    Actions["SaveId"] = "SAVE-ID";
    Actions["ClearAttrib"] = "CLEAR-ATTRIB";
    Actions["AppendAttrib"] = "APPEND-ATTRIB";
    Actions["SaveAttrib"] = "SAVE-ATTRIB";
    Actions["ClearAttribValue"] = "CLEAR-VALUE";
    Actions["AppendAttribValue"] = "APPEND-VALUE";
    Actions["SaveAttribValue"] = "SAVE-VALUE";
    Actions["NewChild"] = "NEW-CHILD-SELECTOR";
    Actions["NewDescendent"] = "NEW-DESCENDENT-SELECTOR";
})(Actions || (Actions = {}));
var States;
(function (States) {
    States[States["StartAwaitSelector"] = 0] = "StartAwaitSelector";
    States[States["GettingTag"] = 1] = "GettingTag";
    States[States["GettingClass"] = 2] = "GettingClass";
    States[States["GettingId"] = 3] = "GettingId";
    States[States["AwaitDescendentSelector"] = 4] = "AwaitDescendentSelector";
    States[States["AwaitChildSelector"] = 5] = "AwaitChildSelector";
    States[States["GettingAttribName"] = 6] = "GettingAttribName";
    States[States["AwaitAttribValueOrEnd"] = 7] = "AwaitAttribValueOrEnd";
    States[States["AttribValueStart"] = 8] = "AttribValueStart";
    States[States["GettingAttribValue"] = 9] = "GettingAttribValue";
    States[States["AwaitAttribEnd"] = 10] = "AwaitAttribEnd";
    States[States["LAST_STATE"] = 11] = "LAST_STATE";
})(States || (States = {}));
const TransitionTable = {};
const ActionTable = {};
function isString(s) {
    return typeof s === "string";
}
function setup_tables() {
    function initState() {
        return {};
    }
    function initTable(table) {
        for (var stateNum = 0; stateNum < States.LAST_STATE; stateNum++) {
            table[stateNum] = initState();
        }
    }
    function at_on(state, event, next, action) {
        TransitionTable[state][event] = next;
        if (isString(action)) {
            ActionTable[state][event] = [action];
        }
        else {
            ActionTable[state][event] = action;
        }
    }
    function default_for(state, next, action) {
        for (var event = Events.LeadLabelChar; event < Events.LAST_EVENT; event++) {
            at_on(state, event, next, action);
        }
    }
    function _start() {
        let start = States.StartAwaitSelector;
        default_for(start, start, Actions.ErrorBeforeSelector);
        at_on(start, Events.LeadLabelChar, States.GettingTag, [Actions.ClearTag, Actions.AppendTag]);
        at_on(start, Events.ClassPrefix, States.GettingClass, Actions.ClearClass);
        at_on(start, Events.IdPrefix, States.GettingId, Actions.ClearId);
        at_on(start, Events.DescendentSeparator, start, Actions.Ignore);
    }
    function _tag() {
        let tag = States.GettingTag;
        default_for(tag, tag, Actions.ErrorInTag);
        at_on(tag, Events.LabelChar, tag, Actions.AppendTag);
        at_on(tag, Events.LeadLabelChar, tag, Actions.AppendTag);
        at_on(tag, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveTag);
        at_on(tag, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveTag);
        at_on(tag, Events.ClassPrefix, States.GettingClass, [Actions.SaveTag, Actions.ClearClass]);
        at_on(tag, Events.IdPrefix, States.GettingId, [Actions.SaveTag, Actions.ClearId]);
        at_on(tag, Events.LeftSqBracket, States.GettingAttribName, [Actions.SaveTag, Actions.ClearAttrib]);
        at_on(tag, Events.EndInput, tag, Actions.SaveTag);
    }
    function _id() {
        let id = States.GettingId;
        default_for(id, id, Actions.ErrorInId);
        at_on(id, Events.LabelChar, id, Actions.AppendId);
        at_on(id, Events.LeadLabelChar, id, Actions.AppendId);
        at_on(id, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveId);
        at_on(id, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveId);
        at_on(id, Events.ClassPrefix, States.GettingClass, [Actions.SaveId, Actions.ClearClass]);
        at_on(id, Events.LeftSqBracket, States.GettingAttribName, [Actions.SaveId, Actions.ClearAttrib]);
        at_on(id, Events.EndInput, id, Actions.SaveId);
    }
    function _class() {
        let classState = States.GettingClass;
        default_for(classState, classState, Actions.ErrorInClass);
        at_on(classState, Events.LabelChar, classState, Actions.AppendClass);
        at_on(classState, Events.LeadLabelChar, classState, Actions.AppendClass);
        at_on(classState, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveClass);
        at_on(classState, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveClass);
        at_on(classState, Events.IdPrefix, States.GettingId, [Actions.SaveClass, Actions.ClearId]);
        at_on(classState, Events.LeftSqBracket, States.GettingAttribName, [Actions.SaveClass, Actions.ClearAttrib]);
        at_on(classState, Events.EndInput, classState, Actions.SaveClass);
    }
    function _descendent() {
        let descend = States.AwaitDescendentSelector;
        default_for(descend, descend, Actions.ErrorBeforeSelector);
        at_on(descend, Events.DescendentSeparator, descend, Actions.Ignore);
        at_on(descend, Events.ChildSeparator, States.AwaitChildSelector, Actions.Ignore);
        at_on(descend, Events.LeadLabelChar, States.GettingTag, [Actions.NewDescendent, Actions.ClearTag, Actions.AppendTag]);
        at_on(descend, Events.IdPrefix, States.GettingId, [Actions.NewDescendent, Actions.ClearId]);
        at_on(descend, Events.ClassPrefix, States.GettingClass, [Actions.NewDescendent, Actions.ClearClass]);
        at_on(descend, Events.LeftSqBracket, States.AttribValueStart, [Actions.NewDescendent, Actions.ClearAttrib]);
        at_on(descend, Events.EndInput, descend, Actions.Ignore);
    }
    function _child() {
        let waitchild = States.AwaitChildSelector;
        default_for(waitchild, waitchild, Actions.ErrorBeforeSelector);
        at_on(waitchild, Events.ChildSeparator, waitchild, Actions.Ignore);
        at_on(waitchild, Events.DescendentSeparator, waitchild, Actions.Ignore);
        at_on(waitchild, Events.LeadLabelChar, States.GettingTag, [Actions.NewChild, Actions.ClearTag, Actions.AppendTag]);
        at_on(waitchild, Events.IdPrefix, States.GettingId, [Actions.NewChild, Actions.ClearId, Actions.AppendId]);
        at_on(waitchild, Events.ClassPrefix, States.GettingClass, [Actions.NewChild, Actions.ClearClass, Actions.AppendClass]);
        at_on(waitchild, Events.LeftSqBracket, States.AttribValueStart, [Actions.NewChild, Actions.ClearAttrib]);
        at_on(waitchild, Events.EndInput, waitchild, Actions.ErrorUnexpectedEnd);
    }
    initTable(TransitionTable);
    initTable(ActionTable);
    _start();
    _tag();
    _id();
    _class();
    _descendent();
    _child();
} //-- setup_tables
setup_tables();
function isAlpha(_char) {
    return (_char >= 'a' && _char <= 'z') || (_char >= 'A' && _char <= 'Z');
}
function isLabelLead(_char) {
    return _char === '_' || isAlpha(_char);
}
function isNumeric(_char) {
    return _char >= '0' && _char <= '9';
}
function isLabelContinuer(_char) {
    return isNumeric(_char) || isLabelLead(_char);
}
function event(_char) {
    if (_char.length != 1) {
        throw new Error("Can only determine an event for a single character!");
    }
    if (isLabelLead(_char)) {
        return Events.LeadLabelChar;
    }
    if (isLabelContinuer(_char)) {
        return Events.LabelChar;
    }
    switch (_char) {
        case '.': return Events.ClassPrefix;
        case '#': return Events.IdPrefix;
        case '[': return Events.LeftSqBracket;
        case ']': return Events.RightSqBracket;
        case '=': return Events.EqualSign;
        case ' ': return Events.DescendentSeparator;
        case '\t': return Events.DescendentSeparator;
        case '>': return Events.ChildSeparator;
        case '"': return Events.Quote;
    }
    return Events.Illegal;
}
function has_tag(token) { return !!token._tag; }
function with_tag(token, callback) {
    if (!!token._tag) {
        callback(token._tag);
    }
}
function has_class(token) { return !!token._class; }
function with_class(token, callback) {
    if (!!token._class) {
        callback(token._class);
    }
}
function has_id(token) { return !!token._id; }
function with_id(token, callback) {
    if (!!token._id) {
        callback(token._id);
    }
}
class SelectorLexer {
    get tokens() { return this._root_token; }
    constructor() {
        this._root_token = {};
        this._current = this._root_token;
        this._state = States.StartAwaitSelector;
        this._event = Events.LAST_EVENT;
        this._actions = [Actions.Ignore];
        this._input = '';
        this._actionLookup = {};
        this.setup_actions();
    }
    lex_selector(selector, debug = false) {
        for (var index = 0; index < selector.length; index++) {
            this._input = selector.charAt(index);
            this._event = event(this._input);
            this.stimulus(debug);
        }
        this._input = '';
        this._event = Events.EndInput;
        this.stimulus(debug);
    }
    stimulus(debug) {
        let next = TransitionTable[this._state][this._event];
        this._actions = ActionTable[this._state][this._event];
        if (debug) {
            console.warn(`Stimulus: ${this._state} =['${this._input}' ${this._event.toString()}]=>${next} @ ${this._actions}`);
        }
        this._state = next;
        this.perform_actions();
    }
    perform_actions() {
        if (!this._actions) {
            console.error(`No actions for State: ${this._state} Input: ${this._input}`);
            return;
        }
        this._actions.forEach((_action) => {
            if (this._actionLookup[_action]) {
                this._actionLookup[_action]();
            }
            else {
                console.error(`No action handler setup for action ${_action}`);
            }
        });
    }
    error(message) {
        throw new Error(message);
    }
    general_actions() {
        this._actionLookup[Actions.Ignore] = () => { };
        this._actionLookup[Actions.ErrorBeforeSelector] = () => this.error(`Error before selector with character '${this._input}'`);
        this._actionLookup[Actions.ErrorUnexpectedEnd] = () => this.error(`Unexpected end of input.`);
    }
    tag_actions() {
        this._actionLookup[Actions.ClearTag] = () => this._current._tag = '';
        this._actionLookup[Actions.AppendTag] = () => this._current._tag += this._input;
        this._actionLookup[Actions.SaveTag] = () => {
            let tag = this._current._tag;
            this._current._tag = !!tag ? tag.toUpperCase() : '';
        };
        this._actionLookup[Actions.ErrorInTag] = () => this.error(`Character '${this._input}' not legal in a tag name.`);
        this._actionLookup[Actions.ErrorAfterTag] = () => this.error(`Character '${this._input}' not legal after a tag name.`);
    }
    class_actions() {
        this._actionLookup[Actions.ClearClass] = () => this._current._class = '';
        this._actionLookup[Actions.AppendClass] = () => this._current._class += this._input;
        this._actionLookup[Actions.SaveClass] = () => { };
        this._actionLookup[Actions.ErrorInClass] = () => this.error(`Error in class at character '${this._input}'`);
    }
    id_actions() {
        this._actionLookup[Actions.ClearId] = () => this._current._id = '';
        this._actionLookup[Actions.AppendId] = () => this._current._id += this._input;
        this._actionLookup[Actions.SaveId] = () => { };
        this._actionLookup[Actions.ErrorInId] = () => this.error(`Error in ID at character '${this._input}'`);
    }
    child_actions() {
        this._actionLookup[Actions.NewChild] = () => {
            let new_child = {};
            this._current._child = new_child;
            this._current = new_child;
        };
    }
    setup_actions() {
        this.general_actions();
        this.tag_actions();
        this.class_actions();
        this.id_actions();
        this.child_actions();
    }
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
exports.SelectorLexer = SelectorLexer;
exports.has_tag = has_tag;
exports.with_tag = with_tag;
exports.has_class = has_class;
exports.with_class = with_class;
exports.has_id = has_id;
exports.with_id = with_id;
