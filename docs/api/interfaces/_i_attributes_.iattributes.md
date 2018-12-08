[Fluid-dom](../README.md) > ["i-attributes"](../modules/_i_attributes_.md) > [IAttributes](../interfaces/_i_attributes_.iattributes.md)

# Interface: IAttributes

IAttributes
===========

Represents the general concept of element attributes and the various operations that can be performed on or with attributes.

## Hierarchy

**IAttributes**

## Implemented by

* [DomAttributes](../classes/_dom_attributes_.domattributes.md)
* [MockAttributes](../classes/_mock_attributes_.mockattributes.md)
* [NonAttributes](../classes/_non_attributes_.nonattributes.md)

## Index

### Methods

* [add](_i_attributes_.iattributes.md#add)
* [attributeNames](_i_attributes_.iattributes.md#attributenames)
* [forEach](_i_attributes_.iattributes.md#foreach)
* [get](_i_attributes_.iattributes.md#get)
* [has](_i_attributes_.iattributes.md#has)
* [remove](_i_attributes_.iattributes.md#remove)
* [set](_i_attributes_.iattributes.md#set)
* [with](_i_attributes_.iattributes.md#with)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(name: *`string`*, value: *`string`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:31](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L31)*

Add an attribute to an element.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  name of the attribute to add. |
| value | `string` |  value to assign the new attribute. |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="attributenames"></a>

###  attributeNames

▸ **attributeNames**(): `Array`<`string`>

*Defined in [i-attributes.ts:24](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L24)*

Gets a list of attribute names.

**Returns:** `Array`<`string`>

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:19](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L19)*

Iterates through the attributes on an element.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  taking name and value as arguments to perform logic. |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="get"></a>

###  get

▸ **get**(name: *`string`*):  `string` &#124; `null`

*Defined in [i-attributes.ts:57](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L57)*

Get the current value of the attribute (if present).
*__see__*: has

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  of the attribute |

**Returns:**  `string` &#124; `null`

`null` if the attribute is not present or the string value.

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Defined in [i-attributes.ts:65](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L65)*

Supports testing if the attribute is present _before_ attempting to get its current value.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  of attribute to check for. |

**Returns:** `boolean`
true if present, false otherwise.

___
<a id="remove"></a>

###  remove

▸ **remove**(name: *`string`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:71](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L71)*

Removes the named attribute from the related element.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  of attribute to remove. |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="set"></a>

###  set

▸ **set**(name: *`string`*, value: *`string`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:42](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L42)*

An alias for `add(name, value)` - setting an attribute makes as much sense as adding it. Can be considered like an assignment where, disregarding if the attribute existed before, a new value should be assigned. But the effect is the same as `add.`
*__see__*: add

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  name of the attribute |
| value | `string` |  value to set |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="with"></a>

###  with

▸ **with**(name: *`string`*, callback: *`function`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:49](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-attributes.ts#L49)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  \- |
| callback | `function` |   |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___

