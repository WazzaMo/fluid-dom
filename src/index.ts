/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export * from './dom-attributes'
export * from './dom-classes'
export * from './constants'
export * from './dom-element'
export * from './element-source'
export * from './element-list-source'
export * from './event-handler-info'
export * from './util'

export * from './http';
export * from "./http-method";
export * from "./http-response-type";
export * from "./http-protocol";
export * from "./http-response";

export { Doc, Events } from './fluid-dom';

import { Doc, Events } from './fluid-dom';

export const fluid = {
  Doc,
  Events
}