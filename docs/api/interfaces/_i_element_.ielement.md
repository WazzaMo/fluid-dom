[Fluid-dom](../README.md) > ["i-element"](../modules/_i_element_.md) > [IElement](../interfaces/_i_element_.ielement.md)

# Interface: IElement

## Hierarchy

**IElement**

## Implemented by

* [DomElement](../classes/_dom_element_.domelement.md)

## Index

### Methods

* [append](_i_element_.ielement.md#append)
* [attributes](_i_element_.ielement.md#attributes)
* [classes](_i_element_.ielement.md#classes)
* [exists](_i_element_.ielement.md#exists)
* [expect](_i_element_.ielement.md#expect)
* [findAll](_i_element_.ielement.md#findall)
* [getId](_i_element_.ielement.md#getid)
* [getParent](_i_element_.ielement.md#getparent)
* [hasId](_i_element_.ielement.md#hasid)
* [html](_i_element_.ielement.md#html)
* [isValid](_i_element_.ielement.md#isvalid)
* [on](_i_element_.ielement.md#on)
* [prepend](_i_element_.ielement.md#prepend)
* [remove](_i_element_.ielement.md#remove)
* [selectFirst](_i_element_.ielement.md#selectfirst)
* [selectorPath](_i_element_.ielement.md#selectorpath)
* [tagName](_i_element_.ielement.md#tagname)
* [text](_i_element_.ielement.md#text)
* [value](_i_element_.ielement.md#value)
* [withChildren](_i_element_.ielement.md#withchildren)

---

## Methods

<a id="append"></a>

###  append

▸ **append**(_html: *`string`*): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:45](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _html | `string` |

**Returns:** [IElement](_i_element_.ielement.md)

___
<a id="attributes"></a>

###  attributes

▸ **attributes**(): [IAttributes](_i_attributes_.iattributes.md)

*Defined in [i-element.ts:51](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L51)*

**Returns:** [IAttributes](_i_attributes_.iattributes.md)

___
<a id="classes"></a>

###  classes

▸ **classes**(): [IClasses](_i_classes_.iclasses.md)

*Defined in [i-element.ts:53](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L53)*

**Returns:** [IClasses](_i_classes_.iclasses.md)

___
<a id="exists"></a>

###  exists

▸ **exists**(): `boolean`

*Defined in [i-element.ts:31](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L31)*

**Returns:** `boolean`

___
<a id="expect"></a>

###  expect

▸ **expect**(tagName: *`string`*): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:19](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `string` |

**Returns:** [IElement](_i_element_.ielement.md)

___
<a id="findall"></a>

###  findAll

▸ **findAll**(elementListLocation: *[ElementListSource](_element_list_source_.elementlistsource.md)*): `Array`<[IElement](_i_element_.ielement.md)>

*Defined in [i-element.ts:33](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| elementListLocation | [ElementListSource](_element_list_source_.elementlistsource.md) |

**Returns:** `Array`<[IElement](_i_element_.ielement.md)>

___
<a id="getid"></a>

###  getId

▸ **getId**():  `string` &#124; `null`

*Defined in [i-element.ts:25](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L25)*

Shortcut to get the 'id' attribute's value from the element.

**Returns:**  `string` &#124; `null`

null when the 'id' attribute is not present.

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [IElement](_i_element_.ielement.md)

▸ **getParent**(): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:15](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L15)*

**Returns:** [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:27](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L27)*

**Returns:** [IElement](_i_element_.ielement.md)

___
<a id="hasid"></a>

###  hasId

▸ **hasId**(): `boolean`

*Defined in [i-element.ts:29](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L29)*

**Returns:** `boolean`

___
<a id="html"></a>

###  html

▸ **html**(_html?: * `undefined` &#124; `string`*):  [IElement](_i_element_.ielement.md) &#124; `string`

*Defined in [i-element.ts:43](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _html |  `undefined` &#124; `string`|

**Returns:**  [IElement](_i_element_.ielement.md) &#124; `string`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [i-element.ts:14](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L14)*

**Returns:** `boolean`

___
<a id="on"></a>

###  on

▸ **on**(args: *[EventHandlerInfo](_event_handler_info_.eventhandlerinfo.md)*): `void`

*Defined in [i-element.ts:55](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | [EventHandlerInfo](_event_handler_info_.eventhandlerinfo.md) |

**Returns:** `void`

___
<a id="prepend"></a>

###  prepend

▸ **prepend**(_html: *`string`*): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:47](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _html | `string` |

**Returns:** [IElement](_i_element_.ielement.md)

___
<a id="remove"></a>

###  remove

▸ **remove**(): `undefined`

*Defined in [i-element.ts:49](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L49)*

**Returns:** `undefined`

___
<a id="selectfirst"></a>

###  selectFirst

▸ **selectFirst**(selector: *`string`*): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:35](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | `string` |

**Returns:** [IElement](_i_element_.ielement.md)

___
<a id="selectorpath"></a>

###  selectorPath

▸ **selectorPath**(): `string`

*Defined in [i-element.ts:37](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L37)*

**Returns:** `string`

___
<a id="tagname"></a>

###  tagName

▸ **tagName**(): `string`

*Defined in [i-element.ts:39](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L39)*

**Returns:** `string`

___
<a id="text"></a>

###  text

▸ **text**(_text?: * `undefined` &#124; `string`*):  [IElement](_i_element_.ielement.md) &#124; `string`

*Defined in [i-element.ts:41](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _text |  `undefined` &#124; `string`|

**Returns:**  [IElement](_i_element_.ielement.md) &#124; `string`

___
<a id="value"></a>

###  value

▸ **value**():  `string` &#124; `undefined`

*Defined in [i-element.ts:57](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L57)*

**Returns:**  `string` &#124; `undefined`

___
<a id="withchildren"></a>

###  withChildren

▸ **withChildren**(callback: *`function`*): [IElement](_i_element_.ielement.md)

*Defined in [i-element.ts:17](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/i-element.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IElement](_i_element_.ielement.md)

___

