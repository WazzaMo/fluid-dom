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
    Events[Events["SelectorSeparator"] = 0] = "SelectorSeparator";
    Events[Events["LeadLabelChar"] = 1] = "LeadLabelChar";
    Events[Events["LabelChar"] = 2] = "LabelChar";
    Events[Events["ChildSeparator"] = 3] = "ChildSeparator";
    Events[Events["DescendentSeparator"] = 4] = "DescendentSeparator";
    Events[Events["ClassPrefix"] = 5] = "ClassPrefix";
    Events[Events["IdPrefix"] = 6] = "IdPrefix";
    Events[Events["LeftSqBracket"] = 7] = "LeftSqBracket";
    Events[Events["RightSqBracket"] = 8] = "RightSqBracket";
    Events[Events["EqualSign"] = 9] = "EqualSign";
    Events[Events["Quote"] = 10] = "Quote";
    Events[Events["EndInput"] = 11] = "EndInput";
    Events[Events["Illegal"] = 12] = "Illegal";
    Events[Events["OtherSymbol"] = 13] = "OtherSymbol";
    Events[Events["LAST_EVENT"] = 14] = "LAST_EVENT";
})(Events || (Events = {}));
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
    Actions["ErrorMultipleChildSeparators"] = "ERROR-too-many-child-separators";
    Actions["ErrorAttribBracketsNotClosed"] = "ERROR-attribute-bracket-missing";
    Actions["ErrorAttribValueQuoteMissing"] = "ERROR-attrib-value-quote-missing";
    Actions["ErrorIncompleteSelectorList"] = "ERROR-incomplete-selector-list";
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
    Actions["NewSelectorInSet"] = "NEW-SELECTOR-IN-SET";
})(exports.Actions || (exports.Actions = {}));
var States;
(function (States) {
    States[States["StartAwaitSelector"] = 0] = "StartAwaitSelector";
    States[States["GettingTag"] = 1] = "GettingTag";
    States[States["GettingClass"] = 2] = "GettingClass";
    States[States["GettingId"] = 3] = "GettingId";
    States[States["AwaitDescendentSelector"] = 4] = "AwaitDescendentSelector";
    States[States["AwaitChildSelector"] = 5] = "AwaitChildSelector";
    States[States["AwaitAttribName"] = 6] = "AwaitAttribName";
    States[States["GettingAttribName"] = 7] = "GettingAttribName";
    States[States["AwaitEqualSignOrEnd"] = 8] = "AwaitEqualSignOrEnd";
    States[States["AwaitAttribValueStartQuote"] = 9] = "AwaitAttribValueStartQuote";
    States[States["GettingAttribValue"] = 10] = "GettingAttribValue";
    States[States["AttribValueEndQuote"] = 11] = "AttribValueEndQuote";
    States[States["AwaitAttribEnd"] = 12] = "AwaitAttribEnd";
    States[States["AwaitExtraAttribStart"] = 13] = "AwaitExtraAttribStart";
    States[States["GotSelectorSeparatorAwaitNewSelector"] = 14] = "GotSelectorSeparatorAwaitNewSelector";
    States[States["LAST_STATE"] = 15] = "LAST_STATE";
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
        default_for(start, start, exports.Actions.ErrorBeforeSelector);
        at_on(start, Events.LeadLabelChar, States.GettingTag, [exports.Actions.ClearTag, exports.Actions.AppendTag]);
        at_on(start, Events.ClassPrefix, States.GettingClass, exports.Actions.ClearClass);
        at_on(start, Events.IdPrefix, States.GettingId, exports.Actions.ClearId);
        at_on(start, Events.DescendentSeparator, start, exports.Actions.Ignore);
        at_on(start, Events.LeftSqBracket, States.AwaitAttribName, exports.Actions.Ignore);
    }
    function _start_new_selector_in_set() {
        let new_sel = States.GotSelectorSeparatorAwaitNewSelector;
        default_for(new_sel, new_sel, exports.Actions.ErrorBeforeSelector);
        at_on(new_sel, Events.LeadLabelChar, States.GettingTag, [exports.Actions.ClearTag, exports.Actions.AppendTag]);
        at_on(new_sel, Events.ClassPrefix, States.GettingClass, exports.Actions.ClearClass);
        at_on(new_sel, Events.IdPrefix, States.GettingId, exports.Actions.ClearId);
        at_on(new_sel, Events.DescendentSeparator, new_sel, exports.Actions.Ignore);
        at_on(new_sel, Events.LeftSqBracket, States.AwaitAttribName, exports.Actions.Ignore);
        at_on(new_sel, Events.EndInput, new_sel, exports.Actions.ErrorIncompleteSelectorList);
    }
    function _tag() {
        let tag = States.GettingTag;
        default_for(tag, tag, exports.Actions.ErrorInTag);
        at_on(tag, Events.LabelChar, tag, exports.Actions.AppendTag);
        at_on(tag, Events.LeadLabelChar, tag, exports.Actions.AppendTag);
        at_on(tag, Events.DescendentSeparator, States.AwaitDescendentSelector, exports.Actions.SaveTag);
        at_on(tag, Events.ChildSeparator, States.AwaitChildSelector, exports.Actions.SaveTag);
        at_on(tag, Events.ClassPrefix, States.GettingClass, [exports.Actions.SaveTag, exports.Actions.ClearClass]);
        at_on(tag, Events.IdPrefix, States.GettingId, [exports.Actions.SaveTag, exports.Actions.ClearId]);
        at_on(tag, Events.LeftSqBracket, States.GettingAttribName, exports.Actions.SaveTag);
        at_on(tag, Events.EndInput, tag, exports.Actions.SaveTag);
        at_on(tag, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [exports.Actions.SaveTag, exports.Actions.NewSelectorInSet]);
    }
    function _id() {
        let id = States.GettingId;
        default_for(id, id, exports.Actions.ErrorInId);
        at_on(id, Events.LabelChar, id, exports.Actions.AppendId);
        at_on(id, Events.LeadLabelChar, id, exports.Actions.AppendId);
        at_on(id, Events.DescendentSeparator, States.AwaitDescendentSelector, exports.Actions.SaveId);
        at_on(id, Events.ChildSeparator, States.AwaitChildSelector, exports.Actions.SaveId);
        at_on(id, Events.ClassPrefix, States.GettingClass, [exports.Actions.SaveId, exports.Actions.ClearClass]);
        at_on(id, Events.LeftSqBracket, States.GettingAttribName, exports.Actions.SaveId);
        at_on(id, Events.EndInput, id, exports.Actions.SaveId);
        at_on(id, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [exports.Actions.SaveId, exports.Actions.NewSelectorInSet]);
    }
    function _class() {
        let classState = States.GettingClass;
        default_for(classState, classState, exports.Actions.ErrorInClass);
        at_on(classState, Events.LabelChar, classState, exports.Actions.AppendClass);
        at_on(classState, Events.LeadLabelChar, classState, exports.Actions.AppendClass);
        at_on(classState, Events.DescendentSeparator, States.AwaitDescendentSelector, exports.Actions.SaveClass);
        at_on(classState, Events.ChildSeparator, States.AwaitChildSelector, exports.Actions.SaveClass);
        at_on(classState, Events.IdPrefix, States.GettingId, [exports.Actions.SaveClass, exports.Actions.ClearId]);
        at_on(classState, Events.LeftSqBracket, States.GettingAttribName, exports.Actions.SaveClass);
        at_on(classState, Events.EndInput, classState, exports.Actions.SaveClass);
        at_on(classState, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [exports.Actions.SaveClass, exports.Actions.NewSelectorInSet]);
    }
    function _descendent() {
        let descend = States.AwaitDescendentSelector;
        default_for(descend, descend, exports.Actions.ErrorBeforeSelector);
        at_on(descend, Events.DescendentSeparator, descend, exports.Actions.Ignore);
        at_on(descend, Events.ChildSeparator, States.AwaitChildSelector, exports.Actions.Ignore);
        at_on(descend, Events.LeadLabelChar, States.GettingTag, [exports.Actions.NewDescendent, exports.Actions.ClearTag, exports.Actions.AppendTag]);
        at_on(descend, Events.IdPrefix, States.GettingId, [exports.Actions.NewDescendent, exports.Actions.ClearId]);
        at_on(descend, Events.ClassPrefix, States.GettingClass, [exports.Actions.NewDescendent, exports.Actions.ClearClass]);
        at_on(descend, Events.LeftSqBracket, States.AwaitAttribName, exports.Actions.NewDescendent);
        at_on(descend, Events.EndInput, descend, exports.Actions.Ignore);
        // not a descendent after all..
        at_on(descend, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, exports.Actions.NewSelectorInSet);
    }
    function _child() {
        let waitchild = States.AwaitChildSelector;
        default_for(waitchild, waitchild, exports.Actions.ErrorBeforeSelector);
        at_on(waitchild, Events.ChildSeparator, waitchild, exports.Actions.ErrorMultipleChildSeparators);
        at_on(waitchild, Events.DescendentSeparator, waitchild, exports.Actions.Ignore);
        at_on(waitchild, Events.LeadLabelChar, States.GettingTag, [exports.Actions.NewChild, exports.Actions.ClearTag, exports.Actions.AppendTag]);
        at_on(waitchild, Events.IdPrefix, States.GettingId, [exports.Actions.NewChild, exports.Actions.ClearId, exports.Actions.AppendId]);
        at_on(waitchild, Events.ClassPrefix, States.GettingClass, [exports.Actions.NewChild, exports.Actions.ClearClass, exports.Actions.AppendClass]);
        at_on(waitchild, Events.LeftSqBracket, States.AwaitAttribName, exports.Actions.NewChild);
        at_on(waitchild, Events.EndInput, waitchild, exports.Actions.ErrorUnexpectedEnd);
    }
    function _await_attrib_name() {
        let wait_attrib = States.AwaitAttribName;
        default_for(wait_attrib, wait_attrib, exports.Actions.ErrorInAttribute);
        at_on(wait_attrib, Events.LeadLabelChar, States.GettingAttribName, [exports.Actions.ClearAttrib, exports.Actions.AppendAttrib]);
        at_on(wait_attrib, Events.DescendentSeparator, wait_attrib, exports.Actions.Ignore);
        at_on(wait_attrib, Events.EndInput, wait_attrib, exports.Actions.ErrorInAttribute);
    }
    function _attrib_name() {
        let attrib = States.GettingAttribName;
        default_for(attrib, States.StartAwaitSelector, exports.Actions.ErrorInAttribute);
        at_on(attrib, Events.LeadLabelChar, attrib, exports.Actions.AppendAttrib);
        at_on(attrib, Events.LabelChar, attrib, exports.Actions.AppendAttrib);
        at_on(attrib, Events.DescendentSeparator, States.AwaitEqualSignOrEnd, exports.Actions.SaveAttrib);
        at_on(attrib, Events.EqualSign, States.AwaitAttribValueStartQuote, [exports.Actions.SaveAttrib, exports.Actions.ClearAttribValue]);
        at_on(attrib, Events.RightSqBracket, States.AwaitExtraAttribStart, exports.Actions.SaveAttrib);
        at_on(attrib, Events.EndInput, attrib, exports.Actions.ErrorAttribBracketsNotClosed);
    }
    function _await_extra_attrib() {
        let wait_extra = States.AwaitExtraAttribStart;
        default_for(wait_extra, wait_extra, exports.Actions.ErrorBeforeSelector);
        at_on(wait_extra, Events.LeftSqBracket, States.AwaitAttribName, exports.Actions.Ignore);
        at_on(wait_extra, Events.DescendentSeparator, States.AwaitDescendentSelector, exports.Actions.Ignore);
        at_on(wait_extra, Events.ChildSeparator, States.AwaitChildSelector, exports.Actions.Ignore);
        at_on(wait_extra, Events.EndInput, wait_extra, exports.Actions.Ignore);
    }
    function _await_attrib_equals() {
        let waitequ = States.AwaitEqualSignOrEnd;
        default_for(waitequ, waitequ, exports.Actions.ErrorInAttribute);
        at_on(waitequ, Events.EqualSign, States.AwaitAttribValueStartQuote, exports.Actions.Ignore);
        at_on(waitequ, Events.DescendentSeparator, waitequ, exports.Actions.Ignore);
        at_on(waitequ, Events.EndInput, waitequ, exports.Actions.ErrorAttribBracketsNotClosed);
    }
    function _await_attrib_value_start() {
        let waitquote = States.AwaitAttribValueStartQuote;
        default_for(waitquote, waitquote, exports.Actions.ErrorAttribValueQuoteMissing);
        at_on(waitquote, Events.Quote, States.GettingAttribValue, exports.Actions.ClearAttribValue);
        at_on(waitquote, Events.DescendentSeparator, waitquote, exports.Actions.Ignore);
    }
    function _get_attrib_value() {
        let getvalue = States.GettingAttribValue;
        default_for(getvalue, getvalue, exports.Actions.ErrorInAttribValue);
        at_on(getvalue, Events.Quote, States.AwaitAttribEnd, exports.Actions.SaveAttribValue);
        at_on(getvalue, Events.LeadLabelChar, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.LabelChar, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.DescendentSeparator, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.IdPrefix, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.ClassPrefix, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.ChildSeparator, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.OtherSymbol, getvalue, exports.Actions.AppendAttribValue);
        at_on(getvalue, Events.SelectorSeparator, getvalue, exports.Actions.AppendAttribValue);
    }
    function _await_attrib_end() {
        let wait_end = States.AwaitAttribEnd;
        default_for(wait_end, wait_end, exports.Actions.ErrorAttribBracketsNotClosed);
        at_on(wait_end, Events.DescendentSeparator, wait_end, exports.Actions.Ignore);
        at_on(wait_end, Events.RightSqBracket, States.AwaitExtraAttribStart, exports.Actions.Ignore);
    }
    initTable(TransitionTable);
    initTable(ActionTable);
    _start();
    _start_new_selector_in_set();
    _tag();
    _id();
    _class();
    _descendent();
    _child();
    _await_attrib_name();
    _attrib_name();
    _await_extra_attrib();
    _await_attrib_equals();
    _await_attrib_value_start();
    _get_attrib_value();
    _await_attrib_end();
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
        case ',': return Events.SelectorSeparator;
        case '\n':
        case '\b':
            return Events.Illegal;
    }
    return Events.OtherSymbol;
}
// --------- Token -------------
/**
 * A Lexical Analyser for CSS Selectors.
 */
