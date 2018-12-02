
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

      doc.create_child_element('body', body => {
        body.create_child_element( 'DIV');
        body.create_child_element( 'P', p => p.text_value = random_text );
        root = body;
      });

      subject = parser.parseWith( root );
    }); // -- where multiple basic selectors

    it('must return two elements', ()=> expect(subject.length).toBe(2) );

    it('must return DIV for the first element', ()=> expect(subject[0].tag).toBe('DIV') );
    it('must return P for the second element', ()=> expect(subject[1].tag).toBe('P') );
    it('must have given text_value on P element', ()=> {
      expect(subject[1].text_value).toBe( random_text )
    });

  });

  describe("when parent and then child selectors: ", () => {
    let subject;
    let _body, _div, _para;
    let randValuePara, randValueDiv;
    
    beforeEach( () => {
      doc = fluid.Doc();
      randValuePara = randomString();
      randValueDiv = randomString();

      doc.create_child_element('body', body => {
        body.create_child_element('div', div => {
          div.text_value = randValueDiv;
          div.create_child_element('p', p=> {
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
      _div.create_child_element('p', p => {
        para2 = p;
        p.id('second');
      });
      subject = parser.parseWith(doc.root_node);
      expect(subject).toEqual([_para, para2]);
    });

    it('must find a second div if it is added before parsing: ', ()=> {
      let parser = new fluid.MockSelectorParser('body>div');
      let div2;
      _body.create_child_element('div', d => {
        div2 = d;
        d.id('2nd-div');
      });
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
      doc.create_child_element('body', body => {
        body.create_child_element('div', div => {
          div.create_child_element('p', p => {
            attrib = anyAttrib();
            attrib_value = randomString();
            p.attrib(attrib, attrib_value);
            para_with_attrib = p;
            p.id('fred');
          });
          div.create_child_element('p', p => para_basic = p);
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

    it ('must match ID: ', ()=> {
      let mp = new fluid.MockSelectorParser(`p#fred`);
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [para_with_attrib] );
    })

  }); //-- when using attributes

  describe('when seeking descendents: ', ()=> {
    let subject;
    let expected;

    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', body=> {
        body.create_child_element('div', div_main => {
          div_main.id('main');
          div_main.create_child_element('descendent', desc => {
            expected = desc;
            desc.attrib('main', 'main');
          });
        });
      })
    });

    it ('must find the descendent: ', ()=> {
      let parser = new fluid.MockSelectorParser(`body descendent`);
      subject = parser.parseWith( doc.root_node);
      expect( subject ).toEqual([expected]);
    });

    it ('must find descendent by attribute: ', ()=> {
      let parser = new fluid.MockSelectorParser('body [main]');
      subject = parser.parseWith( doc.root_node );
      expect( subject ).toEqual( [expected] );
    });

  }); //--- descendents

  describe('where mismatch happens early: ', ()=> {

    let subject;
    
    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', body=> {
        body.create_child_element('content', content => {
          _content = content;
          content.create_child_element('p', p=> {
            _pMain = p;
            p.attrib('main', 'main');
          });
        });
      });
    });

    it ('must not match on mismatched tag: ', ()=> {
      let mp = new fluid.MockSelectorParser('nonexistent');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [] );
    });

    it ('must not match correct child of mismatched ancestor: ', ()=> {
      let mp = new fluid.MockSelectorParser('nonexistent>[main]');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [] );
    });

    it ('must not match correct descendent of mismatched ancestor: ', ()=> {
      let mp = new fluid.MockSelectorParser('nonexistent [main]');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [] );
    });

  }); //-- early mismatch

  describe( 'where changing child / descendent navigation: ', () => {

    let subject;
    let _head, _content, _footer;
    let _pMain, _pOther;
    let list_li, li_first, li_third;
    
    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', body=> {
        body.create_child_element('head', head=> {
          _head = head;
        });
        body.create_child_element('content', content => {
          _content = content;
          content.create_child_element('p', p=> {
            _pMain = p;
            p.attrib('main', 'main');
          });
          content.create_child_element('p', p=> {
            _pOther = p;
            p.id('other');
          });

          content.create_child_element('div', div=> {
            div.id('nav');
            div.create_child_element('ul', ul=> {
              list_li = [];
              ul.create_child_element('li', li=> {
                li.id('first');
                li_first = li;
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('second');
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('third');
                list_li.push(li);
                li_third = li;
              });
            })
          })
        });
        body.create_child_element('footer', footer => {
          _footer = footer;
        });
      });
    });

    it ('must find target from parent>child descendent target: ', ()=> {
      let mp = new fluid.MockSelectorParser('html>body p');
      subject = mp.parseWith( doc.root_node );
      expect( subject ).toEqual( [_pMain, _pOther] );
    });

    it ('must find target from parent>child descendent parent>child target: ', ()=> {
      let mp = new fluid.MockSelectorParser('content ul>li');
      subject = mp.parseWith( doc.root_node );
      expect( subject ).toEqual( list_li );
    });

    it ('must find series of descendents and then find a child: ', () => {
      let mp = new fluid.MockSelectorParser('html content ul>li');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( list_li );
    });

    it ('must find series of children then descendent: ', ()=> {
      let mp = new fluid.MockSelectorParser('body>content>div li');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( list_li );
    });

    it ('must find list of selectors with one having descendents by attrib: ', ()=> {
      let mp = new fluid.MockSelectorParser('head,content li[id="first"], footer');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [_head, li_first, _footer] );
    });

    it ('must find list of selectors with one having parent-child path: ', ()=> {
      let mp = new fluid.MockSelectorParser('head,div>ul>li[id="third"], content>[main]');
      subject = mp.parseWith(doc.root_node);
      expect( subject ).toEqual( [_head, li_third, _pMain] );
    });

  }); //-- changing child / descendent nav

  describe ('when seeking adjacent siblings: ', ()=> {
   
    let subject;
    let _content;
    let _pMain, _pOther;
    let list_li, li_first, li_third;
    let _ul;
    
    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', body=> {
        body.create_child_element('content', content => {
          _content = content;
          content.create_child_element('p', p=> {
            _pMain = p;
            p.attrib('main', 'main');
          });
          content.create_child_element('p', p=> {
            _pOther = p;
            p.id('other');
          });

          content.create_child_element('div', div=> {
            div.id('nav');
            div.create_child_element('ul', ul=> {
              _ul = ul;
              list_li = [];
              ul.create_child_element('li', li=> {
                li.id('first');
                li_first = li;
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('second');
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('third');
                list_li.push(li);
                li_third = li;
              });
            })
          })
        });
      });
    });

    it ('must find chain of LI tags to find third one: ', ()=> {
      let mp = new fluid.MockSelectorParser(`li+li+li`);
      subject = mp.parseWith( doc.root_node );
      expect( subject.length ).toEqual( 1 );
      expect( subject ).toEqual( [li_third] );
    });

    it (`must find 'P' tags main then other: `, ()=>{
      let mp = new fluid.MockSelectorParser(`p[main]+p#other`);
      subject = mp.parseWith(doc.root_node);
      expect( subject.length ).toEqual(1);
      expect( subject ).toEqual( [ _pOther ]);
    });

    it (`must find 3 'LI' tags of 5 when 3 siblings needed: `, ()=>{
      let li1 = li_third, li2, li3;

      let mp = new fluid.MockSelectorParser(`li+li+li`);
      _ul.create_child_element('LI', li => {
        li2 = li;
        li.attrib('num', '2');
      });
      _ul.create_child_element('LI', li => {
        li3 = li;
        li.attrib('num', '3');
      });
      subject = mp.parseWith(doc.root_node);
      expect( subject.length ).toEqual(3);
      expect( subject ).toEqual( [ li1, li2, li3 ]);
    });

  }); // adjacent siblings

  describe ('when seeking general siblings: ', ()=> {
   
    let subject;
    let _content;
    let _pMain, _pOther;
    let _divNav;
    let list_li, li_first, li_third;
    let _ul;
    
    beforeEach( ()=> {
      doc = fluid.Doc();
      doc.create_child_element('body', body=> {
        body.create_child_element('content', content => {
          _content = content;
          content.create_child_element('p', p=> {
            _pMain = p;
            p.attrib('main', 'main');
          });
          content.create_child_element('p', p=> {
            _pOther = p;
            p.id('other');
          });

          content.create_child_element('div', div=> {
            _divNav = div;
            div.id('nav');
            div.create_child_element('ul', ul=> {
              _ul = ul;
              list_li = [];
              ul.create_child_element('li', li=> {
                li.id('first');
                li_first = li;
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('second');
                list_li.push(li);
              });
              ul.create_child_element('li', li=> {
                li.id('third');
                list_li.push(li);
                li_third = li;
              });
            })
          })
        });
      });
    });

    it (`must find 'P' then div: `, ()=>{
      let mp = new fluid.MockSelectorParser(`p~div`);
      subject = mp.parseWith(doc.root_node);

      expect( subject.length ).toEqual(1);
      expect( subject ).toEqual( [ _divNav ]);
    });

    it ('must find general sibling chain of 3 LI tags to find third: ', ()=> {
      let mp = new fluid.MockSelectorParser(`li~li~li`);
      subject = mp.parseWith( doc.root_node );
      expect( subject.length ).toEqual( 1 );
      expect( subject ).toEqual( [li_third] );
    });

    it (`must find 3rd, 4th and 5th 'LI' tags of 5 for li~li~li: `, ()=>{
      let li1 = li_third, li2, li3;

      let mp = new fluid.MockSelectorParser(`li~li~li`);
      _ul.create_child_element('LI', li => {
        li2 = li;
        li.attrib('num', '2');
      });
      _ul.create_child_element('LI', li => {
        li3 = li;
        li.attrib('num', '3');
      });
      subject = mp.parseWith(doc.root_node);
      expect( subject.length ).toEqual(3);
      expect( subject ).toEqual( [ li1, li2, li3 ]);
    });

  }); // general siblings

});