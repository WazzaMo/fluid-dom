

export function providesAll(list, args) {
  var message = ''
  for(var expectedArg of list) {
    var value = args[expectedArg]
    if (!value) {
      message += `Value for ${expectedArg} was not provided.\n`
    }
  }
  if (!!message) {
    console.error(`Expected ${list.length} parameters:\n${message}`)
    return false
  }
  return true
}

export function providesOne(list, args) {
  var valuesOfArgs = list.map( expectedWord => args[expectedWord] )
  var isAnyNotUndefined = valuesOfArgs.find( x => x != undefined )
  if (!isAnyNotUndefined) {
    var argumentNames = list.reduce( (arg1, arg2) => `${arg1}, ${arg2}`)
    console.error(`One of these parameters were expected ${argumentNames} but none had a value!`)
  }
  return !!isAnyNotUndefined
}

export function logWarning(message) {
  console.warn("FluidDOM: " + message)
}