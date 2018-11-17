let fluid = require('../fluid-dom.mock');

function randomString() {
  let num = Math.floor( Math.random() * 100 );
  return `[VALUE: ${num}]`;
}

describe("MockSelectorParser", ()=> {
  let doc;

  beforeAll( ()=> doc = fluid.Doc() );

  describe("where multiple basic selectors, ", ()=> {
    let selector;
    let parser;
    let root;
    let subject;
    let random_text;

    beforeEach( ()=> {
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
});