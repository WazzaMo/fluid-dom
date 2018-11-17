import { IAttributes } from './i-attributes';
export interface MockAttributeSet {
    [key: string]: string;
}
export declare class MockAttributes implements IAttributes {
    private attributes;
    constructor(set: MockAttributeSet);
    forEach(callback: (name: string, value: string) => void): IAttributes;
    attributeNames(): string[];
    add(name: string, value: string): IAttributes;
    set(name: string, value: string): IAttributes;
    with(name: string, callback: (value: string | null) => void): IAttributes;
    get(name: string): string | null;
    has(name: string): boolean;
    remove(name: string): IAttributes;
}
