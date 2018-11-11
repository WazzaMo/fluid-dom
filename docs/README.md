# Fluid DOM

Inspired partly by .NET's LINQ, the Fluid DOM is a fluid
or functional DSL styled API for the HTML JavaScript DOM.

## Contents

1. [Fluid DOM API](./API.md)
2. [How to Reference](./How-to-reference.md)
3. [Live Running Example](./live/example-01.html)
4. Why use it? (this page)
5. [Quick Examples](./Quick-Examples.md)
6. [Writing Mocks](./Mocking.md)

## Why Use It?

Convenience AND Security!
Fluid DOM has NO RUNTIME DEPENDENCIES and is very small!

Also, Fluid DOM now has a mocking API so you can write
unit tests with predictable outcomes that run entirely
in NodeJS. If you've ever had to debug browser-based
unit tests, you'll understand why this is valuable.

## That's Great by Why Use It?

... oh.. "you mean what's in it for me?"

The standard DOM APIs are a bit clunky in that some things
are done with properties and some with methods.

For you, as a programmer, you'll find that 
Fluid-DOM is very small and doesn't get away of the standard DOM APIs.
Instead, this library is more of a convenience wrapper to
bring the standard APIs into a more functional way of thinking
about things. That said, it's more about convenience than true
functional programming. Let's face it, we're mutating the DOM.

