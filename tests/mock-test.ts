

let mockfluid = require('../../fluid-dom.commonjs.mock');

import { ElementNode } from '../src/mock-document-nodes';

let doc = new mockfluid.MockDocument();
doc.create_child_element(
  'body', '_body',
  (body: any)=> {
    body.create_child_element(
      'div',
      'top-line',
      (div_nav: any)=> {
        div_nav.create_child_element('p', 'para1',
          (p:any) =>p.text_value = 'hi there'
        );

        div_nav.attrib('class', 'highlight');
      }
    );

    body.create_child_element(
      'div', '_div_2',
      (div_2: any) => {
        div_2.create_child_element('p', 'para2', (p:any)=> p.text_value = 'Second');
        div_2.attrib('class', 'highlight');
      }
    );
  }
);

console.log( doc.toHtml() );

console.log("Attempt to find id='para2':");
let para2 = doc.root_node.queryById('para2');
console.log(`Found: ${para2}`);

console.log("\nAttempt to find id='top-line':");
let top_line = doc.root_node.queryById('top-line');
console.log(`Found: ${top_line} \n`);

// ---
console.log("\nQuery by class");
let list :Array<ElementNode> = [];
doc.root_node.queryByClass('highlight', list);

list.forEach(item => console.log(`seeking 'highlight': ${item}`));

console.log("\n\nQuery by Tag");
list = [];
doc.root_node.queryByTag('p', list);
list.forEach(item => console.log(`P... ${item}`));