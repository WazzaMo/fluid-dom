[Fluid-dom](../README.md) > ["mock-document-nodes"](../modules/_mock_document_nodes_.md) > [ElementNode](../classes/_mock_document_nodes_.elementnode.md)

# Class: ElementNode

Concrete implementation of a mark-up element node. Represents the main building blocks of a mock document.

## Hierarchy

**ElementNode**

## Implements

* [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)
* [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

## Index

### Constructors

* [constructor](_mock_document_nodes_.elementnode.md#constructor)

### Properties

* [_attributes](_mock_document_nodes_.elementnode.md#_attributes)
* [_children](_mock_document_nodes_.elementnode.md#_children)
* [_parent](_mock_document_nodes_.elementnode.md#_parent)
* [_tag](_mock_document_nodes_.elementnode.md#_tag)
* [_text_value](_mock_document_nodes_.elementnode.md#_text_value)

### Accessors

* [attributes](_mock_document_nodes_.elementnode.md#attributes)
* [children](_mock_document_nodes_.elementnode.md#children)
* [nodeType](_mock_document_nodes_.elementnode.md#nodetype)
* [parent](_mock_document_nodes_.elementnode.md#parent)
* [tag](_mock_document_nodes_.elementnode.md#tag)
* [text_value](_mock_document_nodes_.elementnode.md#text_value)

### Methods

* [_class](_mock_document_nodes_.elementnode.md#_class)
* [addChild](_mock_document_nodes_.elementnode.md#addchild)
* [attrib](_mock_document_nodes_.elementnode.md#attrib)
* [children_as_html](_mock_document_nodes_.elementnode.md#children_as_html)
* [children_as_text](_mock_document_nodes_.elementnode.md#children_as_text)
* [create_child_element](_mock_document_nodes_.elementnode.md#create_child_element)
* [create_child_text](_mock_document_nodes_.elementnode.md#create_child_text)
* [hasParent](_mock_document_nodes_.elementnode.md#hasparent)
* [id](_mock_document_nodes_.elementnode.md#id)
* [queryByClass](_mock_document_nodes_.elementnode.md#querybyclass)
* [queryById](_mock_document_nodes_.elementnode.md#querybyid)
* [queryByTag](_mock_document_nodes_.elementnode.md#querybytag)
* [recursiveQuery](_mock_document_nodes_.elementnode.md#recursivequery)
* [toString](_mock_document_nodes_.elementnode.md#tostring)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ElementNode**(tag: *`string`*, parent?: *[ElementNode](_mock_document_nodes_.elementnode.md)*, id?: * `undefined` &#124; `string`*): [ElementNode](_mock_document_nodes_.elementnode.md)

*Defined in [mock-document-nodes.ts:76](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L76)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tag | `string` |
| `Optional` parent | [ElementNode](_mock_document_nodes_.elementnode.md) |
| `Optional` id |  `undefined` &#124; `string`|

**Returns:** [ElementNode](_mock_document_nodes_.elementnode.md)

___

## Properties

<a id="_attributes"></a>

### `<Private>` _attributes

**● _attributes**: *[IMockNodeAttributes](../interfaces/_mock_document_nodes_.imocknodeattributes.md)*

*Defined in [mock-document-nodes.ts:68](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L68)*

___
<a id="_children"></a>

### `<Private>` _children

**● _children**: *`Array`<[IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)>*

*Defined in [mock-document-nodes.ts:64](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L64)*

___
<a id="_parent"></a>

### `<Private>` _parent

**● _parent**: * [ElementNode](_mock_document_nodes_.elementnode.md) &#124; `undefined`
*

*Defined in [mock-document-nodes.ts:67](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L67)*

___
<a id="_tag"></a>

### `<Private>` _tag

**● _tag**: *`string`*

*Defined in [mock-document-nodes.ts:66](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L66)*

___
<a id="_text_value"></a>

### `<Private>` _text_value

**● _text_value**: *`string`*

*Defined in [mock-document-nodes.ts:65](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L65)*

___

## Accessors

<a id="attributes"></a>

###  attributes

getattributes(): `any`

*Defined in [mock-document-nodes.ts:249](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L249)*

**Returns:** `any`

___
<a id="children"></a>

###  children

getchildren(): [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)[]

*Defined in [mock-document-nodes.ts:71](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L71)*

**Returns:** [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)[]

___
<a id="nodetype"></a>

###  nodeType

getnodeType(): [MockNodeType](../enums/_mock_document_nodes_.mocknodetype.md)

*Defined in [mock-document-nodes.ts:70](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L70)*

**Returns:** [MockNodeType](../enums/_mock_document_nodes_.mocknodetype.md)

___
<a id="parent"></a>

###  parent

getparent():  [ElementNode](_mock_document_nodes_.elementnode.md) &#124; `undefined`

*Defined in [mock-document-nodes.ts:76](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L76)*

**Returns:**  [ElementNode](_mock_document_nodes_.elementnode.md) &#124; `undefined`

___
<a id="tag"></a>

###  tag

gettag(): `string`

*Defined in [mock-document-nodes.ts:75](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L75)*

**Returns:** `string`

___
<a id="text_value"></a>

###  text_value

gettext_value(): `string`settext_value(value: *`string`*): `void`

*Defined in [mock-document-nodes.ts:72](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L72)*

**Returns:** `string`

*Defined in [mock-document-nodes.ts:73](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L73)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `void`

___

## Methods

<a id="_class"></a>

###  _class

▸ **_class**(value?: * `undefined` &#124; `string`*):  `void` &#124; `string`

*Defined in [mock-document-nodes.ts:108](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L108)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value |  `undefined` &#124; `string`|

**Returns:**  `void` &#124; `string`

___
<a id="addchild"></a>

### `<Private>` addChild

▸ **addChild**(node: *[IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)*): `void`

*Defined in [mock-document-nodes.ts:200](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L200)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md) |

**Returns:** `void`

___
<a id="attrib"></a>

###  attrib

▸ **attrib**(name: *`string`*, value?: * `undefined` &#124; `string`*):  `undefined` &#124; `string`

*Defined in [mock-document-nodes.ts:93](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L93)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` value |  `undefined` &#124; `string`|

**Returns:**  `undefined` &#124; `string`

___
<a id="children_as_html"></a>

###  children_as_html

▸ **children_as_html**(): `string`

*Defined in [mock-document-nodes.ts:231](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L231)*

**Returns:** `string`

___
<a id="children_as_text"></a>

###  children_as_text

▸ **children_as_text**(): `string`

*Defined in [mock-document-nodes.ts:224](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L224)*

**Returns:** `string`

___
<a id="create_child_element"></a>

###  create_child_element

▸ **create_child_element**(child_tag: *`string`*, callback?: * `function` &#124; `undefined`*): [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

*Defined in [mock-document-nodes.ts:212](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L212)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| child_tag | `string` |
| `Optional` callback |  `function` &#124; `undefined`|

**Returns:** [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

___
<a id="create_child_text"></a>

###  create_child_text

▸ **create_child_text**(text: *`string`*): [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

*Implementation of [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md).[create_child_text](../interfaces/_mock_document_nodes_.ielementnodefactory.md#create_child_text)*

*Defined in [mock-document-nodes.ts:204](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L204)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| text | `string` |

**Returns:** [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

___
<a id="hasparent"></a>

###  hasParent

▸ **hasParent**(): `boolean`

*Defined in [mock-document-nodes.ts:122](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L122)*

The root element of a document has no parent so, in a way, this is asking if this node is the root or not. Note: it also asks if the parent node should be followed for upward traversal or de-referencing.

**Returns:** `boolean`

___
<a id="id"></a>

###  id

▸ **id**(value?: * `undefined` &#124; `string`*):  `void` &#124; `string`

*Defined in [mock-document-nodes.ts:100](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L100)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value |  `undefined` &#124; `string`|

**Returns:**  `void` &#124; `string`

___
<a id="querybyclass"></a>

###  queryByClass

▸ **queryByClass**(class_name: *`string`*, collector: *`Array`<[ElementNode](_mock_document_nodes_.elementnode.md)>*): `void`

*Defined in [mock-document-nodes.ts:150](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L150)*

Represents a multi-element get using the class name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| class_name | `string` |  without CSS '.' prefix. |
| collector | `Array`<[ElementNode](_mock_document_nodes_.elementnode.md)> |  an array to push ElementNode instances into. |

**Returns:** `void`

___
<a id="querybyid"></a>

###  queryById

▸ **queryById**(id_value: *`string`*):  [ElementNode](_mock_document_nodes_.elementnode.md) &#124; `undefined`

*Defined in [mock-document-nodes.ts:131](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L131)*

Represents a single element get using the ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id_value | `string` |  raw string without "#" prefix. |

**Returns:**  [ElementNode](_mock_document_nodes_.elementnode.md) &#124; `undefined`

ElementNode instance or undefined

___
<a id="querybytag"></a>

###  queryByTag

▸ **queryByTag**(tag: *`string`*, collector: *`Array`<[ElementNode](_mock_document_nodes_.elementnode.md)>*): `void`

*Defined in [mock-document-nodes.ts:172](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L172)*

Represents getting multiple nodes by their tag-name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tag | `string` |  \- |
| collector | `Array`<[ElementNode](_mock_document_nodes_.elementnode.md)> |   |

**Returns:** `void`

___
<a id="recursivequery"></a>

### `<Private>` recursiveQuery

▸ **recursiveQuery**(callback: *`function`*): `void`

*Defined in [mock-document-nodes.ts:186](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L186)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** `void`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [mock-document-nodes.ts:253](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L253)*

**Returns:** `string`

___

