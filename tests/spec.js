/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


function failed(id) {
  document.getElementById(id).className = 'fail'
}

function passed(id) {
  document.getElementById(id).className = 'pass'
}

function isElementList(list) {
  return typeof(list.each) === 'function'
}

function isElement(element) {
  return typeof(element.findAll) === 'function'
}

function markElementWith(element, attrib) {
  if (isElement(element)) {
    element.domElement.setAttribute(attrib, true)
  } else {
    element.setAttribute(attrib, true)
  }
}

function markAllElementsWith(elementList, attrib) {
  var list = undefined
  if (isElementList(elementList)) {
    list = elementList.elementList
  } else {
    list = elementList
  }
  for(var element of list) {
    markElementWith(element, attrib)
  }
}

function makeHandlerName(domElement) {
  return `handler-${domElement.tagName}`
}

const Test = function(id) {
  this.id = id
  var that = this
  this.for_target = function(targetSelector) {
    that.target = document.querySelector(targetSelector)
  }

  this.for_all_targets = function(selector) {
    that.all_targets = document.querySelectorAll(selector)
  }

  this.expectAttribute = function(name) {
    that.checkTargets( domElement => domElement.hasAttribute(name))
  }

  this.getHandler = function(domElement) {
    var handlerFired = makeHandlerName(domElement)
    domElement.setAttribute(handlerFired, false)
    return function() {
      domElement.setAttribute(handlerFired, true)
    }
  }

  this.expectHandler = function(eventName) {
    function testEvent(domElement) {
      var handlerToFire = makeHandlerName(domElement)
      var event = new Event(eventName)
      domElement.dispatchEvent(event)
      return domElement.getAttribute(handlerToFire) === "true"
    }
    this.checkTargets(testEvent)
  }

  this.checkTargets = function(withTask) {
    if (!!this.target && withTask(this.target)){
      passed(this.id)
    } else if (!! this.all_targets) {
      var all_true = true

      for(var index = 0; all_true && index < this.all_targets.length; index++) {
        all_true = withTask( this.all_targets[index] )
      }
      if (all_true) {
        passed(this.id)
      } else {
        failed(this.id)
      }
    } else {
      failed(this.id)
    }
  }

  this.execute = function(task) {
    failed(this.id) // by default
    try {
      task()
    } catch (error) {
      failed(this.id)
      console.error("Failed with exception! " + error)
    }
  }
}

const spec = {
  failed:               failed,
  passed:               passed,
  isElementList:        isElementList,
  isElement:            isElement,
  markElementWith:      markElementWith,
  markAllElementsWith:  markAllElementsWith,
  makeHandlerName:      makeHandlerName,
  Test:                 Test
}