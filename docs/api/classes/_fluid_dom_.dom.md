[Fluid-dom](../README.md) > ["fluid-dom"](../modules/_fluid_dom_.md) > [DOM](../classes/_fluid_dom_.dom.md)

# Class: DOM

## Hierarchy

**DOM**

## Implements

* [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md)

## Index

### Constructors

* [constructor](_fluid_dom_.dom.md#constructor)

### Methods

* [buttonOn](_fluid_dom_.dom.md#buttonon)
* [findAll](_fluid_dom_.dom.md#findall)
* [findElement](_fluid_dom_.dom.md#findelement)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DOM**(): [DOM](_fluid_dom_.dom.md)

*Defined in [fluid-dom.ts:32](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/fluid-dom.ts#L32)*

**Returns:** [DOM](_fluid_dom_.dom.md)

___

## Methods

<a id="buttonon"></a>

###  buttonOn

▸ **buttonOn**(eventInfo: *[EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md)*): `void`

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[buttonOn](../interfaces/_i_fluid_document_.ifluiddocument.md#buttonon)*

*Defined in [fluid-dom.ts:69](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/fluid-dom.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventInfo | [EventHandlerInfo](../interfaces/_event_handler_info_.eventhandlerinfo.md) |

**Returns:** `void`

___
<a id="findall"></a>

###  findAll

▸ **findAll**(arg: *[ElementListSource](../interfaces/_element_list_source_.elementlistsource.md)*): `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[findAll](../interfaces/_i_fluid_document_.ifluiddocument.md#findall)*

*Defined in [fluid-dom.ts:50](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/fluid-dom.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementListSource](../interfaces/_element_list_source_.elementlistsource.md) |

**Returns:** `Array`<[IElement](../interfaces/_i_element_.ielement.md)>

___
<a id="findelement"></a>

###  findElement

▸ **findElement**(arg: *[ElementSource](../interfaces/_element_source_.elementsource.md)*): [IElement](../interfaces/_i_element_.ielement.md)

*Implementation of [IFluidDocument](../interfaces/_i_fluid_document_.ifluiddocument.md).[findElement](../interfaces/_i_fluid_document_.ifluiddocument.md#findelement)*

*Defined in [fluid-dom.ts:37](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/fluid-dom.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [ElementSource](../interfaces/_element_source_.elementsource.md) |

**Returns:** [IElement](../interfaces/_i_element_.ielement.md)

___

