import { IAttributes } from './i-attributes';
import { IClasses } from './i-classes';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';
export interface IElement {
    isValid(): boolean;
    getParent(): IElement;
    withChildren(callback: (list: Array<IElement>) => void): IElement;
    expect(tagName: string): IElement;
    /**
     * Shortcut to get the 'id' attribute's value from the element.
     * @returns null when the 'id' attribute is not present.
     */
    getId(): string | null;
    hasId(): boolean;
    exists(): boolean;
    findAll(elementListLocation: ElementListSource): Array<IElement>;
    selectFirst(selector: string): IElement;
    selectorPath(): string;
    tagName(): string;
    text(_text?: string): IElement | string;
    html(_html?: string): IElement | string;
    append(_html: string): IElement;
    prepend(_html: string): IElement;
    remove(): undefined;
    attributes(): IAttributes;
    classes(): IClasses;
    on(args: EventHandlerInfo): void;
    value(): string | undefined;
}
