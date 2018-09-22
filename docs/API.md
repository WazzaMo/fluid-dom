# Fluid DOM Documentation

## Contents

1. Fluid DOM API (this page)
2. [How to Reference](./How-to-reference.md)
3. [Live Running Example](./live/example-01.html)
4. [Why use it?](./README.md)
5. [Quick Examples](./Quick-Examples.md)


## Introduction

Fluid DOM attempts to wrap the standard DOM API with
a more modern-feeling style.

The fluid global variable hash is used as a namespace.

The DOM object is a gateway to either an Element object
or an ElementList object. An ElementList object is just
a container for Element objects and help represent the
document hierarchy and support iteration, filter, map and reduce operations.

The Element object provides access to the Attributes object
or the Classes object and these three types are the core
for document manipulation.

## Object Types
- [fluid root object](./fluid.md)
- [DOM Object](./DOM.md)
- [Element Object](./Element.md)
- [ElementList Object](./ElementList.md)
- [Attributes Object](./Attributes.md)
- [Classes Object](./Classes.md)
- [Http Class](./Http.md)
- [HttpPromise](./HttpPromise.md)

## Locating Options

There are two types of locating options. One is for
identifying a single element in a document. The other
is to identify zero or more elements from a document.

- [Element Locating Options](./ElementOptions.md)
- [Element List Locating Options](./ElementListOptions.md)

----
Fluid DOM (c) Copyright 2018 Warwick Molloy
