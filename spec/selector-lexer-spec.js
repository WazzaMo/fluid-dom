
//  Fluid DOM for JavaScript
//  (c) Copyright 2018 Warwick Molloy
//  Available under the MIT License

let fluid = require('../fluid-dom.mock');

let {
  has_tag,
  with_tag,
  has_class,
  with_class,
  has_id,
  with_id
} = fluid;

describe('selector-lexer', ()=> {
  let lexer;

  beforeEach( ()=> {
    lexer = new fluid.SelectorLexer() 
  });

  describe('lex_selector() :', () => {

    describe('when simple tag:', () => {

      it('must get DIV for tag "div" ',()=> {
        lexer.lex_selector('div')
        expect( has_tag( lexer.tokens ) ).toBeTruthy();
        expect( lexer.tokens._tag ).toEqual('DIV');
      });

      it('must get "DIV" when " div " ',()=> {
        lexer.lex_selector(' div ');
        expect( lexer.tokens._tag).toEqual('DIV');
      });

    }); // simple tag

    describe('when simple class: ', ()=> {
      
      it('must get class "rabbit" for ".rabbit"', () => {
        lexer.lex_selector('.rabbit');
        expect( lexer.tokens._class).toEqual('rabbit');
      });

      it('must get "rabbit" for " .rabbit "', ()=> {
        lexer.lex_selector(' .rabbit ');
        expect( lexer.tokens._class ).toEqual('rabbit');
      });

    }); // simple class

    describe('when simple tag: ', ()=> {

      it('must get id "main3" for "#main3"', ()=> {
        lexer.lex_selector('#main3');
        expect( lexer.tokens._id ).toEqual('main3');
      });

      it('must get id "main3" for " #main3 "', ()=> {
        lexer.lex_selector(' #main3 ');
        expect( lexer.tokens._id ).toEqual('main3');
      });

    }); // simple id

    describe('when handling children: ', ()=> {

      it('must error out when ">tag" ', () => {
        expect(
          ()=> lexer.lex_selector('>div')
        ).toThrowError(
          `Error before selector with character '>'`
        );
      });

      it('must get "PARENT" -> "CHILD" from "parent>child" ', ()=> {
        lexer.lex_selector('parent>child');
        expect(lexer.tokens._tag).toEqual('PARENT');
        expect(lexer.tokens._child).toBeDefined();
        expect(lexer.tokens._child._tag).toEqual('CHILD');
      });

      it('must get "PARENT" -> "CHILD" from " parent > child " ', ()=> {
        lexer.lex_selector(' parent > child ');
        expect(lexer.tokens._tag).toEqual('PARENT');
        expect(lexer.tokens._child).toBeDefined();
        expect(lexer.tokens._child._tag).toEqual('CHILD');
      });

    }); // parent child

    describe('when handling descendents: ', ()=> {

      it('must get "PARENT" ->-> "DESCENDENT" from "parent descendent" ', ()=> {
        lexer.lex_selector('parent descendent');
        expect(lexer.tokens._tag).toEqual('PARENT');
        expect(lexer.tokens._descendent).toBeDefined();
        expect(lexer.tokens._descendent._tag).toEqual('DESCENDENT');
      });

      it('must get "PARENT" ->-> "DESCENDENT" from " parent  descendent " ', ()=> {
        lexer.lex_selector(' parent  descendent ');
        expect(lexer.tokens._tag).toEqual('PARENT');
        expect(lexer.tokens._descendent).toBeDefined();
        expect(lexer.tokens._descendent._tag).toEqual('DESCENDENT');
      });

    }); // descendent

    describe('when handling attribute names: ', ()=> {

      it('must get attrib name "main" from "[main]" :', ()=> {
        lexer.lex_selector('[main]');
        expect(lexer.tokens._attrib[0].name).toEqual('main');
      });

      it('must multiple attribute names :', ()=> {
        lexer.lex_selector('[main][then]');
        expect(lexer.tokens._attrib[0].name).toEqual('main');
        expect(lexer.tokens._attrib[1].name).toEqual('then');
      });

      it('throws error when right bracket not closed (]): ', ()=> {
        expect( ()=> lexer.lex_selector('[main')).toThrowError(`Error in attribute: missing ']'`)
      });

    }); // attributes

    describe('when attributes have values: ', ()=> {

      it('must get the attrib name and value: ', ()=> {
        lexer.lex_selector('[name="value"]');
        expect(lexer.tokens._attrib[0].name).toEqual('name');
        expect(lexer.tokens._attrib[0].value).toBeDefined();
        expect(lexer.tokens._attrib[0].value).toEqual('value');
      });

      it('must accept multiple atttribute name/value pairs: ', ()=>{
        lexer.lex_selector('[Name1="n.# 1"][Name2="n2"]');
        expect(lexer.tokens._attrib[0].name).toEqual('Name1');
        expect(lexer.tokens._attrib[0].value).toEqual('n.# 1');
        expect(lexer.tokens._attrib[1].name).toEqual('Name2');
        expect(lexer.tokens._attrib[1].value).toEqual('n2');
      });

    }); // attributes & values

  }); //-- lex_selector()

});