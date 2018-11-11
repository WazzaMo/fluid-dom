

let mockfluid = require('../../fluid-dom.commonjs.mock');


let doc = new mockfluid.MockDocument();
doc.create_child_element(
  'body',undefined,
  (body: any)=> {
    body.create_child_element(
      'div',
      'top-line',
      (div_nav: any)=> {
        div_nav.create_child_element('p', undefined,
          (p:any) =>p.text_value = 'hi there'
        );
        div_nav.attrib('class', 'highlight');
      }
    )
  }
);

console.log( doc.toHtml() );