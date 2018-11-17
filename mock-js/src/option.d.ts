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
export declare class Option<T> {
    private value;
    constructor(_value?: T);
    /**
     * Check that there is a value before
     * calling this.
     * @see isValid
     */
    readonly Value: T;
    /**
     * Tests if the value is known.
     */
    readonly isValid: boolean;
}
