# Fluid DOM

Inspired partly by .NET's LINQ, the Fluid DOM is a fluid
or functional DSL styled API for the HTML JavaScript DOM.

## Contents

1. [Fluid DOM API](./API.md)
2. [How to Reference](./How-to-reference.md)
3. [Live Running Example](./live/example-01.html)
4. Why use it? (this page)
5. [Quick Examples](./Quick-Examples.md)

## Why Use It?

Convenience AND Security!
Fluid DOM has NO RUNTIME DEPENDENCIES and is very small!

It can be dangerous to use too many packages and even more
dangerous to rely on packages with many cascading dependencies.

The developer, non-minified version of fluid-dom is under 500 lines
long and fairly easy to read so you can confirm for yourself that
it does what it said on the the tin and there's no malicious code.

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

