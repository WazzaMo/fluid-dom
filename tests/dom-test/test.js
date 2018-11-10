var dom = new fluid.DOM()

function findElement_id() {
  var test = new spec.Test('findElement_id')
  test.for_target('#single')
  test.execute( ()=> {
    var single = dom.findElement({id: 'single'})
    single.attributes().add('single-found', true);
    test.expectAttribute('single-found')
  })
}

function findElement_selector() {
    var test = new spec.Test('findElement_selector')
    test.for_target('body>ul')
    test.execute( () => {
        var body_ul = dom.findElement({selector: 'html>body>ul'})
        body_ul.attributes().add('ul_found', true);
        test.expectAttribute('ul_found')
    })
}

function findAll_selector() {
    var test = new spec.Test('findAll_selector')
    test.for_all_targets('ul>li')
    test.execute( () => {
        var list_li = dom.findAll({selector: 'ul>li'})
        list_li.forEach( element => element.attributes().add('li_list', true));
        test.expectAttribute('li_list')
    })
}

function findAll_class() {
    var test = new spec.Test('findAll_class')
    test.for_all_targets('.class-target')
    test.execute( () => {
        var list_class = dom.findAll({class: 'class-target'})
        list_class.forEach( element => element.attributes().add('class-found', true) );
        test.expectAttribute('class-found')
    })
}

function findAll_tagName() {
    var test = new spec.Test('findAll_tagName')
    test.for_all_targets('ul>li')
    test.execute(() => {
        var list_tag = dom.findAll({tagName: 'li'});
        list_tag.forEach(element => element.attributes().add('tag-found', true));
        test.expectAttribute('tag-found')
    })
}

function buttonOn() {
    var test = new spec.Test('buttonOn')
    test.for_target('#me')
    test.execute(()=>{
        dom.buttonOn({
            id: 'me',
            event: 'click',
            handler: test.getHandler(document.getElementById('me'))
        })
        test.expectHandler('click')
    })
}

function run_tests() {
  findElement_id()
  findElement_selector()
  findAll_selector()
  findAll_class()
  findAll_tagName()
  buttonOn()
}
