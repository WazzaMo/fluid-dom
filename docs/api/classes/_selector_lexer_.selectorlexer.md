[Fluid-dom](../README.md) > ["selector-lexer"](../modules/_selector_lexer_.md) > [SelectorLexer](../classes/_selector_lexer_.selectorlexer.md)

# Class: SelectorLexer

A Lexical Analyser for CSS Selectors.

## Hierarchy

**SelectorLexer**

## Index

### Constructors

* [constructor](_selector_lexer_.selectorlexer.md#constructor)

### Properties

* [_actionLookup](_selector_lexer_.selectorlexer.md#_actionlookup)
* [_actions](_selector_lexer_.selectorlexer.md#_actions)
* [_current](_selector_lexer_.selectorlexer.md#_current)
* [_event](_selector_lexer_.selectorlexer.md#_event)
* [_input](_selector_lexer_.selectorlexer.md#_input)
* [_selector_set](_selector_lexer_.selectorlexer.md#_selector_set)
* [_state](_selector_lexer_.selectorlexer.md#_state)

### Accessors

* [tokens](_selector_lexer_.selectorlexer.md#tokens)

### Methods

* [adjacent_sibling_actions](_selector_lexer_.selectorlexer.md#adjacent_sibling_actions)
* [appendPseudoClass](_selector_lexer_.selectorlexer.md#appendpseudoclass)
* [appendPseudoElement](_selector_lexer_.selectorlexer.md#appendpseudoelement)
* [attrib_actions](_selector_lexer_.selectorlexer.md#attrib_actions)
* [attrib_value_actions](_selector_lexer_.selectorlexer.md#attrib_value_actions)
* [child_actions](_selector_lexer_.selectorlexer.md#child_actions)
* [class_actions](_selector_lexer_.selectorlexer.md#class_actions)
* [clearPseudoClass](_selector_lexer_.selectorlexer.md#clearpseudoclass)
* [clearPseudoElement](_selector_lexer_.selectorlexer.md#clearpseudoelement)
* [createAttrib](_selector_lexer_.selectorlexer.md#createattrib)
* [current](_selector_lexer_.selectorlexer.md#current)
* [descendent_actions](_selector_lexer_.selectorlexer.md#descendent_actions)
* [error](_selector_lexer_.selectorlexer.md#error)
* [extend_selector_set](_selector_lexer_.selectorlexer.md#extend_selector_set)
* [general_actions](_selector_lexer_.selectorlexer.md#general_actions)
* [general_sibling_actions](_selector_lexer_.selectorlexer.md#general_sibling_actions)
* [getLastAttrib](_selector_lexer_.selectorlexer.md#getlastattrib)
* [id_actions](_selector_lexer_.selectorlexer.md#id_actions)
* [lex_selector](_selector_lexer_.selectorlexer.md#lex_selector)
* [make_adjacent_sibling](_selector_lexer_.selectorlexer.md#make_adjacent_sibling)
* [make_general_sibling](_selector_lexer_.selectorlexer.md#make_general_sibling)
* [perform_actions](_selector_lexer_.selectorlexer.md#perform_actions)
* [pseudo_class_actions](_selector_lexer_.selectorlexer.md#pseudo_class_actions)
* [pseudo_element_actions](_selector_lexer_.selectorlexer.md#pseudo_element_actions)
* [savePseudoClass](_selector_lexer_.selectorlexer.md#savepseudoclass)
* [savePseudoElement](_selector_lexer_.selectorlexer.md#savepseudoelement)
* [selector_set_actions](_selector_lexer_.selectorlexer.md#selector_set_actions)
* [setup_actions](_selector_lexer_.selectorlexer.md#setup_actions)
* [stimulus](_selector_lexer_.selectorlexer.md#stimulus)
* [tag_actions](_selector_lexer_.selectorlexer.md#tag_actions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SelectorLexer**(): [SelectorLexer](_selector_lexer_.selectorlexer.md)

*Defined in [selector-lexer.ts:621](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L621)*

**Returns:** [SelectorLexer](_selector_lexer_.selectorlexer.md)

___

## Properties

<a id="_actionlookup"></a>

### `<Private>` _actionLookup

**● _actionLookup**: *`object`*

*Defined in [selector-lexer.ts:617](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L617)*

#### Type declaration

[action: `string`]: `function`

▸(): `void`

**Returns:** `void`

___
<a id="_actions"></a>

### `<Private>` _actions

**● _actions**: *`Array`<`string`>*

*Defined in [selector-lexer.ts:615](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L615)*

___
<a id="_current"></a>

### `<Private>` _current

**● _current**: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*

*Defined in [selector-lexer.ts:612](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L612)*

___
<a id="_event"></a>

### `<Private>` _event

**● _event**: *`number`*

*Defined in [selector-lexer.ts:614](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L614)*

___
<a id="_input"></a>

### `<Private>` _input

**● _input**: *`string`*

*Defined in [selector-lexer.ts:616](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L616)*

___
<a id="_selector_set"></a>

### `<Private>` _selector_set

**● _selector_set**: *`Array`<[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)>*

*Defined in [selector-lexer.ts:611](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L611)*

___
<a id="_state"></a>

### `<Private>` _state

**● _state**: *`number`*

*Defined in [selector-lexer.ts:613](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L613)*

___

## Accessors

<a id="tokens"></a>

###  tokens

gettokens(): `Array`<[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)>

*Defined in [selector-lexer.ts:621](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L621)*

**Returns:** `Array`<[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)>

___

## Methods

<a id="adjacent_sibling_actions"></a>

### `<Private>` adjacent_sibling_actions

▸ **adjacent_sibling_actions**(): `void`

*Defined in [selector-lexer.ts:776](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L776)*

**Returns:** `void`

___
<a id="appendpseudoclass"></a>

### `<Private>` appendPseudoClass

▸ **appendPseudoClass**(): `void`

*Defined in [selector-lexer.ts:853](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L853)*

**Returns:** `void`

___
<a id="appendpseudoelement"></a>

### `<Private>` appendPseudoElement

▸ **appendPseudoElement**(): `void`

*Defined in [selector-lexer.ts:843](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L843)*

**Returns:** `void`

___
<a id="attrib_actions"></a>

### `<Private>` attrib_actions

▸ **attrib_actions**(): `void`

*Defined in [selector-lexer.ts:750](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L750)*

**Returns:** `void`

___
<a id="attrib_value_actions"></a>

### `<Private>` attrib_value_actions

▸ **attrib_value_actions**(): `void`

*Defined in [selector-lexer.ts:762](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L762)*

**Returns:** `void`

___
<a id="child_actions"></a>

### `<Private>` child_actions

▸ **child_actions**(): `void`

*Defined in [selector-lexer.ts:729](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L729)*

**Returns:** `void`

___
<a id="class_actions"></a>

### `<Private>` class_actions

▸ **class_actions**(): `void`

*Defined in [selector-lexer.ts:715](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L715)*

**Returns:** `void`

___
<a id="clearpseudoclass"></a>

### `<Private>` clearPseudoClass

▸ **clearPseudoClass**(): `void`

*Defined in [selector-lexer.ts:849](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L849)*

**Returns:** `void`

___
<a id="clearpseudoelement"></a>

### `<Private>` clearPseudoElement

▸ **clearPseudoElement**(): `void`

*Defined in [selector-lexer.ts:839](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L839)*

**Returns:** `void`

___
<a id="createattrib"></a>

### `<Private>` createAttrib

▸ **createAttrib**(): [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)

*Defined in [selector-lexer.ts:816](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L816)*

**Returns:** [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)

___
<a id="current"></a>

### `<Private>` current

▸ **current**(new_token?: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)

*Defined in [selector-lexer.ts:673](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L673)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` new_token | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)

___
<a id="descendent_actions"></a>

### `<Private>` descendent_actions

▸ **descendent_actions**(): `void`

*Defined in [selector-lexer.ts:737](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L737)*

**Returns:** `void`

___
<a id="error"></a>

### `<Private>` error

▸ **error**(message: *`string`*): `void`

*Defined in [selector-lexer.ts:669](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L669)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |

**Returns:** `void`

___
<a id="extend_selector_set"></a>

### `<Private>` extend_selector_set

▸ **extend_selector_set**(): `void`

*Defined in [selector-lexer.ts:680](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L680)*

**Returns:** `void`

___
<a id="general_actions"></a>

### `<Private>` general_actions

▸ **general_actions**(): `void`

*Defined in [selector-lexer.ts:698](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L698)*

**Returns:** `void`

___
<a id="general_sibling_actions"></a>

### `<Private>` general_sibling_actions

▸ **general_sibling_actions**(): `void`

*Defined in [selector-lexer.ts:781](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L781)*

**Returns:** `void`

___
<a id="getlastattrib"></a>

### `<Private>` getLastAttrib

▸ **getLastAttrib**(): [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)

*Defined in [selector-lexer.ts:828](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L828)*

**Returns:** [AttribInfo](../interfaces/_selector_lexer_.attribinfo.md)

___
<a id="id_actions"></a>

### `<Private>` id_actions

▸ **id_actions**(): `void`

*Defined in [selector-lexer.ts:722](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L722)*

**Returns:** `void`

___
<a id="lex_selector"></a>

###  lex_selector

▸ **lex_selector**(selector: *`string`*, debug?: *`boolean`*): `void`

*Defined in [selector-lexer.ts:634](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L634)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| selector | `string` | - |
| `Default value` debug | `boolean` | false |

**Returns:** `void`

___
<a id="make_adjacent_sibling"></a>

### `<Private>` make_adjacent_sibling

▸ **make_adjacent_sibling**(): `void`

*Defined in [selector-lexer.ts:686](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L686)*

**Returns:** `void`

___
<a id="make_general_sibling"></a>

### `<Private>` make_general_sibling

▸ **make_general_sibling**(): `void`

*Defined in [selector-lexer.ts:692](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L692)*

**Returns:** `void`

___
<a id="perform_actions"></a>

### `<Private>` perform_actions

▸ **perform_actions**(): `void`

*Defined in [selector-lexer.ts:655](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L655)*

**Returns:** `void`

___
<a id="pseudo_class_actions"></a>

### `<Private>` pseudo_class_actions

▸ **pseudo_class_actions**(): `void`

*Defined in [selector-lexer.ts:793](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L793)*

**Returns:** `void`

___
<a id="pseudo_element_actions"></a>

### `<Private>` pseudo_element_actions

▸ **pseudo_element_actions**(): `void`

*Defined in [selector-lexer.ts:786](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L786)*

**Returns:** `void`

___
<a id="savepseudoclass"></a>

### `<Private>` savePseudoClass

▸ **savePseudoClass**(): `void`

*Defined in [selector-lexer.ts:857](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L857)*

**Returns:** `void`

___
<a id="savepseudoelement"></a>

### `<Private>` savePseudoElement

▸ **savePseudoElement**(): `void`

*Defined in [selector-lexer.ts:847](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L847)*

**Returns:** `void`

___
<a id="selector_set_actions"></a>

### `<Private>` selector_set_actions

▸ **selector_set_actions**(): `void`

*Defined in [selector-lexer.ts:745](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L745)*

**Returns:** `void`

___
<a id="setup_actions"></a>

### `<Private>` setup_actions

▸ **setup_actions**(): `void`

*Defined in [selector-lexer.ts:800](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L800)*

**Returns:** `void`

___
<a id="stimulus"></a>

### `<Private>` stimulus

▸ **stimulus**(debug: *`boolean`*): `void`

*Defined in [selector-lexer.ts:645](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L645)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| debug | `boolean` |

**Returns:** `void`

___
<a id="tag_actions"></a>

### `<Private>` tag_actions

▸ **tag_actions**(): `void`

*Defined in [selector-lexer.ts:704](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L704)*

**Returns:** `void`

___

