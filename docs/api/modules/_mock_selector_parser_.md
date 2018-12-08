[Fluid-dom](../README.md) > ["mock-selector-parser"](../modules/_mock_selector_parser_.md)

# External module: "mock-selector-parser"

## Index

### Enumerations

* [MatchResults](../enums/_mock_selector_parser_.matchresults.md)

### Classes

* [MockSelectorParser](../classes/_mock_selector_parser_.mockselectorparser.md)

### Interfaces

* [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

### Type aliases

* [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

### Functions

* [MakeParentChildFilter](_mock_selector_parser_.md#makeparentchildfilter)
* [MakeParentDescendentFilter](_mock_selector_parser_.md#makeparentdescendentfilter)
* [MakeSiblingFilter](_mock_selector_parser_.md#makesiblingfilter)
* [MakeSingleElementFilter](_mock_selector_parser_.md#makesingleelementfilter)
* [MakeSingleSelectorFilter](_mock_selector_parser_.md#makesingleselectorfilter)
* [applyToEachChildElement](_mock_selector_parser_.md#applytoeachchildelement)
* [applyToElementsInListAndCollectMatches](_mock_selector_parser_.md#applytoelementsinlistandcollectmatches)
* [exploreNodeTreeByFilterAndCollectMatches](_mock_selector_parser_.md#explorenodetreebyfilterandcollectmatches)
* [hasAdjacentSibling](_mock_selector_parser_.md#hasadjacentsibling)
* [hasAttribute](_mock_selector_parser_.md#hasattribute)
* [hasChild](_mock_selector_parser_.md#haschild)
* [hasDescendent](_mock_selector_parser_.md#hasdescendent)
* [hasGeneralSibling](_mock_selector_parser_.md#hasgeneralsibling)
* [hasId](_mock_selector_parser_.md#hasid)
* [hasTag](_mock_selector_parser_.md#hastag)
* [isAttributeMatch](_mock_selector_parser_.md#isattributematch)
* [isIdMatch](_mock_selector_parser_.md#isidmatch)
* [isSelectorMatch](_mock_selector_parser_.md#isselectormatch)
* [isTagMatch](_mock_selector_parser_.md#istagmatch)
* [isTargetToken](_mock_selector_parser_.md#istargettoken)
* [isTraversalSelector](_mock_selector_parser_.md#istraversalselector)
* [matchAdjacentSiblings](_mock_selector_parser_.md#matchadjacentsiblings)
* [matchGeneralSiblings](_mock_selector_parser_.md#matchgeneralsiblings)
* [navigateChildren](_mock_selector_parser_.md#navigatechildren)
* [navigateDescendents](_mock_selector_parser_.md#navigatedescendents)
* [navigateParentsForSiblings](_mock_selector_parser_.md#navigateparentsforsiblings)
* [recurseToChildrenAndReturnMatchList](_mock_selector_parser_.md#recursetochildrenandreturnmatchlist)
* [traverseDocumentWithPathLikeSelectorTokens](_mock_selector_parser_.md#traversedocumentwithpathlikeselectortokens)

---

## Type aliases

<a id="collectorfilter"></a>

###  CollectorFilter

**Ƭ CollectorFilter**: *`function`*

*Defined in [mock-selector-parser.ts:42](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L42)*

#### Type declaration
▸(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, root: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |
| root | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

___

## Functions

<a id="makeparentchildfilter"></a>

###  MakeParentChildFilter

▸ **MakeParentChildFilter**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

*Defined in [mock-selector-parser.ts:369](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L369)*

A CollectorFilter factory for parent->child relationship.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector to match |

**Returns:** [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

___
<a id="makeparentdescendentfilter"></a>

###  MakeParentDescendentFilter

▸ **MakeParentDescendentFilter**(token: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

*Defined in [mock-selector-parser.ts:388](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L388)*

CollectorFilter factory for handling a selector that has parent-to-child/descendent traversal required.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| token | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector token that has a \_child or \_descendent token. |

**Returns:** [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

___
<a id="makesiblingfilter"></a>

###  MakeSiblingFilter

▸ **MakeSiblingFilter**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

*Defined in [mock-selector-parser.ts:401](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L401)*

CollectorFilter factory for handling selectors with either a general sibling or adjacent sibling selection, or a selection that switches from one to the other.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  the selector with any sibling references. |

**Returns:** [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

___
<a id="makesingleelementfilter"></a>

###  MakeSingleElementFilter

▸ **MakeSingleElementFilter**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

*Defined in [mock-selector-parser.ts:413](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L413)*

CollectorFilter factory for handling a selector that does not require traversal and should be used to match the given element without looking any further. Represents a one-off match!

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector that seeks to match the given element. |

**Returns:** [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

___
<a id="makesingleselectorfilter"></a>

###  MakeSingleSelectorFilter

▸ **MakeSingleSelectorFilter**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

*Defined in [mock-selector-parser.ts:426](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L426)*

CollectorFilter factory for handling selector that does not require traversal and should be used to find one element.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector that seeks to match an element in the document tree. |

**Returns:** [CollectorFilter](_mock_selector_parser_.md#collectorfilter)

___
<a id="applytoeachchildelement"></a>

###  applyToEachChildElement

▸ **applyToEachChildElement**(parent: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, callback: *`function`*): `void`

*Defined in [mock-selector-parser.ts:193](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L193)*

Internal function that applies a callback to each child that represents an element node.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| parent | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  parent element to find element children |
| callback | `function` |  callback to apply |

**Returns:** `void`

___
<a id="applytoelementsinlistandcollectmatches"></a>

###  applyToElementsInListAndCollectMatches

▸ **applyToElementsInListAndCollectMatches**(elementList: *`Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>*, selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*, callback: *`function`*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

*Defined in [mock-selector-parser.ts:143](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L143)*

Internal to navigateDescendents(). Applies a matching callback or function to a list of candidate element nodes and collect the matches.
*__see__*: navigateDescendents

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| elementList | `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)> |  \- |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  \- |
| callback | `function` |  \- |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)
MatchOutcome with list of matching element nodes (if matched).

___
<a id="explorenodetreebyfilterandcollectmatches"></a>

###  exploreNodeTreeByFilterAndCollectMatches

▸ **exploreNodeTreeByFilterAndCollectMatches**(filter: *[CollectorFilter](_mock_selector_parser_.md#collectorfilter)*, collection: *`Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>*, root: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, current: * [ElementNode](../classes/_mock_document_nodes_.elementnode.md) &#124; `undefined`*): `void`

*Defined in [mock-selector-parser.ts:445](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L445)*

Explores the element node tree and collects matches.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [CollectorFilter](_mock_selector_parser_.md#collectorfilter) |  filter to use for match finding. |
| collection | `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)> |  list of elements to hold the matches |
| root | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  the root of the search (not necessary root of document) |
| current |  [ElementNode](../classes/_mock_document_nodes_.elementnode.md) &#124; `undefined`|  current node in a recursive call. |

**Returns:** `void`

___
<a id="hasadjacentsibling"></a>

###  hasAdjacentSibling

▸ **hasAdjacentSibling**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:55](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="hasattribute"></a>

###  hasAttribute

▸ **hasAttribute**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:47](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="haschild"></a>

###  hasChild

▸ **hasChild**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:53](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="hasdescendent"></a>

###  hasDescendent

▸ **hasDescendent**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:51](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="hasgeneralsibling"></a>

###  hasGeneralSibling

▸ **hasGeneralSibling**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:56](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="hasid"></a>

###  hasId

▸ **hasId**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:49](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="hastag"></a>

###  hasTag

▸ **hasTag**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="isattributematch"></a>

###  isAttributeMatch

▸ **isAttributeMatch**(selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `boolean`

*Defined in [mock-selector-parser.ts:115](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L115)*

Checks if element has all expected attribute properties. Must have confirmed the selector is valid before calling.
*__see__*: hasAttribute

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|  verified, valid selector token object |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  element to compare with. |

**Returns:** `boolean`

___
<a id="isidmatch"></a>

###  isIdMatch

▸ **isIdMatch**(selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `boolean`

*Defined in [mock-selector-parser.ts:79](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L79)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** `boolean`

___
<a id="isselectormatch"></a>

###  isSelectorMatch

▸ **isSelectorMatch**(selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `boolean`

*Defined in [mock-selector-parser.ts:90](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L90)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** `boolean`

___
<a id="istagmatch"></a>

###  isTagMatch

▸ **isTagMatch**(selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): `boolean`

*Defined in [mock-selector-parser.ts:75](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L75)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** `boolean`

___
<a id="istargettoken"></a>

###  isTargetToken

▸ **isTargetToken**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:58](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L58)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="istraversalselector"></a>

###  isTraversalSelector

▸ **isTraversalSelector**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `boolean`

*Defined in [mock-selector-parser.ts:63](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |

**Returns:** `boolean`

___
<a id="matchadjacentsiblings"></a>

###  matchAdjacentSiblings

▸ **matchAdjacentSiblings**(current_selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, primary: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, all_siblings: *`Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>*): `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

*Defined in [mock-selector-parser.ts:255](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L255)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| current_selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|
| primary | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |
| all_siblings | `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)> |

**Returns:** `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

___
<a id="matchgeneralsiblings"></a>

###  matchGeneralSiblings

▸ **matchGeneralSiblings**(current_selector: * [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`*, primary: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, all_siblings: *`Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>*): `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

*Defined in [mock-selector-parser.ts:283](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L283)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| current_selector |  [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) &#124; `undefined`|
| primary | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |
| all_siblings | `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)> |

**Returns:** `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

___
<a id="navigatechildren"></a>

###  navigateChildren

▸ **navigateChildren**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

*Defined in [mock-selector-parser.ts:236](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L236)*

Attempts a parent->child match and if matched at the parent level, will explore the selector path as far as it can maintain matches. Supports switching from parent->child to parent-...-> desendent as may happen but calls navigateDescendents().
*__see__*: navigateDescendents

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  top level element to match against and descend from. |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector that may have children or other traversal criteria. |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

___
<a id="navigatedescendents"></a>

###  navigateDescendents

▸ **navigateDescendents**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, token: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

*Defined in [mock-selector-parser.ts:169](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L169)*

Internal function that applies a recursive tree node exploration approach to finding descendent element nodes.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  top-level node from which to start search. |
| token | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector token to use for search. |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

___
<a id="navigateparentsforsiblings"></a>

###  navigateParentsForSiblings

▸ **navigateParentsForSiblings**(selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*, parent: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

*Defined in [mock-selector-parser.ts:311](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L311)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |
| parent | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

___
<a id="recursetochildrenandreturnmatchlist"></a>

###  recurseToChildrenAndReturnMatchList

▸ **recurseToChildrenAndReturnMatchList**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

*Defined in [mock-selector-parser.ts:210](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L210)*

Internal to navigate\_children() this takes each child of the current element and calls navigate\_children() recursively.
*__see__*: navigate\_children

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  parent that matched, children of this will be used. |
| selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  matched selector, child of this will be used. |

**Returns:** `Array`<[ElementNode](../classes/_mock_document_nodes_.elementnode.md)>

___
<a id="traversedocumentwithpathlikeselectortokens"></a>

###  traverseDocumentWithPathLikeSelectorTokens

▸ **traverseDocumentWithPathLikeSelectorTokens**(element: *[ElementNode](../classes/_mock_document_nodes_.elementnode.md)*, next_selector: *[SelectorToken](../interfaces/_selector_lexer_.selectortoken.md)*): [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

*Defined in [mock-selector-parser.ts:347](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/mock-selector-parser.ts#L347)*

Worker function that does much heavy lifting for either the parent-child filter or the parent descendent filter.
*__see__*: MakeParentChildFilter

*__see__*: MakeParentDescendentFilter

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | [ElementNode](../classes/_mock_document_nodes_.elementnode.md) |  element to consider next in document tree |
| next_selector | [SelectorToken](../interfaces/_selector_lexer_.selectortoken.md) |  selector to use for matching |

**Returns:** [MatchOutcome](../interfaces/_mock_selector_parser_.matchoutcome.md)

___

