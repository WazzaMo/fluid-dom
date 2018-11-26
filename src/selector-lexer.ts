
/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */



/**
 * The classification of input characters the lexer
 * is to process. 
 */
enum Events {
  SelectorSeparator, // ','
  LeadLabelChar,
  LabelChar,
  AttribNameChar, // '-'
  ChildSeparator,
  DescendentSeparator,
  ClassPrefix,
  IdPrefix,
  LeftSqBracket,
  RightSqBracket,
  EqualSign,
  Quote,
  Colon,            // ':'
  LeftParenthesis,  // '('
  RightParenthesis, // ')'
  AdjacentSibling,  // '+'
  GeneralSibling,   // '~'
  OtherSymbol,      // $ % ! ^ * ( ) etc.
  Illegal,
  EndInput,

  LAST_EVENT
}

/**
 * The types of actions that the lexer is to take
 * to process the input characters of a selector.
 */
enum Actions {
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
  ErrorAttribBracketsNotClosed = 'ERROR-attribute-bracket-missing',
  ErrorAttribValueQuoteMissing = 'ERROR-attrib-value-quote-missing',
  ErrorInAdjacentSibling = 'ERROR-adjacent-sibling',
  ErrorInGeneralSibling = 'ERROR-general-sibling',
  ErrorInPseudoClass = 'ERROR-pseudo-class',
  ErrorInPseudoElement = 'ERROR-pseudo-element',

  ErrorIncompleteSelectorList = 'ERROR-incomplete-selector-list',

  ClearTag = 'CLEAR-TAG',
  AppendTag = 'APPEND-TAG',
  SaveTag = 'SAVE-TAG',

  ClearPseudoElementName = 'CLEAR-PSEUDO-ELEMENT',
  AppendPseudoElementName = 'APPEND-PSEUDO-ELEMENT',
  SavePseudoElementName = 'SAVE-PSEUDO-ELEMENT',

  ClearPseudoClassName = 'CLEAR-PSEUDO-CLASS',
  AppendPseudoClassName = 'APPEND-PSEUDO-CLASS',
  SavePseudoClassName = 'SAVE-PSEUDO-CLASS',

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
  NewDescendent = 'NEW-DESCENDENT-SELECTOR',
  NewSelectorInSet = 'NEW-SELECTOR-IN-SET',
  NewAdjacentSibling = 'NEW-ADJACENT-SIBLING',
  NewGeneralSibling = 'NEW-GENERAL-SIBLING'
}

/**
 * The states that the Lexer can be in at different
 * stages of analysing a selector.
 */
enum States {
  StartAwaitSelector,
  GettingTag,
  GettingClass,
  GettingId,
  AwaitPseudoElementName,
  GettingPseudoElementName,
  AwaitPseudoClassName,
  GettingPseudoClassName,
  AwaitDescendentSelector,
  AwaitChildSelector,
  AwaitAdjacentSiblingSelector,
  AwaitGeneralSiblingSelector,
  AwaitAttribName,
  GettingAttribName,

  AwaitEqualSignOrEnd,
  AwaitAttribValueStartQuote,
  GettingAttribValue,
  AttribValueEndQuote,
  AwaitAttribEnd,
  AwaitExtraAttribStart,

  GotSelectorSeparatorAwaitNewSelector,

  LAST_STATE
}

/**
 * One part of the state machine lookup tables - the
 * tables will have two parts.
 * This type supports the mapping of the current state to the
 * second part of the lookup table.
 */
interface StateLookup<T> {
  [state: number]: T;
}

/**
 * The second part (of 2) of the state machine lookup tables.
 * This represents the mapping of an event to a data item.
 * In general, the data will either be the next state
 * or it will be the action to take.
 */
interface EventLookup<T> {
  [event: number]: T;
}

/**
 * Global State Transition Lookup Table.
 */
const TransitionTable: StateLookup<EventLookup<number>> = {};
/**
 * Global State to Action Lookup Table.
 */
const ActionTable: StateLookup<EventLookup<Array<string>>> = {};

/**
 * Helper function to determine if an object is a string.
 * @param s - a candidate string object.
 */
