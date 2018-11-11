/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { IAttributes } from './i-attributes';

export interface MockAttributeSet {
  [key:string] : string
}


export class MockAttributes implements IAttributes {
  private attributes: MockAttributeSet;

  constructor(set: MockAttributeSet) {
    this.attributes = set;
  }

  forEach(callback: (name: string, value: string) => void): IAttributes {
    for(var key in this.attributes) {
      let value = this.attributes[key];
      callback(key, value);
    }
    return this;
  }

  attributeNames(): string[] {
    let allNames: Array<string> = [];
    for(var key in this.attributes) {
      allNames.push(key);
    }
    return allNames;
  }

  add(name: string, value: string): IAttributes {
    throw new Error("Method not implemented.");
  }
  set(name: string, value: string): IAttributes {
    throw new Error("Method not implemented.");
  }
  with(name: string, callback: (value: string | null) => void): IAttributes {
    throw new Error("Method not implemented.");
  }
  get(name: string): string | null {
    throw new Error("Method not implemented.");
  }
  has(name: string): boolean {
    throw new Error("Method not implemented.");
  }
  remove(name: string): IAttributes {
    throw new Error("Method not implemented.");
  }

}