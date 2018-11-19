
//  Fluid DOM for JavaScript
//  (c) Copyright 2018 Warwick Molloy
//  Available under the MIT License

let fluid = require('../fluid-dom.mock');


describe('selector-lexer', ()=> {
  let lexer;

  beforeEach( ()=>  lexer = new fluid.SelectorLexer() );

  describe('lex simple tag:', () => {
    it('Lexes valid tag: ',()=> lexer.lex_selector('div'));
  });
});