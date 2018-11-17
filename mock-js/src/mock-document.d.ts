import { ElementNode, IElementNodeFactory } from './mock-document-nodes';
import { IFluidDocument } from './i-fluid-document';
import { IElement } from './i-element';
import { ElementSource } from './element-source';
import { ElementListSource } from './element-list-source';
import { EventHandlerInfo } from './event-handler-info';
export { MockElement } from './mock-element';
export { MockAttributeSet, MockAttributes } from './mock-attributes';
export { MockClasses } from './mock-classes';
export { MockSelectorParser } from './mock-selector-parser';
export { ElementNode };
/**
 * # MockDocument
 */
export declare class MockDocument implements IElementNodeFactory, IFluidDocument {
    root_node: ElementNode;
    constructor();
    create_child_text(text: string): IElementNodeFactory;
    create_child_element(child_tag: string, id: string | undefined, callback: ((mock: ElementNode) => void) | undefined): IElementNodeFactory;
    toHtml(): string;
    findElement(arg: ElementSource): IElement;
    findAll(arg: ElementListSource): IElement[];
    buttonOn(eventInfo: EventHandlerInfo): void;
}
export declare function Doc(): IFluidDocument;
