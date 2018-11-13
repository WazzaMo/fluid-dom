/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { providesOne, providesAll } from './util'
import { DomElement } from './dom-element'
import { ElementListSource } from './element-list-source'
import { EventHandlerInfo } from './event-handler-info';
import { IElement } from './i-element';
import { ElementSource } from './element-source';

import { NonElement } from './non-element';

import {
  IFluidDocument
} from './i-fluid-document';

import { EVENT_LIST, Tag } from './constants';

export { Http } from './http';
export { HttpMethod } from "./http-method";
export { HttpResponseType } from "./http-response-type";
export { HttpProtocol } from "./http-protocol";
export { HttpResponse } from "./http-response";

export const Events = EVENT_LIST;


class DOM implements IFluidDocument {

  constructor() {
  }

  findElement(arg: ElementSource) : IElement {
    let id = arg['id'];
    if (id) {
      return DomElement.getElementFromId(id);
    }

    let selector = arg['selector'];
    if (selector) {
      return  DomElement.getElementFromSelector(selector);
    }
    return new NonElement();
  }

  findAll(arg: ElementListSource) : Array<IElement> {
    let selector = arg['selector'];
    if(selector) {
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

  buttonOn(eventInfo: EventHandlerInfo) {
    if (providesAll(['id', 'event', 'handler'],eventInfo)) {
      var id = eventInfo.id
      var button = this.findElement({id: id}).expect(Tag.Button)
      button.on(eventInfo)
    }
  }

}

export function Doc() : IFluidDocument {
  return new DOM();
}