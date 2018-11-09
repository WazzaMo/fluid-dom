import {IElement} from '../src/i-element';
import {MockDom, MockAttributes, MockElement } from '../src/fluid-mock';


let doc = new MockDom(
  'body',{
    id: 'top-level'
  },
  (body: MockElement)=>{
    body.create('div', {class: 'nav'},
      (div_nav: MockElement)=>{
        div_nav.create('p').text('hi there');
      }
    )
  }
);