/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { ElementSource } from './element-source';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';

import { IElement } from './i-element';


/**
 * Represents the concept of a Document that can 
 * be fluidly interacted with and changed.
 */
export interface IFluidDocument {
  findElement(arg: ElementSource) : IElement;
  findAll(arg: ElementListSource) : Array<IElement>;
  buttonOn(eventInfo: EventHandlerInfo) : void;
}

declare function Doc() : IFluidDocument;