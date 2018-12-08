[Fluid-dom](../README.md) > ["i-fluid-document"](../modules/_i_fluid_document_.md) > [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md)

# Interface: IFluidDocument

Represents the concept of a Document that can be fluidly interacted with and changed.

## Hierarchy

**IFluidDocument**

## Implemented by

* [DOM](../classes/_fluid_dom_.dom.md)
* [MockDocument](../classes/_mock_document_.mockdocument.md)

## Index

### Methods

* [buttonOn](_i_fluid_document_.ifluiddocument.md#buttonon)
* [findAll](_i_fluid_document_.ifluiddocument.md#findall)
* [findElement](_i_fluid_document_.ifluiddocument.md#findelement)

---

## Methods

<a id="buttonon"></a>

###  buttonOn

▸ **buttonOn**(eventInfo: *[EventHandlerInfo](_event_handler_info_.eventhandlerinfo.md)*): `void`

*Defined in [i-fluid-document.ts:21](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-fluid-document.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventInfo | [EventHandlerInfo](_event_handler_info_.eventhandlerinfo.md) |

**Returns:** `void`

___
<a id="findall"></a>

###  findAll

▸ **findAll**(arg: *[ElementListSource](_element_list_source_.elementlistsource.md)*): `Array`<[IElement](_i_element_.ielement.md)>

*Defined in [i-fluid-document.ts:20](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-fluid-document.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementListSource](_element_list_source_.elementlistsource.md) |

**Returns:** `Array`<[IElement](_i_element_.ielement.md)>

___
<a id="findelement"></a>

###  findElement

▸ **findElement**(arg: *[ElementSource](_element_source_.elementsource.md)*): [IElement](_i_element_.ielement.md)

*Defined in [i-fluid-document.ts:19](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/i-fluid-document.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementSource](_element_source_.elementsource.md) |

**Returns:** [IElement](_i_element_.ielement.md)

___

