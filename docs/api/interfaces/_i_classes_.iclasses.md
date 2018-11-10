[Fluid-dom](../README.md) > ["i-classes"](../modules/_i_classes_.md) > [IClasses](../interfaces/_i_classes_.iclasses.md)

# Interface: IClasses

IClasses
========

Represents a container of class names attached to an element.
*__see__*: DomClasses for a concrete implementation for the DOM.

## Hierarchy

**IClasses**

## Implemented by

* [DomClasses](../classes/_dom_classes_.domclasses.md)
* [NonClasses](../classes/_non_classes_.nonclasses.md)

## Index

### Methods

* [add](_i_classes_.iclasses.md#add)
* [each](_i_classes_.iclasses.md#each)
* [has](_i_classes_.iclasses.md#has)
* [remove](_i_classes_.iclasses.md#remove)
* [set](_i_classes_.iclasses.md#set)
* [whenHas](_i_classes_.iclasses.md#whenhas)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(_class: *`string`*): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-classes.ts:38](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L38)*

Adds the class name to the element.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _class | `string` |  HTML class name to add. |

**Returns:** [IClasses](_i_classes_.iclasses.md)

___
<a id="each"></a>

###  each

▸ **each**(callback: *`function`*): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-classes.ts:21](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L21)*

Iterate through each HTML class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  called with the name of the class as the parameter. |

**Returns:** [IClasses](_i_classes_.iclasses.md)

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Defined in [i-classes.ts:23](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(_class: *`string`*): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-classes.ts:41](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L41)*

Removes an HTML class name from an element.

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** [IClasses](_i_classes_.iclasses.md)

___
<a id="set"></a>

###  set

▸ **set**(_class: *`string`*): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-classes.ts:48](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L48)*

An alternate name for 'add.'
*__see__*: add

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _class | `string` |  HTML class name. |

**Returns:** [IClasses](_i_classes_.iclasses.md)

___
<a id="whenhas"></a>

###  whenHas

▸ **whenHas**(name: *`string`*, callback: *`function`*): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-classes.ts:32](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-classes.ts#L32)*

Calls the given function if-and-only-if the named class is on the element. The function is called with the (fluid) element object to allow things to be done with it. Returns self.

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** [IClasses](_i_classes_.iclasses.md)

___

