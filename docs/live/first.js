//var fluid = require('commonjs-fluid-dom')

var dom = new fluid.DOM()

function test() {
    var replace_demo = dom.findElement({id: 'replace_demo'})
    replace_demo.html('<b>This is the life!</b>')
}

function setupAttribDemo() {
    var attrib_demo = dom.findElement({id: 'attrib_demo'})
    var button = attrib_demo.selectFirst('button')
    var hidables = attrib_demo.findAll({selector:'.hidable'})
    button.on({
        event: dom.events.CLICK,
        handler: function() {
            hidables.each( function( thing) {
                if (thing.attributes().has('hidden')) {
                    thing.attributes().remove('hidden')
                } else {
                    thing.attributes().set('hidden', true)
                }
            })
        }
    })
}

function iterationDemoAddClass() {
    dom.findElement({id:'iteration'})
        .findAll({selector:'ul>li'})
        .each( li => li.classes().add('fancy') )
}

function iterationDemoAddMouseOverEvent() {
    dom.findAll({selector:'#iteration>ul>li'})
        .each(item => item.on({
            event: fluid.Events.MOUSEOVER,
            handler: () => alert('Mouse over list item')
        }))
}

function summariseList() {
    var summary = dom
        .findAll({tagName: 'li'})
        .map( li => li.text() )
        .reduce( (li1, li2) => `${li1}, ${li2}` )
    console.log(summary)
}

function replaceYayWithBoo() {
    dom.findAll({tagName: 'li'})
    .each(item => item.text( item.text().replace(/yay/,'boo') ))
}

function setup() {
    test()
    setupAttribDemo()
}

window.onload = setup