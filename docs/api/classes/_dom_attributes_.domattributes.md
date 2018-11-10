[Fluid-dom](../README.md) > ["dom-attributes"](../modules/_dom_attributes_.md) > [DomAttributes](../classes/_dom_attributes_.domattributes.md)

# Class: DomAttributes

## Hierarchy

**DomAttributes**

## Implements

* [IAttributes](../interfaces/_i_attributes_.iattributes.md)

## Index

### Constructors

* [constructor](_dom_attributes_.domattributes.md#constructor)

### Properties

* [_webElement](_dom_attributes_.domattributes.md#_webelement)

### Methods

* [add](_dom_attributes_.domattributes.md#add)
* [attributeNames](_dom_attributes_.domattributes.md#attributenames)
* [each](_dom_attributes_.domattributes.md#each)
* [get](_dom_attributes_.domattributes.md#get)
* [has](_dom_attributes_.domattributes.md#has)
* [remove](_dom_attributes_.domattributes.md#remove)
* [set](_dom_attributes_.domattributes.md#set)
* [with](_dom_attributes_.domattributes.md#with)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DomAttributes**(_webElement: *`Element`*): [DomAttributes](_dom_attributes_.domattributes.md)

*Defined in [dom-attributes.ts:15](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _webElement | `Element` |

**Returns:** [DomAttributes](_dom_attributes_.domattributes.md)

___

## Properties

<a id="_webelement"></a>

### `<Private>` _webElement

**● _webElement**: *`Element`*

*Defined in [dom-attributes.ts:15](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L15)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(name: *`string`*, value: *`any`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[add](../interfaces/_i_attributes_.iattributes.md#add)*

*Defined in [dom-attributes.ts:37](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `any` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="attributenames"></a>

###  attributeNames

▸ **attributeNames**(): `Array`<`string`>

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[attributeNames](../interfaces/_i_attributes_.iattributes.md#attributenames)*

*Defined in [dom-attributes.ts:28](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L28)*

**Returns:** `Array`<`string`>

___
<a id="each"></a>

###  each

▸ **each**(callback: *`function`*): `this`

*Defined in [dom-attributes.ts:21](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** `this`

___
<a id="get"></a>

###  get

▸ **get**(name: *`string`*):  `string` &#124; `null`

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[get](../interfaces/_i_attributes_.iattributes.md#get)*

*Defined in [dom-attributes.ts:52](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L52)*

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

*Defined in [dom-attributes.ts:56](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L56)*

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

*Defined in [dom-attributes.ts:60](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L60)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="set"></a>

###  set

▸ **set**(name: *`string`*, value: *`any`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IAttributes](../interfaces/_i_attributes_.iattributes.md).[set](../interfaces/_i_attributes_.iattributes.md#set)*

*Defined in [dom-attributes.ts:41](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `any` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="with"></a>

###  with

▸ **with**(name: *`string`*, callback: *`function`*): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Defined in [dom-attributes.ts:46](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-attributes.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___

