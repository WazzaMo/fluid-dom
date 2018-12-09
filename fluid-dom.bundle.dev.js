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

    return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1aWQtZG9tLmJ1bmRsZS5kZXYuanMiLCJzb3VyY2VzIjpbImpzL3NyYy91dGlsLmpzIiwianMvc3JjL29wdGlvbi5qcyIsImpzL3NyYy9kb20tYXR0cmlidXRlcy5qcyIsImpzL3NyYy9kb20tY2xhc3Nlcy5qcyIsImpzL3NyYy9ub24tY2xhc3Nlcy5qcyIsImpzL3NyYy9ub24tYXR0cmlidXRlcy5qcyIsImpzL3NyYy9ub24tZWxlbWVudC5qcyIsImpzL3NyYy9kb20tZWxlbWVudC5qcyIsImpzL3NyYy9jb25zdGFudHMuanMiLCJqcy9zcmMvaHR0cC1tZXRob2QuanMiLCJqcy9zcmMvaHR0cC1yZXNwb25zZS10eXBlLmpzIiwianMvc3JjL2h0dHAtcHJvdG9jb2wuanMiLCJqcy9zcmMvaHR0cC1wcm9taXNlLmpzIiwianMvc3JjL2h0dHAuanMiLCJqcy9zcmMvZmx1aWQtZG9tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVzQWxsKGxpc3QsIGFyZ3MpIHtcclxuICAgIHZhciBtZXNzYWdlID0gJyc7XHJcbiAgICBmb3IgKHZhciBleHBlY3RlZEFyZyBvZiBsaXN0KSB7XHJcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gYXJnc1tleHBlY3RlZEFyZ10gIT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICghaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgbWVzc2FnZSArPSBgVmFsdWUgZm9yICR7ZXhwZWN0ZWRBcmd9IHdhcyBub3QgcHJvdmlkZWQuXFxuYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoISFtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXhwZWN0ZWQgJHtsaXN0Lmxlbmd0aH0gcGFyYW1ldGVyczpcXG4ke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVzT25lKGxpc3QsIGFyZ3MpIHtcclxuICAgIHZhciBkZWZpbml0aW9uTWlzc2luZyA9IGxpc3QuZmlsdGVyKHdvcmQgPT4gYXJnc1t3b3JkXSA9PT0gdW5kZWZpbmVkKTtcclxuICAgIHZhciBpc09uZU1hdGNoZWQgPSBkZWZpbml0aW9uTWlzc2luZy5sZW5ndGggPT09IChsaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKGlzT25lTWF0Y2hlZCkge1xyXG4gICAgICAgIHZhciBhcmd1bWVudE5hbWVzID0gbGlzdC5yZWR1Y2UoKGFyZzEsIGFyZzIpID0+IGAke2FyZzF9LCAke2FyZzJ9YCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgT25lIG9mIHRoZXNlIHBhcmFtZXRlcnMgd2VyZSBleHBlY3RlZCAke2FyZ3VtZW50TmFtZXN9IGJ1dCBub25lIGhhZCBhIGhhc1ZhbHVlIWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzT25lTWF0Y2hlZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbG9nV2FybmluZyhtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJGbHVpZERPTTogXCIgKyBtZXNzYWdlKTtcclxufVxyXG4vKipcclxuICogVGFrZXMgYW55IHR3byBhcnJheXMgYW5kIGNyZWF0ZXMgYSBuZXdcclxuICogbWVyZ2VkIGFycmF5LiBEb2VzIG5vdCBkZS1kdXBsaWNhdGUuXHJcbiAqIEBwYXJhbSBhMSAtIGZpcnN0IGFycmF5IHRvIG1lcmdlXHJcbiAqIEBwYXJhbSBhMiAtIHNlY29uZCBhcnJheSB0byBtZXJnZVxyXG4gKiBAcmV0dXJucyAtIG5ldyBhcnJheSB3aXRoIG1lcmdlZCBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlX2FycmF5KGExLCBhMikge1xyXG4gICAgbGV0IGZpbmFsID0gW107XHJcbiAgICBmaW5hbCA9IGZpbmFsLmNvbmNhdChhMSk7XHJcbiAgICBmaW5hbCA9IGZpbmFsLmNvbmNhdChhMik7XHJcbiAgICByZXR1cm4gZmluYWw7XHJcbn1cclxuLyoqXHJcbiAqIFRha2VzIGFuIGFycmF5IHJlZmVyZW5jZSBhbmQgZW1wdGllcyBhbGxcclxuICogY29udGVudCBmcm9tIHRoYXQgYXJyYXkuIENhbiBiZSB1c2VkIHRvXHJcbiAqIGVtcHR5IGFuIGFycmF5IHJlZmVyZW5jZSBoZWxkIGJ5IGFub3RoZXIgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB0byBlbXB0eSBvdXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlfYXJyYXkoYXJyYXkpIHtcclxuICAgIHdoaWxlICghIWFycmF5ICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhcnJheS5wb3AoKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogTG9va3MgZm9yIGR1cGxpY2F0ZSBvYmplY3QgcmVmZXJlbmNlcyBpbiBhblxyXG4gKiBhcnJheSBhbmQgcmV0dXJucyBhIG5ldyBhcnJheSB3aXRob3V0IHRoZVxyXG4gKiBkdXBsaWNhdGVzLiBOb3QgdmVyeSBlZmZpY2llbnRcclxuICogLSB0aGlzIGlzIE8obl4yKVxyXG4gKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB0byBleGFtaW5lLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZV9kdXBzKGFycmF5KSB7XHJcbiAgICBsZXQgZGVkdXAgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGRvZXNOb3RIYXZlUmVmRXF1YWxPYmplY3QoeCkge1xyXG4gICAgICAgIHJldHVybiBkZWR1cC5pbmRleE9mKHgpIDwgMDtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGFycmF5W2luZGV4XTtcclxuICAgICAgICBpZiAoZG9lc05vdEhhdmVSZWZFcXVhbE9iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICBkZWR1cC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkZWR1cDtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWFJwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTkxZEdsc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN08wZEJTVWM3UVVGSFNDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzU1VGQlVUdEpRVU4yUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhGUVVGRkxFTkJRVUU3U1VGRGFFSXNTMEZCU1N4SlFVRkpMRmRCUVZjc1NVRkJTU3hKUVVGSkxFVkJRVVU3VVVGRE0wSXNTVUZCU1N4UlFVRlJMRWRCUVZrc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEZOQlFWTXNRMEZCUVR0UlFVTjBSQ3hKUVVGSkxFTkJRVVVzVVVGQlVTeEZRVUZGTzFsQlEyUXNUMEZCVHl4SlFVRkpMR0ZCUVdFc1YwRkJWeXh6UWtGQmMwSXNRMEZCUVR0VFFVTXhSRHRMUVVOR08wbEJRMFFzU1VGQlNTeERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZPMUZCUTJJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVsQlFVa3NRMEZCUXl4TlFVRk5MR2xDUVVGcFFpeFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkJPMUZCUTJoRkxFOUJRVThzUzBGQlN5eERRVUZCTzB0QlEySTdTVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRVHRCUVVOaUxFTkJRVU03UVVGRlJDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzU1VGQlV6dEpRVU40UkN4SlFVRkpMR2xDUVVGcFFpeEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVVc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1UwRkJVeXhEUVVGRkxFTkJRVUU3U1VGRGRrVXNTVUZCU1N4WlFVRlpMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVVXNRMEZCUVR0SlFVTnNSU3hKUVVGTExGbEJRVmtzUlVGQlJ6dFJRVU5zUWl4SlFVRkpMR0ZCUVdFc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZGTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRVHRSUVVOd1JTeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMSGxEUVVGNVF5eGhRVUZoTERKQ1FVRXlRaXhEUVVGRExFTkJRVUU3UzBGRGFrYzdTVUZEUkN4UFFVRlBMRmxCUVZrc1EwRkJRVHRCUVVOeVFpeERRVUZETzBGQlJVUXNUVUZCVFN4VlFVRlZMRlZCUVZVc1EwRkJReXhQUVVGbE8wbEJRM2hETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFOUJRVThzUTBGQlF5eERRVUZCTzBGQlEzUkRMRU5CUVVNN1FVRkZSRHM3T3pzN08wZEJUVWM3UVVGRFNDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkpMRVZCUVZrc1JVRkJSU3hGUVVGWk8wbEJRM1pFTEVsQlFVa3NTMEZCU3l4SFFVRmpMRVZCUVVVc1EwRkJRenRKUVVNeFFpeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU42UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjZRaXhQUVVGUExFdEJRVXNzUTBGQlF6dEJRVU5tTEVOQlFVTTdRVUZGUkRzN096czdSMEZMUnp0QlFVTklMRTFCUVUwc1ZVRkJWU3hYUVVGWExFTkJRVWtzUzBGQlpUdEpRVU0xUXl4UFFVRlBMRU5CUVVNc1EwRkJSU3hMUVVGTExFbEJRVWtzUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1VVRkRia01zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMHRCUTJJN1FVRkRTQ3hEUVVGRE8wRkJSVVE3T3pzN096dEhRVTFITzBGQlEwZ3NUVUZCVFN4VlFVRlZMRmRCUVZjc1EwRkRla0lzUzBGQlpUdEpRVVZtTEVsQlFVa3NTMEZCU3l4SFFVRmpMRVZCUVVVc1EwRkJRenRKUVVVeFFpeFRRVUZUTEhsQ1FVRjVRaXhEUVVGRExFTkJRVWM3VVVGRGNFTXNUMEZCVHl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVTTVRaXhEUVVGRE8wbEJSVVFzUzBGQlNTeEpRVUZKTEV0QlFVc3NSMEZCUnl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF5eE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVN1VVRkRhRVFzU1VGQlNTeEpRVUZKTEVkQlFVY3NTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NlVUpCUVhsQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdXVUZEYmtNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTnNRanRMUVVOR08wbEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdRVUZEWml4RFFVRkRJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiB1bmNlcnRhaW4gcmV0dXJuIHR5cGUuXHJcbiAqIEluIFR5cGVTY3JpcHQgaXQncyBwb3NzaWJsZSB0byByZXR1cm5cclxuICogYFR5cGUgfCB1bmRlZmluZWRgIGJ1dCBhdCBydW50aW1lIGl0IGNhblxyXG4gKiBnZXQgYSBiaXQgbWVzc3kgdG8gaGFuZGxlIHRoaXMgd2VsbC5cclxuICogVGhlIE9wdGlvbiBjbGFzcyByZXByZXNlbnRzIHRoaXMgY2xlYW5seVxyXG4gKiBhbmQgZXhwbGljaXRseSB3aGlsZSBtYWtpbmcgaXQgZWFzeVxyXG4gKiBkZXRlcm1pbmUgd2hldGhlciB0aGUgdmFsdWUgaXMgdmFsaWQgb3Igbm90XHJcbiAqIGFuZCwgaWYgdmFsaWQsIHByb3ZpZGVzIGVhc3kgd2F5cyB0byBnZXRcclxuICogdGhlIHZhbHVlIHdpdGggcHJvcGVyIHR5cGUgY29uc2lzdGVuY3kgaW5cclxuICogVHlwZVNjcmlwdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoX3ZhbHVlKSB7XHJcbiAgICAgICAgaWYgKF92YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGF0IHRoZXJlIGlzIGEgdmFsdWUgYmVmb3JlXHJcbiAgICAgKiBjYWxsaW5nIHRoaXMuXHJcbiAgICAgKiBAc2VlIGlzVmFsaWRcclxuICAgICAqL1xyXG4gICAgZ2V0IFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0cyBpZiB0aGUgdmFsdWUgaXMga25vd24uXHJcbiAgICAgKi9cclxuICAgIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYjNCMGFXOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyOXdkR2x2Ymk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUlVnN096czdPenM3T3pzN08wZEJWMGM3UVVGRFNDeE5RVUZOTEU5QlFVOHNUVUZCVFR0SlFVZHFRaXhaUVVGWkxFMUJRVmM3VVVGRGNrSXNTVUZCU1N4TlFVRk5MRVZCUVVVN1dVRkRWaXhKUVVGSkxFTkJRVU1zUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXp0VFFVTnlRanRoUVVGTk8xbEJRMHdzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNN1UwRkRia0k3U1VGRFNDeERRVUZETzBsQlJVZzdPenM3VDBGSlJ6dEpRVU5FTEVsQlFVa3NTMEZCU3p0UlFVTlFMRTlCUVZjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUlVnN08wOUJSVWM3U1VGRFJDeEpRVUZKTEU5QlFVODdVVUZEVkN4UFFVRlBMRU5CUVVNc1EwRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzBsQlEzWkNMRU5CUVVNN1EwRkRSaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5mdW5jdGlvbiBjYXN0KGF0dHIpIHtcclxuICAgIHJldHVybiBhdHRyO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBEb21BdHRyaWJ1dGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKF93ZWJFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudCA9IF93ZWJFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBvZiB0aGlzLl93ZWJFbGVtZW50LmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlTmFtZXMoKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBhdHRyIG9mIHRoaXMuX3dlYkVsZW1lbnQuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goYXR0ci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBhZGQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KG5hbWUpO1xyXG4gICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYkVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2ViRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSkgIT0gbnVsbDtcclxuICAgIH1cclxuICAgIHJlbW92ZShuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXRjBkSEpwWW5WMFpYTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdlpHOXRMV0YwZEhKcFluVjBaWE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVXRJTEZOQlFWTXNTVUZCU1N4RFFVRkZMRWxCUVcxQ08wbEJRMmhETEU5QlFXZERMRWxCUVVzc1EwRkJRenRCUVVONFF5eERRVUZETzBGQlJVUXNUVUZCVFN4UFFVRlBMR0ZCUVdFN1NVRkhlRUlzV1VGQldTeFhRVUZ2UWp0UlFVTTVRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEZkQlFWY3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEZGQlFUUkRPMUZCUTJ4RUxFdEJRVWtzU1VGQlNTeFRRVUZUTEVsQlFVa3NTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGRGFFUXNVVUZCVVN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUXpORE8xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1kwRkJZenRSUVVOYUxFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRlZMRU5CUVVFN1VVRkZPVUlzUzBGQlNTeEpRVUZKTEVsQlFVa3NTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGVkJRVlVzUlVGQlJUdFpRVU16UXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTjJRanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWkxFVkJRVVVzUzBGQllUdFJRVU0zUWl4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUXk5Q0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1N4RlFVRkZMRXRCUVdFN1VVRkROMElzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZCTzFGQlF6RkRMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJkVU03VVVGRGVFUXNTVUZCU1N4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVRTdVVUZEWml4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1R0UlFVTmtMRTlCUVU4c1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkROME1zUTBGQlF6dEpRVVZFTEVkQlFVY3NRMEZCUXl4SlFVRlpPMUZCUTJRc1QwRkJUeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU03U1VGRGNrUXNRMEZCUXp0SlFVVkVMRTFCUVUwc1EwRkJReXhKUVVGWk8xRkJRMnBDTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1pVRkJaU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkRMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dERRVU5HSW4wPSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqICMgRG9tQ2xhc3Nlc1xyXG4gKlxyXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUNsYXNzZXMgaW50ZXJmYWNlIHRoYXQgYWxsb3dzIG9wZXJhdGlvbnNcclxuICogdG8gYmUgcGVyZm9ybWVkIG9uIERPTSBvYmplY3RzIGluIGEgYnJvd3Nlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb21DbGFzc2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50LCBlbGVtZW50T2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudE9iamVjdDtcclxuICAgICAgICB0aGlzLmh0bWxFbGVtZW50ID0gX2VsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBmb3JFYWNoKHRhc2spIHtcclxuICAgICAgICBmb3IgKHZhciBfY2xhc3Mgb2YgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgdGFzayhfY2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhhcyhuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gaWYtYW5kLW9ubHktaWYgdGhlIG5hbWVkIGNsYXNzIGlzIG9uIHRoZSBlbGVtZW50LlxyXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSAoZmx1aWQpIGVsZW1lbnQgb2JqZWN0IHRvIGFsbG93IHRoaW5ncyB0b1xyXG4gICAgICogYmUgZG9uZSB3aXRoIGl0LiBSZXR1cm5zIHNlbGYuXHJcbiAgICAgKiBAcGFyYW0gbmFtZS0gSFRNTCBjbGFzcyBuYW1lIHRvIHNlZWtcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjay0gY2FsbGJhY2sgdG8gcnVuIHRvIG1hbmlwdWxhdGUgdGhlIGVsZW1lbnQgaWYgcHJlc2VudC5cclxuICAgICAqL1xyXG4gICAgd2hlbkhhcyhuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZChfY2xhc3MpIHtcclxuICAgICAgICBpZiAoISFfY2xhc3MgJiYgX2NsYXNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHRtbEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHRtbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChfY2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbid0IGVkaXQgY2xhc3NlcyBvbiBEb21FbGVtZW50IHRoYXQgcHJvdmlkZXMgbm8gSFRNTEVsZW1lbnQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENsYXNzIG5hbWUgZ2l2ZW4gd2FzIFwiJHtfY2xhc3N9XCIgLSBpdCBtdXN0IG5vdCBiZSBlbXB0eSFgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoX2NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKF9jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXQoX2NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhfY2xhc3MpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpHOXRMV05zWVhOelpYTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdlpHOXRMV05zWVhOelpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVMUlPenM3T3p0SFFVdEhPMEZCUTBnc1RVRkJUU3hQUVVGUExGVkJRVlU3U1VGSmNrSXNXVUZCV1N4UlFVRnBRaXhGUVVGRkxHRkJRWGxDTzFGQlEzUkVMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzWVVGQllTeERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzVVVGQlVTeERRVUZETzBsQlF6bENMRU5CUVVNN1NVRkZSQ3hQUVVGUExFTkJRVU1zU1VGQlowTTdVVUZEZEVNc1MwRkJTU3hKUVVGSkxFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1JVRkJSVHRaUVVNMVF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFN1UwRkRZanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWk8xRkJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEYmtRc1EwRkJRenRKUVVWSU96czdPenM3VDBGTlJ6dEpRVU5FTEU5QlFVOHNRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJiME03VVVGRGVFUXNTVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTzFsQlEyeENMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVMEZEZUVJN1VVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1RVRkJZenRSUVVOb1FpeEpRVUZKTEVOQlFVTXNRMEZCUlN4TlFVRk5MRWxCUVVrc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVTdXVUZEYkVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTzJkQ1FVTndRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03WVVGRGVFTTdhVUpCUVUwN1owSkJRMHdzVFVGQlRTeExRVUZMTEVOQlFVTXNaMFZCUVdkRkxFTkJRVU1zUTBGQlF6dGhRVU12UlR0VFFVTkdPMkZCUVUwN1dVRkRUQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEhsQ1FVRjVRaXhOUVVGTkxESkNRVUV5UWl4RFFVRkRMRU5CUVVFN1UwRkRNVVU3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUVR0SlFVTmlMRU5CUVVNN1NVRkZSQ3hOUVVGTkxFTkJRVU1zVFVGQll6dFJRVU51UWl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFN1VVRkRla01zVDBGQlR5eEpRVUZKTEVOQlFVRTdTVUZEWWl4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFMUJRV003VVVGRGFFSXNTVUZCU1N4RFFVRkZMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVTdXVUZEZEVJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUVR0VFFVTnFRanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZCTzBsQlEySXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogIyBOb25DbGFzc2VzXHJcbiAqXHJcbiAqIElzIGEgbmlsLWVmZmVjdCBJQ2xhc3NlcyBpbnN0YW5jZSB0byByZXR1cm5cclxuICogaW4gYW55IHNpdHVhdGlvbiB3aGVyZSB0aGUgSUVsZW1lbnQgaW1wbGVtZW50YXRpb25cclxuICogY2Fubm90IHByb3ZpZGUgYSBiYWNraW5nIGZvciB0aGUgc3R5bGUgY2xhc3NlcyBmcm9tXHJcbiAqIGEgZG9jdW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9uQ2xhc3NlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB3aGVuSGFzKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGQoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXQoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05dUxXTnNZWE56WlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXTnNZWE56WlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVV0SU96czdPenM3TzBkQlQwYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1ZVRkJWVHRKUVVOeVFpeG5Ra0ZCWlN4RFFVRkRPMGxCUldoQ0xFOUJRVThzUTBGQlF5eFJRVUZ4UXp0UlFVTXpReXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMRTlCUVU4c1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmNVTTdVVUZEZWtRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRTFCUVdNN1VVRkRhRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFMUJRV003VVVGRGJrSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEUxQlFXTTdVVUZEYUVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBOQlEwWWlmUT09IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhIG5vbi1hdHRyaWJ1dGVzIGluc3RhbmNlLCB0byBiZSByZXR1cm5lZFxyXG4gKiB3aGVuIG5vIGVmZmVjdGl2ZSBhdHRyaWJ1dGVzIGluc3RhbmNlIGNhbiBiZSBwcm92aWRlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb25BdHRyaWJ1dGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVOYW1lcygpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBhZGQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0KG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGhhcyhuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdGMGRISnBZblYwWlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXRjBkSEpwWW5WMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVbElPenM3UjBGSFJ6dEJRVU5JTEUxQlFVMHNUMEZCVHl4aFFVRmhPMGxCUTNoQ0xHZENRVUZsTEVOQlFVTTdTVUZGYUVJc1QwRkJUeXhEUVVGRExGRkJRU3RETzFGQlEzSkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEdOQlFXTTdVVUZEV2l4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1N4RlFVRkZMRXRCUVdFN1VVRkROMElzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFbEJRVmtzUlVGQlJTeExRVUZoTzFGQlF6ZENMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJkME03VVVGRGVrUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEVsQlFWazdVVUZEWkN4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1R0UlFVTmtMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVU5FTEUxQlFVMHNRMEZCUXl4SlFVRlpPMUZCUTJwQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBOb25BdHRyaWJ1dGVzIH0gZnJvbSAnLi9ub24tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IE5vbkNsYXNzZXMgfSBmcm9tICcuL25vbi1jbGFzc2VzJztcclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBub24tZWxlbWVudC4gVG8gYmUgcmV0dXJuZWQgaW4gYW5zd2VyXHJcbiAqIGZvciBhbiBlbGVtZW50IGJ1dCBvbmUgY2Fubm90IGJlIHByb3ZpZGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vbkVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIGlzVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UGFyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aENoaWxkcmVuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3QodGFnTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBoYXNJZCgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBleGlzdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbChlbGVtZW50TGlzdExvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0Rmlyc3Qoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbGVjdG9yUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB0YWdOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHRleHQoX3RleHQpIHtcclxuICAgICAgICBpZiAoX3RleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaHRtbChfaHRtbCkge1xyXG4gICAgICAgIGlmIChfaHRtbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHBlbmQoX2h0bWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHByZXBlbmQoX2h0bWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE5vbkF0dHJpYnV0ZXMoKTtcclxuICAgIH1cclxuICAgIGNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25DbGFzc2VzKCk7XHJcbiAgICB9XHJcbiAgICBvbihhcmdzKSB7IH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05dUxXVnNaVzFsYm5RdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXVnNaVzFsYm5RdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVZGSUxFOUJRVThzUlVGQlJTeGhRVUZoTEVWQlFVVXNUVUZCVFN4clFrRkJhMElzUTBGQlF6dEJRVU5xUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlJ6TkRPenM3UjBGSFJ6dEJRVU5JTEUxQlFVMHNUMEZCVHl4VlFVRlZPMGxCUlhKQ0xHZENRVUZsTEVOQlFVTTdTVUZGYUVJc1QwRkJUenRSUVVOTUxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMRk5CUVZNN1VVRkRVQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4WlFVRlpMRU5CUVVNc1VVRkJiME03VVVGREwwTXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEU5QlFXVTdVVUZEY0VJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNTMEZCU3p0UlFVTklMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEV0QlFVczdVVUZEU0N4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVObUxFTkJRVU03U1VGRlJDeE5RVUZOTzFGQlEwb3NUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRaaXhEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEcxQ1FVRnpRenRSUVVNMVF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0SlFVTmFMRU5CUVVNN1NVRkZSQ3hYUVVGWExFTkJRVU1zVVVGQlowSTdVVUZETVVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNXVUZCV1R0UlFVTldMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRMW9zUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeEpRVUZKTEVOQlFVTXNTMEZCTUVJN1VVRkROMElzU1VGQlNTeExRVUZMTEVWQlFVVTdXVUZEVkN4UFFVRlBMRWxCUVVrc1EwRkJRenRUUVVOaU8yRkJRVTA3V1VGRFRDeFBRVUZQTEVWQlFVVXNRMEZCUXp0VFFVTllPMGxCUTBnc1EwRkJRenRKUVVWRUxFbEJRVWtzUTBGQlF5eExRVUV3UWp0UlFVTTNRaXhKUVVGSkxFdEJRVXNzUlVGQlJUdFpRVU5VTEU5QlFVOHNTVUZCU1N4RFFVRkRPMU5CUTJJN1lVRkJUVHRaUVVOTUxFOUJRVThzUlVGQlJTeERRVUZETzFOQlExZzdTVUZEU0N4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFdEJRV0U3VVVGRGJFSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEV0QlFXRTdVVUZEYmtJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUVUZCVFR0UlFVTktMRTlCUVU4c1UwRkJVeXhEUVVGRE8wbEJRMjVDTEVOQlFVTTdTVUZGUkN4VlFVRlZPMUZCUTFJc1QwRkJUeXhKUVVGSkxHRkJRV0VzUlVGQlJTeERRVUZETzBsQlF6ZENMRU5CUVVNN1NVRkZSQ3hQUVVGUE8xRkJRMHdzVDBGQlR5eEpRVUZKTEZWQlFWVXNSVUZCUlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRFJDeEZRVUZGTEVOQlFVTXNTVUZCYzBJc1NVRkJWeXhEUVVGRE8wbEJSWEpETEV0QlFVczdVVUZEU0N4UFFVRlBMRk5CUVZNc1EwRkJRenRKUVVOdVFpeERRVUZETzBOQlEwWWlmUT09IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IHByb3ZpZGVzQWxsIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgRG9tQXR0cmlidXRlcyB9IGZyb20gJy4vZG9tLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgeyBEb21DbGFzc2VzIH0gZnJvbSAnLi9kb20tY2xhc3Nlcyc7XHJcbmltcG9ydCB7IE5vbkNsYXNzZXMgfSBmcm9tICcuL25vbi1jbGFzc2VzJztcclxuaW1wb3J0IHsgTm9uQXR0cmlidXRlcyB9IGZyb20gJy4vbm9uLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgeyBOb25FbGVtZW50IH0gZnJvbSAnLi9ub24tZWxlbWVudCc7XHJcbi8qKlxyXG4gKiBAcHJpdmF0ZSBhbiBpbnRlcm5hbCBmdW5jdGlvbi5cclxuICogQHBhcmFtIGNvbGxlY3Rpb24gSFRNTCBjb2xsZWN0aW9uIHRvIGNvbnZlcnQgaW50byBhcnJheSBvZiBJRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydEh0bWxDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcclxuICAgIGxldCBsaXN0ID0gW107XHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY29sbGVjdGlvbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBjb2xsZWN0aW9uW2luZGV4XTtcclxuICAgICAgICBsaXN0LnB1c2gobmV3IERvbUVsZW1lbnQoY2hpbGQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcbi8qKlxyXG4gKiBAcHJpdmF0ZSBhbiBpbnRlcm5hbCBmdW5jdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIHNlbGVjdG9yUGF0aChlbGVtZW50KSB7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGAjeyRpZH1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBlbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRoID0gYCR7c2VsZWN0b3JQYXRoKGVsZW1lbnQucGFyZW50RWxlbWVudCl9PiR7ZWxlbWVudC50YWdOYW1lfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QnlTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvcikge1xyXG4gICAgbGV0IGZpcnN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3RvclBhdGgoZWxlbWVudCl9PiR7c2VsZWN0b3J9YCk7XHJcbiAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4vKipcclxuICogIyBEb21FbGVtZW50XHJcbiAqXHJcbiAqIFRoZSBpbXBsZW1lbnRhdGlvbiBJRWxlbWVudCBmb3IgZWxlbWVudHMgaW4gdGhlIGJyb3dzZXJcclxuICogcGFnZSBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRG9tRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5kb21FbGVtZW50ID0gbmV3IE9wdGlvbihlbGVtZW50KTtcclxuICAgIH1cclxuICAgIGFsZXJ0SW52YWxpZCgpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiSUVsZW1lbnRbRG9tRWxlbWVudF0gaXMgaW52YWxpZC5cIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQgdXNpbmcgYSBzZWxlY3Rvci5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIENTUyBzdHlsZSBzZWxlY3Rvci5cclxuICAgICAqIEByZXR1cm5zIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRMaXN0RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBlbGVtZW50cyBpbiBhIGRvY3VtZW50IHVzaW5nIGEgY2xhc3MgbmFtZS5cclxuICAgICAqIE5vdGUgZG8gbm90IHByZWZpeCB3aXRoIGEgcGVyaW9kIChgLmApIC0ganVzdCBwcm92aWRlXHJcbiAgICAgKiB0aGUgcHVyZSBjbGFzcyBuYW1lLlxyXG4gICAgICogQHBhcmFtIGNsYXNzIC0gcHVyZSBjbGFzcyBuYW1lLlxyXG4gICAgICogQHJldHVybnMgbGlzdCBvZiBtYXRjaGluZyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExpc3RGcm9tQ2xhc3MoX2NsYXNzKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtfY2xhc3N9YCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRIdG1sQ29sbGVjdGlvbihsaXN0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgZWxlbWVudHMgaW4gYSBkb2N1bWVudCB1c2luZyBhIHRhZy1uYW1lLlxyXG4gICAgICogQHBhcmFtIHRhZ05hbWUgLSB0YWcgbmFtZSAoY2FzZSBpbnNlbnNpdGl2ZSkuXHJcbiAgICAgKiBAcmV0dXJucyBsaXN0IG9mIG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TGlzdEZyb21UYWdOYW1lKHRhZ05hbWUpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFnTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRIdG1sQ29sbGVjdGlvbihsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50RnJvbUlkKGlkKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5tYWtlRnJvbUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGZpcnN0IG1hdGNoaW5nIGVsZW1lbnQgZnJvbSBhIGRvY3VtZW50LlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gYSBDU1Mgc3R5bGUgc2VsZWN0b3JcclxuICAgICAqIEByZXR1cm5zIGFuIGVsZW1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0RWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQubWFrZUZyb21FbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG1ha2VGcm9tRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICghIWVsZW1lbnQpID8gbmV3IERvbUVsZW1lbnQoZWxlbWVudCkgOiBuZXcgTm9uRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgaXNWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlzVmFsaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgX3BhciA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgbGV0IHBhcmVudDtcclxuICAgICAgICAgICAgcGFyZW50ID0gX3BhciA/IG5ldyBEb21FbGVtZW50KF9wYXIpIDogbmV3IERvbUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICB3aXRoQ2hpbGRyZW4oY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQgJiYgdGhpcy5kb21FbGVtZW50LlZhbHVlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBjb252ZXJ0SHRtbENvbGxlY3Rpb24odGhpcy5kb21FbGVtZW50LlZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sobGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZXhwZWN0KHRhZ05hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZS50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGxldCBleHBlY3RlZCA9IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXhwZWN0ZWQgJHtleHBlY3RlZH0gYnV0IEFjdHVhbCB0YWdOYW1lIHdhcyAke2FjdHVhbH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzKCkuZ2V0KCdpZCcpO1xyXG4gICAgfVxyXG4gICAgaGFzSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcygpLmhhcygnaWQnKTtcclxuICAgIH1cclxuICAgIGV4aXN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCk7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGVsZW1lbnRMaXN0TG9jYXRpb24pIHtcclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBlbGVtZW50TGlzdExvY2F0aW9uWydzZWxlY3RvciddIHx8IGVsZW1lbnRMaXN0TG9jYXRpb25bJ3RhZ05hbWUnXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gY29udmVydEh0bWxDb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0Rmlyc3Qoc2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gZ2V0QnlTZWxlY3Rvcih0aGlzLmRvbUVsZW1lbnQuVmFsdWUsIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbUVsZW1lbnQoZmlyc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0b3JQYXRoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JQYXRoKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdGFnTmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5WYWx1ZS50YWdOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIHJldHVybiAnVU5LTk9XTic7XHJcbiAgICB9XHJcbiAgICB0ZXh0KF90ZXh0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoISFfdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBfdGV4dDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaHRtbChfaHRtbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKCEhX2h0bWwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gX2h0bWw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHZhciB0b3RhbEh0bWwgPSBgJHt0aGlzLmh0bWwoKX0ke19odG1sfWA7XHJcbiAgICAgICAgdGhpcy5odG1sKHRvdGFsSHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwcmVwZW5kKF9odG1sKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsSHRtbCA9IGAke19odG1sfSR7dGhpcy5odG1sKCl9YDtcclxuICAgICAgICB0aGlzLmh0bWwodG90YWxIdG1sKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LlZhbHVlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tQXR0cmlidXRlcyh0aGlzLmRvbUVsZW1lbnQuVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb25BdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21DbGFzc2VzKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTm9uQ2xhc3NlcygpO1xyXG4gICAgfVxyXG4gICAgb24oYXJncykge1xyXG4gICAgICAgIGlmIChwcm92aWRlc0FsbChbJ2V2ZW50JywgJ2hhbmRsZXInXSwgYXJncykgJiYgdGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gYXJncy5ldmVudDtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBhcmdzLmhhbmRsZXI7XHJcbiAgICAgICAgICAgIHZhciBvcHRLZWVwRGVmYXVsdCA9IGFyZ3Mua2VlcERlZmF1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5WYWx1ZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAoZmlyZWRFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRLZWVwRGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmVkRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhhbmRsZXIoZmlyZWRFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbJ3ZhbHVlJ10pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXVnNaVzFsYm5RdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXVnNaVzFsYm5RdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVWSUxFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4VlFVRlZMRU5CUVVNN1FVRkZiRU1zVDBGQlR5eEZRVUZsTEZkQlFWY3NSVUZCWXl4TlFVRk5MRkZCUVZFc1EwRkJRVHRCUVVNM1JDeFBRVUZQTEVWQlFVVXNZVUZCWVN4RlFVRkZMRTFCUVUwc2EwSkJRV3RDTEVOQlFVRTdRVUZEYUVRc1QwRkJUeXhGUVVGRkxGVkJRVlVzUlVGQlJTeE5RVUZOTEdWQlFXVXNRMEZCUVR0QlFVVXhReXhQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUXpORExFOUJRVThzUlVGQlJTeGhRVUZoTEVWQlFVVXNUVUZCVFN4clFrRkJhMElzUTBGQlF6dEJRVTlxUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlJUTkRPenM3UjBGSFJ6dEJRVU5JTEZOQlFWTXNjVUpCUVhGQ0xFTkJRelZDTEZWQlFXZEVPMGxCUldoRUxFbEJRVWtzU1VGQlNTeEhRVUZ2UWl4RlFVRkZMRU5CUVVNN1NVRkRMMElzUzBGQlNTeEpRVUZKTEV0QlFVc3NSMEZCUnl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGSExGVkJRVlVzUTBGQlF5eE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVN1VVRkRja1FzU1VGQlNTeExRVUZMTEVkQlFXbENMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFJRVU0xUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRkxFbEJRVWtzVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkZMRU5CUVVNN1MwRkRjRU03U1VGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0QlFVTmtMRU5CUVVNN1FVRkZSRHM3UjBGRlJ6dEJRVU5JTEZOQlFWTXNXVUZCV1N4RFFVRkRMRTlCUVN0Q08wbEJRMjVFTEVsQlFVa3NTVUZCU1N4SFFVRkhMRVZCUVVVc1EwRkJRenRKUVVOa0xFbEJRVWtzVDBGQlR5eEZRVUZGTzFGQlExZ3NTVUZCU1N4RlFVRkZMRWRCUVVjc1QwRkJUeXhEUVVGRExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTndReXhKUVVGSkxFVkJRVVVzUlVGQlJUdFpRVU5PTEVsQlFVa3NSMEZCUnl4UlFVRlJMRU5CUVVNN1UwRkRha0k3WVVGQlRTeEpRVUZMTEVOQlFVVXNUMEZCVHl4RFFVRkRMR0ZCUVdFc1JVRkJSenRaUVVOd1F5eEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJRenRUUVVONFFqdGhRVUZOTzFsQlEwd3NTVUZCU1N4SFFVRkhMRWRCUVVjc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03VTBGRGNFVTdTMEZEUmp0SlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wRkJRMlFzUTBGQlF6dEJRVVZFT3p0SFFVVkhPMEZCUTBnc1UwRkJVeXhoUVVGaExFTkJRVU1zVDBGQk9FSXNSVUZCUlN4UlFVRm5RanRKUVVOeVJTeEpRVUZKTEV0QlFVc3NSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlJUVkRMRWxCUVVrc1MwRkJTeXhGUVVGRk8xRkJRMVFzVDBGQmIwSXNTMEZCU3l4RFFVRkRPMHRCUXpOQ08xTkJRVTA3VVVGRFRDeExRVUZMTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJSU3hIUVVGSExGbEJRVmtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4UlFVRlJMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM2hGTEVsQlFVa3NTMEZCU3l4RlFVRkZPMWxCUTFRc1QwRkJiMElzUzBGQlN5eERRVUZETzFOQlF6TkNPMHRCUTBZN1NVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEJRVU5rTEVOQlFVTTdRVUZIUkRzN096czdSMEZMUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhWUVVGVk8wbEJSM0pDTEZsQlFXTXNUMEZCSzBJN1VVRkRNME1zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRTFCUVUwc1EwRkJORUlzVDBGQlR5eERRVUZETEVOQlFVTTdTVUZEYmtVc1EwRkJRenRKUVVWUExGbEJRVms3VVVGRGJFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhyUTBGQmEwTXNRMEZCUXl4RFFVRkRPMGxCUTNCRUxFTkJRVU03U1VGRlJEczdPenRQUVVsSE8wbEJRMGdzVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExGRkJRV1U3VVVGRGVFTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xRkJReTlETEU5QlFVOHNjVUpCUVhGQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEY2tNc1EwRkJRenRKUVVWRU96czdPenM3VDBGTlJ6dEpRVU5JTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUTBGQlF5eE5RVUZoTzFGQlEyNURMRWxCUVVrc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEYmtRc1QwRkJUeXh4UWtGQmNVSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOeVF5eERRVUZETzBsQlJVUTdPenM3VDBGSlJ6dEpRVU5JTEUxQlFVMHNRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZqTzFGQlEzUkRMRWxCUVVrc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU01UXl4UFFVRlBMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTNKRExFTkJRVU03U1VGRlJDeE5RVUZOTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUlVGQlZUdFJRVU5vUXl4SlFVRkpMRTlCUVU4c1IwRkJSeXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEVsQlFVa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNdlF5eFBRVUZQTEZWQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRE4wTXNRMEZCUXp0SlFVVkVPenM3TzA5QlNVYzdTVUZEU0N4TlFVRk5MRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNVVUZCWjBJN1VVRkROVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVU12UXl4UFFVRlBMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZETjBNc1EwRkJRenRKUVVWUExFMUJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCY1VNN1VVRkRiRVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeFZRVUZWTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdTVUZEYkVVc1EwRkJRenRKUVVWRUxFOUJRVTg3VVVGRFRDeFBRVUZQTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhEUVVGRE8wbEJRMnBETEVOQlFVTTdTVUZGUkN4VFFVRlRPMUZCUTFBc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFOUJRVThzUjBGQmFVSXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGJFUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExHRkJRV0VzUTBGQlF6dFpRVU5xUXl4SlFVRkpMRTFCUVd0Q0xFTkJRVU03V1VGRGRrSXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeFZRVUZWTEVOQlFXVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdXVUZEZEVVc1QwRkJUeXhOUVVGTkxFTkJRVU03VTBGRFpqdFJRVU5FTEU5QlFVOHNTVUZCU1N4VlFVRlZMRVZCUVVVc1EwRkJRenRKUVVNeFFpeERRVUZETzBsQlJVUXNXVUZCV1N4RFFVRkRMRkZCUVhORE8xRkJRMnBFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFbEJRVWtzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVTdXVUZEZUVVc1NVRkJTU3hKUVVGSkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVVc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkRiRVVzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTJoQ08xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFOUJRV1U3VVVGRGNFSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU16UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03V1VGRGVrUXNTVUZCU1N4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFsQlEzSkRMRWxCUVVzc1RVRkJUU3hKUVVGSkxGRkJRVkVzUlVGQlNUdG5Ra0ZEZWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEZGQlFWRXNNa0pCUVRKQ0xFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTTdZVUZEZUVVN1UwRkRSanRoUVVGTk8xbEJRMHdzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMU5CUTNKQ08xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU55UXl4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlFUdEpRVU53UXl4RFFVRkRPMGxCUlVRc1RVRkJUVHRSUVVOS0xFOUJRVThzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTNoQ0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVTXNiVUpCUVhORE8xRkJRelZETEVsQlFVa3NVVUZCVVN4SFFVRkhMRzFDUVVGdFFpeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRzFDUVVGdFFpeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTJwR0xFbEJRVWtzVVVGQlVTeEZRVUZGTzFsQlExb3NTVUZCU1N4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdXVUZEYkVVc1NVRkJTU3hKUVVGSkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVVc1ZVRkJWU3hEUVVGRkxFTkJRVU03V1VGREwwTXNUMEZCVHl4SlFVRkpMRU5CUVVNN1UwRkRZanRSUVVORUxFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRmRCUVZjc1EwRkJReXhSUVVGblFqdFJRVU14UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1MwRkJTeXhIUVVGM1FpeGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdXVUZGYUVZc1NVRkJTU3hMUVVGTExFVkJRVVU3WjBKQlExUXNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJZeXhMUVVGTExFTkJRVU1zUTBGQlF6dGhRVU16UXp0VFFVTkdPMUZCUTBRc1QwRkJUeXhKUVVGSkxGVkJRVlVzUlVGQlJTeERRVUZETzBsQlF6RkNMRU5CUVVNN1NVRkZSQ3haUVVGWk8xRkJRMVlzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeFBRVUZQTEZsQlFWa3NRMEZCUlN4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlJTeERRVUZETzFOQlF6bERPMUZCUTBRc1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFGQlEzQkNMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRMW9zUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRTlCUVU4c1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUTNSRE8xRkJRMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMUZCUTNCQ0xFOUJRVThzVTBGQlV5eERRVUZETzBsQlEyNUNMRU5CUVVNN1NVRkZSQ3hKUVVGSkxFTkJRVU1zUzBGQlpUdFJRVU5zUWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTNCRExFbEJRVWtzUTBGQlF5eERRVUZETEV0QlFVc3NSVUZCUnp0blFrRkRXaXhQUVVGUExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUVR0blFrRkRla0lzVDBGQlR5eEpRVUZKTEVOQlFVTTdZVUZEWWp0cFFrRkJUVHRuUWtGRFRDeFBRVUZQTEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNN1lVRkRNVUk3VTBGRFJqdGhRVUZQTzFsQlEwNHNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xbEJRM0JDTEU5QlFVOHNSVUZCUlN4RFFVRkRPMU5CUTFnN1NVRkRTQ3hEUVVGRE8wbEJSVVFzU1VGQlNTeERRVUZETEV0QlFXVTdVVUZEYkVJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOd1F5eEpRVUZKTEVOQlFVTXNRMEZCUlN4TFFVRkxMRVZCUVVVN1owSkJRMW9zVDBGQlR5eERRVUZETEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVFN1owSkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMkZCUTJJN2FVSkJRVTA3WjBKQlEwd3NUMEZCVHl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8yRkJRekZDTzFOQlEwWTdZVUZCVFR0WlFVTk1MRWxCUVVrc1EwRkJReXhaUVVGWkxFVkJRVVVzUTBGQlF6dFpRVU53UWl4UFFVRlBMRVZCUVVVc1EwRkJRenRUUVVOWU8wbEJRMGdzUTBGQlF6dEpRVVZFTEUxQlFVMHNRMEZCUXl4TFFVRmhPMUZCUTJ4Q0xFbEJRVWtzVTBGQlV5eEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFdEJRVXNzUlVGQlJTeERRVUZCTzFGQlEzaERMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVRTdVVUZEY0VJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRXRCUVdFN1VVRkRia0lzU1VGQlNTeFRRVUZUTEVkQlFVY3NSMEZCUnl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEZRVUZGTEVOQlFVRTdVVUZEZUVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUVR0UlFVTndRaXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4TlFVRk5PMUZCUTBvc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRUUVVOb1F6dGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzFGQlEwUXNUMEZCVHl4VFFVRlRMRU5CUVVNN1NVRkRia0lzUTBGQlF6dEpRVVZFTEZWQlFWVTdVVUZEVWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRTlCUVU4c1NVRkJTU3hoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVOcVJEdGhRVUZOTzFsQlEwd3NUMEZCVHl4SlFVRkpMR0ZCUVdFc1JVRkJSU3hEUVVGRE8xTkJRelZDTzBsQlEwZ3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZEY0VRN1VVRkRSQ3hQUVVGUExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdTVUZETVVJc1EwRkJRenRKUVVWRUxFVkJRVVVzUTBGQlF5eEpRVUZ6UWp0UlFVTjJRaXhKUVVGSkxGZEJRVmNzUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVOeVJTeEpRVUZKTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM1pDTEVsQlFVa3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03V1VGRE0wSXNTVUZCU1N4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFpRVU4wUXl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFVkJRVVVzVlVGQlV5eFZRVUZsTzJkQ1FVTndSU3hKUVVGSkxFTkJRVVVzWTBGQll5eEZRVUZGTzI5Q1FVTndRaXhWUVVGVkxFTkJRVU1zWTBGQll5eEZRVUZGTEVOQlFVRTdhVUpCUXpWQ08yZENRVU5FTEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRVHRaUVVOeVFpeERRVUZETEVOQlFVTXNRMEZCUVR0VFFVTklPMGxCUTBnc1EwRkJRenRKUVVWRUxFdEJRVXM3VVVGRFNDeEpRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRk8xbEJRek5DTEVsQlFVa3NUMEZCVHl4SFFVRlRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlF6RkRMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTndRaXhQUVVGUExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTTdZVUZEZEVJN1UwRkRSanRSUVVORUxFOUJRVThzVTBGQlV5eERRVUZCTzBsQlEyeENMRU5CUVVNN1EwRkRSaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRhZztcclxuKGZ1bmN0aW9uIChUYWcpIHtcclxuICAgIFRhZ1tcIkJ1dHRvblwiXSA9IFwiQlVUVE9OXCI7XHJcbiAgICBUYWdbXCJEaXZcIl0gPSBcIkRJVlwiO1xyXG4gICAgVGFnW1wiSW5wdXRcIl0gPSBcIklOUFVUXCI7XHJcbiAgICBUYWdbXCJQYXJhZ3JhcGhcIl0gPSBcIlBcIjtcclxufSkoVGFnIHx8IChUYWcgPSB7fSkpO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTElTVCA9IFtcclxuICAgICdhYm9ydCcsICdhZnRlcnNjcmlwdGV4ZWN1dGUnLFxyXG4gICAgJ2FuaW1hdGlvbmNhbmNlbCcsICdhbmltYXRpb25lbmQnLCAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcclxuICAgICdhdXhjbGljaycsXHJcbiAgICAnYmVmb3Jlc2NyaXB0ZXhlY3V0ZScsICdibHVyJyxcclxuICAgICdjaGFuZ2UnLCAnY2xpY2snLCAnY2xvc2UnLCAnY29udGV4dG1lbnUnLFxyXG4gICAgJ2RibGNsaWNrJyxcclxuICAgICdlcnJvcicsXHJcbiAgICAnZm9jdXMnLCAnZnVsbHNjcmVlbmNoYW5nZScsICdmdWxsc2NyZWVuZXJyb3InLFxyXG4gICAgJ2dvdHBvaW50ZXJjYXB0dXJlJyxcclxuICAgICdpbnB1dCcsXHJcbiAgICAna2V5ZG93bicsICdrZXlwcmVzcycsICdrZXl1cCcsXHJcbiAgICAnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCcsICdsb3N0cG9pbnRlcmNhcHR1cmUnLFxyXG4gICAgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnLFxyXG4gICAgJ29mZmxpbmUnLCAnb25saW5lJyxcclxuICAgICdwb2ludGVyY2FuY2VsJywgJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJlbnRlcicsICdwb2ludGVybGVhdmUnLFxyXG4gICAgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJvdXQnLCAncG9pbnRlcm92ZXInLCAncG9pbnRlcnVwJyxcclxuICAgICdyZXNldCcsICdyZXNpemUnLFxyXG4gICAgJ3Njcm9sbCcsICdzZWxlY3QnLCAnc2VsZWN0aW9uY2hhbmdlJywgJ3NlbGVjdGlvbmNoYW5nZScsXHJcbiAgICAnc2VsZWN0c3RhcnQnLCAnc3VibWl0JyxcclxuICAgICd0b3VjaGNhbmNlbCcsICd0b3VjaG1vdmUnLCAndG91Y2hzdGFydCcsXHJcbiAgICAndHJhbnNpdGlvbmNhbmNlbCcsICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICd2aXNpYmlsaXR5Y2hhbmdlJyxcclxuICAgICd3aGVlbCdcclxuXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50U2V0KCkge1xyXG4gICAgbGV0IGV2ZW50cyA9IHt9O1xyXG4gICAgZm9yICh2YXIgZXZlbnQgb2YgRVZFTlRfTElTVCkge1xyXG4gICAgICAgIGxldCBrZXkgPSBldmVudC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGV2ZW50c1trZXldID0gZXZlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXZlbnRzO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyOXVjM1JoYm5SekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJOdmJuTjBZVzUwY3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUjBnc1RVRkJUU3hEUVVGT0xFbEJRVmtzUjBGTFdEdEJRVXhFTEZkQlFWa3NSMEZCUnp0SlFVTmlMSGRDUVVGcFFpeERRVUZCTzBsQlEycENMR3RDUVVGWExFTkJRVUU3U1VGRFdDeHpRa0ZCWlN4RFFVRkJPMGxCUTJZc2MwSkJRV1VzUTBGQlFUdEJRVU5xUWl4RFFVRkRMRVZCVEZjc1IwRkJSeXhMUVVGSUxFZEJRVWNzVVVGTFpEdEJRVVZFTEUxQlFVMHNRMEZCUXl4TlFVRk5MRlZCUVZVc1IwRkJSenRKUVVONFFpeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q08wbEJRemRDTEdsQ1FVRnBRaXhGUVVGRkxHTkJRV01zUlVGQlJTeHZRa0ZCYjBJN1NVRkRka1FzVlVGQlZUdEpRVU5XTEhGQ1FVRnhRaXhGUVVGRkxFMUJRVTA3U1VGRE4wSXNVVUZCVVN4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzWVVGQllUdEpRVU42UXl4VlFVRlZPMGxCUTFZc1QwRkJUenRKUVVOUUxFOUJRVThzUlVGQlJTeHJRa0ZCYTBJc1JVRkJSU3hwUWtGQmFVSTdTVUZET1VNc2JVSkJRVzFDTzBsQlEyNUNMRTlCUVU4N1NVRkRVQ3hUUVVGVExFVkJRVVVzVlVGQlZTeEZRVUZGTEU5QlFVODdTVUZET1VJc1RVRkJUU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFhRVUZYTEVWQlFVVXNiMEpCUVc5Q08wbEJRM0JFTEZkQlFWY3NSVUZCUlN4WFFVRlhMRVZCUVVVc1ZVRkJWU3hGUVVGRkxGZEJRVmNzUlVGQlJTeFRRVUZUTzBsQlF6VkVMRk5CUVZNc1JVRkJSU3hSUVVGUk8wbEJRMjVDTEdWQlFXVXNSVUZCUlN4aFFVRmhMRVZCUVVVc1kwRkJZeXhGUVVGRkxHTkJRV003U1VGRE9VUXNZVUZCWVN4RlFVRkZMRmxCUVZrc1JVRkJSU3hoUVVGaExFVkJRVVVzVjBGQlZ6dEpRVU4yUkN4UFFVRlBMRVZCUVVVc1VVRkJVVHRKUVVOcVFpeFJRVUZSTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2xDUVVGcFFpeEZRVUZGTEdsQ1FVRnBRanRKUVVONFJDeGhRVUZoTEVWQlFVVXNVVUZCVVR0SlFVTjJRaXhoUVVGaExFVkJRVVVzVjBGQlZ5eEZRVUZGTEZsQlFWazdTVUZEZUVNc2EwSkJRV3RDTEVWQlFVVXNaVUZCWlR0SlFVTnVReXhyUWtGQmEwSTdTVUZEYkVJc1QwRkJUenREUVVOU0xFTkJRVU03UVVGSlJpeE5RVUZOTEZWQlFWVXNZMEZCWXp0SlFVTTFRaXhKUVVGSkxFMUJRVTBzUjBGQllTeEZRVUZGTEVOQlFVTTdTVUZETVVJc1MwRkJTU3hKUVVGSkxFdEJRVXNzU1VGQlNTeFZRVUZWTEVWQlFVVTdVVUZETTBJc1NVRkJTU3hIUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMUZCUXpsQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNN1MwRkRja0k3U1VGRFJDeFBRVUZQTEUxQlFVMHNRMEZCUXp0QlFVTm9RaXhEUVVGREluMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgSHR0cE1ldGhvZDtcclxuKGZ1bmN0aW9uIChIdHRwTWV0aG9kKSB7XHJcbiAgICBIdHRwTWV0aG9kW1wiQ09OTkVDVFwiXSA9IFwiQ09OTkVDVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIkRFTEVURVwiXSA9IFwiREVMRVRFXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiR0VUXCJdID0gXCJHRVRcIjtcclxuICAgIEh0dHBNZXRob2RbXCJIRUFEXCJdID0gXCJIRUFEXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiT1BUSU9OU1wiXSA9IFwiT1BUSU9OU1wiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlBBVENIXCJdID0gXCJQQVRDSFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlBPU1RcIl0gPSBcIlBPU1RcIjtcclxuICAgIEh0dHBNZXRob2RbXCJQVVRcIl0gPSBcIlBVVFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIlRSQUNFXCJdID0gXCJUUkFDRVwiO1xyXG59KShIdHRwTWV0aG9kIHx8IChIdHRwTWV0aG9kID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXRaWFJvYjJRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12YUhSMGNDMXRaWFJvYjJRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVWSUxFMUJRVTBzUTBGQlRpeEpRVUZaTEZWQlZWZzdRVUZXUkN4WFFVRlpMRlZCUVZVN1NVRkRjRUlzYVVOQlFXMUNMRU5CUVVFN1NVRkRia0lzSzBKQlFXbENMRU5CUVVFN1NVRkRha0lzZVVKQlFWY3NRMEZCUVR0SlFVTllMREpDUVVGaExFTkJRVUU3U1VGRFlpeHBRMEZCYlVJc1EwRkJRVHRKUVVOdVFpdzJRa0ZCWlN4RFFVRkJPMGxCUTJZc01rSkJRV0VzUTBGQlFUdEpRVU5pTEhsQ1FVRlhMRU5CUVVFN1NVRkRXQ3cyUWtGQlpTeERRVUZCTzBGQlEycENMRU5CUVVNc1JVRldWeXhWUVVGVkxFdEJRVllzVlVGQlZTeFJRVlZ5UWlKOSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IHZhciBIdHRwUmVzcG9uc2VUeXBlO1xyXG4oZnVuY3Rpb24gKEh0dHBSZXNwb25zZVR5cGUpIHtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJURVhUXCJdID0gXCJ0ZXh0XCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiQVJSQVlCVUZGRVJcIl0gPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiQkxPQlwiXSA9IFwiYmxvYlwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkRPQ1VNRU5UXCJdID0gXCJkb2N1bWVudFwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkpTT05cIl0gPSBcImpzb25cIjtcclxufSkoSHR0cFJlc3BvbnNlVHlwZSB8fCAoSHR0cFJlc3BvbnNlVHlwZSA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF5WlhOd2IyNXpaUzEwZVhCbExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJoMGRIQXRjbVZ6Y0c5dWMyVXRkSGx3WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUlVnc1RVRkJUU3hEUVVGT0xFbEJRVmtzWjBKQlRWZzdRVUZPUkN4WFFVRlpMR2RDUVVGblFqdEpRVU14UWl4cFEwRkJZU3hEUVVGQk8wbEJRMklzSzBOQlFUSkNMRU5CUVVFN1NVRkRNMElzYVVOQlFXRXNRMEZCUVR0SlFVTmlMSGxEUVVGeFFpeERRVUZCTzBsQlEzSkNMR2xEUVVGaExFTkJRVUU3UVVGRFppeERRVUZETEVWQlRsY3NaMEpCUVdkQ0xFdEJRV2hDTEdkQ1FVRm5RaXhSUVUwelFpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgSHR0cFByb3RvY29sO1xyXG4oZnVuY3Rpb24gKEh0dHBQcm90b2NvbCkge1xyXG4gICAgSHR0cFByb3RvY29sW1wiSFRUUFwiXSA9IFwiaHR0cFwiO1xyXG4gICAgSHR0cFByb3RvY29sW1wiSFRUUFNcIl0gPSBcImh0dHBzXCI7XHJcbiAgICBIdHRwUHJvdG9jb2xbXCJGSUxFXCJdID0gXCJmaWxlXCI7XHJcbn0pKEh0dHBQcm90b2NvbCB8fCAoSHR0cFByb3RvY29sID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXdjbTkwYjJOdmJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5b2RIUndMWEJ5YjNSdlkyOXNMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdPMGRCU1VjN1FVRkhTQ3hOUVVGTkxFTkJRVTRzU1VGQldTeFpRVWxZTzBGQlNrUXNWMEZCV1N4WlFVRlpPMGxCUTNSQ0xEWkNRVUZoTEVOQlFVRTdTVUZEWWl3clFrRkJaU3hEUVVGQk8wbEJRMllzTmtKQlFXRXNRMEZCUVR0QlFVTm1MRU5CUVVNc1JVRktWeXhaUVVGWkxFdEJRVm9zV1VGQldTeFJRVWwyUWlKOSIsImV4cG9ydCBjbGFzcyBIdHRwUHJvbWlzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihfaHR0cCkge1xyXG4gICAgICAgIHRoaXMuaHR0cE9iamVjdCA9IF9odHRwO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNyZWF0ZVByb21pc2UoaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChwcm9taXNlUmVzb2x2ZXIsIHByb21pc2VSZWplY3RvcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBfcmVzb2x2ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlUmVzb2x2ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhhbmRsZXIoX3Jlc29sdmUsIHByb21pc2VSZWplY3Rvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpc1Jlc29sdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdCAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBodHRwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBPYmplY3Q7XHJcbiAgICB9XHJcbiAgICBhZnRlclJlc3VsdChjb250ZXh0VGhlbikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1Byb21pc2UodGhpcy5wcm9taXNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb21pc2UudGhlbihyZXNvbHZlZFJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0VGhlbih0aGlzLmh0dHBPYmplY3QsIHJlc29sdmVkUmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhlbih3aGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSh0aGlzLnByb21pc2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQodGhpcy5wcm9taXNlLnRoZW4od2hlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNhdGNoKHdoZW4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNQcm9taXNlKHRoaXMucHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCh0aGlzLnByb21pc2UuY2F0Y2god2hlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhhc1Byb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgbmV4dChfcHJvbWlzZSkge1xyXG4gICAgICAgIGxldCBfbmV4dCA9IG5ldyBIdHRwUHJvbWlzZSh0aGlzLmh0dHBPYmplY3QpO1xyXG4gICAgICAgIF9uZXh0LnByb21pc2UgPSBfcHJvbWlzZTtcclxuICAgICAgICByZXR1cm4gX25leHQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXdjbTl0YVhObExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDJoMGRIQXRjSEp2YldselpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZIUVN4TlFVRk5MRTlCUVU4c1YwRkJWenRKUVhWQ2RFSXNXVUZCV1N4TFFVRlhPMUZCUTNKQ0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTNoQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NVMEZCVXl4RFFVRkRPMGxCUXpOQ0xFTkJRVU03U1VGeVFrUXNZVUZCWVN4RFFVTllMRTlCUjFNN1VVRkZWQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVVjRRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkxMRU5CUVVNc1pVRkJaU3hGUVVGRkxHVkJRV1VzUlVGQlJTeEZRVUZGTzFsQlEyeEZMRWxCUVVrc1NVRkJTU3hIUVVGdFFpeEpRVUZKTEVOQlFVTTdXVUZEYUVNc1NVRkJTU3hSUVVGUkxFZEJRVWNzVlVGQlV5eEpRVUZOTzJkQ1FVTTFRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXp0blFrRkRia0lzWlVGQlpTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNoQ0xFTkJRVU1zUTBGQlF6dFpRVU5HTEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1pVRkJaU3hEUVVGRExFTkJRVUU3VVVGRGNFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJUMFFzVlVGQlZUdFJRVU5TTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTFCUVUwc1NVRkJTU3hUUVVGVExFTkJRVU03U1VGRGJFTXNRMEZCUXp0SlFVVkVMRWxCUVVrN1VVRkRSaXhQUVVGUExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdTVUZEZWtJc1EwRkJRenRKUVVWRUxGZEJRVmNzUTBGRFZDeFhRVUU0UkR0UlFVVTVSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRMnBETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eEZRVUZGTzJkQ1FVTnFReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4alFVRmpMRU5CUVVNc1EwRkJRenRaUVVNdlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNTVUZCU1N4RFFVRkRMRWxCUVhWRE8xRkJRekZETEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEYWtNc1QwRkJUeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZGTEVOQlFVTTdVMEZETlVNN1VVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4TFFVRkxMRU5CUVVVc1NVRkJNa0k3VVVGRGFFTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0WlFVTnFReXhQUVVGUExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTTFRenRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRlZCUVZVc1EwRkJReXhQUVVGblF6dFJRVU42UXl4UFFVRnZRaXhKUVVGSkxFTkJRVU1zVDBGQlVTeFpRVUZaTEU5QlFVOHNRMEZCUXp0SlFVTjJSQ3hEUVVGRE8wbEJSVThzU1VGQlNTeERRVUZETEZGQlFUSkNPMUZCUTNSRExFbEJRVWtzUzBGQlN5eEhRVUZITEVsQlFVa3NWMEZCVnl4RFFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFJRVU5vUkN4TFFVRkxMRU5CUVVNc1QwRkJUeXhIUVVGbExGRkJRVkVzUTBGQlF6dFJRVU55UXl4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVObUxFTkJRVU03UTBGRFJpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IEh0dHBNZXRob2QgfSBmcm9tIFwiLi9odHRwLW1ldGhvZFwiO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VUeXBlIH0gZnJvbSBcIi4vaHR0cC1yZXNwb25zZS10eXBlXCI7XHJcbmltcG9ydCB7IEh0dHBQcm90b2NvbCB9IGZyb20gXCIuL2h0dHAtcHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgSHR0cFByb21pc2UgfSBmcm9tICcuL2h0dHAtcHJvbWlzZSc7XHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBIdHRwUHJvdG9jb2wuSFRUUDtcclxuICAgICAgICB0aGlzLnBvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnBhdGggPSAnJztcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IEh0dHBNZXRob2QuR0VUO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnVwbG9hZERhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSBIdHRwUmVzcG9uc2VUeXBlLlRFWFQ7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0TVMgPSAxMDAwO1xyXG4gICAgfVxyXG4gICAgaG9zdChwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQpIHtcclxuICAgICAgICB0aGlzLmhvc3RuYW1lID0gaG9zdG5hbWU7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcclxuICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBoZWFkZXIobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3RlZERhdGEodHlwZSkge1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gdHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRpbWVvdXRBdChkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMudGltZW91dE1TID0gZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjb250ZXh0KHRhc2spIHtcclxuICAgICAgICBsZXQgX2NvbnRleHQgPSBuZXcgSHR0cCgpO1xyXG4gICAgICAgIF9jb250ZXh0LnByb3RvY29sID0gdGhpcy5wcm90b2NvbDtcclxuICAgICAgICBfY29udGV4dC5wb3J0ID0gdGhpcy5wb3J0O1xyXG4gICAgICAgIF9jb250ZXh0Lmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZTtcclxuICAgICAgICBfY29udGV4dC5yZXF1ZXN0SGVhZGVycyA9IG5ldyBBcnJheSgpLmNvbmNhdCh0aGlzLnJlcXVlc3RIZWFkZXJzKTtcclxuICAgICAgICBfY29udGV4dC5wYXRoID0gdGhpcy5wYXRoO1xyXG4gICAgICAgIF9jb250ZXh0Lm1ldGhvZCA9IHRoaXMubWV0aG9kO1xyXG4gICAgICAgIF9jb250ZXh0LmJvZHkgPSB0aGlzLmJvZHk7XHJcbiAgICAgICAgX2NvbnRleHQudXBsb2FkRGF0YSA9IHRoaXMudXBsb2FkRGF0YTtcclxuICAgICAgICBfY29udGV4dC5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcclxuICAgICAgICB0YXNrKF9jb250ZXh0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNhbGwobWV0aG9kLCBwYXRoLCBib2R5KSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAodHlwZW9mIChib2R5KSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN5bmNQb3J0QW5kUHJvdG9jb2woKTtcclxuICAgICAgICBsZXQgcG9ydFN0cmluZyA9ICghIXRoaXMucG9ydCkgPyBgOiR7dGhpcy5wb3J0fWAgOiBgYDtcclxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5wcm90b2NvbH06Ly8ke3RoaXMuaG9zdG5hbWV9JHtwb3J0U3RyaW5nfSR7cGF0aH1gO1xyXG4gICAgICAgIGxldCB4aHIgPSB0aGlzLmNyZWF0ZVJlcXVlc3RUbyh1cmwpO1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5zZXRIYW5kbGVycyh4aHIpO1xyXG4gICAgICAgIHRoaXMuYWRkQW55SGVhZGVycyh4aHIpO1xyXG4gICAgICAgIHhoci5zZW5kKHRoaXMuYm9keSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBzeW5jUG9ydEFuZFByb3RvY29sKCkge1xyXG4gICAgICAgIGlmICgodGhpcy5wcm90b2NvbCA9PSBIdHRwUHJvdG9jb2wuSFRUUCAmJiB0aGlzLnBvcnQgPT0gODApXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3RvY29sID09IEh0dHBQcm90b2NvbC5IVFRQUyAmJiB0aGlzLnBvcnQgPT0gNDQzKVxyXG4gICAgICAgICAgICB8fCB0aGlzLnByb3RvY29sID09IEh0dHBQcm90b2NvbC5GSUxFKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjcmVhdGVSZXF1ZXN0VG8odXJsKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy50aW1lb3V0TVM7XHJcbiAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHhocjtcclxuICAgIH1cclxuICAgIHNldEVycm9ySGFuZGxlcnMoeGhyLCByZWplY3QpIHtcclxuICAgICAgICB4aHIub25hYm9ydCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KCdSZXF1ZXN0IEFib3J0ZWQnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnVGltZWQgb3V0Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBvY2N1cnJlZC4nKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUmVzcG9uc2VPYmplY3QoeGhyKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB4aHJcclxuICAgICAgICAgICAgLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KCdcXHJcXG4nKVxyXG4gICAgICAgICAgICAubWFwKGhlYWRlcl9saW5lID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcnRzID0gaGVhZGVyX2xpbmUuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzICYmIHBhcnRzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBwYXJ0c1swXSwgdmFsdWU6IHBhcnRzWzFdIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gIT0gdW5kZWZpbmVkKTtcclxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGhkciBpbiBoZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIGxldCBhX2hlYWRlciA9IGhlYWRlcnNbaGRyXTtcclxuICAgICAgICAgICAgaWYgKGFfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW2FfaGVhZGVyLm5hbWVdID0gYV9oZWFkZXIudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXHJcbiAgICAgICAgICAgIHR5cGU6IHhoci5yZXNwb25zZVR5cGUsXHJcbiAgICAgICAgICAgIGJvZHk6IHhoci5yZXNwb25zZSxcclxuICAgICAgICAgICAgaGVhZGVyczogY29sbGVjdGlvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgc2V0T25Db21wbGV0ZUhhbmRsZXIoeGhyLCByZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNyZWF0ZVJlc3BvbnNlT2JqZWN0KHhocikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBSZXR1cm5lZCBIVFRQICR7eGhyLnN0YXR1c31gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBhZGRBbnlIZWFkZXJzKHhocikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RIZWFkZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaGVhZGVyIG9mIHRoaXMucmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlci5uYW1lLCBoZWFkZXIudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0SGFuZGxlcnMoeGhyKSB7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgSHR0cFByb21pc2UodGhpcyk7XHJcbiAgICAgICAgcHJvbWlzZS5jcmVhdGVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFcnJvckhhbmRsZXJzKHhociwgcmVqZWN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRPbkNvbXBsZXRlSGFuZGxlcih4aHIsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5b2RIUndMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdPMGRCU1VjN1FVRkpTQ3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUXpORExFOUJRVThzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxITkNRVUZ6UWl4RFFVRkRPMEZCUTNoRUxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVVXNUVUZCVFN4cFFrRkJhVUlzUTBGQlF6dEJRVVV2UXl4UFFVRlBMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzWjBKQlFXZENMRU5CUVVNN1FVRkZOME1zVFVGQlRTeFBRVUZQTEVsQlFVazdTVUZaWmp0UlFVTkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTnNReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTjBRaXhKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTm1MRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTTNRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTjBRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEZOQlFWTXNRMEZCUXp0UlFVTTFRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU14UXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUlVRc1NVRkJTU3hEUVVGRExGRkJRWE5DTEVWQlFVVXNVVUZCWjBJc1JVRkJSU3hKUVVGaE8xRkJRekZFTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1VVRkJVU3hEUVVGRE8xRkJRM3BDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMnBDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1VVRkJVU3hEUVVGRE8xRkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFMUJRVTBzUTBGQlF5eEpRVUZYTEVWQlFVVXNTMEZCWVR0UlFVTXZRaXhKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRja1FzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1dVRkJXU3hEUVVGRExFbEJRWE5DTzFGQlEycERMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEZOQlFWTXNRMEZCUXl4UlFVRm5RanRSUVVONFFpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRkZCUVZFc1EwRkJRenRSUVVNeFFpeFBRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmtMRU5CUVVNN1NVRkZSQ3hQUVVGUExFTkJRVVVzU1VGQk5rSTdVVUZEY0VNc1NVRkJTU3hSUVVGUkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTXhRaXhSUVVGUkxFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNN1VVRkRiRU1zVVVGQlVTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8xRkJRekZDTEZGQlFWRXNRMEZCUXl4UlFVRlJMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU5zUXl4UlFVRlJMRU5CUVVNc1kwRkJZeXhIUVVGSExFbEJRVWtzUzBGQlN5eEZRVUZqTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dFJRVU01UlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdVVUZETVVJc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRPMUZCUXpsQ0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVNeFFpeFJRVUZSTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03VVVGRGRFTXNVVUZCVVN4RFFVRkRMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETzFGQlF6RkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVU5tTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxFbEJRVWtzUTBGQlF5eE5RVUZyUWl4RlFVRkZMRWxCUVZrc1JVRkJSU3hKUVVGVk8xRkJReTlETEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRE8xRkJRM0pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMnBDTEVsQlFVa3NUMEZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExGRkJRVkVzUlVGQlJUdFpRVU0zUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dFRRVU5zUWp0aFFVRk5PMWxCUTB3c1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xTkJRMnhETzFGQlJVUXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTTdVVUZETTBJc1NVRkJTU3hWUVVGVkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVVXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZCTzFGQlEzUkVMRWxCUVVrc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNUVUZCVFN4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVVndSU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRM0JETEVsQlFVa3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZEY0VNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTjRRaXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOd1FpeFBRVUZQTEU5QlFVOHNRMEZCUXp0SlFVTnFRaXhEUVVGRE8wbEJSVThzYlVKQlFXMUNPMUZCUTNwQ0xFbEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4SlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NTVUZCU1N4RlFVRkZMRU5CUVVNN1pVRkRka1FzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4SlFVRkpMRmxCUVZrc1EwRkJReXhMUVVGTExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNN1pVRkRla1FzU1VGQlNTeERRVUZETEZGQlFWRXNTVUZCU1N4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGSE8xbEJRM2hETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1UwRkJVeXhEUVVGRE8xTkJRM1pDTzBsQlEwZ3NRMEZCUXp0SlFVVlBMR1ZCUVdVc1EwRkJReXhIUVVGWE8xRkJRMnBETEVsQlFVa3NSMEZCUnl4SFFVRkhMRWxCUVVrc1kwRkJZeXhGUVVGRkxFTkJRVU03VVVGREwwSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlF6ZENMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNelFpeFBRVUZQTEVkQlFVY3NRMEZCUXp0SlFVTmlMRU5CUVVNN1NVRkZUeXhuUWtGQlowSXNRMEZCUXl4SFFVRnRRaXhGUVVGRkxFMUJRWFZDTzFGQlEyNUZMRWRCUVVjc1EwRkJReXhQUVVGUExFZEJRVWNzUjBGQlJ5eEZRVUZGTzFsQlEycENMRTFCUVUwc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMUZCUXpWQ0xFTkJRVU1zUTBGQlF6dFJRVU5HTEVkQlFVY3NRMEZCUXl4VFFVRlRMRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRMjVDTEUxQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRSUVVOMFFpeERRVUZETEVOQlFVTTdVVUZEUml4SFFVRkhMRU5CUVVNc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4TlFVRk5MRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXp0UlFVTTFRaXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVOHNiMEpCUVc5Q0xFTkJRVU1zUjBGQmJVSTdVVUZET1VNc1NVRkJTU3hQUVVGUExFZEJRVWNzUjBGQlJ6dGhRVU5rTEhGQ1FVRnhRaXhGUVVGRkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXp0aFFVTnlReXhIUVVGSExFTkJRVVVzVjBGQlZ5eERRVUZETEVWQlFVVTdXVUZEYkVJc1NVRkJTU3hMUVVGTExFZEJRVWNzVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVF5eEpRVUZKTEV0QlFVc3NTVUZCU1N4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFTkJRVU1zUlVGQlJUdG5Ra0ZET1VJc1QwRkJiVUlzUlVGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVNc1EwRkJRenRoUVVOMFJEdHBRa0ZCVFR0blFrRkRUQ3hQUVVGUExGTkJRVk1zUTBGQlF6dGhRVU5zUWp0UlFVTklMRU5CUVVNc1EwRkJRenRoUVVORUxFMUJRVTBzUTBGQlJTeEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1NVRkJTU3hUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU4wUXl4SlFVRkpMRlZCUVZVc1IwRkJLMElzUlVGQlJTeERRVUZETzFGQlEyaEVMRXRCUVVrc1NVRkJTU3hIUVVGSExFbEJRVWtzVDBGQlR5eEZRVUZGTzFsQlEzUkNMRWxCUVVrc1VVRkJVU3hIUVVGSExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTFRaXhKUVVGSkxGRkJRVkVzUlVGQlJUdG5Ra0ZEV2l4VlFVRlZMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNN1lVRkROVU03VTBGRFJqdFJRVVZFTEVsQlFVa3NVVUZCVVN4SFFVRnJRanRaUVVNMVFpeE5RVUZOTEVWQlFVVXNSMEZCUnl4RFFVRkRMRTFCUVUwN1dVRkRiRUlzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4WlFVRlpPMWxCUTNSQ0xFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNVVUZCVVR0WlFVTnNRaXhQUVVGUExFVkJRVVVzVlVGQlZUdFRRVU53UWl4RFFVRkRPMUZCUTBZc1QwRkJUeXhSUVVGUkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFVVlBMRzlDUVVGdlFpeERRVU14UWl4SFFVRnRRaXhGUVVOdVFpeFBRVUYzUXl4RlFVTjRReXhOUVVFMFFqdFJRVVUxUWl4SFFVRkhMRU5CUVVNc2EwSkJRV3RDTEVkQlFVY3NSMEZCUnl4RlFVRkZPMWxCUXpWQ0xFbEJRVWtzUjBGQlJ5eERRVUZETEZWQlFWVXNTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJRM1pDTEVsQlFVa3NSMEZCUnl4RFFVRkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFVkJRVVU3YjBKQlEzSkNMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dHBRa0ZEZWtNN2NVSkJRVTA3YjBKQlEwd3NUVUZCVFN4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1EwRkJRenRwUWtGRGRrTTdZVUZEUmp0UlFVTklMRU5CUVVNc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlR5eGhRVUZoTEVOQlFVTXNSMEZCYlVJN1VVRkRka01zU1VGQlNTeEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVU3V1VGRGJFTXNTMEZCU1N4SlFVRkpMRTFCUVUwc1NVRkJTU3hKUVVGSkxFTkJRVU1zWTBGQll5eEZRVUZGTzJkQ1FVTnlReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1lVRkRha1E3VTBGRFJqdEpRVU5JTEVOQlFVTTdTVUZGVHl4WFFVRlhMRU5CUVVNc1IwRkJiVUk3VVVGRGNrTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1NVRkJTU3hYUVVGWExFTkJRV1VzU1VGQlNTeERRVUZETEVOQlFVRTdVVUZEYWtRc1QwRkJUeXhEUVVGRExHRkJRV0VzUTBGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1JVRkJSVHRaUVVONlF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUjBGQlJ5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMWxCUTI1RExFbEJRVWtzUTBGQlF5eHZRa0ZCYjBJc1EwRkJReXhIUVVGSExFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTJ4RUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4UFFVRlBMRU5CUVVNN1NVRkRha0lzUTBGQlF6dERRVU5HSW4wPSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHsgcHJvdmlkZXNBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBEb21FbGVtZW50IH0gZnJvbSAnLi9kb20tZWxlbWVudCc7XHJcbmltcG9ydCB7IE5vbkVsZW1lbnQgfSBmcm9tICcuL25vbi1lbGVtZW50JztcclxuaW1wb3J0IHsgVGFnLCBjcmVhdGVFdmVudFNldCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuZXhwb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XHJcbmV4cG9ydCB7IEh0dHBNZXRob2QgfSBmcm9tIFwiLi9odHRwLW1ldGhvZFwiO1xyXG5leHBvcnQgeyBIdHRwUmVzcG9uc2VUeXBlIH0gZnJvbSBcIi4vaHR0cC1yZXNwb25zZS10eXBlXCI7XHJcbmV4cG9ydCB7IEh0dHBQcm90b2NvbCB9IGZyb20gXCIuL2h0dHAtcHJvdG9jb2xcIjtcclxuLyoqXHJcbiAqIExpc3Qgb2YgZXZlbnRzIGZvciBjb252ZW5pZW5jZSB3aXRoIGludGVsbGktc2Vuc2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRzID0gY3JlYXRlRXZlbnRTZXQoKTtcclxuY2xhc3MgRG9tRmx1aWREb2N1bWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIGZpbmRFbGVtZW50KGFyZykge1xyXG4gICAgICAgIGxldCBpZCA9IGFyZ1snaWQnXTtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0RWxlbWVudEZyb21JZChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGFyZ1snc2VsZWN0b3InXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0RWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTm9uRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbChhcmcpIHtcclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBhcmdbJ3NlbGVjdG9yJ107XHJcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEb21FbGVtZW50LmdldExpc3RGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX2NsYXNzID0gYXJnWydjbGFzcyddO1xyXG4gICAgICAgIGlmIChfY2xhc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21DbGFzcyhfY2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFnTmFtZSA9IGFyZ1sndGFnTmFtZSddO1xyXG4gICAgICAgIGlmICh0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEb21FbGVtZW50LmdldExpc3RGcm9tVGFnTmFtZSh0YWdOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgYnV0dG9uT24oZXZlbnRJbmZvKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVzQWxsKFsnaWQnLCAnZXZlbnQnLCAnaGFuZGxlciddLCBldmVudEluZm8pKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGV2ZW50SW5mby5pZDtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IHRoaXMuZmluZEVsZW1lbnQoeyBpZDogaWQgfSkuZXhwZWN0KFRhZy5CdXR0b24pO1xyXG4gICAgICAgICAgICBidXR0b24ub24oZXZlbnRJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHRoZSBCcm93c2VyIGltcGxlbWVudGF0aW9uXHJcbiAqIG9mIEZsdWlkIERPTS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBEb2MoKSB7XHJcbiAgICByZXR1cm4gbmV3IERvbUZsdWlkRG9jdW1lbnQoKTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2labXgxYVdRdFpHOXRMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyWnNkV2xrTFdSdmJTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN096dEhRVWxITzBGQlIwZ3NUMEZCVHl4RlFVRmxMRmRCUVZjc1JVRkJSU3hOUVVGTkxGRkJRVkVzUTBGQlFUdEJRVU5xUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZCTzBGQlRURkRMRTlCUVU4c1JVRkJSU3hWUVVGVkxFVkJRVVVzVFVGQlRTeGxRVUZsTEVOQlFVTTdRVUZOTTBNc1QwRkJUeXhGUVVGRkxFZEJRVWNzUlVGQldTeGpRVUZqTEVWQlFVVXNUVUZCVFN4aFFVRmhMRU5CUVVNN1FVRkZOVVFzVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4TlFVRk5MRkZCUVZFc1EwRkJRenRCUVVNNVFpeFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGRE8wRkJRek5ETEU5QlFVOHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeE5RVUZOTEhOQ1FVRnpRaXhEUVVGRE8wRkJRM2hFTEU5QlFVOHNSVUZCUlN4WlFVRlpMRVZCUVVVc1RVRkJUU3hwUWtGQmFVSXNRMEZCUXp0QlFVY3ZRenM3UjBGRlJ6dEJRVU5JTEUxQlFVMHNRMEZCUXl4TlFVRk5MRTFCUVUwc1IwRkJZU3hqUVVGakxFVkJRVVVzUTBGQlF6dEJRVWxxUkN4TlFVRk5MR2RDUVVGblFqdEpRVVZ3UWp0SlFVTkJMRU5CUVVNN1NVRkZSQ3hYUVVGWExFTkJRVU1zUjBGQmEwSTdVVUZETlVJc1NVRkJTU3hGUVVGRkxFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTI1Q0xFbEJRVWtzUlVGQlJTeEZRVUZGTzFsQlEwNHNUMEZCVHl4VlFVRlZMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRlRU03VVVGRlJDeEpRVUZKTEZGQlFWRXNSMEZCUnl4SFFVRkhMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03VVVGREwwSXNTVUZCU1N4UlFVRlJMRVZCUVVVN1dVRkRXaXhQUVVGUkxGVkJRVlVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFRRVU55UkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hWUVVGVkxFVkJRVVVzUTBGQlF6dEpRVU14UWl4RFFVRkRPMGxCUlVRc1QwRkJUeXhEUVVGRExFZEJRWE5DTzFGQlF6VkNMRWxCUVVrc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTXZRaXhKUVVGSExGRkJRVkVzUlVGQlJUdFpRVU5ZTEU5QlFVOHNWVUZCVlN4RFFVRkRMRzFDUVVGdFFpeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMU5CUTJwRU8xRkJSVVFzU1VGQlNTeE5RVUZOTEVkQlFVY3NSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRekZDTEVsQlFVa3NUVUZCVFN4RlFVRkZPMWxCUTFZc1QwRkJUeXhWUVVGVkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VTBGRE5VTTdVVUZGUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZETjBJc1NVRkJTU3hQUVVGUExFVkJRVVU3V1VGRFdDeFBRVUZQTEZWQlFWVXNRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0VFFVTXZRenRSUVVWRUxFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRkZCUVZFc1EwRkJReXhUUVVFeVFqdFJRVU5zUXl4SlFVRkpMRmRCUVZjc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVWQlFVVXNVMEZCVXl4RFFVRkRMRVZCUVVNc1UwRkJVeXhEUVVGRExFVkJRVVU3V1VGRGNrUXNTVUZCU1N4RlFVRkZMRWRCUVVjc1UwRkJVeXhEUVVGRExFVkJRVVVzUTBGQlFUdFpRVU55UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEVWQlFVTXNSVUZCUlN4RlFVRkZMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRVHRaUVVNeFJDeE5RVUZOTEVOQlFVTXNSVUZCUlN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGQk8xTkJRM0pDTzBsQlEwZ3NRMEZCUXp0RFFVVkdPMEZCUlVRN096dEhRVWRITzBGQlEwZ3NUVUZCVFN4VlFVRlZMRWRCUVVjN1NVRkRha0lzVDBGQlR5eEpRVUZKTEdkQ1FVRm5RaXhGUVVGRkxFTkJRVU03UVVGRGFFTXNRMEZCUXlKOSJdLCJuYW1lcyI6WyJIdHRwTWV0aG9kIiwiSHR0cFJlc3BvbnNlVHlwZSIsIkh0dHBQcm90b2NvbCJdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQUNBLElBQU8sU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtJQUN4QyxJQUFJLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLEtBQUssSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO0lBQ2xDLFFBQVEsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN0RCxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDdkIsWUFBWSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDdEUsU0FBUztJQUNULEtBQUs7SUFDTCxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtJQUNuQixRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLFFBQVEsT0FBTyxLQUFLLENBQUM7SUFDckIsS0FBSztJQUNMLElBQUksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7SUNsQkQ7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQUNBLElBQU8sTUFBTSxNQUFNLENBQUM7SUFDcEIsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO0lBQ3hCLFFBQVEsSUFBSSxNQUFNLEVB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

