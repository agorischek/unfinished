import { CstParser } from 'chevrotain';

import { lexer } from './lexer';
import { project } from './projector';
import { Strong, Text } from './tokens';
import { print } from './utils/print';

class UnfinishedParser extends CstParser {
  constructor() {
    super({ Strong, Text });

    this.performSelfAnalysis();
  }

  public document = this.RULE('document', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.boldText) },
      { ALT: () => this.SUBRULE(this.textContent) },
    ]);
  });

  public boldText = this.RULE('boldText', () => {
    this.CONSUME(Strong);
    this.SUBRULE(this.textContent);
  });

  public textContent = this.RULE('textContent', () => {
    this.CONSUME(Text);
  });
}

export const parse = (input: string) => {
  const parser = new UnfinishedParser();

  const lexed = lexer.tokenize(input);
  parser.input = lexed.tokens;

  const parsed = parser.document();
  const projected = project(parsed);

  return projected;
};
