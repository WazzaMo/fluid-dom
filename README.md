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
