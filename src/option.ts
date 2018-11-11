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
export class Option<T> {
  private value: T | null;

  constructor(_value ?: T) {
    if (_value) {
      this.value = _value;
    } else {
      this.value = null;
    }
  }

/**
 * Check that there is a value before
 * calling this.
 * @see isValid
 */
  get Value() : T {
    return <T> this.value;
  }

/**
 * Tests if the value is known.
 */
  get isValid() : boolean {
    return !! this.value;
  }
}