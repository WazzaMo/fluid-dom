# Http

A helper method that wraps around calls to XMLHttpRequest
and wraps callbacks in a Promise that is then returned.

## HttpMethod Constants

There are definitions of the HTTP Methods in the object
`fluid.HttpMethod` so for example, GET can be found as `fluid.HttpMethod.GET`
and this set of definitions is provided in case your editor or IDE
has some kind of intellisense support.

## Http.request(method, url, ? user, ? password) Parameters

| Parameters    | Description    |
|---------------|----------------|
| method        | Http Method to use. |
| url | Web service or server URL. |
| headers | List of request headers. |
| user (opt) | Username for basic auth |
| password (opt) | Password for basic auth.| 

Will make an asynchronous web call and return a Promise. When the
HTTP response completes, the `then(response)` function will be called.
On failure, abort, timeout, the `catch(error)` function will be called.

```js
let insertionSpot = 
    dom.findElement({id: 'insert-here'});

insertionSpot.html('<b>fetching...</b>');

fluid.Http.request(
    fluid.HttpMethod.GET,
    'https://server.test-cors.org/server?id=5096911&enable=true',
    [{name:'Accept', value: 'text/floppybunny'}]
)
.then( response => {
    insertionSpot.html(`
        <p><b>status:</b> ${response.status}</p>
        <p><b>responseType:</b> ${response.type}<br></p>
        <p><b>body:</b> ${response.body}<br></p>
        <p><b>timeout:</b> ${response.timeout}<br></p>
    `)
})
.catch(
    err => console.error(`Http.request failed -> ${err}`)
);
```

Remember, CORS will be an issue to contend with if making
webservice calls from one domain to another.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
