/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
import { MockNodeType } from './mock-document-nodes';
// ----------
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
function AttributeSelector(selector) {
    ;
    function HasTag(tag) {
        return (!!tag) && tag.length > 0;
    }
    function toPairs(attribList) {
        let attribs = [];
        attribList.forEach((part) => {
            let nameOnly, nameValue;
            nameOnly = part.match(/(\w+)/);
            nameValue = part.match(/(\w+).*="(.*)"/);
            if (nameValue) {
                let [_all, name, value] = nameValue;
                attribs.push({ name, value });
            }
            else if (nameOnly) {
                let [_all, name] = nameOnly;
                attribs.push({ name });
            }
        });
        return attribs;
    }
    function isMatch(tag, pairList, element) {
        let matchesAttrib = pairList.every((pair) => {
            if (pair.value) {
                return element.attrib(pair.name) === pair.value;
            }
            else {
                return !!element.attrib(pair.name);
            }
        });
        let matchesTag = HasTag(tag)
            ? tag.toUpperCase() === element.tag.toUpperCase()
            : true;
        return matchesTag && matchesAttrib;
    }
    function addAllMatches(tag, attribs, element, collection) {
        if (isMatch(tag, attribs, element)) {
            collection.push(element);
        }
        if (element.children) {
            element.children.forEach((child) => {
                if (child.nodeType == MockNodeType.ElementNode) {
                    addAllMatches(tag, attribs, child, collection);
                }
            });
        }
    }
    const OPT_TAG_AND_ATTRIBUTE_PATTERN = /(\w*)\W*\[(.*)\]/;
    let _match = selector.match(OPT_TAG_AND_ATTRIBUTE_PATTERN);
    let _all, tag, attribs;
    if (_match) {
        [_all, tag, attribs] = _match;
        let attribList = (!!attribs) ? toPairs(attribs.split('][')) : [];
        return (element) => {
            let collection = [];
            addAllMatches(tag, attribList, element, collection);
            return collection;
        };
    }
    else {
        return ChildrenByTag(selector);
    }
} // -- AttributeSelector
function SingleSelector(selector) {
    return AttributeSelector(selector);
}
function HierarchySelector(selector) {
    return (element) => {
        let pathList = selector.split('>')
            .map((part) => part.trim())
            .map((sub) => SingleSelector(sub));
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
            .map((sub_selector) => SingleSelector(sub_selector));
        let task = ApplySameElementToList(list);
        return task(element);
    };
}
function HierarchyOrOther(selector) {
    if (selector.includes('>')) {
        return HierarchySelector(selector);
    }
    else {
        return SingleSelector(selector);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1zZWxlY3Rvci1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9jay1zZWxlY3Rvci1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCxZQUFZLEVBRWIsTUFBTSx1QkFBdUIsQ0FBQztBQTBCL0IsYUFBYTtBQUViLFNBQVMsYUFBYSxDQUFDLEdBQVU7SUFDL0IsSUFBSSxNQUFNLEdBQWdCLENBQUMsT0FBb0IsRUFBRSxFQUFFO1FBQ2pELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRO2FBQzVCLE1BQU0sQ0FBRSxDQUFDLElBQWtCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFdBQVcsQ0FBQzthQUMxRSxNQUFNLENBQUUsQ0FBQyxVQUF3QixFQUFFLEVBQUU7WUFDcEMsSUFBSSxLQUFLLEdBQWlCLFVBQVUsQ0FBQztZQUNyQyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0wsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFFLENBQUMsSUFBa0IsRUFBQyxFQUFFLENBQWMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsUUFBZ0I7SUFDdUIsQ0FBQztJQUVqRSxTQUFTLE1BQU0sQ0FBQyxHQUFXO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFNBQVMsT0FBTyxDQUFDLFVBQXdCO1FBQ3ZDLElBQUksT0FBTyxHQUF1QixFQUFFLENBQUM7UUFFckMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQVksRUFBQyxFQUFFO1lBQ2xDLElBQUksUUFBUSxFQUFFLFNBQVMsQ0FBQztZQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxFQUFFO2dCQUNiLElBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBYyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBRSxDQUFDO2FBQzFDO2lCQUFNLElBQUksUUFBUSxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBZSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLE9BQU8sQ0FDZCxHQUFVLEVBQUUsUUFBMkIsRUFBRSxPQUFvQjtRQUU3RCxJQUFJLGFBQWEsR0FBWSxRQUFRLENBQUMsS0FBSyxDQUFFLENBQUMsSUFBZ0IsRUFBQyxFQUFFO1lBQy9ELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1QsT0FBTyxVQUFVLElBQUksYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FDcEIsR0FBVyxFQUNYLE9BQTBCLEVBQzFCLE9BQW9CLEVBQ3BCLFVBQThCO1FBRTlCLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxDQUFDLEtBQW1CLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7b0JBQzlDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFlLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQTtpQkFDNUQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELE1BQU0sNkJBQTZCLEdBQUcsa0JBQWtCLENBQUM7SUFDekQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzNELElBQUksSUFBSSxFQUFFLEdBQVcsRUFBRSxPQUEyQixDQUFDO0lBRW5ELElBQUksTUFBTSxFQUFFO1FBQ1YsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUU5QixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLE9BQU8sQ0FBQyxPQUFvQixFQUFFLEVBQUU7WUFDOUIsSUFBSSxVQUFVLEdBQXVCLEVBQUUsQ0FBQztZQUN4QyxhQUFhLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEQsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFBO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDO0FBRUgsQ0FBQyxDQUFDLHVCQUF1QjtBQUV6QixTQUFTLGNBQWMsQ0FBQyxRQUFnQjtJQUN0QyxPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLFFBQWdCO0lBQ3pDLE9BQU8sQ0FBQyxPQUFvQixFQUFFLEVBQUU7UUFDOUIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDL0IsR0FBRyxDQUFFLENBQUMsSUFBVyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUU7YUFDbEMsR0FBRyxDQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBRyxpQ0FBaUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxpQ0FBaUMsQ0FBQyxJQUF3QjtJQUVqRSxTQUFTLFFBQVEsQ0FDZixZQUFnQyxFQUNoQyxPQUFvQixFQUNwQixPQUEyQjtRQUUzQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMvRDtpQkFBTTtnQkFDTCxTQUFTLENBQUMsT0FBTyxDQUFFLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLGdCQUFnQjtJQUVsQixJQUFJLEtBQUssR0FBaUIsQ0FBQyxJQUFpQixFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxPQUFPLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7SUFDRixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLElBQXdCO0lBQ3RELElBQUksSUFBSSxHQUFpQixDQUFDLE9BQW9CLEVBQUUsRUFBRTtRQUNoRCxJQUFJLE1BQU0sR0FBdUIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxNQUFtQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLFFBQWdCO0lBQ3BDLE9BQU8sQ0FBQyxPQUFvQixFQUFFLEVBQUU7UUFDOUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDM0IsR0FBRyxDQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUU7YUFDN0IsR0FBRyxDQUFFLENBQUMsWUFBbUIsRUFBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsUUFBZ0I7SUFDeEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzFCLE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLE9BQU8sY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLFFBQWdCO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNuQztBQUNILENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBRzdCLFlBQVksUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFvQjtRQUM1QixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRiJ9