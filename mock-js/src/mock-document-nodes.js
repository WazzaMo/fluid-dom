/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * Identifies a mock document node as text-only or a mark-up element.
 */
export var MockNodeType;
(function (MockNodeType) {
    MockNodeType["TextNode"] = "TEXTNODE";
    MockNodeType["ElementNode"] = "ELEMENTNODE";
})(MockNodeType || (MockNodeType = {}));
/**
 * Concrete implementation of a TextNode.
 * Represents the un-marked-up text in a document.
 */
export class TextNode {
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
export class ElementNode {
    get nodeType() { return MockNodeType.ElementNode; }
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
            if (child.nodeType == MockNodeType.ElementNode) {
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
export function toHtml(element) {
    let attribs = attributesToString(element);
    let as_html = `
    <${element.tag}${attribs}>
      ${element.text_value}${element.children_as_html()}
    </${element.tag}>
  `;
    return as_html;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1kb2N1bWVudC1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2NrLWRvY3VtZW50LW5vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7O0dBSUc7QUFFRjs7R0FFRztBQUNKLE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIscUNBQXFCLENBQUE7SUFDckIsMkNBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUhXLFlBQVksS0FBWixZQUFZLFFBR3ZCO0FBeUJEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBQ25CLElBQUksUUFBUSxLQUFtQixPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlELElBQUksUUFBUSxLQUFxQixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHN0MsWUFBWSxJQUFjO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRjtBQVNEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBU3RCLElBQUksUUFBUSxLQUFtQixPQUFPLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLElBQUksUUFBUSxLQUFxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pELElBQUksVUFBVSxLQUFhLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxVQUFVLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUzRCxJQUFJLEdBQUcsS0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLElBQUksTUFBTSxLQUErQixPQUFPLElBQUksQ0FBQyxP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