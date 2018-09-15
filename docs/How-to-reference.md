# How to Reference

## Contents

1. [Fluid DOM API](./API.md)
2. How to Reference (this page)
3. [Live Running Example](./live/example-01.html)
4. [Why use it?](./README.md)
5. [Quick Examples](./Quick-Examples.md)


## Introduction

Fluid-dom is built to a browser iife bundle and a commonjs
library. Each is supplied in minified and developer/debug
forms.  For example, the bundle comes as `fluid-dom.bundle.js` and
`fluid-dom.bundle.dev.js` for convenience.

## Direct Script-src

For simplicity, the fluid-dom library builds to a single (iife) file
and exposes a global variable called `fluid` as a namespace object.

For the browser, the use a script tag:
```html
    <script src="fluid-dom.bundle.js"></script>
    <script>
        var dom = new fluid.DOM();
        // rest...
    </script>
```

## Browserify

You can use browserify to bundle your JavaScript 
and use `require` to import the fluid-dom library into 
your own code. That needs to use the commonjs version (also included).

```js
var fluid = require('fluid-dom/fluid-dom.commonjs');

var dom = new fluid.DOM();
// and so on...
```
