# Attributes Object

## Properties

| Property | Description |
|----------|-------------|
| domElement | Raw DOM element behind the Attributes object. |

## Methods

### each( func )
| Parameters    | Description             |
|---------------|-------------------------|
| func          | A function taking an attribute name and value; no return value needed |

Iterates through the element's attributes, calling the given function with each name and value, in turn. Returns self.

### attributeNames()
| Parameters    | Description             |
|---------------|-------------------------|
| None          |  |

Returns list of attribute name strings.

### set(name, value)
| Parameters    | Description             |
|---------------|-------------------------|
| name          | The attribute name.     |
| value         | The value to set.       |
    
Sets (or adds) an attribute with given value to the element. Returns self.

###  with(name, func)
| Parameters    | Description             |
|---------------|-------------------------|
| name          | Attribute name          |
| func(value)   | A function that will handle the value. |

Gets the value for the named attribute and calls the supplied function with this value. Returns self.

### get(name)
| Parameters    | Description             |
|---------------|-------------------------|
| name   | Attribute name. |

Returns the value of the named attribute.

### has(name)
| Parameters    | Description             |
|---------------|-------------------------|
| name   | Attribute name. |

Returns true/false indicating if attribute is present. |

### remove(name)
| Parameters    | Description             |
|---------------|-------------------------|
| name   | Attribute name |

Removes named attribute and returns self.


----
[Back to README](./README.md) - Fluid DOM (c) Copyright 2018 Warwick Molloy
