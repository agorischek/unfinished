import { expect, it } from 'bun:test';

import { lexer } from './lexer';

it('Should tokenize bold', () => {
  const { tokens } = lexer.tokenize('**Hello');

  expect(tokens[0]).toBeToken('Strong', '**');
  expect(tokens[1]).toBeToken('Text', 'Hello');
});

it('Should tokenize inline code', () => {
  const { tokens } = lexer.tokenize('`npm t');

  expect(tokens[0]).toBeToken('InlineCode', '`');
  expect(tokens[1]).toBeToken('Text', 'npm t');
});
