# Quick Examples

## Contents

1. [Fluid DOM API](./API.md)
2. [How to Reference](./How-to-reference.md)
3. [Live Running Example](./live/example-01.html)
4. [Why use it?](./README.md)
5. Quick Examples (this page)
6. [Writing Mocks](./Mocking.md)

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
    .forEach(item => item.text( item.text().replace(/yay/,'boo') ))
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
