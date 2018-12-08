[Fluid-dom](../README.md) > ["dom-element"](../modules/_dom_element_.md) > [DomElement](../classes/_dom_element_.domelement.md)

# Class: DomElement

DomElement
==========

The implementation IElement for elements in the browser page from the DOM.

## Hierarchy

**DomElement**

## Implements

* [IElement](../interfaces/_i_element_.ielement.md)

## Index

### Constructors

* [constructor](_dom_element_.domelement.md#constructor)

### Properties

* [domElement](_dom_element_.domelement.md#domelement)

### Methods

* [alertInvalid](_dom_element_.domelement.md#alertinvalid)
* [append](_dom_element_.domelement.md#append)
* [attributes](_dom_element_.domelement.md#attributes)
* [classes](_dom_element_.domelement.md#classes)
* [exists](_dom_element_.domelement.md#exists)
* [expect](_dom_element_.domelement.md#expect)
* [findAll](_dom_element_.domelement.md#findall)
* [getId](_dom_element_.domelement.md#getid)
* [getParent](_dom_element_.domelement.md#getparent)
* [hasId](_dom_element_.domelement.md#hasid)
* [html](_dom_element_.domelement.md#html)
* [isValid](_dom_element_.domelement.md#isvalid)
* [on](_dom_element_.domelement.md#on)
* [prepend](_dom_element_.domelement.md#prepend)
* [remove](_dom_element_.domelement.md#remove)
* [selectFirst](_dom_element_.domelement.md#selectfirst)
* [selectorPath](_dom_element_.domelement.md#selectorpath)
* [tagName](_dom_element_.domelement.md#tagname)
* [text](_dom_element_.domelement.md#text)
* [value](_dom_element_.domelement.md#value)
* [withChildren](_dom_element_.domelement.md#withchildren)
* [getElementFromId](_dom_element_.domelement.md#getelementfromid)
* [getElementFromSelector](_dom_element_.domelement.md#getelementfromselector)
* [getListFromClass](_dom_element_.domelement.md#getlistfromclass)
* [getListFromSelector](_dom_element_.domelement.md#getlistfromselector)
* [getListFromTagName](_dom_element_.domelement.md#getlistfromtagname)
* [makeFromElement](_dom_element_.domelement.md#makefromelement)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DomElement**(element?: * `HTMLElement` &#124; `Element`*): [DomElement](_dom_element_.domelement.md)

*Defined in [dom-element.ts:81](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L81)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` element |  `HTMLElement` &#124; `Element`|

**Returns:** [DomElement](_dom_element_.domelement.md)

___

## Properties

<a id="domelement"></a>

### `<Private>` domElement

**● domElement**: *[Option](_option_.option.md)<`HTMLElement`>*

*Defined in [dom-element.ts:81](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L81)*

___

## Methods

<a id="alertinvalid"></a>

### `<Private>` alertInvalid

▸ **alertInvalid**(): `void`

*Defined in [dom-element.ts:87](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L87)*

**Returns:** `void`

___
<a id="append"></a>

###  append

▸ **append**(_html: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[append](../interfaces/_i_element_.ielement.md#append)*

*Defined in [dom-element.ts:257](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L257)*

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

*Defined in [dom-element.ts:278](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L278)*

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="classes"></a>

###  classes

▸ **classes**(): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[classes](../interfaces/_i_element_.ielement.md#classes)*

*Defined in [dom-element.ts:286](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L286)*

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="exists"></a>

###  exists

▸ **exists**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[exists](../interfaces/_i_element_.ielement.md#exists)*

*Defined in [dom-element.ts:186](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L186)*

**Returns:** `boolean`

___
<a id="expect"></a>

###  expect

▸ **expect**(tagName: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[expect](../interfaces/_i_element_.ielement.md#expect)*

*Defined in [dom-element.ts:165](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L165)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="findall"></a>

###  findAll

▸ **findAll**(elementListLocation: *[ElementListSource](../interfaces/_element_list_source_.elementlistsource.md)*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[findAll](../interfaces/_i_element_.ielement.md#findall)*

*Defined in [dom-element.ts:190](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L190)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| elementListLocation | [ElementListSource](../interfaces/_element_list_source_.elementlistsource.md) |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

___
<a id="getid"></a>

###  getId

▸ **getId**():  `string` &#124; `null`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getId](../interfaces/_i_element_.ielement.md#getid)*

*Defined in [dom-element.ts:178](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L178)*

**Returns:**  `string` &#124; `null`

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getParent](../interfaces/_i_element_.ielement.md#getparent)*

*Defined in [dom-element.ts:146](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L146)*

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="hasid"></a>

###  hasId

▸ **hasId**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[hasId](../interfaces/_i_element_.ielement.md#hasid)*

*Defined in [dom-element.ts:182](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L182)*

**Returns:** `boolean`

___
<a id="html"></a>

###  html

▸ **html**(_html?: * `undefined` &#124; `string`*):  [IElement](../interfaces/_i_element_.ielement.md) &#124; `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[html](../interfaces/_i_element_.ielement.md#html)*

*Defined in [dom-element.ts:242](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L242)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _html |  `undefined` &#124; `string`|

**Returns:**  [IElement](../interfaces/_i_element_.ielement.md) &#124; `string`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[isValid](../interfaces/_i_element_.ielement.md#isvalid)*

*Defined in [dom-element.ts:142](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L142)*

**Returns:** `boolean`

___
<a id="on"></a>

###  on

▸ **on**(args: *[EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md)*): `void`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[on](../interfaces/_i_element_.ielement.md#on)*

*Defined in [dom-element.ts:293](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L293)*

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

*Defined in [dom-element.ts:263](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L263)*

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

*Defined in [dom-element.ts:269](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L269)*

**Returns:** `undefined`

___
<a id="selectfirst"></a>

###  selectFirst

▸ **selectFirst**(selector: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[selectFirst](../interfaces/_i_element_.ielement.md#selectfirst)*

*Defined in [dom-element.ts:200](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L200)*

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

*Defined in [dom-element.ts:211](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L211)*

**Returns:** `string`

___
<a id="tagname"></a>

###  tagName

▸ **tagName**(): `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[tagName](../interfaces/_i_element_.ielement.md#tagname)*

*Defined in [dom-element.ts:219](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L219)*

**Returns:** `string`

___
<a id="text"></a>

###  text

▸ **text**(_text?: * `undefined` &#124; `string`*):  [IElement](../interfaces/_i_element_.ielement.md) &#124; `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[text](../interfaces/_i_element_.ielement.md#text)*

*Defined in [dom-element.ts:227](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L227)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _text |  `undefined` &#124; `string`|

**Returns:**  [IElement](../interfaces/_i_element_.ielement.md) &#124; `string`

___
<a id="value"></a>

###  value

▸ **value**():  `string` &#124; `undefined`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[value](../interfaces/_i_element_.ielement.md#value)*

*Defined in [dom-element.ts:307](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L307)*

**Returns:**  `string` &#124; `undefined`

___
<a id="withchildren"></a>

###  withChildren

▸ **withChildren**(callback: *`function`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [dom-element.ts:157](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L157)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="getelementfromid"></a>

### `<Static>` getElementFromId

▸ **getElementFromId**(id: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [dom-element.ts:123](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L123)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="getelementfromselector"></a>

### `<Static>` getElementFromSelector

▸ **getElementFromSelector**(selector: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [dom-element.ts:133](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L133)*

Gets the first matching element from a document.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | `string` |  a CSS style selector |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)
an element object.

___
<a id="getlistfromclass"></a>

### `<Static>` getListFromClass

▸ **getListFromClass**(_class: *`string`*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Defined in [dom-element.ts:108](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L108)*

Finds elements in a document using a class name. Note do not prefix with a period (`.`) - just provide the pure class name.

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `string` |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>
list of matching elements.

___
<a id="getlistfromselector"></a>

### `<Static>` getListFromSelector

▸ **getListFromSelector**(selector: *`string`*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Defined in [dom-element.ts:96](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L96)*

Finds elements in a document using a selector.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | `string` |  CSS style selector. |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>
list of matching elements.

___
<a id="getlistfromtagname"></a>

### `<Static>` getListFromTagName

▸ **getListFromTagName**(tagName: *`string`*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Defined in [dom-element.ts:118](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L118)*

Finds elements in a document using a tag-name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tagName | `string` |  tag name (case insensitive). |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>
list of matching elements.

___
<a id="makefromelement"></a>

### `<Static>``<Private>` makeFromElement

▸ **makeFromElement**(element: * `Element` &#124; `HTMLElement` &#124; `null`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [dom-element.ts:138](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L138)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element |  `Element` &#124; `HTMLElement` &#124; `null`|

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___

