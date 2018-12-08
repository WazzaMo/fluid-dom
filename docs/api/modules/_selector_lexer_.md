[Fluid-dom](../README.md) > ["selector-lexer"](../modules/_selector_lexer_.md)

# External module: "selector-lexer"

## Index

### Enumerations

* [Actions](../enums/_selector_lexer_.actions.md)
* [Events](../enums/_selector_lexer_.events.md)
* [States](../enums/_selector_lexer_.states.md)

### Classes

* [SelectorLexer](../classes/_selector_lexer_.selectorlexer.md)

### Interfaces

* [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)
* [EventLookup](../interfaces/_selector_lexer_.eventlookup.md)
* [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)
* [StateLookup](../interfaces/_selector_lexer_.statelookup.md)

### Variables

* [ActionTable](_selector_lexer_.md#actiontable)
* [TransitionTable](_selector_lexer_.md#transitiontable)

### Functions

* [attribToString](_selector_lexer_.md#attribtostring)
* [event](_selector_lexer_.md#event)
* [isAlpha](_selector_lexer_.md#isalpha)
* [isLabelContinuer](_selector_lexer_.md#islabelcontinuer)
* [isLabelLead](_selector_lexer_.md#islabellead)
* [isNumeric](_selector_lexer_.md#isnumeric)
* [isString](_selector_lexer_.md#isstring)
* [selectorTokentoString](_selector_lexer_.md#selectortokentostring)
* [setup_tables](_selector_lexer_.md#setup_tables)

---

## Variables

<a id="actiontable"></a>

### `<Const>` ActionTable

**● ActionTable**: *[StateLookup](../interfaces/_selector_lexer_.statelookup.md)<[EventLookup](../interfaces/_selector_lexer_.eventlookup.md)<`Array`<`string`>>>*

*Defined in [selector-lexer.ts:157](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L157)*

Global State to Action Lookup Table.

___
<a id="transitiontable"></a>

### `<Const>` TransitionTable

**● TransitionTable**: *[StateLookup](../interfaces/_selector_lexer_.statelookup.md)<[EventLookup](../interfaces/_selector_lexer_.eventlookup.md)<`number`>>*

*Defined in [selector-lexer.ts:153](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L153)*

Global State Transition Lookup Table.

___

## Functions

<a id="attribtostring"></a>

###  attribToString

▸ **attribToString**(a: *[AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)*): `string`

*Defined in [selector-lexer.ts:563](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L563)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| a | [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md) |

**Returns:** `string`

___
<a id="event"></a>

###  event

▸ **event**(_char: *`string`*): `number`

*Defined in [selector-lexer.ts:520](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L520)*

Classify the character from a selector as some type of state machine event.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _char | `string` |  character to classify. |

**Returns:** `number`

___
<a id="isalpha"></a>

###  isAlpha

▸ **isAlpha**(_char: *`string`*): `boolean`

*Defined in [selector-lexer.ts:487](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L487)*

Is the character an uppercase or lowercase, English character?

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _char | `string` |  character to check. |

**Returns:** `boolean`

___
<a id="islabelcontinuer"></a>

###  isLabelContinuer

▸ **isLabelContinuer**(_char: *`string`*): `boolean`

*Defined in [selector-lexer.ts:511](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L511)*

Is the character valid in a label after the first?

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _char | `string` |  character to check. |

**Returns:** `boolean`

___
<a id="islabellead"></a>

###  isLabelLead

▸ **isLabelLead**(_char: *`string`*): `boolean`

*Defined in [selector-lexer.ts:495](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L495)*

Is the character valid for the lead character of a label?

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _char | `string` |  character to check. |

**Returns:** `boolean`

___
<a id="isnumeric"></a>

###  isNumeric

▸ **isNumeric**(_char: *`string`*): `boolean`

*Defined in [selector-lexer.ts:503](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L503)*

Is the character numeric?

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _char | `string` |  character to check. |

**Returns:** `boolean`

___
<a id="isstring"></a>

###  isString

▸ **isString**(s: *`any`*): `boolean`

*Defined in [selector-lexer.ts:163](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L163)*

Helper function to determine if an object is a string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| s | `any` |  a candidate string object. |

**Returns:** `boolean`

___
<a id="selectortokentostring"></a>

###  selectorTokentoString

▸ **selectorTokentoString**(token: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `string`

*Defined in [selector-lexer.ts:589](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L589)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `string`

___
<a id="setup_tables"></a>

###  setup_tables

▸ **setup_tables**(): `void`

*Defined in [selector-lexer.ts:173](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L173)*

Sets up the global state machine tables with the right state transition and state-event-action mappings and makes it relatively easy to extend the state machine. Has internal functions that are not to be used in any other context.

**Returns:** `void`

___

