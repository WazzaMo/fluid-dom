/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

/**
 * # IAttributes
 * 
 * Represents the general concept of element attributes and the various
 * operations that can be performed on or with attributes.
 * 
 */

export interface IAttributes {
  each(callback: (name:string, value:string)=> void) : IAttributes;

  attributeNames() : Array<string>;

  add(name: string, value: any) : IAttributes;

  set(name: string, value: any) : IAttributes;

  with(name: string, callback: (value:string | null) => void): IAttributes;

  get(name: string): string | null;

  has(name: string): boolean;

  remove(name: string) : IAttributes;
}