class SelectorLexer {
    get tokens() { return this._selector_set; }
    constructor() {
        this._selector_set = [{}];
        this._current = this._selector_set[0];
        this._state = States.StartAwaitSelector;
        this._event = Events.LAST_EVENT;
        this._actions = [exports.Actions.Ignore];
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
        throw new Error(`Error ${message}`);
    }
    current(new_token) {
        if (!!new_token) {
            this._current = new_token;
        }
        return this._current;
    }
    extend_selector_set() {
        let new_token = {};
        this._selector_set.push(new_token);
        this.current(new_token);
    }
    general_actions() {
        this._actionLookup[exports.Actions.Ignore] = () => { };
        this._actionLookup[exports.Actions.ErrorBeforeSelector] = () => this.error(`before selector with character '${this._input}'`);
        this._actionLookup[exports.Actions.ErrorUnexpectedEnd] = () => this.error(` - unexpected end of input.`);
    }
    tag_actions() {
        this._actionLookup[exports.Actions.ClearTag] = () => this.current()._tag = '';
        this._actionLookup[exports.Actions.AppendTag] = () => this.current()._tag += this._input;
        this._actionLookup[exports.Actions.SaveTag] = () => {
            let tag = this.current()._tag;
            this.current()._tag = !!tag ? tag.toUpperCase() : '';
        };
        this._actionLookup[exports.Actions.ErrorInTag] = () => this.error(`- character '${this._input}' not legal in a tag name.`);
        this._actionLookup[exports.Actions.ErrorAfterTag] = () => this.error(`- character '${this._input}' not legal after a tag name.`);
    }
    class_actions() {
        this._actionLookup[exports.Actions.ClearClass] = () => this.current()._class = '';
        this._actionLookup[exports.Actions.AppendClass] = () => this.current()._class += this._input;
        this._actionLookup[exports.Actions.SaveClass] = () => { };
        this._actionLookup[exports.Actions.ErrorInClass] = () => this.error(`in class at character '${this._input}'`);
    }
    id_actions() {
        this._actionLookup[exports.Actions.ClearId] = () => this.current()._id = '';
        this._actionLookup[exports.Actions.AppendId] = () => this.current()._id += this._input;
        this._actionLookup[exports.Actions.SaveId] = () => { };
        this._actionLookup[exports.Actions.ErrorInId] = () => this.error(`in ID at character '${this._input}'`);
    }
    child_actions() {
        this._actionLookup[exports.Actions.NewChild] = () => {
            let new_child = {};
            this.current()._child = new_child;
            this.current(new_child);
        };
    }
    descendent_actions() {
        this._actionLookup[exports.Actions.NewDescendent] = () => {
            let new_descendent = {};
            this.current()._descendent = new_descendent;
            this.current(new_descendent);
        };
    }
    selector_set_actions() {
        this._actionLookup[exports.Actions.NewSelectorInSet] = () => this.extend_selector_set();
        this._actionLookup[exports.Actions.ErrorIncompleteSelectorList] = () => this.error(`list of selectors was incomplete. Expected another selector.`);
    }
    attrib_actions() {
        this._actionLookup[exports.Actions.ClearAttrib] = () => this.createAttrib();
        this._actionLookup[exports.Actions.AppendAttrib] = () => {
            let attrib = this.getLastAttrib();
            attrib.name += this._input;
        };
        this._actionLookup[exports.Actions.SaveAttrib] = () => { };
        this._actionLookup[exports.Actions.ErrorInAttribute] = () => this.error(`in attribute name at character '${this._input}'`);
        this._actionLookup[exports.Actions.ErrorAttribBracketsNotClosed] = () => this.error(`in attribute: missing ']'`);
        this._actionLookup[exports.Actions.ErrorAttribValueQuoteMissing] = () => this.error(`in attribute with missing quote (") for attribute value at character '${this._input}'`);
    }
    attrib_value_actions() {
        this._actionLookup[exports.Actions.ClearAttribValue] = () => {
            let attrib = this.getLastAttrib();
            attrib.value = '';
        };
        this._actionLookup[exports.Actions.AppendAttribValue] = () => {
            let attrib = this.getLastAttrib();
            attrib.value += this._input;
        };
        this._actionLookup[exports.Actions.SaveAttribValue] = () => { };
        this._actionLookup[exports.Actions.ErrorInAttribValue] = () => this.error(`in attribute value at character '${this._input}'`);
    }
    setup_actions() {
        this.general_actions();
        this.tag_actions();
        this.class_actions();
        this.id_actions();
        this.child_actions();
        this.descendent_actions();
        this.selector_set_actions();
        this.attrib_actions();
        this.attrib_value_actions();
    }
    createAttrib() {
        let new_attrib;
        new_attrib = { name: '' };
        let current_attrib_list = this.current()._attrib;
        if (current_attrib_list) {
            current_attrib_list.push(new_attrib);
        }
        else {
            this.current()._attrib = [new_attrib];
        }
        return new_attrib;
    }
    getLastAttrib() {
        let current_attrib_list = this.current()._attrib;
        if (current_attrib_list) {
            let list = current_attrib_list;
            let latest_attrib = list[list.length - 1];
            return latest_attrib;
        }
        else {
            throw new Error(`Can't append attribute name when record undefined for input: '${this._input}'`);
        }
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
