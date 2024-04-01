import { lexer } from './lexer';
import { parser } from './parser';
import { render } from './utils/render';
import { visitor } from './visitor';

export function parse(text: string) {
  // 1. Tokenize the input.
  const lexResult = lexer.tokenize(text);

  // 2. Parse the Tokens vector.
  parser.input = lexResult.tokens;
  const cst = parser.content();
  //   console.log(cst);
  // 3. Perform semantics using a CstVisitor.
  // Note that separation of concerns between the syntactic analysis (parsing) and the semantics.
  const value = visitor.visit(cst);

  return value;

  //   console.log(value);
}

console.log(render(parse('Hello')));
