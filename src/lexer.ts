import { Lexer } from 'chevrotain';

import { Strong, Text } from './tokens';

// Specify the order of tokens
const allTokens = [Strong, Text];

// Create the lexer instance
export const lexer = new Lexer(allTokens);
