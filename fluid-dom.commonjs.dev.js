//  Fluid-DOM v 1.2.0
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
function providesAll(list, args) {
    var message = '';
    for (var expectedArg of list) {
        var hasValue = args[expectedArg] != undefined;
        if (!hasValue) {
            message += `Value for ${expectedArg} was not provided.\n`;
        }
    }
    if (!!message) {
        console.error(`Expected ${list.length} parameters:\n${message}`);
        return false;
    }
    return true;
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
class DomAttributes {
    constructor(_webElement) {
        this._webElement = _webElement;
    }
    forEach(callback) {
        for (var attribute of this._webElement.attributes) {
            callback(attribute.name, attribute.value);
        }
        return this;
    }
    attributeNames() {
        var list = new Array();
        for (var attr of this._webElement.attributes) {
            list.push(attr.name);
        }
        return list;
    }
    add(name, value) {
        return this.set(name, value);
    }
    set(name, value) {
        this._webElement.setAttribute(name, value);
        return this;
    }
    with(name, callback) {
        var value = this.get(name);
        callback(value);
        return this;
    }
    get(name) {
        return this._webElement.getAttribute(name);
    }
    has(name) {
        return this._webElement.getAttribute(name) != null;
    }
    remove(name) {
        this._webElement.removeAttribute(name);
        return this;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * # DomClasses
 *
 * An implementation of the IClasses interface that allows operations
 * to be performed on DOM objects in a browser.
 */
class DomClasses {
    constructor(_element, elementObject) {
        this.element = elementObject;
        this.htmlElement = _element;
    }
    forEach(task) {
        for (var _class of this.htmlElement.classList) {
            task(_class);
        }
        return this;
    }
    has(name) {
        return this.htmlElement.classList.contains(name);
    }
    /**
     * Calls the given function if-and-only-if the named class is on the element.
     * The function is called with the (fluid) element object to allow things to
     * be done with it. Returns self.
     * @param name- HTML class name to seek
     * @param callback- callback to run to manipulate the element if present.
     */
    whenHas(name, callback) {
        if (this.has(name)) {
            callback(this.element);
        }
        return this;
    }
    add(_class) {
        if (!!_class && _class.length > 0) {
            if (this.htmlElement) {
                this.htmlElement.classList.add(_class);
            }
            else {
                throw Error(`Can't edit classes on DomElement that provides no HTMLElement.`);
            }
        }
        else {
            console.error(`Class name given was "${_class}" - it must not be empty!`);
        }
        return this;
    }
    remove(_class) {
        this.htmlElement.classList.remove(_class);
        return this;
    }
    set(_class) {
        if (!this.has(_class)) {
            this.add(_class);
        }
        return this;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * # NonClasses
 *
 * Is a nil-effect IClasses instance to return
 * in any situation where the IElement implementation
 * cannot provide a backing for the style classes from
 * a document.
 */
class NonClasses {
    constructor() { }
    forEach(callback) {
        return this;
    }
    has(name) {
        return false;
    }
    whenHas(name, callback) {
        return this;
    }
    add(_class) {
        return this;
    }
    remove(_class) {
        return this;
    }
    set(_class) {
        return this;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * Represents a non-attributes instance, to be returned
 * when no effective attributes instance can be provided.
 */
class NonAttributes {
    constructor() { }
    forEach(callback) {
        return this;
    }
    attributeNames() {
        return [];
    }
    add(name, value) {
        return this;
    }
    set(name, value) {
        return this;
    }
    with(name, callback) {
        return this;
    }
    get(name) {
        return null;
    }
    has(name) {
        return false;
    }
    remove(name) {
        return this;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * Represents a non-element. To be returned in answer
 * for an element but one cannot be provided.
 */
class NonElement {
    constructor() { }
    isValid() {
        return false;
    }
    getParent() {
        return this;
    }
    withChildren(callback) {
        return this;
    }
    expect(tagName) {
        return this;
    }
    getId() {
        return null;
    }
    hasId() {
        return false;
    }
    exists() {
        return false;
    }
    findAll(elementListLocation) {
        return [];
    }
    selectFirst(selector) {
        return this;
    }
    selectorPath() {
        return '';
    }
    tagName() {
        return '';
    }
    text(_text) {
        if (_text) {
            return this;
        }
        else {
            return '';
        }
    }
    html(_html) {
        if (_html) {
            return this;
        }
        else {
            return '';
        }
    }
    append(_html) {
        return this;
    }
    prepend(_html) {
        return this;
    }
    remove() {
        return undefined;
    }
    attributes() {
        return new NonAttributes();
    }
    classes() {
        return new NonClasses();
    }
    on(args) { }
    value() {
        return undefined;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * @private an internal function.
 * @param collection HTML collection to convert into array of IElement
 */
function convertHtmlCollection(collection) {
    let list = [];
    for (var index = 0; index < collection.length; index++) {
        let child = collection[index];
        list.push(new DomElement(child));
    }
    return list;
}
/**
 * @private an internal function.
 */
function selectorPath(element) {
    let path = '';
    if (element) {
        let id = element.getAttribute('id');
        if (id) {
            path = `#{$id}`;
        }
        else if (!element.parentElement) {
            path = element.tagName;
        }
        else {
            path = `${selectorPath(element.parentElement)}>${element.tagName}`;
        }
    }
    return path;
}
/**
 * @private an internal function.
 */
function getBySelector(element, selector) {
    let first = element.querySelector(selector);
    if (first) {
        return first;
    }
    else {
        first = document.querySelector(`${selectorPath(element)}>${selector}`);
        if (first) {
            return first;
        }
    }
    return null;
}
/**
 * # DomElement
 *
 * The implementation IElement for elements in the browser
 * page from the DOM.
 */
class DomElement {
    constructor(element) {
        this.domElement = new Option(element);
    }
    alertInvalid() {
        console.error("IElement[DomElement] is invalid.");
    }
    /**
     * Finds elements in a document using a selector.
     * @param selector - CSS style selector.
     * @returns list of matching elements.
     */
    static getListFromSelector(selector) {
        let list = document.querySelectorAll(selector);
        return convertHtmlCollection(list);
    }
    /**
     * Finds elements in a document using a class name.
     * Note do not prefix with a period (`.`) - just provide
     * the pure class name.
     * @param class - pure class name.
     * @returns list of matching elements.
     */
    static getListFromClass(_class) {
        let list = document.querySelectorAll(`.${_class}`);
        return convertHtmlCollection(list);
    }
    /**
     * Finds elements in a document using a tag-name.
     * @param tagName - tag name (case insensitive).
     * @returns list of matching elements.
     */
    static getListFromTagName(tagName) {
        let list = document.querySelectorAll(tagName);
        return convertHtmlCollection(list);
    }
    static getElementFromId(id) {
        let element = document.querySelector(`#${id}`);
        return DomElement.makeFromElement(element);
    }
    /**
     * Gets the first matching element from a document.
     * @param selector - a CSS style selector
     * @returns an element object.
     */
    static getElementFromSelector(selector) {
        let element = document.querySelector(selector);
        return DomElement.makeFromElement(element);
    }
    static makeFromElement(element) {
        return (!!element) ? new DomElement(element) : new NonElement();
    }
    isValid() {
        return this.domElement.isValid;
    }
    getParent() {
        if (this.domElement.isValid) {
            let element = this.domElement.Value;
            let _par = element.parentElement;
            let parent;
            parent = _par ? new DomElement(_par) : new DomElement();
            return parent;
        }
        return new NonElement();
    }
    withChildren(callback) {
        if (this.domElement.isValid && this.domElement.Value.children.length > 0) {
            let list = convertHtmlCollection(this.domElement.Value.children);
            callback(list);
        }
        return this;
    }
    expect(tagName) {
        if (this.domElement.isValid) {
            let actual = this.domElement.Value.tagName.toUpperCase();
            let expected = tagName.toUpperCase();
            if (actual != expected) {
                console.error(`Expected ${expected} but Actual tagName was ${actual}`);
            }
        }
        else {
            this.alertInvalid();
        }
        return this;
    }
    getId() {
        return this.attributes().get('id');
    }
    hasId() {
        return this.attributes().has('id');
    }
    exists() {
        return this.isValid();
    }
    findAll(elementListLocation) {
        let selector = elementListLocation['selector'] || elementListLocation['tagName'];
        if (selector) {
            let collection = this.domElement.Value.querySelectorAll(selector);
            let list = convertHtmlCollection(collection);
            return list;
        }
        return [];
    }
    selectFirst(selector) {
        if (this.domElement.isValid) {
            let first = getBySelector(this.domElement.Value, selector);
            if (first) {
                return new DomElement(first);
            }
        }
        return new DomElement();
    }
    selectorPath() {
        if (this.domElement.isValid) {
            return selectorPath(this.domElement.Value);
        }
        this.alertInvalid();
        return '';
    }
    tagName() {
        if (this.domElement.isValid) {
            return this.domElement.Value.tagName;
        }
        this.alertInvalid();
        return 'UNKNOWN';
    }
    text(_text) {
        if (this.domElement.isValid) {
            let element = this.domElement.Value;
            if (!!_text) {
                element.innerText = _text;
                return this;
            }
            else {
                return element.innerText;
            }
        }
        else {
            this.alertInvalid();
            return '';
        }
    }
    html(_html) {
        if (this.domElement.isValid) {
            let element = this.domElement.Value;
            if (!!_html) {
                element.innerHTML = _html;
                return this;
            }
            else {
                return element.innerHTML;
            }
        }
        else {
            this.alertInvalid();
            return '';
        }
    }
    append(_html) {
        var totalHtml = `${this.html()}${_html}`;
        this.html(totalHtml);
        return this;
    }
    prepend(_html) {
        var totalHtml = `${_html}${this.html()}`;
        this.html(totalHtml);
        return this;
    }
    remove() {
        if (this.domElement.isValid) {
            this.domElement.Value.remove();
        }
        else {
            this.alertInvalid();
        }
        return undefined;
    }
    attributes() {
        if (this.domElement.isValid) {
            return new DomAttributes(this.domElement.Value);
        }
        else {
            return new NonAttributes();
        }
    }
    classes() {
        if (this.domElement.isValid) {
            return new DomClasses(this.domElement.Value, this);
        }
        return new NonClasses();
    }
    on(args) {
        if (providesAll(['event', 'handler'], args) && this.domElement.isValid) {
            var event = args.event;
            var handler = args.handler;
            var optKeepDefault = args.keepDefault;
            this.domElement.Value.addEventListener(event, function (firedEvent) {
                if (!optKeepDefault) {
                    firedEvent.preventDefault();
                }
                handler(firedEvent);
            });
        }
    }
    value() {
        if (this.domElement.isValid) {
            let element = this.domElement.Value;
            if (element['value']) {
                return element.value;
            }
        }
        return undefined;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
var Tag;
(function (Tag) {
    Tag["Button"] = "BUTTON";
    Tag["Div"] = "DIV";
    Tag["Input"] = "INPUT";
    Tag["Paragraph"] = "P";
})(Tag || (Tag = {}));
const EVENT_LIST = [
    'abort', 'afterscriptexecute',
    'animationcancel', 'animationend', 'animationiteration',
    'auxclick',
    'beforescriptexecute', 'blur',
    'change', 'click', 'close', 'contextmenu',
    'dblclick',
    'error',
    'focus', 'fullscreenchange', 'fullscreenerror',
    'gotpointercapture',
    'input',
    'keydown', 'keypress', 'keyup',
    'load', 'loadend', 'loadstart', 'lostpointercapture',
    'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
    'offline', 'online',
    'pointercancel', 'pointerdown', 'pointerenter', 'pointerleave',
    'pointermove', 'pointerout', 'pointerover', 'pointerup',
    'reset', 'resize',
    'scroll', 'select', 'selectionchange', 'selectionchange',
    'selectstart', 'submit',
    'touchcancel', 'touchmove', 'touchstart',
    'transitioncancel', 'transitionend',
    'visibilitychange',
    'wheel'
];
function createEventSet() {
    let events = {};
    for (var event of EVENT_LIST) {
        let key = event.toUpperCase();
        events[key] = event;
    }
    return events;
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
(function (HttpMethod) {
    HttpMethod["CONNECT"] = "CONNECT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["GET"] = "GET";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["TRACE"] = "TRACE";
})(exports.HttpMethod || (exports.HttpMethod = {}));

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
(function (HttpResponseType) {
    HttpResponseType["TEXT"] = "text";
    HttpResponseType["ARRAYBUFFER"] = "arraybuffer";
    HttpResponseType["BLOB"] = "blob";
    HttpResponseType["DOCUMENT"] = "document";
    HttpResponseType["JSON"] = "json";
})(exports.HttpResponseType || (exports.HttpResponseType = {}));

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
(function (HttpProtocol) {
    HttpProtocol["HTTP"] = "http";
    HttpProtocol["HTTPS"] = "https";
    HttpProtocol["FILE"] = "file";
})(exports.HttpProtocol || (exports.HttpProtocol = {}));

class HttpPromise {
    constructor(_http) {
        this.httpObject = _http;
        this.promise = undefined;
    }
    createPromise(handler) {
        this.result = undefined;
        this.promise = new Promise((promiseResolver, promiseRejector) => {
            let self = this;
            let _resolve = function (data) {
                self.result = data;
                promiseResolver(data);
            };
            handler(_resolve, promiseRejector);
        });
    }
    isResolved() {
        return this.result != undefined;
    }
    http() {
        return this.httpObject;
    }
    afterResult(contextThen) {
        if (this.hasPromise(this.promise)) {
            this.promise.then(resolvedResult => {
                contextThen(this.httpObject, resolvedResult);
            });
        }
        return this;
    }
    then(when) {
        if (this.hasPromise(this.promise)) {
            return this.next(this.promise.then(when));
        }
        return this;
    }
    catch(when) {
        if (this.hasPromise(this.promise)) {
            return this.next(this.promise.catch(when));
        }
        return this;
    }
    hasPromise(promise) {
        return this.promise instanceof Promise;
    }
    next(_promise) {
        let _next = new HttpPromise(this.httpObject);
        _next.promise = _promise;
        return _next;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
class Http {
    constructor() {
        this.protocol = exports.HttpProtocol.HTTP;
        this.port = undefined;
        this.hostname = '';
        this.requestHeaders = [];
        this.path = '';
        this.method = exports.HttpMethod.GET;
        this.body = undefined;
        this.uploadData = undefined;
        this.responseType = exports.HttpResponseType.TEXT;
        this.timeoutMS = 1000;
    }
    host(protocol, hostname, port) {
        this.hostname = hostname;
        this.port = port;
        this.protocol = protocol;
        return this;
    }
    header(name, value) {
        this.requestHeaders.push({ name: name, value: value });
        return this;
    }
    expectedData(type) {
        this.responseType = type;
        return this;
    }
    timeoutAt(duration) {
        this.timeoutMS = duration;
        return this;
    }
    context(task) {
        let _context = new Http();
        _context.protocol = this.protocol;
        _context.port = this.port;
        _context.hostname = this.hostname;
        _context.requestHeaders = new Array().concat(this.requestHeaders);
        _context.path = this.path;
        _context.method = this.method;
        _context.body = this.body;
        _context.uploadData = this.uploadData;
        _context.responseType = this.responseType;
        task(_context);
        return this;
    }
    call(method, path, body) {
        this.method = method;
        this.path = path;
        if (typeof (body) === 'string') {
            this.body = body;
        }
        else {
            this.body = JSON.stringify(body);
        }
        this.syncPortAndProtocol();
        let portString = (!!this.port) ? `:${this.port}` : ``;
        let url = `${this.protocol}://${this.hostname}${portString}${path}`;
        let xhr = this.createRequestTo(url);
        let promise = this.setHandlers(xhr);
        this.addAnyHeaders(xhr);
        xhr.send(this.body);
        return promise;
    }
    syncPortAndProtocol() {
        if ((this.protocol == exports.HttpProtocol.HTTP && this.port == 80)
            || (this.protocol == exports.HttpProtocol.HTTPS && this.port == 443)
            || this.protocol == exports.HttpProtocol.FILE) {
            this.port = undefined;
        }
    }
    createRequestTo(url) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = this.timeoutMS;
        xhr.open(this.method, url);
        return xhr;
    }
    setErrorHandlers(xhr, reject) {
        xhr.onabort = () => {
            reject('Request Aborted');
        };
        xhr.ontimeout = () => {
            reject('Timed out');
        };
        xhr.onerror = () => {
            reject('Error occurred.');
        };
    }
    createResponseObject(xhr) {
        let headers = xhr
            .getAllResponseHeaders().split('\r\n')
            .map(header_line => {
            let parts = header_line.split(':');
            if (parts && parts.length == 2) {
                return { name: parts[0], value: parts[1] };
            }
            else {
                return undefined;
            }
        })
            .filter(item => item != undefined);
        let collection = {};
        for (var hdr in headers) {
            let a_header = headers[hdr];
            if (a_header) {
                collection[a_header.name] = a_header.value;
            }
        }
        let response = {
            status: xhr.status,
            type: xhr.responseType,
            body: xhr.response,
            headers: collection
        };
        return response;
    }
    setOnCompleteHandler(xhr, resolve, reject) {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(this.createResponseObject(xhr));
                }
                else {
                    reject(`Returned HTTP ${xhr.status}`);
                }
            }
        };
    }
    addAnyHeaders(xhr) {
        if (this.requestHeaders.length > 0) {
            for (var header of this.requestHeaders) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
    }
    setHandlers(xhr) {
        let promise = new HttpPromise(this);
        promise.createPromise((resolve, reject) => {
            this.setErrorHandlers(xhr, reject);
            this.setOnCompleteHandler(xhr, resolve, reject);
        });
        return promise;
    }
}

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
/**
 * List of events for convenience with intelli-sense.
 */
const Events = createEventSet();
class DomFluidDocument {
    constructor() {
    }
    findElement(arg) {
        let id = arg['id'];
        if (id) {
            return DomElement.getElementFromId(id);
        }
        let selector = arg['selector'];
        if (selector) {
            return DomElement.getElementFromSelector(selector);
        }
        return new NonElement();
    }
    findAll(arg) {
        let selector = arg['selector'];
        if (selector) {
            return DomElement.getListFromSelector(selector);
        }
        let _class = arg['class'];
        if (_class) {
            return DomElement.getListFromClass(_class);
        }
        let tagName = arg['tagName'];
        if (tagName) {
            return DomElement.getListFromTagName(tagName);
        }
        return [];
    }
    buttonOn(eventInfo) {
        if (providesAll(['id', 'event', 'handler'], eventInfo)) {
            var id = eventInfo.id;
            var button = this.findElement({ id: id }).expect(Tag.Button);
            button.on(eventInfo);
        }
    }
}
/**
 * Factory function that creates the Browser implementation
 * of Fluid DOM.
 */
function Doc() {
    return new DomFluidDocument();
}

exports.Events = Events;
exports.Doc = Doc;
exports.Http = Http;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1aWQtZG9tLmNvbW1vbmpzLmRldi5qcyIsInNvdXJjZXMiOlsianMvc3JjL3V0aWwuanMiLCJqcy9zcmMvb3B0aW9uLmpzIiwianMvc3JjL2RvbS1hdHRyaWJ1dGVzLmpzIiwianMvc3JjL2RvbS1jbGFzc2VzLmpzIiwianMvc3JjL25vbi1jbGFzc2VzLmpzIiwianMvc3JjL25vbi1hdHRyaWJ1dGVzLmpzIiwianMvc3JjL25vbi1lbGVtZW50LmpzIiwianMvc3JjL2RvbS1lbGVtZW50LmpzIiwianMvc3JjL2NvbnN0YW50cy5qcyIsImpzL3NyYy9odHRwLW1ldGhvZC5qcyIsImpzL3NyYy9odHRwLXJlc3BvbnNlLXR5cGUuanMiLCJqcy9zcmMvaHR0cC1wcm90b2NvbC5qcyIsImpzL3NyYy9odHRwLXByb21pc2UuanMiLCJqcy9zcmMvaHR0cC5qcyIsImpzL3NyYy9mbHVpZC1kb20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZXNBbGwobGlzdCwgYXJncykge1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAnJztcclxuICAgIGZvciAodmFyIGV4cGVjdGVkQXJnIG9mIGxpc3QpIHtcclxuICAgICAgICB2YXIgaGFzVmFsdWUgPSBhcmdzW2V4cGVjdGVkQXJnXSAhPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFoYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBtZXNzYWdlICs9IGBWYWx1ZSBmb3IgJHtleHBlY3RlZEFyZ30gd2FzIG5vdCBwcm92aWRlZC5cXG5gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghIW1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFeHBlY3RlZCAke2xpc3QubGVuZ3RofSBwYXJhbWV0ZXJzOlxcbiR7bWVzc2FnZX1gKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZXNPbmUobGlzdCwgYXJncykge1xyXG4gICAgdmFyIGRlZmluaXRpb25NaXNzaW5nID0gbGlzdC5maWx0ZXIod29yZCA9PiBhcmdzW3dvcmRdID09PSB1bmRlZmluZWQpO1xyXG4gICAgdmFyIGlzT25lTWF0Y2hlZCA9IGRlZmluaXRpb25NaXNzaW5nLmxlbmd0aCA9PT0gKGxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICBpZiAoaXNPbmVNYXRjaGVkKSB7XHJcbiAgICAgICAgdmFyIGFyZ3VtZW50TmFtZXMgPSBsaXN0LnJlZHVjZSgoYXJnMSwgYXJnMikgPT4gYCR7YXJnMX0sICR7YXJnMn1gKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBPbmUgb2YgdGhlc2UgcGFyYW1ldGVycyB3ZXJlIGV4cGVjdGVkICR7YXJndW1lbnROYW1lc30gYnV0IG5vbmUgaGFkIGEgaGFzVmFsdWUhYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNPbmVNYXRjaGVkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dXYXJuaW5nKG1lc3NhZ2UpIHtcclxuICAgIGNvbnNvbGUud2FybihcIkZsdWlkRE9NOiBcIiArIG1lc3NhZ2UpO1xyXG59XHJcbi8qKlxyXG4gKiBUYWtlcyBhbnkgdHdvIGFycmF5cyBhbmQgY3JlYXRlcyBhIG5ld1xyXG4gKiBtZXJnZWQgYXJyYXkuIERvZXMgbm90IGRlLWR1cGxpY2F0ZS5cclxuICogQHBhcmFtIGExIC0gZmlyc3QgYXJyYXkgdG8gbWVyZ2VcclxuICogQHBhcmFtIGEyIC0gc2Vjb25kIGFycmF5IHRvIG1lcmdlXHJcbiAqIEByZXR1cm5zIC0gbmV3IGFycmF5IHdpdGggbWVyZ2VkIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VfYXJyYXkoYTEsIGEyKSB7XHJcbiAgICBsZXQgZmluYWwgPSBbXTtcclxuICAgIGZpbmFsID0gZmluYWwuY29uY2F0KGExKTtcclxuICAgIGZpbmFsID0gZmluYWwuY29uY2F0KGEyKTtcclxuICAgIHJldHVybiBmaW5hbDtcclxufVxyXG4vKipcclxuICogVGFrZXMgYW4gYXJyYXkgcmVmZXJlbmNlIGFuZCBlbXB0aWVzIGFsbFxyXG4gKiBjb250ZW50IGZyb20gdGhhdCBhcnJheS4gQ2FuIGJlIHVzZWQgdG9cclxuICogZW1wdHkgYW4gYXJyYXkgcmVmZXJlbmNlIGhlbGQgYnkgYW5vdGhlciBvYmplY3QuXHJcbiAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHRvIGVtcHR5IG91dC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eV9hcnJheShhcnJheSkge1xyXG4gICAgd2hpbGUgKCEhYXJyYXkgJiYgYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFycmF5LnBvcCgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBMb29rcyBmb3IgZHVwbGljYXRlIG9iamVjdCByZWZlcmVuY2VzIGluIGFuXHJcbiAqIGFycmF5IGFuZCByZXR1cm5zIGEgbmV3IGFycmF5IHdpdGhvdXQgdGhlXHJcbiAqIGR1cGxpY2F0ZXMuIE5vdCB2ZXJ5IGVmZmljaWVudFxyXG4gKiAtIHRoaXMgaXMgTyhuXjIpXHJcbiAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHRvIGV4YW1pbmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX2R1cHMoYXJyYXkpIHtcclxuICAgIGxldCBkZWR1cCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gZG9lc05vdEhhdmVSZWZFcXVhbE9iamVjdCh4KSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZHVwLmluZGV4T2YoeCkgPCAwO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBpdGVtID0gYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIGlmIChkb2VzTm90SGF2ZVJlZkVxdWFsT2JqZWN0KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGRlZHVwLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZHVwO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYUnBiQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OTFkR2xzTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPenM3TzBkQlNVYzdRVUZIU0N4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGRExFbEJRVzFDTEVWQlFVVXNTVUZCVVR0SlFVTjJSQ3hKUVVGSkxFOUJRVThzUjBGQlJ5eEZRVUZGTEVOQlFVRTdTVUZEYUVJc1MwRkJTU3hKUVVGSkxGZEJRVmNzU1VGQlNTeEpRVUZKTEVWQlFVVTdVVUZETTBJc1NVRkJTU3hSUVVGUkxFZEJRVmtzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRk5CUVZNc1EwRkJRVHRSUVVOMFJDeEpRVUZKTEVOQlFVVXNVVUZCVVN4RlFVRkZPMWxCUTJRc1QwRkJUeXhKUVVGSkxHRkJRV0VzVjBGQlZ5eHpRa0ZCYzBJc1EwRkJRVHRUUVVNeFJEdExRVU5HTzBsQlEwUXNTVUZCU1N4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRk8xRkJRMklzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRWxCUVVrc1EwRkJReXhOUVVGTkxHbENRVUZwUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGQk8xRkJRMmhGTEU5QlFVOHNTMEZCU3l4RFFVRkJPMHRCUTJJN1NVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlFUdEJRVU5pTEVOQlFVTTdRVUZGUkN4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGRExFbEJRVzFDTEVWQlFVVXNTVUZCVXp0SlFVTjRSQ3hKUVVGSkxHbENRVUZwUWl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVVVzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzVTBGQlV5eERRVUZGTEVOQlFVRTdTVUZEZGtVc1NVRkJTU3haUVVGWkxFZEJRVWNzYVVKQlFXbENMRU5CUVVNc1RVRkJUU3hMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVVc1EwRkJRVHRKUVVOc1JTeEpRVUZMTEZsQlFWa3NSVUZCUnp0UlFVTnNRaXhKUVVGSkxHRkJRV0VzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEZRVUZGTEVOQlFVTXNSMEZCUnl4SlFVRkpMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlFUdFJRVU53UlN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExIbERRVUY1UXl4aFFVRmhMREpDUVVFeVFpeERRVUZETEVOQlFVRTdTMEZEYWtjN1NVRkRSQ3hQUVVGUExGbEJRVmtzUTBGQlFUdEJRVU55UWl4RFFVRkRPMEZCUlVRc1RVRkJUU3hWUVVGVkxGVkJRVlVzUTBGQlF5eFBRVUZsTzBsQlEzaERMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEU5QlFVOHNRMEZCUXl4RFFVRkJPMEZCUTNSRExFTkJRVU03UVVGRlJEczdPenM3TzBkQlRVYzdRVUZEU0N4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGSkxFVkJRVmtzUlVGQlJTeEZRVUZaTzBsQlEzWkVMRWxCUVVrc1MwRkJTeXhIUVVGakxFVkJRVVVzUTBGQlF6dEpRVU14UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjZRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVONlFpeFBRVUZQTEV0QlFVc3NRMEZCUXp0QlFVTm1MRU5CUVVNN1FVRkZSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzVlVGQlZTeFhRVUZYTEVOQlFVa3NTMEZCWlR0SlFVTTFReXhQUVVGUExFTkJRVU1zUTBGQlJTeExRVUZMTEVsQlFVa3NTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVU3VVVGRGJrTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8wdEJRMkk3UVVGRFNDeERRVUZETzBGQlJVUTdPenM3T3p0SFFVMUhPMEZCUTBnc1RVRkJUU3hWUVVGVkxGZEJRVmNzUTBGRGVrSXNTMEZCWlR0SlFVVm1MRWxCUVVrc1MwRkJTeXhIUVVGakxFVkJRVVVzUTBGQlF6dEpRVVV4UWl4VFFVRlRMSGxDUVVGNVFpeERRVUZETEVOQlFVYzdVVUZEY0VNc1QwRkJUeXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVNNVFpeERRVUZETzBsQlJVUXNTMEZCU1N4SlFVRkpMRXRCUVVzc1IwRkJSeXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVU3VVVGRGFFUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlEzaENMRWxCUVVrc2VVSkJRWGxDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1dVRkRia01zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVOc1FqdExRVU5HTzBsQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1FVRkRaaXhEUVVGREluMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIHVuY2VydGFpbiByZXR1cm4gdHlwZS5cclxuICogSW4gVHlwZVNjcmlwdCBpdCdzIHBvc3NpYmxlIHRvIHJldHVyblxyXG4gKiBgVHlwZSB8IHVuZGVmaW5lZGAgYnV0IGF0IHJ1bnRpbWUgaXQgY2FuXHJcbiAqIGdldCBhIGJpdCBtZXNzeSB0byBoYW5kbGUgdGhpcyB3ZWxsLlxyXG4gKiBUaGUgT3B0aW9uIGNsYXNzIHJlcHJlc2VudHMgdGhpcyBjbGVhbmx5XHJcbiAqIGFuZCBleHBsaWNpdGx5IHdoaWxlIG1ha2luZyBpdCBlYXN5XHJcbiAqIGRldGVybWluZSB3aGV0aGVyIHRoZSB2YWx1ZSBpcyB2YWxpZCBvciBub3RcclxuICogYW5kLCBpZiB2YWxpZCwgcHJvdmlkZXMgZWFzeSB3YXlzIHRvIGdldFxyXG4gKiB0aGUgdmFsdWUgd2l0aCBwcm9wZXIgdHlwZSBjb25zaXN0ZW5jeSBpblxyXG4gKiBUeXBlU2NyaXB0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUpIHtcclxuICAgICAgICBpZiAoX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBfdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRoYXQgdGhlcmUgaXMgYSB2YWx1ZSBiZWZvcmVcclxuICAgICAqIGNhbGxpbmcgdGhpcy5cclxuICAgICAqIEBzZWUgaXNWYWxpZFxyXG4gICAgICovXHJcbiAgICBnZXQgVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRlc3RzIGlmIHRoZSB2YWx1ZSBpcyBrbm93bi5cclxuICAgICAqL1xyXG4gICAgZ2V0IGlzVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy52YWx1ZTtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liM0IwYVc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDI5d2RHbHZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSVWc3T3pzN096czdPenM3TzBkQlYwYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1RVRkJUVHRKUVVkcVFpeFpRVUZaTEUxQlFWYzdVVUZEY2tJc1NVRkJTU3hOUVVGTkxFVkJRVVU3V1VGRFZpeEpRVUZKTEVOQlFVTXNTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJRenRUUVVOeVFqdGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU03VTBGRGJrSTdTVUZEU0N4RFFVRkRPMGxCUlVnN096czdUMEZKUnp0SlFVTkVMRWxCUVVrc1MwRkJTenRSUVVOUUxFOUJRVmNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJSVWc3TzA5QlJVYzdTVUZEUkN4SlFVRkpMRTlCUVU4N1VVRkRWQ3hQUVVGUExFTkJRVU1zUTBGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMGxCUTNaQ0xFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmZ1bmN0aW9uIGNhc3QoYXR0cikge1xyXG4gICAgcmV0dXJuIGF0dHI7XHJcbn1cclxuZXhwb3J0IGNsYXNzIERvbUF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3IoX3dlYkVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50ID0gX3dlYkVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlIG9mIHRoaXMuX3dlYkVsZW1lbnQuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVOYW1lcygpIHtcclxuICAgICAgICB2YXIgbGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvciAodmFyIGF0dHIgb2YgdGhpcy5fd2ViRWxlbWVudC5hdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChhdHRyLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGFkZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldChuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzZXQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXQobmFtZSk7XHJcbiAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0KG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2ViRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICB9XHJcbiAgICBoYXMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWJFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKSAhPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laRzl0TFdGMGRISnBZblYwWlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXRjBkSEpwWW5WMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVdElMRk5CUVZNc1NVRkJTU3hEUVVGRkxFbEJRVzFDTzBsQlEyaERMRTlCUVdkRExFbEJRVXNzUTBGQlF6dEJRVU40UXl4RFFVRkRPMEZCUlVRc1RVRkJUU3hQUVVGUExHRkJRV0U3U1VGSGVFSXNXVUZCV1N4WFFVRnZRanRSUVVNNVFpeEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMRmRCUVZjc1EwRkJRenRKUVVOcVF5eERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRkZCUVRSRE8xRkJRMnhFTEV0QlFVa3NTVUZCU1N4VFFVRlRMRWxCUVVrc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZEYUVRc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVWQlFVVXNVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJRek5ETzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzWTBGQll6dFJRVU5hTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWxCUVVrc1MwRkJTeXhGUVVGVkxFTkJRVUU3VVVGRk9VSXNTMEZCU1N4SlFVRkpMRWxCUVVrc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZWQlFWVXNSVUZCUlR0WlFVTXpReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVOMlFqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFZEJRVWNzUTBGQlF5eEpRVUZaTEVWQlFVVXNTMEZCWVR0UlFVTTNRaXhQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wbEJReTlDTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXU3hGUVVGRkxFdEJRV0U3VVVGRE4wSXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkJPMUZCUXpGRExFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmRVTTdVVUZEZUVRc1NVRkJTU3hMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVFN1VVRkRaaXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRE4wTXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWk8xRkJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTTdTVUZEY2tRc1EwRkJRenRKUVVWRUxFMUJRVTBzUTBGQlF5eEpRVUZaTzFGQlEycENMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zWlVGQlpTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaRExFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogIyBEb21DbGFzc2VzXHJcbiAqXHJcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBJQ2xhc3NlcyBpbnRlcmZhY2UgdGhhdCBhbGxvd3Mgb3BlcmF0aW9uc1xyXG4gKiB0byBiZSBwZXJmb3JtZWQgb24gRE9NIG9iamVjdHMgaW4gYSBicm93c2VyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvbUNsYXNzZXMge1xyXG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnQsIGVsZW1lbnRPYmplY3QpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50T2JqZWN0O1xyXG4gICAgICAgIHRoaXMuaHRtbEVsZW1lbnQgPSBfZWxlbWVudDtcclxuICAgIH1cclxuICAgIGZvckVhY2godGFzaykge1xyXG4gICAgICAgIGZvciAodmFyIF9jbGFzcyBvZiB0aGlzLmh0bWxFbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICB0YXNrKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiBpZi1hbmQtb25seS1pZiB0aGUgbmFtZWQgY2xhc3MgaXMgb24gdGhlIGVsZW1lbnQuXHJcbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIChmbHVpZCkgZWxlbWVudCBvYmplY3QgdG8gYWxsb3cgdGhpbmdzIHRvXHJcbiAgICAgKiBiZSBkb25lIHdpdGggaXQuIFJldHVybnMgc2VsZi5cclxuICAgICAqIEBwYXJhbSBuYW1lLSBIVE1MIGNsYXNzIG5hbWUgdG8gc2Vla1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrLSBjYWxsYmFjayB0byBydW4gdG8gbWFuaXB1bGF0ZSB0aGUgZWxlbWVudCBpZiBwcmVzZW50LlxyXG4gICAgICovXHJcbiAgICB3aGVuSGFzKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkKF9jbGFzcykge1xyXG4gICAgICAgIGlmICghIV9jbGFzcyAmJiBfY2xhc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5odG1sRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QuYWRkKF9jbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgZWRpdCBjbGFzc2VzIG9uIERvbUVsZW1lbnQgdGhhdCBwcm92aWRlcyBubyBIVE1MRWxlbWVudC5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2xhc3MgbmFtZSBnaXZlbiB3YXMgXCIke19jbGFzc31cIiAtIGl0IG11c3Qgbm90IGJlIGVtcHR5IWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZShfY2xhc3MpIHtcclxuICAgICAgICB0aGlzLmh0bWxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoX2NsYXNzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChfY2xhc3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzKF9jbGFzcykpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoX2NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXTnNZWE56WlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXTnNZWE56WlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVUxSU96czdPenRIUVV0SE8wRkJRMGdzVFVGQlRTeFBRVUZQTEZWQlFWVTdTVUZKY2tJc1dVRkJXU3hSUVVGcFFpeEZRVUZGTEdGQlFYbENPMUZCUTNSRUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NZVUZCWVN4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NVVUZCVVN4RFFVRkRPMGxCUXpsQ0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVTXNTVUZCWjBNN1VVRkRkRU1zUzBGQlNTeEpRVUZKTEUxQlFVMHNTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUlVGQlJUdFpRVU0xUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVUU3VTBGRFlqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFZEJRVWNzUTBGQlF5eEpRVUZaTzFGQlEyUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRia1FzUTBGQlF6dEpRVVZJT3pzN096czdUMEZOUnp0SlFVTkVMRTlCUVU4c1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmIwTTdVVUZEZUVRc1NVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMWxCUTJ4Q0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1UwRkRlRUk3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hIUVVGSExFTkJRVU1zVFVGQll6dFJRVU5vUWl4SlFVRkpMRU5CUVVNc1EwRkJSU3hOUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRiRU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZPMmRDUVVOd1FpeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdZVUZEZUVNN2FVSkJRVTA3WjBKQlEwd3NUVUZCVFN4TFFVRkxMRU5CUVVNc1owVkJRV2RGTEVOQlFVTXNRMEZCUXp0aFFVTXZSVHRUUVVOR08yRkJRVTA3V1VGRFRDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMSGxDUVVGNVFpeE5RVUZOTERKQ1FVRXlRaXhEUVVGRExFTkJRVUU3VTBGRE1VVTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRVHRKUVVOaUxFTkJRVU03U1VGRlJDeE5RVUZOTEVOQlFVTXNUVUZCWXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZOQlFWTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVUU3VVVGRGVrTXNUMEZCVHl4SlFVRkpMRU5CUVVFN1NVRkRZaXhEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEUxQlFXTTdVVUZEYUVJc1NVRkJTU3hEUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVN1dVRkRkRUlzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRVHRUUVVOcVFqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkJPMGxCUTJJc1EwRkJRenREUVVOR0luMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiAjIE5vbkNsYXNzZXNcclxuICpcclxuICogSXMgYSBuaWwtZWZmZWN0IElDbGFzc2VzIGluc3RhbmNlIHRvIHJldHVyblxyXG4gKiBpbiBhbnkgc2l0dWF0aW9uIHdoZXJlIHRoZSBJRWxlbWVudCBpbXBsZW1lbnRhdGlvblxyXG4gKiBjYW5ub3QgcHJvdmlkZSBhIGJhY2tpbmcgZm9yIHRoZSBzdHlsZSBjbGFzc2VzIGZyb21cclxuICogYSBkb2N1bWVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb25DbGFzc2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBoYXMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHdoZW5IYXMobmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZChfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZShfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdOc1lYTnpaWE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdOc1lYTnpaWE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVXRJT3pzN096czdPMGRCVDBjN1FVRkRTQ3hOUVVGTkxFOUJRVThzVlVGQlZUdEpRVU55UWl4blFrRkJaU3hEUVVGRE8wbEJSV2hDTEU5QlFVOHNRMEZCUXl4UlFVRnhRenRSUVVNelF5eFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hIUVVGSExFTkJRVU1zU1VGQldUdFJRVU5rTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJZc1EwRkJRenRKUVVWRUxFOUJRVThzUTBGQlF5eEpRVUZaTEVWQlFVVXNVVUZCY1VNN1VVRkRla1FzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFMUJRV003VVVGRGFFSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEUxQlFXTTdVVUZEYmtJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRTFCUVdNN1VVRkRhRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPME5CUTBZaWZRPT0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbm9uLWF0dHJpYnV0ZXMgaW5zdGFuY2UsIHRvIGJlIHJldHVybmVkXHJcbiAqIHdoZW4gbm8gZWZmZWN0aXZlIGF0dHJpYnV0ZXMgaW5zdGFuY2UgY2FuIGJlIHByb3ZpZGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vbkF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIGZvckVhY2goY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZU5hbWVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGFkZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXQobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZW1vdmUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtOXVMV0YwZEhKcFluVjBaWE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdGMGRISnBZblYwWlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVsSU96czdSMEZIUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhoUVVGaE8wbEJRM2hDTEdkQ1FVRmxMRU5CUVVNN1NVRkZhRUlzVDBGQlR5eERRVUZETEZGQlFTdERPMUZCUTNKRUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMR05CUVdNN1VVRkRXaXhQUVVGUExFVkJRVVVzUTBGQlF6dEpRVU5hTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXU3hGUVVGRkxFdEJRV0U3VVVGRE4wSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEVsQlFWa3NSVUZCUlN4TFFVRmhPMUZCUXpkQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmQwTTdVVUZEZWtRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRWxCUVZrN1VVRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVTkVMRTFCUVUwc1EwRkJReXhKUVVGWk8xRkJRMnBDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenREUVVOR0luMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IE5vbkF0dHJpYnV0ZXMgfSBmcm9tICcuL25vbi1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IHsgTm9uQ2xhc3NlcyB9IGZyb20gJy4vbm9uLWNsYXNzZXMnO1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhIG5vbi1lbGVtZW50LiBUbyBiZSByZXR1cm5lZCBpbiBhbnN3ZXJcclxuICogZm9yIGFuIGVsZW1lbnQgYnV0IG9uZSBjYW5ub3QgYmUgcHJvdmlkZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9uRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgaXNWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoQ2hpbGRyZW4oY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGV4cGVjdCh0YWdOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGhhc0lkKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGV4aXN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGVsZW1lbnRMaXN0TG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBzZWxlY3RGaXJzdChzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0b3JQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHRhZ05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdGV4dChfdGV4dCkge1xyXG4gICAgICAgIGlmIChfdGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBodG1sKF9odG1sKSB7XHJcbiAgICAgICAgaWYgKF9odG1sKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHJlcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTm9uQXR0cmlidXRlcygpO1xyXG4gICAgfVxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE5vbkNsYXNzZXMoKTtcclxuICAgIH1cclxuICAgIG9uKGFyZ3MpIHsgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdWc1pXMWxiblF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdWc1pXMWxiblF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVkZJTEU5QlFVOHNSVUZCUlN4aFFVRmhMRVZCUVVVc1RVRkJUU3hyUWtGQmEwSXNRMEZCUXp0QlFVTnFSQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUnpORE96czdSMEZIUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhWUVVGVk8wbEJSWEpDTEdkQ1FVRmxMRU5CUVVNN1NVRkZhRUlzVDBGQlR6dFJRVU5NTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJZc1EwRkJRenRKUVVWRUxGTkJRVk03VVVGRFVDeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3haUVVGWkxFTkJRVU1zVVVGQmIwTTdVVUZETDBNc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUVUZCVFN4RFFVRkRMRTlCUVdVN1VVRkRjRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRXRCUVVzN1VVRkRTQ3hQUVVGUExFdEJRVXNzUTBGQlF6dEpRVU5tTEVOQlFVTTdTVUZGUkN4TlFVRk5PMUZCUTBvc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFppeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRzFDUVVGelF6dFJRVU0xUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeFhRVUZYTEVOQlFVTXNVVUZCWjBJN1VVRkRNVUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1dVRkJXVHRSUVVOV0xFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hQUVVGUExFVkJRVVVzUTBGQlF6dEpRVU5hTEVOQlFVTTdTVUZGUkN4SlFVRkpMRU5CUVVNc1MwRkJNRUk3VVVGRE4wSXNTVUZCU1N4TFFVRkxMRVZCUVVVN1dVRkRWQ3hQUVVGUExFbEJRVWtzUTBGQlF6dFRRVU5pTzJGQlFVMDdXVUZEVEN4UFFVRlBMRVZCUVVVc1EwRkJRenRUUVVOWU8wbEJRMGdzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4TFFVRXdRanRSUVVNM1FpeEpRVUZKTEV0QlFVc3NSVUZCUlR0WlFVTlVMRTlCUVU4c1NVRkJTU3hEUVVGRE8xTkJRMkk3WVVGQlRUdFpRVU5NTEU5QlFVOHNSVUZCUlN4RFFVRkRPMU5CUTFnN1NVRkRTQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEV0QlFXRTdVVUZEYkVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRXRCUVdFN1VVRkRia0lzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUVHRSUVVOS0xFOUJRVThzVTBGQlV5eERRVUZETzBsQlEyNUNMRU5CUVVNN1NVRkZSQ3hWUVVGVk8xRkJRMUlzVDBGQlR5eEpRVUZKTEdGQlFXRXNSVUZCUlN4RFFVRkRPMGxCUXpkQ0xFTkJRVU03U1VGRlJDeFBRVUZQTzFGQlEwd3NUMEZCVHl4SlFVRkpMRlZCUVZVc1JVRkJSU3hEUVVGRE8wbEJRekZDTEVOQlFVTTdTVUZEUkN4RlFVRkZMRU5CUVVNc1NVRkJjMElzU1VGQlZ5eERRVUZETzBsQlJYSkRMRXRCUVVzN1VVRkRTQ3hQUVVGUExGTkJRVk1zUTBGQlF6dEpRVU51UWl4RFFVRkRPME5CUTBZaWZRPT0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcclxuaW1wb3J0IHsgcHJvdmlkZXNBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBEb21BdHRyaWJ1dGVzIH0gZnJvbSAnLi9kb20tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IERvbUNsYXNzZXMgfSBmcm9tICcuL2RvbS1jbGFzc2VzJztcclxuaW1wb3J0IHsgTm9uQ2xhc3NlcyB9IGZyb20gJy4vbm9uLWNsYXNzZXMnO1xyXG5pbXBvcnQgeyBOb25BdHRyaWJ1dGVzIH0gZnJvbSAnLi9ub24tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IE5vbkVsZW1lbnQgfSBmcm9tICcuL25vbi1lbGVtZW50JztcclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0gY29sbGVjdGlvbiBIVE1MIGNvbGxlY3Rpb24gdG8gY29udmVydCBpbnRvIGFycmF5IG9mIElFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0SHRtbENvbGxlY3Rpb24oY29sbGVjdGlvbikge1xyXG4gICAgbGV0IGxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBjb2xsZWN0aW9uLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGNvbGxlY3Rpb25baW5kZXhdO1xyXG4gICAgICAgIGxpc3QucHVzaChuZXcgRG9tRWxlbWVudChjaGlsZCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gc2VsZWN0b3JQYXRoKGVsZW1lbnQpIHtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBwYXRoID0gYCN7JGlkfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGVsZW1lbnQudGFnTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBgJHtzZWxlY3RvclBhdGgoZWxlbWVudC5wYXJlbnRFbGVtZW50KX0+JHtlbGVtZW50LnRhZ05hbWV9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG4vKipcclxuICogQHByaXZhdGUgYW4gaW50ZXJuYWwgZnVuY3Rpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCeVNlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgZmlyc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yUGF0aChlbGVtZW50KX0+JHtzZWxlY3Rvcn1gKTtcclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbi8qKlxyXG4gKiAjIERvbUVsZW1lbnRcclxuICpcclxuICogVGhlIGltcGxlbWVudGF0aW9uIElFbGVtZW50IGZvciBlbGVtZW50cyBpbiB0aGUgYnJvd3NlclxyXG4gKiBwYWdlIGZyb20gdGhlIERPTS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb21FbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPSBuZXcgT3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgYWxlcnRJbnZhbGlkKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJRWxlbWVudFtEb21FbGVtZW50XSBpcyBpbnZhbGlkLlwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgZWxlbWVudHMgaW4gYSBkb2N1bWVudCB1c2luZyBhIHNlbGVjdG9yLlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gQ1NTIHN0eWxlIHNlbGVjdG9yLlxyXG4gICAgICogQHJldHVybnMgbGlzdCBvZiBtYXRjaGluZyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExpc3RGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBjb252ZXJ0SHRtbENvbGxlY3Rpb24obGlzdCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQgdXNpbmcgYSBjbGFzcyBuYW1lLlxyXG4gICAgICogTm90ZSBkbyBub3QgcHJlZml4IHdpdGggYSBwZXJpb2QgKGAuYCkgLSBqdXN0IHByb3ZpZGVcclxuICAgICAqIHRoZSBwdXJlIGNsYXNzIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3MgLSBwdXJlIGNsYXNzIG5hbWUuXHJcbiAgICAgKiBAcmV0dXJucyBsaXN0IG9mIG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TGlzdEZyb21DbGFzcyhfY2xhc3MpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke19jbGFzc31gKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBlbGVtZW50cyBpbiBhIGRvY3VtZW50IHVzaW5nIGEgdGFnLW5hbWUuXHJcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSAtIHRhZyBuYW1lIChjYXNlIGluc2Vuc2l0aXZlKS5cclxuICAgICAqIEByZXR1cm5zIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRMaXN0RnJvbVRhZ05hbWUodGFnTmFtZSkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YWdOYW1lKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEVsZW1lbnRGcm9tSWQoaWQpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG4gICAgICAgIHJldHVybiBEb21FbGVtZW50Lm1ha2VGcm9tRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZmlyc3QgbWF0Y2hpbmcgZWxlbWVudCBmcm9tIGEgZG9jdW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgLSBhIENTUyBzdHlsZSBzZWxlY3RvclxyXG4gICAgICogQHJldHVybnMgYW4gZWxlbWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5tYWtlRnJvbUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbWFrZUZyb21FbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gKCEhZWxlbWVudCkgPyBuZXcgRG9tRWxlbWVudChlbGVtZW50KSA6IG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZDtcclxuICAgIH1cclxuICAgIGdldFBhcmVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBfcGFyID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50O1xyXG4gICAgICAgICAgICBwYXJlbnQgPSBfcGFyID8gbmV3IERvbUVsZW1lbnQoX3BhcikgOiBuZXcgRG9tRWxlbWVudCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE5vbkVsZW1lbnQoKTtcclxuICAgIH1cclxuICAgIHdpdGhDaGlsZHJlbihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCAmJiB0aGlzLmRvbUVsZW1lbnQuVmFsdWUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGNvbnZlcnRIdG1sQ29sbGVjdGlvbih0aGlzLmRvbUVsZW1lbnQuVmFsdWUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3QodGFnTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsID0gdGhpcy5kb21FbGVtZW50LlZhbHVlLnRhZ05hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgbGV0IGV4cGVjdGVkID0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFeHBlY3RlZCAke2V4cGVjdGVkfSBidXQgQWN0dWFsIHRhZ05hbWUgd2FzICR7YWN0dWFsfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMoKS5nZXQoJ2lkJyk7XHJcbiAgICB9XHJcbiAgICBoYXNJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzKCkuaGFzKCdpZCcpO1xyXG4gICAgfVxyXG4gICAgZXhpc3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKTtcclxuICAgIH1cclxuICAgIGZpbmRBbGwoZWxlbWVudExpc3RMb2NhdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnRMaXN0TG9jYXRpb25bJ3NlbGVjdG9yJ10gfHwgZWxlbWVudExpc3RMb2NhdGlvblsndGFnTmFtZSddO1xyXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBjb252ZXJ0SHRtbENvbGxlY3Rpb24oY29sbGVjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBzZWxlY3RGaXJzdChzZWxlY3Rvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSBnZXRCeVNlbGVjdG9yKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSwgc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudChmaXJzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEb21FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RvclBhdGgoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvclBhdGgodGhpcy5kb21FbGVtZW50LlZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB0YWdOYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50LlZhbHVlLnRhZ05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgcmV0dXJuICdVTktOT1dOJztcclxuICAgIH1cclxuICAgIHRleHQoX3RleHQpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghIV90ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBodG1sKF9odG1sKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoISFfaHRtbCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBfaHRtbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwZW5kKF9odG1sKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsSHRtbCA9IGAke3RoaXMuaHRtbCgpfSR7X2h0bWx9YDtcclxuICAgICAgICB0aGlzLmh0bWwodG90YWxIdG1sKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHByZXBlbmQoX2h0bWwpIHtcclxuICAgICAgICB2YXIgdG90YWxIdG1sID0gYCR7X2h0bWx9JHt0aGlzLmh0bWwoKX1gO1xyXG4gICAgICAgIHRoaXMuaHRtbCh0b3RhbEh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuVmFsdWUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21BdHRyaWJ1dGVzKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vbkF0dHJpYnV0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzc2VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbUNsYXNzZXModGhpcy5kb21FbGVtZW50LlZhbHVlLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25DbGFzc2VzKCk7XHJcbiAgICB9XHJcbiAgICBvbihhcmdzKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVzQWxsKFsnZXZlbnQnLCAnaGFuZGxlciddLCBhcmdzKSAmJiB0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBhcmdzLmV2ZW50O1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGFyZ3MuaGFuZGxlcjtcclxuICAgICAgICAgICAgdmFyIG9wdEtlZXBEZWZhdWx0ID0gYXJncy5rZWVwRGVmYXVsdDtcclxuICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LlZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uIChmaXJlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdEtlZXBEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihmaXJlZEV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudFsndmFsdWUnXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laRzl0TFdWc1pXMWxiblF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZaRzl0TFdWc1pXMWxiblF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVVZJTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hWUVVGVkxFTkJRVU03UVVGRmJFTXNUMEZCVHl4RlFVRmxMRmRCUVZjc1JVRkJZeXhOUVVGTkxGRkJRVkVzUTBGQlFUdEJRVU0zUkN4UFFVRlBMRVZCUVVVc1lVRkJZU3hGUVVGRkxFMUJRVTBzYTBKQlFXdENMRU5CUVVFN1FVRkRhRVFzVDBGQlR5eEZRVUZGTEZWQlFWVXNSVUZCUlN4TlFVRk5MR1ZCUVdVc1EwRkJRVHRCUVVVeFF5eFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGRE8wRkJRek5ETEU5QlFVOHNSVUZCUlN4aFFVRmhMRVZCUVVVc1RVRkJUU3hyUWtGQmEwSXNRMEZCUXp0QlFVOXFSQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUlRORE96czdSMEZIUnp0QlFVTklMRk5CUVZNc2NVSkJRWEZDTEVOQlF6VkNMRlZCUVdkRU8wbEJSV2hFTEVsQlFVa3NTVUZCU1N4SFFVRnZRaXhGUVVGRkxFTkJRVU03U1VGREwwSXNTMEZCU1N4SlFVRkpMRXRCUVVzc1IwRkJSeXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZITEZWQlFWVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVU3VVVGRGNrUXNTVUZCU1N4TFFVRkxMRWRCUVdsQ0xGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTTFReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZGTEVsQlFVa3NWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRkxFTkJRVU03UzBGRGNFTTdTVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRCUVVOa0xFTkJRVU03UVVGRlJEczdSMEZGUnp0QlFVTklMRk5CUVZNc1dVRkJXU3hEUVVGRExFOUJRU3RDTzBsQlEyNUVMRWxCUVVrc1NVRkJTU3hIUVVGSExFVkJRVVVzUTBGQlF6dEpRVU5rTEVsQlFVa3NUMEZCVHl4RlFVRkZPMUZCUTFnc1NVRkJTU3hGUVVGRkxFZEJRVWNzVDBGQlR5eERRVUZETEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOd1F5eEpRVUZKTEVWQlFVVXNSVUZCUlR0WlFVTk9MRWxCUVVrc1IwRkJSeXhSUVVGUkxFTkJRVU03VTBGRGFrSTdZVUZCVFN4SlFVRkxMRU5CUVVVc1QwRkJUeXhEUVVGRExHRkJRV0VzUlVGQlJ6dFpRVU53UXl4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF6dFRRVU40UWp0aFFVRk5PMWxCUTB3c1NVRkJTU3hIUVVGSExFZEJRVWNzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4aFFVRmhMRU5CUVVNc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVMEZEY0VVN1MwRkRSanRKUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBGQlEyUXNRMEZCUXp0QlFVVkVPenRIUVVWSE8wRkJRMGdzVTBGQlV5eGhRVUZoTEVOQlFVTXNUMEZCT0VJc1JVRkJSU3hSUVVGblFqdEpRVU55UlN4SlFVRkpMRXRCUVVzc1IwRkJSeXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUlRWRExFbEJRVWtzUzBGQlN5eEZRVUZGTzFGQlExUXNUMEZCYjBJc1MwRkJTeXhEUVVGRE8wdEJRek5DTzFOQlFVMDdVVUZEVEN4TFFVRkxMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlJTeEhRVUZITEZsQlFWa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hSUVVGUkxFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzaEZMRWxCUVVrc1MwRkJTeXhGUVVGRk8xbEJRMVFzVDBGQmIwSXNTMEZCU3l4RFFVRkRPMU5CUXpOQ08wdEJRMFk3U1VGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0QlFVTmtMRU5CUVVNN1FVRkhSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzVDBGQlR5eFZRVUZWTzBsQlIzSkNMRmxCUVdNc1QwRkJLMEk3VVVGRE0wTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQk5FSXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRia1VzUTBGQlF6dEpRVVZQTEZsQlFWazdVVUZEYkVJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eHJRMEZCYTBNc1EwRkJReXhEUVVGRE8wbEJRM0JFTEVOQlFVTTdTVUZGUkRzN096dFBRVWxITzBsQlEwZ3NUVUZCVFN4RFFVRkRMRzFDUVVGdFFpeERRVUZETEZGQlFXVTdVVUZEZUVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzVVVGQlVTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzFGQlF5OURMRTlCUVU4c2NVSkJRWEZDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRja01zUTBGQlF6dEpRVVZFT3pzN096czdUMEZOUnp0SlFVTklMRTFCUVUwc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRmhPMUZCUTI1RExFbEJRVWtzU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eEpRVUZKTEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRia1FzVDBGQlR5eHhRa0ZCY1VJc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU55UXl4RFFVRkRPMGxCUlVRN096czdUMEZKUnp0SlFVTklMRTFCUVUwc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UFFVRmpPMUZCUTNSRExFbEJRVWtzU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTTVReXhQUVVGUExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRM0pETEVOQlFVTTdTVUZGUkN4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNSVUZCVlR0UlFVTm9ReXhKUVVGSkxFOUJRVThzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZVUZCWVN4RFFVRkRMRWxCUVVrc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU12UXl4UFFVRlBMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZETjBNc1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTQ3hOUVVGTkxFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1VVRkJaMEk3VVVGRE5VTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTXZReXhQUVVGUExGVkJRVlVzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkROME1zUTBGQlF6dEpRVVZQTEUxQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJjVU03VVVGRGJFVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4VlFVRlZMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1NVRkRiRVVzUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4UFFVRlBMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eERRVUZETzBsQlEycERMRU5CUVVNN1NVRkZSQ3hUUVVGVE8xRkJRMUFzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEU5QlFVOHNSMEZCYVVJc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEYkVRc1NVRkJTU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUXp0WlFVTnFReXhKUVVGSkxFMUJRV3RDTEVOQlFVTTdXVUZEZGtJc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4VlFVRlZMRU5CUVdVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1dVRkRkRVVzVDBGQlR5eE5RVUZOTEVOQlFVTTdVMEZEWmp0UlFVTkVMRTlCUVU4c1NVRkJTU3hWUVVGVkxFVkJRVVVzUTBGQlF6dEpRVU14UWl4RFFVRkRPMGxCUlVRc1dVRkJXU3hEUVVGRExGRkJRWE5ETzFGQlEycEVMRWxCUVVrc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRlRVVzU1VGQlNTeEpRVUZKTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVVVzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03V1VGRGJFVXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xTkJRMmhDTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEU5QlFXVTdVVUZEY0VJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZEZWtRc1NVRkJTU3hSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMWxCUTNKRExFbEJRVXNzVFVGQlRTeEpRVUZKTEZGQlFWRXNSVUZCU1R0blFrRkRla0lzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRkZCUVZFc01rSkJRVEpDTEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNN1lVRkRlRVU3VTBGRFJqdGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUzBGQlN6dFJRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnlReXhEUVVGRE8wbEJSVVFzUzBGQlN6dFJRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUVR0SlFVTndReXhEUVVGRE8wbEJSVVFzVFVGQlRUdFJRVU5LTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRM2hDTEVOQlFVTTdTVUZGUkN4UFFVRlBMRU5CUVVNc2JVSkJRWE5ETzFGQlF6VkRMRWxCUVVrc1VVRkJVU3hIUVVGSExHMUNRVUZ0UWl4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxHMUNRVUZ0UWl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMnBHTEVsQlFVa3NVVUZCVVN4RlFVRkZPMWxCUTFvc1NVRkJTU3hWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkRiRVVzU1VGQlNTeEpRVUZKTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVVVzVlVGQlZTeERRVUZGTEVOQlFVTTdXVUZETDBNc1QwRkJUeXhKUVVGSkxFTkJRVU03VTBGRFlqdFJRVU5FTEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTFvc1EwRkJRenRKUVVWRUxGZEJRVmNzUTBGQlF5eFJRVUZuUWp0UlFVTXhRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFbEJRVWtzUzBGQlN5eEhRVUYzUWl4aFFVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkZhRVlzU1VGQlNTeExRVUZMTEVWQlFVVTdaMEpCUTFRc1QwRkJUeXhKUVVGSkxGVkJRVlVzUTBGQll5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTXpRenRUUVVOR08xRkJRMFFzVDBGQlR5eEpRVUZKTEZWQlFWVXNSVUZCUlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRlJDeFpRVUZaTzFGQlExWXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU16UWl4UFFVRlBMRmxCUVZrc1EwRkJSU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUlN4RFFVRkRPMU5CUXpsRE8xRkJRMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMUZCUTNCQ0xFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8xTkJRM1JETzFGQlEwUXNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xRkJRM0JDTEU5QlFVOHNVMEZCVXl4RFFVRkRPMGxCUTI1Q0xFTkJRVU03U1VGRlJDeEpRVUZKTEVOQlFVTXNTMEZCWlR0UlFVTnNRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFbEJRVWtzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM0JETEVsQlFVa3NRMEZCUXl4RFFVRkRMRXRCUVVzc1JVRkJSenRuUWtGRFdpeFBRVUZQTEVOQlFVTXNVMEZCVXl4SFFVRkhMRXRCUVVzc1EwRkJRVHRuUWtGRGVrSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1lVRkRZanRwUWtGQlRUdG5Ra0ZEVEN4UFFVRlBMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU03WVVGRE1VSTdVMEZEUmp0aFFVRlBPMWxCUTA0c1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFsQlEzQkNMRTlCUVU4c1JVRkJSU3hEUVVGRE8xTkJRMWc3U1VGRFNDeERRVUZETzBsQlJVUXNTVUZCU1N4RFFVRkRMRXRCUVdVN1VVRkRiRUlzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU53UXl4SlFVRkpMRU5CUVVNc1EwRkJSU3hMUVVGTExFVkJRVVU3WjBKQlExb3NUMEZCVHl4RFFVRkRMRk5CUVZNc1IwRkJSeXhMUVVGTExFTkJRVUU3WjBKQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRE8yRkJRMkk3YVVKQlFVMDdaMEpCUTB3c1QwRkJUeXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETzJGQlF6RkNPMU5CUTBZN1lVRkJUVHRaUVVOTUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVWQlFVVXNRMEZCUXp0WlFVTndRaXhQUVVGUExFVkJRVVVzUTBGQlF6dFRRVU5ZTzBsQlEwZ3NRMEZCUXp0SlFVVkVMRTFCUVUwc1EwRkJReXhMUVVGaE8xRkJRMnhDTEVsQlFVa3NVMEZCVXl4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEhRVUZITEV0QlFVc3NSVUZCUlN4RFFVRkJPMUZCUTNoRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVFN1VVRkRjRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1QwRkJUeXhEUVVGRExFdEJRV0U3VVVGRGJrSXNTVUZCU1N4VFFVRlRMRWRCUVVjc1IwRkJSeXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RlFVRkZMRU5CUVVFN1VVRkRlRU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRVHRSUVVOd1FpeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hOUVVGTk8xRkJRMG9zU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFRRVU5vUXp0aFFVRk5PMWxCUTB3c1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFOQlEzSkNPMUZCUTBRc1QwRkJUeXhUUVVGVExFTkJRVU03U1VGRGJrSXNRMEZCUXp0SlFVVkVMRlZCUVZVN1VVRkRVaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFRRVU5xUkR0aFFVRk5PMWxCUTB3c1QwRkJUeXhKUVVGSkxHRkJRV0VzUlVGQlJTeERRVUZETzFOQlF6VkNPMGxCUTBnc1EwRkJRenRKUVVWRUxFOUJRVTg3VVVGRFRDeEpRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRk8xbEJRek5DTEU5QlFVOHNTVUZCU1N4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1UwRkRjRVE3VVVGRFJDeFBRVUZQTEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1NVRkRNVUlzUTBGQlF6dEpRVVZFTEVWQlFVVXNRMEZCUXl4SlFVRnpRanRSUVVOMlFpeEpRVUZKTEZkQlFWY3NRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJReXhUUVVGVExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU55UlN4SlFVRkpMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEzWkNMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZETTBJc1NVRkJTU3hqUVVGakxFZEJRVWNzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0WlFVTjBReXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eExRVUZMTEVWQlFVVXNWVUZCVXl4VlFVRmxPMmRDUVVOd1JTeEpRVUZKTEVOQlFVVXNZMEZCWXl4RlFVRkZPMjlDUVVOd1FpeFZRVUZWTEVOQlFVTXNZMEZCWXl4RlFVRkZMRU5CUVVFN2FVSkJRelZDTzJkQ1FVTkVMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlFUdFpRVU55UWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRUUVVOSU8wbEJRMGdzUTBGQlF6dEpRVVZFTEV0QlFVczdVVUZEU0N4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1QwRkJUeXhIUVVGVExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUXpGRExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMmRDUVVOd1FpeFBRVUZQTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1lVRkRkRUk3VTBGRFJqdFJRVU5FTEU5QlFVOHNVMEZCVXl4RFFVRkJPMGxCUTJ4Q0xFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgVGFnO1xyXG4oZnVuY3Rpb24gKFRhZykge1xyXG4gICAgVGFnW1wiQnV0dG9uXCJdID0gXCJCVVRUT05cIjtcclxuICAgIFRhZ1tcIkRpdlwiXSA9IFwiRElWXCI7XHJcbiAgICBUYWdbXCJJbnB1dFwiXSA9IFwiSU5QVVRcIjtcclxuICAgIFRhZ1tcIlBhcmFncmFwaFwiXSA9IFwiUFwiO1xyXG59KShUYWcgfHwgKFRhZyA9IHt9KSk7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9MSVNUID0gW1xyXG4gICAgJ2Fib3J0JywgJ2FmdGVyc2NyaXB0ZXhlY3V0ZScsXHJcbiAgICAnYW5pbWF0aW9uY2FuY2VsJywgJ2FuaW1hdGlvbmVuZCcsICdhbmltYXRpb25pdGVyYXRpb24nLFxyXG4gICAgJ2F1eGNsaWNrJyxcclxuICAgICdiZWZvcmVzY3JpcHRleGVjdXRlJywgJ2JsdXInLFxyXG4gICAgJ2NoYW5nZScsICdjbGljaycsICdjbG9zZScsICdjb250ZXh0bWVudScsXHJcbiAgICAnZGJsY2xpY2snLFxyXG4gICAgJ2Vycm9yJyxcclxuICAgICdmb2N1cycsICdmdWxsc2NyZWVuY2hhbmdlJywgJ2Z1bGxzY3JlZW5lcnJvcicsXHJcbiAgICAnZ290cG9pbnRlcmNhcHR1cmUnLFxyXG4gICAgJ2lucHV0JyxcclxuICAgICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2tleXVwJyxcclxuICAgICdsb2FkJywgJ2xvYWRlbmQnLCAnbG9hZHN0YXJ0JywgJ2xvc3Rwb2ludGVyY2FwdHVyZScsXHJcbiAgICAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCcsXHJcbiAgICAnb2ZmbGluZScsICdvbmxpbmUnLFxyXG4gICAgJ3BvaW50ZXJjYW5jZWwnLCAncG9pbnRlcmRvd24nLCAncG9pbnRlcmVudGVyJywgJ3BvaW50ZXJsZWF2ZScsXHJcbiAgICAncG9pbnRlcm1vdmUnLCAncG9pbnRlcm91dCcsICdwb2ludGVyb3ZlcicsICdwb2ludGVydXAnLFxyXG4gICAgJ3Jlc2V0JywgJ3Jlc2l6ZScsXHJcbiAgICAnc2Nyb2xsJywgJ3NlbGVjdCcsICdzZWxlY3Rpb25jaGFuZ2UnLCAnc2VsZWN0aW9uY2hhbmdlJyxcclxuICAgICdzZWxlY3RzdGFydCcsICdzdWJtaXQnLFxyXG4gICAgJ3RvdWNoY2FuY2VsJywgJ3RvdWNobW92ZScsICd0b3VjaHN0YXJ0JyxcclxuICAgICd0cmFuc2l0aW9uY2FuY2VsJywgJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgJ3Zpc2liaWxpdHljaGFuZ2UnLFxyXG4gICAgJ3doZWVsJ1xyXG5dO1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXZlbnRTZXQoKSB7XHJcbiAgICBsZXQgZXZlbnRzID0ge307XHJcbiAgICBmb3IgKHZhciBldmVudCBvZiBFVkVOVF9MSVNUKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgZXZlbnRzW2tleV0gPSBldmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBldmVudHM7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTI5dWMzUmhiblJ6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMMk52Ym5OMFlXNTBjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSMGdzVFVGQlRTeERRVUZPTEVsQlFWa3NSMEZMV0R0QlFVeEVMRmRCUVZrc1IwRkJSenRKUVVOaUxIZENRVUZwUWl4RFFVRkJPMGxCUTJwQ0xHdENRVUZYTEVOQlFVRTdTVUZEV0N4elFrRkJaU3hEUVVGQk8wbEJRMllzYzBKQlFXVXNRMEZCUVR0QlFVTnFRaXhEUVVGRExFVkJURmNzUjBGQlJ5eExRVUZJTEVkQlFVY3NVVUZMWkR0QlFVVkVMRTFCUVUwc1EwRkJReXhOUVVGTkxGVkJRVlVzUjBGQlJ6dEpRVU40UWl4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTzBsQlF6ZENMR2xDUVVGcFFpeEZRVUZGTEdOQlFXTXNSVUZCUlN4dlFrRkJiMEk3U1VGRGRrUXNWVUZCVlR0SlFVTldMSEZDUVVGeFFpeEZRVUZGTEUxQlFVMDdTVUZETjBJc1VVRkJVU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNZVUZCWVR0SlFVTjZReXhWUVVGVk8wbEJRMVlzVDBGQlR6dEpRVU5RTEU5QlFVOHNSVUZCUlN4clFrRkJhMElzUlVGQlJTeHBRa0ZCYVVJN1NVRkRPVU1zYlVKQlFXMUNPMGxCUTI1Q0xFOUJRVTg3U1VGRFVDeFRRVUZUTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTlCUVU4N1NVRkRPVUlzVFVGQlRTeEZRVUZGTEZOQlFWTXNSVUZCUlN4WFFVRlhMRVZCUVVVc2IwSkJRVzlDTzBsQlEzQkVMRmRCUVZjc1JVRkJSU3hYUVVGWExFVkJRVVVzVlVGQlZTeEZRVUZGTEZkQlFWY3NSVUZCUlN4VFFVRlRPMGxCUXpWRUxGTkJRVk1zUlVGQlJTeFJRVUZSTzBsQlEyNUNMR1ZCUVdVc1JVRkJSU3hoUVVGaExFVkJRVVVzWTBGQll5eEZRVUZGTEdOQlFXTTdTVUZET1VRc1lVRkJZU3hGUVVGRkxGbEJRVmtzUlVGQlJTeGhRVUZoTEVWQlFVVXNWMEZCVnp0SlFVTjJSQ3hQUVVGUExFVkJRVVVzVVVGQlVUdEpRVU5xUWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hGUVVGRkxHbENRVUZwUWl4RlFVRkZMR2xDUVVGcFFqdEpRVU40UkN4aFFVRmhMRVZCUVVVc1VVRkJVVHRKUVVOMlFpeGhRVUZoTEVWQlFVVXNWMEZCVnl4RlFVRkZMRmxCUVZrN1NVRkRlRU1zYTBKQlFXdENMRVZCUVVVc1pVRkJaVHRKUVVOdVF5eHJRa0ZCYTBJN1NVRkRiRUlzVDBGQlR6dERRVU5TTEVOQlFVTTdRVUZKUml4TlFVRk5MRlZCUVZVc1kwRkJZenRKUVVNMVFpeEpRVUZKTEUxQlFVMHNSMEZCWVN4RlFVRkZMRU5CUVVNN1NVRkRNVUlzUzBGQlNTeEpRVUZKTEV0QlFVc3NTVUZCU1N4VlFVRlZMRVZCUVVVN1VVRkRNMElzU1VGQlNTeEhRVUZITEVkQlFVY3NTMEZCU3l4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRE8xRkJRemxDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU03UzBGRGNrSTdTVUZEUkN4UFFVRlBMRTFCUVUwc1EwRkJRenRCUVVOb1FpeERRVUZESW4wPSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IHZhciBIdHRwTWV0aG9kO1xyXG4oZnVuY3Rpb24gKEh0dHBNZXRob2QpIHtcclxuICAgIEh0dHBNZXRob2RbXCJDT05ORUNUXCJdID0gXCJDT05ORUNUXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiREVMRVRFXCJdID0gXCJERUxFVEVcIjtcclxuICAgIEh0dHBNZXRob2RbXCJHRVRcIl0gPSBcIkdFVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIkhFQURcIl0gPSBcIkhFQURcIjtcclxuICAgIEh0dHBNZXRob2RbXCJPUFRJT05TXCJdID0gXCJPUFRJT05TXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiUEFUQ0hcIl0gPSBcIlBBVENIXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiUE9TVFwiXSA9IFwiUE9TVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlBVVFwiXSA9IFwiUFVUXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiVFJBQ0VcIl0gPSBcIlRSQUNFXCI7XHJcbn0pKEh0dHBNZXRob2QgfHwgKEh0dHBNZXRob2QgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0MxdFpYUm9iMlF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZhSFIwY0MxdFpYUm9iMlF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVVZJTEUxQlFVMHNRMEZCVGl4SlFVRlpMRlZCVlZnN1FVRldSQ3hYUVVGWkxGVkJRVlU3U1VGRGNFSXNhVU5CUVcxQ0xFTkJRVUU3U1VGRGJrSXNLMEpCUVdsQ0xFTkJRVUU3U1VGRGFrSXNlVUpCUVZjc1EwRkJRVHRKUVVOWUxESkNRVUZoTEVOQlFVRTdTVUZEWWl4cFEwRkJiVUlzUTBGQlFUdEpRVU51UWl3MlFrRkJaU3hEUVVGQk8wbEJRMllzTWtKQlFXRXNRMEZCUVR0SlFVTmlMSGxDUVVGWExFTkJRVUU3U1VGRFdDdzJRa0ZCWlN4RFFVRkJPMEZCUTJwQ0xFTkJRVU1zUlVGV1Z5eFZRVUZWTEV0QlFWWXNWVUZCVlN4UlFWVnlRaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgdmFyIEh0dHBSZXNwb25zZVR5cGU7XHJcbihmdW5jdGlvbiAoSHR0cFJlc3BvbnNlVHlwZSkge1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIlRFWFRcIl0gPSBcInRleHRcIjtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJBUlJBWUJVRkZFUlwiXSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJCTE9CXCJdID0gXCJibG9iXCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiRE9DVU1FTlRcIl0gPSBcImRvY3VtZW50XCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiSlNPTlwiXSA9IFwianNvblwiO1xyXG59KShIdHRwUmVzcG9uc2VUeXBlIHx8IChIdHRwUmVzcG9uc2VUeXBlID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXlaWE53YjI1elpTMTBlWEJsTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMMmgwZEhBdGNtVnpjRzl1YzJVdGRIbHdaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSVWdzVFVGQlRTeERRVUZPTEVsQlFWa3NaMEpCVFZnN1FVRk9SQ3hYUVVGWkxHZENRVUZuUWp0SlFVTXhRaXhwUTBGQllTeERRVUZCTzBsQlEySXNLME5CUVRKQ0xFTkJRVUU3U1VGRE0wSXNhVU5CUVdFc1EwRkJRVHRKUVVOaUxIbERRVUZ4UWl4RFFVRkJPMGxCUTNKQ0xHbERRVUZoTEVOQlFVRTdRVUZEWml4RFFVRkRMRVZCVGxjc1owSkJRV2RDTEV0QlFXaENMR2RDUVVGblFpeFJRVTB6UWlKOSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IHZhciBIdHRwUHJvdG9jb2w7XHJcbihmdW5jdGlvbiAoSHR0cFByb3RvY29sKSB7XHJcbiAgICBIdHRwUHJvdG9jb2xbXCJIVFRQXCJdID0gXCJodHRwXCI7XHJcbiAgICBIdHRwUHJvdG9jb2xbXCJIVFRQU1wiXSA9IFwiaHR0cHNcIjtcclxuICAgIEh0dHBQcm90b2NvbFtcIkZJTEVcIl0gPSBcImZpbGVcIjtcclxufSkoSHR0cFByb3RvY29sIHx8IChIdHRwUHJvdG9jb2wgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0Mxd2NtOTBiMk52YkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTlvZEhSd0xYQnliM1J2WTI5c0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN08wZEJTVWM3UVVGSFNDeE5RVUZOTEVOQlFVNHNTVUZCV1N4WlFVbFlPMEZCU2tRc1YwRkJXU3haUVVGWk8wbEJRM1JDTERaQ1FVRmhMRU5CUVVFN1NVRkRZaXdyUWtGQlpTeERRVUZCTzBsQlEyWXNOa0pCUVdFc1EwRkJRVHRCUVVObUxFTkJRVU1zUlVGS1Z5eFpRVUZaTEV0QlFWb3NXVUZCV1N4UlFVbDJRaUo5IiwiZXhwb3J0IGNsYXNzIEh0dHBQcm9taXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKF9odHRwKSB7XHJcbiAgICAgICAgdGhpcy5odHRwT2JqZWN0ID0gX2h0dHA7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUHJvbWlzZShoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoKHByb21pc2VSZXNvbHZlciwgcHJvbWlzZVJlamVjdG9yKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IF9yZXNvbHZlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VSZXNvbHZlcihkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaGFuZGxlcihfcmVzb2x2ZSwgcHJvbWlzZVJlamVjdG9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlzUmVzb2x2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0ICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGh0dHAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cE9iamVjdDtcclxuICAgIH1cclxuICAgIGFmdGVyUmVzdWx0KGNvbnRleHRUaGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSh0aGlzLnByb21pc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZS50aGVuKHJlc29sdmVkUmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRUaGVuKHRoaXMuaHR0cE9iamVjdCwgcmVzb2x2ZWRSZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aGVuKHdoZW4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNQcm9taXNlKHRoaXMucHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCh0aGlzLnByb21pc2UudGhlbih3aGVuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY2F0Y2god2hlbikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1Byb21pc2UodGhpcy5wcm9taXNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0KHRoaXMucHJvbWlzZS5jYXRjaCh3aGVuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFzUHJvbWlzZShwcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2U7XHJcbiAgICB9XHJcbiAgICBuZXh0KF9wcm9taXNlKSB7XHJcbiAgICAgICAgbGV0IF9uZXh0ID0gbmV3IEh0dHBQcm9taXNlKHRoaXMuaHR0cE9iamVjdCk7XHJcbiAgICAgICAgX25leHQucHJvbWlzZSA9IF9wcm9taXNlO1xyXG4gICAgICAgIHJldHVybiBfbmV4dDtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0Mxd2NtOXRhWE5sTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMMmgwZEhBdGNISnZiV2x6WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkhRU3hOUVVGTkxFOUJRVThzVjBGQlZ6dEpRWFZDZEVJc1dVRkJXU3hMUVVGWE8xRkJRM0pDTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1UwRkJVeXhEUVVGRE8wbEJRek5DTEVOQlFVTTdTVUZ5UWtRc1lVRkJZU3hEUVVOWUxFOUJSMU03VVVGRlZDeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVWNFFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGTExFTkJRVU1zWlVGQlpTeEZRVUZGTEdWQlFXVXNSVUZCUlN4RlFVRkZPMWxCUTJ4RkxFbEJRVWtzU1VGQlNTeEhRVUZ0UWl4SlFVRkpMRU5CUVVNN1dVRkRhRU1zU1VGQlNTeFJRVUZSTEVkQlFVY3NWVUZCVXl4SlFVRk5PMmRDUVVNMVFpeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenRuUWtGRGJrSXNaVUZCWlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRM2hDTEVOQlFVTXNRMEZCUXp0WlFVTkdMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzWlVGQlpTeERRVUZETEVOQlFVRTdVVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlQwUXNWVUZCVlR0UlFVTlNMRTlCUVU4c1NVRkJTU3hEUVVGRExFMUJRVTBzU1VGQlNTeFRRVUZUTEVOQlFVTTdTVUZEYkVNc1EwRkJRenRKUVVWRUxFbEJRVWs3VVVGRFJpeFBRVUZQTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNN1NVRkRla0lzUTBGQlF6dEpRVVZFTEZkQlFWY3NRMEZEVkN4WFFVRTRSRHRSUVVVNVJDeEpRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlEycERMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXl4RlFVRkZPMmRDUVVOcVF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hqUVVGakxFTkJRVU1zUTBGQlF6dFpRVU12UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOS08xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1NVRkJTU3hEUVVGRExFbEJRWFZETzFGQlF6RkRMRWxCUVVrc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRha01zVDBGQlR5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkZMRU5CUVVNN1UwRkROVU03VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hMUVVGTExFTkJRVVVzU1VGQk1rSTdVVUZEYUVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSVHRaUVVOcVF5eFBRVUZQTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVNMVF6dFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxGVkJRVlVzUTBGQlF5eFBRVUZuUXp0UlFVTjZReXhQUVVGdlFpeEpRVUZKTEVOQlFVTXNUMEZCVVN4WlFVRlpMRTlCUVU4c1EwRkJRenRKUVVOMlJDeERRVUZETzBsQlJVOHNTVUZCU1N4RFFVRkRMRkZCUVRKQ08xRkJRM1JETEVsQlFVa3NTMEZCU3l4SFFVRkhMRWxCUVVrc1YwRkJWeXhEUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTm9SQ3hMUVVGTExFTkJRVU1zVDBGQlR5eEhRVUZsTEZGQlFWRXNRMEZCUXp0UlFVTnlReXhQUVVGUExFdEJRVXNzUTBGQlF6dEpRVU5tTEVOQlFVTTdRMEZEUmlKOSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHsgSHR0cE1ldGhvZCB9IGZyb20gXCIuL2h0dHAtbWV0aG9kXCI7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZVR5cGUgfSBmcm9tIFwiLi9odHRwLXJlc3BvbnNlLXR5cGVcIjtcclxuaW1wb3J0IHsgSHR0cFByb3RvY29sIH0gZnJvbSBcIi4vaHR0cC1wcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBIdHRwUHJvbWlzZSB9IGZyb20gJy4vaHR0cC1wcm9taXNlJztcclxuZXhwb3J0IGNsYXNzIEh0dHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IEh0dHBQcm90b2NvbC5IVFRQO1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGF0aCA9ICcnO1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gSHR0cE1ldGhvZC5HRVQ7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMudXBsb2FkRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IEh0dHBSZXNwb25zZVR5cGUuVEVYVDtcclxuICAgICAgICB0aGlzLnRpbWVvdXRNUyA9IDEwMDA7XHJcbiAgICB9XHJcbiAgICBob3N0KHByb3RvY29sLCBob3N0bmFtZSwgcG9ydCkge1xyXG4gICAgICAgIHRoaXMuaG9zdG5hbWUgPSBob3N0bmFtZTtcclxuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xyXG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhlYWRlcihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMucHVzaCh7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGV4cGVjdGVkRGF0YSh0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGltZW91dEF0KGR1cmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0TVMgPSBkdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNvbnRleHQodGFzaykge1xyXG4gICAgICAgIGxldCBfY29udGV4dCA9IG5ldyBIdHRwKCk7XHJcbiAgICAgICAgX2NvbnRleHQucHJvdG9jb2wgPSB0aGlzLnByb3RvY29sO1xyXG4gICAgICAgIF9jb250ZXh0LnBvcnQgPSB0aGlzLnBvcnQ7XHJcbiAgICAgICAgX2NvbnRleHQuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lO1xyXG4gICAgICAgIF9jb250ZXh0LnJlcXVlc3RIZWFkZXJzID0gbmV3IEFycmF5KCkuY29uY2F0KHRoaXMucmVxdWVzdEhlYWRlcnMpO1xyXG4gICAgICAgIF9jb250ZXh0LnBhdGggPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgX2NvbnRleHQubWV0aG9kID0gdGhpcy5tZXRob2Q7XHJcbiAgICAgICAgX2NvbnRleHQuYm9keSA9IHRoaXMuYm9keTtcclxuICAgICAgICBfY29udGV4dC51cGxvYWREYXRhID0gdGhpcy51cGxvYWREYXRhO1xyXG4gICAgICAgIF9jb250ZXh0LnJlc3BvbnNlVHlwZSA9IHRoaXMucmVzcG9uc2VUeXBlO1xyXG4gICAgICAgIHRhc2soX2NvbnRleHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY2FsbChtZXRob2QsIHBhdGgsIGJvZHkpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGJvZHkpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3luY1BvcnRBbmRQcm90b2NvbCgpO1xyXG4gICAgICAgIGxldCBwb3J0U3RyaW5nID0gKCEhdGhpcy5wb3J0KSA/IGA6JHt0aGlzLnBvcnR9YCA6IGBgO1xyXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLnByb3RvY29sfTovLyR7dGhpcy5ob3N0bmFtZX0ke3BvcnRTdHJpbmd9JHtwYXRofWA7XHJcbiAgICAgICAgbGV0IHhociA9IHRoaXMuY3JlYXRlUmVxdWVzdFRvKHVybCk7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnNldEhhbmRsZXJzKHhocik7XHJcbiAgICAgICAgdGhpcy5hZGRBbnlIZWFkZXJzKHhocik7XHJcbiAgICAgICAgeGhyLnNlbmQodGhpcy5ib2R5KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIHN5bmNQb3J0QW5kUHJvdG9jb2woKSB7XHJcbiAgICAgICAgaWYgKCh0aGlzLnByb3RvY29sID09IEh0dHBQcm90b2NvbC5IVFRQICYmIHRoaXMucG9ydCA9PSA4MClcclxuICAgICAgICAgICAgfHwgKHRoaXMucHJvdG9jb2wgPT0gSHR0cFByb3RvY29sLkhUVFBTICYmIHRoaXMucG9ydCA9PSA0NDMpXHJcbiAgICAgICAgICAgIHx8IHRoaXMucHJvdG9jb2wgPT0gSHR0cFByb3RvY29sLkZJTEUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNyZWF0ZVJlcXVlc3RUbyh1cmwpIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXRNUztcclxuICAgICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdXJsKTtcclxuICAgICAgICByZXR1cm4geGhyO1xyXG4gICAgfVxyXG4gICAgc2V0RXJyb3JIYW5kbGVycyh4aHIsIHJlamVjdCkge1xyXG4gICAgICAgIHhoci5vbmFib3J0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoJ1JlcXVlc3QgQWJvcnRlZCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KCdUaW1lZCBvdXQnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoJ0Vycm9yIG9jY3VycmVkLicpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVSZXNwb25zZU9iamVjdCh4aHIpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHhoclxyXG4gICAgICAgICAgICAuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkuc3BsaXQoJ1xcclxcbicpXHJcbiAgICAgICAgICAgIC5tYXAoaGVhZGVyX2xpbmUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFydHMgPSBoZWFkZXJfbGluZS5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgICBpZiAocGFydHMgJiYgcGFydHMubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IHBhcnRzWzBdLCB2YWx1ZTogcGFydHNbMV0gfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPSB1bmRlZmluZWQpO1xyXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaGRyIGluIGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgbGV0IGFfaGVhZGVyID0gaGVhZGVyc1toZHJdO1xyXG4gICAgICAgICAgICBpZiAoYV9oZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bYV9oZWFkZXIubmFtZV0gPSBhX2hlYWRlci52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcclxuICAgICAgICAgICAgdHlwZTogeGhyLnJlc3BvbnNlVHlwZSxcclxuICAgICAgICAgICAgYm9keTogeGhyLnJlc3BvbnNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBjb2xsZWN0aW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBzZXRPbkNvbXBsZXRlSGFuZGxlcih4aHIsIHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY3JlYXRlUmVzcG9uc2VPYmplY3QoeGhyKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoYFJldHVybmVkIEhUVFAgJHt4aHIuc3RhdHVzfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGFkZEFueUhlYWRlcnMoeGhyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdEhlYWRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBoZWFkZXIgb2YgdGhpcy5yZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLm5hbWUsIGhlYWRlci52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRIYW5kbGVycyh4aHIpIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBIdHRwUHJvbWlzZSh0aGlzKTtcclxuICAgICAgICBwcm9taXNlLmNyZWF0ZVByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEVycm9ySGFuZGxlcnMoeGhyLCByZWplY3QpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE9uQ29tcGxldGVIYW5kbGVyKHhociwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0M1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTlvZEhSd0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN08wZEJTVWM3UVVGSlNDeFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGRE8wRkJRek5ETEU5QlFVOHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeE5RVUZOTEhOQ1FVRnpRaXhEUVVGRE8wRkJRM2hFTEU5QlFVOHNSVUZCUlN4WlFVRlpMRVZCUVVVc1RVRkJUU3hwUWtGQmFVSXNRMEZCUXp0QlFVVXZReXhQUVVGUExFVkJRVVVzVjBGQlZ5eEZRVUZGTEUxQlFVMHNaMEpCUVdkQ0xFTkJRVU03UVVGRk4wTXNUVUZCVFN4UFFVRlBMRWxCUVVrN1NVRlpaanRSUVVORkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVOc1F5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVOMFFpeEpRVUZKTEVOQlFVTXNVVUZCVVN4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOdVFpeEpRVUZKTEVOQlFVTXNZMEZCWXl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVONlFpeEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVObUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVNM1FpeEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVOMFFpeEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVNMVFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMR2RDUVVGblFpeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTXhReXhKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJSVVFzU1VGQlNTeERRVUZETEZGQlFYTkNMRVZCUVVVc1VVRkJaMElzUlVGQlJTeEpRVUZoTzFGQlF6RkVMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzVVVGQlVTeERRVUZETzFGQlEzcENMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEycENMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzVVVGQlVTeERRVUZETzFGQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEUxQlFVMHNRMEZCUXl4SlFVRlhMRVZCUVVVc1MwRkJZVHRSUVVNdlFpeEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZMRXRCUVVzc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGNrUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzV1VGQldTeERRVUZETEVsQlFYTkNPMUZCUTJwRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTNwQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRk5CUVZNc1EwRkJReXhSUVVGblFqdFJRVU40UWl4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExGRkJRVkVzUTBGQlF6dFJRVU14UWl4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVVXNTVUZCTmtJN1VVRkRjRU1zU1VGQlNTeFJRVUZSTEVkQlFVY3NTVUZCU1N4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVNeFFpeFJRVUZSTEVOQlFVTXNVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRGJFTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETzFGQlF6RkNMRkZCUVZFc1EwRkJReXhSUVVGUkxFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTnNReXhSUVVGUkxFTkJRVU1zWTBGQll5eEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRmpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0UlFVTTVSU3hSUVVGUkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkRNVUlzVVVGQlVTeERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRemxDTEZGQlFWRXNRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU14UWl4UlFVRlJMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdVVUZEZEVNc1VVRkJVU3hEUVVGRExGbEJRVmtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRPMUZCUXpGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTm1MRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4TlFVRnJRaXhGUVVGRkxFbEJRVmtzUlVGQlJTeEpRVUZWTzFGQlF5OURMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZETzFGQlEzSkNMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEycENMRWxCUVVrc1QwRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTTNRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXp0VFFVTnNRanRoUVVGTk8xbEJRMHdzU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFOQlEyeERPMUZCUlVRc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNN1VVRkRNMElzU1VGQlNTeFZRVUZWTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVVc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkJPMUZCUTNSRUxFbEJRVWtzUjBGQlJ5eEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1RVRkJUU3hKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEZWQlFWVXNSMEZCUnl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVWd1JTeEpRVUZKTEVkQlFVY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzQkRMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkRjRU1zU1VGQlNTeERRVUZETEdGQlFXRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVONFFpeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU53UWl4UFFVRlBMRTlCUVU4c1EwRkJRenRKUVVOcVFpeERRVUZETzBsQlJVOHNiVUpCUVcxQ08xRkJRM3BDTEVsQlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hKUVVGSkxGbEJRVmtzUTBGQlF5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVU03WlVGRGRrUXNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hKUVVGSkxGbEJRVmtzUTBGQlF5eExRVUZMTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU03WlVGRGVrUXNTVUZCU1N4RFFVRkRMRkZCUVZFc1NVRkJTU3haUVVGWkxFTkJRVU1zU1VGQlNTeEZRVUZITzFsQlEzaERMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzVTBGQlV5eERRVUZETzFOQlEzWkNPMGxCUTBnc1EwRkJRenRKUVVWUExHVkJRV1VzUTBGQlF5eEhRVUZYTzFGQlEycERMRWxCUVVrc1IwRkJSeXhIUVVGSExFbEJRVWtzWTBGQll5eEZRVUZGTEVOQlFVTTdVVUZETDBJc1IwRkJSeXhEUVVGRExFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRPMUZCUXpkQ0xFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU16UWl4UFFVRlBMRWRCUVVjc1EwRkJRenRKUVVOaUxFTkJRVU03U1VGRlR5eG5Ra0ZCWjBJc1EwRkJReXhIUVVGdFFpeEZRVUZGTEUxQlFYVkNPMUZCUTI1RkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVkQlFVY3NSMEZCUnl4RlFVRkZPMWxCUTJwQ0xFMUJRVTBzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8xRkJRelZDTEVOQlFVTXNRMEZCUXp0UlFVTkdMRWRCUVVjc1EwRkJReXhUUVVGVExFZEJRVWNzUjBGQlJ5eEZRVUZGTzFsQlEyNUNMRTFCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dFJRVU4wUWl4RFFVRkRMRU5CUVVNN1VVRkRSaXhIUVVGSExFTkJRVU1zVDBGQlR5eEhRVUZITEVkQlFVY3NSVUZCUlR0WlFVTnFRaXhOUVVGTkxFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJRenRSUVVNMVFpeERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRPMGxCUlU4c2IwSkJRVzlDTEVOQlFVTXNSMEZCYlVJN1VVRkRPVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NSMEZCUnp0aFFVTmtMSEZDUVVGeFFpeEZRVUZGTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJRenRoUVVOeVF5eEhRVUZITEVOQlFVVXNWMEZCVnl4RFFVRkRMRVZCUVVVN1dVRkRiRUlzU1VGQlNTeExRVUZMTEVkQlFVY3NWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU51UXl4SlFVRkpMRXRCUVVzc1NVRkJTU3hMUVVGTExFTkJRVU1zVFVGQlRTeEpRVUZKTEVOQlFVTXNSVUZCUlR0blFrRkRPVUlzVDBGQmJVSXNSVUZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVU1zUTBGQlF6dGhRVU4wUkR0cFFrRkJUVHRuUWtGRFRDeFBRVUZQTEZOQlFWTXNRMEZCUXp0aFFVTnNRanRSUVVOSUxFTkJRVU1zUTBGQlF6dGhRVU5FTEUxQlFVMHNRMEZCUlN4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFbEJRVWtzU1VGQlNTeFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTjBReXhKUVVGSkxGVkJRVlVzUjBGQkswSXNSVUZCUlN4RFFVRkRPMUZCUTJoRUxFdEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NUMEZCVHl4RlFVRkZPMWxCUTNSQ0xFbEJRVWtzVVVGQlVTeEhRVUZITEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNMVFpeEpRVUZKTEZGQlFWRXNSVUZCUlR0blFrRkRXaXhWUVVGVkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU03WVVGRE5VTTdVMEZEUmp0UlFVVkVMRWxCUVVrc1VVRkJVU3hIUVVGclFqdFpRVU0xUWl4TlFVRk5MRVZCUVVVc1IwRkJSeXhEUVVGRExFMUJRVTA3V1VGRGJFSXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhaUVVGWk8xbEJRM1JDTEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1VVRkJVVHRaUVVOc1FpeFBRVUZQTEVWQlFVVXNWVUZCVlR0VFFVTndRaXhEUVVGRE8xRkJRMFlzVDBGQlR5eFJRVUZSTEVOQlFVTTdTVUZEYkVJc1EwRkJRenRKUVVWUExHOUNRVUZ2UWl4RFFVTXhRaXhIUVVGdFFpeEZRVU51UWl4UFFVRjNReXhGUVVONFF5eE5RVUUwUWp0UlFVVTFRaXhIUVVGSExFTkJRVU1zYTBKQlFXdENMRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRelZDTEVsQlFVa3NSMEZCUnl4RFFVRkRMRlZCUVZVc1NVRkJTU3hEUVVGRExFVkJRVVU3WjBKQlEzWkNMRWxCUVVrc1IwRkJSeXhEUVVGRExFMUJRVTBzU1VGQlNTeEhRVUZITEVWQlFVVTdiMEpCUTNKQ0xFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNiMEpCUVc5Q0xFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0cFFrRkRla003Y1VKQlFVMDdiMEpCUTB3c1RVRkJUU3hEUVVGRExHbENRVUZwUWl4SFFVRkhMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUTBGQlF6dHBRa0ZEZGtNN1lVRkRSanRSUVVOSUxFTkJRVU1zUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVHl4aFFVRmhMRU5CUVVNc1IwRkJiVUk3VVVGRGRrTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVTdXVUZEYkVNc1MwRkJTU3hKUVVGSkxFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNZMEZCWXl4RlFVRkZPMmRDUVVOeVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03WVVGRGFrUTdVMEZEUmp0SlFVTklMRU5CUVVNN1NVRkZUeXhYUVVGWExFTkJRVU1zUjBGQmJVSTdVVUZEY2tNc1NVRkJTU3hQUVVGUExFZEJRVWNzU1VGQlNTeFhRVUZYTEVOQlFXVXNTVUZCU1N4RFFVRkRMRU5CUVVFN1VVRkRha1FzVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUlVGQlJUdFpRVU42UXl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNSMEZCUnl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8xbEJRMjVETEVsQlFVa3NRMEZCUXl4dlFrRkJiMElzUTBGQlF5eEhRVUZITEVWQlFVVXNUMEZCVHl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJRMnhFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhQUVVGUExFTkJRVU03U1VGRGFrSXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBwcm92aWRlc0FsbCB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCB7IERvbUVsZW1lbnQgfSBmcm9tICcuL2RvbS1lbGVtZW50JztcclxuaW1wb3J0IHsgTm9uRWxlbWVudCB9IGZyb20gJy4vbm9uLWVsZW1lbnQnO1xyXG5pbXBvcnQgeyBUYWcsIGNyZWF0ZUV2ZW50U2V0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5leHBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcclxuZXhwb3J0IHsgSHR0cE1ldGhvZCB9IGZyb20gXCIuL2h0dHAtbWV0aG9kXCI7XHJcbmV4cG9ydCB7IEh0dHBSZXNwb25zZVR5cGUgfSBmcm9tIFwiLi9odHRwLXJlc3BvbnNlLXR5cGVcIjtcclxuZXhwb3J0IHsgSHR0cFByb3RvY29sIH0gZnJvbSBcIi4vaHR0cC1wcm90b2NvbFwiO1xyXG4vKipcclxuICogTGlzdCBvZiBldmVudHMgZm9yIGNvbnZlbmllbmNlIHdpdGggaW50ZWxsaS1zZW5zZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudHMgPSBjcmVhdGVFdmVudFNldCgpO1xyXG5jbGFzcyBEb21GbHVpZERvY3VtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG4gICAgZmluZEVsZW1lbnQoYXJnKSB7XHJcbiAgICAgICAgbGV0IGlkID0gYXJnWydpZCddO1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRFbGVtZW50RnJvbUlkKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGVjdG9yID0gYXJnWydzZWxlY3RvciddO1xyXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGFyZykge1xyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGFyZ1snc2VsZWN0b3InXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBfY2xhc3MgPSBhcmdbJ2NsYXNzJ107XHJcbiAgICAgICAgaWYgKF9jbGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRMaXN0RnJvbUNsYXNzKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YWdOYW1lID0gYXJnWyd0YWdOYW1lJ107XHJcbiAgICAgICAgaWYgKHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21UYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBidXR0b25PbihldmVudEluZm8pIHtcclxuICAgICAgICBpZiAocHJvdmlkZXNBbGwoWydpZCcsICdldmVudCcsICdoYW5kbGVyJ10sIGV2ZW50SW5mbykpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gZXZlbnRJbmZvLmlkO1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gdGhpcy5maW5kRWxlbWVudCh7IGlkOiBpZCB9KS5leHBlY3QoVGFnLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbihldmVudEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgdGhlIEJyb3dzZXIgaW1wbGVtZW50YXRpb25cclxuICogb2YgRmx1aWQgRE9NLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvYygpIHtcclxuICAgIHJldHVybiBuZXcgRG9tRmx1aWREb2N1bWVudCgpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpteDFhV1F0Wkc5dExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJac2RXbGtMV1J2YlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUjBnc1QwRkJUeXhGUVVGbExGZEJRVmNzUlVGQlJTeE5RVUZOTEZGQlFWRXNRMEZCUVR0QlFVTnFSQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkJPMEZCVFRGRExFOUJRVThzUlVGQlJTeFZRVUZWTEVWQlFVVXNUVUZCVFN4bFFVRmxMRU5CUVVNN1FVRk5NME1zVDBGQlR5eEZRVUZGTEVkQlFVY3NSVUZCV1N4alFVRmpMRVZCUVVVc1RVRkJUU3hoUVVGaExFTkJRVU03UVVGRk5VUXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJSU3hOUVVGTkxGRkJRVkVzUTBGQlF6dEJRVU01UWl4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlF6TkRMRTlCUVU4c1JVRkJSU3huUWtGQlowSXNSVUZCUlN4TlFVRk5MSE5DUVVGelFpeERRVUZETzBGQlEzaEVMRTlCUVU4c1JVRkJSU3haUVVGWkxFVkJRVVVzVFVGQlRTeHBRa0ZCYVVJc1EwRkJRenRCUVVjdlF6czdSMEZGUnp0QlFVTklMRTFCUVUwc1EwRkJReXhOUVVGTkxFMUJRVTBzUjBGQllTeGpRVUZqTEVWQlFVVXNRMEZCUXp0QlFVbHFSQ3hOUVVGTkxHZENRVUZuUWp0SlFVVndRanRKUVVOQkxFTkJRVU03U1VGRlJDeFhRVUZYTEVOQlFVTXNSMEZCYTBJN1VVRkROVUlzU1VGQlNTeEZRVUZGTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMjVDTEVsQlFVa3NSVUZCUlN4RlFVRkZPMWxCUTA0c1QwRkJUeXhWUVVGVkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VTBGRGVFTTdVVUZGUkN4SlFVRkpMRkZCUVZFc1IwRkJSeXhIUVVGSExFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdVVUZETDBJc1NVRkJTU3hSUVVGUkxFVkJRVVU3V1VGRFdpeFBRVUZSTEZWQlFWVXNRMEZCUXl4elFrRkJjMElzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0VFFVTnlSRHRSUVVORUxFOUJRVThzU1VGQlNTeFZRVUZWTEVWQlFVVXNRMEZCUXp0SlFVTXhRaXhEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEVkQlFYTkNPMUZCUXpWQ0xFbEJRVWtzVVVGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNdlFpeEpRVUZITEZGQlFWRXNSVUZCUlR0WlFVTllMRTlCUVU4c1ZVRkJWU3hEUVVGRExHMUNRVUZ0UWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xTkJRMnBFTzFGQlJVUXNTVUZCU1N4TlFVRk5MRWRCUVVjc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6RkNMRWxCUVVrc1RVRkJUU3hGUVVGRk8xbEJRMVlzVDBGQlR5eFZRVUZWTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVMEZETlVNN1VVRkZSQ3hKUVVGSkxFOUJRVThzUjBGQlJ5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkROMElzU1VGQlNTeFBRVUZQTEVWQlFVVTdXVUZEV0N4UFFVRlBMRlZCUVZVc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRUUVVNdlF6dFJRVVZFTEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTFvc1EwRkJRenRKUVVWRUxGRkJRVkVzUTBGQlF5eFRRVUV5UWp0UlFVTnNReXhKUVVGSkxGZEJRVmNzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4UFFVRlBMRVZCUVVVc1UwRkJVeXhEUVVGRExFVkJRVU1zVTBGQlV5eERRVUZETEVWQlFVVTdXVUZEY2tRc1NVRkJTU3hGUVVGRkxFZEJRVWNzVTBGQlV5eERRVUZETEVWQlFVVXNRMEZCUVR0WlFVTnlRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRVZCUVVNc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlFUdFpRVU14UkN4TlFVRk5MRU5CUVVNc1JVRkJSU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZCTzFOQlEzSkNPMGxCUTBnc1EwRkJRenREUVVWR08wRkJSVVE3T3p0SFFVZEhPMEZCUTBnc1RVRkJUU3hWUVVGVkxFZEJRVWM3U1VGRGFrSXNUMEZCVHl4SlFVRkpMR2RDUVVGblFpeEZRVUZGTEVOQlFVTTdRVUZEYUVNc1EwRkJReUo5Il0sIm5hbWVzIjpbIkh0dHBNZXRob2QiLCJIdHRwUmVzcG9uc2VUeXBlIiwiSHR0cFByb3RvY29sIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7O0FBS0EsQUFBTyxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3BDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixLQUFLLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtRQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDN0Q7S0FDSjtJQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7Q0FDZjs7QUNsQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLEFBQU8sTUFBTSxNQUFNLENBQUM7SUFDaEIsV0FBVyxDQUFDLE1BQU0sRUFBRTtRQUNoQixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO2FBQ0k7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNyQjtLQUNKOzs7Ozs7SUFNRCxJQUFJLEtBQUssR0FBRztRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNy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

