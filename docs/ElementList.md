# ElementList Object
The ElementList object provides functional accessors
to make it easier to navigate through a document
hierarchy. Some methods use Array semantics - filter, map, reduce - to enable one-line operations. Through a series of such lines
a LINQ-like query can be written. 

## Properties
| Property | Description |
|----------|-------------|
| elementList | convertToListOfElements(elementList)
| parent    | Parent as an Element object. |
| docKey    | 'selector', 'class', 'tagName' depending on what was used in the ElementList locating option. |
| isSingle  | Fixed to `false` to indicate that this is NOT a single element. |
| docMatcher| The matching value (eg. class name or tag name string) |
| arg       | [Element List Locating Option](./ElementListOptions.md) |
| type      | Fixed to 'ElementList' - marker to detect ElementList |

## Methods
|  Method   | Parameters    | Description       |
|-----------|---------------|-------------------|
| each      | func(element)-> undefined | Iterates through all elements in the list and applies the given function to each. Returns self. |
| getElementAt | int index  | Returns the nth element in the list. |
| map       | func(element)-> object | Uses Array.map to create a new list of values that are produced by calling the supplied function and storing the result. |
| filter    | func(element)-> bool | Uses Array.filter to return a sub-set of the original list based on when the given function returns true. |
| reduce    | func(element1, element2)-> object | Uses Array.reduce to return a single object. |

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
