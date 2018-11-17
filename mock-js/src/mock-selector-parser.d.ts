import { ElementNode } from './mock-document-nodes';
/**
 * Parses a selector to create a parse plan that can be
 * executed using the @see parseWith method.
 */
export declare class MockSelectorParser {
    selector: string;
    constructor(selector: string);
    parseWith(element: ElementNode): Array<ElementNode>;
}
