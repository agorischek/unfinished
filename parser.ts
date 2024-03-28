import { CstParser } from 'chevrotain';

import { print } from './print';
import { Bold, Text, lexer } from './tokens';

class MdastParser extends CstParser {
  constructor() {
    super({ Bold, Text });

    this.performSelfAnalysis();
  }

  public boldText = this.RULE('boldText', () => {
    this.CONSUME(Bold);
    this.SUBRULE(this.textContent);
  });

  public textContent = this.RULE('textContent', () => {
    this.CONSUME(Text);
  });
}

// Create the parser instance
const parser = new MdastParser();

// The input string to parse
const input = '**This is bold textw';

// Tokenize the input
const lexingResult = lexer.tokenize(input);

// Set the parser's input
parser.input = lexingResult.tokens;

// Parse the input
const cst = parser.boldText();
print(cst);

function convertCstToMdast(cst: any): any {
  if (cst.name === 'boldText') {
    return {
      type: 'strong',
      children: cst.children.textContent.map(convertCstToMdast),
    };
  } else if (cst.name === 'textContent') {
    return {
      type: 'text',
      value: cst.children.Text[0].image,
    };
  }
}

// Usage:
// const ast = convertCstToMdast(cst);
// console.log(ast);
