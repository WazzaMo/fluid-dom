import { stringify } from "querystring";
import { callbackify } from "util";

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


enum Events {
  LeadLabelChar,
  LabelChar,
  ChildSeparator,
  DescendentSeparator,
  ClassPrefix,
  IdPrefix,
  LeftSqBracket,
  RightSqBracket,
  EqualSign,
  Quote,
  EndInput,
  Illegal,

  LAST_EVENT
}

export enum Actions {
  Ignore = 'IGNORE',
  ErrorBeforeSelector = 'ERROR-before-selector',
  ErrorInTag = 'ERROR-in-tag',
  ErrorAfterTag = 'ERROR-after-tag',
  ErrorInClass = 'ERROR-in-class',
  ErrorInId = 'ERROR-in-ID',
  ErrorInAttribute = 'ERROR-in-attrib',
  ErrorInAttribValue = 'ERROR-in-attrib-value',
  ErrorUnexpectedEnd = 'ERROR-unexpected-end-of-input',
  ErrorMultipleChildSeparators = 'ERROR-too-many-child-separators',

  ClearTag = 'CLEAR-TAG',
  AppendTag = 'APPEND-TAG',
  SaveTag = 'SAVE-TAG',

  ClearClass = 'CLEAR-CLASS',
  AppendClass = 'APPEND-CLASS',
  SaveClass = 'SAVE-CLASS',

  ClearId = 'CLEAR-ID',
  AppendId = 'STORE-ID',
  SaveId = 'SAVE-ID',

  ClearAttrib = 'CLEAR-ATTRIB',
  AppendAttrib = 'APPEND-ATTRIB',
  SaveAttrib = 'SAVE-ATTRIB',

  ClearAttribValue = 'CLEAR-VALUE',
  AppendAttribValue = 'APPEND-VALUE',
  SaveAttribValue = 'SAVE-VALUE',

  NewChild = 'NEW-CHILD-SELECTOR',
  NewDescendent = 'NEW-DESCENDENT-SELECTOR'
}

enum States {
  StartAwaitSelector,
  GettingTag,
  GettingClass,
  GettingId,
  AwaitDescendentSelector,
  AwaitChildSelector,
  AwaitAttribName,
  GettingAttribName,

  AwaitEqualSignOrEnd,
  AwaitAttribValue,
  AttribValueStartQuote,
  GettingAttribValue,
  AttribValueEndQuote,
  AwaitAttribEnd,
  AwaitExtraAttribStart,

  LAST_STATE
}

interface StateLookup<T> {
  [state: number]: T;
}

interface EventLookup<T> {
  [event: number]: T;
}

const TransitionTable: StateLookup<EventLookup<number>> = {};
const ActionTable: StateLookup<EventLookup<Array<string>>> = {};

function isString(s: any) : s is string {
  return typeof s === "string";
}

