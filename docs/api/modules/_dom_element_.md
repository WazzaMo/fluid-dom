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

*Defined in [dom-element.ts:27](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L27)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection |  `HTMLCollection` &#124; `NodeListOf`<`Element`>|  HTML collection to convert into array of IElement |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

___
<a id="getbyselector"></a>

### `<Private>` getBySelector

▸ **getBySelector**(element: * `HTMLElement` &#124; `Element`*, selector: *`string`*):  `HTMLElement` &#124; `null`

*Defined in [dom-element.ts:59](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L59)*

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

*Defined in [dom-element.ts:41](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/dom-element.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element |  `HTMLElement` &#124; `Element`|

**Returns:** `string`

___