function isString(s: any) : s is string {
  return typeof s === "string";
}

/**
 * Sets up the global state machine tables with the right
 * state transition and state-event-action mappings and makes
 * it relatively easy to extend the state machine. Has internal
 * functions that are not to be used in any other context.
 */
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
    at_on(tag, Events.Colon, States.AwaitPseudoClassName, Actions.SaveTag);
    at_on(tag, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SaveTag);
    at_on(tag, Events.ChildSeparator, States.AwaitChildSelector, Actions.SaveTag);
    at_on(tag, Events.ClassPrefix, States.GettingClass, [Actions.SaveTag, Actions.ClearClass]);
    at_on(tag, Events.IdPrefix, States.GettingId, [Actions.SaveTag, Actions.ClearId]);
    at_on(tag, Events.LeftSqBracket, States.AwaitAttribName, Actions.SaveTag);
    at_on(tag, Events.EndInput, tag, Actions.SaveTag);
    at_on(tag, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.SaveTag)
    at_on(tag, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.SaveTag)
    at_on(tag, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SaveTag, Actions.NewSelectorInSet]);
  }

  function _wait_pseudo_class() {
    let wait_pc = States.AwaitPseudoClassName;
    default_for(wait_pc, wait_pc, Actions.ErrorInPseudoClass);
    at_on(wait_pc, Events.Colon, States.AwaitPseudoElementName, Actions.Ignore);
    at_on(wait_pc, Events.LeadLabelChar, States.GettingPseudoClassName, [Actions.ClearPseudoClassName, Actions.AppendPseudoClassName] );
  }

  function _get_pseudo_class() {
    let getpc = States.GettingPseudoClassName;
    default_for(getpc, getpc, Actions.ErrorInPseudoClass);

    at_on(getpc, Events.LeadLabelChar, getpc, Actions.AppendPseudoClassName );
    at_on(getpc, Events.LabelChar, getpc, Actions.AppendPseudoClassName );
    at_on(getpc, Events.AttribNameChar, getpc, Actions.AppendPseudoClassName );
    at_on(getpc, Events.LeftParenthesis, getpc, Actions.AppendPseudoClassName );
    at_on(getpc, Events.RightParenthesis, getpc, Actions.AppendPseudoClassName );

    at_on(getpc, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SavePseudoClassName);
    at_on(getpc, Events.ChildSeparator, States.AwaitChildSelector, Actions.SavePseudoClassName);
    at_on(getpc, Events.ClassPrefix, States.GettingClass, [Actions.SavePseudoClassName, Actions.ClearClass]);
    at_on(getpc, Events.IdPrefix, States.GettingId, [Actions.SavePseudoClassName, Actions.ClearId]);
    at_on(getpc, Events.LeftSqBracket, States.AwaitAttribName, Actions.SavePseudoClassName);
    at_on(getpc, Events.EndInput, getpc, Actions.SavePseudoClassName);
    at_on(getpc, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.SavePseudoClassName)
    at_on(getpc, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.SavePseudoClassName)
    at_on(getpc, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SavePseudoClassName, Actions.NewSelectorInSet]);
  }

  function _wait_pseudo_element() {
    let wait_pe = States.AwaitPseudoElementName;
    default_for(wait_pe, wait_pe, Actions.ErrorInPseudoElement);

    at_on(wait_pe, Events.LeadLabelChar, States.GettingPseudoElementName, [Actions.ClearPseudoElementName, Actions.AppendPseudoElementName]);
  }

  function _get_pseudo_element() {
    let get_pe = States.GettingPseudoElementName;
    default_for(get_pe, get_pe, Actions.ErrorInPseudoElement);

    at_on(get_pe, Events.LeadLabelChar, States.GettingPseudoElementName, Actions.AppendPseudoElementName);
    at_on(get_pe, Events.LabelChar, States.GettingPseudoElementName, Actions.AppendPseudoElementName);
    at_on(get_pe, Events.AttribNameChar, States.GettingPseudoElementName, Actions.AppendPseudoElementName);
    at_on(get_pe, Events.LeftParenthesis, get_pe, Actions.AppendPseudoElementName);
    at_on(get_pe, Events.RightParenthesis, get_pe, Actions.AppendPseudoElementName);

    at_on(get_pe, Events.DescendentSeparator, States.AwaitDescendentSelector, Actions.SavePseudoElementName);
    at_on(get_pe, Events.ChildSeparator, States.AwaitChildSelector, Actions.SavePseudoElementName);
    at_on(get_pe, Events.ClassPrefix, States.GettingClass, [Actions.SavePseudoElementName, Actions.ClearClass]);
    at_on(get_pe, Events.IdPrefix, States.GettingId, [Actions.SavePseudoElementName, Actions.ClearId]);
    at_on(get_pe, Events.LeftSqBracket, States.AwaitAttribName, Actions.SavePseudoElementName);
    at_on(get_pe, Events.EndInput, get_pe, Actions.SavePseudoElementName);
    at_on(get_pe, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.SavePseudoElementName)
    at_on(get_pe, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.SavePseudoElementName)
    at_on(get_pe, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, [Actions.SavePseudoElementName, Actions.NewSelectorInSet]);
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
    at_on(id, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.SaveId)
    at_on(id, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.SaveId)
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
    at_on(classState, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.SaveClass)
    at_on(classState, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.SaveClass)
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
    at_on(descend, Events.AdjacentSibling, States.AwaitAdjacentSiblingSelector, Actions.Ignore)
    at_on(descend, Events.GeneralSibling, States.AwaitGeneralSiblingSelector, Actions.Ignore)
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
    at_on(attrib, Events.AttribNameChar, attrib, Actions.AppendAttrib);
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
    at_on(wait_extra, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, Actions.NewSelectorInSet);
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
    at_on(getvalue, Events.AttribNameChar, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.LeftSqBracket, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.RightSqBracket, getvalue, Actions.AppendAttribValue); // within quotes!
    at_on(getvalue, Events.AdjacentSibling, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.GeneralSibling, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.LeftParenthesis, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.RightParenthesis, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.DescendentSeparator, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.IdPrefix, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.ClassPrefix, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.ChildSeparator, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.OtherSymbol, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.Colon, getvalue, Actions.AppendAttribValue);
    at_on(getvalue, Events.SelectorSeparator, getvalue, Actions.AppendAttribValue);
  }

  function _await_attrib_end() {
    let wait_end = States.AwaitAttribEnd;
    default_for(wait_end, wait_end, Actions.ErrorAttribBracketsNotClosed);
    at_on(wait_end, Events.DescendentSeparator, wait_end, Actions.Ignore);
    at_on(wait_end, Events.RightSqBracket, States.AwaitExtraAttribStart, Actions.Ignore);
  }

  function _await_adjacent_sibling() {
    let sibling = States.AwaitAdjacentSiblingSelector;
    default_for(sibling, sibling, Actions.ErrorInAdjacentSibling);

    at_on(sibling, Events.DescendentSeparator, sibling, Actions.Ignore);
    at_on(sibling, Events.ChildSeparator, States.AwaitChildSelector, Actions.ErrorInAdjacentSibling);
    at_on(sibling, Events.LeadLabelChar, States.GettingTag, [Actions.NewAdjacentSibling, Actions.ClearTag, Actions.AppendTag]);
    at_on(sibling, Events.IdPrefix, States.GettingId, [Actions.NewAdjacentSibling, Actions.ClearId]);
    at_on(sibling, Events.ClassPrefix, States.GettingClass, [Actions.NewAdjacentSibling, Actions.ClearClass]);
    at_on(sibling, Events.LeftSqBracket, States.AwaitAttribName, Actions.NewAdjacentSibling);
    at_on(sibling, Events.EndInput, sibling, Actions.ErrorInAdjacentSibling);

    at_on(sibling, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, Actions.ErrorInAdjacentSibling);
  }

  function _await_general_sibling() {
    let sibling = States.AwaitGeneralSiblingSelector;
    default_for(sibling, sibling, Actions.ErrorInGeneralSibling);

    at_on(sibling, Events.DescendentSeparator, sibling, Actions.Ignore);
    at_on(sibling, Events.ChildSeparator, States.AwaitChildSelector, Actions.ErrorInGeneralSibling);
    at_on(sibling, Events.LeadLabelChar, States.GettingTag, [Actions.NewGeneralSibling, Actions.ClearTag, Actions.AppendTag]);
    at_on(sibling, Events.IdPrefix, States.GettingId, [Actions.NewGeneralSibling, Actions.ClearId]);
    at_on(sibling, Events.ClassPrefix, States.GettingClass, [Actions.NewGeneralSibling, Actions.ClearClass]);
    at_on(sibling, Events.LeftSqBracket, States.AwaitAttribName, Actions.NewGeneralSibling);
    at_on(sibling, Events.EndInput, sibling, Actions.ErrorInGeneralSibling);

    at_on(sibling, Events.SelectorSeparator, States.GotSelectorSeparatorAwaitNewSelector, Actions.ErrorInGeneralSibling);
  }


  initTable(TransitionTable);
  initTable(ActionTable);
  _start();
  _start_new_selector_in_set();
  _tag();
  _wait_pseudo_class();
  _get_pseudo_class();
  _wait_pseudo_element();
  _get_pseudo_element();
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
  _await_adjacent_sibling();
  _await_general_sibling();
} //-- setup_tables

