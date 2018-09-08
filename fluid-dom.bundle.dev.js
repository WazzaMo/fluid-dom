//  Fluid-DOM v 1.1.3
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
    function providesOne(list, args) {
        var definitionMissing = list.filter(word => args[word] === undefined);
        var isOneMatched = definitionMissing.length === (list.length - 1);
        if (isOneMatched) {
            var argumentNames = list.reduce((arg1, arg2) => `${arg1}, ${arg2}`);
            console.error(`One of these parameters were expected ${argumentNames} but none had a hasValue!`);
        }
        return isOneMatched;
    }
    function logWarning(message) {
        console.warn("FluidDOM: " + message);
    }

    /*
     * Fluid DOM for JavaScript
     * (c) Copyright 2018 Warwick Molloy
     * Available under the MIT License
     */
    class Attributes {
        constructor(domElement) {
            this.domElement = domElement;
        }
        each(task) {
            for (var attribute of this.domElement.attributes) {
                task(attribute.name, attribute.value);
            }
            return this;
        }
        attributeNames() {
            var list = new Array();
            for (var name of this.domElement.attributes) {
                list.push(name);
            }
            return list;
        }
        add(name, value) {
            return this.set(name, value);
        }
        set(name, value) {
            this.domElement.setAttribute(name, value);
            return this;
        }
        with(name, task) {
            var value = this.get(name);
            task(value);
            return this;
        }
        get(name) {
            return this.domElement.getAttribute(name);
        }
        has(name) {
            return this.domElement.getAttribute(name) != null;
        }
        remove(name) {
            this.domElement.removeAttribute(name);
            return this;
        }
    }

    /*
     * Fluid DOM for JavaScript
     * (c) Copyright 2018 Warwick Molloy
     * Available under the MIT License
     */
    class Classes {
        constructor(domElement, elementObject) {
            this.element = elementObject;
            this.domElement = domElement;
        }
        each(task) {
            for (var _class of this.domElement.classList) {
                task(_class);
            }
            return this;
        }
        has(name) {
            return this.domElement.classList.contains(name);
        }
        whenHas(name, task) {
            if (this.has(name)) {
                task(this.element);
            }
            return this;
        }
        add(_class) {
            if (!!_class && _class.length > 0) {
                this.domElement.classList.add(_class);
            }
            else {
                console.error(`Class name given was "${_class}" - it must not be empty!`);
            }
            return this;
        }
        remove(_class) {
            this.domElement.classList.remove(_class);
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
    var LocatedBy;
    (function (LocatedBy) {
        LocatedBy["FailedToLocate"] = "Failed to locate";
        LocatedBy["Id"] = "id";
        LocatedBy["Selector"] = "selector";
        LocatedBy["Class"] = "class";
        LocatedBy["TagName"] = "tagName";
        LocatedBy["ConstructedWithElement"] = "from given element";
        LocatedBy["ConstructedWithChildren"] = "from given list of children";
    })(LocatedBy || (LocatedBy = {}));
    var Tag;
    (function (Tag) {
        Tag["Button"] = "BUTTON";
        Tag["Div"] = "DIV";
        Tag["Input"] = "INPUT";
        Tag["Paragraph"] = "P";
    })(Tag || (Tag = {}));

    /*
     * Fluid DOM for JavaScript
     * (c) Copyright 2018 Warwick Molloy
     * Available under the MIT License
     */
    class ElementList {
        convertToListOfElements(htmlList) {
            var list = [];
            if (!!htmlList) {
                for (var member of htmlList) {
                    var element = new Element({ domElement: member });
                    list.push(element);
                }
            }
            return list;
        }
        constructor(elementListLocation) {
            var selector = elementListLocation.selector;
            var tagName = elementListLocation.tagName;
            var children = elementListLocation.children;
            var _class = elementListLocation.class;
            this.elementListLocation = elementListLocation;
            this.elementList = Array();
            this.locatedBy = LocatedBy.FailedToLocate;
            if (selector != undefined) {
                this.selectList(selector);
            }
            else if (!!tagName) {
                this.tagList(tagName);
            }
            else if (!!children) {
                this.childList(children);
            }
            else if (!!_class) {
                this.classList(_class);
            }
            else {
                providesOne(['selector', 'class', 'tagName'], elementListLocation);
                this.elementList = [];
            }
            this.isSingle = false;
            this.type = 'ElementList';
        }
        each(doTask) {
            for (var index = 0; index < this.elementList.length; index++) {
                doTask(this.getElementAt(index));
            }
            return this;
        }
        getElementAt(index) {
            return this.elementList[index];
        }
        map(func) {
            return this.elementList.map(func);
        }
        filter(func) {
            return this.elementList.filter(func);
        }
        reduce(func) {
            return this.elementList.reduce(func);
        }
        length() {
            return this.elementList.length;
        }
        selectList(selector) {
            this.elementList = this.convertToListOfElements(document.querySelectorAll(selector));
            this.locatedBy = LocatedBy.Selector;
        }
        tagList(tagName) {
            this.elementList = this.convertToListOfElements(document.getElementsByTagName(tagName));
            this.locatedBy = LocatedBy.TagName;
        }
        childList(children) {
            this.elementList = this.convertToListOfElements(children);
            this.locatedBy = LocatedBy.ConstructedWithChildren;
        }
        classList(_class) {
            this.elementList = this.convertToListOfElements(document.getElementsByClassName(_class));
            this.locatedBy = LocatedBy.Class;
        }
    }

    /*
     * Fluid DOM for JavaScript
     * (c) Copyright 2018 Warwick Molloy
     * Available under the MIT License
     */
    class Element {
        constructor(elementLocation) {
            this.type = 'Element';
            this.isSingle = true;
            var id = elementLocation.id;
            var selector = elementLocation.selector;
            var domElement = elementLocation.domElement;
            this.locatedBy = LocatedBy.FailedToLocate;
            this.isValid = false;
            if (!!domElement) {
                this.elementPassed(elementLocation);
            }
            else if (!!id) {
                this.idPassed(id);
            }
            else if (!!selector) {
                this.selectorPassed(selector);
            }
            else {
                providesOne(['id', 'selector'], elementLocation);
                this.nullElement(elementLocation);
                this.isValid = false;
            }
            if (!this.isValid) {
                logWarning(`Element to be matched by ${this.locatedBy} was not valid`);
            }
            this.parent = this.isValid ? this.domElement.parentElement : undefined;
            this.type = 'Element';
            this.elementLocation = elementLocation;
            this.isSingle = true;
        }
        elementPassed(elementLocation) {
            this.domElement = elementLocation.domElement;
            this.locatedBy = LocatedBy.ConstructedWithElement;
            this.isValid = !!this.domElement;
        }
        idPassed(id) {
            this.locatedBy = LocatedBy.Id;
            this.domElement = document.getElementById(id);
            this.isValid = !!this.domElement;
        }
        selectorPassed(selector) {
            this.domElement = document.querySelector(selector);
            this.locatedBy = LocatedBy.Selector;
            this.isValid = !!this.domElement;
        }
        nullElement(elementLocation) {
            this.domElement = {
                tagName: `NO MATCH by ${elementLocation}`,
                parentElement: undefined,
                innerHTML: undefined,
                innerText: undefined
            };
            this.locatedBy = LocatedBy.FailedToLocate;
        }
        children() {
            return new ElementList({
                children: this.domElement.children
            });
        }
        eachChild(doWith) {
            for (var child of this.domElement.children) {
                var childElement = new Element({ domElement: child });
                doWith(childElement);
            }
            return this;
        }
        expect(tagName) {
            if (this.domElement.tagName !== tagName) {
                console.error(`Expected ${tagName} but Actual ${this.domElement.tagName}`);
            }
            return this;
        }
        getId() {
            return this.attributes().get('id');
        }
        getParent() {
            return new Element({ domElement: this.domElement.parentElement });
        }
        hasId() {
            return this.attributes().has('id');
        }
        exists() {
            return this.isValid;
        }
        findAll(elementListLocation) {
            return new ElementList(elementListLocation);
        }
        selectFirst(selector) {
            var domElement = this.domElement.querySelector(selector);
            if (!domElement) {
                var fullSelector = `${this.selectorPath()}>${selector}`;
                return new Element({ selector: fullSelector });
            }
            else {
                return new Element({ selector: selector });
            }
        }
        selectorPath() {
            var domElement = this.domElement;
            var isValid = (e) => (!!e);
            var nodeList = [];
            while (isValid(domElement)) {
                var _id = domElement.getAttribute('id');
                var _class = domElement.getAttribute('class');
                if (_id) {
                    nodeList.push('#' + _id);
                    domElement = null; // break out
                }
                else {
                    if (_class) {
                        nodeList.push('.' + _class);
                    }
                    else {
                        nodeList.push(domElement.tagName);
                    }
                    domElement = domElement.parentElement;
                }
            }
            nodeList.reverse();
            return nodeList.reduce((parent, child) => `${parent}>${child}`);
        }
        tagName() {
            return this.isValid ? this.domElement.tagName : 'UNKNOWN';
        }
        text(_text) {
            if (!!_text) {
                this.domElement.innerText = _text;
                return this;
            }
            return this.domElement.innerText;
        }
        html(_html) {
            if (!!_html) {
                this.domElement.innerHTML = _html;
                return this;
            }
            else {
                return this.domElement.innerHTML;
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
            this.domElement.remove();
            return undefined;
        }
        attributes() {
            return new Attributes(this.domElement);
        }
        classes() {
            return new Classes(this.domElement, this);
        }
        on(args) {
            if (providesAll(['event', 'handler'], args)) {
                var event = args.event;
                var handler = args.handler;
                var optKeepDefault = args.keepDefault;
                this.domElement.addEventListener(event, function (firedEvent) {
                    if (!optKeepDefault) {
                        firedEvent.preventDefault();
                    }
                    handler(firedEvent);
                });
            }
        }
        value() {
            if (this.domElement['value'] != undefined) {
                return this.domElement.value;
            }
            return undefined;
        }
    }

    /*
     * Fluid DOM for JavaScript
     * (c) Copyright 2018 Warwick Molloy
     * Available under the MIT License
     */
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
    function createEventHash() {
        var events = {};
        for (var ev of EVENT_LIST) {
            var key = ev.toUpperCase();
            events[key] = ev;
        }
        return events;
    }
    class DOM {
        constructor() {
            this.events = createEventHash();
        }
        findElement(arg) {
            return new Element(arg);
        }
        findAll(arg) {
            return new ElementList(arg);
        }
        buttonOn(eventInfo) {
            if (providesAll(['id', 'event', 'handler'], eventInfo)) {
                var id = eventInfo.id;
                var button = this.findElement({ id: id }).expect(Tag.Button);
                button.on(eventInfo);
            }
        }
    }
    const Events = {};
    for (var event of EVENT_LIST) {
        Events[event.toUpperCase()] = event;
    }

    exports.DOM = DOM;
    exports.Events = Events;

    return exports;

}({}));

