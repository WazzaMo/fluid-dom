[Fluid-dom](../README.md) > ["mock-classes"](../modules/_mock_classes_.md) > [MockClasses](../classes/_mock_classes_.mockclasses.md)

# Class: MockClasses

MockClasses
===========

Representation of classes on a mock element.

## Hierarchy

**MockClasses**

## Implements

* [IClasses](../interfaces/_i_classes_.iclasses.md)

## Index

### Constructors

* [constructor](_mock_classes_.mockclasses.md#constructor)

### Properties

* [classNames](_mock_classes_.mockclasses.md#classnames)
* [element](_mock_classes_.mockclasses.md#element)

### Methods

* [add](_mock_classes_.mockclasses.md#add)
* [forEach](_mock_classes_.mockclasses.md#foreach)
* [has](_mock_classes_.mockclasses.md#has)
* [internalGetClassValue](_mock_classes_.mockclasses.md#internalgetclassvalue)
* [remove](_mock_classes_.mockclasses.md#remove)
* [set](_mock_classes_.mockclasses.md#set)
* [whenHas](_mock_classes_.mockclasses.md#whenhas)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MockClasses**(element: *[IElement](../interfaces/_i_element_.ielement.md)*): [MockClasses](_mock_classes_.mockclasses.md)

*Defined in [mock-classes.ts:17](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | [IElement](../interfaces/_i_element_.ielement.md) |

**Returns:** [MockClasses](_mock_classes_.mockclasses.md)

___

## Properties

<a id="classnames"></a>

### `<Private>` classNames

**● classNames**: *`Array`<`string`>*

*Defined in [mock-classes.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L16)*

___
<a id="element"></a>

### `<Private>` element

**● element**: *[IElement](../interfaces/_i_element_.ielement.md)*

*Defined in [mock-classes.ts:17](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L17)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[add](../interfaces/_i_classes_.iclasses.md#add)*

*Defined in [mock-classes.ts:44](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [mock-classes.ts:28](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L28)*

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

*Defined in [mock-classes.ts:33](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="internalgetclassvalue"></a>

###  internalGetClassValue

▸ **internalGetClassValue**(): `string`

*Defined in [mock-classes.ts:24](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L24)*

**Returns:** `string`

___
<a id="remove"></a>

###  remove

▸ **remove**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[remove](../interfaces/_i_classes_.iclasses.md#remove)*

*Defined in [mock-classes.ts:51](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L51)*

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

*Defined in [mock-classes.ts:61](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L61)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="whenhas"></a>

###  whenHas

▸ **whenHas**(name: *`string`*, callback: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [mock-classes.ts:37](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-classes.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___

