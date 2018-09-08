# Fluid DOM

It has been said elsewhere that an API that exposes functions
that return objects that let you chain multiple function
calls together becomes like a domain specific language.
Personally, I don't think I'd go that far but it is certainly
convenient. Further, if the function names are consistent
then it starts to get very predictable, what makes for much
nicer API... don't you think?

Inspired partly by .NET's LINQ, the Fluid DOM is a fluid
or functional DSL styled API for the HTML JavaScript DOM.

## Why Use It?

Convenience!

The standard DOM APIs are a bit clunky in that some things
are done with properties and some with methods.

Fluid-DOM is very small and doesn't get away of the standard DOM APIs.
Instead, this library is more of a convenience wrapper to
bring the standard APIs into a more functional way of thinking
about things. That said, it's more about convenience than true
functional programming. Let's face it, we're mutating the DOM.

## How to Reference

Fluid-dom is built to a browser iife bundle and a commonjs
library. Each is supplied in minified and developer/debug
forms.  For example, the bundle comes as `fluid-dom.bundle.js` and
`fluid-dom.bundle.dev.js` for convenience.

### Direct Script-src

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

### Browserify

You can use browserify to bundle your JavaScript 
and use `require` to import the fluid-dom library into 
your own code. That needs to use the commonjs version (also included).

```js
var fluid = require('fluid-dom.commonjs');

var dom = new fluid.DOM();
// and so on...
```

## Examples
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
    .each( li => li.classes().add('fancy') )
```

Or if you want to add 'mouseover' events to the List Items and use a selector to get all the list items...
```js
dom.findAll({selector:'#iteration>ul>li'})
    .each(item => item.on({
        event: dom.events.MOUSEOVER,
        handler: () => alert('Mouse over list item')
    }))
```

The Array methods of filter, map and reduce are also available
on an element list, so you can do the following to summarise LI
text.

```js
var summary = dom
    .findAll({tagName: 'li'})
    .map( li => li.text() )
    .reduce( (li1, li2) => `${li1}, ${li2}` )

console.log(summary)
```

And if you wanted to hide any LI member that had the word 'yay'
in their text...
```js
dom.findAll({tagName: 'li'})
    .each(item => item.text( item.text().replace(/yay/,'boo') ))
```

And finally, if you need to use the regular DOM API for some reason,
that's available to you as well. The `element` property on an
Element object gives you the standard HTMLElement object.
```js
dom.findElement({id: 'iteration'}).element.innerHTML = '<b>If you must</b>'
```

But I still think it's nicer to stay with Fluid DOM most of the time.
For instance...
```js
dom.findElement({id: 'iteration'})
    .html('<b>can be done</b>')
    .classes().add('fancy').add('lined-box')
```