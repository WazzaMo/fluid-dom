/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
import { ElementNode, toHtml } from './mock-document-nodes';
export { MockElement } from './mock-element';
export { MockAttributes } from './mock-attributes';
export { MockClasses } from './mock-classes';
export { MockSelectorParser } from './mock-selector-parser';
export { ElementNode };
/**
 * # MockDocument
 */
export class MockDocument {
    constructor() {
        this.root_node = new ElementNode('HTML');
    }
    create_child_text(text) {
        this.root_node.create_child_text(text);
        return this;
    }
    create_child_element(child_tag, id, callback) {
        this.root_node.create_child_element(child_tag, id, callback);
        return this;
    }
    toHtml() {
        return toHtml(this.root_node);
    }
    findElement(arg) {
        throw new Error("Method not implemented.");
    }
    findAll(arg) {
        throw new Error("Method not implemented.");
    }
    buttonOn(eventInfo) {
        throw new Error("Method not implemented.");
    }
}
export function Doc() {
    return new MockDocument();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2NrLWRvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsV0FBVyxFQUlYLE1BQU0sRUFDUCxNQUFNLHVCQUF1QixDQUFDO0FBUy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQW9CLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFFdkI7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUd2QjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUUsTUFBTSxDQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsU0FBaUIsRUFDakIsRUFBc0IsRUFDdEIsUUFBb0Q7UUFFcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFrQjtRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFzQjtRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUEyQjtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLEdBQUc7SUFDakIsT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQzVCLENBQUMifQ==