[Fluid-dom](../README.md) > ["dom-classes"](../modules/_dom_classes_.md) > [DomClasses](../classes/_dom_classes_.domclasses.md)

# Class: DomClasses

DomClasses
==========

An implementation of the IClasses interface that allows operations to be performed on DOM objects in a browser.

## Hierarchy

**DomClasses**

## Implements

* [IClasses](../interfaces/_i_classes_.iclasses.md)

## Index

### Constructors

* [constructor](_dom_classes_.domclasses.md#constructor)

### Properties

* [element](_dom_classes_.domclasses.md#element)
* [htmlElement](_dom_classes_.domclasses.md#htmlelement)

### Methods

* [add](_dom_classes_.domclasses.md#add)
* [each](_dom_classes_.domclasses.md#each)
* [has](_dom_classes_.domclasses.md#has)
* [remove](_dom_classes_.domclasses.md#remove)
* [set](_dom_classes_.domclasses.md#set)
* [whenHas](_dom_classes_.domclasses.md#whenhas)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DomClasses**(_element: *`Element`*, elementObject: *[DomElement](_dom_element_.domelement.md)*): [DomClasses](_dom_classes_.domclasses.md)

*Defined in [dom-classes.ts:19](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _element | `Element` |
| elementObject | [DomElement](_dom_element_.domelement.md) |

**Returns:** [DomClasses](_dom_classes_.domclasses.md)

___

## Properties

<a id="element"></a>

###  element

**● element**: *[DomElement](_dom_element_.domelement.md)*

*Defined in [dom-classes.ts:19](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L19)*

___
<a id="htmlelement"></a>

###  htmlElement

**● htmlElement**: *`Element`*

*Defined in [dom-classes.ts:18](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L18)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(_class: *`string`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[add](../interfaces/_i_classes_.iclasses.md#add)*

*Defined in [dom-classes.ts:51](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="each"></a>

###  each

▸ **each**(task: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [dom-classes.ts:26](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| task | `function` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Implementation of [IClasses](../interfaces/_i_classes_.iclasses.md).[has](../interfaces/_i_classes_.iclasses.md#has)*

*Defined in [dom-classes.ts:33](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L33)*

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

*Defined in [dom-classes.ts:64](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L64)*

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

*Defined in [dom-classes.ts:69](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="whenhas"></a>

###  whenHas

▸ **whenHas**(name: *`string`*, callback: *`function`*): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Defined in [dom-classes.ts:44](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-classes.ts#L44)*

Calls the given function if-and-only-if the named class is on the element. The function is called with the (fluid) element object to allow things to be done with it. Returns self.

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___

