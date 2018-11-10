[Fluid-dom](../README.md) > ["non-classes"](../modules/_non_classes_.md) > [NonClasses](../classes/_non_classes_.nonclasses.md)

# Class: NonClasses

NonClasses
==========

Is a nil-effect IClasses instance to return in any situation where the IElement implementation cannot provide a backing for the style classes from a document.

## Hierarchy

**NonClasses**

## Implements

* [IClasses](../interfaces/_i_classes_.iclasses.md)

## Index

### Constructors

* [constructor](_non_classes_.nonclasses.md#constructor)

### Methods

* [add](_non_classes_.nonclasses.md#add)
* [each](_non_classes_.nonclasses.md#each)
* [has](_non_classes_.nonclasses.md#has)
* [remove](_non_classes_.nonclasses.md#remove)
* [set](_non_classes_.nonclasses.md#set)
* [whenHas](_non_classes_.nonclasses.md#whenhas)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NonClasses**(): [NonClasses](_non_classes_.nonclasses.md)

*Defined in [non-classes.ts:18](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L18)*

**Returns:** [NonClasses](_non_classes_.nonclasses.md)

___

## Methods

<a id="add"></a>

###  add

▸ **add**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[add](../interfaces/_i_classes_.iclasses.md#add)*

*Defined in [non-classes.ts:33](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="each"></a>

###  each

▸ **each**(callback: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [non-classes.ts:21](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[has](../interfaces/_i_classes_.iclasses.md#has)*

*Defined in [non-classes.ts:25](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[remove](../interfaces/_i_classes_.iclasses.md#remove)*

*Defined in [non-classes.ts:37](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="set"></a>

###  set

▸ **set**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[set](../interfaces/_i_classes_.iclasses.md#set)*

*Defined in [non-classes.ts:41](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="whenhas"></a>

###  whenHas

▸ **whenHas**(name: *`string`*, callback: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [non-classes.ts:29](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/non-classes.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___

