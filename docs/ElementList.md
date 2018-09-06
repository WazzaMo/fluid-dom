# ElementList Object

The ElementList object provides functional accessors
to make it easier to navigate through a document
hierarchy. Some methods use Array semantics - filter, map, reduce - to enable one-line operations. Through a series of such lines
a LINQ-like query can be written. 

## Properties

| Property | Description |
|----------|-------------|
| elementListLocation | [Element List Location](./ElementListLocation.md) |
| elementList | Array of Element objects. |
| locatedBy | Indicates whether the list were found by selector, class or tagName. |
| isSingle  | Fixed to `false` to indicate that this is NOT a single element. |
| type      | Fixed to 'ElementList' - marker to detect ElementList.|

## Methods

### each(func)

| Parameters    | Description       |
|---------------|-------------------|
|func(element) | Function to call with each element. |

Iterates through all elements in the list and applies the given function to each. Returns self.

### getElementAt(index)

| Parameters    | Description       |
|---------------|-------------------|
|  index  | Index to nth item. |

Returns the nth element in the list.

### map(func)

| Parameters    | Description       |
|---------------|-------------------|
| func(element) | Function to convert element into a new data value. |

Uses Array.map to create a new list of elements into a list of values that are produced by calling the supplied function and storing the result.

### filter(func)

| Parameters    | Description       |
|---------------|-------------------|
| func(element) | Function that returns true for desirable elements. |

Uses Array.filter to return a sub-set of the original list based on when the given function returns true.

### reduce(func)

| Parameters    | Description       |
|---------------|-------------------|
| func(element1, element2) | Function that takes two elements and returns a single value. |

Uses Array.reduce to return a single object.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