// Setup the global state transition tables NOW.
setup_tables();

/**
 * Is the character an uppercase or lowercase, English character?
 * @param _char - character to check.
 */
function isAlpha(_char: string) : boolean {
  return (_char >= 'a' && _char <= 'z') || (_char >= 'A' && _char <= 'Z');
}

/**
 * Is the character valid for the lead character of a label?
 * @param _char - character to check.
 */
function isLabelLead(_char: string) : boolean {
  return _char === '_' || isAlpha(_char);
}

/**
 * Is the character numeric?
 * @param _char - character to check.
 */
function isNumeric(_char: string) : boolean {
  return _char >= '0' && _char <= '9';
}

/**
 * Is the character valid in a label after the first?
 * @param _char - character to check.
 */
function isLabelContinuer(_char: string) : boolean {
  return isNumeric(_char) || isLabelLead(_char);
}

/**
 * Classify the character from a selector as some type
 * of state machine event.
 * @param _char - character to classify.
 */
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
    case '+': return Events.AdjacentSibling;
    case '~': return Events.GeneralSibling;
    case ':': return Events.Colon;
    case '(': return Events.LeftParenthesis;
    case ')': return Events.RightParenthesis;

    case '-': return Events.AttribNameChar;

    case ',': return Events.SelectorSeparator;

    case '\n':
    case '\b':
      return Events.Illegal;
  }
  return Events.OtherSymbol;
}

