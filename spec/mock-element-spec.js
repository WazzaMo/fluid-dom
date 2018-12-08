
//  Fluid DOM for JavaScript
//  (c) Copyright 2018 Warwick Molloy
//  Available under the MIT License

let fluid = require('../fluid-dom.mock');

describe ('MockElement', ()=> {

  let root;
  let mockHtml;

  beforeEach( ()=> {
    root = new fluid.ElementNode('HTML');
    mockHtml = new fluid.MockElement(root);
  });

  describe('Simple methods: MockElement provides', ()=>{
    let fullbody;

    beforeEach(()=>{
      root.create_child_element('div', div=>{
        fullbody = new fluid.MockElement( div );
        div.id('fullbody');
        div.attrib('class', 'megabody');
      });
    });

    it ('can call hasId()', ()=> expect(fullbody.hasId()).toBeTruthy() );
    it ('can call getId()', ()=> expect(fullbody.getId()).toEqual('fullbody') );
    it ('can call exists()', ()=> expect(fullbody.exists()).toBeTruthy() );
    it ('can call tagName()', ()=> expect(fullbody.tagName()).toEqual('DIV') );
  }); // --- Simple Methods

  describe('findAll',()=> {

    beforeEach(()=> {
      root.create_child_element('body', body=> {
        body.create_child_element('div', div=>{

          div.create_child_element('p', p=>{
            p.id('p1');
            p.create_child_text('Hi there');
          });

          div.create_child_element('p', p=> {
            p.id('p2');
            p.attrib('class','fred');
            p.create_child_text('second message');
          });
        });

        body.create_child_element('div', div=> {
          div.create_child_element('span', s=> s.attrib('class', 'fred'));
        });
      }); //body
    });

    it ('can find p1 by selector #p1', ()=> {
      let [p1] = mockHtml.findAll({selector: '#p1'});
      expect(p1.hasId()).toBeTruthy();
      expect(p1.getId()).toEqual('p1');
    });

    it ('can find p1 and p2 by selector with parent-child', ()=>{
      let ptags = mockHtml.findAll({selector: 'div>p'});
      expect(ptags.length).toEqual(2);
      let [p1,p2] = ptags;
      expect(p1.getId()).toEqual('p1');
      expect(p2.getId()).toEqual('p2');
    });

    it ('find find tags by tagName', ()=> {
      let ptags = mockHtml.findAll({tagName: 'p'});
      expect(ptags.length).toBe(2);
      let[p1,p2] = ptags;
      expect(p1.getId()).toEqual('p1');
      expect(p2.getId()).toEqual('p2');
    });

    it ('can find tags by class', ()=> {
      let freds = mockHtml.findAll({class: 'fred'});
      expect(freds.length).toBe(2);
      let [p2, span] = freds;
      expect(p2.getId()).toEqual('p2');
      expect(span.tagName()).toEqual('SPAN');
    });

  }); //-- findAll

  describe('text(): ', ()=> {
    let _bold;
    let _p;
    let _div1;

    beforeEach(()=>{
      root.create_child_element('body', body=> {
        body.create_child_element('div', div=> {
          div.id('div1');
          _div1 = div;
          div.create_child_element('p', p=> {
            p.create_child_text('hi there');
            p.create_child_element('b', b=> {
              b.create_child_text('Fred');
              _bold = b;
            });
            p.create_child_text('Yay');
            _p = p;
          });
        });
      });
    });

    it ('returns the text of single text value:', ()=>{
      let bold = new fluid.MockElement(_bold);
      expect(bold.text()).toEqual('Fred\n');
    });

    it ('returns the text child of an element', ()=>{
      let all_text = 'hi there\n' + 'Fred\n' + 'Yay\n';
      let p = new fluid.MockElement(_p);
      expect( p.text() ).toEqual( all_text );
    });

    it ('returns the appended text of all text children', ()=>{
      let all_text = 'hi there\n' + 'Fred\n' + 'Yay\n';
      let div = new fluid.MockElement(_div1);
      expect( div.text() ).toEqual( all_text );
    });

    it ('sets the text value, replacing all children if given text param', ()=>{
      let div = new fluid.MockElement( _div1 );
      div.text('new text');
      expect(div.text()).toEqual('new text\n');
    });

  }); //--- text()

}); // MockElement