[Fluid-dom](../README.md) > ["later-or-now"](../modules/_later_or_now_.md) > [LaterOrNow](../classes/_later_or_now_.laterornow.md)

# Class: LaterOrNow

## Type parameters
#### Tnow 
#### Tlater 
## Hierarchy

**LaterOrNow**

## Index

### Constructors

* [constructor](_later_or_now_.laterornow.md#constructor)

### Properties

* [immediateValue](_later_or_now_.laterornow.md#immediatevalue)
* [promise](_later_or_now_.laterornow.md#promise)

### Methods

* [later](_later_or_now_.laterornow.md#later)
* [now](_later_or_now_.laterornow.md#now)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LaterOrNow**(now: *`Tnow`*, thePromise: *`Promise`<`Tlater`>*): [LaterOrNow](_later_or_now_.laterornow.md)

*Defined in [later-or-now.ts:28](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/later-or-now.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| now | `Tnow` |
| thePromise | `Promise`<`Tlater`> |

**Returns:** [LaterOrNow](_later_or_now_.laterornow.md)

___

## Properties

<a id="immediatevalue"></a>

###  immediateValue

**● immediateValue**: *`Tnow`*

*Defined in [later-or-now.ts:27](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/later-or-now.ts#L27)*

___
<a id="promise"></a>

###  promise

**● promise**: *`Promise`<`Tlater`>*

*Defined in [later-or-now.ts:28](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/later-or-now.ts#L28)*

___

## Methods

<a id="later"></a>

###  later

▸ **later**(): [LaterPromise](_later_or_now_.laterpromise.md)<`Tnow`, `Tlater`>

*Defined in [later-or-now.ts:35](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/later-or-now.ts#L35)*

**Returns:** [LaterPromise](_later_or_now_.laterpromise.md)<`Tnow`, `Tlater`>

___
<a id="now"></a>

###  now

▸ **now**(): `Tnow`

*Defined in [later-or-now.ts:39](https://github.com/WazzaMo/fluid-dom/blob/0ae4ee4/src/later-or-now.ts#L39)*

**Returns:** `Tnow`

___

