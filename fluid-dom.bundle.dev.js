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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1aWQtZG9tLmJ1bmRsZS5kZXYuanMiLCJzb3VyY2VzIjpbImpzL3NyYy91dGlsLmpzIiwianMvc3JjL29wdGlvbi5qcyIsImpzL3NyYy9kb20tYXR0cmlidXRlcy5qcyIsImpzL3NyYy9kb20tY2xhc3Nlcy5qcyIsImpzL3NyYy9ub24tY2xhc3Nlcy5qcyIsImpzL3NyYy9ub24tYXR0cmlidXRlcy5qcyIsImpzL3NyYy9ub24tZWxlbWVudC5qcyIsImpzL3NyYy9kb20tZWxlbWVudC5qcyIsImpzL3NyYy9jb25zdGFudHMuanMiLCJqcy9zcmMvaHR0cC1tZXRob2QuanMiLCJqcy9zcmMvaHR0cC1yZXNwb25zZS10eXBlLmpzIiwianMvc3JjL2h0dHAtcHJvdG9jb2wuanMiLCJqcy9zcmMvaHR0cC1wcm9taXNlLmpzIiwianMvc3JjL2h0dHAuanMiLCJqcy9zcmMvZmx1aWQtZG9tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVzQWxsKGxpc3QsIGFyZ3MpIHtcclxuICAgIHZhciBtZXNzYWdlID0gJyc7XHJcbiAgICBmb3IgKHZhciBleHBlY3RlZEFyZyBvZiBsaXN0KSB7XHJcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gYXJnc1tleHBlY3RlZEFyZ10gIT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICghaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgbWVzc2FnZSArPSBgVmFsdWUgZm9yICR7ZXhwZWN0ZWRBcmd9IHdhcyBub3QgcHJvdmlkZWQuXFxuYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoISFtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXhwZWN0ZWQgJHtsaXN0Lmxlbmd0aH0gcGFyYW1ldGVyczpcXG4ke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVzT25lKGxpc3QsIGFyZ3MpIHtcclxuICAgIHZhciBkZWZpbml0aW9uTWlzc2luZyA9IGxpc3QuZmlsdGVyKHdvcmQgPT4gYXJnc1t3b3JkXSA9PT0gdW5kZWZpbmVkKTtcclxuICAgIHZhciBpc09uZU1hdGNoZWQgPSBkZWZpbml0aW9uTWlzc2luZy5sZW5ndGggPT09IChsaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKGlzT25lTWF0Y2hlZCkge1xyXG4gICAgICAgIHZhciBhcmd1bWVudE5hbWVzID0gbGlzdC5yZWR1Y2UoKGFyZzEsIGFyZzIpID0+IGAke2FyZzF9LCAke2FyZzJ9YCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgT25lIG9mIHRoZXNlIHBhcmFtZXRlcnMgd2VyZSBleHBlY3RlZCAke2FyZ3VtZW50TmFtZXN9IGJ1dCBub25lIGhhZCBhIGhhc1ZhbHVlIWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzT25lTWF0Y2hlZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbG9nV2FybmluZyhtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJGbHVpZERPTTogXCIgKyBtZXNzYWdlKTtcclxufVxyXG4vKipcclxuICogVGFrZXMgYW55IHR3byBhcnJheXMgYW5kIGNyZWF0ZXMgYSBuZXdcclxuICogbWVyZ2VkIGFycmF5LiBEb2VzIG5vdCBkZS1kdXBsaWNhdGUuXHJcbiAqIEBwYXJhbSBhMSAtIGZpcnN0IGFycmF5IHRvIG1lcmdlXHJcbiAqIEBwYXJhbSBhMiAtIHNlY29uZCBhcnJheSB0byBtZXJnZVxyXG4gKiBAcmV0dXJucyAtIG5ldyBhcnJheSB3aXRoIG1lcmdlZCBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlX2FycmF5KGExLCBhMikge1xyXG4gICAgbGV0IGZpbmFsID0gW107XHJcbiAgICBmaW5hbCA9IGZpbmFsLmNvbmNhdChhMSk7XHJcbiAgICBmaW5hbCA9IGZpbmFsLmNvbmNhdChhMik7XHJcbiAgICByZXR1cm4gZmluYWw7XHJcbn1cclxuLyoqXHJcbiAqIFRha2VzIGFuIGFycmF5IHJlZmVyZW5jZSBhbmQgZW1wdGllcyBhbGxcclxuICogY29udGVudCBmcm9tIHRoYXQgYXJyYXkuIENhbiBiZSB1c2VkIHRvXHJcbiAqIGVtcHR5IGFuIGFycmF5IHJlZmVyZW5jZSBoZWxkIGJ5IGFub3RoZXIgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB0byBlbXB0eSBvdXQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlfYXJyYXkoYXJyYXkpIHtcclxuICAgIHdoaWxlICghIWFycmF5ICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhcnJheS5wb3AoKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogTG9va3MgZm9yIGR1cGxpY2F0ZSBvYmplY3QgcmVmZXJlbmNlcyBpbiBhblxyXG4gKiBhcnJheSBhbmQgcmV0dXJucyBhIG5ldyBhcnJheSB3aXRob3V0IHRoZVxyXG4gKiBkdXBsaWNhdGVzLiBOb3QgdmVyeSBlZmZpY2llbnRcclxuICogLSB0aGlzIGlzIE8obl4yKVxyXG4gKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB0byBleGFtaW5lLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZV9kdXBzKGFycmF5KSB7XHJcbiAgICBsZXQgZGVkdXAgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGRvZXNOb3RIYXZlUmVmRXF1YWxPYmplY3QoeCkge1xyXG4gICAgICAgIHJldHVybiBkZWR1cC5pbmRleE9mKHgpIDwgMDtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGFycmF5W2luZGV4XTtcclxuICAgICAgICBpZiAoZG9lc05vdEhhdmVSZWZFcXVhbE9iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICBkZWR1cC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkZWR1cDtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWFJwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTkxZEdsc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN08wZEJTVWM3UVVGSFNDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzU1VGQlVUdEpRVU4yUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhGUVVGRkxFTkJRVUU3U1VGRGFFSXNTMEZCU1N4SlFVRkpMRmRCUVZjc1NVRkJTU3hKUVVGSkxFVkJRVVU3VVVGRE0wSXNTVUZCU1N4UlFVRlJMRWRCUVZrc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEZOQlFWTXNRMEZCUVR0UlFVTjBSQ3hKUVVGSkxFTkJRVVVzVVVGQlVTeEZRVUZGTzFsQlEyUXNUMEZCVHl4SlFVRkpMR0ZCUVdFc1YwRkJWeXh6UWtGQmMwSXNRMEZCUVR0VFFVTXhSRHRMUVVOR08wbEJRMFFzU1VGQlNTeERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZPMUZCUTJJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVsQlFVa3NRMEZCUXl4TlFVRk5MR2xDUVVGcFFpeFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkJPMUZCUTJoRkxFOUJRVThzUzBGQlN5eERRVUZCTzB0QlEySTdTVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRVHRCUVVOaUxFTkJRVU03UVVGRlJDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzU1VGQlV6dEpRVU40UkN4SlFVRkpMR2xDUVVGcFFpeEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVVc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1UwRkJVeXhEUVVGRkxFTkJRVUU3U1VGRGRrVXNTVUZCU1N4WlFVRlpMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVVXNRMEZCUVR0SlFVTnNSU3hKUVVGTExGbEJRVmtzUlVGQlJ6dFJRVU5zUWl4SlFVRkpMR0ZCUVdFc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZGTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRVHRSUVVOd1JTeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMSGxEUVVGNVF5eGhRVUZoTERKQ1FVRXlRaXhEUVVGRExFTkJRVUU3UzBGRGFrYzdTVUZEUkN4UFFVRlBMRmxCUVZrc1EwRkJRVHRCUVVOeVFpeERRVUZETzBGQlJVUXNUVUZCVFN4VlFVRlZMRlZCUVZVc1EwRkJReXhQUVVGbE8wbEJRM2hETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFOUJRVThzUTBGQlF5eERRVUZCTzBGQlEzUkRMRU5CUVVNN1FVRkZSRHM3T3pzN08wZEJUVWM3UVVGRFNDeE5RVUZOTEZWQlFWVXNWMEZCVnl4RFFVRkpMRVZCUVZrc1JVRkJSU3hGUVVGWk8wbEJRM1pFTEVsQlFVa3NTMEZCU3l4SFFVRmpMRVZCUVVVc1EwRkJRenRKUVVNeFFpeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU42UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjZRaXhQUVVGUExFdEJRVXNzUTBGQlF6dEJRVU5tTEVOQlFVTTdRVUZGUkRzN096czdSMEZMUnp0QlFVTklMRTFCUVUwc1ZVRkJWU3hYUVVGWExFTkJRVWtzUzBGQlpUdEpRVU0xUXl4UFFVRlBMRU5CUVVNc1EwRkJSU3hMUVVGTExFbEJRVWtzUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1VVRkRia01zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMHRCUTJJN1FVRkRTQ3hEUVVGRE8wRkJSVVE3T3pzN096dEhRVTFITzBGQlEwZ3NUVUZCVFN4VlFVRlZMRmRCUVZjc1EwRkRla0lzUzBGQlpUdEpRVVZtTEVsQlFVa3NTMEZCU3l4SFFVRmpMRVZCUVVVc1EwRkJRenRKUVVVeFFpeFRRVUZUTEhsQ1FVRjVRaXhEUVVGRExFTkJRVWM3VVVGRGNFTXNUMEZCVHl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVTTVRaXhEUVVGRE8wbEJSVVFzUzBGQlNTeEpRVUZKTEV0QlFVc3NSMEZCUnl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF5eE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVN1VVRkRhRVFzU1VGQlNTeEpRVUZKTEVkQlFVY3NTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NlVUpCUVhsQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdXVUZEYmtNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTnNRanRMUVVOR08wbEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdRVUZEWml4RFFVRkRJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiB1bmNlcnRhaW4gcmV0dXJuIHR5cGUuXHJcbiAqIEluIFR5cGVTY3JpcHQgaXQncyBwb3NzaWJsZSB0byByZXR1cm5cclxuICogYFR5cGUgfCB1bmRlZmluZWRgIGJ1dCBhdCBydW50aW1lIGl0IGNhblxyXG4gKiBnZXQgYSBiaXQgbWVzc3kgdG8gaGFuZGxlIHRoaXMgd2VsbC5cclxuICogVGhlIE9wdGlvbiBjbGFzcyByZXByZXNlbnRzIHRoaXMgY2xlYW5seVxyXG4gKiBhbmQgZXhwbGljaXRseSB3aGlsZSBtYWtpbmcgaXQgZWFzeVxyXG4gKiBkZXRlcm1pbmUgd2hldGhlciB0aGUgdmFsdWUgaXMgdmFsaWQgb3Igbm90XHJcbiAqIGFuZCwgaWYgdmFsaWQsIHByb3ZpZGVzIGVhc3kgd2F5cyB0byBnZXRcclxuICogdGhlIHZhbHVlIHdpdGggcHJvcGVyIHR5cGUgY29uc2lzdGVuY3kgaW5cclxuICogVHlwZVNjcmlwdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoX3ZhbHVlKSB7XHJcbiAgICAgICAgaWYgKF92YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGF0IHRoZXJlIGlzIGEgdmFsdWUgYmVmb3JlXHJcbiAgICAgKiBjYWxsaW5nIHRoaXMuXHJcbiAgICAgKiBAc2VlIGlzVmFsaWRcclxuICAgICAqL1xyXG4gICAgZ2V0IFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0cyBpZiB0aGUgdmFsdWUgaXMga25vd24uXHJcbiAgICAgKi9cclxuICAgIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYjNCMGFXOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyOXdkR2x2Ymk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0SFFVbEhPMEZCUlVnN096czdPenM3T3pzN08wZEJWMGM3UVVGRFNDeE5RVUZOTEU5QlFVOHNUVUZCVFR0SlFVZHFRaXhaUVVGWkxFMUJRVmM3VVVGRGNrSXNTVUZCU1N4TlFVRk5MRVZCUVVVN1dVRkRWaXhKUVVGSkxFTkJRVU1zUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXp0VFFVTnlRanRoUVVGTk8xbEJRMHdzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNN1UwRkRia0k3U1VGRFNDeERRVUZETzBsQlJVZzdPenM3VDBGSlJ6dEpRVU5FTEVsQlFVa3NTMEZCU3p0UlFVTlFMRTlCUVZjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUlVnN08wOUJSVWM3U1VGRFJDeEpRVUZKTEU5QlFVODdVVUZEVkN4UFFVRlBMRU5CUVVNc1EwRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzBsQlEzWkNMRU5CUVVNN1EwRkRSaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5mdW5jdGlvbiBjYXN0KGF0dHIpIHtcclxuICAgIHJldHVybiBhdHRyO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBEb21BdHRyaWJ1dGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKF93ZWJFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudCA9IF93ZWJFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBvZiB0aGlzLl93ZWJFbGVtZW50LmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlTmFtZXMoKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBhdHRyIG9mIHRoaXMuX3dlYkVsZW1lbnQuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goYXR0ci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBhZGQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KG5hbWUpO1xyXG4gICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYkVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2ViRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSkgIT0gbnVsbDtcclxuICAgIH1cclxuICAgIHJlbW92ZShuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXRjBkSEpwWW5WMFpYTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdlpHOXRMV0YwZEhKcFluVjBaWE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UjBGSlJ6dEJRVXRJTEZOQlFWTXNTVUZCU1N4RFFVRkZMRWxCUVcxQ08wbEJRMmhETEU5QlFXZERMRWxCUVVzc1EwRkJRenRCUVVONFF5eERRVUZETzBGQlJVUXNUVUZCVFN4UFFVRlBMR0ZCUVdFN1NVRkhlRUlzV1VGQldTeFhRVUZ2UWp0UlFVTTVRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEZkQlFWY3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEZGQlFUUkRPMUZCUTJ4RUxFdEJRVWtzU1VGQlNTeFRRVUZUTEVsQlFVa3NTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGRGFFUXNVVUZCVVN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUXpORE8xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1kwRkJZenRSUVVOYUxFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRlZMRU5CUVVFN1VVRkZPVUlzUzBGQlNTeEpRVUZKTEVsQlFVa3NTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGVkJRVlVzUlVGQlJUdFpRVU16UXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTjJRanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWkxFVkJRVVVzUzBGQllUdFJRVU0zUWl4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUXk5Q0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1N4RlFVRkZMRXRCUVdFN1VVRkROMElzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZCTzFGQlF6RkRMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJkVU03VVVGRGVFUXNTVUZCU1N4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVRTdVVUZEWml4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1R0UlFVTmtMRTlCUVU4c1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkROME1zUTBGQlF6dEpRVVZFTEVkQlFVY3NRMEZCUXl4SlFVRlpPMUZCUTJRc1QwRkJUeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU03U1VGRGNrUXNRMEZCUXp0SlFVVkVMRTFCUVUwc1EwRkJReXhKUVVGWk8xRkJRMnBDTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1pVRkJaU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkRMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dERRVU5HSW4wPSIsIi8qXHJcbiAqIEZsdWlkIERPTSBmb3IgSmF2YVNjcmlwdFxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTggV2Fyd2ljayBNb2xsb3lcclxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqICMgRG9tQ2xhc3Nlc1xyXG4gKlxyXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUNsYXNzZXMgaW50ZXJmYWNlIHRoYXQgYWxsb3dzIG9wZXJhdGlvbnNcclxuICogdG8gYmUgcGVyZm9ybWVkIG9uIERPTSBvYmplY3RzIGluIGEgYnJvd3Nlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb21DbGFzc2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50LCBlbGVtZW50T2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudE9iamVjdDtcclxuICAgICAgICB0aGlzLmh0bWxFbGVtZW50ID0gX2VsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBmb3JFYWNoKHRhc2spIHtcclxuICAgICAgICBmb3IgKHZhciBfY2xhc3Mgb2YgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgdGFzayhfY2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhhcyhuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gaWYtYW5kLW9ubHktaWYgdGhlIG5hbWVkIGNsYXNzIGlzIG9uIHRoZSBlbGVtZW50LlxyXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSAoZmx1aWQpIGVsZW1lbnQgb2JqZWN0IHRvIGFsbG93IHRoaW5ncyB0b1xyXG4gICAgICogYmUgZG9uZSB3aXRoIGl0LiBSZXR1cm5zIHNlbGYuXHJcbiAgICAgKiBAcGFyYW0gbmFtZS0gSFRNTCBjbGFzcyBuYW1lIHRvIHNlZWtcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjay0gY2FsbGJhY2sgdG8gcnVuIHRvIG1hbmlwdWxhdGUgdGhlIGVsZW1lbnQgaWYgcHJlc2VudC5cclxuICAgICAqL1xyXG4gICAgd2hlbkhhcyhuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZChfY2xhc3MpIHtcclxuICAgICAgICBpZiAoISFfY2xhc3MgJiYgX2NsYXNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHRtbEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHRtbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChfY2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbid0IGVkaXQgY2xhc3NlcyBvbiBEb21FbGVtZW50IHRoYXQgcHJvdmlkZXMgbm8gSFRNTEVsZW1lbnQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENsYXNzIG5hbWUgZ2l2ZW4gd2FzIFwiJHtfY2xhc3N9XCIgLSBpdCBtdXN0IG5vdCBiZSBlbXB0eSFgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoX2NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKF9jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXQoX2NsYXNzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhfY2xhc3MpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpHOXRMV05zWVhOelpYTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdlpHOXRMV05zWVhOelpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVMUlPenM3T3p0SFFVdEhPMEZCUTBnc1RVRkJUU3hQUVVGUExGVkJRVlU3U1VGSmNrSXNXVUZCV1N4UlFVRnBRaXhGUVVGRkxHRkJRWGxDTzFGQlEzUkVMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzWVVGQllTeERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzVVVGQlVTeERRVUZETzBsQlF6bENMRU5CUVVNN1NVRkZSQ3hQUVVGUExFTkJRVU1zU1VGQlowTTdVVUZEZEVNc1MwRkJTU3hKUVVGSkxFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1JVRkJSVHRaUVVNMVF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFN1UwRkRZanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWRCUVVjc1EwRkJReXhKUVVGWk8xRkJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEYmtRc1EwRkJRenRKUVVWSU96czdPenM3VDBGTlJ6dEpRVU5FTEU5QlFVOHNRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJiME03VVVGRGVFUXNTVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTzFsQlEyeENMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVMEZEZUVJN1VVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1RVRkJZenRSUVVOb1FpeEpRVUZKTEVOQlFVTXNRMEZCUlN4TlFVRk5MRWxCUVVrc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVTdXVUZEYkVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTzJkQ1FVTndRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03WVVGRGVFTTdhVUpCUVUwN1owSkJRMHdzVFVGQlRTeExRVUZMTEVOQlFVTXNaMFZCUVdkRkxFTkJRVU1zUTBGQlF6dGhRVU12UlR0VFFVTkdPMkZCUVUwN1dVRkRUQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEhsQ1FVRjVRaXhOUVVGTkxESkNRVUV5UWl4RFFVRkRMRU5CUVVFN1UwRkRNVVU3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUVR0SlFVTmlMRU5CUVVNN1NVRkZSQ3hOUVVGTkxFTkJRVU1zVFVGQll6dFJRVU51UWl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFN1VVRkRla01zVDBGQlR5eEpRVUZKTEVOQlFVRTdTVUZEWWl4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFMUJRV003VVVGRGFFSXNTVUZCU1N4RFFVRkZMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVTdXVUZEZEVJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUVR0VFFVTnFRanRSUVVORUxFOUJRVThzU1VGQlNTeERRVUZCTzBsQlEySXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogIyBOb25DbGFzc2VzXHJcbiAqXHJcbiAqIElzIGEgbmlsLWVmZmVjdCBJQ2xhc3NlcyBpbnN0YW5jZSB0byByZXR1cm5cclxuICogaW4gYW55IHNpdHVhdGlvbiB3aGVyZSB0aGUgSUVsZW1lbnQgaW1wbGVtZW50YXRpb25cclxuICogY2Fubm90IHByb3ZpZGUgYSBiYWNraW5nIGZvciB0aGUgc3R5bGUgY2xhc3NlcyBmcm9tXHJcbiAqIGEgZG9jdW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9uQ2xhc3NlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFzKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB3aGVuSGFzKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGQoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXQoX2NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05dUxXTnNZWE56WlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXTnNZWE56WlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVV0SU96czdPenM3TzBkQlQwYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1ZVRkJWVHRKUVVOeVFpeG5Ra0ZCWlN4RFFVRkRPMGxCUldoQ0xFOUJRVThzUTBGQlF5eFJRVUZ4UXp0UlFVTXpReXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4SFFVRkhMRU5CUVVNc1NVRkJXVHRSUVVOa0xFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMRTlCUVU4c1EwRkJReXhKUVVGWkxFVkJRVVVzVVVGQmNVTTdVVUZEZWtRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNSMEZCUnl4RFFVRkRMRTFCUVdNN1VVRkRhRUlzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFMUJRV003VVVGRGJrSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEUxQlFXTTdVVUZEYUVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBOQlEwWWlmUT09IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogUmVwcmVzZW50cyBhIG5vbi1hdHRyaWJ1dGVzIGluc3RhbmNlLCB0byBiZSByZXR1cm5lZFxyXG4gKiB3aGVuIG5vIGVmZmVjdGl2ZSBhdHRyaWJ1dGVzIGluc3RhbmNlIGNhbiBiZSBwcm92aWRlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb25BdHRyaWJ1dGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVOYW1lcygpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBhZGQobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0KG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGhhcyhuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTl1TFdGMGRISnBZblYwWlhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXRjBkSEpwWW5WMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVbElPenM3UjBGSFJ6dEJRVU5JTEUxQlFVMHNUMEZCVHl4aFFVRmhPMGxCUTNoQ0xHZENRVUZsTEVOQlFVTTdTVUZGYUVJc1QwRkJUeXhEUVVGRExGRkJRU3RETzFGQlEzSkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEdOQlFXTTdVVUZEV2l4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1N4RlFVRkZMRXRCUVdFN1VVRkROMElzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1IwRkJSeXhEUVVGRExFbEJRVmtzUlVGQlJTeExRVUZoTzFGQlF6ZENMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4SlFVRlpMRVZCUVVVc1VVRkJkME03VVVGRGVrUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzUjBGQlJ5eERRVUZETEVsQlFWazdVVUZEWkN4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeEhRVUZITEVOQlFVTXNTVUZCV1R0UlFVTmtMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVU5FTEUxQlFVMHNRMEZCUXl4SlFVRlpPMUZCUTJwQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0RFFVTkdJbjA9IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBOb25BdHRyaWJ1dGVzIH0gZnJvbSAnLi9ub24tYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7IE5vbkNsYXNzZXMgfSBmcm9tICcuL25vbi1jbGFzc2VzJztcclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBub24tZWxlbWVudC4gVG8gYmUgcmV0dXJuZWQgaW4gYW5zd2VyXHJcbiAqIGZvciBhbiBlbGVtZW50IGJ1dCBvbmUgY2Fubm90IGJlIHByb3ZpZGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vbkVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIGlzVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UGFyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgd2l0aENoaWxkcmVuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBleHBlY3QodGFnTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBoYXNJZCgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBleGlzdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbChlbGVtZW50TGlzdExvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0Rmlyc3Qoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbGVjdG9yUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB0YWdOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHRleHQoX3RleHQpIHtcclxuICAgICAgICBpZiAoX3RleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaHRtbChfaHRtbCkge1xyXG4gICAgICAgIGlmIChfaHRtbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHBlbmQoX2h0bWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHByZXBlbmQoX2h0bWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE5vbkF0dHJpYnV0ZXMoKTtcclxuICAgIH1cclxuICAgIGNsYXNzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25DbGFzc2VzKCk7XHJcbiAgICB9XHJcbiAgICBvbihhcmdzKSB7IH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05dUxXVnNaVzFsYm5RdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Ym05dUxXVnNaVzFsYm5RdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVZGSUxFOUJRVThzUlVGQlJTeGhRVUZoTEVWQlFVVXNUVUZCVFN4clFrRkJhMElzUTBGQlF6dEJRVU5xUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlJ6TkRPenM3UjBGSFJ6dEJRVU5JTEUxQlFVMHNUMEZCVHl4VlFVRlZPMGxCUlhKQ0xHZENRVUZsTEVOQlFVTTdTVUZGYUVJc1QwRkJUenRSUVVOTUxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMRk5CUVZNN1VVRkRVQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4WlFVRlpMRU5CUVVNc1VVRkJiME03VVVGREwwTXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEU5QlFXVTdVVUZEY0VJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNTMEZCU3p0UlFVTklMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEV0QlFVczdVVUZEU0N4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVObUxFTkJRVU03U1VGRlJDeE5RVUZOTzFGQlEwb3NUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRaaXhEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEcxQ1FVRnpRenRSUVVNMVF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0SlFVTmFMRU5CUVVNN1NVRkZSQ3hYUVVGWExFTkJRVU1zVVVGQlowSTdVVUZETVVJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNXVUZCV1R0UlFVTldMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRMW9zUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU03U1VGRlJDeEpRVUZKTEVOQlFVTXNTMEZCTUVJN1VVRkROMElzU1VGQlNTeExRVUZMTEVWQlFVVTdXVUZEVkN4UFFVRlBMRWxCUVVrc1EwRkJRenRUUVVOaU8yRkJRVTA3V1VGRFRDeFBRVUZQTEVWQlFVVXNRMEZCUXp0VFFVTllPMGxCUTBnc1EwRkJRenRKUVVWRUxFbEJRVWtzUTBGQlF5eExRVUV3UWp0UlFVTTNRaXhKUVVGSkxFdEJRVXNzUlVGQlJUdFpRVU5VTEU5QlFVOHNTVUZCU1N4RFFVRkRPMU5CUTJJN1lVRkJUVHRaUVVOTUxFOUJRVThzUlVGQlJTeERRVUZETzFOQlExZzdTVUZEU0N4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFdEJRV0U3VVVGRGJFSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVDBGQlR5eERRVUZETEV0QlFXRTdVVUZEYmtJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUVUZCVFR0UlFVTktMRTlCUVU4c1UwRkJVeXhEUVVGRE8wbEJRMjVDTEVOQlFVTTdTVUZGUkN4VlFVRlZPMUZCUTFJc1QwRkJUeXhKUVVGSkxHRkJRV0VzUlVGQlJTeERRVUZETzBsQlF6ZENMRU5CUVVNN1NVRkZSQ3hQUVVGUE8xRkJRMHdzVDBGQlR5eEpRVUZKTEZWQlFWVXNSVUZCUlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRFJDeEZRVUZGTEVOQlFVTXNTVUZCYzBJc1NVRkJWeXhEUVVGRE8wbEJSWEpETEV0QlFVczdVVUZEU0N4UFFVRlBMRk5CUVZNc1EwRkJRenRKUVVOdVFpeERRVUZETzBOQlEwWWlmUT09IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IHByb3ZpZGVzQWxsIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgRG9tQXR0cmlidXRlcyB9IGZyb20gJy4vZG9tLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgeyBEb21DbGFzc2VzIH0gZnJvbSAnLi9kb20tY2xhc3Nlcyc7XHJcbmltcG9ydCB7IE5vbkNsYXNzZXMgfSBmcm9tICcuL25vbi1jbGFzc2VzJztcclxuaW1wb3J0IHsgTm9uQXR0cmlidXRlcyB9IGZyb20gJy4vbm9uLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgeyBOb25FbGVtZW50IH0gZnJvbSAnLi9ub24tZWxlbWVudCc7XHJcbi8qKlxyXG4gKiBAcHJpdmF0ZSBhbiBpbnRlcm5hbCBmdW5jdGlvbi5cclxuICogQHBhcmFtIGNvbGxlY3Rpb24gSFRNTCBjb2xsZWN0aW9uIHRvIGNvbnZlcnQgaW50byBhcnJheSBvZiBJRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydEh0bWxDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcclxuICAgIGxldCBsaXN0ID0gW107XHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY29sbGVjdGlvbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBjb2xsZWN0aW9uW2luZGV4XTtcclxuICAgICAgICBsaXN0LnB1c2gobmV3IERvbUVsZW1lbnQoY2hpbGQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcbi8qKlxyXG4gKiBAcHJpdmF0ZSBhbiBpbnRlcm5hbCBmdW5jdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIHNlbGVjdG9yUGF0aChlbGVtZW50KSB7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGAjeyRpZH1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBlbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRoID0gYCR7c2VsZWN0b3JQYXRoKGVsZW1lbnQucGFyZW50RWxlbWVudCl9PiR7ZWxlbWVudC50YWdOYW1lfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuLyoqXHJcbiAqIEBwcml2YXRlIGFuIGludGVybmFsIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QnlTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvcikge1xyXG4gICAgbGV0IGZpcnN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3RvclBhdGgoZWxlbWVudCl9PiR7c2VsZWN0b3J9YCk7XHJcbiAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4vKipcclxuICogIyBEb21FbGVtZW50XHJcbiAqXHJcbiAqIFRoZSBpbXBsZW1lbnRhdGlvbiBJRWxlbWVudCBmb3IgZWxlbWVudHMgaW4gdGhlIGJyb3dzZXJcclxuICogcGFnZSBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRG9tRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5kb21FbGVtZW50ID0gbmV3IE9wdGlvbihlbGVtZW50KTtcclxuICAgIH1cclxuICAgIGFsZXJ0SW52YWxpZCgpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiSUVsZW1lbnRbRG9tRWxlbWVudF0gaXMgaW52YWxpZC5cIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQgdXNpbmcgYSBzZWxlY3Rvci5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIENTUyBzdHlsZSBzZWxlY3Rvci5cclxuICAgICAqIEByZXR1cm5zIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRMaXN0RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gY29udmVydEh0bWxDb2xsZWN0aW9uKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBlbGVtZW50cyBpbiBhIGRvY3VtZW50IHVzaW5nIGEgY2xhc3MgbmFtZS5cclxuICAgICAqIE5vdGUgZG8gbm90IHByZWZpeCB3aXRoIGEgcGVyaW9kIChgLmApIC0ganVzdCBwcm92aWRlXHJcbiAgICAgKiB0aGUgcHVyZSBjbGFzcyBuYW1lLlxyXG4gICAgICogQHBhcmFtIGNsYXNzIC0gcHVyZSBjbGFzcyBuYW1lLlxyXG4gICAgICogQHJldHVybnMgbGlzdCBvZiBtYXRjaGluZyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExpc3RGcm9tQ2xhc3MoX2NsYXNzKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtfY2xhc3N9YCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRIdG1sQ29sbGVjdGlvbihsaXN0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgZWxlbWVudHMgaW4gYSBkb2N1bWVudCB1c2luZyBhIHRhZy1uYW1lLlxyXG4gICAgICogQHBhcmFtIHRhZ05hbWUgLSB0YWcgbmFtZSAoY2FzZSBpbnNlbnNpdGl2ZSkuXHJcbiAgICAgKiBAcmV0dXJucyBsaXN0IG9mIG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TGlzdEZyb21UYWdOYW1lKHRhZ05hbWUpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFnTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRIdG1sQ29sbGVjdGlvbihsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50RnJvbUlkKGlkKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuICAgICAgICByZXR1cm4gRG9tRWxlbWVudC5tYWtlRnJvbUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGZpcnN0IG1hdGNoaW5nIGVsZW1lbnQgZnJvbSBhIGRvY3VtZW50LlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gYSBDU1Mgc3R5bGUgc2VsZWN0b3JcclxuICAgICAqIEByZXR1cm5zIGFuIGVsZW1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0RWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQubWFrZUZyb21FbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG1ha2VGcm9tRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICghIWVsZW1lbnQpID8gbmV3IERvbUVsZW1lbnQoZWxlbWVudCkgOiBuZXcgTm9uRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgaXNWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlzVmFsaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgX3BhciA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgbGV0IHBhcmVudDtcclxuICAgICAgICAgICAgcGFyZW50ID0gX3BhciA/IG5ldyBEb21FbGVtZW50KF9wYXIpIDogbmV3IERvbUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOb25FbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICB3aXRoQ2hpbGRyZW4oY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQgJiYgdGhpcy5kb21FbGVtZW50LlZhbHVlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBjb252ZXJ0SHRtbENvbGxlY3Rpb24odGhpcy5kb21FbGVtZW50LlZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sobGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZXhwZWN0KHRhZ05hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZS50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGxldCBleHBlY3RlZCA9IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXhwZWN0ZWQgJHtleHBlY3RlZH0gYnV0IEFjdHVhbCB0YWdOYW1lIHdhcyAke2FjdHVhbH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzKCkuZ2V0KCdpZCcpO1xyXG4gICAgfVxyXG4gICAgaGFzSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcygpLmhhcygnaWQnKTtcclxuICAgIH1cclxuICAgIGV4aXN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCk7XHJcbiAgICB9XHJcbiAgICBmaW5kQWxsKGVsZW1lbnRMaXN0TG9jYXRpb24pIHtcclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBlbGVtZW50TGlzdExvY2F0aW9uWydzZWxlY3RvciddIHx8IGVsZW1lbnRMaXN0TG9jYXRpb25bJ3RhZ05hbWUnXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLmRvbUVsZW1lbnQuVmFsdWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gY29udmVydEh0bWxDb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0Rmlyc3Qoc2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gZ2V0QnlTZWxlY3Rvcih0aGlzLmRvbUVsZW1lbnQuVmFsdWUsIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbUVsZW1lbnQoZmlyc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0b3JQYXRoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JQYXRoKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnRJbnZhbGlkKCk7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdGFnTmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5WYWx1ZS50YWdOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgIHJldHVybiAnVU5LTk9XTic7XHJcbiAgICB9XHJcbiAgICB0ZXh0KF90ZXh0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LlZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoISFfdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBfdGV4dDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0SW52YWxpZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaHRtbChfaHRtbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKCEhX2h0bWwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gX2h0bWw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGVuZChfaHRtbCkge1xyXG4gICAgICAgIHZhciB0b3RhbEh0bWwgPSBgJHt0aGlzLmh0bWwoKX0ke19odG1sfWA7XHJcbiAgICAgICAgdGhpcy5odG1sKHRvdGFsSHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwcmVwZW5kKF9odG1sKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsSHRtbCA9IGAke19odG1sfSR7dGhpcy5odG1sKCl9YDtcclxuICAgICAgICB0aGlzLmh0bWwodG90YWxIdG1sKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LlZhbHVlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydEludmFsaWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tQXR0cmlidXRlcyh0aGlzLmRvbUVsZW1lbnQuVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb25BdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21DbGFzc2VzKHRoaXMuZG9tRWxlbWVudC5WYWx1ZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTm9uQ2xhc3NlcygpO1xyXG4gICAgfVxyXG4gICAgb24oYXJncykge1xyXG4gICAgICAgIGlmIChwcm92aWRlc0FsbChbJ2V2ZW50JywgJ2hhbmRsZXInXSwgYXJncykgJiYgdGhpcy5kb21FbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gYXJncy5ldmVudDtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBhcmdzLmhhbmRsZXI7XHJcbiAgICAgICAgICAgIHZhciBvcHRLZWVwRGVmYXVsdCA9IGFyZ3Mua2VlcERlZmF1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5WYWx1ZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAoZmlyZWRFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRLZWVwRGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmVkRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhhbmRsZXIoZmlyZWRFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvbUVsZW1lbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbJ3ZhbHVlJ10pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWkc5dExXVnNaVzFsYm5RdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Wkc5dExXVnNaVzFsYm5RdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN1IwRkpSenRCUVVWSUxFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4VlFVRlZMRU5CUVVNN1FVRkZiRU1zVDBGQlR5eEZRVUZsTEZkQlFWY3NSVUZCWXl4TlFVRk5MRkZCUVZFc1EwRkJRVHRCUVVNM1JDeFBRVUZQTEVWQlFVVXNZVUZCWVN4RlFVRkZMRTFCUVUwc2EwSkJRV3RDTEVOQlFVRTdRVUZEYUVRc1QwRkJUeXhGUVVGRkxGVkJRVlVzUlVGQlJTeE5RVUZOTEdWQlFXVXNRMEZCUVR0QlFVVXhReXhQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUXpORExFOUJRVThzUlVGQlJTeGhRVUZoTEVWQlFVVXNUVUZCVFN4clFrRkJhMElzUTBGQlF6dEJRVTlxUkN4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlJUTkRPenM3UjBGSFJ6dEJRVU5JTEZOQlFWTXNjVUpCUVhGQ0xFTkJRelZDTEZWQlFXZEVPMGxCUldoRUxFbEJRVWtzU1VGQlNTeEhRVUZ2UWl4RlFVRkZMRU5CUVVNN1NVRkRMMElzUzBGQlNTeEpRVUZKTEV0QlFVc3NSMEZCUnl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGSExGVkJRVlVzUTBGQlF5eE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVN1VVRkRja1FzU1VGQlNTeExRVUZMTEVkQlFXbENMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFJRVU0xUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRkxFbEJRVWtzVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkZMRU5CUVVNN1MwRkRjRU03U1VGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0QlFVTmtMRU5CUVVNN1FVRkZSRHM3UjBGRlJ6dEJRVU5JTEZOQlFWTXNXVUZCV1N4RFFVRkRMRTlCUVN0Q08wbEJRMjVFTEVsQlFVa3NTVUZCU1N4SFFVRkhMRVZCUVVVc1EwRkJRenRKUVVOa0xFbEJRVWtzVDBGQlR5eEZRVUZGTzFGQlExZ3NTVUZCU1N4RlFVRkZMRWRCUVVjc1QwRkJUeXhEUVVGRExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTndReXhKUVVGSkxFVkJRVVVzUlVGQlJUdFpRVU5PTEVsQlFVa3NSMEZCUnl4UlFVRlJMRU5CUVVNN1UwRkRha0k3WVVGQlRTeEpRVUZMTEVOQlFVVXNUMEZCVHl4RFFVRkRMR0ZCUVdFc1JVRkJSenRaUVVOd1F5eEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJRenRUUVVONFFqdGhRVUZOTzFsQlEwd3NTVUZCU1N4SFFVRkhMRWRCUVVjc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03VTBGRGNFVTdTMEZEUmp0SlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wRkJRMlFzUTBGQlF6dEJRVVZFT3p0SFFVVkhPMEZCUTBnc1UwRkJVeXhoUVVGaExFTkJRVU1zVDBGQk9FSXNSVUZCUlN4UlFVRm5RanRKUVVOeVJTeEpRVUZKTEV0QlFVc3NSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlJUVkRMRWxCUVVrc1MwRkJTeXhGUVVGRk8xRkJRMVFzVDBGQmIwSXNTMEZCU3l4RFFVRkRPMHRCUXpOQ08xTkJRVTA3VVVGRFRDeExRVUZMTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJSU3hIUVVGSExGbEJRVmtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4UlFVRlJMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM2hGTEVsQlFVa3NTMEZCU3l4RlFVRkZPMWxCUTFRc1QwRkJiMElzUzBGQlN5eERRVUZETzFOQlF6TkNPMHRCUTBZN1NVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEJRVU5rTEVOQlFVTTdRVUZIUkRzN096czdSMEZMUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhWUVVGVk8wbEJSM0pDTEZsQlFXTXNUMEZCSzBJN1VVRkRNME1zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRTFCUVUwc1EwRkJORUlzVDBGQlR5eERRVUZETEVOQlFVTTdTVUZEYmtVc1EwRkJRenRKUVVWUExGbEJRVms3VVVGRGJFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhyUTBGQmEwTXNRMEZCUXl4RFFVRkRPMGxCUTNCRUxFTkJRVU03U1VGRlJEczdPenRQUVVsSE8wbEJRMGdzVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExGRkJRV1U3VVVGRGVFTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xRkJReTlETEU5QlFVOHNjVUpCUVhGQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEY2tNc1EwRkJRenRKUVVWRU96czdPenM3VDBGTlJ6dEpRVU5JTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUTBGQlF5eE5RVUZoTzFGQlEyNURMRWxCUVVrc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEYmtRc1QwRkJUeXh4UWtGQmNVSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOeVF5eERRVUZETzBsQlJVUTdPenM3VDBGSlJ6dEpRVU5JTEUxQlFVMHNRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZqTzFGQlEzUkRMRWxCUVVrc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU01UXl4UFFVRlBMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTNKRExFTkJRVU03U1VGRlJDeE5RVUZOTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUlVGQlZUdFJRVU5vUXl4SlFVRkpMRTlCUVU4c1IwRkJSeXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEVsQlFVa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNdlF5eFBRVUZQTEZWQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRE4wTXNRMEZCUXp0SlFVVkVPenM3TzA5QlNVYzdTVUZEU0N4TlFVRk5MRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNVVUZCWjBJN1VVRkROVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVU12UXl4UFFVRlBMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZETjBNc1EwRkJRenRKUVVWUExFMUJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCY1VNN1VVRkRiRVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeFZRVUZWTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdTVUZEYkVVc1EwRkJRenRKUVVWRUxFOUJRVTg3VVVGRFRDeFBRVUZQTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhEUVVGRE8wbEJRMnBETEVOQlFVTTdTVUZGUkN4VFFVRlRPMUZCUTFBc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFOUJRVThzUjBGQmFVSXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGJFUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExHRkJRV0VzUTBGQlF6dFpRVU5xUXl4SlFVRkpMRTFCUVd0Q0xFTkJRVU03V1VGRGRrSXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeFZRVUZWTEVOQlFXVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdXVUZEZEVVc1QwRkJUeXhOUVVGTkxFTkJRVU03VTBGRFpqdFJRVU5FTEU5QlFVOHNTVUZCU1N4VlFVRlZMRVZCUVVVc1EwRkJRenRKUVVNeFFpeERRVUZETzBsQlJVUXNXVUZCV1N4RFFVRkRMRkZCUVhORE8xRkJRMnBFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFbEJRVWtzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVTdXVUZEZUVVc1NVRkJTU3hKUVVGSkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVVc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkRiRVVzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTJoQ08xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1RVRkJUU3hEUVVGRExFOUJRV1U3VVVGRGNFSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJUdFpRVU16UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03V1VGRGVrUXNTVUZCU1N4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFsQlEzSkRMRWxCUVVzc1RVRkJUU3hKUVVGSkxGRkJRVkVzUlVGQlNUdG5Ra0ZEZWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEZGQlFWRXNNa0pCUVRKQ0xFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTTdZVUZEZUVVN1UwRkRSanRoUVVGTk8xbEJRMHdzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMU5CUTNKQ08xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWkN4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU55UXl4RFFVRkRPMGxCUlVRc1MwRkJTenRSUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlFUdEpRVU53UXl4RFFVRkRPMGxCUlVRc1RVRkJUVHRSUVVOS0xFOUJRVThzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTNoQ0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVTXNiVUpCUVhORE8xRkJRelZETEVsQlFVa3NVVUZCVVN4SFFVRkhMRzFDUVVGdFFpeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRzFDUVVGdFFpeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTJwR0xFbEJRVWtzVVVGQlVTeEZRVUZGTzFsQlExb3NTVUZCU1N4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdXVUZEYkVVc1NVRkJTU3hKUVVGSkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVVc1ZVRkJWU3hEUVVGRkxFTkJRVU03V1VGREwwTXNUMEZCVHl4SlFVRkpMRU5CUVVNN1UwRkRZanRSUVVORUxFOUJRVThzUlVGQlJTeERRVUZETzBsQlExb3NRMEZCUXp0SlFVVkVMRmRCUVZjc1EwRkJReXhSUVVGblFqdFJRVU14UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1MwRkJTeXhIUVVGM1FpeGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdXVUZGYUVZc1NVRkJTU3hMUVVGTExFVkJRVVU3WjBKQlExUXNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJZeXhMUVVGTExFTkJRVU1zUTBGQlF6dGhRVU16UXp0VFFVTkdPMUZCUTBRc1QwRkJUeXhKUVVGSkxGVkJRVlVzUlVGQlJTeERRVUZETzBsQlF6RkNMRU5CUVVNN1NVRkZSQ3haUVVGWk8xRkJRMVlzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVNelFpeFBRVUZQTEZsQlFWa3NRMEZCUlN4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlJTeERRVUZETzFOQlF6bERPMUZCUTBRc1NVRkJTU3hEUVVGRExGbEJRVmtzUlVGQlJTeERRVUZETzFGQlEzQkNMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRMW9zUTBGQlF6dEpRVVZFTEU5QlFVODdVVUZEVEN4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRTlCUVU4c1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUTNSRE8xRkJRMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4RFFVRkRPMUZCUTNCQ0xFOUJRVThzVTBGQlV5eERRVUZETzBsQlEyNUNMRU5CUVVNN1NVRkZSQ3hKUVVGSkxFTkJRVU1zUzBGQlpUdFJRVU5zUWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTNCRExFbEJRVWtzUTBGQlF5eERRVUZETEV0QlFVc3NSVUZCUnp0blFrRkRXaXhQUVVGUExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUVR0blFrRkRla0lzVDBGQlR5eEpRVUZKTEVOQlFVTTdZVUZEWWp0cFFrRkJUVHRuUWtGRFRDeFBRVUZQTEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNN1lVRkRNVUk3VTBGRFJqdGhRVUZQTzFsQlEwNHNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xbEJRM0JDTEU5QlFVOHNSVUZCUlN4RFFVRkRPMU5CUTFnN1NVRkRTQ3hEUVVGRE8wbEJSVVFzU1VGQlNTeERRVUZETEV0QlFXVTdVVUZEYkVJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOd1F5eEpRVUZKTEVOQlFVTXNRMEZCUlN4TFFVRkxMRVZCUVVVN1owSkJRMW9zVDBGQlR5eERRVUZETEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVFN1owSkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMkZCUTJJN2FVSkJRVTA3WjBKQlEwd3NUMEZCVHl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8yRkJRekZDTzFOQlEwWTdZVUZCVFR0WlFVTk1MRWxCUVVrc1EwRkJReXhaUVVGWkxFVkJRVVVzUTBGQlF6dFpRVU53UWl4UFFVRlBMRVZCUVVVc1EwRkJRenRUUVVOWU8wbEJRMGdzUTBGQlF6dEpRVVZFTEUxQlFVMHNRMEZCUXl4TFFVRmhPMUZCUTJ4Q0xFbEJRVWtzVTBGQlV5eEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFdEJRVXNzUlVGQlJTeERRVUZCTzFGQlEzaERMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVRTdVVUZEY0VJc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNUMEZCVHl4RFFVRkRMRXRCUVdFN1VVRkRia0lzU1VGQlNTeFRRVUZUTEVkQlFVY3NSMEZCUnl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEZRVUZGTEVOQlFVRTdVVUZEZUVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUVR0UlFVTndRaXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4TlFVRk5PMUZCUTBvc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRUUVVOb1F6dGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzFGQlEwUXNUMEZCVHl4VFFVRlRMRU5CUVVNN1NVRkRia0lzUTBGQlF6dEpRVVZFTEZWQlFWVTdVVUZEVWl4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTzFsQlF6TkNMRTlCUVU4c1NVRkJTU3hoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVOcVJEdGhRVUZOTzFsQlEwd3NUMEZCVHl4SlFVRkpMR0ZCUVdFc1JVRkJSU3hEUVVGRE8xTkJRelZDTzBsQlEwZ3NRMEZCUXp0SlFVVkVMRTlCUVU4N1VVRkRUQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZPMWxCUXpOQ0xFOUJRVThzU1VGQlNTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZEY0VRN1VVRkRSQ3hQUVVGUExFbEJRVWtzVlVGQlZTeEZRVUZGTEVOQlFVTTdTVUZETVVJc1EwRkJRenRKUVVWRUxFVkJRVVVzUTBGQlF5eEpRVUZ6UWp0UlFVTjJRaXhKUVVGSkxGZEJRVmNzUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVOeVJTeEpRVUZKTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM1pDTEVsQlFVa3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03V1VGRE0wSXNTVUZCU1N4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFpRVU4wUXl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFVkJRVVVzVlVGQlV5eFZRVUZsTzJkQ1FVTndSU3hKUVVGSkxFTkJRVVVzWTBGQll5eEZRVUZGTzI5Q1FVTndRaXhWUVVGVkxFTkJRVU1zWTBGQll5eEZRVUZGTEVOQlFVRTdhVUpCUXpWQ08yZENRVU5FTEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRVHRaUVVOeVFpeERRVUZETEVOQlFVTXNRMEZCUVR0VFFVTklPMGxCUTBnc1EwRkJRenRKUVVWRUxFdEJRVXM3VVVGRFNDeEpRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRk8xbEJRek5DTEVsQlFVa3NUMEZCVHl4SFFVRlRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlF6RkRMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTndRaXhQUVVGUExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTTdZVUZEZEVJN1UwRkRSanRSUVVORUxFOUJRVThzVTBGQlV5eERRVUZCTzBsQlEyeENMRU5CUVVNN1EwRkRSaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRhZztcclxuKGZ1bmN0aW9uIChUYWcpIHtcclxuICAgIFRhZ1tcIkJ1dHRvblwiXSA9IFwiQlVUVE9OXCI7XHJcbiAgICBUYWdbXCJEaXZcIl0gPSBcIkRJVlwiO1xyXG4gICAgVGFnW1wiSW5wdXRcIl0gPSBcIklOUFVUXCI7XHJcbiAgICBUYWdbXCJQYXJhZ3JhcGhcIl0gPSBcIlBcIjtcclxufSkoVGFnIHx8IChUYWcgPSB7fSkpO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTElTVCA9IFtcclxuICAgICdhYm9ydCcsICdhZnRlcnNjcmlwdGV4ZWN1dGUnLFxyXG4gICAgJ2FuaW1hdGlvbmNhbmNlbCcsICdhbmltYXRpb25lbmQnLCAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcclxuICAgICdhdXhjbGljaycsXHJcbiAgICAnYmVmb3Jlc2NyaXB0ZXhlY3V0ZScsICdibHVyJyxcclxuICAgICdjaGFuZ2UnLCAnY2xpY2snLCAnY2xvc2UnLCAnY29udGV4dG1lbnUnLFxyXG4gICAgJ2RibGNsaWNrJyxcclxuICAgICdlcnJvcicsXHJcbiAgICAnZm9jdXMnLCAnZnVsbHNjcmVlbmNoYW5nZScsICdmdWxsc2NyZWVuZXJyb3InLFxyXG4gICAgJ2dvdHBvaW50ZXJjYXB0dXJlJyxcclxuICAgICdpbnB1dCcsXHJcbiAgICAna2V5ZG93bicsICdrZXlwcmVzcycsICdrZXl1cCcsXHJcbiAgICAnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCcsICdsb3N0cG9pbnRlcmNhcHR1cmUnLFxyXG4gICAgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnLFxyXG4gICAgJ29mZmxpbmUnLCAnb25saW5lJyxcclxuICAgICdwb2ludGVyY2FuY2VsJywgJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJlbnRlcicsICdwb2ludGVybGVhdmUnLFxyXG4gICAgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJvdXQnLCAncG9pbnRlcm92ZXInLCAncG9pbnRlcnVwJyxcclxuICAgICdyZXNldCcsICdyZXNpemUnLFxyXG4gICAgJ3Njcm9sbCcsICdzZWxlY3QnLCAnc2VsZWN0aW9uY2hhbmdlJywgJ3NlbGVjdGlvbmNoYW5nZScsXHJcbiAgICAnc2VsZWN0c3RhcnQnLCAnc3VibWl0JyxcclxuICAgICd0b3VjaGNhbmNlbCcsICd0b3VjaG1vdmUnLCAndG91Y2hzdGFydCcsXHJcbiAgICAndHJhbnNpdGlvbmNhbmNlbCcsICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICd2aXNpYmlsaXR5Y2hhbmdlJyxcclxuICAgICd3aGVlbCdcclxuXTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTI5dWMzUmhiblJ6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMMk52Ym5OMFlXNTBjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSMGdzVFVGQlRTeERRVUZPTEVsQlFWa3NSMEZMV0R0QlFVeEVMRmRCUVZrc1IwRkJSenRKUVVOaUxIZENRVUZwUWl4RFFVRkJPMGxCUTJwQ0xHdENRVUZYTEVOQlFVRTdTVUZEV0N4elFrRkJaU3hEUVVGQk8wbEJRMllzYzBKQlFXVXNRMEZCUVR0QlFVTnFRaXhEUVVGRExFVkJURmNzUjBGQlJ5eExRVUZJTEVkQlFVY3NVVUZMWkR0QlFVVkVMRTFCUVUwc1EwRkJReXhOUVVGTkxGVkJRVlVzUjBGQlJ6dEpRVU40UWl4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTzBsQlF6ZENMR2xDUVVGcFFpeEZRVUZGTEdOQlFXTXNSVUZCUlN4dlFrRkJiMEk3U1VGRGRrUXNWVUZCVlR0SlFVTldMSEZDUVVGeFFpeEZRVUZGTEUxQlFVMDdTVUZETjBJc1VVRkJVU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNZVUZCWVR0SlFVTjZReXhWUVVGVk8wbEJRMVlzVDBGQlR6dEpRVU5RTEU5QlFVOHNSVUZCUlN4clFrRkJhMElzUlVGQlJTeHBRa0ZCYVVJN1NVRkRPVU1zYlVKQlFXMUNPMGxCUTI1Q0xFOUJRVTg3U1VGRFVDeFRRVUZUTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTlCUVU4N1NVRkRPVUlzVFVGQlRTeEZRVUZGTEZOQlFWTXNSVUZCUlN4WFFVRlhMRVZCUVVVc2IwSkJRVzlDTzBsQlEzQkVMRmRCUVZjc1JVRkJSU3hYUVVGWExFVkJRVVVzVlVGQlZTeEZRVUZGTEZkQlFWY3NSVUZCUlN4VFFVRlRPMGxCUXpWRUxGTkJRVk1zUlVGQlJTeFJRVUZSTzBsQlEyNUNMR1ZCUVdVc1JVRkJSU3hoUVVGaExFVkJRVVVzWTBGQll5eEZRVUZGTEdOQlFXTTdTVUZET1VRc1lVRkJZU3hGUVVGRkxGbEJRVmtzUlVGQlJTeGhRVUZoTEVWQlFVVXNWMEZCVnp0SlFVTjJSQ3hQUVVGUExFVkJRVVVzVVVGQlVUdEpRVU5xUWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hGUVVGRkxHbENRVUZwUWl4RlFVRkZMR2xDUVVGcFFqdEpRVU40UkN4aFFVRmhMRVZCUVVVc1VVRkJVVHRKUVVOMlFpeGhRVUZoTEVWQlFVVXNWMEZCVnl4RlFVRkZMRmxCUVZrN1NVRkRlRU1zYTBKQlFXdENMRVZCUVVVc1pVRkJaVHRKUVVOdVF5eHJRa0ZCYTBJN1NVRkRiRUlzVDBGQlR6dERRVU5TTEVOQlFVTWlmUT09IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgdmFyIEh0dHBNZXRob2Q7XHJcbihmdW5jdGlvbiAoSHR0cE1ldGhvZCkge1xyXG4gICAgSHR0cE1ldGhvZFtcIkNPTk5FQ1RcIl0gPSBcIkNPTk5FQ1RcIjtcclxuICAgIEh0dHBNZXRob2RbXCJERUxFVEVcIl0gPSBcIkRFTEVURVwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIkdFVFwiXSA9IFwiR0VUXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiSEVBRFwiXSA9IFwiSEVBRFwiO1xyXG4gICAgSHR0cE1ldGhvZFtcIk9QVElPTlNcIl0gPSBcIk9QVElPTlNcIjtcclxuICAgIEh0dHBNZXRob2RbXCJQQVRDSFwiXSA9IFwiUEFUQ0hcIjtcclxuICAgIEh0dHBNZXRob2RbXCJQT1NUXCJdID0gXCJQT1NUXCI7XHJcbiAgICBIdHRwTWV0aG9kW1wiUFVUXCJdID0gXCJQVVRcIjtcclxuICAgIEh0dHBNZXRob2RbXCJUUkFDRVwiXSA9IFwiVFJBQ0VcIjtcclxufSkoSHR0cE1ldGhvZCB8fCAoSHR0cE1ldGhvZCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF0WlhSb2IyUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmFIUjBjQzF0WlhSb2IyUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdSMEZKUnp0QlFVVklMRTFCUVUwc1EwRkJUaXhKUVVGWkxGVkJWVmc3UVVGV1JDeFhRVUZaTEZWQlFWVTdTVUZEY0VJc2FVTkJRVzFDTEVOQlFVRTdTVUZEYmtJc0swSkJRV2xDTEVOQlFVRTdTVUZEYWtJc2VVSkJRVmNzUTBGQlFUdEpRVU5ZTERKQ1FVRmhMRU5CUVVFN1NVRkRZaXhwUTBGQmJVSXNRMEZCUVR0SlFVTnVRaXcyUWtGQlpTeERRVUZCTzBsQlEyWXNNa0pCUVdFc1EwRkJRVHRKUVVOaUxIbENRVUZYTEVOQlFVRTdTVUZEV0N3MlFrRkJaU3hEUVVGQk8wRkJRMnBDTEVOQlFVTXNSVUZXVnl4VlFVRlZMRXRCUVZZc1ZVRkJWU3hSUVZWeVFpSjkiLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmV4cG9ydCB2YXIgSHR0cFJlc3BvbnNlVHlwZTtcclxuKGZ1bmN0aW9uIChIdHRwUmVzcG9uc2VUeXBlKSB7XHJcbiAgICBIdHRwUmVzcG9uc2VUeXBlW1wiVEVYVFwiXSA9IFwidGV4dFwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkFSUkFZQlVGRkVSXCJdID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgSHR0cFJlc3BvbnNlVHlwZVtcIkJMT0JcIl0gPSBcImJsb2JcIjtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJET0NVTUVOVFwiXSA9IFwiZG9jdW1lbnRcIjtcclxuICAgIEh0dHBSZXNwb25zZVR5cGVbXCJKU09OXCJdID0gXCJqc29uXCI7XHJcbn0pKEh0dHBSZXNwb25zZVR5cGUgfHwgKEh0dHBSZXNwb25zZVR5cGUgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0MxeVpYTndiMjV6WlMxMGVYQmxMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyaDBkSEF0Y21WemNHOXVjMlV0ZEhsd1pTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN096dEhRVWxITzBGQlJVZ3NUVUZCVFN4RFFVRk9MRWxCUVZrc1owSkJUVmc3UVVGT1JDeFhRVUZaTEdkQ1FVRm5RanRKUVVNeFFpeHBRMEZCWVN4RFFVRkJPMGxCUTJJc0swTkJRVEpDTEVOQlFVRTdTVUZETTBJc2FVTkJRV0VzUTBGQlFUdEpRVU5pTEhsRFFVRnhRaXhEUVVGQk8wbEJRM0pDTEdsRFFVRmhMRU5CUVVFN1FVRkRaaXhEUVVGRExFVkJUbGNzWjBKQlFXZENMRXRCUVdoQ0xHZENRVUZuUWl4UlFVMHpRaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5leHBvcnQgdmFyIEh0dHBQcm90b2NvbDtcclxuKGZ1bmN0aW9uIChIdHRwUHJvdG9jb2wpIHtcclxuICAgIEh0dHBQcm90b2NvbFtcIkhUVFBcIl0gPSBcImh0dHBcIjtcclxuICAgIEh0dHBQcm90b2NvbFtcIkhUVFBTXCJdID0gXCJodHRwc1wiO1xyXG4gICAgSHR0cFByb3RvY29sW1wiRklMRVwiXSA9IFwiZmlsZVwiO1xyXG59KShIdHRwUHJvdG9jb2wgfHwgKEh0dHBQcm90b2NvbCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF3Y205MGIyTnZiQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OW9kSFJ3TFhCeWIzUnZZMjlzTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPenM3TzBkQlNVYzdRVUZIU0N4TlFVRk5MRU5CUVU0c1NVRkJXU3haUVVsWU8wRkJTa1FzVjBGQldTeFpRVUZaTzBsQlEzUkNMRFpDUVVGaExFTkJRVUU3U1VGRFlpd3JRa0ZCWlN4RFFVRkJPMGxCUTJZc05rSkJRV0VzUTBGQlFUdEJRVU5tTEVOQlFVTXNSVUZLVnl4WlFVRlpMRXRCUVZvc1dVRkJXU3hSUVVsMlFpSjkiLCJleHBvcnQgY2xhc3MgSHR0cFByb21pc2Uge1xyXG4gICAgY29uc3RydWN0b3IoX2h0dHApIHtcclxuICAgICAgICB0aGlzLmh0dHBPYmplY3QgPSBfaHR0cDtcclxuICAgICAgICB0aGlzLnByb21pc2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVQcm9taXNlKGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocHJvbWlzZVJlc29sdmVyLCBwcm9taXNlUmVqZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgX3Jlc29sdmUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZVJlc29sdmVyKGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBoYW5kbGVyKF9yZXNvbHZlLCBwcm9taXNlUmVqZWN0b3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaXNSZXNvbHZlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaHR0cCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwT2JqZWN0O1xyXG4gICAgfVxyXG4gICAgYWZ0ZXJSZXN1bHQoY29udGV4dFRoZW4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNQcm9taXNlKHRoaXMucHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9taXNlLnRoZW4ocmVzb2x2ZWRSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dFRoZW4odGhpcy5odHRwT2JqZWN0LCByZXNvbHZlZFJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRoZW4od2hlbikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1Byb21pc2UodGhpcy5wcm9taXNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0KHRoaXMucHJvbWlzZS50aGVuKHdoZW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjYXRjaCh3aGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSh0aGlzLnByb21pc2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQodGhpcy5wcm9taXNlLmNhdGNoKHdoZW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBoYXNQcm9taXNlKHByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZTtcclxuICAgIH1cclxuICAgIG5leHQoX3Byb21pc2UpIHtcclxuICAgICAgICBsZXQgX25leHQgPSBuZXcgSHR0cFByb21pc2UodGhpcy5odHRwT2JqZWN0KTtcclxuICAgICAgICBfbmV4dC5wcm9taXNlID0gX3Byb21pc2U7XHJcbiAgICAgICAgcmV0dXJuIF9uZXh0O1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF3Y205dGFYTmxMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyaDBkSEF0Y0hKdmJXbHpaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGSFFTeE5RVUZOTEU5QlFVOHNWMEZCVnp0SlFYVkNkRUlzV1VGQldTeExRVUZYTzFGQlEzSkNMRWxCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzaENMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzVTBGQlV5eERRVUZETzBsQlF6TkNMRU5CUVVNN1NVRnlRa1FzWVVGQllTeERRVU5ZTEU5QlIxTTdVVUZGVkN4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExGTkJRVk1zUTBGQlF6dFJRVVY0UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZMTEVOQlFVTXNaVUZCWlN4RlFVRkZMR1ZCUVdVc1JVRkJSU3hGUVVGRk8xbEJRMnhGTEVsQlFVa3NTVUZCU1N4SFFVRnRRaXhKUVVGSkxFTkJRVU03V1VGRGFFTXNTVUZCU1N4UlFVRlJMRWRCUVVjc1ZVRkJVeXhKUVVGTk8yZENRVU0xUWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZEYmtJc1pVRkJaU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzaENMRU5CUVVNc1EwRkJRenRaUVVOR0xFOUJRVThzUTBGQlF5eFJRVUZSTEVWQlFVVXNaVUZCWlN4RFFVRkRMRU5CUVVFN1VVRkRjRU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCVDBRc1ZVRkJWVHRSUVVOU0xFOUJRVThzU1VGQlNTeERRVUZETEUxQlFVMHNTVUZCU1N4VFFVRlRMRU5CUVVNN1NVRkRiRU1zUTBGQlF6dEpRVVZFTEVsQlFVazdVVUZEUml4UFFVRlBMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03U1VGRGVrSXNRMEZCUXp0SlFVVkVMRmRCUVZjc1EwRkRWQ3hYUVVFNFJEdFJRVVU1UkN4SlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTJwRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhGUVVGRk8yZENRVU5xUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeGpRVUZqTEVOQlFVTXNRMEZCUXp0WlFVTXZReXhEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU5LTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRaQ3hEUVVGRE8wbEJSVVFzU1VGQlNTeERRVUZETEVsQlFYVkRPMUZCUXpGRExFbEJRVWtzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRGFrTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRkxFTkJRVU03VTBGRE5VTTdVVUZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVOa0xFTkJRVU03U1VGRlJDeExRVUZMTEVOQlFVVXNTVUZCTWtJN1VVRkRhRU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJUdFpRVU5xUXl4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU0xUXp0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVVZFTEZWQlFWVXNRMEZCUXl4UFFVRm5RenRSUVVONlF5eFBRVUZ2UWl4SlFVRkpMRU5CUVVNc1QwRkJVU3haUVVGWkxFOUJRVThzUTBGQlF6dEpRVU4yUkN4RFFVRkRPMGxCUlU4c1NVRkJTU3hEUVVGRExGRkJRVEpDTzFGQlEzUkRMRWxCUVVrc1MwRkJTeXhIUVVGSExFbEJRVWtzVjBGQlZ5eERRVUZKTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOb1JDeExRVUZMTEVOQlFVTXNUMEZCVHl4SFFVRmxMRkZCUVZFc1EwRkJRenRSUVVOeVF5eFBRVUZQTEV0QlFVc3NRMEZCUXp0SlFVTm1MRU5CUVVNN1EwRkRSaUo5IiwiLypcclxuICogRmx1aWQgRE9NIGZvciBKYXZhU2NyaXB0XHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxOCBXYXJ3aWNrIE1vbGxveVxyXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQgeyBIdHRwTWV0aG9kIH0gZnJvbSBcIi4vaHR0cC1tZXRob2RcIjtcclxuaW1wb3J0IHsgSHR0cFJlc3BvbnNlVHlwZSB9IGZyb20gXCIuL2h0dHAtcmVzcG9uc2UtdHlwZVwiO1xyXG5pbXBvcnQgeyBIdHRwUHJvdG9jb2wgfSBmcm9tIFwiLi9odHRwLXByb3RvY29sXCI7XHJcbmltcG9ydCB7IEh0dHBQcm9taXNlIH0gZnJvbSAnLi9odHRwLXByb21pc2UnO1xyXG5leHBvcnQgY2xhc3MgSHR0cCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb3RvY29sID0gSHR0cFByb3RvY29sLkhUVFA7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcclxuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5wYXRoID0gJyc7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBIdHRwTWV0aG9kLkdFVDtcclxuICAgICAgICB0aGlzLmJvZHkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy51cGxvYWREYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlVHlwZS5URVhUO1xyXG4gICAgICAgIHRoaXMudGltZW91dE1TID0gMTAwMDtcclxuICAgIH1cclxuICAgIGhvc3QocHJvdG9jb2wsIGhvc3RuYW1lLCBwb3J0KSB7XHJcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9IGhvc3RuYW1lO1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGVhZGVyKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycy5wdXNoKHsgbmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZXhwZWN0ZWREYXRhKHR5cGUpIHtcclxuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aW1lb3V0QXQoZHVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLnRpbWVvdXRNUyA9IGR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY29udGV4dCh0YXNrKSB7XHJcbiAgICAgICAgbGV0IF9jb250ZXh0ID0gbmV3IEh0dHAoKTtcclxuICAgICAgICBfY29udGV4dC5wcm90b2NvbCA9IHRoaXMucHJvdG9jb2w7XHJcbiAgICAgICAgX2NvbnRleHQucG9ydCA9IHRoaXMucG9ydDtcclxuICAgICAgICBfY29udGV4dC5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWU7XHJcbiAgICAgICAgX2NvbnRleHQucmVxdWVzdEhlYWRlcnMgPSBuZXcgQXJyYXkoKS5jb25jYXQodGhpcy5yZXF1ZXN0SGVhZGVycyk7XHJcbiAgICAgICAgX2NvbnRleHQucGF0aCA9IHRoaXMucGF0aDtcclxuICAgICAgICBfY29udGV4dC5tZXRob2QgPSB0aGlzLm1ldGhvZDtcclxuICAgICAgICBfY29udGV4dC5ib2R5ID0gdGhpcy5ib2R5O1xyXG4gICAgICAgIF9jb250ZXh0LnVwbG9hZERhdGEgPSB0aGlzLnVwbG9hZERhdGE7XHJcbiAgICAgICAgX2NvbnRleHQucmVzcG9uc2VUeXBlID0gdGhpcy5yZXNwb25zZVR5cGU7XHJcbiAgICAgICAgdGFzayhfY29udGV4dCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjYWxsKG1ldGhvZCwgcGF0aCwgYm9keSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoYm9keSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zeW5jUG9ydEFuZFByb3RvY29sKCk7XHJcbiAgICAgICAgbGV0IHBvcnRTdHJpbmcgPSAoISF0aGlzLnBvcnQpID8gYDoke3RoaXMucG9ydH1gIDogYGA7XHJcbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMucHJvdG9jb2x9Oi8vJHt0aGlzLmhvc3RuYW1lfSR7cG9ydFN0cmluZ30ke3BhdGh9YDtcclxuICAgICAgICBsZXQgeGhyID0gdGhpcy5jcmVhdGVSZXF1ZXN0VG8odXJsKTtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuc2V0SGFuZGxlcnMoeGhyKTtcclxuICAgICAgICB0aGlzLmFkZEFueUhlYWRlcnMoeGhyKTtcclxuICAgICAgICB4aHIuc2VuZCh0aGlzLmJvZHkpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgc3luY1BvcnRBbmRQcm90b2NvbCgpIHtcclxuICAgICAgICBpZiAoKHRoaXMucHJvdG9jb2wgPT0gSHR0cFByb3RvY29sLkhUVFAgJiYgdGhpcy5wb3J0ID09IDgwKVxyXG4gICAgICAgICAgICB8fCAodGhpcy5wcm90b2NvbCA9PSBIdHRwUHJvdG9jb2wuSFRUUFMgJiYgdGhpcy5wb3J0ID09IDQ0MylcclxuICAgICAgICAgICAgfHwgdGhpcy5wcm90b2NvbCA9PSBIdHRwUHJvdG9jb2wuRklMRSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlUmVxdWVzdFRvKHVybCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IHRoaXMudGltZW91dE1TO1xyXG4gICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB1cmwpO1xyXG4gICAgICAgIHJldHVybiB4aHI7XHJcbiAgICB9XHJcbiAgICBzZXRFcnJvckhhbmRsZXJzKHhociwgcmVqZWN0KSB7XHJcbiAgICAgICAgeGhyLm9uYWJvcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnUmVxdWVzdCBBYm9ydGVkJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub250aW1lb3V0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoJ1RpbWVkIG91dCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnRXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVJlc3BvbnNlT2JqZWN0KHhocikge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0geGhyXHJcbiAgICAgICAgICAgIC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS5zcGxpdCgnXFxyXFxuJylcclxuICAgICAgICAgICAgLm1hcChoZWFkZXJfbGluZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGhlYWRlcl9saW5lLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0cyAmJiBwYXJ0cy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogcGFydHNbMF0sIHZhbHVlOiBwYXJ0c1sxXSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBoZHIgaW4gaGVhZGVycykge1xyXG4gICAgICAgICAgICBsZXQgYV9oZWFkZXIgPSBoZWFkZXJzW2hkcl07XHJcbiAgICAgICAgICAgIGlmIChhX2hlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvblthX2hlYWRlci5uYW1lXSA9IGFfaGVhZGVyLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxyXG4gICAgICAgICAgICB0eXBlOiB4aHIucmVzcG9uc2VUeXBlLFxyXG4gICAgICAgICAgICBib2R5OiB4aHIucmVzcG9uc2UsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGNvbGxlY3Rpb25cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH1cclxuICAgIHNldE9uQ29tcGxldGVIYW5kbGVyKHhociwgcmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jcmVhdGVSZXNwb25zZU9iamVjdCh4aHIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChgUmV0dXJuZWQgSFRUUCAke3hoci5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYWRkQW55SGVhZGVycyh4aHIpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SGVhZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGhlYWRlciBvZiB0aGlzLnJlcXVlc3RIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIubmFtZSwgaGVhZGVyLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldEhhbmRsZXJzKHhocikge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IEh0dHBQcm9taXNlKHRoaXMpO1xyXG4gICAgICAgIHByb21pc2UuY3JlYXRlUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RXJyb3JIYW5kbGVycyh4aHIsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T25Db21wbGV0ZUhhbmRsZXIoeGhyLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OW9kSFJ3TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPenM3TzBkQlNVYzdRVUZKU0N4UFFVRlBMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFMUJRVTBzWlVGQlpTeERRVUZETzBGQlF6TkRMRTlCUVU4c1JVRkJSU3huUWtGQlowSXNSVUZCUlN4TlFVRk5MSE5DUVVGelFpeERRVUZETzBGQlEzaEVMRTlCUVU4c1JVRkJSU3haUVVGWkxFVkJRVVVzVFVGQlRTeHBRa0ZCYVVJc1EwRkJRenRCUVVVdlF5eFBRVUZQTEVWQlFVVXNWMEZCVnl4RlFVRkZMRTFCUVUwc1owSkJRV2RDTEVOQlFVTTdRVUZGTjBNc1RVRkJUU3hQUVVGUExFbEJRVWs3U1VGWlpqdFJRVU5GTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU5zUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExGTkJRVk1zUTBGQlF6dFJRVU4wUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU51UWl4SlFVRkpMRU5CUVVNc1kwRkJZeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU42UWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU5tTEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1ZVRkJWU3hEUVVGRExFZEJRVWNzUTBGQlF6dFJRVU0zUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExGTkJRVk1zUTBGQlF6dFJRVU4wUWl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExGTkJRVk1zUTBGQlF6dFJRVU0xUWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExHZENRVUZuUWl4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVNeFF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVONFFpeERRVUZETzBsQlJVUXNTVUZCU1N4RFFVRkRMRkZCUVhOQ0xFVkJRVVVzVVVGQlowSXNSVUZCUlN4SlFVRmhPMUZCUXpGRUxFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NVVUZCVVN4RFFVRkRPMUZCUTNwQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTJwQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NVVUZCVVN4RFFVRkRPMUZCUTNwQ0xFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRTFCUVUwc1EwRkJReXhKUVVGWExFVkJRVVVzUzBGQllUdFJRVU12UWl4SlFVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEY2tRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFpDeERRVUZETzBsQlJVUXNXVUZCV1N4RFFVRkRMRWxCUVhOQ08xRkJRMnBETEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJRc1EwRkJRenRKUVVWRUxGTkJRVk1zUTBGQlF5eFJRVUZuUWp0UlFVTjRRaXhKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEZGQlFWRXNRMEZCUXp0UlFVTXhRaXhQUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5rTEVOQlFVTTdTVUZGUkN4UFFVRlBMRU5CUVVVc1NVRkJOa0k3VVVGRGNFTXNTVUZCU1N4UlFVRlJMRWRCUVVjc1NVRkJTU3hKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU14UWl4UlFVRlJMRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZEYkVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRPMUZCUXpGQ0xGRkJRVkVzUTBGQlF5eFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVOc1F5eFJRVUZSTEVOQlFVTXNZMEZCWXl4SFFVRkhMRWxCUVVrc1MwRkJTeXhGUVVGakxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRSUVVNNVJTeFJRVUZSTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGRE1VSXNVVUZCVVN4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETzFGQlF6bENMRkZCUVZFc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTXhRaXhSUVVGUkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRkRU1zVVVGQlVTeERRVUZETEZsQlFWa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRE8xRkJRekZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRSUVVObUxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEyUXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhOUVVGclFpeEZRVUZGTEVsQlFWa3NSVUZCUlN4SlFVRlZPMUZCUXk5RExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRPMUZCUTNKQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTJwQ0xFbEJRVWtzVDBGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRkZCUVZFc1JVRkJSVHRaUVVNM1FpeEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRUUVVOc1FqdGhRVUZOTzFsQlEwd3NTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTJ4RE8xRkJSVVFzU1VGQlNTeERRVUZETEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU03VVVGRE0wSXNTVUZCU1N4VlFVRlZMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVVVzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGQk8xRkJRM1JFTEVsQlFVa3NSMEZCUnl4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzVFVGQlRTeEpRVUZKTEVOQlFVTXNVVUZCVVN4SFFVRkhMRlZCUVZVc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVVZ3UlN4SlFVRkpMRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTNCRExFbEJRVWtzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRGNFTXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU40UWl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTndRaXhQUVVGUExFOUJRVThzUTBGQlF6dEpRVU5xUWl4RFFVRkRPMGxCUlU4c2JVSkJRVzFDTzFGQlEzcENMRWxCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEpRVUZKTEZsQlFWa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTTdaVUZEZGtRc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEpRVUZKTEZsQlFWa3NRMEZCUXl4TFFVRkxMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzU1VGQlNTeEhRVUZITEVOQlFVTTdaVUZEZWtRc1NVRkJTU3hEUVVGRExGRkJRVkVzU1VGQlNTeFpRVUZaTEVOQlFVTXNTVUZCU1N4RlFVRkhPMWxCUTNoRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NVMEZCVXl4RFFVRkRPMU5CUTNaQ08wbEJRMGdzUTBGQlF6dEpRVVZQTEdWQlFXVXNRMEZCUXl4SFFVRlhPMUZCUTJwRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVsQlFVa3NZMEZCWXl4RlFVRkZMRU5CUVVNN1VVRkRMMElzUjBGQlJ5eERRVUZETEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRemRDTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhQUVVGUExFZEJRVWNzUTBGQlF6dEpRVU5pTEVOQlFVTTdTVUZGVHl4blFrRkJaMElzUTBGQlF5eEhRVUZ0UWl4RlFVRkZMRTFCUVhWQ08xRkJRMjVGTEVkQlFVY3NRMEZCUXl4UFFVRlBMRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRMnBDTEUxQlFVMHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzFGQlF6VkNMRU5CUVVNc1EwRkJRenRSUVVOR0xFZEJRVWNzUTBGQlF5eFRRVUZUTEVkQlFVY3NSMEZCUnl4RlFVRkZPMWxCUTI1Q0xFMUJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0UlFVTjBRaXhEUVVGRExFTkJRVU03VVVGRFJpeEhRVUZITEVOQlFVTXNUMEZCVHl4SFFVRkhMRWRCUVVjc1JVRkJSVHRaUVVOcVFpeE5RVUZOTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF6dFJRVU0xUWl4RFFVRkRMRU5CUVVNN1NVRkRTaXhEUVVGRE8wbEJSVThzYjBKQlFXOUNMRU5CUVVNc1IwRkJiVUk3VVVGRE9VTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1IwRkJSenRoUVVOa0xIRkNRVUZ4UWl4RlFVRkZMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF6dGhRVU55UXl4SFFVRkhMRU5CUVVVc1YwRkJWeXhEUVVGRExFVkJRVVU3V1VGRGJFSXNTVUZCU1N4TFFVRkxMRWRCUVVjc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTnVReXhKUVVGSkxFdEJRVXNzU1VGQlNTeExRVUZMTEVOQlFVTXNUVUZCVFN4SlFVRkpMRU5CUVVNc1JVRkJSVHRuUWtGRE9VSXNUMEZCYlVJc1JVRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVTXNRMEZCUXp0aFFVTjBSRHRwUWtGQlRUdG5Ra0ZEVEN4UFFVRlBMRk5CUVZNc1EwRkJRenRoUVVOc1FqdFJRVU5JTEVOQlFVTXNRMEZCUXp0aFFVTkVMRTFCUVUwc1EwRkJSU3hKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NTVUZCU1N4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOMFF5eEpRVUZKTEZWQlFWVXNSMEZCSzBJc1JVRkJSU3hEUVVGRE8xRkJRMmhFTEV0QlFVa3NTVUZCU1N4SFFVRkhMRWxCUVVrc1QwRkJUeXhGUVVGRk8xbEJRM1JDTEVsQlFVa3NVVUZCVVN4SFFVRkhMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU0xUWl4SlFVRkpMRkZCUVZFc1JVRkJSVHRuUWtGRFdpeFZRVUZWTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTTdZVUZETlVNN1UwRkRSanRSUVVWRUxFbEJRVWtzVVVGQlVTeEhRVUZyUWp0WlFVTTFRaXhOUVVGTkxFVkJRVVVzUjBGQlJ5eERRVUZETEUxQlFVMDdXVUZEYkVJc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFpRVUZaTzFsQlEzUkNMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zVVVGQlVUdFpRVU5zUWl4UFFVRlBMRVZCUVVVc1ZVRkJWVHRUUVVOd1FpeERRVUZETzFGQlEwWXNUMEZCVHl4UlFVRlJMRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEpRVVZQTEc5Q1FVRnZRaXhEUVVNeFFpeEhRVUZ0UWl4RlFVTnVRaXhQUVVGM1F5eEZRVU40UXl4TlFVRTBRanRSUVVVMVFpeEhRVUZITEVOQlFVTXNhMEpCUVd0Q0xFZEJRVWNzUjBGQlJ5eEZRVUZGTzFsQlF6VkNMRWxCUVVrc1IwRkJSeXhEUVVGRExGVkJRVlVzU1VGQlNTeERRVUZETEVWQlFVVTdaMEpCUTNaQ0xFbEJRVWtzUjBGQlJ5eERRVUZETEUxQlFVMHNTVUZCU1N4SFFVRkhMRVZCUVVVN2IwSkJRM0pDTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc2IwSkJRVzlDTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRwUWtGRGVrTTdjVUpCUVUwN2IwSkJRMHdzVFVGQlRTeERRVUZETEdsQ1FVRnBRaXhIUVVGSExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNRMEZCUXp0cFFrRkRka003WVVGRFJqdFJRVU5JTEVOQlFVTXNRMEZCUXp0SlFVTktMRU5CUVVNN1NVRkZUeXhoUVVGaExFTkJRVU1zUjBGQmJVSTdVVUZEZGtNc1NVRkJTU3hKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRiRU1zUzBGQlNTeEpRVUZKTEUxQlFVMHNTVUZCU1N4SlFVRkpMRU5CUVVNc1kwRkJZeXhGUVVGRk8yZENRVU55UXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdZVUZEYWtRN1UwRkRSanRKUVVOSUxFTkJRVU03U1VGRlR5eFhRVUZYTEVOQlFVTXNSMEZCYlVJN1VVRkRja01zU1VGQlNTeFBRVUZQTEVkQlFVY3NTVUZCU1N4WFFVRlhMRU5CUVdVc1NVRkJTU3hEUVVGRExFTkJRVUU3VVVGRGFrUXNUMEZCVHl4RFFVRkRMR0ZCUVdFc1EwRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNSVUZCUlR0WlFVTjZReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1IwRkJSeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFsQlEyNURMRWxCUVVrc1EwRkJReXh2UWtGQmIwSXNRMEZCUXl4SFFVRkhMRVZCUVVVc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEyeEVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eFBRVUZQTEVOQlFVTTdTVUZEYWtJc1EwRkJRenREUVVOR0luMD0iLCIvKlxyXG4gKiBGbHVpZCBET00gZm9yIEphdmFTY3JpcHRcclxuICogKGMpIENvcHlyaWdodCAyMDE4IFdhcndpY2sgTW9sbG95XHJcbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IHByb3ZpZGVzQWxsIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgRG9tRWxlbWVudCB9IGZyb20gJy4vZG9tLWVsZW1lbnQnO1xyXG5pbXBvcnQgeyBOb25FbGVtZW50IH0gZnJvbSAnLi9ub24tZWxlbWVudCc7XHJcbmltcG9ydCB7IEVWRU5UX0xJU1QsIFRhZyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuZXhwb3J0IHsgSHR0cCB9IGZyb20gJy4vaHR0cCc7XHJcbmV4cG9ydCB7IEh0dHBNZXRob2QgfSBmcm9tIFwiLi9odHRwLW1ldGhvZFwiO1xyXG5leHBvcnQgeyBIdHRwUmVzcG9uc2VUeXBlIH0gZnJvbSBcIi4vaHR0cC1yZXNwb25zZS10eXBlXCI7XHJcbmV4cG9ydCB7IEh0dHBQcm90b2NvbCB9IGZyb20gXCIuL2h0dHAtcHJvdG9jb2xcIjtcclxuZXhwb3J0IGNvbnN0IEV2ZW50cyA9IEVWRU5UX0xJU1Q7XHJcbmNsYXNzIERPTSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIGZpbmRFbGVtZW50KGFyZykge1xyXG4gICAgICAgIGxldCBpZCA9IGFyZ1snaWQnXTtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0RWxlbWVudEZyb21JZChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGFyZ1snc2VsZWN0b3InXTtcclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0RWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTm9uRWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbChhcmcpIHtcclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBhcmdbJ3NlbGVjdG9yJ107XHJcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEb21FbGVtZW50LmdldExpc3RGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX2NsYXNzID0gYXJnWydjbGFzcyddO1xyXG4gICAgICAgIGlmIChfY2xhc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvbUVsZW1lbnQuZ2V0TGlzdEZyb21DbGFzcyhfY2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFnTmFtZSA9IGFyZ1sndGFnTmFtZSddO1xyXG4gICAgICAgIGlmICh0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEb21FbGVtZW50LmdldExpc3RGcm9tVGFnTmFtZSh0YWdOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgYnV0dG9uT24oZXZlbnRJbmZvKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVzQWxsKFsnaWQnLCAnZXZlbnQnLCAnaGFuZGxlciddLCBldmVudEluZm8pKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGV2ZW50SW5mby5pZDtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IHRoaXMuZmluZEVsZW1lbnQoeyBpZDogaWQgfSkuZXhwZWN0KFRhZy5CdXR0b24pO1xyXG4gICAgICAgICAgICBidXR0b24ub24oZXZlbnRJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIERvYygpIHtcclxuICAgIHJldHVybiBuZXcgRE9NKCk7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWm14MWFXUXRaRzl0TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMMlpzZFdsa0xXUnZiUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenRIUVVsSE8wRkJSMGdzVDBGQlR5eEZRVUZsTEZkQlFWY3NSVUZCUlN4TlFVRk5MRkZCUVZFc1EwRkJRVHRCUVVOcVJDeFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1pVRkJaU3hEUVVGQk8wRkJUVEZETEU5QlFVOHNSVUZCUlN4VlFVRlZMRVZCUVVVc1RVRkJUU3hsUVVGbExFTkJRVU03UVVGTk0wTXNUMEZCVHl4RlFVRkZMRlZCUVZVc1JVRkJSU3hIUVVGSExFVkJRVVVzVFVGQlRTeGhRVUZoTEVOQlFVTTdRVUZGT1VNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeE5RVUZOTEZGQlFWRXNRMEZCUXp0QlFVTTVRaXhQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNaVUZCWlN4RFFVRkRPMEZCUXpORExFOUJRVThzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxITkNRVUZ6UWl4RFFVRkRPMEZCUTNoRUxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVVXNUVUZCVFN4cFFrRkJhVUlzUTBGQlF6dEJRVWN2UXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hOUVVGTkxFZEJRVWNzVlVGQlZTeERRVUZETzBGQlIycERMRTFCUVUwc1IwRkJSenRKUVVWUU8wbEJRMEVzUTBGQlF6dEpRVVZFTEZkQlFWY3NRMEZCUXl4SFFVRnJRanRSUVVNMVFpeEpRVUZKTEVWQlFVVXNSMEZCUnl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJrSXNTVUZCU1N4RlFVRkZMRVZCUVVVN1dVRkRUaXhQUVVGUExGVkJRVlVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU40UXp0UlFVVkVMRWxCUVVrc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTXZRaXhKUVVGSkxGRkJRVkVzUlVGQlJUdFpRVU5hTEU5QlFWRXNWVUZCVlN4RFFVRkRMSE5DUVVGelFpeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMU5CUTNKRU8xRkJRMFFzVDBGQlR5eEpRVUZKTEZWQlFWVXNSVUZCUlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRlJDeFBRVUZQTEVOQlFVTXNSMEZCYzBJN1VVRkROVUlzU1VGQlNTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8xRkJReTlDTEVsQlFVY3NVVUZCVVN4RlFVRkZPMWxCUTFnc1QwRkJUeXhWUVVGVkxFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VTBGRGFrUTdVVUZGUkN4SlFVRkpMRTFCUVUwc1IwRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZETVVJc1NVRkJTU3hOUVVGTkxFVkJRVVU3V1VGRFZpeFBRVUZQTEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTTFRenRSUVVWRUxFbEJRVWtzVDBGQlR5eEhRVUZITEVkQlFVY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVNM1FpeEpRVUZKTEU5QlFVOHNSVUZCUlR0WlFVTllMRTlCUVU4c1ZVRkJWU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xTkJReTlETzFGQlJVUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1NVRkRXaXhEUVVGRE8wbEJSVVFzVVVGQlVTeERRVUZETEZOQlFUSkNPMUZCUTJ4RExFbEJRVWtzVjBGQlZ5eERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRTlCUVU4c1JVRkJSU3hUUVVGVExFTkJRVU1zUlVGQlF5eFRRVUZUTEVOQlFVTXNSVUZCUlR0WlFVTnlSQ3hKUVVGSkxFVkJRVVVzUjBGQlJ5eFRRVUZUTEVOQlFVTXNSVUZCUlN4RFFVRkJPMWxCUTNKQ0xFbEJRVWtzVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1JVRkJReXhGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZCTzFsQlF6RkVMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVRTdVMEZEY2tJN1NVRkRTQ3hEUVVGRE8wTkJSVVk3UVVGRlJDeE5RVUZOTEZWQlFWVXNSMEZCUnp0SlFVTnFRaXhQUVVGUExFbEJRVWtzUjBGQlJ5eEZRVUZGTEVOQlFVTTdRVUZEYmtJc1EwRkJReUo5Il0sIm5hbWVzIjpbIkh0dHBNZXRob2QiLCJIdHRwUmVzcG9uc2VUeXBlIiwiSHR0cFByb3RvY29sIl0sIm1hcHBpbmdzIjoiOzs7SUFBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0FBQ0EsSUFBTyxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLElBQUksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksS0FBSyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7SUFDbEMsUUFBUSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDO0lBQ3RELFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtJQUN2QixZQUFZLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN0RSxTQUFTO0lBQ1QsS0FBSztJQUNMLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0lBQ25CLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsUUFBUSxPQUFPLEtBQUssQ0FBQztJQUNyQixLQUFLO0lBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztJQ2xC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

