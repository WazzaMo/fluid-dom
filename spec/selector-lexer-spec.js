
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

    });

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

    });

  }); //-- lex_selector()

});