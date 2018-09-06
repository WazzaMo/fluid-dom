# Element List Location

When getting a list of elements from the document, say by calling
`new fluid.DOM().findAll(aaa)` the `aaa` is the argument
that could locate zero or more elements from the HTML document model.

Current types of location supported are:
- Class
- Selector (first match)
- Tag Name

## Properties
An element location option object should have one value, of:

| Key     | Description |
|---------|-------------|
|selector | A valid HTML/CSS selector string |
|class    | Valid class name (NOT '.class') |
|tagName  | A tag name (eg, 'p') |

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
