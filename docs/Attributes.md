# Attributes Object

## Properties

| Property | Description |
|----------|-------------|
| element  | Raw DOM element behind the Attributes object. |

## Methods
|  Method   | Parameters    | Description       |
|-----------|---------------|-------------------|
| each      | func(attribute)-> undefined | Iterates through list of attributes, calling given function with each in turn. Returns self. |
| attributeNames | None     | Returns list of attribute name strings. |
| set       | string name, value | Sets (or adds) an attribute with given value to the element. Returns self. |
| with      | string name, task func(value)-> undefined | Gets the value for the named attribute and calls the supplied function with this value. Returns self. |
| get       | string name   | Returns the value of the named attribute. |
| has       | string name   | Returns true/false indicating if attribute is present. |
| remove    | string name   | Removes named attribute and returns self. |


----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
