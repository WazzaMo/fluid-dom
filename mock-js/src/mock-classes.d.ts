import { IElement } from './i-element';
import { IClasses } from './i-classes';
/**
 * # MockClasses
 *
 * Representation of classes on a mock element.
 */
export declare class MockClasses implements IClasses {
    private classNames;
    private element;
    constructor(element: IElement);
    internalGetClassValue(): string;
    forEach(callback: (className: string) => void): IClasses;
    has(name: string): boolean;
    whenHas(name: string, callback: (element: IElement) => void): IClasses;
    add(_class: string): IClasses;
    remove(_class: string): IClasses;
    set(_class: string): IClasses;
}
