# HttpPromise<T>

A generic promise type for the Http class. Having the benefit of a regular Promise
object, it also provides the ability to fluidly chain calls back to the Http object using `afterResult()`

## afterResult( function func(http, result) )

| Parameters    | Description    |
|---------------|----------------|
| func  | A function that takes an Http object and the asynchronous result. |

An asynchronous outcome handler.

When the asynchronous operation completes, the `func` function will be called
with an instance to the http object and the result so the logical next operation
can be performed.

## http()

| Parameters    | Description    |
|---------------|----------------|
| None | N/A |

Immediately returns the http object that created the promise, allowing
fluid calls to be made against the http object.

### Note
This does NOT wait for the asynchronous operation to complete. The asychronous
handlers, `then()`, `catch()` or `afterResult()` should be called prior to this.

## then(when: (result: T) => T | PromiseLike<T>)

| Parameters    | Description    |
|---------------|----------------|
| when | function that takes the asynchronous result object and performs the next processing step. |

An asynchronous outcome handler.
Performs like the standard Promise `then()` function.

Returns another HttpPromise object.

## catch(when: (err: string) => void): HttpPromise<T>;

| Parameters    | Description    |
|---------------|----------------|
| when | function that takes the error cause string. |

An asynchronous outcome handler.
Performs like the standard Promise `catch()` function.

Returns another HttpPromise object.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