// --------- Token --------
export interface AttribInfo {
  name : string;
  value ?: string;
}

function attribToString(a: AttribInfo) : string {
  let opt_value = a.value ? `="${a.value}"` : '';
  return `[${a.name}${opt_value}]`;
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
  _tag ?: string;
  _pseudo_element ?: string;
  _pseudo_class ?: string;
  _class ?: string;
  _id ?: string;
  _attrib ?: Array<AttribInfo>;
  _child ?: SelectorToken;
  _descendent ?: SelectorToken;
  _adjacent_sibling ?: SelectorToken;
  _general_sibling ?: SelectorToken;
}

export function selectorTokentoString(token: SelectorToken) : string {
  let text = '';
  text += token._tag ? `${token._tag}` : '';
  text += token._pseudo_element ? `::${token._pseudo_element}` : '';
  text += token._pseudo_class ? `:${token._pseudo_class}` : '';
  text += token._class ? `.${token._class}` : '';
  text += token._id ? `#${token._id}` : '';
  text += token._attrib ? token._attrib.map((a:AttribInfo)=>attribToString(a)).reduce( (a:string, b:string)=> (a)+(b)) : '';
  text += token._child ? `>${selectorTokentoString(token._child)}` : '';
  text += token._descendent ? ` ${selectorTokentoString(token._descendent)}` : '';
  text += token._adjacent_sibling ? `+${token._adjacent_sibling}` : '';
  text += token._general_sibling ? `~${token._general_sibling}` : '';
  return text;
}


