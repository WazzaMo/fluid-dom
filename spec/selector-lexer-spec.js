
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
        expect( lexer.tokens[0]._tag ).toEqual('DIV');
      });

      it('must get "DIV" when " div " ',()=> {
        lexer.lex_selector(' div ');
        expect( lexer.tokens[0]._tag).toEqual('DIV');
      });

    }); // simple tag

    describe('when simple class: ', ()=> {
      
      it('must get class "rabbit" for ".rabbit"', () => {
        lexer.lex_selector('.rabbit');
        expect( lexer.tokens[0]._class).toEqual('rabbit');
      });

      it('must get "rabbit" for " .rabbit "', ()=> {
        lexer.lex_selector(' .rabbit ');
        expect( lexer.tokens[0]._class ).toEqual('rabbit');
      });

    }); // simple class

    describe('when simple tag: ', ()=> {

      it('must get id "main3" for "#main3"', ()=> {
        lexer.lex_selector('#main3');
        expect( lexer.tokens[0]._id ).toEqual('main3');
      });

      it('must get id "main3" for " #main3 "', ()=> {
        lexer.lex_selector(' #main3 ');
        expect( lexer.tokens[0]._id ).toEqual('main3');
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
        expect(lexer.tokens[0]._tag).toEqual('PARENT');
        expect(lexer.tokens[0]._child).toBeDefined();
        expect(lexer.tokens[0]._child._tag).toEqual('CHILD');
      });

      it('must get "PARENT" -> "CHILD" from " parent > child " ', ()=> {
        lexer.lex_selector(' parent > child ');
        expect(lexer.tokens[0]._tag).toEqual('PARENT');
        expect(lexer.tokens[0]._child).toBeDefined();
        expect(lexer.tokens[0]._child._tag).toEqual('CHILD');
      });

    }); // parent child

    describe('when handling descendents: ', ()=> {

      it('must get "PARENT" ->-> "DESCENDENT" from "parent descendent" ', ()=> {
        lexer.lex_selector('parent descendent');
        expect(lexer.tokens[0]._tag).toEqual('PARENT');
        expect(lexer.tokens[0]._descendent).toBeDefined();
        expect(lexer.tokens[0]._descendent._tag).toEqual('DESCENDENT');
      });

      it('must get "PARENT" ->-> "DESCENDENT" from " parent  descendent " ', ()=> {
        lexer.lex_selector(' parent  descendent ');
        expect(lexer.tokens[0]._tag).toEqual('PARENT');
        expect(lexer.tokens[0]._descendent).toBeDefined();
        expect(lexer.tokens[0]._descendent._tag).toEqual('DESCENDENT');
      });

    }); // descendent

    describe('when handling attribute names: ', ()=> {

      it('must get attrib name "main" from "[main]" :', ()=> {
        lexer.lex_selector('[main]');
        expect(lexer.tokens[0]._attrib[0].name).toEqual('main');
      });

      it('must multiple attribute names :', ()=> {
        lexer.lex_selector('[main][then]');
        expect(lexer.tokens[0]._attrib[0].name).toEqual('main');
        expect(lexer.tokens[0]._attrib[1].name).toEqual('then');
      });

      it('throws error when right bracket not closed (]): ', ()=> {
        expect( ()=> lexer.lex_selector('[main')).toThrowError(`Error in attribute: missing ']'`)
      });

    }); // attributes

    describe('when attributes have values: ', ()=> {

      it('must get the attrib name and value: ', ()=> {
        lexer.lex_selector('[name="value"]');
        expect(lexer.tokens[0]._attrib[0].name).toEqual('name');
        expect(lexer.tokens[0]._attrib[0].value).toBeDefined();
        expect(lexer.tokens[0]._attrib[0].value).toEqual('value');
      });

      it('must accept multiple atttribute name/value pairs: ', ()=>{
        lexer.lex_selector('[Name1="n.# 1"][Name2="n2 % ()_--"]');
        expect(lexer.tokens[0]._attrib[0].name).toEqual('Name1');
        expect(lexer.tokens[0]._attrib[0].value).toEqual('n.# 1');
        expect(lexer.tokens[0]._attrib[1].name).toEqual('Name2');
        expect(lexer.tokens[0]._attrib[1].value).toEqual('n2 % ()_--');
      });

    }); // attributes & values

    describe('when multiple selectors given separated by comma: ', ()=> {

      it ('must get two entries for two selectors: ', () => {
        lexer.lex_selector('div,p');
        expect(lexer.tokens.length).toEqual(2);
      });

      it('must throw error when comma is last: ', ()=> {
        expect( ()=> lexer.lex_selector('div,') )
        .toThrowError('Error list of selectors was incomplete. Expected another selector.');
      });

    }); // comma sep selectors

    describe('when combining selector types: ', ()=> {

      it ('must handle tag and class specification: ', ()=> {
        lexer.lex_selector('div[id = "content"]');
        expect( lexer.tokens[0]._tag).toEqual('DIV');
        expect( lexer.tokens[0]._attrib).toEqual([{name:'id', value: 'content'}]);
      });

    });

    describe('when adjacents sibling (+) used to find A followed by B: ', ()=> {

      it ('must recognise adjacent sibling: ', ()=> {
        lexer.lex_selector('div+p');
        expect( lexer.tokens[0]._tag ).toEqual('DIV');
        expect( lexer.tokens[0]._adjacent_sibling).toBeDefined();
        expect( lexer.tokens[0]._adjacent_sibling._tag ).toEqual('P');
      });

      it ('must recognise adjacent sibling with spaces: ', ()=> {
        lexer.lex_selector('div + p');
        expect( lexer.tokens[0]._tag ).toEqual('DIV');
        expect( lexer.tokens[0]._adjacent_sibling).toBeDefined();
        expect( lexer.tokens[0]._adjacent_sibling._tag ).toEqual('P');
      });

      it ('must recognise ID adjacent sibling: ', ()=> {
        lexer.lex_selector('#foo+p');
        expect( lexer.tokens[0]._id ).toEqual('foo');
        expect( lexer.tokens[0]._adjacent_sibling).toBeDefined();
        expect( lexer.tokens[0]._adjacent_sibling._tag ).toEqual('P');
      });

      it ('must recognise class adjacent sibling: ', ()=> {
        lexer.lex_selector('.main+[data-x="fred"]');
        expect( lexer.tokens[0]._class ).toEqual('main');
        expect( lexer.tokens[0]._adjacent_sibling).toBeDefined();
        expect( lexer.tokens[0]._adjacent_sibling._attrib[0] ).toEqual({name:'data-x', value: 'fred'});
      });

      it ('must throw error if + appears more than once: ', ()=> {
        expect( ()=> lexer.lex_selector('div ++ extra') )
        .toThrowError(`Error specifying adjacent sibling at '+'`);
      });

      it ('must throw error if general sibling sep appears immediately after adjacent sibling sep (+~): ', ()=> {
        expect( ()=> lexer.lex_selector('div +~ extra') )
        .toThrowError(`Error specifying adjacent sibling at '~'`);
      });

    }); // adjacent siblings

    describe('when general sibling (~) used to find A followed by B: ', ()=> {

      it ('must recognise adjacent sibling: ', ()=> {
        lexer.lex_selector('div~p');
        expect( lexer.tokens[0]._tag ).toEqual('DIV');
        expect( lexer.tokens[0]._general_sibling).toBeDefined();
        expect( lexer.tokens[0]._general_sibling._tag ).toEqual('P');
      });

      it ('must recognise adjacent sibling with spaces: ', ()=> {
        lexer.lex_selector('div ~ p');
        expect( lexer.tokens[0]._tag ).toEqual('DIV');
        expect( lexer.tokens[0]._general_sibling).toBeDefined();
        expect( lexer.tokens[0]._general_sibling._tag ).toEqual('P');
      });

      it ('must recognise ID adjacent sibling: ', ()=> {
        lexer.lex_selector('#foo~p');
        expect( lexer.tokens[0]._id ).toEqual('foo');
        expect( lexer.tokens[0]._general_sibling).toBeDefined();
        expect( lexer.tokens[0]._general_sibling._tag ).toEqual('P');
      });

      it ('must recognise class adjacent sibling: ', ()=> {
        lexer.lex_selector('.main~[data-x="fred"]');
        expect( lexer.tokens[0]._class ).toEqual('main');
        expect( lexer.tokens[0]._general_sibling).toBeDefined();
        expect( lexer.tokens[0]._general_sibling._attrib[0] ).toEqual({name:'data-x', value: 'fred'});
      });

      it ('must throw error if ~ appears more than once: ', ()=> {
        expect( ()=> lexer.lex_selector('div ~~ extra') )
        .toThrowError(`Error specifying general sibling at '~'`);
      });

      it ('must throw error if adjacent sibling sep appears immediately after general sibling sep (~+): ', ()=> {
        expect( ()=> lexer.lex_selector('div ~+ extra') )
        .toThrowError(`Error specifying general sibling at '+'`);
      });

    }); // adjacent siblings

  }); //-- lex_selector()

});