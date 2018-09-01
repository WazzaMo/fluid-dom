# DOM Class
## Constructor
Takes no arguments. This bootstraps the library. Can be called
more than once.

Generally harmless.

## findElement(arg)
|Direction|Description|
|-----|--------|
|  Takes In  | Takes an object with ONE key from `id` or `selector`   (selector gives first match) |
| Returns Out| Element object |

If no match, a console.warn message will inform you.

## findAll(arg)
|Direction|Description|
|-----|--------|
|  Takes In  | Takes an object with ONE key from `selector`, `class` or `tagName` |
| Returns Out| ElementList object |


##  buttonOn(arg)
|Direction|Description|
|-----|--------|
|  Takes In  | Takes an object with all `id`, `event` and `handler` |
| Returns Out| `undefined` |

Only works on BUTTON tags and is a convenience method
on the DOM class. An alternative is to use Element.on()

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
