import { Lexer, createToken } from 'chevrotain';

// Define the token for "**"
export const Bold = createToken({
  name: 'Bold',
  pattern: /\*\*/,
});

// Define a token for the text in between "**"
export const Text = createToken({
  name: 'Text',
  pattern: /[^*]+/,
});

// Define other tokens as needed
// const WhiteSpace = createToken({
//   name: 'WhiteSpace',
//   pattern: /\s+/,
//   group: Lexer.SKIPPED,
// });

// Specify the order of tokens
const allTokens = [Bold, Text];

// Create the lexer instance
export const lexer = new Lexer(allTokens);

// Import the lexer from your tokens module
// import { lexer } from './tokens';

// The input string to tokenize
const input = '**This is bold text';

// Use the lexer to tokenize the input
const lexingResult = lexer.tokenize(input);

// The lexingResult object contains a tokens array with all the tokens
console.log(extractTokenData(lexingResult.tokens));

function extractTokenData(
  tokens: any[],
): { image: string; tokenTypeName: string }[] {
  return tokens.map((token) => ({
    image: token.image,
    tokenTypeName: token.tokenType.name,
  }));
}
