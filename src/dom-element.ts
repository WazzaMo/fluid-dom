/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { Option } from './option';

import { providesOne, providesAll, logWarning } from './util'
import { DomAttributes } from './dom-attributes'
import { DomClasses } from './dom-classes'

import { NonClasses } from './non-classes';

import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';
import { IAttributes } from './i-attributes';
import { IElement } from './i-element';
import { IClasses } from './i-classes';

/**
 * @private an internal function.
 * @param collection HTML collection to convert into array of IElement
 */
function convertHtmlCollection(
  collection: HTMLCollection | NodeListOf<Element>
) : Array<IElement> {
  let list: Array<IElement> = [];
  for(var index = 0; index < collection.length; index++) {
    let child = <HTMLElement> collection[index];
    list.push( new DomElement(child) );
  }
  return list;
}

/**
 * @private an internal function.
 */
function selectorPath(element : HTMLElement | Element ) : string {
  let path = '';
  if (element) {
    let id = element.getAttribute('id');
    if (id) {
      path = `#{$id}`;
    } else if ( ! element.parentElement ) {
      path = element.tagName;
    } else {
      path = `${selectorPath(element.parentElement)}>${element.tagName}`;
    }
  }
  return path;
}

/**
 * @private an internal function.
 */
function getBySelector(element: HTMLElement | Element, selector: string) : HTMLElement | null {
  let first = element.querySelector(selector);

  if (first) {
    return <HTMLElement>first;
  } else {
    first = document.querySelector( `${selectorPath(element)}>${selector}`);
    if (first) {
      return <HTMLElement>first;
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
export class DomElement implements IElement {
  private domElement: Option<HTMLElement>;

  constructor ( element?: HTMLElement | Element) {
    this.domElement = new Option<HTMLElement>(<HTMLElement> element);
  }

  private alertInvalid(): void {
    console.error("IElement[DomElement] is invalid.");
  }

  /**
   * Finds elements in a document using a selector.
   * @param selector - CSS style selector.
   * @returns list of matching elements.
   */
  static getListFromSelector(selector:string) : Array<IElement> {
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
  static getListFromClass(_class:string) : Array<IElement> {
    let list = document.querySelectorAll(`.${_class}`);
    return convertHtmlCollection(list);
  }

  /**
   * Finds elements in a document using a tag-name.
   * @param tagName - tag name (case insensitive).
   * @returns list of matching elements.
   */
  static getListFromTagName(tagName:string) : Array<IElement> {
    let list = document.querySelectorAll(tagName);
    return convertHtmlCollection(list);
  }

  static getElementFromId(id: string) : IElement {
    let element = document.querySelector(`#${id}`);
    return DomElement.makeFromElement(element);
  }

  /**
   * Gets the first matching element from a document.
   * @param selector - a CSS style selector
   * @returns an element object.
   */
  static getElementFromSelector(selector: string) : IElement {
    let element = document.querySelector(selector);
    return DomElement.makeFromElement(element);
  }

  /**
   * Factory method for a non-element object.
   * @returns an element object where isValid() is always false.
   * @see isValid
   */
  static nullElement() : IElement {
    return new DomElement();
  }

  private static makeFromElement(element: Element | HTMLElement | null ): IElement {
    return (!! element) ? new DomElement(element): this.nullElement();
  }

  isValid() : boolean {
    return this.domElement.isValid;
  }

  getParent() : IElement {
    if (this.domElement.isValid) {
      let element : HTMLElement = this.domElement.Value;
      let _par = element.parentElement;
      let parent: DomElement;
      parent = _par ? new DomElement(<HTMLElement> _par) : new DomElement();
      return parent;
    }
    return DomElement.nullElement();
  }

  withChildren(callback: (list:Array<IElement>)=>void) : IElement {
    if (this.domElement.isValid && this.domElement.Value.children.length > 0) {
      let list = convertHtmlCollection( this.domElement.Value.children);
      callback(list);
    }
    return this;
  }

  expect(tagName: string) : IElement{
    if (this.domElement.isValid) {
      let actual = this.domElement.Value.tagName.toUpperCase();
      let expected = tagName.toUpperCase();
      if ( actual != expected )  {
        console.error(`Expected ${expected} but Actual tagName was ${actual}`);
      }
    } else {
      this.alertInvalid();
    }
    return this;
  }

  getId() : string | null {
    return this.attributes().get('id');
  }

  hasId() {
    return this.attributes().has('id')
  }

  exists() {
    return this.isValid();
  }

  findAll(elementListLocation: ElementListSource) : Array<IElement> {
    let selector = elementListLocation['selector'] || elementListLocation['tagName'];
    if (selector) {
      let collection = this.domElement.Value.querySelectorAll(selector);
      let list = convertHtmlCollection( collection );
      return list;
    }
    return [];
  }

  selectFirst(selector: string) : IElement {
    if (this.domElement.isValid) {
      let first : HTMLElement | null = getBySelector(this.domElement.Value, selector);

      if (first) {
        return new DomElement(<HTMLElement>first);
      }
    }
    return new DomElement();
  }

  selectorPath() : string {
    if (this.domElement.isValid) {
      return selectorPath( this.domElement.Value );
    }
    this.alertInvalid();
    return '';
  }

  tagName() : string {
    if (this.domElement.isValid) {
      return this.domElement.Value.tagName;
    }
    this.alertInvalid();
    return 'UNKNOWN';
  }

  text(_text ?: string) : IElement | string {
    if (this.domElement.isValid) {
      let element = this.domElement.Value;
      if (!!_text ) {
        element.innerText = _text
        return this;
      } else {
        return element.innerText;
      }
    } else  {
      this.alertInvalid();
      return '';
    }
  }

  html(_html ?: string) : IElement | string {
    if (this.domElement.isValid) {
      let element = this.domElement.Value;
      if (!! _html) {
        element.innerHTML = _html
        return this;
      } else {
        return element.innerHTML;
      }
    } else {
      this.alertInvalid();
      return '';
    }
  }

  append(_html: string) : IElement{
    var totalHtml = `${this.html()}${_html}`
    this.html(totalHtml)
    return this;
  }

  prepend(_html: string) : IElement {
    var totalHtml = `${_html}${this.html()}`
    this.html(totalHtml)
    return this;
  }

  remove() : undefined {
    if (this.domElement.isValid) {
      this.domElement.Value.remove();
    } else {
      this.alertInvalid();
    }
    return undefined;
  }

  attributes() : IAttributes {
    return new DomAttributes(this.domElement.Value);
  }

  classes(): IClasses {
    if (this.domElement.isValid) {
      return new DomClasses(this.domElement.Value, this);
    }
    return new NonClasses();
  }

  on(args: EventHandlerInfo) : void {
    if (providesAll(['event','handler'], args) && this.domElement.isValid) {
      var event = args.event;
      var handler = args.handler;
      var optKeepDefault = args.keepDefault;
      this.domElement.Value.addEventListener(event, function(firedEvent: any) {
        if (! optKeepDefault) {
          firedEvent.preventDefault()
        }
        handler(firedEvent)
      })
    }
  }

  value() : string | undefined {
    if (this.domElement.isValid) {
      let element = <any> this.domElement.Value;
      if (element['value']) {
        return element.value;
      }
    }
    return undefined
  }
}