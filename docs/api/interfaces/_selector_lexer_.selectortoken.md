[Fluid-dom](../README.md) > ["selector-lexer"](../modules/_selector_lexer_.md) > [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)

# Interface: SelectorToken

Represents a given selector or linked-list of selectors in the case of:

*   child selectors
*   descendent selectors (indirect children)
*   adjacent sibling combinator selectors
*   general sibling combinator selectors (indirect sibling)

## Hierarchy

**SelectorToken**

## Index

### Properties

* [_adjacent_sibling](_selector_lexer_.selectortoken.md#_adjacent_sibling)
* [_attrib](_selector_lexer_.selectortoken.md#_attrib)
* [_child](_selector_lexer_.selectortoken.md#_child)
* [_class](_selector_lexer_.selectortoken.md#_class)
* [_descendent](_selector_lexer_.selectortoken.md#_descendent)
* [_general_sibling](_selector_lexer_.selectortoken.md#_general_sibling)
* [_id](_selector_lexer_.selectortoken.md#_id)
* [_pseudo_class](_selector_lexer_.selectortoken.md#_pseudo_class)
* [_pseudo_element](_selector_lexer_.selectortoken.md#_pseudo_element)
* [_tag](_selector_lexer_.selectortoken.md#_tag)

---

## Properties

<a id="_adjacent_sibling"></a>

### `<Optional>` _adjacent_sibling

**● _adjacent_sibling**: *[SelectorToken](_selector_lexer_.selectortoken.md)*

*Defined in [selector-lexer.ts:585](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L585)*

___
<a id="_attrib"></a>

### `<Optional>` _attrib

**● _attrib**: *`Array`<[AttribInfo](_selector_lexer_.attribinfo.md)>*

*Defined in [selector-lexer.ts:582](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L582)*

___
<a id="_child"></a>

### `<Optional>` _child

**● _child**: *[SelectorToken](_selector_lexer_.selectortoken.md)*

*Defined in [selector-lexer.ts:583](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L583)*

___
<a id="_class"></a>

### `<Optional>` _class

**● _class**: * `undefined` &#124; `string`
*

*Defined in [selector-lexer.ts:580](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L580)*

___
<a id="_descendent"></a>

### `<Optional>` _descendent

**● _descendent**: *[SelectorToken](_selector_lexer_.selectortoken.md)*

*Defined in [selector-lexer.ts:584](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L584)*

___
<a id="_general_sibling"></a>

### `<Optional>` _general_sibling

**● _general_sibling**: *[SelectorToken](_selector_lexer_.selectortoken.md)*

*Defined in [selector-lexer.ts:586](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L586)*

___
<a id="_id"></a>

### `<Optional>` _id

**● _id**: * `undefined` &#124; `string`
*

*Defined in [selector-lexer.ts:581](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L581)*

___
<a id="_pseudo_class"></a>

### `<Optional>` _pseudo_class

**● _pseudo_class**: * `undefined` &#124; `string`
*

*Defined in [selector-lexer.ts:579](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L579)*

___
<a id="_pseudo_element"></a>

### `<Optional>` _pseudo_element

**● _pseudo_element**: * `undefined` &#124; `string`
*

*Defined in [selector-lexer.ts:578](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L578)*

___
<a id="_tag"></a>

### `<Optional>` _tag

**● _tag**: * `undefined` &#124; `string`
*

*Defined in [selector-lexer.ts:577](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L577)*

___

