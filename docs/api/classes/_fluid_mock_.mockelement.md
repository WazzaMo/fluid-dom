[Fluid-dom](../README.md) > ["fluid-mock"](../modules/_fluid_mock_.md) > [MockElement](../classes/_fluid_mock_.mockelement.md)

# Class: MockElement

## Hierarchy

**MockElement**

## Index

### Constructors

* [constructor](_fluid_mock_.mockelement.md#constructor)

### Properties

* [attributes](_fluid_mock_.mockelement.md#attributes)
* [children](_fluid_mock_.mockelement.md#children)
* [tag](_fluid_mock_.mockelement.md#tag)
* [text_value](_fluid_mock_.mockelement.md#text_value)

### Methods

* [create](_fluid_mock_.mockelement.md#create)
* [text](_fluid_mock_.mockelement.md#text)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MockElement**(tag: *`string`*, attribs?: *[MockAttributes](../interfaces/_fluid_mock_.mockattributes.md)*): [MockElement](_fluid_mock_.mockelement.md)

*Defined in [fluid-mock.ts:25](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tag | `string` |
| `Optional` attribs | [MockAttributes](../interfaces/_fluid_mock_.mockattributes.md) |

**Returns:** [MockElement](_fluid_mock_.mockelement.md)

___

## Properties

<a id="attributes"></a>

###  attributes

**● attributes**: *[MockAttributes](../interfaces/_fluid_mock_.mockattributes.md)*

*Defined in [fluid-mock.ts:23](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L23)*

___
<a id="children"></a>

###  children

**● children**: *`Array`<[MockElement](_fluid_mock_.mockelement.md)>*

*Defined in [fluid-mock.ts:24](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L24)*

___
<a id="tag"></a>

###  tag

**● tag**: *`string`*

*Defined in [fluid-mock.ts:22](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L22)*

___
<a id="text_value"></a>

###  text_value

**● text_value**: *`string`*

*Defined in [fluid-mock.ts:25](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L25)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(child_tag: *`string`*, child_attribs?: *[MockAttributes](../interfaces/_fluid_mock_.mockattributes.md)*, func?: * `undefined` &#124; `function`*): [MockElement](_fluid_mock_.mockelement.md)

*Defined in [fluid-mock.ts:34](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| child_tag | `string` |
| `Optional` child_attribs | [MockAttributes](../interfaces/_fluid_mock_.mockattributes.md) |
| `Optional` func |  `undefined` &#124; `function`|

**Returns:** [MockElement](_fluid_mock_.mockelement.md)

___
<a id="text"></a>

###  text

▸ **text**(_val: *`string`*): `this`

*Defined in [fluid-mock.ts:47](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/fluid-mock.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _val | `string` |

**Returns:** `this`

___

