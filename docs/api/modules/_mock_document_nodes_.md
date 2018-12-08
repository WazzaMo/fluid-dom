[Fluid-dom](../README.md) > ["mock-document-nodes"](../modules/_mock_document_nodes_.md)

# External module: "mock-document-nodes"

## Index

### Enumerations

* [MockNodeType](../enums/_mock_document_nodes_.mocknodetype.md)

### Classes

* [ElementNode](../classes/_mock_document_nodes_.elementnode.md)
* [TextNode](../classes/_mock_document_nodes_.textnode.md)

### Interfaces

* [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)
* [IMockDocNode](../interfaces/_mock_document_nodes_.imockdocnode.md)
* [IMockNodeAttributes](../interfaces/_mock_document_nodes_.imocknodeattributes.md)

### Functions

* [attributesToString](_mock_document_nodes_.md#attributestostring)
* [getElementChildrenFrom](_mock_document_nodes_.md#getelementchildrenfrom)
* [toHtml](_mock_document_nodes_.md#tohtml)

---

## Functions

<a id="attributestostring"></a>

###  attributesToString

▸ **attributesToString**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `string`

*Defined in [mock-document-nodes.ts:259](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L259)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** `string`

___
<a id="getelementchildrenfrom"></a>

###  getElementChildrenFrom

▸ **getElementChildrenFrom**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

*Defined in [mock-document-nodes.ts:289](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L289)*

Takes an element and finds any and all element children in its possession.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  element from which to make a list of element children |

**Returns:** `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>
array of element nodes.

___
<a id="tohtml"></a>

###  toHtml

▸ **toHtml**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `string`

*Defined in [mock-document-nodes.ts:273](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L273)*

For the mocking API, will take an internal mock representation and write it out as HTML text. It won't be pretty but it works.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  base element to dump. |

**Returns:** `string`

___

