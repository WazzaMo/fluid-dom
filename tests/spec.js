
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
    element.element.setAttribute(attrib, true)
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

function Test(id) {
  this.id = id

  this.for_target = function(targetSelector) {
    this.target = document.querySelector(targetSelector)
  }

  this.for_all_targets = function(selector) {
    this.all_targets = document.querySelectorAll(selector)
  }

  this.expectAttribute = function(name) {
    this.checkTargets( element => element.hasAttribute(name))
  }

  this.getHandler = function(domElement) {
    var handlerFired = makeHandlerName(domElement)
    domElement.setAttribute(handlerFired, false)
    return function() {
      domElement.setAttribute(handlerFired, true)
    }
  }

  this.expectHandler = function(eventName) {
    function testEvent(element) {
      var handlerToFire = makeHandlerName(element)
      var event = new Event(eventName)
      element.dispatchEvent(event)
      return element.getAttribute(handlerToFire) === "true"
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