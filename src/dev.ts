import { CstParser, Lexer, createToken } from 'chevrotain';

const sql = `
SELECT column1 FROM table2
SELECT name, age FROM persons WHERE age > 100
`;
const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ });
// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
const Select = createToken({
  name: 'Select',
  pattern: /SELECT/,
  longer_alt: Identifier,
});
const From = createToken({
  name: 'From',
  pattern: /FROM/,
  longer_alt: Identifier,
});
const Where = createToken({
  name: 'Where',
  pattern: /WHERE/,
  longer_alt: Identifier,
});

const Comma = createToken({ name: 'Comma', pattern: /,/ });

const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ });

const GreaterThan = createToken({ name: 'GreaterThan', pattern: />/ });

const LessThan = createToken({ name: 'LessThan', pattern: /</ });

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
let allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Comma,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  GreaterThan,
  LessThan,
];
let SelectLexer = new Lexer(allTokens);

let inputText = 'SELECT column1 FROM table2';
let lexingResult = SelectLexer.tokenize(inputText);
console.log(lexingResult);

class SelectParser extends CstParser {
  selectStatement = this.RULE('selectStatement', () => {
    this.SUBRULE(this.selectClause);
    this.SUBRULE(this.fromClause);
    this.OPTION(() => {
      this.SUBRULE(this.whereClause);
    });
  });

  selectClause = this.RULE('selectClause', () => {
    this.CONSUME(Select);
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => {
        this.CONSUME(Identifier);
      },
    });
  });

  fromClause = this.RULE('fromClause', () => {
    this.CONSUME(From);
    this.CONSUME(Identifier);
  });

  whereClause = this.RULE('whereClause', () => {
    this.CONSUME(Where);
    this.SUBRULE(this.expression);
  });

  // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
  // to use names during CST Visitor (step 3a).
  expression = this.RULE('expression', () => {
    this.SUBRULE(this.atomicExpression, { LABEL: 'lhs' });
    this.SUBRULE(this.relationalOperator);
    this.SUBRULE2(this.atomicExpression, { LABEL: 'rhs' }); // note the '2' suffix to distinguish
    // from the 'SUBRULE(atomicExpression)'
    // 2 lines above.
  });

  atomicExpression = this.RULE('atomicExpression', () => {
    this.OR([
      { ALT: () => this.CONSUME(Integer) },
      { ALT: () => this.CONSUME(Identifier) },
    ]);
  });

  relationalOperator = this.RULE('relationalOperator', () => {
    this.OR([
      { ALT: () => this.CONSUME(GreaterThan) },
      { ALT: () => this.CONSUME(LessThan) },
    ]);
  });

  constructor() {
    super(allTokens);

    this.performSelfAnalysis();
  }
}

// ONLY ONCE
const parser = new SelectParser();

function parseInput(text: string) {
  const lexingResult = SelectLexer.tokenize(text);
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  return parser.selectStatement();

  if (parser.errors.length > 0) {
    throw new Error('sad sad panda, Parsing errors detected');
  }
}

const result = parseInput(inputText);
console.log(result);
