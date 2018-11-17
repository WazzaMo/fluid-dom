/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
import { MockNodeType } from './mock-document-nodes';
// ----------
function TagSelector(selector) {
    let step = (element) => {
        let list = [];
        element.queryByTag(selector, list);
        return list;
    };
    return step;
}
function ChildrenByTag(tag) {
    let finder = (element) => {
        let nodeList = element.children
            .filter((node) => node.nodeType == MockNodeType.ElementNode)
            .filter((child_node) => {
            let child = child_node;
            return child.tag.toUpperCase() == tag.toUpperCase();
        });
        return nodeList.map((item) => item);
    };
    return finder;
}
function HierarchySelector(selector) {
    return (element) => {
        let pathList = selector.split('>')
            .map((part) => part.trim())
            .map((sub) => ChildrenByTag(sub));
        let task = ApplyRecursiveElementForBestMatch(pathList);
        return task(element);
    };
}
function ApplyRecursiveElementForBestMatch(list) {
    function goDeeper(command_list, element, results) {
        let command = command_list.pop();
        if (command) {
            let possibles = command(element);
            if (command_list.length == 0) {
                possibles.forEach((item) => results.push(item));
            }
            else {
                possibles.forEach((item) => goDeeper(command_list, item, results));
            }
        }
    } //-- goDeeper --
    let trail = (root) => {
        list.reverse();
        let results = [];
        goDeeper(list, root, results);
        return results;
    };
    return trail;
}
function ApplySameElementToList(list) {
    let task = (element) => {
        let result = [];
        list.forEach((output) => result = result.concat(output(element)));
        return result;
    };
    return task;
}
function SelectorList(selector) {
    return (element) => {
        let list = selector.split(',')
            .map((s) => s.trim())
            .map((sub_selector) => TagSelector(sub_selector));
        let task = ApplySameElementToList(list);
        return task(element);
    };
}
function HierarchyOrOther(selector) {
    if (selector.includes('>')) {
        return HierarchySelector(selector);
    }
    else {
        return TagSelector(selector);
    }
}
function ListOrOther(selector) {
    if (selector.includes(',')) {
        return SelectorList(selector);
    }
    else {
        return HierarchyOrOther(selector);
    }
}
/**
 * Parses a selector to create a parse plan that can be
 * executed using the @see parseWith method.
 */
export class MockSelectorParser {
    constructor(selector) {
        this.selector = selector;
    }
    parseWith(element) {
        let output = ListOrOther(this.selector);
        return output(element);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1zZWxlY3Rvci1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9jay1zZWxlY3Rvci1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCxZQUFZLEVBRWIsTUFBTSx1QkFBdUIsQ0FBQztBQWtCL0IsYUFBYTtBQUViLFNBQVMsV0FBVyxDQUFDLFFBQWdCO0lBQ25DLElBQUksSUFBSSxHQUFlLENBQUMsT0FBb0IsRUFBRSxFQUFFO1FBQzlDLElBQUksSUFBSSxHQUF1QixFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUE7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxHQUFVO0lBQy9CLElBQUksTUFBTSxHQUFnQixDQUFDLE9BQW9CLEVBQUUsRUFBRTtRQUNqRCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTthQUM1QixNQUFNLENBQUUsQ0FBQyxJQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUM7YUFDMUUsTUFBTSxDQUFFLENBQUMsVUFBd0IsRUFBRSxFQUFFO1lBQ3BDLElBQUksS0FBSyxHQUFpQixVQUFVLENBQUM7WUFDckMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNMLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBRSxDQUFDLElBQWtCLEVBQUMsRUFBRSxDQUFjLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLGlCQUFpQixD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