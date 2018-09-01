# Classes Object

Represents a container of class names attached to an element.

## Properties

| Property  | Description |
|-----------|-------------|
| elementObject | Fluid Element object representation. |
| element   | Raw DOM HTMLElement |

## Methods
|  Method   | Parameters    | Description       |
|-----------|---------------|-------------------|
| each      | task func(name)->undefined | Iterates through all the class names and calls the given function with each. Returns self. |
| has       | string name   | Returns true/false to indicate if the class is present on the element. |
| whenHas   | string name, task func() | Calls the given function if-and-only-if the named class is on the element. Returns self. |
| add       | string _class | Adds the named class to the element. Returns self. |
| remove    | string _class | Removes the class from the list of classes on the element. Returns self. |
| set       | string _class | Checks if element has the named class and, if not, adds it. Returns self. |

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
