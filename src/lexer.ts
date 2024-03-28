import { Lexer } from 'chevrotain';

import { InlineCode, Strong, Text } from './tokens';

// Specify the order of tokens
const allTokens = [Strong, InlineCode, Text];

// Create the lexer instance
export const lexer = new Lexer(allTokens);
