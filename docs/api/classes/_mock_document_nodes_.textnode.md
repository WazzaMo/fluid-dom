[Fluid-dom](../README.md) > ["mock-document-nodes"](../modules/_mock_document_nodes_.md) > [TextNode](../classes/_mock_document_nodes_.textnode.md)

# Class: TextNode

Concrete implementation of a TextNode. Represents the un-marked-up text in a document.

## Hierarchy

**TextNode**

## Implements

* [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)

## Index

### Constructors

* [constructor](_mock_document_nodes_.textnode.md#constructor)

### Properties

* [text_value](_mock_document_nodes_.textnode.md#text_value)

### Accessors

* [children](_mock_document_nodes_.textnode.md#children)
* [nodeType](_mock_document_nodes_.textnode.md#nodetype)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TextNode**(text?: * `undefined` &#124; `string`*): [TextNode](_mock_document_nodes_.textnode.md)

*Defined in [mock-document-nodes.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` text |  `undefined` &#124; `string`|

**Returns:** [TextNode](_mock_document_nodes_.textnode.md)

___

## Properties

<a id="text_value"></a>

###  text_value

**● text_value**: *`string`*

*Implementation of [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md).[text_value](../interfaces/_mock_document_nodes_.imockdocnode.md#text_value)*

*Defined in [mock-document-nodes.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L45)*

___

## Accessors

<a id="children"></a>

###  children

getchildren(): [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)[]

*Defined in [mock-document-nodes.ts:44](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L44)*

**Returns:** [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)[]

___
<a id="nodetype"></a>

###  nodeType

getnodeType(): [MockNodeType](../enums/_mock_document_nodes_.mocknodetype.md)

*Defined in [mock-document-nodes.ts:43](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L43)*

**Returns:** [MockNodeType](../enums/_mock_document_nodes_.mocknodetype.md)

___

