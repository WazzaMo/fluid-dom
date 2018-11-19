export declare enum Actions {
    Ignore = "IGNORE",
    ErrorBeforeSelector = "ERROR-before-selector",
    ErrorInTag = "ERROR-in-tag",
    ErrorAfterTag = "ERROR-after-tag",
    ErrorInClass = "ERROR-in-class",
    ErrorInId = "ERROR-in-ID",
    ErrorInAttribute = "ERROR-in-attrib",
    ErrorInAttribValue = "ERROR-in-attrib-value",
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
export interface SelectorToken {
    _tag?: string;
    _class?: string;
    _id?: string;
    _attrib?: {
        name: string;
        value?: string;
    };
    _child?: SelectorToken;
    _descendent?: SelectorToken;
}
export declare class SelectorLexer {
    private _root_token;
    private _current;
    private _state;
    private _event;
    private _actions;
    private _input;
    constructor();
    lex_selector(selector: string): void;
    private stimulus;
    private setup_actions;
}
