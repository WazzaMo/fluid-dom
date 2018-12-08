[Fluid-dom](../README.md) > ["mock-document"](../modules/_mock_document_.md) > [MockDocument](../classes/_mock_document_.mockdocument.md)

# Class: MockDocument

MockDocument
============

## Hierarchy

**MockDocument**

## Implements

* [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)
* [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md)

## Index

### Constructors

* [constructor](_mock_document_.mockdocument.md#constructor)

### Properties

* [root_node](_mock_document_.mockdocument.md#root_node)

### Methods

* [buttonOn](_mock_document_.mockdocument.md#buttonon)
* [create_child_element](_mock_document_.mockdocument.md#create_child_element)
* [create_child_text](_mock_document_.mockdocument.md#create_child_text)
* [findAll](_mock_document_.mockdocument.md#findall)
* [findElement](_mock_document_.mockdocument.md#findelement)
* [toHtml](_mock_document_.mockdocument.md#tohtml)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MockDocument**(): [MockDocument](_mock_document_.mockdocument.md)

*Defined in [mock-document.ts:36](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L36)*

**Returns:** [MockDocument](_mock_document_.mockdocument.md)

___

## Properties

<a id="root_node"></a>

###  root_node

**● root_node**: *[ElementNode](_mock_document_nodes_.elementnode.md)*

*Defined in [mock-document.ts:36](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L36)*

___

## Methods

<a id="buttonon"></a>

###  buttonOn

▸ **buttonOn**(eventInfo: *[EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md)*): `void`

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[buttonOn](../interfaces/_i_fluid_document_.ifluiddocument.md#buttonon)*

*Defined in [mock-document.ts:67](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventInfo | [EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md) |

**Returns:** `void`

___
<a id="create_child_element"></a>

###  create_child_element

▸ **create_child_element**(child_tag: *`string`*, callback: * `function` &#124; `undefined`*): [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

*Defined in [mock-document.ts:47](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| child_tag | `string` |
| callback |  `function` &#124; `undefined`|

**Returns:** [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

___
<a id="create_child_text"></a>

###  create_child_text

▸ **create_child_text**(text: *`string`*): [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

*Implementation of [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md).[create_child_text](../interfaces/_mock_document_nodes_.ielementnodefactory.md#create_child_text)*

*Defined in [mock-document.ts:42](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L42)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| text | `string` |

**Returns:** [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

___
<a id="findall"></a>

###  findAll

▸ **findAll**(arg: *[ElementListSource](../interfaces/_element_list_source_.elementlistsource.md)*): [IElement](../interfaces/_i_element_.ielement.md)[]

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[findAll](../interfaces/_i_fluid_document_.ifluiddocument.md#findall)*

*Defined in [mock-document.ts:63](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementListSource](../interfaces/_element_list_source_.elementlistsource.md) |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)[]

___
<a id="findelement"></a>

###  findElement

▸ **findElement**(arg: *[ElementSource](../interfaces/_element_source_.elementsource.md)*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[findElement](../interfaces/_i_fluid_document_.ifluiddocument.md#findelement)*

*Defined in [mock-document.ts:59](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L59)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementSource](../interfaces/_element_source_.elementsource.md) |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___
<a id="tohtml"></a>

###  toHtml

▸ **toHtml**(): `string`

*Defined in [mock-document.ts:55](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document.ts#L55)*

**Returns:** `string`

___

