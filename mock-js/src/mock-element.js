/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
import { Option } from './option';
import { MockNodeType, } from './mock-document-nodes';
export class MockElement {
    constructor(element) {
        if (element) {
            this._element = new Option(element);
        }
        else {
            this._element = new Option();
        }
        // this._classes = new MockClasses(this);
    }
    isValid() {
        return this._element.isValid;
    }
    getParent() {
        if (this._element.isValid) {
            let element = this._element.Value;
            if (element.hasParent()) {
                return new MockElement(element.parent);
            }
        }
        return new MockElement();
    }
    withChildren(callback) {
        if (this._element.isValid) {
            let children = this._element.Value.children;
            if (children && children.length > 0) {
                let mockElements = this.makeElementList(children);
                callback(mockElements);
            }
        }
        return this;
    }
    makeElementList(fromList) {
        let elements = fromList
            .filter((node) => node.nodeType == MockNodeType.ElementNode)
            .map((elementNode) => elementNode);
        return elements.map((ele) => new MockElement(ele));
    }
    expect(tagName) {
        if (this._element.isValid) {
            let element = this._element.Value;
            if (element.tag.toUpperCase() !== tagName.toUpperCase()) {
                console.trace(`Expected ${tagName} but actual value was ${element.tag}`);
            }
        }
        return this;
    }
    getId() {
        if (this._element.isValid) {
            let element = this._element.Value;
            let id = element.attrib('id');
            if (id) {
                return id;
            }
        }
        return null;
    }
    hasId() {
        return !!this.getId();
    }
    exists() {
        return this._element.isValid;
    }
    findAll(elementListLocation) {
        let results = [];
        if (elementListLocation.class && this._element.isValid) {
            this._element.Value.queryByClass(elementListLocation.class, results);
            return this.makeElementList(results);
        }
        else if (elementListLocation.tagName && this._element.isValid) {
            this._element.Value.queryByTag(elementListLocation.tagName, results);
            return this.makeElementList(results);
        }
        throw new Error("Method not implemented.");
    }
    selectFirst(selector) {
        throw new Error("Method not implemented.");
    }
    selectorPath() {
        throw new Error("Method not implemented.");
    }
    tagName() {
        throw new Error("Method not implemented.");
    }
    text(_text) {
        throw new Error("Method not implemented.");
    }
    html(_html) {
        throw new Error("Method not implemented.");
    }
    append(_html) {
        throw new Error("Method not implemented.");
    }
    prepend(_html) {
        throw new Error("Method not implemented.");
    }
    remove() {
        throw new Error("Method not implemented.");
    }
    attributes() {
        throw new Error("Method not implemented.");
    }
    classes() {
        throw new Error("Method not implemented.");
    }
    on(args) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vY2stZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBVUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLEVBR0wsWUFBWSxHQUNiLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsTUFBTSxPQUFPLFdBQVc7SUFHdEIsWUFBWSxPQUFxQjtRQUMvQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQWMsT0FBTyxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLEVBQWUsQ0FBQztTQUMzQztRQUNELHlDQUF5QztJQUMzQyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN2QixPQUFPLElBQUksV0FBVyxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUUsQ0FBQzthQUMxQztTQUNGO1FBQ0QsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBb0M7UUFDL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUN6QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDNUMsSUFBRyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLElBQUks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