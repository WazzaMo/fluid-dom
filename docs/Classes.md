# Classes Object

Represents a container of class names attached to an element.

## Properties

| Property  | Description |
|-----------|-------------|
| element   | Fluid Element object representation. |
| domElement | Raw DOM HTMLElement |

## Methods

### each( func )

|  Parameters    | Description       |
|----------------|-------------------|
| func(name)     | function to call with each class name. |

Iterates through all class names and calls the given function with each.
Returns self.

### has(name)

|  Parameters    | Description       |
|----------------|-------------------|
| name    | Class name to check. |

Returns true/false to indicate if the class is present on the element.

### whenHas(name, func)

|  Parameters    | Description       |
|----------------|-------------------|
| name | Class name to check. |
| func(element) | Function to call when the name is found. |

Calls the given function if-and-only-if the named class is on the element. The function is called with the (fluid) element object to allow things to be done with it.
Returns self.

### add(name)

|  Parameters    | Description       |
|----------------|-------------------|
| name | Name of class to add. |

Adds the named class to the element. Returns self.

### remove(name)

|  Parameters    | Description       |
|----------------|-------------------|
| name | Name of class to remove. |

Removes the class from the list of classes on the element. Returns self.

### set(name)

|  Parameters    | Description       |
|----------------|-------------------|
| name | Class name to add. |

Checks if element has the named class and, if not, adds it. Returns self.

----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
