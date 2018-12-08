[Fluid-dom](../README.md) > ["mock-element"](../modules/_mock_element_.md) > [MockElement](../classes/_mock_element_.mockelement.md)

# Class: MockElement

## Hierarchy

**MockElement**

## Implements

* [IElement](../interfaces/_i_element_.ielement.md)

## Index

### Constructors

* [constructor](_mock_element_.mockelement.md#constructor)

### Properties

* [_element](_mock_element_.mockelement.md#_element)
* [_selector_parser](_mock_element_.mockelement.md#_selector_parser)

### Methods

* [append](_mock_element_.mockelement.md#append)
* [attributes](_mock_element_.mockelement.md#attributes)
* [classes](_mock_element_.mockelement.md#classes)
* [exists](_mock_element_.mockelement.md#exists)
* [expect](_mock_element_.mockelement.md#expect)
* [findAll](_mock_element_.mockelement.md#findall)
* [getId](_mock_element_.mockelement.md#getid)
* [getParent](_mock_element_.mockelement.md#getparent)
* [hasId](_mock_element_.mockelement.md#hasid)
* [html](_mock_element_.mockelement.md#html)
* [isValid](_mock_element_.mockelement.md#isvalid)
* [makeElementList](_mock_element_.mockelement.md#makeelementlist)
* [on](_mock_element_.mockelement.md#on)
* [prepend](_mock_element_.mockelement.md#prepend)
* [remove](_mock_element_.mockelement.md#remove)
* [selectFirst](_mock_element_.mockelement.md#selectfirst)
* [selectorPath](_mock_element_.mockelement.md#selectorpath)
* [tagName](_mock_element_.mockelement.md#tagname)
* [text](_mock_element_.mockelement.md#text)
* [toString](_mock_element_.mockelement.md#tostring)
* [value](_mock_element_.mockelement.md#value)
* [withChildren](_mock_element_.mockelement.md#withchildren)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MockElement**(element?: *[ElementNode](../enums/_mock_document_nodes_.mocknodetype.md#elementnode)*): [MockElement](_mock_element_.mockelement.md)

*Defined in [mock-element.ts:31](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` element | [ElementNode](../enums/_mock_document_nodes_.mocknodetype.md#elementnode) |

**Returns:** [MockElement](_mock_element_.mockelement.md)

___

## Properties

<a id="_element"></a>

### `<Private>` _element

**● _element**: *[Option](_option_.option.md)<[ElementNode](_mock_document_nodes_.elementnode.md)>*

*Defined in [mock-element.ts:30](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L30)*

___
<a id="_selector_parser"></a>

### `<Private>` _selector_parser

**● _selector_parser**: *[Option](_option_.option.md)<[MockSelectorParser](_mock_selector_parser_.mockselectorparser.md)>*

*Defined in [mock-element.ts:31](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L31)*

___

## Methods

<a id="append"></a>

###  append

▸ **append**(_html: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[append](../interfaces/_i_element_.ielement.md#append)*

*Defined in [mock-element.ts:177](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L177)*

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

*Defined in [mock-element.ts:186](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L186)*

**Returns:** [IAttributes](../interfaces/_i_attributes_.iattributes.md)

___
<a id="classes"></a>

###  classes

▸ **classes**(): [IClasses](../interfaces/_i_classes_.iclasses.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[classes](../interfaces/_i_element_.ielement.md#classes)*

*Defined in [mock-element.ts:189](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L189)*

**Returns:** [IClasses](../interfaces/_i_classes_.iclasses.md)

___
<a id="exists"></a>

###  exists

▸ **exists**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[exists](../interfaces/_i_element_.ielement.md#exists)*

*Defined in [mock-element.ts:106](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L106)*

**Returns:** `boolean`

___
<a id="expect"></a>

###  expect

▸ **expect**(tagName: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[expect](../interfaces/_i_element_.ielement.md#expect)*

*Defined in [mock-element.ts:80](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L80)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `string` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="findall"></a>

###  findAll

▸ **findAll**(elementListSource: *[ElementListSource](../interfaces/_element_list_source_.elementlistsource.md)*): [IElement](../interfaces/_i_element_.ielement.md)[]

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[findAll](../interfaces/_i_element_.ielement.md#findall)*

*Defined in [mock-element.ts:110](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| elementListSource | [ElementListSource](../interfaces/_element_list_source_.elementlistsource.md) |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)[]

___
<a id="getid"></a>

###  getId

▸ **getId**():  `string` &#124; `null`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getId](../interfaces/_i_element_.ielement.md#getid)*

*Defined in [mock-element.ts:90](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L90)*

**Returns:**  `string` &#124; `null`

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[getParent](../interfaces/_i_element_.ielement.md#getparent)*

*Defined in [mock-element.ts:49](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L49)*

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="hasid"></a>

###  hasId

▸ **hasId**(): `boolean`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[hasId](../interfaces/_i_element_.ielement.md#hasid)*

*Defined in [mock-element.ts:102](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L102)*

**Returns:** `boolean`

___
<a id="html"></a>

###  html

▸ **html**(_html?: * `string` &#124; `undefined`*):  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[html](../interfaces/_i_element_.ielement.md#html)*

*Defined in [mock-element.ts:173](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L173)*

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

*Defined in [mock-element.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L45)*

**Returns:** `boolean`

___
<a id="makeelementlist"></a>

### `<Private>` makeElementList

▸ **makeElementList**(fromList: *`Array`<[IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)>*): `Array`<[MockElement](_mock_element_.mockelement.md)>

*Defined in [mock-element.ts:70](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fromList | `Array`<[IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)> |

**Returns:** `Array`<[MockElement](_mock_element_.mockelement.md)>

___
<a id="on"></a>

###  on

▸ **on**(args: *[EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md)*): `void`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[on](../interfaces/_i_element_.ielement.md#on)*

*Defined in [mock-element.ts:192](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L192)*

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

*Defined in [mock-element.ts:180](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L180)*

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

*Defined in [mock-element.ts:183](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L183)*

**Returns:** `undefined`

___
<a id="selectfirst"></a>

###  selectFirst

▸ **selectFirst**(selector: *`string`*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[selectFirst](../interfaces/_i_element_.ielement.md#selectfirst)*

*Defined in [mock-element.ts:128](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L128)*

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

*Defined in [mock-element.ts:139](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L139)*

**Returns:** `string`

___
<a id="tagname"></a>

###  tagName

▸ **tagName**(): `string`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[tagName](../interfaces/_i_element_.ielement.md#tagname)*

*Defined in [mock-element.ts:143](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L143)*

**Returns:** `string`

___
<a id="text"></a>

###  text

▸ **text**(_text?: * `string` &#124; `undefined`*):  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[text](../interfaces/_i_element_.ielement.md#text)*

*Defined in [mock-element.ts:150](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L150)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` _text |  `string` &#124; `undefined`|

**Returns:**  `string` &#124; [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [mock-element.ts:200](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L200)*

**Returns:** `string`

___
<a id="value"></a>

###  value

▸ **value**():  `string` &#124; `undefined`

*Implementation of [IElement](../interfaces/_i_element_.ielement.md).[value](../interfaces/_i_element_.ielement.md#value)*

*Defined in [mock-element.ts:196](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L196)*

**Returns:**  `string` &#124; `undefined`

___
<a id="withchildren"></a>

###  withChildren

▸ **withChildren**(callback: *`function`*): [IElement](../interfaces/_i_element_.ielement.md)

*Defined in [mock-element.ts:59](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-element.ts#L59)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___

