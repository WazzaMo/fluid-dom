# Button Event Handler Argument

When getting an element from the document, say by calling
`new fluid.DOM().findElement(xxx)` the `xxx` is the argument
that locates the element from the HTML document model.

Current types of location supported are:
- ID
- Selector (first match)
- Element (internal use)

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
