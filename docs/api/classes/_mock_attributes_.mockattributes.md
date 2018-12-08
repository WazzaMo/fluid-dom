[Fluid-dom](../README.md) > ["mock-attributes"](../modules/_mock_attributes_.md) > [MockAttributes](../classes/_mock_attributes_.mockattributes.md)

# Class: MockAttributes

## Hierarchy

**MockAttributes**

## Implements

* [IAttributes](../interfaces/_i_attributes_.iattributes.md)

## Index

### Constructors

* [constructor](_mock_attributes_.mockattributes.md#constructor)

### Properties

* [attributes](_mock_attributes_.mockattributes.md#attributes)

### Methods

* [add](_mock_attributes_.mockattributes.md#add)
* [attributeNames](_mock_attributes_.mockattributes.md#attributenames)
* [forEach](_mock_attributes_.mockattributes.md#foreach)
* [get](_mock_attributes_.mockattributes.md#get)
* [has](_mock_attributes_.mockattributes.md#has)
* [remove](_mock_attributes_.mockattributes.md#remove)
* [set](_mock_attributes_.mockattributes.md#set)
* [with](_mock_attributes_.mockattributes.md#with)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MockAttributes**(set: *[MockAttributeSet](../interfaces/_mock_attributes_.mockattributeset.md)*): [MockAttributes](_mock_attributes_.mockattributes.md)

*Defined in [mock-attributes.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| set | [MockAttributeSet](../interfaces/_mock_attributes_.mockattributeset.md) |

**Returns:** [MockAttributes](_mock_attributes_.mockattributes.md)

___

## Properties

<a id="attributes"></a>

### `<Private>` attributes

**● attributes**: *[MockAttributeSet](../interfaces/_mock_attributes_.mockattributeset.md)*

*Defined in [mock-attributes.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L16)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(name: *`string`*, value: *`string`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[add](../interfaces/_i_attributes_.iattributes.md#add)*

*Defined in [mock-attributes.ts:38](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L38)*

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

*Defined in [mock-attributes.ts:30](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L30)*

**Returns:** `string`[]

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Defined in [mock-attributes.ts:22](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L22)*

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

*Defined in [mock-attributes.ts:47](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L47)*

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

*Defined in [mock-attributes.ts:50](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L50)*

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

*Defined in [mock-attributes.ts:53](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L53)*

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

*Defined in [mock-attributes.ts:41](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L41)*

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

*Defined in [mock-attributes.ts:44](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-attributes.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___

