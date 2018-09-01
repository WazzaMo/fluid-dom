# DOM Class
## Constructor
Takes no arguments. This bootstraps the library. Can be called
more than once.

Generally harmless.

|  Method   | Parameters    | Description       |
|-----------|---------------|-------------------|
| findElement | [Element Location Option](./ElementOption.md) | Finds an element from the document and returns an Element object Could be an invalid one of no element found. |
| findAll | [ElementList Location Option](./ElementListOption.md) | Returns an ElementList object with zero or more matching Element objects in the container. |
| buttonOn | [Button Handler hash](./ButtonHandlerArg.md) | Takes a hash of id, event and handler to register an event handler for the named event. |


Note: buttonOn only works on BUTTON tags and is a convenience method. An alternative is to use Element.on() - see [Element object](./Element.md)

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
