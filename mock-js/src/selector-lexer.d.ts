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
    NewDescendent = "NEW-DESCENDENT-SELECTOR"
}
export interface AttribInfo {
    name: string;
    value?: string;
}
export interface SelectorToken {
    _tag?: string;
    _class?: string;
    _id?: string;
    _attrib?: Array<AttribInfo>;
    _child?: SelectorToken;
    _descendent?: SelectorToken;
}
export declare function has_tag(token: SelectorToken): boolean;
export declare function with_tag(token: SelectorToken, callback: (tag: string) => void): void;
export declare function has_class(token: SelectorToken): boolean;
export declare function with_class(token: SelectorToken, callback: (_class: string) => void): void;
export declare function has_id(token: SelectorToken): boolean;
export declare function with_id(token: SelectorToken, callback: (id: string) => void): void;
export declare class SelectorLexer {
    private _root_token;
    private _current;
    private _state;
    private _event;
    private _actions;
    private _input;
    private _actionLookup;
    readonly tokens: SelectorToken;
    constructor();
    lex_selector(selector: string, debug?: boolean): void;
    private stimulus;
    private perform_actions;
    private error;
    private general_actions;
    private tag_actions;
    private class_actions;
    private id_actions;
    private child_actions;
    private descendent_actions;
    private attrib_actions;
    private attrib_value_actions;
    private setup_actions;
    private createAttrib;
    private getLastAttrib;
}
