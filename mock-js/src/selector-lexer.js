/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */
// selector ::= (advanced_selector ',' )* advanced_selector
// advanced_selector ::= path_selector | composite_selector
// simple_selector ::= #ID | .CLASS | TAG_NAME
// name_selector ::= TAG QUALIFIER ATTRIBSET
// attribset ::= '[' LABEL ']' ATTRIBSET
// =' '"' VALUE'"'
// qualifier ::= (CLASS | ID ) QUALIFIER
//           ::= NONE
// class ::= '.' LABEL
// id ::= '#' LABEL
// tag ::= LABEL
var Events;
(function (Events) {
    Events[Events["LeadLabelChar"] = 0] = "LeadLabelChar";
    Events[Events["LabelChar"] = 1] = "LabelChar";
    Events[Events["ChildSeparator"] = 2] = "ChildSeparator";
    Events[Events["DescendentSeparator"] = 3] = "DescendentSeparator";
    Events[Events["ClassPrefix"] = 4] = "ClassPrefix";
    Events[Events["IdPrefix"] = 5] = "IdPrefix";
    Events[Events["LeftSqBracket"] = 6] = "LeftSqBracket";
    Events[Events["RightSqBracket"] = 7] = "RightSqBracket";
    Events[Events["EqualSign"] = 8] = "EqualSign";
    Events[Events["Quote"] = 9] = "Quote";
    Events[Events["EndInput"] = 10] = "EndInput";
    Events[Events["Illegal"] = 11] = "Illegal";
    Events[Events["LAST_EVENT"] = 12] = "LAST_EVENT";
})(Events || (Events = {}));
export var Actions;
(function (Actions) {
    Actions["Ignore"] = "IGNORE";
    Actions["ErrorBeforeSelector"] = "ERROR-before-selector";
    Actions["ErrorInTag"] = "ERROR-in-tag";
    Actions["ErrorAfterTag"] = "ERROR-after-tag";
    Actions["ErrorInClass"] = "ERROR-in-class";
    Actions["ErrorInId"] = "ERROR-in-ID";
    Actions["ErrorInAttribute"] = "ERROR-in-attrib";
    Actions["ErrorInAttribValue"] = "ERROR-in-attrib-value";
    Actions["ErrorUnexpectedEnd"] = "ERROR-unexpected-end-of-input";
    Actions["ErrorMultipleChildSeparators"] = "ERROR-too-many-child-separators";
    Actions["ErrorAttribBracketsNotClosed"] = "ERROR-attribute-bracket-missing";
    Actions["ErrorAttribValueQuoteMissing"] = "ERROR-attrib-value-quote-missing";
    Actions["ClearTag"] = "CLEAR-TAG";
    Actions["AppendTag"] = "APPEND-TAG";
    Actions["SaveTag"] = "SAVE-TAG";
    Actions["ClearClass"] = "CLEAR-CLASS";
    Actions["AppendClass"] = "APPEND-CLASS";
    Actions["SaveClass"] = "SAVE-CLASS";
    Actions["ClearId"] = "CLEAR-ID";
    Actions["AppendId"] = "STORE-ID";
    Actions["SaveId"] = "SAVE-ID";
    Actions["ClearAttrib"] = "CLEAR-ATTRIB";
    Actions["AppendAttrib"] = "APPEND-ATTRIB";
    Actions["SaveAttrib"] = "SAVE-ATTRIB";
    Actions["ClearAttribValue"] = "CLEAR-VALUE";
    Actions["AppendAttribValue"] = "APPEND-VALUE";
    Actions["SaveAttribValue"] = "SAVE-VALUE";
    Actions["NewChild"] = "NEW-CHILD-SELECTOR";
    Actions["NewDescendent"] = "NEW-DESCENDENT-SELECTOR";
})(Actions || (Actions = {}));
var States;
(function (States) {
    States[States["StartAwaitSelector"] = 0] = "StartAwaitSelector";
    States[States["GettingTag"] = 1] = "GettingTag";
    States[States["GettingClass"] = 2] = "GettingClass";
    States[States["GettingId"] = 3] = "GettingId";
    States[States["AwaitDescendentSelector"] = 4] = "AwaitDescendentSelector";
    States[States["AwaitChildSelector"] = 5] = "AwaitChildSelector";
    States[States["AwaitAttribName"] = 6] = "AwaitAttribName";
    States[States["GettingAttribName"] = 7] = "GettingAttribName";
    States[States["AwaitEqualSignOrEnd"] = 8] = "AwaitEqualSignOrEnd";
    States[States["AwaitAttribValueStartQuote"] = 9] = "AwaitAttribValueStartQuote";
    States[States["GettingAttribValue"] = 10] = "GettingAttribValue";
    States[States["AttribValueEndQuote"] = 11] = "AttribValueEndQuote";
    States[States["AwaitAttribEnd"] = 12] = "AwaitAttribEnd";
    States[States["AwaitExtraAttribStart"] = 13] = "AwaitExtraAttribStart";
    States[States["LAST_STATE"] = 14] = "LAST_STATE";
})(States || (States = {}));
const TransitionTable = {};
const ActionTable = {};
function isString(s) {
    return typeof s === "string";
}
function setup_tables() {
    function initState() {
        return {};
    }
    function initTable(table) {
        for (var stateNum = 0; stateNum < States.LAST_STATE; stateNum++) {
            table[stateNum] = initState();
        }
    }
    function at_on(state, event, next, action) {
        TransitionTable[state][event] = next;
        if (isString(action)) {
            ActionTable[state][event] = [action];
        }
        else {
            ActionTable[state][event] = action;
        }
    }
    function default_for(state, next, action) {
        for (var event = Events.LeadLabelChar; event < Events.LAST_EVENT; event++) {
            at_on(state, event, next, action);
        }
    }
    function _start() {
        let start = States.StartAwaitSelector;
        default_for(start, start, Actions.ErrorBeforeSelector);
        at_on(start, Events.LeadLabelChar, States.GettingTag, [Actions.ClearTag, Actions.AppendTag]);
        at_on(start, Events.ClassPrefix, States.GettingClass, Actions.ClearClass);
        at_on(start, Events.IdPrefix, States.GettingId, Actions.ClearId);
        at_on(start, Events.DescendentSeparator, start, Actions.Ignore);
        at_on(start, Events.LeftSqBracket, States.AwaitAttribName, Actions.Ignore);
    }
    function _tag() {
        let tag = States.GettingTag;
        default_for(tag, tag, Actions.ErrorInTag);
        at_on(tag, Events.LabelChar, tag, Actions.AppendTag);
        at_on(tag, Events.LeadLabelChar, tag, Actions.AppendTag);
        at_on(tag, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveTag);
        at_on(tag, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveTag);
        at_on(tag, Events.ClassPrefix, States.GettingClass, [Actions.SaveTag, Actions.ClearClass]);
        at_on(tag, Events.IdPrefix, States.GettingId, [Actions.SaveTag, Actions.ClearId]);
        at_on(tag, Events.LeftSqBracket, States.GettingAttribName, Actions.SaveTag);
        at_on(tag, Events.EndInput, tag, Actions.SaveTag);
    }
    function _id() {
        let id = States.GettingId;
        default_for(id, id, Actions.ErrorInId);
        at_on(id, Events.LabelChar, id, Actions.AppendId);
        at_on(id, Events.LeadLabelChar, id, Actions.AppendId);
        at_on(id, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveId);
        at_on(id, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveId);
        at_on(id, Events.ClassPrefix, States.GettingClass, [Actions.SaveId, Actions.ClearClass]);
        at_on(id, Events.LeftSqBracket, States.GettingAttribName, Actions.SaveId);
        at_on(id, Events.EndInput, id, Actions.SaveId);
    }
    function _class() {
        let classState = States.GettingClass;
        default_for(classState, classState, Actions.ErrorInClass);
        at_on(classState, Events.LabelChar, classState, Actions.AppendClass);
        at_on(classState, Events.LeadLabelChar, classState, Actions.AppendClass);
        at_on(classState, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveClass);
        at_on(classState, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveClass);
        at_on(classState, Events.IdPrefix, States.GettingId, [Actions.SaveClass, Actions.ClearId]);
        at_on(classState, Events.LeftSqBracket, States.GettingAttribName, Actions.SaveClass);
        at_on(classState, Events.EndInput, classState, Actions.SaveClass);
    }
    function _descendent() {
        let descend = States.AwaitDescendentSelector;
        default_for(descend, descend, Actions.ErrorBeforeSelector);
        at_on(descend, Events.DescendentSeparator, descend, Actions.Ignore);
        at_on(descend, Events.ChildSeparator, States.AwaitChildSelector, Actions.Ignore);
        at_on(descend, Events.LeadLabelChar, States.GettingTag, [Actions.NewDescendent, Actions.ClearTag, Actions.AppendTag]);
        at_on(descend, Events.IdPrefix, States.GettingId, [Actions.NewDescendent, Actions.ClearId]);
        at_on(descend, Events.ClassPrefix, States.GettingClass, [Actions.NewDescendent, Actions.ClearClass]);
        at_on(descend, Events.LeftSqBracket, States.AwaitAttribName, Actions.NewDescendent);
        at_on(descend, Events.EndInput, descend, Actions.Ignore);
    }
    function _child() {
        let waitchild = States.AwaitChildSelector;
        default_for(waitchild, waitchild, Actions.ErrorBeforeSelector);
        at_on(waitchild, Events.ChildSeparator, waitchild, Actions.ErrorMultipleChildSeparators);
        at_on(waitchild, Events.DescendentSeparator, waitchild, Actions.Ignore);
        at_on(waitchild, Events.LeadLabelChar, States.GettingTag, [Actions.NewChild, Actions.ClearTag, Actions.AppendTag]);
        at_on(waitchild, Events.IdPrefix, States.GettingId, [Actions.NewChild, Actions.ClearId, Actions.AppendId]);
        at_on(waitchild, Events.ClassPrefix, States.GettingClass, [Actions.NewChild, Actions.ClearClass, Actions.AppendClass]);
        at_on(waitchild, Events.LeftSqBracket, States.AwaitAttribName, Actions.NewChild);
        at_on(waitchild, Events.EndInput, waitchild, Actions.ErrorUnexpectedEnd);
    }
    function _await_attrib_name() {
        let wait_attrib = States.AwaitAttribName;
        default_for(wait_attrib, wait_attrib, Actions.ErrorInAttribute);
        at_on(wait_attrib, Events.LeadLabelChar, States.GettingAttribName, [Actions.ClearAttrib, Actions.AppendAttrib]);
        at_on(wait_attrib, Events.DescendentSeparator, wait_attrib, Actions.Ignore);
        at_on(wait_attrib, Events.EndInput, wait_attrib, Actions.ErrorInAttribute);
    }
    function _attrib_name() {
        let attrib = States.GettingAttribName;
        default_for(attrib, States.StartAwaitSelector, Actions.ErrorInAttribute);
        at_on(attrib, Events.LeadLabelChar, attrib, Actions.AppendAttrib);
        at_on(attrib, Events.LabelChar, attrib, Actions.AppendAttrib);
        at_on(attrib, Events.DescendentSeparator, States.AwaitEqualSignOrEnd, Actions.SaveAttrib);
        at_on(attrib, Events.EqualSign, States.AwaitAttribValueStartQuote, [Actions.SaveAttrib, Actions.ClearAttribValue]);
        at_on(attrib, Events.RightSqBracket, States.AwaitExtraAttribStart, Actions.SaveAttrib);
        at_on(attrib, Events.EndInput, attrib, Actions.ErrorAttribBracketsNotClosed);
    }
    function _await_extra_attrib() {
        let wait_extra = States.AwaitExtraAttribStart;
        default_for(wait_extra, wait_extra, Actions.ErrorBeforeSelector);
        at_on(wait_extra, Events.LeftSqBracket, States.AwaitAttribName, Actions.Ignore);
        at_on(wait_extra, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.Ignore);
        at_on(wait_extra, Events.ChildSeparator, States.AwaitChildSelector, Actions.Ignore);
        at_on(wait_extra, Events.EndInput, wait_extra, Actions.Ignore);
    }
    function _await_attrib_equals() {
        let waitequ = States.AwaitEqualSignOrEnd;
        default_for(waitequ, waitequ, Actions.ErrorInAttribute);
        at_on(waitequ, Events.EqualSign, States.AwaitAttribValueStartQuote, Actions.Ignore);
        at_on(waitequ, Events.DescendentSeparator, waitequ, Actions.Ignore);
        at_on(waitequ, Events.EndInput, waitequ, Actions.ErrorAttribBracketsNotClosed);
    }
    function _await_attrib_value_start() {
        let waitquote = States.AwaitAttribValueStartQuote;
        default_for(waitquote, waitquote, Actions.ErrorAttribValueQuoteMissing);
        at_on(waitquote, Events.Quote, States.GettingAttribValue, Actions.ClearAttribValue);
        at_on(waitquote, Events.DescendentSeparator, waitquote, Actions.Ignore);
    }
    function _get_attrib_value() {
        let getvalue = States.GettingAttribValue;
        default_for(getvalue, getvalue, Actions.ErrorInAttribValue);
        at_on(getvalue, Events.Quote, States.AwaitAttribEnd, Actions.SaveAttribValue);
        at_on(getvalue, Events.LeadLabelChar, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.LabelChar, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.DescendentSeparator, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.IdPrefix, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.ClassPrefix, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.ChildSeparator, getvalue, Actions.AppendAttribValue);
    }
    function _await_attrib_end() {
        let wait_end = States.AwaitAttribEnd;
        default_for(wait_end, wait_end, Actions.ErrorAttribBracketsNotClosed);
        at_on(wait_end, Events.DescendentSeparator, wait_end, Actions.Ignore);
        at_on(wait_end, Events.RightSqBracket, States.AwaitExtraAttribStart, Actions.Ignore);
    }
    initTable(TransitionTable);
    initTable(ActionTable);
    _start();
    _tag();
    _id();
    _class();
    _descendent();
    _child();
    _await_attrib_name();
    _attrib_name();
    _await_extra_attrib();
    _await_attrib_equals();
    _await_attrib_value_start();
    _get_attrib_value();
    _await_attrib_end();
} //-- setup_tables
setup_tables();
function isAlpha(_char) {
    return (_char >= 'a' && _char <= 'z') || (_char >= 'A' && _char <= 'Z');
}
function isLabelLead(_char) {
    return _char === '_' || isAlpha(_char);
}
function isNumeric(_char) {
    return _char >= '0' && _char <= '9';
}
function isLabelContinuer(_char) {
    return isNumeric(_char) || isLabelLead(_char);
}
function event(_char) {
    if (_char.length != 1) {
        throw new Error("Can only determine an event for a single character!");
    }
    if (isLabelLead(_char)) {
        return Events.LeadLabelChar;
    }
    if (isLabelContinuer(_char)) {
        return Events.LabelChar;
    }
    switch (_char) {
        case '.': return Events.ClassPrefix;
        case '#': return Events.IdPrefix;
        case '[': return Events.LeftSqBracket;
        case ']': return Events.RightSqBracket;
        case '=': return Events.EqualSign;
        case ' ': return Events.DescendentSeparator;
        case '\t': return Events.DescendentSeparator;
        case '>': return Events.ChildSeparator;
        case '"': return Events.Quote;
    }
    return Events.Illegal;
}
export function has_tag(token) { return !!token._tag; }
export function with_tag(token, callback) {
    if (!!token._tag) {
        callback(token._tag);
    }
}
export function has_class(token) { return !!token._class; }
export function with_class(token, callback) {
    if (!!token._class) {
        callback(token._class);
    }
}
export function has_id(token) { return !!token._id; }
export function with_id(token, callback) {
    if (!!token._id) {
        callback(token._id);
    }
}
// --------- Token -------------
export class SelectorLexer {
    get tokens() { return this._root_token; }
    constructor() {
        this._root_token = {};
        this._current = this._root_token;
        this._state = States.StartAwaitSelector;
        this._event = Events.LAST_EVENT;
        this._actions = [Actions.Ignore];
        this._input = '';
        this._actionLookup = {};
        this.setup_actions();
    }
    lex_selector(selector, debug = false) {
        for (var index = 0; index < selector.length; index++) {
            this._input = selector.charAt(index);
            this._event = event(this._input);
            this.stimulus(debug);
        }
        this._input = '';
        this._event = Events.EndInput;
        this.stimulus(debug);
    }
    stimulus(debug) {
        let next = TransitionTable[this._state][this._event];
        this._actions = ActionTable[this._state][this._event];
        if (debug) {
            console.warn(`Stimulus: ${this._state} =['${this._input}' ${this._event.toString()}]=>${next} @ ${this._actions}`);
        }
        this._state = next;
        this.perform_actions();
    }
    perform_actions() {
        if (!this._actions) {
            console.error(`No actions for State: ${this._state} Input: ${this._input}`);
            return;
        }
        this._actions.forEach((_action) => {
            if (this._actionLookup[_action]) {
                this._actionLookup[_action]();
            }
            else {
                console.error(`No action handler setup for action ${_action}`);
            }
        });
    }
    error(message) {
        throw new Error(`Error ${message}`);
    }
    general_actions() {
        this._actionLookup[Actions.Ignore] = () => { };
        this._actionLookup[Actions.ErrorBeforeSelector] = () => this.error(`before selector with character '${this._input}'`);
        this._actionLookup[Actions.ErrorUnexpectedEnd] = () => this.error(` - unexpected end of input.`);
    }
    tag_actions() {
        this._actionLookup[Actions.ClearTag] = () => this._current._tag = '';
        this._actionLookup[Actions.AppendTag] = () => this._current._tag += this._input;
        this._actionLookup[Actions.SaveTag] = () => {
            let tag = this._current._tag;
            this._current._tag = !!tag ? tag.toUpperCase() : '';
        };
        this._actionLookup[Actions.ErrorInTag] = () => this.error(`- character '${this._input}' not legal in a tag name.`);
        this._actionLookup[Actions.ErrorAfterTag] = () => this.error(`- character '${this._input}' not legal after a tag name.`);
    }
    class_actions() {
        this._actionLookup[Actions.ClearClass] = () => this._current._class = '';
        this._actionLookup[Actions.AppendClass] = () => this._current._class += this._input;
        this._actionLookup[Actions.SaveClass] = () => { };
        this._actionLookup[Actions.ErrorInClass] = () => this.error(`in class at character '${this._input}'`);
    }
    id_actions() {
        this._actionLookup[Actions.ClearId] = () => this._current._id = '';
        this._actionLookup[Actions.AppendId] = () => this._current._id += this._input;
        this._actionLookup[Actions.SaveId] = () => { };
        this._actionLookup[Actions.ErrorInId] = () => this.error(`in ID at character '${this._input}'`);
    }
    child_actions() {
        this._actionLookup[Actions.NewChild] = () => {
            let new_child = {};
            this._current._child = new_child;
            this._current = new_child;
        };
    }
    descendent_actions() {
        this._actionLookup[Actions.NewDescendent] = () => {
            let new_descendent = {};
            this._current._descendent = new_descendent;
            this._current = new_descendent;
        };
    }
    attrib_actions() {
        this._actionLookup[Actions.ClearAttrib] = () => this.createAttrib();
        this._actionLookup[Actions.AppendAttrib] = () => {
            let attrib = this.getLastAttrib();
            attrib.name += this._input;
        };
        this._actionLookup[Actions.SaveAttrib] = () => { };
        this._actionLookup[Actions.ErrorInAttribute] = () => this.error(`in attribute name at character '${this._input}'`);
        this._actionLookup[Actions.ErrorAttribBracketsNotClosed] = () => this.error(`in attribute: missing ']'`);
        this._actionLookup[Actions.ErrorAttribValueQuoteMissing] = () => this.error(`in attribute with missing quote (") for attribute value at character '${this._input}'`);
    }
    attrib_value_actions() {
        this._actionLookup[Actions.ClearAttribValue] = () => {
            let attrib = this.getLastAttrib();
            attrib.value = '';
        };
        this._actionLookup[Actions.AppendAttribValue] = () => {
            let attrib = this.getLastAttrib();
            attrib.value += this._input;
        };
        this._actionLookup[Actions.SaveAttribValue] = () => { };
        this._actionLookup[Actions.ErrorInAttribValue] = () => this.error(`in attribute value at character '${this._input}'`);
    }
    setup_actions() {
        this.general_actions();
        this.tag_actions();
        this.class_actions();
        this.id_actions();
        this.child_actions();
        this.descendent_actions();
        this.attrib_actions();
        this.attrib_value_actions();
    }
    createAttrib() {
        let new_attrib;
        new_attrib = { name: '' };
        if (this._current._attrib) {
            this._current._attrib.push(new_attrib);
        }
        else {
            this._current._attrib = [new_attrib];
        }
        return new_attrib;
    }
    getLastAttrib() {
        if (this._current._attrib) {
            let list = this._current._attrib;
            let latest_attrib = list[list.length - 1];
            return latest_attrib;
        }
        else {
            throw new Error(`Can't append attribute name when record undefined for input: '${this._input}'`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3ItbGV4ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VsZWN0b3ItbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Ozs7R0FJRztBQUdILDJEQUEyRDtBQUMzRCwyREFBMkQ7QUFDM0QsOENBQThDO0FBQzlDLDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsa0JBQWtCO0FBQ2xCLHdDQUF3QztBQUN4QyxxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFHaEIsSUFBSyxNQWVKO0FBZkQsV0FBSyxNQUFNO0lBQ1QscURBQWEsQ0FBQTtJQUNiLDZDQUFTLENBQUE7SUFDVCx1REFBYyxDQUFBO0lBQ2QsaUVBQW1CLENBQUE7SUFDbkIsaURBQVcsQ0FBQTtJQUNYLDJDQUFRLENBQUE7SUFDUixxREFBYSxDQUFBO0lBQ2IsdURBQWMsQ0FBQTtJQUNkLDZDQUFTLENBQUE7SUFDVCxxQ0FBSyxDQUFBO0lBQ0wsNENBQVEsQ0FBQTtJQUNSLDBDQUFPLENBQUE7SUFFUCxnREFBVSxDQUFBO0FBQ1osQ0FBQyxFQWZJLE1BQU0sS0FBTixNQUFNLFFBZVY7QUFFRCxNQUFNLENBQU4sSUFBWSxPQW9DWDtBQXBDRCxXQUFZLE9BQU87SUFDakIsNEJBQWlCLENBQUE7SUFDakIsd0RBQTZDLENBQUE7SUFDN0Msc0NBQTJCLENBQUE7SUFDM0IsNENBQWlDLENBQUE7SUFDakMsMENBQStCLENBQUE7SUFDL0Isb0NBQXlCLENBQUE7SUFDekIsK0NBQW9DLENBQUE7SUFDcEMsdURBQTRDLENBQUE7SUFDNUMsK0RBQW9ELENBQUE7SUFDcEQsMkVBQWdFLENBQUE7SUFDaEUsMkVBQWdFLENBQUE7SUFDaEUsNEVBQWlFLENBQUE7SUFFakUsaUNBQXNCLENBQUE7SUFDdEIsbUNBQXdCLENBQUE7SUFDeEIsK0JBQW9CLENBQUE7SUFFcEIscUNBQTBCLENBQUE7SUFDMUIsdUNBQTRCLENBQUE7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