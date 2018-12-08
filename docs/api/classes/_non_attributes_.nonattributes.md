[Fluid-dom](../README.md) > ["non-attributes"](../modules/_non_attributes_.md) > [NonAttributes](../classes/_non_attributes_.nonattributes.md)

# Class: NonAttributes

Represents a non-attributes instance, to be returned when no effective attributes instance can be provided.

## Hierarchy

**NonAttributes**

## Implements

* [IAttributes](../interfaces/_i_attributes_.iattributes.md)

## Index

### Constructors

* [constructor](_non_attributes_.nonattributes.md#constructor)

### Methods

* [add](_non_attributes_.nonattributes.md#add)
* [attributeNames](_non_attributes_.nonattributes.md#attributenames)
* [forEach](_non_attributes_.nonattributes.md#foreach)
* [get](_non_attributes_.nonattributes.md#get)
* [has](_non_attributes_.nonattributes.md#has)
* [remove](_non_attributes_.nonattributes.md#remove)
* [set](_non_attributes_.nonattributes.md#set)
* [with](_non_attributes_.nonattributes.md#with)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NonAttributes**(): [NonAttributes](_non_attributes_.nonattributes.md)

*Defined in [non-attributes.ts:13](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L13)*

**Returns:** [NonAttributes](_non_attributes_.nonattributes.md)

___

## Methods

<a id="add"></a>

###  add

▸ **add**(name: *`string`*, value: *`string`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[add](../interfaces/_i_attributes_.iattributes.md#add)*

*Defined in [non-attributes.ts:24](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `string` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="attributenames"></a>

###  attributeNames

▸ **attributeNames**(): `string`[]

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[attributeNames](../interfaces/_i_attributes_.iattributes.md#attributenames)*

*Defined in [non-attributes.ts:20](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L20)*

**Returns:** `string`[]

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Defined in [non-attributes.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="get"></a>

###  get

▸ **get**(name: *`string`*):  `string` &#124; `null`

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[get](../interfaces/_i_attributes_.iattributes.md#get)*

*Defined in [non-attributes.ts:36](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:**  `string` &#124; `null`

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[has](../interfaces/_i_attributes_.iattributes.md#has)*

*Defined in [non-attributes.ts:40](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(name: *`string`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[remove](../interfaces/_i_attributes_.iattributes.md#remove)*

*Defined in [non-attributes.ts:43](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="set"></a>

###  set

▸ **set**(name: *`string`*, value: *`string`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[set](../interfaces/_i_attributes_.iattributes.md#set)*

*Defined in [non-attributes.ts:28](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `string` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="with"></a>

###  with

▸ **with**(name: *`string`*, callback: *`function`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Defined in [non-attributes.ts:32](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-attributes.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___

