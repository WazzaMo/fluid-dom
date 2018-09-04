# Element On Event Handler Argument

Provides mandatory and optional arguments to the convenience 
buttonOn method in the DOM class.  These arguments are named 
through this hash JS object to make the process more
self-describing.

## Properties
An element location option object should have one value, of:

| Key     | Description |
|---------|-------------|
|id       | A valid HTML/CSS selector string for the button. |
|event    | An event name string (eg, 'click') Can use fluid.Events.CLICK |
|handler  | The event handler function. |
|keepDefault (optional) | Omit normally. Pass `true` to inform the event handler registration to keep default behaviour. |


----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
