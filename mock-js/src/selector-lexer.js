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
    Events[Events["SelectorSeparator"] = 0] = "SelectorSeparator";
    Events[Events["LeadLabelChar"] = 1] = "LeadLabelChar";
    Events[Events["LabelChar"] = 2] = "LabelChar";
    Events[Events["ChildSeparator"] = 3] = "ChildSeparator";
    Events[Events["DescendentSeparator"] = 4] = "DescendentSeparator";
    Events[Events["ClassPrefix"] = 5] = "ClassPrefix";
    Events[Events["IdPrefix"] = 6] = "IdPrefix";
    Events[Events["LeftSqBracket"] = 7] = "LeftSqBracket";
    Events[Events["RightSqBracket"] = 8] = "RightSqBracket";
    Events[Events["EqualSign"] = 9] = "EqualSign";
    Events[Events["Quote"] = 10] = "Quote";
    Events[Events["EndInput"] = 11] = "EndInput";
    Events[Events["Illegal"] = 12] = "Illegal";
    Events[Events["OtherSymbol"] = 13] = "OtherSymbol";
    Events[Events["LAST_EVENT"] = 14] = "LAST_EVENT";
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
    Actions["ErrorIncompleteSelectorList"] = "ERROR-incomplete-selector-list";
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
    Actions["NewSelectorInSet"] = "NEW-SELECTOR-IN-SET";
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
    States[States["GotSelectorSeparatorAwaitNewSelector"] = 14] = "GotSelectorSeparatorAwaitNewSelector";
    States[States["LAST_STATE"] = 15] = "LAST_STATE";
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
    function _start_new_selector_in_set() {
        let new_sel = States.GotSelectorSeparatorAwaitNewSelector;
        default_for(new_sel, new_sel, Actions.ErrorBeforeSelector);
        at_on(new_sel, Events.LeadLabelChar, States.GettingTag, [Actions.ClearTag, Actions.AppendTag]);
        at_on(new_sel, Events.ClassPrefix, States.GettingClass, Actions.ClearClass);
        at_on(new_sel, Events.IdPrefix, States.GettingId, Actions.ClearId);
        at_on(new_sel, Events.DescendentSeparator, new_sel, Actions.Ignore);
        at_on(new_sel, Events.LeftSqBracket, States.AwaitAttribName, Actions.Ignore);
        at_on(new_sel, Events.EndInput, new_sel, Actions.ErrorIncompleteSelectorList);
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
        at_on(tag, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SaveTag, Actions.NewSelectorInSet]);
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
        at_on(id, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SaveId, Actions.NewSelectorInSet]);
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
        at_on(classState, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SaveClass, Actions.NewSelectorInSet]);
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
        // not a descendent after all..
        at_on(descend, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, Actions.NewSelectorInSet);
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
        at_on(getvalue, Events.OtherSymbol, getvalue, Actions.AppendAttribValue);
        at_on(getvalue, Events.SelectorSeparator, getvalue, Actions.AppendAttribValue);
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
    _start_new_selector_in_set();
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
        case ',': return Events.SelectorSeparator;
        case '\n':
        case '\b':
            return Events.Illegal;
    }
    return Events.OtherSymbol;
}
// --------- Token -------------
export class SelectorLexer {
    get tokens() { return this._selector_set; }
    constructor() {
        this._selector_set = [{}];
        this._current = this._selector_set[0];
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
    current(new_token) {
        if (!!new_token) {
            this._current = new_token;
        }
        return this._current;
    }
    extend_selector_set() {
        let new_token = {};
        this._selector_set.push(new_token);
        this.current(new_token);
    }
    general_actions() {
        this._actionLookup[Actions.Ignore] = () => { };
        this._actionLookup[Actions.ErrorBeforeSelector] = () => this.error(`before selector with character '${this._input}'`);
        this._actionLookup[Actions.ErrorUnexpectedEnd] = () => this.error(` - unexpected end of input.`);
    }
    tag_actions() {
        this._actionLookup[Actions.ClearTag] = () => this.current()._tag = '';
        this._actionLookup[Actions.AppendTag] = () => this.current()._tag += this._input;
        this._actionLookup[Actions.SaveTag] = () => {
            let tag = this.current()._tag;
            this.current()._tag = !!tag ? tag.toUpperCase() : '';
        };
        this._actionLookup[Actions.ErrorInTag] = () => this.error(`- character '${this._input}' not legal in a tag name.`);
        this._actionLookup[Actions.ErrorAfterTag] = () => this.error(`- character '${this._input}' not legal after a tag name.`);
    }
    class_actions() {
        this._actionLookup[Actions.ClearClass] = () => this.current()._class = '';
        this._actionLookup[Actions.AppendClass] = () => this.current()._class += this._input;
        this._actionLookup[Actions.SaveClass] = () => { };
        this._actionLookup[Actions.ErrorInClass] = () => this.error(`in class at character '${this._input}'`);
    }
    id_actions() {
        this._actionLookup[Actions.ClearId] = () => this.current()._id = '';
        this._actionLookup[Actions.AppendId] = () => this.current()._id += this._input;
        this._actionLookup[Actions.SaveId] = () => { };
        this._actionLookup[Actions.ErrorInId] = () => this.error(`in ID at character '${this._input}'`);
    }
    child_actions() {
        this._actionLookup[Actions.NewChild] = () => {
            let new_child = {};
            this.current()._child = new_child;
            this.current(new_child);
        };
    }
    descendent_actions() {
        this._actionLookup[Actions.NewDescendent] = () => {
            let new_descendent = {};
            this.current()._descendent = new_descendent;
            this.current(new_descendent);
        };
    }
    selector_set_actions() {
        this._actionLookup[Actions.NewSelectorInSet] = () => this.extend_selector_set();
        this._actionLookup[Actions.ErrorIncompleteSelectorList] = () => this.error(`list of selectors was incomplete. Expected another selector.`);
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
        this.selector_set_actions();
        this.attrib_actions();
        this.attrib_value_actions();
    }
    createAttrib() {
        let new_attrib;
        new_attrib = { name: '' };
        let current_attrib_list = this.current()._attrib;
        if (current_attrib_list) {
            current_attrib_list.push(new_attrib);
        }
        else {
            this.current()._attrib = [new_attrib];
        }
        return new_attrib;
    }
    getLastAttrib() {
        let current_attrib_list = this.current()._attrib;
        if (current_attrib_list) {
            let list = current_attrib_list;
            let latest_attrib = list[list.length - 1];
            return latest_attrib;
        }
        else {
            throw new Error(`Can't append attribute name when record undefined for input: '${this._input}'`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3ItbGV4ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VsZWN0b3ItbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Ozs7R0FJRztBQUdILDJEQUEyRDtBQUMzRCwyREFBMkQ7QUFDM0QsOENBQThDO0FBQzlDLDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsa0JBQWtCO0FBQ2xCLHdDQUF3QztBQUN4QyxxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFHaEIsSUFBSyxNQWlCSjtBQWpCRCxXQUFLLE1BQU07SUFDVCw2REFBaUIsQ0FBQTtJQUNqQixxREFBYSxDQUFBO0lBQ2IsNkNBQVMsQ0FBQTtJQUNULHVEQUFjLENBQUE7SUFDZCxpRUFBbUIsQ0FBQTtJQUNuQixpREFBVyxDQUFBO0lBQ1gsMkNBQVEsQ0FBQTtJQUNSLHFEQUFhLENBQUE7SUFDYix1REFBYyxDQUFBO0lBQ2QsNkNBQVMsQ0FBQTtJQUNULHNDQUFLLENBQUE7SUFDTCw0Q0FBUSxDQUFBO0lBQ1IsMENBQU8sQ0FBQTtJQUNQLGtEQUFXLENBQUE7SUFFWCxnREFBVSxDQUFBO0FBQ1osQ0FBQyxFQWpCSSxNQUFNLEtBQU4sTUFBTSxRQWlCVjtBQUVELE1BQU0sQ0FBTixJQUFZLE9BdUNYO0FBdkNELFdBQVksT0FBTztJQUNqQiw0QkFBaUIsQ0FBQTtJQUNqQix3REFBNkMsQ0FBQTtJQUM3QyxzQ0FBMkIsQ0FBQTtJQUMzQiw0Q0FBaUMsQ0FBQTtJQUNqQywwQ0FBK0IsQ0FBQTtJQUMvQixvQ0FBeUIsQ0FBQTtJQUN6QiwrQ0FBb0MsQ0FBQTtJQUNwQyx1REFBNEMsQ0FBQTtJQUM1QywrREFBb0QsQ0FBQTtJQUNwRCwyRUFBZ0UsQ0FBQTtJQUNoRSwyRUFBZ0UsQ0FBQTtJQUNoRSw0RUFBaUUsQ0FBQTtJQUVqRSx5RUFBOEQsQ0FBQTtJQUU5RCxpQ0FBc0IsQ0FBQTtJQUN0QixtQ0FBd0IsQ0FB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