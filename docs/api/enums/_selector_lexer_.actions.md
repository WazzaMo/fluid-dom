[Fluid-dom](../README.md) > ["selector-lexer"](../modules/_selector_lexer_.md) > [Actions](../enums/_selector_lexer_.actions.md)

# Enumeration: Actions

The types of actions that the lexer is to take to process the input characters of a selector.

## Index

### Enumeration members

* [AppendAttrib](_selector_lexer_.actions.md#appendattrib)
* [AppendAttribValue](_selector_lexer_.actions.md#appendattribvalue)
* [AppendClass](_selector_lexer_.actions.md#appendclass)
* [AppendId](_selector_lexer_.actions.md#appendid)
* [AppendPseudoClassName](_selector_lexer_.actions.md#appendpseudoclassname)
* [AppendPseudoElementName](_selector_lexer_.actions.md#appendpseudoelementname)
* [AppendTag](_selector_lexer_.actions.md#appendtag)
* [ClearAttrib](_selector_lexer_.actions.md#clearattrib)
* [ClearAttribValue](_selector_lexer_.actions.md#clearattribvalue)
* [ClearClass](_selector_lexer_.actions.md#clearclass)
* [ClearId](_selector_lexer_.actions.md#clearid)
* [ClearPseudoClassName](_selector_lexer_.actions.md#clearpseudoclassname)
* [ClearPseudoElementName](_selector_lexer_.actions.md#clearpseudoelementname)
* [ClearTag](_selector_lexer_.actions.md#cleartag)
* [ErrorAfterTag](_selector_lexer_.actions.md#erroraftertag)
* [ErrorAttribBracketsNotClosed](_selector_lexer_.actions.md#errorattribbracketsnotclosed)
* [ErrorAttribValueQuoteMissing](_selector_lexer_.actions.md#errorattribvaluequotemissing)
* [ErrorBeforeSelector](_selector_lexer_.actions.md#errorbeforeselector)
* [ErrorInAdjacentSibling](_selector_lexer_.actions.md#errorinadjacentsibling)
* [ErrorInAttribValue](_selector_lexer_.actions.md#errorinattribvalue)
* [ErrorInAttribute](_selector_lexer_.actions.md#errorinattribute)
* [ErrorInClass](_selector_lexer_.actions.md#errorinclass)
* [ErrorInGeneralSibling](_selector_lexer_.actions.md#erroringeneralsibling)
* [ErrorInId](_selector_lexer_.actions.md#errorinid)
* [ErrorInPseudoClass](_selector_lexer_.actions.md#errorinpseudoclass)
* [ErrorInPseudoElement](_selector_lexer_.actions.md#errorinpseudoelement)
* [ErrorInTag](_selector_lexer_.actions.md#errorintag)
* [ErrorIncompleteSelectorList](_selector_lexer_.actions.md#errorincompleteselectorlist)
* [ErrorMultipleChildSeparators](_selector_lexer_.actions.md#errormultiplechildseparators)
* [ErrorUnexpectedEnd](_selector_lexer_.actions.md#errorunexpectedend)
* [Ignore](_selector_lexer_.actions.md#ignore)
* [NewAdjacentSibling](_selector_lexer_.actions.md#newadjacentsibling)
* [NewChild](_selector_lexer_.actions.md#newchild)
* [NewDescendent](_selector_lexer_.actions.md#newdescendent)
* [NewGeneralSibling](_selector_lexer_.actions.md#newgeneralsibling)
* [NewSelectorInSet](_selector_lexer_.actions.md#newselectorinset)
* [SaveAttrib](_selector_lexer_.actions.md#saveattrib)
* [SaveAttribValue](_selector_lexer_.actions.md#saveattribvalue)
* [SaveClass](_selector_lexer_.actions.md#saveclass)
* [SaveId](_selector_lexer_.actions.md#saveid)
* [SavePseudoClassName](_selector_lexer_.actions.md#savepseudoclassname)
* [SavePseudoElementName](_selector_lexer_.actions.md#savepseudoelementname)
* [SaveTag](_selector_lexer_.actions.md#savetag)

---

## Enumeration members

<a id="appendattrib"></a>

###  AppendAttrib

**AppendAttrib**:  = "APPEND-ATTRIB"

*Defined in [selector-lexer.ts:84](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L84)*

___
<a id="appendattribvalue"></a>

###  AppendAttribValue

**AppendAttribValue**:  = "APPEND-VALUE"

*Defined in [selector-lexer.ts:88](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L88)*

___
<a id="appendclass"></a>

###  AppendClass

**AppendClass**:  = "APPEND-CLASS"

*Defined in [selector-lexer.ts:76](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L76)*

___
<a id="appendid"></a>

###  AppendId

**AppendId**:  = "STORE-ID"

*Defined in [selector-lexer.ts:80](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L80)*

___
<a id="appendpseudoclassname"></a>

###  AppendPseudoClassName

**AppendPseudoClassName**:  = "APPEND-PSEUDO-CLASS"

*Defined in [selector-lexer.ts:72](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L72)*

___
<a id="appendpseudoelementname"></a>

###  AppendPseudoElementName

**AppendPseudoElementName**:  = "APPEND-PSEUDO-ELEMENT"

*Defined in [selector-lexer.ts:68](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L68)*

___
<a id="appendtag"></a>

###  AppendTag

**AppendTag**:  = "APPEND-TAG"

*Defined in [selector-lexer.ts:64](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L64)*

___
<a id="clearattrib"></a>

###  ClearAttrib

**ClearAttrib**:  = "CLEAR-ATTRIB"

*Defined in [selector-lexer.ts:83](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L83)*

___
<a id="clearattribvalue"></a>

###  ClearAttribValue

**ClearAttribValue**:  = "CLEAR-VALUE"

*Defined in [selector-lexer.ts:87](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L87)*

___
<a id="clearclass"></a>

###  ClearClass

**ClearClass**:  = "CLEAR-CLASS"

*Defined in [selector-lexer.ts:75](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L75)*

___
<a id="clearid"></a>

###  ClearId

**ClearId**:  = "CLEAR-ID"

*Defined in [selector-lexer.ts:79](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L79)*

___
<a id="clearpseudoclassname"></a>

###  ClearPseudoClassName

**ClearPseudoClassName**:  = "CLEAR-PSEUDO-CLASS"

*Defined in [selector-lexer.ts:71](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L71)*

___
<a id="clearpseudoelementname"></a>

###  ClearPseudoElementName

**ClearPseudoElementName**:  = "CLEAR-PSEUDO-ELEMENT"

*Defined in [selector-lexer.ts:67](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L67)*

___
<a id="cleartag"></a>

###  ClearTag

**ClearTag**:  = "CLEAR-TAG"

*Defined in [selector-lexer.ts:63](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L63)*

___
<a id="erroraftertag"></a>

###  ErrorAfterTag

**ErrorAfterTag**:  = "ERROR-after-tag"

*Defined in [selector-lexer.ts:47](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L47)*

___
<a id="errorattribbracketsnotclosed"></a>

###  ErrorAttribBracketsNotClosed

**ErrorAttribBracketsNotClosed**:  = "ERROR-attribute-bracket-missing"

*Defined in [selector-lexer.ts:54](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L54)*

___
<a id="errorattribvaluequotemissing"></a>

###  ErrorAttribValueQuoteMissing

**ErrorAttribValueQuoteMissing**:  = "ERROR-attrib-value-quote-missing"

*Defined in [selector-lexer.ts:55](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L55)*

___
<a id="errorbeforeselector"></a>

###  ErrorBeforeSelector

**ErrorBeforeSelector**:  = "ERROR-before-selector"

*Defined in [selector-lexer.ts:45](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L45)*

___
<a id="errorinadjacentsibling"></a>

###  ErrorInAdjacentSibling

**ErrorInAdjacentSibling**:  = "ERROR-adjacent-sibling"

*Defined in [selector-lexer.ts:56](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L56)*

___
<a id="errorinattribvalue"></a>

###  ErrorInAttribValue

**ErrorInAttribValue**:  = "ERROR-in-attrib-value"

*Defined in [selector-lexer.ts:51](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L51)*

___
<a id="errorinattribute"></a>

###  ErrorInAttribute

**ErrorInAttribute**:  = "ERROR-in-attrib"

*Defined in [selector-lexer.ts:50](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L50)*

___
<a id="errorinclass"></a>

###  ErrorInClass

**ErrorInClass**:  = "ERROR-in-class"

*Defined in [selector-lexer.ts:48](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L48)*

___
<a id="erroringeneralsibling"></a>

###  ErrorInGeneralSibling

**ErrorInGeneralSibling**:  = "ERROR-general-sibling"

*Defined in [selector-lexer.ts:57](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L57)*

___
<a id="errorinid"></a>

###  ErrorInId

**ErrorInId**:  = "ERROR-in-ID"

*Defined in [selector-lexer.ts:49](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L49)*

___
<a id="errorinpseudoclass"></a>

###  ErrorInPseudoClass

**ErrorInPseudoClass**:  = "ERROR-pseudo-class"

*Defined in [selector-lexer.ts:58](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L58)*

___
<a id="errorinpseudoelement"></a>

###  ErrorInPseudoElement

**ErrorInPseudoElement**:  = "ERROR-pseudo-element"

*Defined in [selector-lexer.ts:59](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L59)*

___
<a id="errorintag"></a>

###  ErrorInTag

**ErrorInTag**:  = "ERROR-in-tag"

*Defined in [selector-lexer.ts:46](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L46)*

___
<a id="errorincompleteselectorlist"></a>

###  ErrorIncompleteSelectorList

**ErrorIncompleteSelectorList**:  = "ERROR-incomplete-selector-list"

*Defined in [selector-lexer.ts:61](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L61)*

___
<a id="errormultiplechildseparators"></a>

###  ErrorMultipleChildSeparators

**ErrorMultipleChildSeparators**:  = "ERROR-too-many-child-separators"

*Defined in [selector-lexer.ts:53](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L53)*

___
<a id="errorunexpectedend"></a>

###  ErrorUnexpectedEnd

**ErrorUnexpectedEnd**:  = "ERROR-unexpected-end-of-input"

*Defined in [selector-lexer.ts:52](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L52)*

___
<a id="ignore"></a>

###  Ignore

**Ignore**:  = "IGNORE"

*Defined in [selector-lexer.ts:44](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L44)*

___
<a id="newadjacentsibling"></a>

###  NewAdjacentSibling

**NewAdjacentSibling**:  = "NEW-ADJACENT-SIBLING"

*Defined in [selector-lexer.ts:94](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L94)*

___
<a id="newchild"></a>

###  NewChild

**NewChild**:  = "NEW-CHILD-SELECTOR"

*Defined in [selector-lexer.ts:91](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L91)*

___
<a id="newdescendent"></a>

###  NewDescendent

**NewDescendent**:  = "NEW-DESCENDENT-SELECTOR"

*Defined in [selector-lexer.ts:92](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L92)*

___
<a id="newgeneralsibling"></a>

###  NewGeneralSibling

**NewGeneralSibling**:  = "NEW-GENERAL-SIBLING"

*Defined in [selector-lexer.ts:95](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L95)*

___
<a id="newselectorinset"></a>

###  NewSelectorInSet

**NewSelectorInSet**:  = "NEW-SELECTOR-IN-SET"

*Defined in [selector-lexer.ts:93](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L93)*

___
<a id="saveattrib"></a>

###  SaveAttrib

**SaveAttrib**:  = "SAVE-ATTRIB"

*Defined in [selector-lexer.ts:85](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L85)*

___
<a id="saveattribvalue"></a>

###  SaveAttribValue

**SaveAttribValue**:  = "SAVE-VALUE"

*Defined in [selector-lexer.ts:89](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L89)*

___
<a id="saveclass"></a>

###  SaveClass

**SaveClass**:  = "SAVE-CLASS"

*Defined in [selector-lexer.ts:77](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L77)*

___
<a id="saveid"></a>

###  SaveId

**SaveId**:  = "SAVE-ID"

*Defined in [selector-lexer.ts:81](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L81)*

___
<a id="savepseudoclassname"></a>

###  SavePseudoClassName

**SavePseudoClassName**:  = "SAVE-PSEUDO-CLASS"

*Defined in [selector-lexer.ts:73](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L73)*

___
<a id="savepseudoelementname"></a>

###  SavePseudoElementName

**SavePseudoElementName**:  = "SAVE-PSEUDO-ELEMENT"

*Defined in [selector-lexer.ts:69](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L69)*

___
<a id="savetag"></a>

###  SaveTag

**SaveTag**:  = "SAVE-TAG"

*Defined in [selector-lexer.ts:65](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/selector-lexer.ts#L65)*

___

