# Element Object

The Element object represents a Fluid Element and
wraps around the native DOM element.  Whenever a call
results in the selection or return of a single element
in the Fluid DOM, this is the type of object returned.

## Properties

| Property | Description |
|----------|-------------|
| element  | Raw standard DOM HTMLElement instance. |
| docKey   | How the element was located from the DOM - by ID, SELECTOR, ELEMENT (means came from a list) |
| docMatcher | The value of the ID or selector used. |
| parent   | If known - the parent raw HTMLElement |
| value    | Value of an input element. |
| type     | 'Element' a marker to identify an Element object |

## Methods
|  Method   | Parameters    | Description       |
|-----------|---------------|-------------------|
| children  | None          | Provides any children of the element, returned as an ElementList |
| eachChild | function(element) | Visits each child element (if any) and applies the supplied function to each. Returns self. |
| expect    | string tagName | An assertion to cause error logging when element is not of the expected tag. Returns self.          |
| getId     | None          | Returns elements ID               |
| getParent | None          | Returns parent as Element object  | 
| hasId     | None          | Returns true if element has an ID.|
| exists    | None          | Returns true if element is valid. |
| findAll   | [ElementList Option](ElementListOptions.md) | Get all matches as an ElementList object | 
| selectFirst | string selector | Returns the first match Element object |
| selectorPath | None | Returns a string path to identify that element in the hierachiy of the document. |
| tagName   | None          | Returns tag name string. |
| text      | None          | Returns text in element |
| text      | string _text  | Replaces element's text with given value and returns self. |
| html      | None | Returns sub-document, child of the element, as HTML source |
| html      | string _html  | Replaces the sub-document, child of the element with given source string and returns self. |
| append    | string _html  | Appends new HTML source after existing child-document and returns self. |
| prepend   | string _html  | Prepends new HTML source before existing child-document and returns self. |
| remove    | None          | Destroys the element. |
| attributes | None         | Returns an Attributes object |
| classes   | None          | Returns a Classes object |
| on(args)

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
