# Element Locating Options

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
|selector | A valid HTML/CSS selector string |
|id       | An id name (NOT #name) |


----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
