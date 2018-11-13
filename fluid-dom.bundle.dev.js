//  Fluid-DOM v 1.2.0
var fluid = (function (exports) {
    'use strict';

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

    return exports;

}({}));

