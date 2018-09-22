# Http

A class that represents the ability to make
HTTP(S) requests, asynchronously, using JavaScript. The class is designed to have
the same fluid style API that the DOM class provides - meaning, method calls can be chained.


## host(protocol, hostname, port )

| Parameters    | Description    |
|---------------|----------------|
| protocol | [HttpProtocol](./HttpProtocol.md) or string value. |
| hostname | string of IP address or DNS name. |
| port ? | OPTIONAL number if a non-standard port. |

The `protocol` argument follows the HttpProtocol type and have either 'http' or 'https' the `hostname` could be '10.1.0.1' or 'server.example.com' and `port` is optional and used where non-standard ports, like 8000, are in use.

Returns self.

## header(name, value)

| Parameters    | Description    |
|---------------|----------------|
| name  | Header (string) name, eg 'Content-Type' |
| value | The value for the header, eg 'application/json' |

Returns self.

## expectedData(type)

| Parameters    | Description    |
|---------------|----------------|
| type | [HttpResponseType](./HttpResponseType.md) |

Used to indicate whether text, a document fragment (HTML or XML),
or JSON is expected in response.

Returns self.

## timeoutAt(duration)

| Parameters    | Description    |
|---------------|----------------|
| duration  | The timeout period (number) in milliseconds. |

Sets the timeout period to use in making web service calls
and if the user waits longer than this time, the call will
fail with timeout.

Returns self.

## context( task )

| Parameters    | Description    |
|---------------|----------------|
| task | Function taking an Http object paramter. |

Creates a copy Http object of the current one and passes
it in to the given `task` function. The intention is to support
setting up common parameters, like hostname and port, and then
reuse that across a series of calls but allow the context to differ
at some points without breaking the chain.

Returns self.

### Example

Let's say we have a server that can generate a sub-document
on request for a user so the expected response is different
from the regular JSON API, then we might use context.

```js
new fluid.Http()
    .host(fluid.HttpProtocol.HTTPS, 'document.com')
    .expectedData('json')
    .call(fluid.HttpMethod.POST, '/user/1234/achievement', {
        achievementID: 54321,
        date: new Date(2018,8,22)
    })
    .afterResult( (http, response) =>
    http.context( httpDoc => {
        httpDoc
        .expectedData('document')
        .call(fluid.HttpMethod.GET, '/user/1234/certificate')
        .then(response => element.html(response.body))
    })
```


## call(method, path, body = undefined)

| Parameters    | Description    |
|---------------|----------------|
| method | [HttpMethod](./HttpMethod.md) an HTTP method. |
| path | (string) path of endpoint to call. |
| body? | OPTIONAL string or object |

Makes the call to the web-service endpoint (or web site)
and returns an [HttpPromise](./HttpPromise.md) object
for the asynchronous successfully returned value or the
failure.

### Example

For the simple case of getting information from a web-service and updating a DOM element.

```js
let insertionSpot = 
    dom.findElement({id: 'insert-here'});

insertionSpot.html('<b>fetching...</b>');

new fluid.Http()
    .host(fluid.HttpProtocol.HTTPS, HOSTNAME)
    .call(fluid.HttpMethod.GET, PAGE)
    .then( response => {
        let headerPart = ''
        for(var name in response.headers) {
            headerPart += `<br>  <b>${name} :</b>${response.headers[name]}`;
        }
        insertionSpot1.html(`
            <p><b>status:</b> ${response.status}</p>
            <p><b>responseType:</b> ${response.type}<br></p>
            <p><b>body:</b> ${response.body}<br></p>
            <p><b>Response Headers: </b> ${headerPart}</p>
        `)
    })
    .catch(err => insertionSpot1.text(`Error: ${err}`))
    ;
```

Remember, CORS will be an issue to contend with if making
webservice calls from one domain to another.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
