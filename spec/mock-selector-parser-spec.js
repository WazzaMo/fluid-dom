
//  Fluid DOM for JavaScript
//  (c) Copyright 2018 Warwick Molloy
//  Available under the MIT License


let fluid = require('../fluid-dom.mock');

function randomInt() {
  return Math.floor( Math.random() * 100 );
}

function randomString() {
  let num = randomInt();
  return `[VALUE: ${num}]`;
}

function anyAttrib() {
  return `attrib_${randomInt()}`;
}

function dumpList(list) {
  list.forEach( (item, index) => console.log(`#${index}: ${item}`));
}

describe("MockSelectorParser", ()=> {
  let doc;

  describe("where multiple basic selectors, ", ()=> {
    let parser;
    let root;
    let subject;
    let random_text;

    beforeEach( ()=> {
      doc = fluid.Doc();
      parser = new fluid.MockSelectorParser('DIV, P');
      random_text = randomString();

      doc.create_child_element('body', undefined, body => {
        body.create_child_element( 'DIV');
        body.create_child_element( 'P', undefined, p => p.text_value = random_text );
        root = body;
      });

      subject = parser.parseWith( root );
    }); // -- where multiple basic selectors

    it('must return two elements', ()=> expect(subject.length).toBe(2) );

    it('must return DIV for the first element', ()=> expect(subject[0].tag).toBe('DIV') );
    it('must return P for the second element', ()=> expect(subject[1].tag).toBe('P') );
    it('must have given text_value on P element', ()=> expect(subject[1].text_value).toBe( random_text ));

  });

  describe("when parent and then child selectors: ", () => {
    let subject;
    let _body, _div, _para;
    let randValuePara, randValueDiv;
    
    beforeEach( () => {
      doc = fluid.Doc();
      randValuePara = randomString();
      randValueDiv = randomString();

      doc.create_child_element('body', undefined, body => {
        body.create_child_element('div', undefined, div => {
          div.text_value = randValueDiv;
          div.create_child_element('p', undefined, p=> {
            p.text_value = randValuePara;
            p.attrib('main','message');
            _para = p;
          });
          _div = div;
        });
        _body = body;
      });
    });

    it('must find the para element: ', ()=> {
      let parser = new fluid.MockSelectorParser('BODY > DIV> p');
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([_para])
    });

    it('must find the para element by attribute: ', ()=> {
      let parser = new fluid.MockSelectorParser('BODY > DIV> [main]');
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([_para])
    });

    it('must find two paragraphs if a second is added before parsing:', ()=>{
      let parser = new fluid.MockSelectorParser('body > div > p');
      let para2;
      _div.create_child_element('p', 'second', p => para2 = p);
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([_para, para2]);
    });

    it('must find a second div if it is added before parsing: ', ()=> {
      let parser = new fluid.MockSelectorParser('body>div');
      let div2;
      _body.create_child_element('div', '2nd-div', d => div2 = d);
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([_div, div2]);
    });

    it('The paragraph found must have correct text: ', ()=>{
      let parser = new fluid.MockSelectorParser('body>div>p');
      subject = parser.parseWith(doc.root_node);
      expect(subject[0].text_value).toEqual(randValuePara);
    });

  }); // -- when parent and then child selectors

  describe("when using attributes: ", () => {
    let subject;
    let para_with_attrib, para_basic;
    let attrib, attrib_value;

    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', undefined, body => {
        body.create_child_element('div', undefined, div => {
          div.create_child_element('p', undefined, p => {
            attrib = anyAttrib();
            attrib_value = randomString();
            p.attrib(attrib, attrib_value);
            para_with_attrib = p;
          });
          div.create_child_element('p', undefined, p => para_basic = p);
        });
      });
    });

    it('must find para using attrib name only', ()=> {
      let parser = new fluid.MockSelectorParser(`p[${attrib}]`);
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([para_with_attrib]);
    });

    it('must match attrib by name and value:', () => {
      let parser = new fluid.MockSelectorParser(`p[${attrib}="${attrib_value}"]`);
      para_basic.attrib(attrib, "1");
      subject = parser.parseWith(doc.root_node);
      expect( subject ).toEqual( [para_with_attrib] );
    });

    it('must match all elements with specified attrib name:', () => {
      let parser = new fluid.MockSelectorParser(`p[${attrib}]`);
      para_basic.attrib(attrib, "1");
      subject = parser.parseWith(doc.root_node);
      expect( subject ).toEqual( [para_with_attrib, para_basic] );
    });

  }); //-- when using attributes
});