function setup_tables() {
  function initState<T>() : EventLookup<T> {
    return {};
  }
  function initTable<T>(table: StateLookup<EventLookup<T>>) : void {
    for(var stateNum = 0; stateNum < States.LAST_STATE; stateNum++) {
      table[stateNum] = initState<T>();
    }
  }
  function at_on(state:number, event: number, next: number, action: string | Array<string>) {
    TransitionTable[state][event] = next;
    if ( isString( action) ) {
      ActionTable[state][event] = [action];
    } else {
      ActionTable[state][event] = action;
    }
  }
  function default_for(state: number, next: number, action: string) {
    for(var event = Events.LeadLabelChar; event < Events.LAST_EVENT; event++) {
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
    at_on(attrib, Events.EqualSign, States.GettingAttribValue, [Actions.SaveAttrib, Actions.ClearAttribValue]);
    at_on(attrib, Events.RightSqBracket, States.AwaitExtraAttribStart, Actions.SaveAttrib);
    at_on(attrib, Events.EndInput, attrib, Actions.ErrorInAttribute);
  }

  function _await_extra_attrib() {
    let wait_extra = States.AwaitExtraAttribStart;
    default_for(wait_extra, wait_extra, Actions.ErrorBeforeSelector);
    at_on(wait_extra, Events.LeftSqBracket, States.AwaitAttribName, Actions.Ignore);
    at_on(wait_extra, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.Ignore);
    at_on(wait_extra, Events.ChildSeparator, States.AwaitChildSelector, Actions.Ignore);
    at_on(wait_extra, Events.EndInput, wait_extra, Actions.Ignore);
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
} //-- setup_tables

setup_tables();

function isAlpha(_char: string) : boolean {
  return (_char >= 'a' && _char <= 'z') || (_char >= 'A' && _char <= 'Z');
}

function isLabelLead(_char: string) : boolean {
  return _char === '_' || isAlpha(_char);
}

function isNumeric(_char: string) : boolean {
  return _char >= '0' && _char <= '9';
}

function isLabelContinuer(_char: string) : boolean {
  return isNumeric(_char) || isLabelLead(_char);
}

function event(_char: string) : number {
  if (_char.length != 1) {
    throw new Error("Can only determine an event for a single character!");
  }
  if (isLabelLead(_char)) {
    return Events.LeadLabelChar;
  }
  if (isLabelContinuer(_char)) {
    return Events.LabelChar;
  }
  switch(_char) {
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

// --------- Token --------
export interface AttribInfo {
  name : string;
  value ?: string;
}

export interface SelectorToken {
  _tag ?: string;
  _class ?: string;
  _id ?: string;
  _attrib ?: Array<AttribInfo>;
  _child ?: SelectorToken;
  _descendent ?: SelectorToken;
}


export function has_tag(token: SelectorToken)  : boolean { return !! token._tag; }
export function with_tag(token: SelectorToken, callback: (tag:string)=> void) : void {
  if (!!token._tag) {
    callback(token._tag);
  }
}

export function has_class(token: SelectorToken) : boolean { return !! token._class; }
export function with_class(token: SelectorToken, callback: (_class: string) => void ) : void {
  if (!! token._class) {
    callback(token._class);
  }
}

export function has_id(token: SelectorToken) : boolean { return !! token._id; }
export function with_id(token: SelectorToken, callback: (id: string) => void ) : void {
  if (!! token._id) {
    callback(token._id);
  }
}
// --------- Token -------------


export class SelectorLexer {
  private _root_token: SelectorToken;
  private _current: SelectorToken;
  private _state: number;
  private _event: number;
  private _actions: Array<string>;
  private _input: string;
  private _actionLookup : {
    [action: string]: () => void
  }

  get tokens() : SelectorToken { return this._root_token; }

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

  lex_selector(selector: string, debug: boolean = false) {
    for(var index = 0; index < selector.length; index++) {
      this._input = selector.charAt(index);
      this._event = event(this._input);
      this.stimulus(debug);
    }
    this._input = '';
    this._event = Events.EndInput;
    this.stimulus(debug);
  }

  private stimulus( debug: boolean ) : void {
    let next = TransitionTable[this._state][this._event];
    this._actions = ActionTable[this._state][this._event];
    if (debug) {
      console.warn(`Stimulus: ${this._state} =['${this._input}' ${this._event.toString()}]=>${next} @ ${this._actions}`);
    }
    this._state = next;
    this.perform_actions();
  }

  private perform_actions() : void {
    if (! this._actions) {
      console.error(`No actions for State: ${this._state} Input: ${this._input}`);
      return;
    }
    this._actions.forEach( (_action: string) => {
      if (this._actionLookup[_action]) {
        this._actionLookup[_action]();
      } else {
        console.error(`No action handler setup for action ${_action}`);
      }
    });
  }

  private error(message: string) : void {
    throw new Error(message);
  }

  private general_actions() : void {
    this._actionLookup[Actions.Ignore] = ()=> {};
    this._actionLookup[Actions.ErrorBeforeSelector] = () => this.error(`Error before selector with character '${this._input}'`);
    this._actionLookup[Actions.ErrorUnexpectedEnd] = () => this.error(`Unexpected end of input.`);
  }

  private tag_actions() : void {
    this._actionLookup[Actions.ClearTag] = () => this._current._tag = '';
    this._actionLookup[Actions.AppendTag] = () => this._current._tag += this._input;
    this._actionLookup[Actions.SaveTag] = () => {
      let tag = this._current._tag;
      this._current._tag = !!tag ? tag.toUpperCase() : '';
    };
    this._actionLookup[Actions.ErrorInTag] = () => this.error(`Character '${this._input}' not legal in a tag name.`);
    this._actionLookup[Actions.ErrorAfterTag] = () => this.error(`Character '${this._input}' not legal after a tag name.`);
  }

  private class_actions() : void {
    this._actionLookup[Actions.ClearClass] = () => this._current._class = '';
    this._actionLookup[Actions.AppendClass] = () => this._current._class += this._input;
    this._actionLookup[Actions.SaveClass] = () => {};
    this._actionLookup[Actions.ErrorInClass] = () => this.error(`Error in class at character '${this._input}'`);
  }

  private id_actions() : void {
    this._actionLookup[Actions.ClearId] = () => this._current._id = '';
    this._actionLookup[Actions.AppendId] = ()=> this._current._id += this._input;
    this._actionLookup[Actions.SaveId] = () => {};
    this._actionLookup[Actions.ErrorInId] = () => this.error(`Error in ID at character '${this._input}'`);
  }

  private child_actions() : void {
    this._actionLookup[Actions.NewChild] = ()=> {
      let new_child = {};
      this._current._child = new_child;
      this._current = new_child;
    }
  }

  private descendent_actions() : void {
    this._actionLookup[Actions.NewDescendent] = () => {
      let new_descendent = {};
      this._current._descendent = new_descendent;
      this._current = new_descendent;
    }
  }

  private attrib_actions() : void {
    this._actionLookup[Actions.ClearAttrib] = ()=> {
      if (this._current._attrib) {
        let new_attrib : AttribInfo = { name: ''};
        this._current._attrib.push(new_attrib);
      } else {
        this._current._attrib = [{name: ''}];
      }
    };
    this._actionLookup[Actions.AppendAttrib] = ()=> {
      if (this._current._attrib) {
        let list = this._current._attrib;
        let latest_attrib = list[list.length - 1];
        latest_attrib.name += this._input;
      } else {
        this.error(`Can't append attribute name when record undefined for input: '${this._input}'`);
      }
    };
    this._actionLookup[Actions.SaveAttrib] = ()=> {};
    this._actionLookup[Actions.ErrorInAttribute] = ()=> this.error(`Error in attribute name at character '${this._input}'`);
  }

  private setup_actions() : void {
    this.general_actions();
    this.tag_actions();
    this.class_actions();
    this.id_actions();
    this.child_actions();
    this.descendent_actions();
    this.attrib_actions();
  }
}