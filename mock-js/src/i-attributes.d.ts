/**
 * # IAttributes
 *
 * Represents the general concept of element attributes and the various
 * operations that can be performed on or with attributes.
 *
 */
export interface IAttributes {
    /**
     * Iterates through the attributes on an element.
     * @param callback taking name and value as arguments to perform logic.
     */
    forEach(callback: (name: string, value: string) => void): IAttributes;
    /**
     * Gets a list of attribute names.
     */
    attributeNames(): Array<string>;
    /**
     * Add an attribute to an element.
     * @param name - name of the attribute to add.
     * @param value - value to assign the new attribute.
     */
    add(name: string, value: string): IAttributes;
    /**
     * An alias for `add(name, value)` - setting an attribute
     * makes as much sense as adding it. Can be considered like
     * an assignment where, disregarding if the attribute existed before,
     * a new value should be assigned. But the effect is the same as `add.`
     * @param name - name of the attribute
     * @param value - value to set
     * @see add
     */
    set(name: string, value: string): IAttributes;
    /**
     *
     * @param name
     * @param callback
     */
    with(name: string, callback: (value: string | null) => void): IAttributes;
    /**
     * Get the current value of the attribute (if present).
     * @param name of the attribute
     * @returns `null` if the attribute is not present or the string value.
     * @see has
     */
    get(name: string): string | null;
    /**
     * Supports testing if the attribute is present _before_ attempting
     * to get its current value.
     * @param name of attribute to check for.
     * @returns true if present, false otherwise.
     */
    has(name: string): boolean;
    /**
     * Removes the named attribute from the related element.
     * @param name of attribute to remove.
     */
    remove(name: string): IAttributes;
}
