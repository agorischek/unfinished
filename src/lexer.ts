import { Lexer } from 'chevrotain';

import {
  ClosingBacktick,
  DoubleAsterisk,
  OpeningBacktick,
  Text,
} from './tokens';

export const lexer = new Lexer({
  modes: {
    prose: [OpeningBacktick, DoubleAsterisk, Text],
    inlineCode: [Text, ClosingBacktick],
    bold: [OpeningBacktick, DoubleAsterisk, Text],
  },
  defaultMode: 'prose',
});
