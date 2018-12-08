[Fluid-dom](../README.md) > ["later-or-now"](../modules/_later_or_now_.md) > [LaterPromise](../classes/_later_or_now_.laterpromise.md)

# Class: LaterPromise

## Type parameters
#### Tnow 
#### Tlater 
## Hierarchy

**LaterPromise**

## Index

### Constructors

* [constructor](_later_or_now_.laterpromise.md#constructor)

### Properties

* [later](_later_or_now_.laterpromise.md#later)

### Methods

* [emerges](_later_or_now_.laterpromise.md#emerges)
* [whenFails](_later_or_now_.laterpromise.md#whenfails)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LaterPromise**(_later: *[LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>*): [LaterPromise](_later_or_now_.laterpromise.md)

*Defined in [later-or-now.ts:3](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/later-or-now.ts#L3)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _later | [LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`> |

**Returns:** [LaterPromise](_later_or_now_.laterpromise.md)

___

## Properties

<a id="later"></a>

###  later

**● later**: *[LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>*

*Defined in [later-or-now.ts:3](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/later-or-now.ts#L3)*

___

## Methods

<a id="emerges"></a>

###  emerges

▸ **emerges**(action: *`function`*): [LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>

*Defined in [later-or-now.ts:9](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/later-or-now.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `function` |

**Returns:** [LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>

___
<a id="whenfails"></a>

###  whenFails

▸ **whenFails**(errAction: *`function`*): [LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>

*Defined in [later-or-now.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/later-or-now.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| errAction | `function` |

**Returns:** [LaterOrNow](_later_or_now_.laterornow.md)<`Tnow`, `Tlater`>

___

