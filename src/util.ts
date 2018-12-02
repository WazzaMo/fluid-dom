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

/**
 * Takes any two arrays and creates a new
 * merged array. Does not de-duplicate.
 * @param a1 - first array to merge
 * @param a2 - second array to merge
 * @returns - new array with merged data.
 */
export function merge_array<T>(a1: Array<T>, a2: Array<T>) {
  let final : Array<T> = [];
  final = final.concat(a1);
  final = final.concat(a2);
  return final;
}

/**
 * Takes an array reference and empties all
 * content from that array. Can be used to
 * empty an array reference held by another object.
 * @param array - array to empty out.
 */
export function empty_array<T>(array: Array<T>) : void {
  while( !! array && array.length > 0) {
    array.pop();
  }
}

/**
 * Looks for duplicate object references in an
 * array and returns a new array without the
 * duplicates. Not very efficient 
 * - this is O(n^2)
 * @param array - array to examine.
 */
export function remove_dups<T>(
  array: Array<T>
) : Array<T> {
  let dedup : Array<T> = [];

  function doesNotHaveRefEqualObject(x:T) {
    return dedup.indexOf(x) < 0;
  }

  for(var index = 0; index < array.length; index++) {
    let item = array[index];
    if (doesNotHaveRefEqualObject(item)) {
      dedup.push(item);
    }
  }
  return dedup;
}