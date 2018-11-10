/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { IAttributes } from './i-attributes';

/**
 * Represents a non-attributes instance, to be returned
 * when no effective attributes instance can be provided.
 */
export class NonAttributes implements IAttributes {
  constructor() {}

  each(callback: (name: string, value: string) => void): IAttributes {
    return this;
  }
  
  attributeNames(): string[] {
    return [];
  }

  add(name: string, value: any): IAttributes {
    return this;
  }

  set(name: string, value: any): IAttributes {
    return this;
  }

  with(name: string, callback: (value: string | null) => void): IAttributes {
    return this;
  }

  get(name: string): string | null {
    return null;
  }

  has(name: string): boolean {
    return false;
  }
  remove(name: string): IAttributes {
    return this;
  }
}
