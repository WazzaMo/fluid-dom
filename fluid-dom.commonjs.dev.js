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
const Events = EVENT_LIST;
class DOM {
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
function Doc() {
    return new DOM();
}

exports.Events = Events;
exports.Doc = Doc;
exports.Http = Http;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1aWQtZG9tLmNvbW1vbmpzLmRldi5qcyIsInNvdXJjZXMiOlsianMvc3JjL3V0aWwuanMiLCJqcy9zcmMvb3B0aW9uLmpzIiwianMvc3JjL2RvbS1hdHRyaWJ1dGVzLmpzIiwianMvc3JjL2RvbS1jbGFzc2VzLmpzIiwianMvc3JjL25vbi1jbGFzc2VzLmpzIiwianMvc3JjL25vbi1hdHRyaWJ1dGVzLmpzIiwianMvc3JjL25vbi1lbGVtZW50LmpzIiwianMvc3JjL2RvbS1lbGVtZW50LmpzIiwianMvc3JjL2NvbnN0YW50cy5qcyIsImpzL3NyYy9odHRwLW1ldGhvZC5qcyIsImpzL3NyYy9odHRwLXJlc3BvbnNlLXR5cGUuanMiLCJqcy9zcmMvaHR0cC1wcm90b2NvbC5qcyIsImpzL3NyYy9odHRwLXByb21pc2UuanMiLCJqcy9zcmMvaHR0cC5qcyIsImpzL3NyYy9mbHVpZC1kb20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZXNBbGwobGlzdCwgYXJncykge1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAnJztcclxuICAgIGZvciAodmFyIGV4cGVjdGVkQXJnIG9mIGxpc3QpIHtcclxuICAgICAgICB2YXIgaGFzVmFsdWUgPSBhcmdzW2V4cGVjdGVkQXJnXSAhPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFoYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBtZXNzYWdlICs9IGBWYWx1ZSBmb3IgJHtleHBlY3RlZEFyZ30gd2FzIG5vdCBwcm92aWRlZC5cXG5gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghIW1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFeHBlY3RlZCAke2xpc3QubGVuZ3RofSBwYXJhbWV0ZXJzOlxcbiR7bWVzc2FnZX1gKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZXNPbmUobGlzdCwgYXJncykge1xyXG4gICAgdmFyIGRlZmluaXRpb25NaXNzaW5nID0gbGlzdC5maWx0ZXIod29yZCA9PiBhcmdzW3dvcmRdID09PSB1bmRlZmluZWQpO1xyXG4gICAgdmFyIGlzT25lTWF0Y2hlZCA9IGRlZmluaXRpb25NaXNzaW5nLmxlbmd0aCA9PT0gKGxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICBpZiAoaXNPbmVNYXRjaGVkKSB7XHJcbiAgICAgICAgdmFyIGFyZ3VtZW50TmFtZXMgPSBsaXN0LnJlZHVjZSgoYXJnMSwgYXJnMikgPT4gYCR7YXJnMX0sICR7YXJnMn1gKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBPbmUgb2YgdGhlc2UgcGFyYW1ldGVycyB3ZXJlIGV4cGVjdGVkICR7YXJndW1lbnROYW1lc30gYnV0IG5vbmUgaGFkIGEgaGFzVmFsdWUhYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNPbmVNYXRjaGVkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dXYXJuaW5nKG1lc3NhZ2UpIHtcclxuICAgIGNvbnNvbGUud2FybihcIkZsdWlkRE9NOiBcIiArIG1lc3NhZ2UpO1xyXG59XHJcbi8qKlxyXG4gKiBUYWtlcyBhbnkgdHdvIGFycmF5cyBhbmQgY3JlYXRlcyBhIG5ld1xyXG4gKiBtZXJnZWQgYXJyYXkuIERvZXMgbm90IGRlLWR1cGxpY2F0ZS5cclxuICogQHBhcmFtIGExIC0gZmlyc3QgYXJyYXkgdG8gbWVyZ2VcclxuICogQHBhcmFtIGEyIC0gc2Vjb25kIGFycmF5IHRvIG1lcmdlXHJcbiAqIEByZXR1cm5zIC0gbmV3IGFycmF5IHdpdGggbWVyZ2VkIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VfYXJyYXkoYTEsIGEyKSB7XHJcbiAgICBsZXQgZmluYWwgPSBbXTtcclxuICAgIGZpbmFsID0gZmluYWwuY29uY2F0KGExKTtcclxuICAgIGZpbmFsID0gZmluYWwuY29uY2F0KGEyKTtcclxuICAgIHJldHVybiBmaW5hbDtcclxufVxyXG4vKipcclxuICogVGFrZXMgYW4gYXJyYXkgcmVmZXJlbmNlIGFuZCBlbXB0aWVzIGFsbFxyXG4gKiBjb250ZW50IGZyb20gdGhhdCBhcnJheS4gQ2FuIGJlIHVzZWQgdG9cclxuICogZW1wdHkgYW4gYXJyYXkgcmVmZXJlbmNlIGhlbGQgYnkgYW5vdGhlciBvYmplY3QuXHJcbiAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHRvIGVtcHR5IG91dC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eV9hcnJheShhcnJheSkge1xyXG4gICAgd2hpbGUgKCEhYXJyYXkgJiYgYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFycmF5LnBvcCgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBMb29rcyBmb3IgZHVwbGljYXRlIG9iamVjdCByZWZlcmVuY2VzIGluIGFuXHJcbiAqIGFycmF5IGFuZCByZXR1cm5zIGEgbmV3IGFycmF5IHdpdGhvdXQgdGhlXHJcbiAqIGR1cGxpY2F0ZXMuIE5vdCB2ZXJ5IGVmZmljaWVudFxyXG4gKiAtIHRoaXMgaXMgTyhuXjIpXHJcbiAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHRvIGV4YW1pbmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX2R1cHMoYXJyYXkpIHtcclxuICAgIGxldCBkZWR1cCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gZG9lc05vdEhhdmVSZWZFcXVhbE9iamVjdCh4KSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZHVwLmluZGV4T2YoeCkgPCAwO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBpdGVtID0gYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIGlmIChkb2VzTm90SGF2ZVJlZkVxdWFsT2JqZWN0KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGRlZHVwLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZHVwO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYUnBiQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OTFkR2xzTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPenM3TzBkQlNVYzdRVUZIU0N4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGRExFbEJRVzFDTEVWQlFVVXNTVUZCVVR0SlFVTjJSQ3hKUVVGSkxFOUJRVThzUjBGQlJ5eEZRVUZGTEVOQlFVRTdTVUZEYUVJc1MwRkJTU3hKUVVGSkxGZEJRVmNzU1VGQlNTeEpRVUZKTEVWQlFVVTdVVUZETTBJc1NVRkJTU3hSUVVGUkxFZEJRVmtzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRk5CUVZNc1EwRkJRVHRSUVVOMFJDeEpRVUZKTEVOQlFVVXNVVUZCVVN4RlFVRkZPMWxCUTJRc1QwRkJUeXhKUVVGSkxHRkJRV0VzVjBGQlZ5eHpRa0ZCYzBJc1EwRkJRVHRUUVVNeFJEdExRVU5HTzBsQlEwUXNTVUZCU1N4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRk8xRkJRMklzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRWxCUVVrc1EwRkJReXhOUVVGTkxHbENRVUZwUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGQk8xRkJRMmhGTEU5QlFVOHNTMEZCU3l4RFFVRkJPMHRCUTJJN1NVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlFUdEJRVU5pTEVOQlFVTTdRVUZGUkN4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGRExFbEJRVzFDTEVWQlFVVXNTVUZCVXp0SlFVTjRSQ3hKUVVGSkxHbENRVUZwUWl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVVVzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzVTBGQlV5eERRVUZGTEVOQlFVRTdTVUZEZGtVc1NVRkJTU3haUVVGWkxFZEJRVWNzYVVKQlFXbENMRU5CUVVNc1RVRkJUU3hMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVVc1EwRkJRVHRKUVVOc1JTeEpRVUZMTEZsQlFWa3NSVUZCUnp0UlFVTnNRaXhKUVVGSkxHRkJRV0VzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEZRVUZGTEVOQlFVTXNSMEZCUnl4SlFVRkpMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlFUdFJRVU53UlN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExIbERRVUY1UXl4aFFVRmhMREpDUVVFeVFpeERRVUZETEVOQlFVRTdTMEZEYWtjN1NVRkRSQ3hQUVVGUExGbEJRVmtzUTBGQlFUdEJRVU55UWl4RFFVRkRPMEZCUlVRc1RVRkJUU3hWUVVGVkxGVkJRVlVzUTBGQlF5eFBRVUZsTzBsQlEzaERMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEU5QlFVOHNRMEZCUXl4RFFVRkJPMEZCUTNSRExFTkJRVU03UVVGRlJEczdPenM3TzBkQlRVYzdRVUZEU0N4TlFVRk5MRlZCUVZVc1YwRkJWeXhEUVVGSkxFVkJRVmtzUlVGQlJTeEZRVUZaTzBsQlEzWkVMRWxCUVVrc1MwRkJTeXhIUVVGakxFVkJRVVVzUTBGQlF6dEpRVU14UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjZRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVONlFpeFBRVUZQTEV0QlFVc3NRMEZCUXp0QlFVTm1MRU5CUVVNN1FVRkZSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzVlVGQlZTeFhRVUZYTEVOQlFVa3NTMEZCWlR0SlFVTTFReXhQUVVGUExFTkJRVU1zUTBGQlJTeExRVUZMTEVsQlFVa3NTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVU3VVVGRGJrTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8wdEJRMkk3UVVGRFNDeERRVUZETzBGQlJVUTdPenM3T3p0SFFVMUhPMEZCUTBnc1RVRkJUU3hWUVVGVkxGZEJRVmNzUTBGRGVrSXNTMEZCWlR0SlFVVm1MRWxCUVVrc1MwRkJTeXhIUVVGakxFVkJRVVVzUTBGQlF6dEpRVVV4UWl4VFFVRlRMSGxDUVVGNVFpeERRVUZETEVOQlFVYzdVVUZEY0VNc1QwRkJUeXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVNNVFpeERRVUZETzBsQlJVUXNTMEZCU1N4SlFVRkpMRXRCUVVzc1IwRkJSeXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVU3VVVGRGFFUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlEzaENMRWxCUVVrc2VVSkJRWGxDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1dVRkRia01zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVOc1FqdExRVU5HTzBsQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1FVRkRaaXhEUVVGREluMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIHVuY2VydGFpbiByZXR1cm4gdHlwZS5cclxuICogSW4gVHlwZVNjcmlwdCBpdCdzIHBvc3NpYmxlIHRvIHJldHVyblxyXG4gKiBgVHlwZSB8IHVuZGVmaW5lZGAgYnV0IGF0IHJ1bnRpbWUgaXQgY2FuXHJcbiAqIGdldCBhIGJpdCBtZXNzeSB0byBoYW5kbGUgdGhpcyB3ZWxsLlxyXG4gKiBUaGUgT3B0aW9uIGNsYXNzIHJlcHJlc2VudHMgdGhpcyBjbGVhbmx5XHJcbiAqIGFuZCBleHBsaWNpdGx5IHdoaWxlIG1ha2luZyBpdCBlYXN5XHJcbiAqIGRldGVybWluZSB3aGV0aGVyIHRoZSB2YWx1ZSBpcyB2YWxpZCBvciBub3RcclxuICogYW5kLCBpZiB2YWxpZCwgcHJvdmlkZXMgZWFzeSB3YXlzIHRvIGdldFxyXG4gKiB0aGUgdmFsdWUgd2l0aCBwcm9wZXIgdHlwZSBjb25zaXN0ZW5jeSBpblxyXG4gKiBUeXBlU2NyaXB0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUpIHtcclxuICAgICAgICBpZiAoX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBfdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRoYXQgdGhlcmUgaXMgYSB2YWx1ZSBiZWZvcmVcclxuICAgICAqIGNhbGxpbmcgdGhpcy5cclxuICAgICAqIEBzZWUgaXNWYWxpZFxyXG4gICAgICovXHJcbiAgICBnZXQgVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRlc3RzIGlmIHRoZSB2YWx1ZSBpcyBrbm93bi5cclxuICAgICAqL1xyXG4gICAgZ2V0IGlzVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy52YWx1ZTtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liM0IwYVc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDI5d2RHbHZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSVWc3T3pzN096czdPenM3TzBkQlYwYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1RVRkJUVHRKUVVkcVFpeFpRVUZaTEUxQlFWYzdVVUZEY2tJc1NVRkJTU3hOUVVGTkxFVkJRVVU3V1VGRFZpeEpRVUZKTEVOQlFVTXNTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJRenRUUVVOeVFqdGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU03VTBGRGJrSTdTVUZEU0N4RFFVRkRPMGxCUlVnN096czdUMEZKUnp0SlFVTkVMRWxCUVVrc1MwRkJTenRSUVVOUUxFOUJRVmNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJSVWc3TzA5QlJVYzdTVUZEUkN4SlFVRkpMRTlCUVU4N1VVRkRWQ3hQUVVGUExFTkJRVU1zUTBGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMGxCUTNaQ0xFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmZ1bmN0aW9uIGNhc3QoYXR0cikge1xyXG4gICAgcmV0dXJuIGF0dHI7XHJcbn1cclxuZXhwb3J0IGNsYXNzIERvbUF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3IoX3dlYkVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50ID0gX3dlYkVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlIG9mIHRoaXMuX3dlYkVsZW1lbnQuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVOYW1lcygpIHtcclxuICAgICAgICB2YXIgbGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvciAodmFyIGF0dHIgb2YgdGhpcy5fd2ViRWxlbWVudC5hdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChhdHRyLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGFkZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldChuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzZXQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXQobmFtZSk7XHJcbiAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0KG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2ViRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICB9XHJcbiAgICBoYXMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWJFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKSAhPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl93ZWJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laRzl0TFdGMGRISnBZblYwWlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXRjBkSEpwWW5WMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVdElMRk5CUVZNc1NVRkJTU3hEUVVGRkxFbEJRVzFDTzBsQlEyaERMRTlCUVdkRExFbEJRVXNzUTBGQlF6dEJRVU40UXl4RFFVRkRPMEZCUlVRc1RVRkJUU3hQUVVGUExHRkJRV0U3U1VGSGVFSXNXVUZCV1N4WFFVRnZRanRSUVVNNVFpeEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMRmRCUVZjc1EwRkJRenRKUVVOcVF5eERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRkZCUVRSRE8xRkJRMnhFTEV0QlFVa3NTVUZCU1N4VFFVRlRMRWxCUVVrc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZEYUVRc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVWQlFVVXNVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJRek5ETzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzWTBGQll6dFJRVU5hTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWxCUVVrc1MwRkJTeXhGUVVGVkxFTkJRVUU3VVVGRk9VSXNTMEZCU1N4SlFVRkpMRWxCUVVrc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZWQlFWVXNSVUZCUlR0WlFVTXpReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVOMlFqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFZEJRVWNzUTBGQlF5eEpRVUZaTEVWQlFVVXNTMEZCWVR0UlFVTTNRaXhQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wbEJReTlDTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXU3hGUVVGRkxFdEJRV0U3VVVGRE4wSXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkJPMUZCUXpGRExFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmRVTTdVVUZEZUVRc1NVRkJTU3hMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVFN1VVRkRaaXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRE4wTXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWk8xRkJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTTdTVUZEY2tRc1EwRkJRenRKUVVWRUxFMUJRVTBzUTBGQlF5eEpRVUZaTzFGQlEycENMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zWlVGQlpTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaRExFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogIyBEb21DbGFzc2VzXHJcbiAqXHJcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBJQ2xhc3NlcyBpbnRlcmZhY2UgdGhhdCBhbGxvd3Mgb3BlcmF0aW9uc1xyXG4gKiB0byBiZSBwZXJmb3JtZWQgb24gRE9NIG9iamVjdHMgaW4gYSBicm93c2VyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvbUNsYXNzZXMge1xyXG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnQsIGVsZW1lbnRPYmplY3QpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50T2JqZWN0O1xyXG4gICAgICAgIHRoaXMuaHRtbEVsZW1lbnQgPSBfZWxlbWVudDtcclxuICAgIH1cclxuICAgIGZvckVhY2godGFzaykge1xyXG4gICAgICAgIGZvciAodmFyIF9jbGFzcyBvZiB0aGlzLmh0bWxFbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICB0YXNrKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiBpZi1hbmQtb25seS1pZiB0aGUgbmFtZWQgY2xhc3MgaXMgb24gdGhlIGVsZW1lbnQuXHJcbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIChmbHVpZCkgZWxlbWVudCBvYmplY3QgdG8gYWxsb3cgdGhpbmdzIHRvXHJcbiAgICAgKiBiZSBkb25lIHdpdGggaXQuIFJldHVybnMgc2VsZi5cclxuICAgICAqIEBwYXJhbSBuYW1lLSBIVE1MIGNsYXNzIG5hbWUgdG8gc2Vla1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrLSBjYWxsYmFjayB0byBydW4gdG8gbWFuaXB1bGF0ZSB0aGUgZWxlbWVudCBpZiBwcmVzZW50LlxyXG4gICAgICovXHJcbiAgICB3aGVuSGFzKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkKF9jbGFzcykge1xyXG4gICAgICAgIGlmICghIV9jbGFzcyAmJiBfY2xhc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5odG1sRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QuYWRkKF9jbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgZWRpdCBjbGFzc2VzIG9uIERvbUVsZW1lbnQgdGhhdCBwcm92aWRlcyBubyBIVE1MRWxlbWVudC5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2xhc3MgbmFtZSBnaXZlbiB3YXMgXCIke19jbGFzc31cIiAtIGl0IG11c3Qgbm90IGJlIGVtcHR5IWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZShfY2xhc3MpIHtcclxuICAgICAgICB0aGlzLmh0bWxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoX2NsYXNzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChfY2xhc3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzKF9jbGFzcykpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoX2NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXTnNZWE56WlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXTnNZWE56WlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVUxSU96czdPenRIUVV0SE8wRkJRMGdzVFVGQlRTeFBRVUZQTEZWQlFWVTdTVUZKY2tJc1dVRkJXU3hSUVVGcFFpeEZRVUZGTEdGQlFYbENPMUZCUTNSRUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NZVUZCWVN4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NVVUZCVVN4RFFVRkRPMGxCUXpsQ0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVTXNTVUZCWjBNN1VVRkRkRU1zUzBGQlNTeEpRVUZKTEUxQlFVMHNTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUlVGQlJUdFpRVU0xUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVUU3VTBGRFlqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFZEJRVWNzUTBGQlF5eEpRVUZaTzFGQlEyUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRia1FzUTBGQlF6dEpRVVZJT3pzN096czdUMEZOUnp0SlFVTkVMRTlCUVU4c1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmIwTTdVVUZEZUVRc1NVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMWxCUTJ4Q0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1UwRkRlRUk3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hIUVVGSExFTkJRVU1zVFVGQll6dFJRVU5vUWl4SlFVRkpMRU5CUVVNc1EwRkJSU3hOUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRiRU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZPMmRDUVVOd1FpeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdZVUZEZUVNN2FVSkJRVTA3WjBKQlEwd3NUVUZCVFN4TFFVRkxMRU5CUVVNc1owVkJRV2RGTEVOQlFVTXNRMEZCUXp0aFFVTXZSVHRUUVVOR08yRkJRVTA3V1VGRFRDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMSGxDUVVGNVFpeE5RVUZOTERKQ1FVRXlRaXhEUVVGRExFTkJRVUU3VTBGRE1VVTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRVHRKUVVOaUxFTkJRVU03U1VGRlJDeE5RVUZOTEVOQlFVTXNUVUZCWXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZOQlFWTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVUU3VVVGRGVrTXNUMEZCVHl4SlFVRkpMRU5CUVVFN1NVRkRZaXhEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEUxQlFXTTdVVUZEYUVJc1NVRkJTU3hEUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVN1dVRkRkRUlzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRVHRUUVVOcVFqdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkJPMGxCUTJJc1EwRkJRenREUVVOR0luMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiAjIE5vbkNsYXNzZXNcclxuICpcclxuICogSXMgYSBuaWwtZWZmZWN0IElDbGFzc2VzIGluc3RhbmNlIHRvIHJldHVyblxyXG4gKiBpbiBhbnkgc2l0dWF0aW9uIHdoZXJlIHRoZSBJRWxlbWVudCBpbXBsZW1lbnRhdGlvblxyXG4gKiBjYW5ub3QgcHJvdmlkZSBhIGJhY2tpbmcgZm9yIHRoZSBzdHlsZSBjbGFzc2VzIGZyb21cclxuICogYSBkb2N1bWVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb25DbGFzc2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBoYXMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHdoZW5IYXMobmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZChfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZShfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChfY2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdOc1lYTnpaWE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdOc1lYTnpaWE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVXRJT3pzN096czdPMGRCVDBjN1FVRkRTQ3hOUVVGTkxFOUJRVThzVlVGQlZUdEpRVU55UWl4blFrRkJaU3hEUVVGRE8wbEJSV2hDTEU5QlFVOHNRMEZCUXl4UlFVRnhRenRSUVVNelF5eFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hIUVVGSExFTkJRVU1zU1VGQldUdFJRVU5rTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJZc1EwRkJRenRKUVVWRUxFOUJRVThzUTBGQlF5eEpRVUZaTEVWQlFVVXNVVUZCY1VNN1VVRkRla1FzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFMUJRV003VVVGRGFFSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEUxQlFXTTdVVUZEYmtJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRTFCUVdNN1VVRkRhRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPME5CUTBZaWZRPT0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbm9uLWF0dHJpYnV0ZXMgaW5zdGFuY2UsIHRvIGJlIHJldHVybmVkXHJcbiAqIHdoZW4gbm8gZWZmZWN0aXZlIGF0dHJpYnV0ZXMgaW5zdGFuY2UgY2FuIGJlIHByb3ZpZGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vbkF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIGZvckVhY2goY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZU5hbWVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGFkZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXQobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZW1vdmUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtOXVMV0YwZEhKcFluVjBaWE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdGMGRISnBZblYwWlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVsSU96czdSMEZIUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhoUVVGaE8wbEJRM2hDTEdkQ1FVRmxMRU5CUVVNN1NVRkZhRUlzVDBGQlR5eERRVUZETEZGQlFTdERPMUZCUTNKRUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMR05CUVdNN1VVRkRXaXhQUVVGUExFVkJRVVVzUTBGQlF6dEpRVU5hTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXU3hGUVVGRkxFdEJRV0U3VVVGRE4wSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEVsQlFWa3NSVUZCUlN4TFFVRmhPMUZCUXpkQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmQwTTdVVUZEZWtRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRWxCUVZrN1VVRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVTkVMRTFCUVUwc1EwRkJReXhKUVVGWk8xRkJRMnBDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenREUVVOR0luMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IE5vbkF0dHJpYnV0ZXMgfSBmcm9tICcuL25vbi1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IHsgTm9uQ2xhc3NlcyB9IGZyb20gJy4vbm9uLWNsYXNzZXMnO1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhIG5vbi1lbGVtZW50LiBUbyBiZSByZXR1cm5lZCBpbiBhbnN3ZXJcclxuICogZm9yIGFuIGVsZW1lbnQgYnV0IG9uZSBjYW5ub3QgYmUgcHJvdmlkZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9uRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgaXNWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB3aXRoQ2hpbGRyZW4oY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGV4cGVjdCh0YWdOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGhhc0lkKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGV4aXN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGVsZW1lbnRMaXN0TG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBzZWxlY3RGaXJzdChzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0b3JQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHRhZ05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdGV4dChfdGV4dCkge1xyXG4gICAgICAgIGlmIChfdGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBodG1sKF9odG1sKSB7XHJcbiAgICAgICAgaWYgKF9odG1sKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHJlcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTm9uQXR0cmlidXRlcygpO1xyXG4gICAgfVxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE5vbkNsYXNzZXMoKTtcclxuICAgIH1cclxuICAgIG9uKGFyZ3MpIHsgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdWc1pXMWxiblF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZibTl1TFdWc1pXMWxiblF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVkZJTEU5QlFVOHNSVUZCUlN4aFFVRmhMRVZCUVVVc1RVRkJUU3hyUWtGQmEwSXNRMEZCUXp0QlFVTnFSQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUnpORE96czdSMEZIUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhWUVVGVk8wbEJSWEpDTEdkQ1FVRmxMRU5CUVVNN1NVRkZhRUlzVDBGQlR6dFJRVU5NTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJZc1EwRkJRenRKUVVWRUxGTkJRVk03VVVGRFVDeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3haUVVGWkxFTkJRVU1zVVVGQmIwTTdVVUZETDBNc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUVUZCVFN4RFFVRkRMRTlCUVdVN1VVRkRjRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRXRCUVVzN1VVRkRTQ3hQUVVGUExFdEJRVXNzUTBGQlF6dEpRVU5tTEVOQlFVTTdTVUZGUkN4TlFVRk5PMUZCUTBvc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFppeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRzFDUVVGelF6dFJRVU0xUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeFhRVUZYTEVOQlFVTXNVVUZCWjBJN1VVRkRNVUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1dVRkJXVHRSUVVOV0xFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hQUVVGUExFVkJRVVVzUTBGQlF6dEpRVU5hTEVOQlFVTTdTVUZGUkN4SlFVRkpMRU5CUVVNc1MwRkJNRUk3VVVGRE4wSXNTVUZCU1N4TFFVRkxMRVZCUVVVN1dVRkRWQ3hQUVVGUExFbEJRVWtzUTBGQlF6dFRRVU5pTzJGQlFVMDdXVUZEVEN4UFFVRlBMRVZCUVVVc1EwRkJRenRUUVVOWU8wbEJRMGdzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4TFFVRXdRanRSUVVNM1FpeEpRVUZKTEV0QlFVc3NSVUZCUlR0WlFVTlVMRTlCUVU4c1NVRkJTU3hEUVVGRE8xTkJRMkk3WVVGQlRUdFpRVU5NTEU5QlFVOHNSVUZCUlN4RFFVRkRPMU5CUTFnN1NVRkRTQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEV0QlFXRTdVVUZEYkVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRXRCUVdFN1VVRkRia0lzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUVHRSUVVOS0xFOUJRVThzVTBGQlV5eERRVUZETzBsQlEyNUNMRU5CUVVNN1NVRkZSQ3hWUVVGVk8xRkJRMUlzVDBGQlR5eEpRVUZKTEdGQlFXRXNSVUZCUlN4RFFVRkRPMGxCUXpkQ0xFTkJRVU03U1VGRlJDeFBRVUZQTzFGQlEwd3NUMEZCVHl4SlFVRkpMRlZCUVZVc1JVRkJSU3hEUVVGRE8wbEJRekZDTEVOQlFVTTdTVUZEUkN4RlFVRkZMRU5CUVVNc1NVRkJjMElzU1VGQlZ5eERRVUZETzBsQlJYSkRMRXRCUVVzN1VVRkRTQ3hQUVVGUExGTkJRVk1zUTBGQlF6dEpRVU51UWl4RFFVRkRPME5CUTBZaWZRPT0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcclxuaW1wb3J0IHsgcHJvdmlkZXNBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBEb21BdHRyaWJ1dGVzIH0gZnJvbSAnLi9kb20tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IERvbUNsYXNzZXMgfSBmcm9tICcuL2RvbS1jbGFzc2VzJztcclxuaW1wb3J0IHsgTm9uQ2xhc3NlcyB9IGZyb20gJy4vbm9uLWNsYXNzZXMnO1xyXG5pbXBvcnQgeyBOb25BdHRyaWJ1dGVzIH0gZnJvbSAnLi9ub24tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IE5vbkVsZW1lbnQgfSBmcm9tICcuL25vbi1lbGVtZW50JztcclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0gY29sbGVjdGlvbiBIVE1MIGNvbGxlY3Rpb24gdG8gY29udmVydCBpbnRvIGFycmF5IG9mIElFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0SHRtbENvbGxlY3Rpb24oY29sbGVjdGlvbikge1xyXG4gICAgbGV0IGxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBjb2xsZWN0aW9uLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGNvbGxlY3Rpb25baW5kZXhdO1xyXG4gICAgICAgIGxpc3QucHVzaChuZXcgRG9tRWxlbWVudChjaGlsZCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gc2VsZWN0b3JQYXRoKGVsZW1lbnQpIHtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBwYXRoID0gYCN7JGlkfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGVsZW1lbnQudGFnTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBgJHtzZWxlY3RvclBhdGgoZWxlbWVudC5wYXJlbnRFbGVtZW50KX0+JHtlbGVtZW50LnRhZ05hbWV9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG4vKipcclxuICogQHByaXZhdGUgYW4gaW50ZXJuYWwgZnVuY3Rpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCeVNlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgZmlyc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yUGF0aChlbGVtZW50KX0+JHtzZWxlY3Rvcn1gKTtcclxuICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbi8qKlxyXG4gKiAjIERvbUVsZW1lbnRcclxuICpcclxuICogVGhlIGltcGxlbWVudGF0aW9uIElFbGVtZW50IGZvciBlbGVtZW50cyBpbiB0aGUgYnJvd3NlclxyXG4gKiBwYWdlIGZyb20gdGhlIERPTS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb21FbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPSBuZXcgT3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgYWxlcnRJbnZhbGlkKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJRWxlbWVudFtEb21FbGVtZW50XSBpcyBpbnZhbGlkLlwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgZWxlbWVudHMgaW4gYSBkb2N1bWVudCB1c2luZyBhIHNlbGVjdG9yLlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gQ1NTIHN0eWxlIHNlbGVjdG9yLlxyXG4gICAgICogQHJldHVybnMgbGlzdCBvZiBtYXRjaGluZyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExpc3RGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBjb252ZXJ0SHRtbENvbGxlY3Rpb24obGlzdCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQgdXNpbmcgYSBjbGFzcyBuYW1lLlxyXG4gICAgICogTm90ZSBkbyBub3QgcHJlZml4IHdpdGggYSBwZXJpb2QgKGAuYCkgLSBqdXN0IHByb3ZpZGVcclxuICAgICAqIHRoZSBwdXJlIGNsYXNzIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3MgLSBwdXJlIGNsYXNzIG5hbWUuXHJcbiAgICAgKiBAcmV0dXJucyBsaXN0IG9mIG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TGlzdEZyb21DbGFzcyhfY2xhc3MpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke19jbGFzc31gKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBlbGVtZW50cyBpbiBhIGRvY3VtZW50IHVzaW5nIGEgdGFnLW5hbWUuXHJcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSAtIHRhZyBuYW1lIChjYXNlIGluc2Vuc2l0aXZlKS5cclxuICAgICAqIEByZXR1cm5zIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRMaXN0RnJvbVRhZ05hbWUodGFnTmFtZSkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YWdOYW1lKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEVsZW1lbnRGcm9tSWQoaWQpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG4gICAgICAgIHJldHVybiBEb21FbGVtZW50Lm1ha2VGcm9tRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZmlyc3QgbWF0Y2hpbmcgZWxlbWVudCBmcm9tIGEgZG9jdW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgLSBhIENTUyBzdHlsZSBzZWxlY3RvclxyXG4gICAgICogQHJldHVybnMgYW4gZWxlbWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5tYWtlRnJvbUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbWFrZUZyb21FbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gKCEhZWxlbWVudCkgPyBuZXcgRG9tRWxlbWVudChlbGVtZW50KSA6IG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZDtcclxuICAgIH1cclxuICAgIGdldFBhcmVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBfcGFyID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50O1xyXG4gICAgICAgICAgICBwYXJlbnQgPSBfcGFyID8gbmV3IERvbUVsZW1lbnQoX3BhcikgOiBuZXcgRG9tRWxlbWVudCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE5vbkVsZW1lbnQoKTtcclxuICAgIH1cclxuICAgIHdpdGhDaGlsZHJlbihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCAmJiB0aGlzLmRvbUVsZW1lbnQuVmFsdWUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGNvbnZlcnRIdG1sQ29sbGVjdGlvbih0aGlzLmRvbUVsZW1lbnQuVmFsdWUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3QodGFnTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsID0gdGhpcy5kb21FbGVtZW50LlZhbHVlLnRhZ05hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgbGV0IGV4cGVjdGVkID0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFeHBlY3RlZCAke2V4cGVjdGVkfSBidXQgQWN0dWFsIHRhZ05hbWUgd2FzICR7YWN0dWFsfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMoKS5nZXQoJ2lkJyk7XHJcbiAgICB9XHJcbiAgICBoYXNJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzKCkuaGFzKCdpZCcpO1xyXG4gICAgfVxyXG4gICAgZXhpc3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKTtcclxuICAgIH1cclxuICAgIGZpbmRBbGwoZWxlbWVudExpc3RMb2NhdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnRMaXN0TG9jYXRpb25bJ3NlbGVjdG9yJ10gfHwgZWxlbWVudExpc3RMb2NhdGlvblsndGFnTmFtZSddO1xyXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBjb252ZXJ0SHRtbENvbGxlY3Rpb24oY29sbGVjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBzZWxlY3RGaXJzdChzZWxlY3Rvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSBnZXRCeVNlbGVjdG9yKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSwgc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudChmaXJzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEb21FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RvclBhdGgoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvclBhdGgodGhpcy5kb21FbGVtZW50LlZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB0YWdOYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50LlZhbHVlLnRhZ05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgcmV0dXJuICdVTktOT1dOJztcclxuICAgIH1cclxuICAgIHRleHQoX3RleHQpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghIV90ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBodG1sKF9odG1sKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoISFfaHRtbCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBfaHRtbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwZW5kKF9odG1sKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsSHRtbCA9IGAke3RoaXMuaHRtbCgpfSR7X2h0bWx9YDtcclxuICAgICAgICB0aGlzLmh0bWwodG90YWxIdG1sKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHByZXBlbmQoX2h0bWwpIHtcclxuICAgICAgICB2YXIgdG90YWxIdG1sID0gYCR7X2h0bWx9JHt0aGlzLmh0bWwoKX1gO1xyXG4gICAgICAgIHRoaXMuaHRtbCh0b3RhbEh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuVmFsdWUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21BdHRyaWJ1dGVzKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vbkF0dHJpYnV0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzc2VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbUNsYXNzZXModGhpcy5kb21FbGVtZW50LlZhbHVlLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25DbGFzc2VzKCk7XHJcbiAgICB9XHJcbiAgICBvbihhcmdzKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVzQWxsKFsnZXZlbnQnLCAnaGFuZGxlciddLCBhcmdzKSAmJiB0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBhcmdzLmV2ZW50O1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGFyZ3MuaGFuZGxlcjtcclxuICAgICAgICAgICAgdmFyIG9wdEtlZXBEZWZhdWx0ID0gYXJncy5rZWVwRGVmYXVsdDtcclxuICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LlZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uIChmaXJlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdEtlZXBEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihmaXJlZEV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudFsndmFsdWUnXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laRzl0TFdWc1pXMWxiblF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZaRzl0TFdWc1pXMWxiblF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVVZJTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hWUVVGVkxFTkJRVU03UVVGRmJFTXNUMEZCVHl4RlFVRmxMRmRCUVZjc1JVRkJZeXhOUVVGTkxGRkJRVkVzUTBGQlFUdEJRVU0zUkN4UFFVRlBMRVZCUVVVc1lVRkJZU3hGUVVGRkxFMUJRVTBzYTBKQlFXdENMRU5CUVVFN1FVRkRhRVFzVDBGQlR5eEZRVUZGTEZWQlFWVXNSVUZCUlN4TlFVRk5MR1ZCUVdVc1EwRkJRVHRCUVVVeFF5eFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGRE8wRkJRek5ETEU5QlFVOHNSVUZCUlN4aFFVRmhMRVZCUVVVc1RVRkJUU3hyUWtGQmEwSXNRMEZCUXp0QlFVOXFSQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUlRORE96czdSMEZIUnp0QlFVTklMRk5CUVZNc2NVSkJRWEZDTEVOQlF6VkNMRlZCUVdkRU8wbEJSV2hFTEVsQlFVa3NTVUZCU1N4SFFVRnZRaXhGUVVGRkxFTkJRVU03U1VGREwwSXNTMEZCU1N4SlFVRkpMRXRCUVVzc1IwRkJSeXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZITEZWQlFWVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVU3VVVGRGNrUXNTVUZCU1N4TFFVRkxMRWRCUVdsQ0xGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTTFReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZGTEVsQlFVa3NWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRkxFTkJRVU03UzBGRGNFTTdTVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRCUVVOa0xFTkJRVU03UVVGRlJEczdSMEZGUnp0QlFVTklMRk5CUVZNc1dVRkJXU3hEUVVGRExFOUJRU3RDTzBsQlEyNUVMRWxCUVVrc1NVRkJTU3hIUVVGSExFVkJRVVVzUTBGQlF6dEpRVU5rTEVsQlFVa3NUMEZCVHl4RlFVRkZPMUZCUTFnc1NVRkJTU3hGUVVGRkxFZEJRVWNzVDBGQlR5eERRVUZETEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOd1F5eEpRVUZKTEVWQlFVVXNSVUZCUlR0WlFVTk9MRWxCUVVrc1IwRkJSeXhSUVVGUkxFTkJRVU03VTBGRGFrSTdZVUZCVFN4SlFVRkxMRU5CUVVVc1QwRkJUeXhEUVVGRExHRkJRV0VzUlVGQlJ6dFpRVU53UXl4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF6dFRRVU40UWp0aFFVRk5PMWxCUTB3c1NVRkJTU3hIUVVGSExFZEJRVWNzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4aFFVRmhMRU5CUVVNc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVMEZEY0VVN1MwRkRSanRKUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBGQlEyUXNRMEZCUXp0QlFVVkVPenRIUVVWSE8wRkJRMGdzVTBGQlV5eGhRVUZoTEVOQlFVTXNUMEZCT0VJc1JVRkJSU3hSUVVGblFqdEpRVU55UlN4SlFVRkpMRXRCUVVzc1IwRkJSeXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUlRWRExFbEJRVWtzUzBGQlN5eEZRVUZGTzFGQlExUXNUMEZCYjBJc1MwRkJTeXhEUVVGRE8wdEJRek5DTzFOQlFVMDdVVUZEVEN4TFFVRkxMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlJTeEhRVUZITEZsQlFWa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hSUVVGUkxFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzaEZMRWxCUVVrc1MwRkJTeXhGUVVGRk8xbEJRMVFzVDBGQmIwSXNTMEZCU3l4RFFVRkRPMU5CUXpOQ08wdEJRMFk3U1VGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0QlFVTmtMRU5CUVVNN1FVRkhSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzVDBGQlR5eFZRVUZWTzBsQlIzSkNMRmxCUVdNc1QwRkJLMEk3VVVGRE0wTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQk5FSXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRia1VzUTBGQlF6dEpRVVZQTEZsQlFWazdVVUZEYkVJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eHJRMEZCYTBNc1EwRkJReXhEUVVGRE8wbEJRM0JFTEVOQlFVTTdTVUZGUkRzN096dFBRVWxITzBsQlEwZ3NUVUZCVFN4RFFVRkRMRzFDUVVGdFFpeERRVUZETEZGQlFXVTdVVUZEZUVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzVVVGQlVTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzFGQlF5OURMRTlCUVU4c2NVSkJRWEZDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRja01zUTBGQlF6dEpRVVZFT3pzN096czdUMEZOUnp0SlFVTklMRTFCUVUwc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRmhPMUZCUTI1RExFbEJRVWtzU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eEpRVUZKTEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRia1FzVDBGQlR5eHhRa0ZCY1VJc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU55UXl4RFFVRkRPMGxCUlVRN096czdUMEZKUnp0SlFVTklMRTFCUVUwc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UFFVRmpPMUZCUTNSRExFbEJRVWtzU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTTVReXhQUVVGUExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRM0pETEVOQlFVTTdTVUZGUkN4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNSVUZCVlR0UlFVTm9ReXhKUVVGSkxFOUJRVThzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZVUZCWVN4RFFVRkRMRWxCUVVrc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU12UXl4UFFVRlBMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZETjBNc1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTQ3hOUVVGTkxFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1VVRkJaMEk3VVVGRE5VTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTXZReXhQUVVGUExGVkJRVlVzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkROME1zUTBGQlF6dEpRVVZQTEUxQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJjVU03VVVGRGJFVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4VlFVRlZMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1NVRkRiRVVzUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4UFFVRlBMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eERRVUZETzBsQlEycERMRU5CUVVNN1NVRkZSQ3hUUVVGVE8xRkJRMUFzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEU5QlFVOHNSMEZCYVVJc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEYkVRc1NVRkJTU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUXp0WlFVTnFReXhKUVVGSkxFMUJRV3RDTEVOQlFVTTdXVUZEZGtJc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4VlFVRlZMRU5CUVdVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1dVRkRkRVVzVDBGQlR5eE5RVUZOTEVOQlFVTTdVMEZEWmp0UlFVTkVMRTlCUVU4c1NVRkJTU3hWUVVGVkxFVkJRVVVzUTBGQlF6dEpRVU14UWl4RFFVRkRPMGxCUlVRc1dVRkJXU3hEUVVGRExGRkJRWE5ETzFGQlEycEVMRWxCUVVrc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRlRVVzU1VGQlNTeEpRVUZKTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVVVzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03V1VGRGJFVXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xTkJRMmhDTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEU5QlFXVTdVVUZEY0VJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZEZWtRc1NVRkJTU3hSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMWxCUTNKRExFbEJRVXNzVFVGQlRTeEpRVUZKTEZGQlFWRXNSVUZCU1R0blFrRkRla0lzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRkZCUVZFc01rSkJRVEpDTEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNN1lVRkRlRVU3VTBGRFJqdGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUzBGQlN6dFJRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnlReXhEUVVGRE8wbEJSVVFzUzBGQlN6dFJRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUVR0SlFVTndReXhEUVVGRE8wbEJSVVFzVFVGQlRUdFJRVU5LTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRM2hDTEVOQlFVTTdTVUZGUkN4UFFVRlBMRU5CUVVNc2JVSkJRWE5ETzFGQlF6VkRMRWxCUVVrc1VVRkJVU3hIUVVGSExHMUNRVUZ0UWl4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxHMUNRVUZ0UWl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMnBHTEVsQlFVa3NVVUZCVVN4RlFVRkZPMWxCUTFvc1NVRkJTU3hWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkRiRVVzU1VGQlNTeEpRVUZKTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVVVzVlVGQlZTeERRVUZGTEVOQlFVTTdXVUZETDBNc1QwRkJUeXhKUVVGSkxFTkJRVU03VTBGRFlqdFJRVU5FTEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTFvc1EwRkJRenRKUVVWRUxGZEJRVmNzUTBGQlF5eFJRVUZuUWp0UlFVTXhRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFbEJRVWtzUzBGQlN5eEhRVUYzUWl4aFFVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkZhRVlzU1VGQlNTeExRVUZMTEVWQlFVVTdaMEpCUTFRc1QwRkJUeXhKUVVGSkxGVkJRVlVzUTBGQll5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTXpRenRUUVVOR08xRkJRMFFzVDBGQlR5eEpRVUZKTEZWQlFWVXNSVUZCUlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRlJDeFpRVUZaTzFGQlExWXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU16UWl4UFFVRlBMRmxCUVZrc1EwRkJSU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUlN4RFFVRkRPMU5CUXpsRE8xRkJRMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMUZCUTNCQ0xFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8xTkJRM1JETzFGQlEwUXNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xRkJRM0JDTEU5QlFVOHNVMEZCVXl4RFFVRkRPMGxCUTI1Q0xFTkJRVU03U1VGRlJDeEpRVUZKTEVOQlFVTXNTMEZCWlR0UlFVTnNRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFbEJRVWtzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM0JETEVsQlFVa3NRMEZCUXl4RFFVRkRMRXRCUVVzc1JVRkJSenRuUWtGRFdpeFBRVUZQTEVOQlFVTXNVMEZCVXl4SFFVRkhMRXRCUVVzc1EwRkJRVHRuUWtGRGVrSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1lVRkRZanRwUWtGQlRUdG5Ra0ZEVEN4UFFVRlBMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU03WVVGRE1VSTdVMEZEUmp0aFFVRlBPMWxCUTA0c1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFsQlEzQkNMRTlCUVU4c1JVRkJSU3hEUVVGRE8xTkJRMWc3U1VGRFNDeERRVUZETzBsQlJVUXNTVUZCU1N4RFFVRkRMRXRCUVdVN1VVRkRiRUlzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU53UXl4SlFVRkpMRU5CUVVNc1EwRkJSU3hMUVVGTExFVkJRVVU3WjBKQlExb3NUMEZCVHl4RFFVRkRMRk5CUVZNc1IwRkJSeXhMUVVGTExFTkJRVUU3WjBKQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRE8yRkJRMkk3YVVKQlFVMDdaMEpCUTB3c1QwRkJUeXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETzJGQlF6RkNPMU5CUTBZN1lVRkJUVHRaUVVOTUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVWQlFVVXNRMEZCUXp0WlFVTndRaXhQUVVGUExFVkJRVVVzUTBGQlF6dFRRVU5ZTzBsQlEwZ3NRMEZCUXp0SlFVVkVMRTFCUVUwc1EwRkJReXhMUVVGaE8xRkJRMnhDTEVsQlFVa3NVMEZCVXl4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEhRVUZITEV0QlFVc3NSVUZCUlN4RFFVRkJPMUZCUTNoRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVFN1VVRkRjRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1QwRkJUeXhEUVVGRExFdEJRV0U3VVVGRGJrSXNTVUZCU1N4VFFVRlRMRWRCUVVjc1IwRkJSeXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RlFVRkZMRU5CUVVFN1VVRkRlRU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRVHRSUVVOd1FpeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hOUVVGTk8xRkJRMG9zU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFRRVU5vUXp0aFFVRk5PMWxCUTB3c1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFOQlEzSkNPMUZCUTBRc1QwRkJUeXhUUVVGVExFTkJRVU03U1VGRGJrSXNRMEZCUXp0SlFVVkVMRlZCUVZVN1VVRkRVaXhKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFRRVU5xUkR0aFFVRk5PMWxCUTB3c1QwRkJUeXhKUVVGSkxHRkJRV0VzUlVGQlJTeERRVUZETzFOQlF6VkNPMGxCUTBnc1EwRkJRenRKUVVWRUxFOUJRVTg3VVVGRFRDeEpRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRk8xbEJRek5DTEU5QlFVOHNTVUZCU1N4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1UwRkRjRVE3VVVGRFJDeFBRVUZQTEVsQlFVa3NWVUZCVlN4RlFVRkZMRU5CUVVNN1NVRkRNVUlzUTBGQlF6dEpRVVZFTEVWQlFVVXNRMEZCUXl4SlFVRnpRanRSUVVOMlFpeEpRVUZKTEZkQlFWY3NRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJReXhUUVVGVExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU55UlN4SlFVRkpMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEzWkNMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZETTBJc1NVRkJTU3hqUVVGakxFZEJRVWNzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0WlFVTjBReXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eExRVUZMTEVWQlFVVXNWVUZCVXl4VlFVRmxPMmRDUVVOd1JTeEpRVUZKTEVOQlFVVXNZMEZCWXl4RlFVRkZPMjlDUVVOd1FpeFZRVUZWTEVOQlFVTXNZMEZCWXl4RlFVRkZMRU5CUVVFN2FVSkJRelZDTzJkQ1FVTkVMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlFUdFpRVU55UWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRUUVVOSU8wbEJRMGdzUTBGQlF6dEpRVVZFTEV0QlFVczdVVUZEU0N4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1QwRkJUeXhIUVVGVExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUXpGRExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMmRDUVVOd1FpeFBRVUZQTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1lVRkRkRUk3VTBGRFJqdFJRVU5FTEU5QlFVOHNVMEZCVXl4RFFVRkJPMGxCUTJ4Q0xFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgVGFnO1xyXG4oZnVuY3Rpb24gKFRhZykge1xyXG4gICAgVGFnW1wiQnV0dG9uXCJdID0gXCJCVVRUT05cIjtcclxuICAgIFRhZ1tcIkRpdlwiXSA9IFwiRElWXCI7XHJcbiAgICBUYWdbXCJJbnB1dFwiXSA9IFwiSU5QVVRcIjtcclxuICAgIFRhZ1tcIlBhcmFncmFwaFwiXSA9IFwiUFwiO1xyXG59KShUYWcgfHwgKFRhZyA9IHt9KSk7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9MSVNUID0gW1xyXG4gICAgJ2Fib3J0JywgJ2FmdGVyc2NyaXB0ZXhlY3V0ZScsXHJcbiAgICAnYW5pbWF0aW9uY2FuY2VsJywgJ2FuaW1hdGlvbmVuZCcsICdhbmltYXRpb25pdGVyYXRpb24nLFxyXG4gICAgJ2F1eGNsaWNrJyxcclxuICAgICdiZWZvcmVzY3JpcHRleGVjdXRlJywgJ2JsdXInLFxyXG4gICAgJ2NoYW5nZScsICdjbGljaycsICdjbG9zZScsICdjb250ZXh0bWVudScsXHJcbiAgICAnZGJsY2xpY2snLFxyXG4gICAgJ2Vycm9yJyxcclxuICAgICdmb2N1cycsICdmdWxsc2NyZWVuY2hhbmdlJywgJ2Z1bGxzY3JlZW5lcnJvcicsXHJcbiAgICAnZ290cG9pbnRlcmNhcHR1cmUnLFxyXG4gICAgJ2lucHV0JyxcclxuICAgICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2tleXVwJyxcclxuICAgICdsb2FkJywgJ2xvYWRlbmQnLCAnbG9hZHN0YXJ0JywgJ2xvc3Rwb2ludGVyY2FwdHVyZScsXHJcbiAgICAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCcsXHJcbiAgICAnb2ZmbGluZScsICdvbmxpbmUnLFxyXG4gICAgJ3BvaW50ZXJjYW5jZWwnLCAncG9pbnRlcmRvd24nLCAncG9pbnRlcmVudGVyJywgJ3BvaW50ZXJsZWF2ZScsXHJcbiAgICAncG9pbnRlcm1vdmUnLCAncG9pbnRlcm91dCcsICdwb2ludGVyb3ZlcicsICdwb2ludGVydXAnLFxyXG4gICAgJ3Jlc2V0JywgJ3Jlc2l6ZScsXHJcbiAgICAnc2Nyb2xsJywgJ3NlbGVjdCcsICdzZWxlY3Rpb25jaGFuZ2UnLCAnc2VsZWN0aW9uY2hhbmdlJyxcclxuICAgICdzZWxlY3RzdGFydCcsICdzdWJtaXQnLFxyXG4gICAgJ3RvdWNoY2FuY2VsJywgJ3RvdWNobW92ZScsICd0b3VjaHN0YXJ0JyxcclxuICAgICd0cmFuc2l0aW9uY2FuY2VsJywgJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgJ3Zpc2liaWxpdHljaGFuZ2UnLFxyXG4gICAgJ3doZWVsJ1xyXG5dO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMjl1YzNSaGJuUnpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyTnZibk4wWVc1MGN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN096dEhRVWxITzBGQlIwZ3NUVUZCVFN4RFFVRk9MRWxCUVZrc1IwRkxXRHRCUVV4RUxGZEJRVmtzUjBGQlJ6dEpRVU5pTEhkQ1FVRnBRaXhEUVVGQk8wbEJRMnBDTEd0Q1FVRlhMRU5CUVVFN1NVRkRXQ3h6UWtGQlpTeERRVUZCTzBsQlEyWXNjMEpCUVdVc1EwRkJRVHRCUVVOcVFpeERRVUZETEVWQlRGY3NSMEZCUnl4TFFVRklMRWRCUVVjc1VVRkxaRHRCUVVWRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEZWQlFWVXNSMEZCUnp0SlFVTjRRaXhQUVVGUExFVkJRVVVzYjBKQlFXOUNPMGxCUXpkQ0xHbENRVUZwUWl4RlFVRkZMR05CUVdNc1JVRkJSU3h2UWtGQmIwSTdTVUZEZGtRc1ZVRkJWVHRKUVVOV0xIRkNRVUZ4UWl4RlFVRkZMRTFCUVUwN1NVRkROMElzVVVGQlVTeEZRVUZGTEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVc1lVRkJZVHRKUVVONlF5eFZRVUZWTzBsQlExWXNUMEZCVHp0SlFVTlFMRTlCUVU4c1JVRkJSU3hyUWtGQmEwSXNSVUZCUlN4cFFrRkJhVUk3U1VGRE9VTXNiVUpCUVcxQ08wbEJRMjVDTEU5QlFVODdTVUZEVUN4VFFVRlRMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFOUJRVTg3U1VGRE9VSXNUVUZCVFN4RlFVRkZMRk5CUVZNc1JVRkJSU3hYUVVGWExFVkJRVVVzYjBKQlFXOUNPMGxCUTNCRUxGZEJRVmNzUlVGQlJTeFhRVUZYTEVWQlFVVXNWVUZCVlN4RlFVRkZMRmRCUVZjc1JVRkJSU3hUUVVGVE8wbEJRelZFTEZOQlFWTXNSVUZCUlN4UlFVRlJPMGxCUTI1Q0xHVkJRV1VzUlVGQlJTeGhRVUZoTEVWQlFVVXNZMEZCWXl4RlFVRkZMR05CUVdNN1NVRkRPVVFzWVVGQllTeEZRVUZGTEZsQlFWa3NSVUZCUlN4aFFVRmhMRVZCUVVVc1YwRkJWenRKUVVOMlJDeFBRVUZQTEVWQlFVVXNVVUZCVVR0SlFVTnFRaXhSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEdsQ1FVRnBRaXhGUVVGRkxHbENRVUZwUWp0SlFVTjRSQ3hoUVVGaExFVkJRVVVzVVVGQlVUdEpRVU4yUWl4aFFVRmhMRVZCUVVVc1YwRkJWeXhGUVVGRkxGbEJRVms3U1VGRGVFTXNhMEpCUVd0Q0xFVkJRVVVzWlVGQlpUdEpRVU51UXl4clFrRkJhMEk3U1VGRGJFSXNUMEZCVHp0RFFVTlNMRU5CUVVNaWZRPT0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgSHR0cE1ldGhvZDtcclxuKGZ1bmN0aW9uIChIdHRwTWV0aG9kKSB7XHJcbiAgICBIdHRwTWV0aG9kW1wiQ09OTkVDVFwiXSA9IFwiQ09OTkVDVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIkRFTEVURVwiXSA9IFwiREVMRVRFXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiR0VUXCJdID0gXCJHRVRcIjtcclxuICAgIEh0dHBNZXRob2RbXCJIRUFEXCJdID0gXCJIRUFEXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiT1BUSU9OU1wiXSA9IFwiT1BUSU9OU1wiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlBBVENIXCJdID0gXCJQQVRDSFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlBPU1RcIl0gPSBcIlBPU1RcIjtcclxuICAgIEh0dHBNZXRob2RbXCJQVVRcIl0gPSBcIlBVVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlRSQUNFXCJdID0gXCJUUkFDRVwiO1xyXG59KShIdHRwTWV0aG9kIHx8IChIdHRwTWV0aG9kID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXRaWFJvYjJRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12YUhSMGNDMXRaWFJvYjJRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVWSUxFMUJRVTBzUTBGQlRpeEpRVUZaTEZWQlZWZzdRVUZXUkN4WFFVRlpMRlZCUVZVN1NVRkRjRUlzYVVOQlFXMUNMRU5CUVVFN1NVRkRia0lzSzBKQlFXbENMRU5CUVVFN1NVRkRha0lzZVVKQlFWY3NRMEZCUVR0SlFVTllMREpDUVVGaExFTkJRVUU3U1VGRFlpeHBRMEZCYlVJc1EwRkJRVHRKUVVOdVFpdzJRa0ZCWlN4RFFVRkJPMGxCUTJZc01rSkJRV0VzUTBGQlFUdEpRVU5pTEhsQ1FVRlhMRU5CUVVFN1NVRkRXQ3cyUWtGQlpTeERRVUZCTzBGQlEycENMRU5CUVVNc1JVRldWeXhWUVVGVkxFdEJRVllzVlVGQlZTeFJRVlZ5UWlKOSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IHZhciBIdHRwUmVzcG9uc2VUeXBlO1xyXG4oZnVuY3Rpb24gKEh0dHBSZXNwb25zZVR5cGUpIHtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJURVhUXCJdID0gXCJ0ZXh0XCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiQVJSQVlCVUZGRVJcIl0gPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiQkxPQlwiXSA9IFwiYmxvYlwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkRPQ1VNRU5UXCJdID0gXCJkb2N1bWVudFwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkpTT05cIl0gPSBcImpzb25cIjtcclxufSkoSHR0cFJlc3BvbnNlVHlwZSB8fCAoSHR0cFJlc3BvbnNlVHlwZSA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF5WlhOd2IyNXpaUzEwZVhCbExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJoMGRIQXRjbVZ6Y0c5dWMyVXRkSGx3WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUlVnc1RVRkJUU3hEUVVGT0xFbEJRVmtzWjBKQlRWZzdRVUZPUkN4WFFVRlpMR2RDUVVGblFqdEpRVU14UWl4cFEwRkJZU3hEUVVGQk8wbEJRMklzSzBOQlFUSkNMRU5CUVVFN1NVRkRNMElzYVVOQlFXRXNRMEZCUVR0SlFVTmlMSGxEUVVGeFFpeERRVUZCTzBsQlEzSkNMR2xEUVVGaExFTkJRVUU3UVVGRFppeERRVUZETEVWQlRsY3NaMEpCUVdkQ0xFdEJRV2hDTEdkQ1FVRm5RaXhSUVUwelFpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgSHR0cFByb3RvY29sO1xyXG4oZnVuY3Rpb24gKEh0dHBQcm90b2NvbCkge1xyXG4gICAgSHR0cFByb3RvY29sW1wiSFRUUFwiXSA9IFwiaHR0cFwiO1xyXG4gICAgSHR0cFByb3RvY29sW1wiSFRUUFNcIl0gPSBcImh0dHBzXCI7XHJcbiAgICBIdHRwUHJvdG9jb2xbXCJGSUxFXCJdID0gXCJmaWxlXCI7XHJcbn0pKEh0dHBQcm90b2NvbCB8fCAoSHR0cFByb3RvY29sID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXdjbTkwYjJOdmJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5b2RIUndMWEJ5YjNSdlkyOXNMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdPMGRCU1VjN1FVRkhTQ3hOUVVGTkxFTkJRVTRzU1VGQldTeFpRVWxZTzBGQlNrUXNWMEZCV1N4WlFVRlpPMGxCUTNSQ0xEWkNRVUZoTEVOQlFVRTdTVUZEWWl3clFrRkJaU3hEUVVGQk8wbEJRMllzTmtKQlFXRXNRMEZCUVR0QlFVTm1MRU5CUVVNc1JVRktWeXhaUVVGWkxFdEJRVm9zV1VGQldTeFJRVWwyUWlKOSIsImV4cG9ydCBjbGFzcyBIdHRwUHJvbWlzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihfaHR0cCkge1xyXG4gICAgICAgIHRoaXMuaHR0cE9iamVjdCA9IF9odHRwO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNyZWF0ZVByb21pc2UoaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChwcm9taXNlUmVzb2x2ZXIsIHByb21pc2VSZWplY3RvcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBfcmVzb2x2ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlUmVzb2x2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhhbmRsZXIoX3Jlc29sdmUsIHByb21pc2VSZWplY3Rvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpc1Jlc29sdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdCAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBodHRwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBPYmplY3Q7XHJcbiAgICB9XHJcbiAgICBhZnRlclJlc3VsdChjb250ZXh0VGhlbikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1Byb21pc2UodGhpcy5wcm9taXNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb21pc2UudGhlbihyZXNvbHZlZFJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0VGhlbih0aGlzLmh0dHBPYmplY3QsIHJlc29sdmVkUmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhlbih3aGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSh0aGlzLnByb21pc2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQodGhpcy5wcm9taXNlLnRoZW4od2hlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNhdGNoKHdoZW4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNQcm9taXNlKHRoaXMucHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCh0aGlzLnByb21pc2UuY2F0Y2god2hlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhhc1Byb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgbmV4dChfcHJvbWlzZSkge1xyXG4gICAgICAgIGxldCBfbmV4dCA9IG5ldyBIdHRwUHJvbWlzZSh0aGlzLmh0dHBPYmplY3QpO1xyXG4gICAgICAgIF9uZXh0LnByb21pc2UgPSBfcHJvbWlzZTtcclxuICAgICAgICByZXR1cm4gX25leHQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXdjbTl0YVhObExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJoMGRIQXRjSEp2YldselpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZIUVN4TlFVRk5MRTlCUVU4c1YwRkJWenRKUVhWQ2RFSXNXVUZCV1N4TFFVRlhPMUZCUTNKQ0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTNoQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NVMEZCVXl4RFFVRkRPMGxCUXpOQ0xFTkJRVU03U1VGeVFrUXNZVUZCWVN4RFFVTllMRTlCUjFNN1VVRkZWQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVVjRRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkxMRU5CUVVNc1pVRkJaU3hGUVVGRkxHVkJRV1VzUlVGQlJTeEZRVUZGTzFsQlEyeEZMRWxCUVVrc1NVRkJTU3hIUVVGdFFpeEpRVUZKTEVOQlFVTTdXVUZEYUVNc1NVRkJTU3hSUVVGUkxFZEJRVWNzVlVGQlV5eEpRVUZOTzJkQ1FVTTFRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXp0blFrRkRia0lzWlVGQlpTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNoQ0xFTkJRVU1zUTBGQlF6dFpRVU5HTEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1pVRkJaU3hEUVVGRExFTkJRVUU3VVVGRGNFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJUMFFzVlVGQlZUdFJRVU5TTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTFCUVUwc1NVRkJTU3hUUVVGVExFTkJRVU03U1VGRGJFTXNRMEZCUXp0SlFVVkVMRWxCUVVrN1VVRkRSaXhQUVVGUExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdTVUZEZWtJc1EwRkJRenRKUVVWRUxGZEJRVmNzUTBGRFZDeFhRVUU0UkR0UlFVVTVSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRMnBETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eEZRVUZGTzJkQ1FVTnFReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4alFVRmpMRU5CUVVNc1EwRkJRenRaUVVNdlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNTVUZCU1N4RFFVRkRMRWxCUVhWRE8xRkJRekZETEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEYWtNc1QwRkJUeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZGTEVOQlFVTTdVMEZETlVNN1VVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4TFFVRkxMRU5CUVVVc1NVRkJNa0k3VVVGRGFFTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0WlFVTnFReXhQUVVGUExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTTFRenRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRlZCUVZVc1EwRkJReXhQUVVGblF6dFJRVU42UXl4UFFVRnZRaXhKUVVGSkxFTkJRVU1zVDBGQlVTeFpRVUZaTEU5QlFVOHNRMEZCUXp0SlFVTjJSQ3hEUVVGRE8wbEJSVThzU1VGQlNTeERRVUZETEZGQlFUSkNPMUZCUTNSRExFbEJRVWtzUzBGQlN5eEhRVUZITEVsQlFVa3NWMEZCVnl4RFFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFJRVU5vUkN4TFFVRkxMRU5CUVVNc1QwRkJUeXhIUVVGbExGRkJRVkVzUTBGQlF6dFJRVU55UXl4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVObUxFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IEh0dHBNZXRob2QgfSBmcm9tIFwiLi9odHRwLW1ldGhvZFwiO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VUeXBlIH0gZnJvbSBcIi4vaHR0cC1yZXNwb25zZS10eXBlXCI7XHJcbmltcG9ydCB7IEh0dHBQcm90b2NvbCB9IGZyb20gXCIuL2h0dHAtcHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgSHR0cFByb21pc2UgfSBmcm9tICcuL2h0dHAtcHJvbWlzZSc7XHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBIdHRwUHJvdG9jb2wuSFRUUDtcclxuICAgICAgICB0aGlzLnBvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnBhdGggPSAnJztcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IEh0dHBNZXRob2QuR0VUO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnVwbG9hZERhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSBIdHRwUmVzcG9uc2VUeXBlLlRFWFQ7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0TVMgPSAxMDAwO1xyXG4gICAgfVxyXG4gICAgaG9zdChwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQpIHtcclxuICAgICAgICB0aGlzLmhvc3RuYW1lID0gaG9zdG5hbWU7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcclxuICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBoZWFkZXIobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3RlZERhdGEodHlwZSkge1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gdHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRpbWVvdXRBdChkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMudGltZW91dE1TID0gZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjb250ZXh0KHRhc2spIHtcclxuICAgICAgICBsZXQgX2NvbnRleHQgPSBuZXcgSHR0cCgpO1xyXG4gICAgICAgIF9jb250ZXh0LnByb3RvY29sID0gdGhpcy5wcm90b2NvbDtcclxuICAgICAgICBfY29udGV4dC5wb3J0ID0gdGhpcy5wb3J0O1xyXG4gICAgICAgIF9jb250ZXh0Lmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZTtcclxuICAgICAgICBfY29udGV4dC5yZXF1ZXN0SGVhZGVycyA9IG5ldyBBcnJheSgpLmNvbmNhdCh0aGlzLnJlcXVlc3RIZWFkZXJzKTtcclxuICAgICAgICBfY29udGV4dC5wYXRoID0gdGhpcy5wYXRoO1xyXG4gICAgICAgIF9jb250ZXh0Lm1ldGhvZCA9IHRoaXMubWV0aG9kO1xyXG4gICAgICAgIF9jb250ZXh0LmJvZHkgPSB0aGlzLmJvZHk7XHJcbiAgICAgICAgX2NvbnRleHQudXBsb2FkRGF0YSA9IHRoaXMudXBsb2FkRGF0YTtcclxuICAgICAgICBfY29udGV4dC5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcclxuICAgICAgICB0YXNrKF9jb250ZXh0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNhbGwobWV0aG9kLCBwYXRoLCBib2R5KSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAodHlwZW9mIChib2R5KSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN5bmNQb3J0QW5kUHJvdG9jb2woKTtcclxuICAgICAgICBsZXQgcG9ydFN0cmluZyA9ICghIXRoaXMucG9ydCkgPyBgOiR7dGhpcy5wb3J0fWAgOiBgYDtcclxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5wcm90b2NvbH06Ly8ke3RoaXMuaG9zdG5hbWV9JHtwb3J0U3RyaW5nfSR7cGF0aH1gO1xyXG4gICAgICAgIGxldCB4aHIgPSB0aGlzLmNyZWF0ZVJlcXVlc3RUbyh1cmwpO1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5zZXRIYW5kbGVycyh4aHIpO1xyXG4gICAgICAgIHRoaXMuYWRkQW55SGVhZGVycyh4aHIpO1xyXG4gICAgICAgIHhoci5zZW5kKHRoaXMuYm9keSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBzeW5jUG9ydEFuZFByb3RvY29sKCkge1xyXG4gICAgICAgIGlmICgodGhpcy5wcm90b2NvbCA9PSBIdHRwUHJvdG9jb2wuSFRUUCAmJiB0aGlzLnBvcnQgPT0gODApXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3RvY29sID09IEh0dHBQcm90b2NvbC5IVFRQUyAmJiB0aGlzLnBvcnQgPT0gNDQzKVxyXG4gICAgICAgICAgICB8fCB0aGlzLnByb3RvY29sID09IEh0dHBQcm90b2NvbC5GSUxFKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjcmVhdGVSZXF1ZXN0VG8odXJsKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy50aW1lb3V0TVM7XHJcbiAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHhocjtcclxuICAgIH1cclxuICAgIHNldEVycm9ySGFuZGxlcnMoeGhyLCByZWplY3QpIHtcclxuICAgICAgICB4aHIub25hYm9ydCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KCdSZXF1ZXN0IEFib3J0ZWQnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnVGltZWQgb3V0Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBvY2N1cnJlZC4nKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUmVzcG9uc2VPYmplY3QoeGhyKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB4aHJcclxuICAgICAgICAgICAgLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KCdcXHJcXG4nKVxyXG4gICAgICAgICAgICAubWFwKGhlYWRlcl9saW5lID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcnRzID0gaGVhZGVyX2xpbmUuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzICYmIHBhcnRzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBwYXJ0c1swXSwgdmFsdWU6IHBhcnRzWzFdIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gIT0gdW5kZWZpbmVkKTtcclxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGhkciBpbiBoZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIGxldCBhX2hlYWRlciA9IGhlYWRlcnNbaGRyXTtcclxuICAgICAgICAgICAgaWYgKGFfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW2FfaGVhZGVyLm5hbWVdID0gYV9oZWFkZXIudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXHJcbiAgICAgICAgICAgIHR5cGU6IHhoci5yZXNwb25zZVR5cGUsXHJcbiAgICAgICAgICAgIGJvZHk6IHhoci5yZXNwb25zZSxcclxuICAgICAgICAgICAgaGVhZGVyczogY29sbGVjdGlvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgc2V0T25Db21wbGV0ZUhhbmRsZXIoeGhyLCByZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNyZWF0ZVJlc3BvbnNlT2JqZWN0KHhocikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBSZXR1cm5lZCBIVFRQICR7eGhyLnN0YXR1c31gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBhZGRBbnlIZWFkZXJzKHhocikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RIZWFkZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaGVhZGVyIG9mIHRoaXMucmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlci5uYW1lLCBoZWFkZXIudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0SGFuZGxlcnMoeGhyKSB7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgSHR0cFByb21pc2UodGhpcyk7XHJcbiAgICAgICAgcHJvbWlzZS5jcmVhdGVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFcnJvckhhbmRsZXJzKHhociwgcmVqZWN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRPbkNvbXBsZXRlSGFuZGxlcih4aHIsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5b2RIUndMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdPMGRCU1VjN1FVRkpTQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUXpORExFOUJRVThzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxITkNRVUZ6UWl4RFFVRkRPMEZCUTNoRUxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVVXNUVUZCVFN4cFFrRkJhVUlzUTBGQlF6dEJRVVV2UXl4UFFVRlBMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzWjBKQlFXZENMRU5CUVVNN1FVRkZOME1zVFVGQlRTeFBRVUZQTEVsQlFVazdTVUZaWmp0UlFVTkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTnNReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTjBRaXhKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTm1MRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTTNRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTjBRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTTFRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU14UXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUlVRc1NVRkJTU3hEUVVGRExGRkJRWE5DTEVWQlFVVXNVVUZCWjBJc1JVRkJSU3hKUVVGaE8xRkJRekZFTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1VVRkJVU3hEUVVGRE8xRkJRM3BDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMnBDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1VVRkJVU3hEUVVGRE8xRkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFMUJRVTBzUTBGQlF5eEpRVUZYTEVWQlFVVXNTMEZCWVR0UlFVTXZRaXhKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRja1FzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1dVRkJXU3hEUVVGRExFbEJRWE5DTzFGQlEycERMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEZOQlFWTXNRMEZCUXl4UlFVRm5RanRSUVVONFFpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRkZCUVZFc1EwRkJRenRSUVVNeFFpeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hQUVVGUExFTkJRVVVzU1VGQk5rSTdVVUZEY0VNc1NVRkJTU3hSUVVGUkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTXhRaXhSUVVGUkxFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNN1VVRkRiRU1zVVVGQlVTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8xRkJRekZDTEZGQlFWRXNRMEZCUXl4UlFVRlJMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU5zUXl4UlFVRlJMRU5CUVVNc1kwRkJZeXhIUVVGSExFbEJRVWtzUzBGQlN5eEZRVUZqTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dFJRVU01UlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdVVUZETVVJc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRPMUZCUXpsQ0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVNeFFpeFJRVUZSTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03VVVGRGRFTXNVVUZCVVN4RFFVRkRMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETzFGQlF6RkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVU5tTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFbEJRVWtzUTBGQlF5eE5RVUZyUWl4RlFVRkZMRWxCUVZrc1JVRkJSU3hKUVVGVk8xRkJReTlETEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRE8xRkJRM0pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMnBDTEVsQlFVa3NUMEZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExGRkJRVkVzUlVGQlJUdFpRVU0zUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dFRRVU5zUWp0aFFVRk5PMWxCUTB3c1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xTkJRMnhETzFGQlJVUXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTTdVVUZETTBJc1NVRkJTU3hWUVVGVkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVVXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZCTzFGQlEzUkVMRWxCUVVrc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNUVUZCVFN4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVVndSU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRM0JETEVsQlFVa3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZEY0VNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTjRRaXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOd1FpeFBRVUZQTEU5QlFVOHNRMEZCUXp0SlFVTnFRaXhEUVVGRE8wbEJSVThzYlVKQlFXMUNPMUZCUTNwQ0xFbEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4SlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NTVUZCU1N4RlFVRkZMRU5CUVVNN1pVRkRka1FzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4SlFVRkpMRmxCUVZrc1EwRkJReXhMUVVGTExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNN1pVRkRla1FzU1VGQlNTeERRVUZETEZGQlFWRXNTVUZCU1N4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGSE8xbEJRM2hETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1UwRkJVeXhEUVVGRE8xTkJRM1pDTzBsQlEwZ3NRMEZCUXp0SlFVVlBMR1ZCUVdVc1EwRkJReXhIUVVGWE8xRkJRMnBETEVsQlFVa3NSMEZCUnl4SFFVRkhMRWxCUVVrc1kwRkJZeXhGUVVGRkxFTkJRVU03VVVGREwwSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlF6ZENMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNelFpeFBRVUZQTEVkQlFVY3NRMEZCUXp0SlFVTmlMRU5CUVVNN1NVRkZUeXhuUWtGQlowSXNRMEZCUXl4SFFVRnRRaXhGUVVGRkxFMUJRWFZDTzFGQlEyNUZMRWRCUVVjc1EwRkJReXhQUVVGUExFZEJRVWNzUjBGQlJ5eEZRVUZGTzFsQlEycENMRTFCUVUwc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMUZCUXpWQ0xFTkJRVU1zUTBGQlF6dFJRVU5HTEVkQlFVY3NRMEZCUXl4VFFVRlRMRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRMjVDTEUxQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRSUVVOMFFpeERRVUZETEVOQlFVTTdVVUZEUml4SFFVRkhMRU5CUVVNc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4TlFVRk5MRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXp0UlFVTTFRaXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVOHNiMEpCUVc5Q0xFTkJRVU1zUjBGQmJVSTdVVUZET1VNc1NVRkJTU3hQUVVGUExFZEJRVWNzUjBGQlJ6dGhRVU5rTEhGQ1FVRnhRaXhGUVVGRkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXp0aFFVTnlReXhIUVVGSExFTkJRVVVzVjBGQlZ5eERRVUZETEVWQlFVVTdXVUZEYkVJc1NVRkJTU3hMUVVGTExFZEJRVWNzVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVF5eEpRVUZKTEV0QlFVc3NTVUZCU1N4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFTkJRVU1zUlVGQlJUdG5Ra0ZET1VJc1QwRkJiVUlzUlVGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVNc1EwRkJRenRoUVVOMFJEdHBRa0ZCVFR0blFrRkRUQ3hQUVVGUExGTkJRVk1zUTBGQlF6dGhRVU5zUWp0UlFVTklMRU5CUVVNc1EwRkJRenRoUVVORUxFMUJRVTBzUTBGQlJTeEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1NVRkJTU3hUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU4wUXl4SlFVRkpMRlZCUVZVc1IwRkJLMElzUlVGQlJTeERRVUZETzFGQlEyaEVMRXRCUVVrc1NVRkJTU3hIUVVGSExFbEJRVWtzVDBGQlR5eEZRVUZGTzFsQlEzUkNMRWxCUVVrc1VVRkJVU3hIUVVGSExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTFRaXhKUVVGSkxGRkJRVkVzUlVGQlJUdG5Ra0ZEV2l4VlFVRlZMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNN1lVRkROVU03VTBGRFJqdFJRVVZFTEVsQlFVa3NVVUZCVVN4SFFVRnJRanRaUVVNMVFpeE5RVUZOTEVWQlFVVXNSMEZCUnl4RFFVRkRMRTFCUVUwN1dVRkRiRUlzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4WlFVRlpPMWxCUTNSQ0xFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNVVUZCVVR0WlFVTnNRaXhQUVVGUExFVkJRVVVzVlVGQlZUdFRRVU53UWl4RFFVRkRPMUZCUTBZc1QwRkJUeXhSUVVGUkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFVVlBMRzlDUVVGdlFpeERRVU14UWl4SFFVRnRRaXhGUVVOdVFpeFBRVUYzUXl4RlFVTjRReXhOUVVFMFFqdFJRVVUxUWl4SFFVRkhMRU5CUVVNc2EwSkJRV3RDTEVkQlFVY3NSMEZCUnl4RlFVRkZPMWxCUXpWQ0xFbEJRVWtzUjBGQlJ5eERRVUZETEZWQlFWVXNTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJRM1pDTEVsQlFVa3NSMEZCUnl4RFFVRkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFVkJRVVU3YjBKQlEzSkNMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dHBRa0ZEZWtNN2NVSkJRVTA3YjBKQlEwd3NUVUZCVFN4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1EwRkJRenRwUWtGRGRrTTdZVUZEUmp0UlFVTklMRU5CUVVNc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlR5eGhRVUZoTEVOQlFVTXNSMEZCYlVJN1VVRkRka01zU1VGQlNTeEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVU3V1VGRGJFTXNTMEZCU1N4SlFVRkpMRTFCUVUwc1NVRkJTU3hKUVVGSkxFTkJRVU1zWTBGQll5eEZRVUZGTzJkQ1FVTnlReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1lVRkRha1E3VTBGRFJqdEpRVU5JTEVOQlFVTTdTVUZGVHl4WFFVRlhMRU5CUVVNc1IwRkJiVUk3VVVGRGNrTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1NVRkJTU3hYUVVGWExFTkJRV1VzU1VGQlNTeERRVUZETEVOQlFVRTdVVUZEYWtRc1QwRkJUeXhEUVVGRExHRkJRV0VzUTBGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1JVRkJSVHRaUVVONlF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUjBGQlJ5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMWxCUTI1RExFbEJRVWtzUTBGQlF5eHZRa0ZCYjBJc1EwRkJReXhIUVVGSExFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTJ4RUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4UFFVRlBMRU5CUVVNN1NVRkRha0lzUTBGQlF6dERRVU5HSW4wPSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHsgcHJvdmlkZXNBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBEb21FbGVtZW50IH0gZnJvbSAnLi9kb20tZWxlbWVudCc7XHJcbmltcG9ydCB7IE5vbkVsZW1lbnQgfSBmcm9tICcuL25vbi1lbGVtZW50JztcclxuaW1wb3J0IHsgRVZFTlRfTElTVCwgVGFnIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5leHBvcnQgeyBIdHRwIH0gZnJvbSAnLi9odHRwJztcclxuZXhwb3J0IHsgSHR0cE1ldGhvZCB9IGZyb20gXCIuL2h0dHAtbWV0aG9kXCI7XHJcbmV4cG9ydCB7IEh0dHBSZXNwb25zZVR5cGUgfSBmcm9tIFwiLi9odHRwLXJlc3BvbnNlLXR5cGVcIjtcclxuZXhwb3J0IHsgSHR0cFByb3RvY29sIH0gZnJvbSBcIi4vaHR0cC1wcm90b2NvbFwiO1xyXG5leHBvcnQgY29uc3QgRXZlbnRzID0gRVZFTlRfTElTVDtcclxuY2xhc3MgRE9NIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG4gICAgZmluZEVsZW1lbnQoYXJnKSB7XHJcbiAgICAgICAgbGV0IGlkID0gYXJnWydpZCddO1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRFbGVtZW50RnJvbUlkKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGVjdG9yID0gYXJnWydzZWxlY3RvciddO1xyXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGFyZykge1xyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGFyZ1snc2VsZWN0b3InXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBfY2xhc3MgPSBhcmdbJ2NsYXNzJ107XHJcbiAgICAgICAgaWYgKF9jbGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5nZXRMaXN0RnJvbUNsYXNzKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YWdOYW1lID0gYXJnWyd0YWdOYW1lJ107XHJcbiAgICAgICAgaWYgKHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21UYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBidXR0b25PbihldmVudEluZm8pIHtcclxuICAgICAgICBpZiAocHJvdmlkZXNBbGwoWydpZCcsICdldmVudCcsICdoYW5kbGVyJ10sIGV2ZW50SW5mbykpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gZXZlbnRJbmZvLmlkO1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gdGhpcy5maW5kRWxlbWVudCh7IGlkOiBpZCB9KS5leHBlY3QoVGFnLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbihldmVudEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gRG9jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBET00oKTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2labXgxYVdRdFpHOXRMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyWnNkV2xrTFdSdmJTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN096dEhRVWxITzBGQlIwZ3NUMEZCVHl4RlFVRmxMRmRCUVZjc1JVRkJSU3hOUVVGTkxGRkJRVkVzUTBGQlFUdEJRVU5xUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZCTzBGQlRURkRMRTlCUVU4c1JVRkJSU3hWUVVGVkxFVkJRVVVzVFVGQlRTeGxRVUZsTEVOQlFVTTdRVUZOTTBNc1QwRkJUeXhGUVVGRkxGVkJRVlVzUlVGQlJTeEhRVUZITEVWQlFVVXNUVUZCVFN4aFFVRmhMRU5CUVVNN1FVRkZPVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4TlFVRk5MRkZCUVZFc1EwRkJRenRCUVVNNVFpeFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGRE8wRkJRek5ETEU5QlFVOHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeE5RVUZOTEhOQ1FVRnpRaXhEUVVGRE8wRkJRM2hFTEU5QlFVOHNSVUZCUlN4WlFVRlpMRVZCUVVVc1RVRkJUU3hwUWtGQmFVSXNRMEZCUXp0QlFVY3ZReXhOUVVGTkxFTkJRVU1zVFVGQlRTeE5RVUZOTEVkQlFVY3NWVUZCVlN4RFFVRkRPMEZCUjJwRExFMUJRVTBzUjBGQlJ6dEpRVVZRTzBsQlEwRXNRMEZCUXp0SlFVVkVMRmRCUVZjc1EwRkJReXhIUVVGclFqdFJRVU0xUWl4SlFVRkpMRVZCUVVVc1IwRkJSeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYmtJc1NVRkJTU3hGUVVGRkxFVkJRVVU3V1VGRFRpeFBRVUZQTEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0VFFVTjRRenRSUVVWRUxFbEJRVWtzVVVGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNdlFpeEpRVUZKTEZGQlFWRXNSVUZCUlR0WlFVTmFMRTlCUVZFc1ZVRkJWU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xTkJRM0pFTzFGQlEwUXNUMEZCVHl4SlFVRkpMRlZCUVZVc1JVRkJSU3hEUVVGRE8wbEJRekZDTEVOQlFVTTdTVUZGUkN4UFFVRlBMRU5CUVVNc1IwRkJjMEk3VVVGRE5VSXNTVUZCU1N4UlFVRlJMRWRCUVVjc1IwRkJSeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlF5OUNMRWxCUVVjc1VVRkJVU3hGUVVGRk8xbEJRMWdzVDBGQlR5eFZRVUZWTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVMEZEYWtRN1VVRkZSQ3hKUVVGSkxFMUJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNVUlzU1VGQlNTeE5RVUZOTEVWQlFVVTdXVUZEVml4UFFVRlBMRlZCUVZVc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVNMVF6dFJRVVZFTEVsQlFVa3NUMEZCVHl4SFFVRkhMRWRCUVVjc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU0zUWl4SlFVRkpMRTlCUVU4c1JVRkJSVHRaUVVOWUxFOUJRVThzVlVGQlZTeERRVUZETEd0Q1FVRnJRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFOQlF5OURPMUZCUlVRc1QwRkJUeXhGUVVGRkxFTkJRVU03U1VGRFdpeERRVUZETzBsQlJVUXNVVUZCVVN4RFFVRkRMRk5CUVRKQ08xRkJRMnhETEVsQlFVa3NWMEZCVnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFRRVUZUTEVOQlFVTXNSVUZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSVHRaUVVOeVJDeEpRVUZKTEVWQlFVVXNSMEZCUnl4VFFVRlRMRU5CUVVNc1JVRkJSU3hEUVVGQk8xbEJRM0pDTEVsQlFVa3NUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUlVGQlF5eEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkJPMWxCUXpGRUxFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVFN1UwRkRja0k3U1VGRFNDeERRVUZETzBOQlJVWTdRVUZGUkN4TlFVRk5MRlZCUVZVc1IwRkJSenRKUVVOcVFpeFBRVUZQTEVsQlFVa3NSMEZCUnl4RlFVRkZMRU5CUVVNN1FVRkRia0lzUTBGQlF5SjkiXSwibmFtZXMiOlsiSHR0cE1ldGhvZCIsIkh0dHBSZXNwb25zZVR5cGUiLCJIdHRwUHJvdG9jb2wiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7QUFLQSxBQUFPLFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDcEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLEtBQUssSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUM3RDtLQUNKO0lBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxPQUFPLElBQUksQ0FBQztDQUNmOztBQ2xCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQUFBTyxNQUFNLE1BQU0sQ0FBQztJQUNoQixXQUFXLENBQUMsTUFBTSxFQUFFO1FBQ2hCLElBQUks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

