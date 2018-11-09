/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { Option } from './option';

import { providesOne, providesAll, logWarning } from './util'
import { Attributes } from './attributes'
import { Classes } from './classes'

import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';
import { IElement } from './i-element';


function convertHtmlCollection(
  collection: HTMLCollection | NodeListOf<Element>
) : Array<IElement> {
  let list: Array<IElement> = [];
  for(var index = 0; index < collection.length; index++) {
    let child = <HTMLElement> collection[index];
    list.push( cast( new DomElement(child) ) );
  }
  return list;
}

function cast(domElement: DomElement) : IElement {
  let that: unknown = domElement;
  return <IElement> that;
}

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
 * @type DomElement
 * Is the IElement implementation for elements in the browser
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

  static getListFromSelector(selector:string) : Array<IElement> {
    let list = document.querySelectorAll(selector);
    return convertHtmlCollection(list);
  }

  static getListFromClass(_class:string) : Array<IElement> {
    let list = document.querySelectorAll(_class);
    return convertHtmlCollection(list);
  }

  static getListFromTagName(tagName:string) : Array<IElement> {
    let list = document.querySelectorAll(tagName);
    return convertHtmlCollection(list);
  }

  static getElementFromId(id: string) : IElement {
    let element = document.querySelector(`#${id}`);
    return DomElement.makeFromElement(element);
  }

  static getElementFromSelector(selector: string) : IElement {
    let element = document.querySelector(selector);
    return DomElement.makeFromElement(element);
  }

  static nullElement() : IElement {
    return cast( new DomElement() );
  }

  private static makeFromElement(element: Element | HTMLElement | null ): IElement {
    return (!! element) ? cast( new DomElement(element) ) : cast( new DomElement() );
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
      return cast( parent );
    }
    return cast( new DomElement() );
  }

  withChildren(callback: (list:Array<IElement>)=>void) : IElement {
    if (this.domElement.isValid && this.domElement.Value.children.length > 0) {
      let list = convertHtmlCollection( this.domElement.Value.children);
      callback(list);
    }
    return cast( this );
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
    return cast( this );
  }

  getId() {
    return this.attributes().get('id')
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
        return cast(new DomElement(<HTMLElement>first));
      }
    }
    return cast(new DomElement());
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
        return cast( this );
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
        return cast( this );
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
    return cast( this );
  }

  prepend(_html: string) : IElement {
    var totalHtml = `${_html}${this.html()}`
    this.html(totalHtml)
    return cast( this );
  }

  remove() : undefined {
    if (this.domElement.isValid) {
      this.domElement.Value.remove();
    } else {
      this.alertInvalid();
    }
    return undefined
  }

  attributes() {
    return new Attributes(this.domElement);
  }

  classes() {
    return new Classes(this.domElement, this);
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