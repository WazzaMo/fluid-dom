/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


export function providesAll(list: Array<string>, args:any ) {
  var message = ''
  for(var expectedArg of list) {
    var hasValue: boolean = args[expectedArg] != undefined
    if (! hasValue) {
      message += `Value for ${expectedArg} was not provided.\n`
    }
  }
  if (!!message) {
    console.error(`Expected ${list.length} parameters:\n${message}`)
    return false
  }
  return true
}

export function providesOne(list: Array<string>, args: any) {
  var definitionMissing = list.filter( word => args[word] === undefined )
  var isOneMatched = definitionMissing.length === (list.length - 1 )
  if ( isOneMatched ) {
    var argumentNames = list.reduce( (arg1, arg2) => `${arg1}, ${arg2}`)
    console.error(`One of these parameters were expected ${argumentNames} but none had a hasValue!`)
  }
  return isOneMatched
}

export function logWarning(message: string) {
  console.warn("FluidDOM: " + message)
}

export function merge_array<T>(a1: Array<T>, a2: Array<T>) {
  let final : Array<T> = [];
  final = final.concat(a1);
  final = final.concat(a2);
  return final;
}

export function empty_array<T>(array: Array<T>) : void {
  while( !! array && array.length > 0) {
    array.pop();
  }
}