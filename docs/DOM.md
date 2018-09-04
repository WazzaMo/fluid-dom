# DOM Class
## Constructor
Takes no arguments. This bootstraps the library. Can be called
more than once.

Generally harmless.

## Method

### findElement(elementLocation)
| Parameters    | Description       |
|---------------|-------------------|
| [Element Location](./ElementOption.md) | A way to find the element by id or selector. |

Finds an element from the document and returns an Element object Could be an invalid one of no element found.

### findAll(elementListLocation)
| Parameters    | Description       |
|---------------|-------------------|
| [ElementList Location](./ElementListOption.md) | Location of element list. (selector, tagName, class) |

Returns an ElementList object with zero or more matching Element objects in the container.

### buttonOn (eventHandlerInfo)
| Parameters    | Description       |
|---------------|-------------------|
| [Event Handler Info](./ButtonHandlerArg.md) | Id, event name, handler function to register. |

Takes a hash of id, event and handler to register an event handler for the named event on a BUTTON tag. The tagName is checked to enforce it is a button.


Note: buttonOn only works on BUTTON tags and is a convenience method. An alternative is to use Element.on() - see [Element object](./Element.md)

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
