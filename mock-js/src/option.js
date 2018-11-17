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
export class Option {
    constructor(_value) {
        if (_value) {
            this.value = _value;
        }
        else {
            this.value = null;
        }
    }
    /**
     * Check that there is a value before
     * calling this.
     * @see isValid
     */
    get Value() {
        return this.value;
    }
    /**
     * Tests if the value is known.
     */
    get isValid() {
        return !!this.value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUg7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQUdqQixZQUFZLE1BQVc7UUFDckIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUg7Ozs7T0FJRztJQUNELElBQUksS0FBSztRQUNQLE9BQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUg7O09BRUc7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRiJ9