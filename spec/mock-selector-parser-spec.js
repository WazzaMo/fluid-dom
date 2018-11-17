let fluid = require('../fluid-dom.mock');

function randomString() {
  let num = Math.floor( Math.random() * 100 );
  return `[VALUE: ${num}]`;
}

describe("MockSelectorParser", ()=> {
  let doc;

  describe("where multiple basic selectors, ", ()=> {
    let selector;
    let parser;
    let root;
    let subject;
    let random_text;

    beforeEach( ()=> {
      doc = fluid.Doc();
      selector = 'DIV, P';
      parser = new fluid.MockSelectorParser(selector);
      random_text = randomString();

      doc.create_child_element('body', undefined, body => {
        body.create_child_element( 'DIV');
        body.create_child_element( 'P', undefined, p => p.text_value = random_text );
        root = body;
      });

      subject = parser.parseWith( root );
    });

    it('must return two elements', ()=> expect(subject.length).toBe(2) );

    it('must return DIV for the first element', ()=> expect(subject[0].tag).toBe('DIV') );
    it('must return P for the second element', ()=> expect(subject[1].tag).toBe('P') );
    it('must have given text_value on P element', ()=> expect(subject[1].text_value).toBe( random_text ));

  });

  describe("when parent and then child selectors: ", () => {
    let selector;
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

  });
});