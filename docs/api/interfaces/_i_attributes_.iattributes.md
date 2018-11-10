[Fluid-dom](../README.md) > ["i-attributes"](../modules/_i_attributes_.md) > [IAttributes](../interfaces/_i_attributes_.iattributes.md)

# Interface: IAttributes

IAttributes
===========

Represents the general concept of element attributes and the various operations that can be performed on or with attributes.

## Hierarchy

**IAttributes**

## Implemented by

* [DomAttributes](../classes/_dom_attributes_.domattributes.md)

## Index

### Methods

* [add](_i_attributes_.iattributes.md#add)
* [attributeNames](_i_attributes_.iattributes.md#attributenames)
* [each](_i_attributes_.iattributes.md#each)
* [get](_i_attributes_.iattributes.md#get)
* [has](_i_attributes_.iattributes.md#has)
* [remove](_i_attributes_.iattributes.md#remove)
* [set](_i_attributes_.iattributes.md#set)
* [with](_i_attributes_.iattributes.md#with)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(name: *`string`*, value: *`any`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:20](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `any` |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="attributenames"></a>

###  attributeNames

▸ **attributeNames**(): `Array`<`string`>

*Defined in [i-attributes.ts:18](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L18)*

**Returns:** `Array`<`string`>

___
<a id="each"></a>

###  each

▸ **each**(callback: *`function`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:16](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="get"></a>

###  get

▸ **get**(name: *`string`*):  `string` &#124; `null`

*Defined in [i-attributes.ts:26](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:**  `string` &#124; `null`

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Defined in [i-attributes.ts:28](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(name: *`string`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:30](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="set"></a>

###  set

▸ **set**(name: *`string`*, value: *`any`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:22](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `any` |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="with"></a>

###  with

▸ **with**(name: *`string`*, callback: *`function`*): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-attributes.ts:24](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-attributes.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___

