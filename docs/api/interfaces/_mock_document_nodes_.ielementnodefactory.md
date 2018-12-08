[Fluid-dom](../README.md) > ["mock-document-nodes"](../modules/_mock_document_nodes_.md) > [IElementNodeFactory](../interfaces/_mock_document_nodes_.ielementnodefactory.md)

# Interface: IElementNodeFactory

The document creation API for mock document setup. This is a substitute for not being able to load HTML.

## Hierarchy

**IElementNodeFactory**

## Implemented by

* [ElementNode](../classes/_mock_document_nodes_.elementnode.md)
* [MockDocument](../classes/_mock_document_.mockdocument.md)

## Index

### Methods

* [create_child_element](_mock_document_nodes_.ielementnodefactory.md#create_child_element)
* [create_child_text](_mock_document_nodes_.ielementnodefactory.md#create_child_text)

---

## Methods

<a id="create_child_element"></a>

###  create_child_element

▸ **create_child_element**(child_tag: *`string`*, callback?: * `undefined` &#124; `function`*): [IElementNodeFactory](_mock_document_nodes_.ielementnodefactory.md)

*Defined in [mock-document-nodes.ts:23](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| child_tag | `string` |
| `Optional` callback |  `undefined` &#124; `function`|

**Returns:** [IElementNodeFactory](_mock_document_nodes_.ielementnodefactory.md)

___
<a id="create_child_text"></a>

###  create_child_text

▸ **create_child_text**(text: *`string`*): [IElementNodeFactory](_mock_document_nodes_.ielementnodefactory.md)

*Defined in [mock-document-nodes.ts:21](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-document-nodes.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| text | `string` |

**Returns:** [IElementNodeFactory](_mock_document_nodes_.ielementnodefactory.md)

___