// --------- Token -------------

/**
 * A Lexical Analyser for CSS Selectors.
 */
export class SelectorLexer {
  private _selector_set: Array< SelectorToken >;
  private _current: SelectorToken;
  private _state: number;
  private _event: number;
  private _actions: Array<string>;
  private _input: string;
  private _actionLookup : {
    [action: string]: () => void
  }

  get tokens() : Array<SelectorToken> { return this._selector_set; }

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
    throw new Error(`Error ${message}`);
  }

  private current( new_token?: SelectorToken) : SelectorToken {
    if (!! new_token) {
      this._current = new_token;
    }
    return this._current;
  }

  private extend_selector_set() : void {
    let new_token : SelectorToken = {};
    this._selector_set.push(new_token);
    this.current(new_token);
  }

  private make_adjacent_sibling(): void {
    let new_token : SelectorToken = {};
    this.current()._adjacent_sibling = new_token;
    this.current( new_token );
  }

  private make_general_sibling(): void {
    let new_token : SelectorToken = {};
    this.current()._general_sibling = new_token;
    this.current( new_token );
  }

  private general_actions() : void {
    this._actionLookup[Actions.Ignore] = ()=> {};
    this._actionLookup[Actions.ErrorBeforeSelector] = () => this.error(`before selector with character '${this._input}'`);
    this._actionLookup[Actions.ErrorUnexpectedEnd] = () => this.error(` - unexpected end of input.`);
  }

  private tag_actions() : void {
    this._actionLookup[Actions.ClearTag] = () => this.current()._tag = '';
    this._actionLookup[Actions.AppendTag] = () => this.current()._tag += this._input;
    this._actionLookup[Actions.SaveTag] = () => {
      let tag = this.current()._tag;
      this.current()._tag = !!tag ? tag.toUpperCase() : '';
    };
    this._actionLookup[Actions.ErrorInTag] = () => this.error(`- character '${this._input}' not legal in a tag name.`);
    this._actionLookup[Actions.ErrorAfterTag] = () => this.error(`- character '${this._input}' not legal after a tag name.`);
  }

  private class_actions() : void {
    this._actionLookup[Actions.ClearClass] = () => this.current()._class = '';
    this._actionLookup[Actions.AppendClass] = () => this.current()._class += this._input;
    this._actionLookup[Actions.SaveClass] = () => {};
    this._actionLookup[Actions.ErrorInClass] = () => this.error(`in class at character '${this._input}'`);
  }

  private id_actions() : void {
    this._actionLookup[Actions.ClearId] = () => this.current()._id = '';
    this._actionLookup[Actions.AppendId] = ()=> this.current()._id += this._input;
    this._actionLookup[Actions.SaveId] = () => {};
    this._actionLookup[Actions.ErrorInId] = () => this.error(`in ID at character '${this._input}'`);
  }

  private child_actions() : void {
    this._actionLookup[Actions.NewChild] = ()=> {
      let new_child = {};
      this.current()._child = new_child;
      this.current( new_child );
    }
  }

  private descendent_actions() : void {
    this._actionLookup[Actions.NewDescendent] = () => {
      let new_descendent = {};
      this.current()._descendent = new_descendent;
      this.current(new_descendent);
    }
  }

  private selector_set_actions() : void {
    this._actionLookup[Actions.NewSelectorInSet] = () => this.extend_selector_set();
    this._actionLookup[Actions.ErrorIncompleteSelectorList] = ()=> this.error(`list of selectors was incomplete. Expected another selector.`);
  }

  private attrib_actions() : void {
    this._actionLookup[Actions.ClearAttrib] = ()=> this.createAttrib();
    this._actionLookup[Actions.AppendAttrib] = ()=> {
      let attrib = this.getLastAttrib();
      attrib.name += this._input;
    };
    this._actionLookup[Actions.SaveAttrib] = ()=> {};
    this._actionLookup[Actions.ErrorInAttribute] = ()=> this.error(`in attribute name at character '${this._input}'`);
    this._actionLookup[Actions.ErrorAttribBracketsNotClosed] = ()=> this.error(`in attribute: missing ']'`);
    this._actionLookup[Actions.ErrorAttribValueQuoteMissing] = ()=> this.error(`in attribute with missing quote (") for attribute value at character '${this._input}'`);
  }

  private attrib_value_actions() : void {
    this._actionLookup[Actions.ClearAttribValue] = ()=>{
      let attrib = this.getLastAttrib();
      attrib.value = '';
    };
    this._actionLookup[Actions.AppendAttribValue] = ()=> {
      let attrib = this.getLastAttrib();
      attrib.value += this._input;
    }
    this._actionLookup[Actions.SaveAttribValue] = () => {};

    this._actionLookup[Actions.ErrorInAttribValue] = ()=> this.error(`in attribute value at character '${this._input}'`);
  }

  private adjacent_sibling_actions() : void {
    this._actionLookup[ Actions.NewAdjacentSibling ] = ()=> this.make_adjacent_sibling();
    this._actionLookup[ Actions.ErrorInAdjacentSibling ]  = ()=> this.error( `specifying adjacent sibling at '${this._input}'`);
  }

  private general_sibling_actions() : void {
    this._actionLookup[ Actions.NewGeneralSibling ] = ()=> this.make_general_sibling();
    this._actionLookup[ Actions.ErrorInGeneralSibling ] = ()=> this.error( `specifying general sibling at '${this._input}'`);
  }

  private pseudo_element_actions() : void {
    this._actionLookup[ Actions.ClearPseudoElementName ] = ()=> this.clearPseudoElement();
    this._actionLookup[ Actions.AppendPseudoElementName ] = ()=> this.appendPseudoElement();
    this._actionLookup[ Actions.SavePseudoElementName ] = ()=> this.savePseudoElement();
    this._actionLookup[ Actions.ErrorInPseudoElement ] = ()=> this.error( `in pseudo-element at character '${this._input}'`);
  }

  private pseudo_class_actions() : void {
    this._actionLookup[ Actions.ClearPseudoClassName ] = ()=> this.clearPseudoClass();
    this._actionLookup[ Actions.AppendPseudoClassName ] = ()=> this.appendPseudoClass();
    this._actionLookup[ Actions.SavePseudoClassName ] = ()=> this.savePseudoClass();
    this._actionLookup[ Actions.ErrorInPseudoClass ] = ()=> this.error( `in pseudo-class at character '${this._input}'`);
  }

  private setup_actions() : void {
    this.general_actions();
    this.tag_actions();
    this.class_actions();
    this.id_actions();
    this.child_actions();
    this.descendent_actions();
    this.selector_set_actions();
    this.attrib_actions();
    this.attrib_value_actions();
    this.adjacent_sibling_actions();
    this.general_sibling_actions();
    this.pseudo_element_actions();
    this.pseudo_class_actions();
  }

  private createAttrib() : AttribInfo {
    let new_attrib: AttribInfo;
    new_attrib = { name: ''};
    let current_attrib_list = this.current()._attrib;
    if (current_attrib_list) {
      current_attrib_list.push(new_attrib);
    } else {
      this.current()._attrib = [new_attrib];
    }
    return new_attrib;
  }

  private getLastAttrib(): AttribInfo {
    let current_attrib_list = this.current()._attrib;
    if (current_attrib_list) {
      let list = current_attrib_list;
      let latest_attrib = list[list.length - 1];
      return latest_attrib;
    } else {
      throw new Error(`Can't append attribute name when record undefined for input: '${this._input}'`);
    }   
  }

  private clearPseudoElement() : void {
    this.current()._pseudo_element = '';
  }

  private appendPseudoElement() : void {
    this.current()._pseudo_element += this._input;
  }

  private savePseudoElement() : void {}

  private clearPseudoClass() : void {
    this.current()._pseudo_class = '';
  }

  private appendPseudoClass() : void {
    this.current()._pseudo_class += this._input;
  }

  private savePseudoClass() : void {}

}