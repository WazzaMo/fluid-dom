[Fluid-dom](../README.md) > ["non-element"](../modules/_non_element_.md) > [NonElement](../classes/_non_element_.nonelement.md)

# Class: NonElement

Represents a non-element. To be returned in answer for an element but one cannot be provided.

## Hierarchy

**NonElement**

## Implements

* [IElement](../interfaces/_i_element_.ielement.md)

## Index

### Constructors

* [constructor](_non_element_.nonelement.md#constructor)

### Methods

* [append](_non_element_.nonelement.md#append)
* [attributes](_non_element_.nonelement.md#attributes)
* [classes](_non_element_.nonelement.md#classes)
* [exists](_non_element_.nonelement.md#exists)
* [expect](_non_element_.nonelement.md#expect)
* [findAll](_non_element_.nonelement.md#findall)
* [getId](_non_element_.nonelement.md#getid)
* [getParent](_non_element_.nonelement.md#getparent)
* [hasId](_non_element_.nonelement.md#hasid)
* [html](_non_element_.nonelement.md#html)
* [isValid](_non_element_.nonelement.md#isvalid)
* [on](_non_element_.nonelement.md#on)
* [prepend](_non_element_.nonelement.md#prepend)
* [remove](_non_element_.nonelement.md#remove)
* [selectFirst](_non_element_.nonelement.md#selectfirst)
* [selectorPath](_non_element_.nonelement.md#selectorpath)
* [tagName](_non_element_.nonelement.md#tagname)
* [text](_non_element_.nonelement.md#text)
* [value](_non_element_.nonelement.md#value)
* [withChildren](_non_element_.nonelement.md#withchildren)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NonElement**(): [NonElement](_non_element_.nonelement.md)

*Defined in [non-element.ts:21](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L21)*

**Returns:** [NonElement](_non_element_.nonelement.md)

___

## Methods

<a id="append"></a>

###  append

▸ **append**(_html: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[append](../interfaces/_i_element_.ielement.md#append)*

*Defined in [non-element.ts:85](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L85)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _html | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="attributes"></a>

###  attributes

▸ **attributes**(): [IAttributes](../interfaces/_i_attributes_.iattributes.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[attributes](../interfaces/_i_element_.ielement.md#attributes)*

*Defined in [non-element.ts:97](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L97)*

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="classes"></a>

###  classes

▸ **classes**(): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[classes](../interfaces/_i_element_.ielement.md#classes)*

*Defined in [non-element.ts:101](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L101)*

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="exists"></a>

###  exists

▸ **exists**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[exists](../interfaces/_i_element_.ielement.md#exists)*

*Defined in [non-element.ts:49](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L49)*

**Returns:** `boolean`

___
<a id="expect"></a>

###  expect

▸ **expect**(tagName: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[expect](../interfaces/_i_element_.ielement.md#expect)*

*Defined in [non-element.ts:37](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="findall"></a>

###  findAll

▸ **findAll**(elementListLocation: *[ElementListSource](../interfaces/_element_list_source_.elementlistsource.md)*): [IElement](../interfaces/_i_element_.ielement.md)[]

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[findAll](../interfaces/_i_element_.ielement.md#findall)*

*Defined in [non-element.ts:53](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| elementListLocation | [ElementListSource](../interfaces/_element_list_source_.elementlistsource.md) |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)[]

___
<a id="getid"></a>

###  getId

▸ **getId**():  `string` &#124; `null`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getId](../interfaces/_i_element_.ielement.md#getid)*

*Defined in [non-element.ts:41](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L41)*

**Returns:**  `string` &#124; `null`

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getParent](../interfaces/_i_element_.ielement.md#getparent)*

*Defined in [non-element.ts:29](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L29)*

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="hasid"></a>

###  hasId

▸ **hasId**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[hasId](../interfaces/_i_element_.ielement.md#hasid)*

*Defined in [non-element.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L45)*

**Returns:** `boolean`

___
<a id="html"></a>

###  html

▸ **html**(_html?: * `string` &#124; `undefined`*):  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[html](../interfaces/_i_element_.ielement.md#html)*

*Defined in [non-element.ts:77](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _html |  `string` &#124; `undefined`|

**Returns:**  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[isValid](../interfaces/_i_element_.ielement.md#isvalid)*

*Defined in [non-element.ts:25](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L25)*

**Returns:** `boolean`

___
<a id="on"></a>

###  on

▸ **on**(args: *[EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md)*): `void`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[on](../interfaces/_i_element_.ielement.md#on)*

*Defined in [non-element.ts:104](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | [EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md) |

**Returns:** `void`

___
<a id="prepend"></a>

###  prepend

▸ **prepend**(_html: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[prepend](../interfaces/_i_element_.ielement.md#prepend)*

*Defined in [non-element.ts:89](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L89)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _html | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="remove"></a>

###  remove

▸ **remove**(): `undefined`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[remove](../interfaces/_i_element_.ielement.md#remove)*

*Defined in [non-element.ts:93](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L93)*

**Returns:** `undefined`

___
<a id="selectfirst"></a>

###  selectFirst

▸ **selectFirst**(selector: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[selectFirst](../interfaces/_i_element_.ielement.md#selectfirst)*

*Defined in [non-element.ts:57](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="selectorpath"></a>

###  selectorPath

▸ **selectorPath**(): `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[selectorPath](../interfaces/_i_element_.ielement.md#selectorpath)*

*Defined in [non-element.ts:61](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L61)*

**Returns:** `string`

___
<a id="tagname"></a>

###  tagName

▸ **tagName**(): `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[tagName](../interfaces/_i_element_.ielement.md#tagname)*

*Defined in [non-element.ts:65](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L65)*

**Returns:** `string`

___
<a id="text"></a>

###  text

▸ **text**(_text?: * `string` &#124; `undefined`*):  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[text](../interfaces/_i_element_.ielement.md#text)*

*Defined in [non-element.ts:69](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _text |  `string` &#124; `undefined`|

**Returns:**  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="value"></a>

###  value

▸ **value**():  `string` &#124; `undefined`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[value](../interfaces/_i_element_.ielement.md#value)*

*Defined in [non-element.ts:106](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L106)*

**Returns:**  `string` &#124; `undefined`

___
<a id="withchildren"></a>

###  withChildren

▸ **withChildren**(callback: *`function`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [non-element.ts:33](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/non-element.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___

