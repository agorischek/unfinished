import { CstParser } from 'chevrotain';

import { lexer } from './lexer';
import { project } from './projector';
import {
  Asterisk,
  ClosingBacktick,
  DoubleAsterisk,
  OpeningBacktick,
  Text,
} from './tokens';

// import { print } from './utils/print';

class UnfinishedParser extends CstParser {
  constructor() {
    super({ Asterisk, DoubleAsterisk, OpeningBacktick, ClosingBacktick, Text });

    this.performSelfAnalysis();
  }

  public content = this.RULE('content', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.boldText) },
      { ALT: () => this.SUBRULE(this.inlineCode) },
      { ALT: () => this.SUBRULE(this.text) },
    ]);
  });

  public boldText = this.RULE('boldText', () => {
    this.CONSUME(DoubleAsterisk);
    this.SUBRULE(this.text);
    this.CONSUME2(DoubleAsterisk);
  });

  public inlineCode = this.RULE('inlineCode', () => {
    this.CONSUME(OpeningBacktick);
    this.SUBRULE(this.text);
    this.CONSUME(ClosingBacktick);
  });

  public text = this.RULE('text', () => {
    this.CONSUME(Text);
  });
}

export const parse = (input: string) => {
  const parser = new UnfinishedParser();

  const lexed = lexer.tokenize(input);
  parser.input = lexed.tokens;

  const parsed = parser.content();
  const projected = project(parsed);

  return projected;
};

const result = parse('`**');
console.log(result);
