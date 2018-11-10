[Fluid-dom](../README.md) > ["dom-element"](../modules/_dom_element_.md)

# External module: "dom-element"

## Index

### Classes

* [DomElement](../classes/_dom_element_.domelement.md)

### Functions

* [convertHtmlCollection](_dom_element_.md#converthtmlcollection)
* [getBySelector](_dom_element_.md#getbyselector)
* [selectorPath](_dom_element_.md#selectorpath)

---

## Functions

<a id="converthtmlcollection"></a>

### `<Private>` convertHtmlCollection

▸ **convertHtmlCollection**(collection: * `HTMLCollection` &#124; `NodeListOf`<`Element`>*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Defined in [dom-element.ts:25](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-element.ts#L25)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection |  `HTMLCollection` &#124; `NodeListOf`<`Element`>|  HTML collection to convert into array of IElement |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

___
<a id="getbyselector"></a>

### `<Private>` getBySelector

▸ **getBySelector**(element: * `HTMLElement` &#124; `Element`*, selector: *`string`*):  `HTMLElement` &#124; `null`

*Defined in [dom-element.ts:57](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-element.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element |  `HTMLElement` &#124; `Element`|
| selector | `string` |

**Returns:**  `HTMLElement` &#124; `null`

___
<a id="selectorpath"></a>

### `<Private>` selectorPath

▸ **selectorPath**(element: * `HTMLElement` &#124; `Element`*): `string`

*Defined in [dom-element.ts:39](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/dom-element.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element |  `HTMLElement` &#124; `Element`|

**Returns:** `string`

___

