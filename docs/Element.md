# Element Object

The Element object represents a Fluid Element and
wraps around the native DOM element.  Whenever a call
results in the selection or return of a single element
in the Fluid DOM, this is the type of object returned.

Many of the methods return "self" meaning the element object.
This allows calls to be chained.

```js
var dom = new fluid.DOM()
dom.findElement({id: 'MegaButton'})
    .text("Mega Button - Click me")
    .classes().add("mega")
```

## Properties

| Property | Description |
|----------|-------------|
| element  | Raw standard DOM HTMLElement instance. |
| docKey   | How the element was located from the DOM - by ID, SELECTOR, ELEMENT (means came from a list) |
| docMatcher | The value of the ID or selector used. |
| parent   | If known - the parent raw HTMLElement |
| value    | Value of an input element. |
| type     | 'Element' a marker to identify an Element object |

## Methods

### children()

| Parameters | Description |
|------------|-------------|
| None | N/A |

Returns element's children as an ElementList.

### eachChild(func)

| Parameters    | Description    |
|---------------|----------------|
|function(element) | Function called with each child element.|

Visits each child element. Returns self.

### expect(tagName)

| Parameters | Description |
|---------------|----------------|
| string tagName | Checks expected tag. Returns self. |

### getId()

| Parameters | Description |
|---------------|----------------|
| None          | N/A |

Returns elements ID if it has one.

### getParent()

| Parameters | Description |
|---------------|----------|
| None | N/A |

Returns parent as Element object  |

### hasId()

| Parameters    | Description    |
|---------------|----------------|
| None          | N/A |

Returns true if element has an ID.

### exists()

| Parameters    | Description    |
|---------------|----------------|
| None          | N/A |

Returns true if element is valid.


### findAll(elementListLocation)

| Parameters | Description |
|---------------|----------------|
| [elementListLocation](./ElementListLocation.md) | Locator for multiple elements. |

Identify a list of elements by selector, tagName or class name.
Returns an ElementList object.

### selectFirst(selector)

| Parameters | Description |
|---------------|----------------|
| selector | String to select an element. |

Returns the first matching element as an Element (fluid) object.

### selectorPath()

| Parameters    | Description    |
|---------------|----------------|
| None | N/A |

Returns a selector path string.

### tagName()

| Parameters    | Description    |
|---------------|----------------|
| None          | N/A |

Returns tag name string.

### text()

| Parameters    | Description    |
|---------------|----------------|
| None | N/A |

Returns current element text value. For example, if the element
is `<b>Hi there</b>` then "Hi there" would be returned.

### text(newText)

| Parameters    | Description    |
|---------------|----------------|
| newText       | New text to insert in-place of current text. |

Overwrites the element's current text with the new, provided
text string. Returns self.

### html()

| Parameters    | Description    |
|---------------|----------------|
| None | N/A |

Returns sub-document as an HTML source string.

### html(newHtml)

| Parameters    | Description    |
|---------------|----------------|
| newHtml  | String of HTML source. |

Replaces the sub-document and returns self.

*Example*
The document...
```html
<body>
    <div id="fred"></div>
</body>
```
With JavsScript...
```js
var dom = new fluid.DOM()
dom.findElement({id:"fred"})
    .html("<p>New Message</p>")
    .classes().add("highlight")
```
Yields...
```html
<body>
    <div id="fred">
        <p class="highlight">New Message</p>
    </div>
</body>
```

### append(addedHtml)

| Parameters    | Description    |
|---------------|----------------|
| addedHtml | String with HTML to append. |

Appends new HTML source after existing 
child-document and returns self.

### prepend(preHtml)

| Parameters    | Description    |
|---------------|----------------|
| preHtml  | String with HTML to prepend. |

Prepends new HTML source before existing child-document and returns self.

### remove()

| Parameters    | Description    |
|---------------|----------------|
| None          | N/A |

Destroys the element.

### attributes()

| Parameters    | Description    |
|---------------|----------------|
| None         | N/A |

Returns an Attributes object to enable operations to be
performed on the element's attributes.

### classes()

| Parameters    | Description    |
|---------------|----------------|
| None          | N/A |

Returns a Classes object for an element so the class list
of an element can be manipulated.

### on(eventHandlerInfo)

| Parameters    | Description    |
|---------------|----------------|
| [Event Handler Info](./EventHandlerInfo.md) | Parameters required to register a handler. |

Registers an event handler on the element using the named parameters of id, event name and handler function.

Takes an  and registers an event handler and prevents default handling unless overridden by suppling `keepDefault: true` in the info object.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
