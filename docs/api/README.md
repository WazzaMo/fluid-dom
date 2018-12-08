
Fluid DOM
=========

It has been said elsewhere that an API that exposes functions that return objects that let you chain multiple function calls together becomes like a domain specific language. Personally, I don't think I'd go that far but it is certainly convenient. Further, if the function names are consistent then it starts to get very predictable, what makes for much nicer API... don't you think?

Inspired partly by .NET's LINQ, the Fluid DOM is a fluid or functional DSL styled API for the HTML JavaScript DOM.

Why Use It?
-----------

Convenience!

The standard DOM APIs are a bit clunky in that some things are done with properties and some with methods.

Fluid-DOM is very small and doesn't get away of the standard DOM APIs. Instead, this library is more of a convenience wrapper to bring the standard APIs into a more functional way of thinking about things. That said, it's more about convenience than true functional programming. Let's face it, we're mutating the DOM.

How to Reference
----------------

Fluid-dom is built to a browser iife bundle and a commonjs library. Each is supplied in minified and developer/debug forms. For example, the bundle comes as `fluid-dom.bundle.js` and `fluid-dom.bundle.dev.js` for convenience.

### Direct Script-src

For simplicity, the fluid-dom library builds to a single (iife) file and exposes a global variable called `fluid` as a namespace object.

For the browser, the use a script tag:

```html
    <script src="fluid-dom.bundle.js"></script>
    <script>
        var dom = new fluid.DOM();
        // rest...
    </script>
```

### Browserify

You can use browserify to bundle your JavaScript and use `require` to import the fluid-dom library into your own code. That needs to use the commonjs version (also included).

```js
var fluid = require('fluid-dom/fluid-dom.commonjs');

var dom = new fluid.DOM();
// and so on...
```

Examples
--------

Say for an HTML document...

```html
<html>
<body>
    <section id="iteration">
        <h1>Iteration Demo</h1>
        <ul>
            <li>An item</li>
            <li>Second item yay</li>
            <li>Third item yay</li>
        </ul>
    </section>
</body>
</html>
```

To iterate through the list items and add a class called "fancy"...

```js
var dom = new fluid.DOM()
dom.findElement({id:'iteration'})
    .findAll({selector:'ul>li'})
    .forEach( li => li.classes().add('fancy') )
```

Or if you want to add 'mouseover' events to the List Items and use a selector to get all the list items...

```js
dom.findAll({selector:'#iteration>ul>li'})
    .forEach(item => item.on({
        event: dom.events.MOUSEOVER,
        handler: () => alert('Mouse over list item')
    }))
```

The Array methods of filter, map and reduce are also available on an element list, so you can do the following to summarise LI text.

```js
var summary = dom
    .findAll({tagName: 'li'})
    .map( li => li.text() )
    .reduce( (li1, li2) => `${li1}, ${li2}` )

console.log(summary)
```

And if you wanted to hide any LI member that had the word 'yay' in their text...

```js
dom.findAll({tagName: 'li'})
    .forEach(item => item.text( item.text().replace(/yay/,'boo') ))
```

And finally, if you need to use the regular DOM API for some reason, that's available to you as well. The `element` property on an Element object gives you the standard HTMLElement object.

```js
dom.findElement({id: 'iteration'}).element.innerHTML = '<b>If you must</b>'
```

But I still think it's nicer to stay with Fluid DOM most of the time. For instance...

```js
dom.findElement({id: 'iteration'})
    .html('<b>can be done</b>')
    .classes().add('fancy').add('lined-box')
```

## Index

### External modules

* ["constants"](modules/_constants_.md)
* ["dom-attributes"](modules/_dom_attributes_.md)
* ["dom-classes"](modules/_dom_classes_.md)
* ["dom-element"](modules/_dom_element_.md)
* ["element-list-source"](modules/_element_list_source_.md)
* ["element-source"](modules/_element_source_.md)
* ["event-handler-info"](modules/_event_handler_info_.md)
* ["fluid-dom"](modules/_fluid_dom_.md)
* ["fluid-mock"](modules/_fluid_mock_.md)
* ["http"](modules/_http_.md)
* ["http-header"](modules/_http_header_.md)
* ["http-method"](modules/_http_method_.md)
* ["http-promise"](modules/_http_promise_.md)
* ["http-protocol"](modules/_http_protocol_.md)
* ["http-response"](modules/_http_response_.md)
* ["http-response-type"](modules/_http_response_type_.md)
* ["i-attributes"](modules/_i_attributes_.md)
* ["i-classes"](modules/_i_classes_.md)
* ["i-element"](modules/_i_element_.md)
* ["i-fluid-document"](modules/_i_fluid_document_.md)
* ["index"](modules/_index_.md)
* ["later-or-now"](modules/_later_or_now_.md)
* ["mock-attributes"](modules/_mock_attributes_.md)
* ["mock-classes"](modules/_mock_classes_.md)
* ["mock-document"](modules/_mock_document_.md)
* ["mock-document-nodes"](modules/_mock_document_nodes_.md)
* ["mock-element"](modules/_mock_element_.md)
* ["mock-selector-parser"](modules/_mock_selector_parser_.md)
* ["non-attributes"](modules/_non_attributes_.md)
* ["non-classes"](modules/_non_classes_.md)
* ["non-element"](modules/_non_element_.md)
* ["option"](modules/_option_.md)
* ["selector-lexer"](modules/_selector_lexer_.md)
* ["util"](modules/_util_.md)

---

