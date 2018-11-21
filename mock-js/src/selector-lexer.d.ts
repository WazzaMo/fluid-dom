export declare enum Actions {
    Ignore = "IGNORE",
    ErrorBeforeSelector = "ERROR-before-selector",
    ErrorInTag = "ERROR-in-tag",
    ErrorAfterTag = "ERROR-after-tag",
    ErrorInClass = "ERROR-in-class",
    ErrorInId = "ERROR-in-ID",
    ErrorInAttribute = "ERROR-in-attrib",
    ErrorInAttribValue = "ERROR-in-attrib-value",
    ErrorUnexpectedEnd = "ERROR-unexpected-end-of-input",
    ErrorMultipleChildSeparators = "ERROR-too-many-child-separators",
    ErrorAttribBracketsNotClosed = "ERROR-attribute-bracket-missing",
    ErrorAttribValueQuoteMissing = "ERROR-attrib-value-quote-missing",
    ErrorIncompleteSelectorList = "ERROR-incomplete-selector-list",
    ClearTag = "CLEAR-TAG",
    AppendTag = "APPEND-TAG",
    SaveTag = "SAVE-TAG",
    ClearClass = "CLEAR-CLASS",
    AppendClass = "APPEND-CLASS",
    SaveClass = "SAVE-CLASS",
    ClearId = "CLEAR-ID",
    AppendId = "STORE-ID",
    SaveId = "SAVE-ID",
    ClearAttrib = "CLEAR-ATTRIB",
    AppendAttrib = "APPEND-ATTRIB",
    SaveAttrib = "SAVE-ATTRIB",
    ClearAttribValue = "CLEAR-VALUE",
    AppendAttribValue = "APPEND-VALUE",
    SaveAttribValue = "SAVE-VALUE",
    NewChild = "NEW-CHILD-SELECTOR",
    NewDescendent = "NEW-DESCENDENT-SELECTOR",
    NewSelectorInSet = "NEW-SELECTOR-IN-SET"
}
export interface AttribInfo {
    name: string;
    value?: string;
}
/**
 * Represents a given selector or linked-list of selectors
 * in the case of:
 * - child selectors
 * - descendent selectors (indirect children)
 * - adjacent sibling combinator selectors
 * - general sibling combinator selectors (indirect sibling)
 */
export interface SelectorToken {
    _tag?: string;
    _class?: string;
    _id?: string;
    _attrib?: Array<AttribInfo>;
    _child?: SelectorToken;
    _descendent?: SelectorToken;
    _adjacent_sibling?: SelectorToken;
    _general_sibling?: SelectorToken;
}
/**
 * A Lexical Analyser for CSS Selectors.
 */
export declare class SelectorLexer {
    private _selector_set;
    private _current;
    private _state;
    private _event;
    private _actions;
    private _input;
    private _actionLookup;
    readonly tokens: Array<SelectorToken>;
    constructor();
    lex_selector(selector: string, debug?: boolean): void;
    private stimulus;
    private perform_actions;
    private error;
    private current;
    private extend_selector_set;
    private general_actions;
    private tag_actions;
    private class_actions;
    private id_actions;
    private child_actions;
    private descendent_actions;
    private selector_set_actions;
    private attrib_actions;
    private attrib_value_actions;
    private setup_actions;
    private createAttrib;
    private getLastAttrib;
}
