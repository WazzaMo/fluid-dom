[Fluid-dom](../README.md) > ["option"](../modules/_option_.md) > [Option](../classes/_option_.option.md)

# Class: Option

Represents an uncertain return type. In TypeScript it's possible to return `Type | undefined` but at runtime it can get a bit messy to handle this well. The Option class represents this cleanly and explicitly while making it easy determine whether the value is valid or not and, if valid, provides easy ways to get the value with proper type consistency in TypeScript.

## Type parameters
#### T 
## Hierarchy

**Option**

## Index

### Constructors

* [constructor](_option_.option.md#constructor)

### Properties

* [value](_option_.option.md#value)

### Accessors

* [Value](_option_.option.md#value-1)
* [isValid](_option_.option.md#isvalid)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Option**(_value?: *[T]()*): [Option](_option_.option.md)

*Defined in [option.ts:20](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/option.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _value | [T]() |

**Returns:** [Option](_option_.option.md)

___

## Properties

<a id="value"></a>

### `<Private>` value

**● value**: * `T` &#124; `null`
*

*Defined in [option.ts:20](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/option.ts#L20)*

___

## Accessors

<a id="value-1"></a>

###  Value

getValue(): `T`

*Defined in [option.ts:35](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/option.ts#L35)*

Check that there is a value before calling this.
*__see__*: isValid

**Returns:** `T`

___
<a id="isvalid"></a>

###  isValid

getisValid(): `boolean`

*Defined in [option.ts:42](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/option.ts#L42)*

Tests if the value is known.

**Returns:** `boolean`

___

